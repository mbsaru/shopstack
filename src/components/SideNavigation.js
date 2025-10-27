"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

/**
 * SideNavigation - Dynamic sidebar for mobile navigation
 * Accepts config-driven props: logo, menu, profile
 * Automatically wraps itself in SidebarProvider
 */
export default function SideNavigation({ logo, menu = [], profile = [] }) {
  const renderIcon = (iconName) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? <IconComponent size={20} /> : null;
  };

  return (
    <SidebarProvider>
      <div className="flex">
        {/* Left Sidebar */}
        <Sidebar className="w-64 bg-white border-r h-screen flex flex-col">
          {/* 🔹 Header */}
          <SidebarHeader className="p-4 border-b">
            {logo?.show && (
              <Link href={logo.link || "/"} className="flex items-center gap-2">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={36}
                  height={36}
                  className="object-contain"
                />
                <span className="font-semibold text-lg">{logo.alt}</span>
              </Link>
            )}
          </SidebarHeader>

          {/* 🔹 Menu */}
          <SidebarContent className="flex-1 overflow-y-auto">
            {menu.map((section, i) => (
              <SidebarGroup key={i} className="p-4 border-b">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">{section.label}</h3>
                <SidebarMenu>
                  {section.items.map((item, j) => (
                    <SidebarMenuItem key={j}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.href}
                          className="flex items-center gap-2 text-gray-700 hover:text-black"
                        >
                          {item.icon && renderIcon(item.icon)}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
            ))}
          </SidebarContent>

          {/* 🔹 Footer / Profile */}
          <SidebarFooter className="border-t p-4">
            {profile.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="flex items-center gap-2 text-gray-700 hover:text-black mb-2"
              >
                {item.icon && renderIcon(item.icon)}
                {item.title}
              </Link>
            ))}
          </SidebarFooter>
        </Sidebar>

      </div>
    </SidebarProvider>
  );
}
