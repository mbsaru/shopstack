"use client"; // Required for interactive client-side rendering in Next.js

import React from "react";

// Utility to highlight specific words with style classes
export const highlightText = (text, highlights = {}) => {
  const parts = text.split(/(\s+)/); // split and retain spaces
  return parts.map((part, idx) => {
    const matchKey = Object.keys(highlights).find((key) =>
      part.toLowerCase().includes(key.toLowerCase())
    );

    if (matchKey) {
      return (
        <span key={idx} className={highlights[matchKey]}>
          {part}
        </span>
      );
    }

    return <span key={idx}>{part}</span>;
  });
};

export function Card ({ title, description, highlights = {}, className = "" }) {
  return (
    <div className={`rounded-xl shadow-md p-4 bg-white ${className}`}>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-base">{highlightText(description, highlights)}</p>
    </div>
  );
};


