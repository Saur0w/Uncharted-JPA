import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header/index";
import Footer from "@/components/Footer/index";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ViewTransitions } from "next-view-transitions";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: 'Payal Joshi & Associates | Chartered Accountants',
    description: 'Trusted CA firm offering indirect-taxes, audit, and financial advisory services.',
};

export default function RootLayout({ children }) {
    return (
        <ViewTransitions>
            <ClerkProvider>
                <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
                    <body>
                        <Header />
                        {children}
                        <Footer />
                    </body>
                </html>
            </ClerkProvider>
        </ViewTransitions>
    );
}
