import "./globals.css";
import { PwaRegister } from "@/components/pwa-register";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OrderSync SaaS",
  description: "Multi-tenant digital menu and cafe ordering platform",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <PwaRegister />
      </body>
    </html>
  );
}
