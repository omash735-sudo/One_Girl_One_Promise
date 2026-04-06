import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "One Girl One Promise (OGOP) | Yes, I Can Become",
  description: "Empowering teen mothers from underprivileged communities in Malawi through education, counselling, and skills development.",
  keywords: "OGOP, teen mothers, Malawi, education, empowerment, NGO",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
