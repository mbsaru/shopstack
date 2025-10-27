// src/components/ProductCard.jsx

import React from 'react';
import ButtonRender from './ButtonRender';

export function ProductCard({ product, config, dispatchAction }) {

    const { id, name, description, price, originalPrice, discountPrice, image } = product;

    const { card, image: imageConfig, title, description: descriptionConfig, price: priceConfig, rating, button } = config;

    const cardClasses = `${card?.layout === "horizontal" ? "flex gap-4" : "w-72"} ${card?.baseClasses || ''}`;
    const imageSizeClass = card?.layout === "horizontal" ? "w-24 h-24" : "w-full h-48";
    const imageStyleClass = imageConfig?.style === "circle" ? "rounded-full" : imageConfig?.style === "rounded" ? "rounded-xl" : "";

    let discountPercentage = null;
    if (originalPrice && discountPrice) {
        const discount = ((parseFloat(originalPrice) - parseFloat(discountPrice)) / parseFloat(originalPrice)) * 100;
        discountPercentage = Math.round(discount);
    }


    return (
        <div className={`${cardClasses} ${card?.classes || ''}`}>
            {imageConfig?.show && (
                <img
                    src={image}
                    alt={name}
                    className={`object-cover ${imageStyleClass} ${imageSizeClass} ${imageConfig?.classes || ''}`}
                />
            )}

            <div className={`${card?.contentClasses || 'flex-1 space-y-2'}`}>
                {title?.show && (
                    <h3 className={`${title?.classes || ''} line-clamp-1`}>
                        {name}
                    </h3>
                )}

                {descriptionConfig?.show && (
                    <p className={`${descriptionConfig?.classes || ''} line-clamp-2`}>
                        {description}
                    </p>
                )}

                {priceConfig?.show && (
                    <div>
                        {discountPrice ? (
                            <div className="flex items-center gap-2">
                                <span className={`${priceConfig?.classes || ''}`}>
                                    ₹{discountPrice}
                                </span>
                                <span className={`${priceConfig?.originalClasses || ''} line-through`}>
                                    ₹{originalPrice}
                                </span>
                                {discountPercentage && (
                                    <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                                        -{discountPercentage}%
                                    </span>
                                )}
                            </div>
                        ) : (
                            <div>
                                <span className={`${priceConfig?.classes || ''}`}>
                                    ₹{originalPrice}
                                </span>
                            </div>
                        )}
                    </div>
                )}

                {rating?.show && (
                    <div className={`${rating?.classes || ''}`}>⭐ 4.5 (320)</div>
                )}

                {button?.show && (
                    <ButtonRender
                        text={button?.text || "Add to Cart"}
                        onClick={{
                            action: "cart",
                            payload: {
                                action: (data) => ({ type: "addToCart", payload: { ...data, product } }),
                                data: {
                                    id: product.id,
                                    name: product.name,
                                    price: parseFloat(product.discountPrice || product.originalPrice),
                                    quantity: 1,
                                    image: product.image,
                                },
                            },
                        }}
                        dispatchAction={dispatchAction}
                        itemContext={{ product_id: id, product }}
                    />
                )}
            </div>
        </div>
    );
}