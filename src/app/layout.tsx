import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project đã ngưng phát triển",
  description: "Dự án này đã ngừng phát triển.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="bg-black text-white h-screen w-screen flex items-center justify-center overflow-hidden m-0">
        <h1 className="text-3xl md:text-5xl font-bold">Project đã ngưng phát triển.</h1>
      </body>
    </html>
  );
}
