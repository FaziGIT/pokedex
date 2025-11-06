import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ShinyProvider } from "@/contexts/ShinyContext";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Pokédex TASSART Mathis - 5IW2",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ShinyProvider>{children}</ShinyProvider>
            </body>
        </html>
    );
}
