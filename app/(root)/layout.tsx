import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import { Inter } from "next/font/google";

import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Topbar from "@/components/shared/Topbar";
import RightSidebar from "@/components/shared/RightSidebar";
import AuthRedirect from "@/components/shared/AuthRedirect";
import "../globals.css";

export const metadata: Metadata = {
  title: "Threads",
  description: "A Next.js 13 Meta Threads Clone",
};

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <AuthRedirect>
            {/* <Providers>
              <UserContextSetter /> */}

            <Topbar />

            <main className="flex flex-row">
              <LeftSidebar />
              <section className="main-container">
                <div className="w-full max-w-4xl">{children}</div>
              </section>

              <RightSidebar />
            </main>

            <Bottombar />
            {/* </Providers> */}
          </AuthRedirect>
        </body>
      </html>
    </ClerkProvider>
  );
}
