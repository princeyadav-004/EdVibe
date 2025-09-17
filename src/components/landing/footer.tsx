
import Link from "next/link";
import { BookOpen, Instagram, Youtube, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container flex flex-col items-center justify-between gap-6 py-8 sm:flex-row">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-white">EdVibe</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="#" aria-label="Instagram">
            <Instagram className="h-6 w-6 transition-colors hover:text-white" />
          </Link>
          <Link href="#" aria-label="YouTube">
            <Youtube className="h-6 w-6 transition-colors hover:text-white" />
          </Link>
          <Link href="#" aria-label="WhatsApp">
            <MessageCircle className="h-6 w-6 transition-colors hover:text-white" />
          </Link>
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} EdVibe. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
