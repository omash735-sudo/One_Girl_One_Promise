import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin Panel — OGOP",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Hide main navbar on admin pages */
          header.fixed {
            display: none !important;
          }
          /* Hide the spacer div */
          .h-16 {
            display: none !important;
          }
          /* Hide any nav with fixed positioning */
          nav.fixed {
            display: none !important;
          }
        `
      }} />
      <div className="min-h-screen bg-[#F8F9FA]">
        {children}
      </div>
    </>
  );
}
