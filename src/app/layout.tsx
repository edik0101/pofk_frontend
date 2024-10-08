import React from "react";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/SideBar/SideBar";
import Header from "@/components/Header/Header";
import { Toaster } from "@/components/ui/sonner";
import { SideBarProvider } from "@/providers/SideBarContext/SideBarContext";
import MainContainer from "@/components/MainContainer/MainContainer";

const roboto = Roboto({
  subsets: ["cyrillic"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} min-w-screen flex min-h-screen bg-slate-100 antialiased`}
      >
        <SideBarProvider>
          <SideBar />
          <MainContainer>
            <React.Fragment>
              <Header />
              <main>{children}</main>
            </React.Fragment>
          </MainContainer>
          <Toaster position="bottom-right" />
        </SideBarProvider>
      </body>
    </html>
  );
}
