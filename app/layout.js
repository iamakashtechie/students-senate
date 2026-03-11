import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Students' Senate | IIEST Shibpur",
  description:
    "Official website of the Students' Senate, Indian Institute of Engineering Science and Technology, Shibpur.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative min-h-screen flex flex-col bg-cream">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
