import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/components/StoreProvider";
import { getItem } from '@/utils/cookiesServer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ShopStack",
  description: "One place to buy",
};

export default async function RootLayout({ children }) {
  const token = await getItem('authToken');
  const user = await getItem('user');
  const preloadedState = {
    auth: {
      token,
      user: user ? JSON.parse(user) : null,
      isAuthenticated: !!token,
    },
    other: {}, 
  };
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider preloadedState={preloadedState}>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
