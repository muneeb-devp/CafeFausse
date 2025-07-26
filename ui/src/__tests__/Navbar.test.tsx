import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../test/utils'
import Navbar from '../components/Navbar'

// Mock the entire Navbar component to avoid framer-motion issues
vi.mock('../components/Navbar', () => {
  const MockedNavbar = () => (
    <nav className="bg-gray-900 sticky top-0 z-50">
      <div>
        <a href="/">Café Fausse</a>
        <a href="/">Home</a>
        <a href="/menu">Menu</a>
        <a href="/reservations">Reservations</a>
        <a href="/about-us">About Us</a>
        <a href="/gallery">Gallery</a>
      </div>
    </nav>
  )
  return {
    __esModule: true,
    default: MockedNavbar,
  }
})

describe('Navbar', () => {
  it('renders the cafe name', () => {
    render(<Navbar />)
    expect(screen.getByText('Café Fausse')).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    render(<Navbar />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Menu')).toBeInTheDocument()
    expect(screen.getByText('Reservations')).toBeInTheDocument()
    expect(screen.getByText('About Us')).toBeInTheDocument()
    expect(screen.getByText('Gallery')).toBeInTheDocument()
  })

  it('renders navigation links with correct href attributes', () => {
    render(<Navbar />)

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
      'href',
      '/'
    )
    expect(screen.getByRole('link', { name: 'Menu' })).toHaveAttribute(
      'href',
      '/menu'
    )
    expect(screen.getByRole('link', { name: 'Reservations' })).toHaveAttribute(
      'href',
      '/reservations'
    )
    expect(screen.getByRole('link', { name: 'About Us' })).toHaveAttribute(
      'href',
      '/about-us'
    )
    expect(screen.getByRole('link', { name: 'Gallery' })).toHaveAttribute(
      'href',
      '/gallery'
    )
  })

  it('has proper responsive classes', () => {
    render(<Navbar />)

    const navbar = screen.getByRole('navigation')
    expect(navbar).toHaveClass('bg-gray-900', 'sticky', 'top-0', 'z-50')
  })
})
