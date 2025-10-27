import React from 'react';
import { ProductCard } from './ProductCard';

export function ProductGrid({ products, cardConfig, dispatchAction }) {
  // Pass the grid layout classes to the container
  const gridClasses = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";

  return (
    <div className={gridClasses}>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          config={cardConfig}
          dispatchAction = {dispatchAction}
        />
      ))}
    </div>
  );
}