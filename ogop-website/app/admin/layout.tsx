import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin Panel — OGOP",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
