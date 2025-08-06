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
          <span>Ahsaas</span>
        </Link>

        {/* Copyright */}
        {/* <p className="text-sm mt-4 sm:mt-0">
          © 2025 BhagyaShwariya —{' '}
          <a
            href="https://x.com/"
            className="hover:text-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            @Panda
          </a>
        </p> */}

        {/* Social Icons */}
        <div className="flex gap-4 mt-4 sm:mt-0">
          {[
            {
              href: 'https://telegram.me/@DeamonxHACKS',
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
