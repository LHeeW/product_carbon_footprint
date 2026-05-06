import Provider from "./components/provider";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-full flex flex-col bg-gray-100">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
