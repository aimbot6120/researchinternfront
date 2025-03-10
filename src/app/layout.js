// app/layout.js
import "./globals.css";           // import your global CSS
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "XGaming Research Agent",
  description: "Agent to research and deconstruct games and genre",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "var(--bg-dark)", color: "var(--text-primary)" }}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
