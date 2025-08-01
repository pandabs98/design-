'use client'

import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background text-muted-foreground">
      <div className="mx-auto max-w-7xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between">
        
        {/* Logo Centered on Mobile */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold text-foreground hover:text-primary"
        >
          <div className="">
          </div>
          <span>Riya</span>
        </Link>

        {/* Copyright */}
        <p className="text-sm mt-4 sm:mt-0">
          © 2025 Riya —{' '}
          <a
            href="https://twitter.com/knyttneve"
            className="hover:text-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            @Riya
          </a>
        </p>

        {/* Social Icons */}
        <div className="flex gap-4 mt-4 sm:mt-0">
          {[
            {
              href: 'https://facebook.com',
              icon: (
                <svg
                  fill="currentColor"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              ),
            },
            {
              href: 'https://twitter.com',
              icon: (
                <svg
                  fill="currentColor"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 4v1a10.66 10.66 0 01-9-4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              ),
            },
            {
              href: 'https://instagram.com',
              icon: (
                <svg
                  fill="none"
                  stroke="currentColor"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                </svg>
              ),
            },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
