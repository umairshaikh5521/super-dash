import { Toaster } from "@/components/ui/toaster";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { UserNav } from "@/components/dashboard/user-nav";
import { Search } from "@/components/dashboard/search";
import { MainNav } from "@/components/dashboard/main-nav";
import TeamSwitcher from "@/components/dashboard/team-switcher";
import AuthProvider from "@/context/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" className="dark">
        <body className={inter.className}>
          <main>
            <ThemeProvider attribute="class">
              <AuthProvider>
                <div className=" flex-col flex">
                  <div className="border-b">
                    <div className="container flex h-16 items-center px-4">
                      <TeamSwitcher />
                      {/* <ThemeSwitch /> */}
                      <MainNav className="lg:mx-6 fixed w-[250px] h-screen left-[-100%] top-0 bg-[#000] flex-col m-0 z-20 h-auto" />
                      <div className="ml-auto flex items-center space-x-4">
                        <Search />
                        <UserNav />
                      </div>
                    </div>
                  </div>
                  <div className="container flex-1 space-y-4 px-4 pt-6">
                    {children}
                  </div>
                </div>
              </AuthProvider>
            </ThemeProvider>
          </main>
          <Toaster />
        </body>
      </html>
    </>
  );
}
