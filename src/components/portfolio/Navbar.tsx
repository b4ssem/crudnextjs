'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Navbar({ name }: { name: string }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="l-header">
      <nav className="nav bd-grid">
        <Link href="/" className="nav__logo">{name}</Link>
        <div className={`nav__menu ${open ? 'show' : ''}`}>
          <ul className="nav__list">
            {['home', 'about', 'skills', 'work', 'contact'].map((item) => (
              <li className="nav__item" key={item}>
                <a href={`#${item}`} className="nav__link" onClick={() => setOpen(false)}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="nav__toggle" onClick={() => setOpen(!open)}>
          <i className={`bx ${open ? 'bx-x' : 'bx-menu'}`}></i>
        </div>
      </nav>
    </header>
  )
}