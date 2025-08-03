'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { ModeToggle } from './toggle-button'

function Navigation({ onLinkClick }: { onLinkClick?: () => void }) {
  const links = [
    { href: '#', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skill', label: 'Skill' },
    { href: '#work', label: 'Work' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <ul className="flex flex-col sm:flex-row sm:space-x-8 text-foreground sm:items-center">
      {links.map((link) => (
        <li key={link.href} className="my-2 sm:my-0 hover:underline">
          <Link
            href={link.href}
            onClick={onLinkClick}
            className="transition-colors hover:text-primary"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed inset-x-0 top-0 z-50 w-full border-b border-border bg-background/70 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <Link
            href="/"
            className="text-xl font-bold text-foreground hover:text-primary transition-colors hover:underline hove: scale-105"
          >
            Ahsaas
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden sm:flex">
            <Navigation />
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <ModeToggle />
            {/* Mobile Toggle Button */}
            <div className="sm:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="sm:hidden px-4 pb-4 bg-background/90 backdrop-blur"
        >
          <nav className="text-center">
            <Navigation onLinkClick={() => setIsOpen(false)} />
          </nav>
        </motion.div>
      )}
    </div>
  )
}

export default Navbar
