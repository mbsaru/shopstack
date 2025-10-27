export const resolveDynamicData = (config, context) => {
  if (typeof config === 'string') {
    return resolveString(config, context);
  }
  if (Array.isArray(config)) {
    return config.map(item => resolveDynamicData(item, context));
  }
  if (typeof config === 'object' && config !== null) {
    const resolvedConfig = {};
    for (const key in config) {
      if (Object.prototype.hasOwnProperty.call(config, key)) {
        resolvedConfig[key] = resolveDynamicData(config[key], context);
      }
    }
    return resolvedConfig;
  }
  return config;
};

const resolveString = (str, context) => {
  if (!str.includes('${') || !str.includes('}')) {
    return str; 
  }

  return str.replace(/\${([^}]+)}/g, (match, path) => {
    const pathParts = path.split('.');
    let value = context; 

    try {
      for (const part of pathParts) {
        if (value === null || typeof value !== 'object' || !Object.prototype.hasOwnProperty.call(value, part)) {
          return match; 
        }
        value = value[part];
      }
      return (value !== null && value !== undefined) ? String(value) : '';
    } catch (e) {
      console.warn(`Error resolving dynamic value for path "${path}":`, e);
      return match; 
    }
  });
};

/*
Example Usage in pageContext for PageBuilder/ActionDispatcher:
{
  location: router, // Next.js useRouter object (router.query for query params, router.pathname, etc.)
  isAuthenticated: true,
  currentUser: { id: 123, username: 'john_doe' },
  pageConfig: { ... } // The currently loaded page config itself
}

Example Payload from UI config for makeApiCall:
{
  "action": "makeApiCall",
  "payload": {
    "api": {
      "endpoint": "/products/${location.query.productId}",
      "method": "GET",
      "authRequired": true,
      "data": {
        "userId": "${currentUser.id}"
      }
    },
    "successAction": {
      "type": "showAlert",
      "payload": {
        "message": "Product ${location.query.productId} fetched successfully!"
      }
    }
  }
}
*/