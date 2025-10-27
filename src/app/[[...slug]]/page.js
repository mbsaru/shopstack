import React from 'react';
import PageBuilder from "@/components/PageBuilder";
import { apiClient } from '@/api/apiClient';
import { getItem } from '@/utils/cookiesServer';
export default async function HomePage({ params, searchParams }) {
  const currentUser = getItem('user');
  const currentToken = getItem('authToken');

  const param = await params;

  const path = (Array.isArray(param.slug) && param.slug.length > 0)
    ? `/${param.slug.join('/')}`
    : '/';
  const search = await searchParams;
  const queryString = new URLSearchParams(Object.entries(search)).toString();
  console.log('server side path', path)
  console.log('server -side query path ', queryString);

  const configEndpoint = `/ui-config${path}${queryString ? `?${queryString}` : ''}`;

  let pageConfig = null;
  let error = null;

  try{
    pageConfig = await apiClient( configEndpoint, 'GET')
    console.log('pageconfig',pageConfig)
  }catch(err){
    console.error("Error fetching config on server:",err)
    error = err.message || "Failed to load page configuration.";
    if (err.status === 404) {
      return <div>404 Page Not Found</div>;
    }
  }

  if (error || !pageConfig) {
    return <div>Error: {error || "Page configuration not found."}</div>;
  }
  
  return <PageBuilder initialPageConfig = {pageConfig} />;
}