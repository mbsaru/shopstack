// src/components/ButtonRender.jsx
'use client';

import React from 'react';
import { Button } from "@/components/ui/button"; // Your Shadcn Button
import { IconMap } from '@/utils/iconMaps';
import { cn } from '@/lib/utils'; // For tailwind-merge/clsx utility

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

  const IconComponent = icon && IconMap[icon] ? IconMap[icon] : null;

  const handleClick = (e) => {
    if (!onClick || !dispatchAction) {
      console.warn("ButtonRender: No onClick action or dispatchAction provided.", { onClick, dispatchAction });
      return;
    }

    const { action, payload } = onClick;

    // Merge itemContext into payload if available, useful for list items (e.g. cart item ID)
    const finalPayload = itemContext ? { ...payload, ...itemContext } : payload;

    switch (action) {
      case 'makeApiCall':
      case 'logout':
      case 'navigateTo' || 'cart':
        dispatchAction(action, finalPayload);
        break;
      case 'redirectToExternal': // For Instagram, WhatsApp, external links
        if (finalPayload && finalPayload.url) {
          window.open(finalPayload.url, '_blank'); // Opens in a new tab
        } else {
          console.error("redirectToExternal action requires a 'url' in payload.", finalPayload);
        }
        break;
      case 'showAlert': // If you want a button to directly trigger an alert
        dispatchAction(action, finalPayload);
        break;
      // Add more cases for other specific actions your system might have
      default:
        console.warn(`ButtonRender: Unknown action type '${action}' for button click.`);
        dispatchAction(action, finalPayload)
        break;
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
      {IconComponent && <IconComponent className={cn("mr-2", text ? "size-4" : "size-full")} />} {/* Adjust icon size/margin based on if text is present */}
      {text}
    </Button>
  );
};

export default ButtonRender;