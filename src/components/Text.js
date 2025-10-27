'use client';

import React from 'react';
import { cn } from '@/lib/utils';

const Text = ({
  content,
  as: Element = 'p',
  className,
  dispatchAction,
  itemContext,
  ...props
}) => {
  // Handle if content is just a plain string
  if (typeof content === 'string') {
    return (
      <Element className={cn("text-gray-800", className)} {...props}>
        {content}
      </Element>
    );
  }

  // Handle structured content (array of fragments)
  return (
    <Element className={cn("text-gray-800", className)} {...props}>
      {Array.isArray(content) &&
        content.map((part, idx) => {
          const {
            text,
            bold,
            italic,
            underline,
            link,
            color,
            highlight,
          } = part;

          const style = {};
          if (color) style.color = color;
          if (highlight) style.backgroundColor = highlight;

          const textElement = (
            <span
              key={idx}
              style={style}
              className={cn(
                bold && 'font-bold',
                italic && 'italic',
                underline && 'underline'
              )}
            >
              {text}
            </span>
          );

          return link ? (
            <a
              key={idx}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {textElement}
            </a>
          ) : (
            textElement
          );
        })}
        {children && <span className="ml-1">{children}</span>}
    </Element>
  );
};

export default Text;
