export const UiConfig = {
    "/api/proxy/ui-config/login": {
        "components": [
            {
                "type": "FullPageLayout",
                "props": {},
                "children": [
                    {
                        "type": "Text",
                        "props": {
                            "content": "Login to Your Account",
                            "as": "h1",
                            "className": "text-3xl font-bold mb-2 text-center text-gray-900"
                        }
                    },
                    {
                        "type": "Text",
                        "props": {
                            "content": "Please enter your credentials to log in.",
                            "as": "p",
                            "className": "text-gray-600 text-center mb-6"
                        }
                    },
                    {
                        "type": "FormRenderer",
                        "props": {
                            "fields": [
                                {
                                    "name": "email",
                                    "label": "Email Address",
                                    "type": "email",
                                    "required": true,
                                    "placeholder": "your.email@example.com"
                                },
                                {
                                    "name": "password",
                                    "label": "Password",
                                    "type": "password",
                                    "required": true,
                                    "placeholder": "********"
                                }
                            ],
                            "onSubmitAction": {
                                "action": "makeApiCall",
                                "payload": {
                                    "api": {
                                        "endpoint": "/auth/login/",
                                        "method": "POST",
                                        "data": {
                                            "email": "${form.email}",
                                            "password": "${form.password}"
                                        },
                                        "authRequired": false,
                                        "successAction": {
                                            "type": "setAuthToken",
                                            "payload": {
                                                "tokenField": "access",
                                                "userField": "user",
                                                "redirect": "/"
                                            }
                                        },
                                        "errorAction": {
                                            "type": "showAlert",
                                            "payload": {
                                                "message": "Login failed. Please check your credentials.",
                                                "title": "Authentication Error"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    {
                        "type": "Text",
                        "props": {
                            "content": "Don't have an account?",
                            "className": "text-center mt-6 text-gray-600"
                        }
                    },
                    {
                        "type": "Button",
                        "props": {
                            "text": "Sign Up Now",
                            "variant": "link",
                            "className": "block mx-auto mt-2",
                            "onClick": {
                                "action": "navigateTo",
                                "payload": {
                                    "path": "/register"
                                }
                            }
                        }
                    },
                    {
                        "type": "Button",
                        "props": {
                            "text": "Forgot Password?",
                            "variant": "link",
                            "className": "block mx-auto mt-2 text-sm",
                            "onClick": {
                                "action": "navigateTo",
                                "payload": {
                                    "path": "/forgot-password"
                                }
                            }
                        }
                    }
                ]
            }
        ]
    },
    "/api/proxy/ui-config/register": {
        "components": [
            {
                "type": "FullPageLayout",
                "props": {},
                "children": [
                    {
                        "type": "Text",
                        "props": {
                            "className": "text-3xl font-bold mb-2 text-center text-gray-900",
                            "content": [
                                { "type": "text", "value": "Create your account." },
                            ]
                        }
                    },
                    {
                        "type": "Text",
                        "props": {
                            "className": "text-gray-600 text-center mb-6",
                            "content": [
                                { "type": "text", "value": "Please enter your details to register." },
                            ]
                        }
                    },
                    {
                        "type": "FormRenderer",
                        "props": {
                            "fields": [
                                {
                                    "name": "mobileNumber",
                                    "label": "Mobile Number",
                                    "type": "tel",
                                    "required": true,
                                    "validations": { "pattern": "^\\+?[0-9]{1,4}?[-.\\s]?[0-9]{6,14}$" },
                                    "placeholder": "+91 1234567890"
                                },
                                {
                                    "name": "email",
                                    "label": "Email Address",
                                    "type": "email",
                                    "required": true,
                                    "validations": { "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$" },
                                    "placeholder": "your.email@example.com"
                                },
                                {
                                    "name": "password",
                                    "label": "Password",
                                    "type": "password",
                                    "required": true,
                                    "validations": { "minLength": 6 },
                                    "placeholder": "********"
                                },
                                {
                                    "name": "re_enter_password",
                                    "label": "Re-Type Password",
                                    "type": "password",
                                    "required": true,
                                    "validations": { "match": "password" },
                                    "placeholder": "********"
                                }
                            ],
                            "onSubmitAction": {
                                "action": "makeApiCall",
                                "payload": {
                                    "api": {
                                        "endpoint": "/auth/login/",
                                        "method": "POST",
                                        "data": {
                                            "email": "${form.email}",
                                            "password": "${form.password}"
                                        },
                                        "authRequired": false,
                                        "successAction": {
                                            "type": "setAuthToken",
                                            "payload": {
                                                "tokenField": "access",
                                                "userField": "user",
                                                "redirect": "/"
                                            }
                                        },
                                        "errorAction": {
                                            "type": "showAlert",
                                            "payload": {
                                                "message": "Login failed. Please check your credentials.",
                                                "title": "Authentication Error"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    {
                        "type": "Text",
                        "tag": "p",
                        "props": {
                            "content": [
                                { "text": "Do you have an account?", "bold": true },
                                { "text": " " },
                                { "text": "Click here", "italic": true, "underline": true, "highlight": "yellow" }
                            ],
                            "className": "text-center mt-6 text-gray-600"
                        },
                        "children": [
                            {
                                "type": "Button",
                                "props": {
                                    "text": "Log In",
                                    "variant": "link",
                                    "className": "block mx-auto mt-2",
                                    "onClick": {
                                        "action": "navigateTo",
                                        "payload": {
                                            "path": "/login"
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    {
                        "type": "Button",
                        "props": {
                            "text": "Log In",
                            "variant": "link",
                            "className": "block mx-auto mt-2",
                            "onClick": {
                                "action": "navigateTo",
                                "payload": {
                                    "path": "/login"
                                }
                            }
                        }
                    }
                ]
            }
        ]
    },
    "/api/proxy/ui-config/product": {
        "pageTitle": "Product Listings",
        "components": [
            {
                "type": "NavigationPanel",
                "components": "NavigationPanel",
                "props":{
                    menuItems:[
                        {
                            "type": "imageGrid",
                            "title": "New Arrivals",
                            "path": "/new-arrivals",
                            "imageSrc": "/images/new-arrivals.jpg",
                            "imageCaption": "Check out our latest collection",
                            "gridList": [
                                {
                                    "title": "Men's Shirts",
                                    "href": "/shop/men/shirts",
                                    "description": "Trendy shirts for every occasion"
                                },
                                {
                                    "title": "Women's Dresses",
                                    "href": "/shop/women/dresses",
                                    "description": "Elegant and casual dresses"
                                },
                                {
                                    "title": "Kids' Toys",
                                    "href": "/shop/kids/toys",
                                    "description": "Fun toys for all ages"
                                }
                            ]
                        },
                        {
                            "type": "ComponentsGrid",
                            "title": "Categories",
                            "gridList": [
                                { "title": "Electronics", "href": "/categories/electronics", "description": "Phones, laptops, and more" },
                                { "title": "Home & Living", "href": "/categories/home-living", "description": "Furniture and decor" },
                                { "title": "Sports", "href": "/categories/sports", "description": "Fitness gear and accessories" },
                                { "title": "Beauty", "href": "/categories/beauty", "description": "Skincare and cosmetics" }
                            ]
                        },
                        {
                            "type": "SingleLink",
                            "title": "Offers",
                            "href": "/offers"
                        },
                        {
                            "type": "List",
                            "title": "Help & Support",
                            "gridList": [
                                { "title": "Customer Support", "path": "/help/support", "caption": "24/7 assistance" },
                                { "title": "Track Order", "path": "/help/track", "caption": "See your order status" },
                                { "title": "Return Policy", "path": "/help/returns", "caption": "Hassle-free returns" }
                            ]
                        },
                        {
                            "type": "SingleLink",
                            "title": "Cart",
                            "href": "/cart",
                            "icon": "ShoppingCart"
                        },
                        {
                            "type": "WithIcon",
                            "title": "My Account",
                            "gridList": [
                                { "title": "Profile", "href": "/account/profile", "icon": "User" },
                                { "title": "Orders", "href": "/account/orders", "icon": "Package" },
                                { "title": "Wishlist", "href": "/account/wishlist", "icon": "Heart" },
                                { "title": "Cart", "href": "/cart", "icon": "ShoppingCart" }
                            ]
                        }
                    ],
                    config : {
                    backgroundColor: "bg-gray-900",
                    textColor: "text-black",
                    logo: <img src="/logo.png" alt="Logo" className="h-8" />,
                    logoPosition: "left", // left | center | right
                    rightSectionItems: ["Cart","My Account"], // Move My Account to right
                    padding : "px-4 py-2",
                    }
                }
            },
            {
                "type": "ProductGrid",
                "props": {
                    "products": [
                        { "id": 1, "name": "Wireless Mouse", "originalPrice": "59.99", "image": "https://images.unsplash.com/photo-1546282035-af3f9909244" },
                        { "id": 2, "name": "Mechanical Keyboard", "discountPrice": "129.00", "originalPrice": "149.00", "image": "https://images.unsplash.com/photo-1587829858348-d3c5f49e4d1f" },
                        { "id": 3, "name": "Gaming Headset", "discountPrice": "79.50", "originalPrice": "89.00", "image": "https://images.unsplash.com/photo-1546435770-a3e9324b13e9" },
                        { "id": 4, "name": "USB-C Hub", "discountPrice": "34.99", "originalPrice": "40.00", "image": "https://images.unsplash.com/photo-1614713735118-2e061807d9f7" },
                        { "id": 5, "name": "Webcam", "discountPrice": "65.00", "originalPrice": "75.00", "image": "https://images.unsplash.com/photo-1596773347065-27a3c30656a8" },
                        { "id": 6, "name": "Laptop Stand", "discountPrice": "29.99", "originalPrice": "35.00", "image": "https://images.unsplash.com/photo-1596468764235-973e86c0e86b" },
                        { "id": 7, "name": "External SSD", "discountPrice": "99.99", "originalPrice": "119.99", "image": "https://images.unsplash.com/photo-1619566978583-99b35e3e2329" },
                        { "id": 8, "name": "Noise-Cancelling Earbuds", "discountPrice": "149.00", "originalPrice": "169.00", "image": "https://images.unsplash.com/photo-1560769612-42111d4e0b04" },
                        { "id": 9, "name": "Monitor", "discountPrice": "249.00", "originalPrice": "299.00", "image": "https://images.unsplash.com/photo-1593340578641-79b882329415" },
                        { "id": 10, "name": "Desk Lamp", "discountPrice": "25.50", "originalPrice": "30.00", "image": "https://images.unsplash.com/photo-1627885375535-6450f3b060d4" },
                        { "id": 11, "name": "Smart Watch", "discountPrice": "199.99", "originalPrice": "219.99", "image": "https://images.unsplash.com/photo-1603301072462-849c71638634" },
                        { "id": 12, "name": "Portable Speaker", "price": "89.00", "originalPrice": "99.00", "image": "https://images.unsplash.com/photo-1549420790-db0972b9a7c6" }
                    ],
                    "cardConfig": {
                        "card": {
                            "layout": "vertical",
                            "classes": "bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out"
                        },
                        "image": { "show": true, "classes": "h-40 w-full object-cover", "hoverAnimation": { "type": "scale", "value": "105" } },
                        "title": { "show": true, "classes": "text-lg font-semibold text-gray-800 p-4 pb-0" },
                        "price": { "show": true, "showOriginal": true, "classes": "text-2xl font-bold text-red-600 px-5", "originalClasses": "text-gray-400 text-base" },
                        "button": {
                            "show": true,
                            "text": "Add to Cart",
                            "classes": "bg-grey-600 text-white font-bold py-2 px-4 rounded-full m-4",
                            "onClick": { "action": "dispatch", "payload": { "type": "ADD_TO_CART", "product_id": "${product.id}" } }
                        }
                    }
                },
                "layout":"full"
            }

        ]
    },
    "/api/proxy/ui-config/navigation": {
        "pageTitle": "Navigatiob Bar",
        "components": [
            {
                "type": "Navigation",
                "props": {
                    "desktop": {
                        "components": "NavigationPanel",
                        "props":{
                            menuItems:[
                                {
                                    "type": "imageGrid",
                                    "title": "New Arrivals",
                                    "path": "/new-arrivals",
                                    "imageSrc": "/images/new-arrivals.jpg",
                                    "imageCaption": "Check out our latest collection",
                                    "gridList": [
                                        {
                                            "title": "Men's Shirts",
                                            "href": "/shop/men/shirts",
                                            "description": "Trendy shirts for every occasion"
                                        },
                                        {
                                            "title": "Women's Dresses",
                                            "href": "/shop/women/dresses",
                                            "description": "Elegant and casual dresses"
                                        },
                                        {
                                            "title": "Kids' Toys",
                                            "href": "/shop/kids/toys",
                                            "description": "Fun toys for all ages"
                                        }
                                    ]
                                },
                                {
                                    "type": "ComponentsGrid",
                                    "title": "Categories",
                                    "gridList": [
                                        { "title": "Electronics", "href": "/categories/electronics", "description": "Phones, laptops, and more" },
                                        { "title": "Home & Living", "href": "/categories/home-living", "description": "Furniture and decor" },
                                        { "title": "Sports", "href": "/categories/sports", "description": "Fitness gear and accessories" },
                                        { "title": "Beauty", "href": "/categories/beauty", "description": "Skincare and cosmetics" }
                                    ]
                                },
                                {
                                    "type": "SingleLink",
                                    "title": "Offers",
                                    "href": "/offers"
                                },
                                {
                                    "type": "List",
                                    "title": "Help & Support",
                                    "gridList": [
                                        { "title": "Customer Support", "path": "/help/support", "caption": "24/7 assistance" },
                                        { "title": "Track Order", "path": "/help/track", "caption": "See your order status" },
                                        { "title": "Return Policy", "path": "/help/returns", "caption": "Hassle-free returns" }
                                    ]
                                },
                                {
                                    "type": "WithIcon",
                                    "title": "My Account",
                                    "gridList": [
                                        { "title": "Profile", "href": "/account/profile", "icon": "User" },
                                        { "title": "Orders", "href": "/account/orders", "icon": "Package" },
                                        { "title": "Wishlist", "href": "/account/wishlist", "icon": "Heart" },
                                        { "title": "Cart", "href": "/cart", "icon": "ShoppingCart" }
                                    ]
                                }
                            ],
                            config : {
                            backgroundColor: "bg-gray-900",
                            textColor: "text-black",
                            logo: <img src="/logo.png" alt="Logo" className="h-8" />,
                            logoPosition: "left", // left | center | right
                            rightSectionItems: ["WithIcon"], // Move My Account to right
                            }
                        }
                    },
                    "mobile": {
                        "components": "SideNavigation",
                        props: {
                            logo: {
                                show: true,
                                src: "/logo.svg",
                                alt: "ShopX",
                                link: "/",
                            },
                            menu: [
                                {
                                    label: "Shop",
                                    items: [
                                        { title: "Men", href: "/men", icon: "Shirt" },
                                        { title: "Women", href: "/women", icon: "Heart" },
                                        { title: "Kids", href: "/kids", icon: "Baby" },
                                    ],
                                },
                                {
                                    label: "Categories",
                                    items: [
                                        { title: "Electronics", href: "/electronics", icon: "Laptop" },
                                        { title: "Furniture", href: "/furniture", icon: "Sofa" },
                                        { title: "Accessories", href: "/accessories", icon: "Watch" },
                                    ],
                                },
                            ],
                            profile: [
                                { title: "My Account", href: "/account", icon: "User" },
                                { title: "Cart", href: "/cart", icon: "ShoppingCart" },
                            ],
                        },
                    }
                }
            },
        ]
    }
}