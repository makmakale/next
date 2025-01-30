import "@/styles/globals.css";
import 'react-quill/dist/quill.snow.css'
import {Poppins} from "next/font/google";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import {ThemeProvider} from "@/components/Providers/theme-provider"
import SessionProvider from "@/components/Providers/session-provider";
import {Toaster} from "@/components/ui/toaster";
import {auth as getSessionUser} from "@/lib/auth";

const inter = Poppins({subsets: ["latin"], weight: '400'});

export const metadata = {
  title: "To Do Board",
};

export default async function RootLayout({children, auth}) {
  const session = await getSessionUser()

  return (
    <html lang="en" suppressHydrationWarning>
    <body className={`${inter.className} min-h-screen flex flex-col`}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider session={session}>
        <Navbar/>

        <div className="flex-grow flex">
          {!!session ?
            <>
              <aside className="hidden lg:block border-r border-r-gray-300 dark:border-r-gray-800">
                <Sidebar/>
              </aside>

              <main className="flex-grow overflow-hidden">
                {children}
              </main>
            </>
            :
            <main className="flex-grow">
              {auth}
            </main>
          }
          <Toaster/>
        </div>

        <Footer/>
      </SessionProvider>
    </ThemeProvider>
    </body>
    </html>
  );
}
