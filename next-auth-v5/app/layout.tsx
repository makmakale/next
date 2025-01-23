import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.css";
import { auth } from "@/lib/auth";
import Provider from "@/components/provider";
import ErrorBoundary from "@/components/common/error-boundary";
import Navbar from "@/components/navbar";

const inter = Poppins({ subsets: ["latin"], weight: "600" });

export const metadata: Metadata = {
  title: "Next Auth v5 Boilerplate",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider session={session}>
          <div className="h-screen flex flex-col justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
            <div className="lg:w-[800px]">
              <Navbar />

              <ErrorBoundary>{children}</ErrorBoundary>
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
