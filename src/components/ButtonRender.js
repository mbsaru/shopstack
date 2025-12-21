// src/components/ButtonRender.jsx
'use client';

import React from 'react';
import { Button } from "@/components/ui/button"; // Your Shadcn Button
import { cn } from '@/lib/utils'; // For tailwind-merge/clsx utility

import { IconRender } from './IconRender';

const ButtonRender = ({
  text,
  variant = 'default', // Default Shadcn variant
  size = 'default',    // Default Shadcn size
  className,
  icon,                // String name of the icon (e.g., "ChevronRightIcon")
  onClick,             // Action object { action: '...', payload: {...} }
  dispatchAction,      // Passed from PageBuilder
  itemContext,         // Optional: for dynamic values like item.id in cart actions
  ...props
}) => {


  const handleClick = (e) => {
    if (!onClick || !dispatchAction) {
      console.warn("ButtonRender: No onClick action or dispatchAction provided.", { onClick, dispatchAction });
      return;
    }

    const { action, payload } = onClick;
    console.log('action',action)
    console.log('payload',payload)
    // Merge itemContext into payload if available, useful for list items (e.g. cart item ID)
    const finalPayload = itemContext ? { ...payload, ...itemContext } : payload;

    switch (action) {
      case 'makeApiCall':
      case 'logout':
      case 'navigateTo':
      case 'handleActionDispatch':
      case 'dispatch':
        dispatchAction(payload.action, finalPayload);
        break;

      case 'redirectToExternal':
        if (finalPayload?.url) {
          window.open(finalPayload.url, '_blank');
        }
        break;

      case 'showAlert':
        dispatchAction(action, finalPayload);
        break;

      default:
        console.warn(`ButtonRender: Unknown action type '${action}'`);
        dispatchAction(action, finalPayload);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(className)}
      onClick={handleClick}
      {...props}
    >
      {icon && IconRender(icon, 4 )} {/* Adjust icon size/margin based on if text is present */}
      {text}
    </Button>
  );
};

export default ButtonRender;