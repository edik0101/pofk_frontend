import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/SideBar/SideBar";
import Header from "@/components/Header/Header";
import { SideBarProvider } from "@/providers/SideBarContext/SideBarContext";

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
          <div className="w-full px-5 py-6">
            <Header />
            {children}
          </div>
        </SideBarProvider>
      </body>
    </html>
  );
}
