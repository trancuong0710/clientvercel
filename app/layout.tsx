import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "YSalus | Appointments",
  description: "Book appointments at clinics and hospitals with YSalus",
  icons: {
    icon: [
      {
        url: "https://ysalus.io/logos/ysalus_full.png",
        type: "image/png",
      },
    ],
    shortcut: "https://ysalus.io/logos/ysalus_full.png",
    apple: "https://ysalus.io/logos/ysalus_full.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${beVietnam.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
