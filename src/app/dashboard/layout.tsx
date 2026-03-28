import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | The Mok Company",
  description: "Admin dashboard for managing website content",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#060810] min-h-screen text-white">
      {children}
    </div>
  );
}
