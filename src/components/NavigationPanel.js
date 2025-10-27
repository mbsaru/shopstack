"use client";

import * as React from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import { useSelector } from "react-redux";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

/**
 * Fully dynamic Navigation Panel
 * Props:
 * - menuItems: array of menu item objects (your JSON structure)
 * - config: styling and layout configuration
 */
export function NavigationPanel({ menuItems = [], config = {} }) {
  const {
    backgroundColor = "bg-white",
    textColor = "text-black",
    logo = null,
    logoPosition = "left", // left | center | right
    rightSectionItems = [], // types to move to right section
    gapBetweenSections = "gap-4",
    padding = "px-4 py-2",
  } = config;


  const leftItems = menuItems.filter(item => !rightSectionItems.includes(item.title));
  const rightItems = menuItems.filter(item => rightSectionItems.includes(item.title));

  return (
    <nav className={`w-full ${backgroundColor} ${textColor} flex items-center justify-between ${padding}`}>
      
      {/* Left Section */}
      <div className={`flex items-center ${gapBetweenSections}`}>
        {logo && logoPosition === "left" && <div className="logo">{logo}</div>}
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            {renderMenuItems(leftItems)}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Centered Logo */}
      {logo && logoPosition === "center" && <div className="logo mx-auto">{logo}</div>}

      {/* Right Section */}
      {rightItems.length > 0 && (
        <div className={`flex items-center ${gapBetweenSections}`}>
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              {renderMenuItems(rightItems)}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      )}
    </nav>
  );
}

/** Render menu items dynamically based on type */
function renderMenuItems(menuItems) {
  return menuItems.map((menuItem, idx) => {
    switch (menuItem.type) {
      case "imageGrid":
        return renderImageGrid(menuItem, idx);
      case "ComponentsGrid":
        return renderComponentsGrid(menuItem, idx);
      case "SingleLink":
        return renderSingleLink(menuItem, idx);
      case "List":
        return renderList(menuItem, idx);
      case "WithIcon":
        return renderWithIcon(menuItem, idx);
      default:
        return null;
    }
  });
}

/** Image Grid Menu */
function renderImageGrid(item, idx) {
  return (
    <NavigationMenuItem key={idx}>
      <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
          <li className="row-span-3">
            <NavigationMenuLink asChild>
              <a
                className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                href={item.path}
              >
                {item.imageSrc && (
                  <img
                    className="mt-4 mb-2 text-lg font-medium"
                    src={item.imageSrc}
                    alt={item.title}
                  />
                )}
                {item.imageCaption && (
                  <p className="text-muted-foreground text-sm leading-tight">
                    {item.imageCaption}
                  </p>
                )}
              </a>
            </NavigationMenuLink>
          </li>
          {item.gridList?.map((gridItem, gridIdx) => (
            <DynamicListItem key={gridIdx} href={gridItem.href} title={gridItem.title}>
              {gridItem.description}
            </DynamicListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

/** Components Grid Menu */
function renderComponentsGrid(item, idx) {
  return (
    <NavigationMenuItem key={idx}>
      <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
          {item.gridList?.map((component, compIdx) => (
            <DynamicListItem
              key={compIdx}
              title={component.title}
              href={component.href}
            >
              {component.description}
            </DynamicListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

/** Single Link Menu */
function renderSingleLink(item, idx) {
    const cartItems = useSelector((state) => state.cart.totalItems || 0);
    console.log('cartItems',cartItems)
  return (
    <NavigationMenuItem key={idx}>
      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
        <Link href={item.href} >
          {item.icon ? renderIcon(item.icon) : item.title}
          {item.title === "Cart" && cartItems && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartItems}
            </span>
          )}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

/** List Menu */
function renderList(item, idx) {
  return (
    <NavigationMenuItem key={idx}>
      <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[300px] gap-4">
          {item.gridList?.map((subItem, subIdx) => (
            <NavigationMenuLink key={subIdx} asChild>
              <Link href={subItem.path}>
                <div className="font-medium">{subItem.title}</div>
                {subItem.caption && (
                  <div className="text-muted-foreground">{subItem.caption}</div>
                )}
              </Link>
            </NavigationMenuLink>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

/** Menu With Icon */
function renderWithIcon(item, idx) {
  return (
    <NavigationMenuItem key={idx}>
      <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-4">
          {item.gridList?.map((subItem, iconIdx) => (
            <li key={iconIdx}>
              <NavigationMenuLink asChild>
                <Link href={subItem.href} className="flex items-center gap-2">
                  {renderIcon(subItem.icon)}
                  {subItem.title}
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

/** Render icon dynamically from lucide-react */
const renderIcon = (iconName) => {
  const IconComponent = Icons[iconName];
  return IconComponent ? <IconComponent size={18} /> : null;
};

/** Generic List Item Component */
function DynamicListItem({ title, children, href, ...props }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
