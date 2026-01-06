import "./globals.css";

export const metadata = {
  title: "ManageMart",
  description: "Manage your store with ease",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <head>
        {/* ✅ ADD THIS LINE HERE */}
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-100 text-slate-900">
        {children}
      </body>
    </html>
  );
}
