import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import HomePage from '../pages/Home'

// Mock the entire MenuItem module
vi.mock('../components/MenuItem', () => {
  const MockedMenuItem = ({ item }: { item: any }) => (
    <div data-testid="menu-item" data-category={item.category}>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <span data-testid="price">${item.price}</span>
      {item.dietary && (
        <span data-testid="dietary-badge">{item.dietary.join(', ')}</span>
      )}
    </div>
  )
  return {
    __esModule: true,
    default: MockedMenuItem,
  }
})

// Mock framer-motion
vi.mock('framer-motion', () => {
  const filterProps = (props: any) => {
    const {
      animate,
      initial,
      variants,
      transition,
      whileHover,
      whileTap,
      whileInView,
      viewport,
      layout,
      layoutId,
      ...cleanProps
    } = props
    return cleanProps
  }
  return {
    motion: {
      div: (props: any) => <div {...filterProps(props)} />,
      section: (props: any) => <section {...filterProps(props)} />,
      h1: (props: any) => <h1 {...filterProps(props)} />,
      h2: (props: any) => <h2 {...filterProps(props)} />,
      p: (props: any) => <p {...filterProps(props)} />,
      img: (props: any) => <img {...filterProps(props)} />,
      a: (props: any) => <a {...filterProps(props)} />,
      button: (props: any) => <button {...filterProps(props)} />,
      span: (props: any) => <span {...filterProps(props)} />,
    },
    AnimatePresence: ({ children }: any) => children,
  }
})

// Mock NewsletterSignup component
vi.mock('../components/NewsletterSignup', () => ({
  default: () => <div data-testid="newsletter-signup">Newsletter Signup</div>,
}))

// Mock react-router-dom for Link component
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')

  return {
    ...actual,
    BrowserRouter: ({ children }: any) => children,
    Link: ({ children, to, ...props }: any) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
  }
})

const renderWithRouter = (component: React.ReactElement) => {
  return render(component)
}

describe('HomePage', () => {
  it('renders the hero section with title and description', () => {
    renderWithRouter(<HomePage />)

    // Check for the main heading by role since the text is split across elements
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByText('Café')).toBeInTheDocument()
    expect(screen.getByText('Fausse')).toBeInTheDocument()
    expect(
      screen.getByText(/Where culinary artistry meets warm hospitality/i)
    ).toBeInTheDocument()
  })

  it('displays the View Our Menu link', () => {
    renderWithRouter(<HomePage />)

    const menuButton = screen.getByRole('link', { name: /view our menu/i })
    expect(menuButton).toBeInTheDocument()
    expect(menuButton).toHaveAttribute('href', '/menu')
  })

  it('displays the Visit Us section', () => {
    renderWithRouter(<HomePage />)

    expect(screen.getByText('Visit Us')).toBeInTheDocument()
    expect(screen.getByText(/1234 Culinary Ave/)).toBeInTheDocument()
    expect(screen.getByText(/\(202\) 555-4567/)).toBeInTheDocument()
  })

  it('displays restaurant hours', () => {
    renderWithRouter(<HomePage />)

    expect(
      screen.getByText(/Monday–Saturday: 5:00 PM – 11:00 PM/)
    ).toBeInTheDocument()
    expect(screen.getByText(/Sunday: 5:00 PM – 9:00 PM/)).toBeInTheDocument()
  })

  it('includes newsletter signup section', () => {
    renderWithRouter(<HomePage />)

    // The NewsletterSignup component should be rendered
    const newsletterSection = screen.getByTestId('newsletter-signup')
    expect(newsletterSection).toBeInTheDocument()
    expect(newsletterSection).toHaveTextContent('Newsletter Signup')
  })

  it('has proper semantic structure with headings', () => {
    renderWithRouter(<HomePage />)

    // Check for proper heading hierarchy
    expect(
      screen.getByRole('heading', { level: 1, name: 'Café Fausse' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Visit Us' })
    ).toBeInTheDocument()
  })
})
