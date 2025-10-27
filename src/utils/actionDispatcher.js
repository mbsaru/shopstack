import { resolveDynamicData } from './dynamicValueResolver';

import { setToken, setUser, clearAuth } from '@/store/authSlice';
import { addToCart, removeFromCart, incrementQuantity, decrementQuantity, setCart, clearCart } from '@/store/cartSlice'; 

import { apiClient } from '@/api/apiClient';

// External dependencies (Next.js router, Redux dispatch, Redux getState) injected via initializeActionDispatcher
//To hold the Next.js router and Redux function
let _router;
let _dispatch;
let _getState; 


export const initializeActionDispatcher = (routerFn, dispatchFn, getStateFn) => {
  _router = routerFn;
  _dispatch = dispatchFn;
  _getState = getStateFn; 
};

// --- Internal Action Handler Functions ---

const handleMakeApiCall = async (apiConfig, pageContext) => {
  const { endpoint, method, data, successAction, errorAction, authRequired } = apiConfig;

  const state = _getState();
  const isAuthenticated = state.auth.isAuthenticated;
  const currentToken = state.auth.token;

  if (authRequired && !isAuthenticated) {
    console.warn(`API call to ${endpoint} requires authentication. Redirecting to login.`);
    const currentPath = _router.pathname;
    const currentSearch = _router.search; 
    _router.push(`/login?next=${currentPath}${currentSearch ? `&${currentSearch.substring(1)}` : ''}`);
    throw new Error("Login required."); 
  }

  try {
    const apiResponseData = await apiClient(endpoint, method, data, currentToken);

    if (successAction) {
      await processSuccessAction(successAction, apiResponseData, pageContext);
    } else {
      alert(`Operation successful!`); 
    }
  } catch (err) {
    console.error(`API Call Error for ${endpoint}:`, err);
    if (errorAction) {
      await processErrorAction(errorAction, err, pageContext);
    } else {
      alert(`Operation failed: ${err.message}`); 
    }
    throw err; 
  }
};

const handleNavigateTo = (payload) => {
  if (payload && payload.path) {
    _router.push(payload.path); // Use router.push for navigation
  } else {
    console.warn("navigateTo action requires a 'path' in payload.");
  }
};

const handleShowAlert = (payload) => {
  if (payload && payload.message) {
    alert(payload.message);
  } else {
    console.warn("showAlert action requires a 'message' in payload.");
  }
};

const handleLogout = async (payload) => {
  // Get token before clearing local state using the injected _getState function
  const currentToken = _getState().auth.token; // <--- UPDATED
  try {
    if (currentToken) { // Only call logout API if a token exists
      await apiClient('/auth/logout/', 'POST', {}, currentToken); // Use apiClient for logout
    }
  } catch (error) {
    console.warn("Logout API call failed, but clearing local token anyway:", error);
  } finally {
    _dispatch(clearAuth()); // Dispatch the RTK clearAuth action
    if (payload.redirectTo) {
      _router.replace(payload.redirectTo); // Use router.replace to prevent back button issues
    }
  }
};


const processSuccessAction = async (action, apiResponseData, pageContext) => {
  console.log('apyloa', action.payload.tokenField, action.payload.userField)
  switch (action.type) {
    case "setAuthToken":
      const tokenValue = action.payload.tokenField ? apiResponseData[action.payload.tokenField] : null;
      if (tokenValue) {
        _dispatch(setToken(tokenValue)); 
        if (action.payload.userField && apiResponseData[action.payload.userField]) {
          _dispatch(setUser(apiResponseData[action.payload.userField])); 
        }
        const urlParams = new URLSearchParams(_router.search); 
        const nextPath = urlParams.get('next') || action.payload.redirect || '/';
        _router.replace(nextPath); 
      } else {
        console.warn("setAuthToken action failed: token field not found in response.", apiResponseData);
      }
      break;
    case "updateCartState":
      if (action.payload.fetchCart) {
        // After a cart-related action (e.g., add/remove item), manually refetch the cart
        const currentToken = _getState().auth.token; // <--- UPDATED
        try {
          const updatedCart = await apiClient('/cart/', 'GET', null, currentToken);
          _dispatch(setCart(updatedCart.items || [])); // Dispatch RTK setCart action
          if (action.payload.message) alert(action.payload.message);
        } catch (error) {
          console.error("Failed to refetch cart after updateCartState action:", error);
          alert("Cart update failed: Could not fetch latest cart state.");
        }
      }
      break;
    case "navigateTo":
      handleNavigateTo(action.payload);
      break;
    case "showAlert":
      handleShowAlert(action.payload);
      break;
    case "clearForm":
      console.warn("clearForm action cannot be dispatched globally without specific form instance knowledge. Consider handling this within the form component's success callback.");
      break;
    default:
      console.warn(`Unknown success action type: ${action.type}`);
  }
};

const processErrorAction = async (action, error, pageContext) => {
  switch (action.type) {
    case "displayFormErrors":
      alert(`Form submission error: ${error.message}`);
      break;
    case "showAlert":
      handleShowAlert(action.payload);
      break;
    default:
      console.warn(`Unknown error action type: ${action.type}`);
  }
};


export const dispatchAction = async (actionName, payload, pageContext) => {
  // Ensure the dispatcher is initialized
  if (!_router || !_dispatch || !_getState) { // <--- UPDATED: Check for _getState
    console.error("ActionDispatcher not initialized. Call initializeActionDispatcher from a component (e.g., PageBuilder's useEffect).");
    alert("System error: Action handler not ready. Please refresh.");
    return;
  }

  // Resolve any dynamic values in the payload using the current page context
  const resolvedPayload = resolveDynamicData(payload, pageContext);

  try {
    switch (actionName) {
      case "makeApiCall":
        if (resolvedPayload.api) {
          await handleMakeApiCall(resolvedPayload.api, pageContext);
        } else {
          console.warn("makeApiCall action requires an 'api' object in payload.");
        }
        break;
      case "navigateTo":
        handleNavigateTo(resolvedPayload);
        break;
      case "showAlert":
        handleShowAlert(resolvedPayload);
        break;
      case "logout":
        await handleLogout(resolvedPayload);
        break;
      case "cart":
        handleCart(resolvedPayload);
        break;
      default:
        console.warn(`Unknown top-level action: ${actionName}`);
        break;
    }
  } catch (error) {
    console.error(`Top-level error in dispatchAction for '${actionName}':`, error);
    if (error.message !== "Login required.") {
        alert(`An unexpected error occurred: ${error.message}`);
    }
  }
};


const handleCart = (payload) => {
  if (!payload || !payload.data) return;
  _dispatch(addToCart(payload.data));
  console.log('Added to cart:', payload.data);
};
