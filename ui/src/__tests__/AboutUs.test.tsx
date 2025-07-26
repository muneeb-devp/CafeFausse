import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import AboutUs from '../pages/AboutUs'

// Mock framer-motion with proper prop filtering
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
      ...filteredProps
    } = props
    return filteredProps
  }

  return {
    motion: {
      div: ({ children, ...props }: any) => (
        <div {...filterProps(props)}>{children}</div>
      ),
      section: ({ children, ...props }: any) => (
        <section {...filterProps(props)}>{children}</section>
      ),
      h1: ({ children, ...props }: any) => (
        <h1 {...filterProps(props)}>{children}</h1>
      ),
      h2: ({ children, ...props }: any) => (
        <h2 {...filterProps(props)}>{children}</h2>
      ),
      h3: ({ children, ...props }: any) => (
        <h3 {...filterProps(props)}>{children}</h3>
      ),
      p: ({ children, ...props }: any) => (
        <p {...filterProps(props)}>{children}</p>
      ),
      img: (props: any) => <img {...filterProps(props)} />,
    },
  }
})

const renderWithRouter = (component: React.ReactElement) => {
  return render(component)
}

describe('AboutUs', () => {
  it('renders the page title', () => {
    renderWithRouter(<AboutUs />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'About Café Fausse' })
    ).toBeInTheDocument()
  })

  it('displays the restaurant story section', () => {
    renderWithRouter(<AboutUs />)

    expect(
      screen.getByRole('heading', { level: 2, name: 'Our Story' })
    ).toBeInTheDocument()
    expect(screen.getByText(/Founded in 2010/)).toBeInTheDocument()
    expect(
      screen.getByText(/Chef Antonio Rossi and restaurateur Maria Lopez/)
    ).toBeInTheDocument()
  })

  it('displays the founders information section', () => {
    renderWithRouter(<AboutUs />)

    expect(
      screen.getByRole('heading', { level: 2, name: 'Meet Our Founders' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 3, name: 'Chef Antonio Rossi' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 3, name: 'Maria Lopez' })
    ).toBeInTheDocument()
  })

  it('displays content about Chef Antonio Rossi', () => {
    renderWithRouter(<AboutUs />)

    expect(screen.getByText(/culinary visionary/)).toBeInTheDocument()
    expect(
      screen.getByText(/Michelin-starred kitchens across Italy/)
    ).toBeInTheDocument()
  })

  it('displays content about Maria Lopez', () => {
    renderWithRouter(<AboutUs />)

    expect(screen.getByText(/keen eye for hospitality/)).toBeInTheDocument()
    expect(
      screen.getByText(/every guest at Café Fausse feels welcomed/)
    ).toBeInTheDocument()
  })

  it('displays restaurant mission statement', () => {
    renderWithRouter(<AboutUs />)

    expect(
      screen.getByText(
        /traditional Italian flavors with modern culinary innovation/
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(/unforgettable dining experience/)
    ).toBeInTheDocument()
  })

  it('displays commitment to local sourcing', () => {
    renderWithRouter(<AboutUs />)

    expect(
      screen.getByText(/sourcing locally grown ingredients/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/freshest and most vibrant flavors/)
    ).toBeInTheDocument()
  })

  it('has proper semantic structure', () => {
    renderWithRouter(<AboutUs />)

    // Check that the main headings are present
    const h1Headings = screen.getAllByRole('heading', { level: 1 })
    const h2Headings = screen.getAllByRole('heading', { level: 2 })
    const h3Headings = screen.getAllByRole('heading', { level: 3 })

    expect(h1Headings.length).toBe(1)
    expect(h2Headings.length).toBe(2) // "Our Story" and "Meet Our Founders"
    expect(h3Headings.length).toBe(2) // Chef Antonio Rossi and Maria Lopez
  })

  it('displays founder images with proper alt text', () => {
    renderWithRouter(<AboutUs />)

    expect(screen.getByAltText('Chef Antonio Rossi')).toBeInTheDocument()
    expect(screen.getByAltText('Maria Lopez')).toBeInTheDocument()
  })
})
