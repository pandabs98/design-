'use client'

import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="w-full border-t border-border bg-background text-muted-foreground">
      <div className="mx-auto max-w-7xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between">
        
        {/* Logo Centered on Mobile */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold text-foreground hover:text-primary"
        >
          <span>Ahsaas</span>
        </Link>

        {/* Social Icons */}
        <div className="flex gap-4 mt-4 sm:mt-0">
          <a
            href="https://t.me/DeamonxHACKS"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            {/* Telegram Logo */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0C5.372 0 0 5.372 0 12c0 6.627 5.372 12 12 12s12-5.373 12-12C24 5.372 18.627 0 12 0zm5.157 7.684l-1.64 7.735c-.124.55-.454.685-.92.426l-2.547-1.88-1.23 1.186c-.136.135-.25.25-.513.25l.184-2.606 4.745-4.29c.207-.184-.046-.288-.322-.105l-5.857 3.682-2.518-.787c-.55-.17-.56-.55.114-.813l9.83-3.792c.457-.17.857.105.71.787z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
