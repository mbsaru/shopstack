// src/components/PageBuilder.js
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector, useDispatch, useStore } from 'react-redux';

import { apiClient } from '@/api/apiClient';
import { initializeActionDispatcher, dispatchAction } from '@/utils/actionDispatcher';
import ComponentRenderer from './ComponentRenderer';

const PageBuilder = ({ initialPageConfig }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const dispatch = useDispatch();
  const store = useStore();
  console.log('intialpageconfig',initialPageConfig)
  const [pageConfig, setPageConfig] = useState(initialPageConfig);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const currentUser = useSelector(state => state.auth.user);
  const currentToken = useSelector(state => state.auth.token);

  // Initialize the action dispatcher once when the component mounts.
  useEffect(() => {
    initializeActionDispatcher(router, dispatch, store.getState);
  }, [router, dispatch, store.getState]); // Dependencies are stable, so this runs once.
  
  useEffect(() => {
    setPageConfig(initialPageConfig);
  },[initialPageConfig])

  useEffect(() => {
    if (!router.pathname) {
      return;
    }
    const currentPath = router.pathname;
    const currentQuery = searchParams.toString();

    if (pageConfig && pageConfig.path === currentPath && pageConfig.query === currentQuery) {
      console.log('Page config already matches URL. Skipping client-side fetch.');
      return;
    }

    const loadPageConfig = async () => {
      setLoading(true);
      setError(null);
      setPageConfig(null);


      try {
        const configEndpoint = `/ui-config${currentPath}${currentQuery ? `?${currentQuery}` : ''}`;
        
        const config = await apiClient({
          endpoint: configEndpoint,
          method: 'GET',
          token: currentToken
        });

        if (config?.redirect_to && config.redirect_to !== currentPath) {
          router.replace(config.redirect_to);
          return;
        }
        setPageConfig(config);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPageConfig();

  }, [router.pathname, searchParams.toString(), currentToken, pageConfig]); 

  if (loading) {
    return <div>Loading UI configuration...</div>;
  }
  if (error) {
    return <div className="text-red-500">Error loading UI: {error}</div>;
  }
  if (!pageConfig || !pageConfig.components) {
    return <div className="text-gray-500">No UI configuration found.</div>;
  }

  const pageContext = {
    location: {
      pathname: router.pathname,
      search: searchParams.toString(),
    },
    currentUser: currentUser,
    isAuthenticated: isAuthenticated,
  };



  return (
    <div className="page-builder">
      {pageConfig.components.map((componentConfig, index) =>
        < ComponentRenderer componentConfig = {componentConfig} key = {index} index = {index} pageContext = {pageContext} />
      )}
    </div>
  );
};

export default PageBuilder;