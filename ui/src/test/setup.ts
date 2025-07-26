import '@testing-library/jest-dom'
import React, { type ReactNode } from 'react'
import { vi } from 'vitest'

// Mock framer-motion for testing
vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    section: 'section',
    nav: 'nav',
    ul: 'ul',
    li: 'li',
    h1: 'h1',
    h2: 'h2',
    p: 'p',
    button: 'button',
    img: 'img',
    form: 'form',
  },
  AnimatePresence: ({ children }: { children: ReactNode }) => children,
}))

// Mock react-router-dom for testing
vi.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }: { children: ReactNode }) => children,
  Routes: ({ children }: { children: ReactNode }) => children,
  Route: () => null,
  Link: ({ children, to }: { children: ReactNode; to: string }) =>
    React.createElement('a', { href: to }, children),
  useLocation: () => ({ pathname: '/' }),
  useNavigate: () => vi.fn(),
}))
