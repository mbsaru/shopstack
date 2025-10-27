'use client';

import React from 'react';
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { componentMap } from './componentMap';
const Navigation = ({ desktop, mobile }) => {
  console.log('config navifation',desktop)
    const isMobile = useMediaQuery('(max-width: 768px)');
    const selectedConfig = isMobile ? desktop : desktop;
    const ResolvedComponent = componentMap[selectedConfig.components];
    console.log("isMobile",isMobile)
    console.log('props',{...selectedConfig.props} )
    return <ResolvedComponent {...selectedConfig.props} />;
};

export default Navigation;
