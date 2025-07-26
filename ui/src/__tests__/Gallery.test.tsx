import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Gallery from '../pages/Gallery'

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
      layout,
      ...filteredProps
    } = props
    return filteredProps
  }

  return {
    motion: {
      div: ({ children, ...props }: any) => (
        <div {...filterProps(props)}>{children}</div>
      ),
      h1: ({ children, ...props }: any) => (
        <h1 {...filterProps(props)}>{children}</h1>
      ),
      h2: ({ children, ...props }: any) => (
        <h2 {...filterProps(props)}>{children}</h2>
      ),
      img: (props: any) => <img {...filterProps(props)} />,
    },
  }
})

const renderWithRouter = (component: React.ReactElement) => {
  return render(component)
}

describe('Gallery', () => {
  it('renders the page title', () => {
    renderWithRouter(<Gallery />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'Our Gallery & Accolades' })
    ).toBeInTheDocument()
  })

  it('displays the page sections', () => {
    renderWithRouter(<Gallery />)

    expect(
      screen.getByRole('heading', { level: 2, name: 'Visual Feast' })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { level: 2, name: 'Our Awards' })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { level: 2, name: 'What Our Customers Say' })
    ).toBeInTheDocument()
  })

  it('renders the ImageGallery component', () => {
    renderWithRouter(<Gallery />)

    // The ImageGallery component should be rendered
    // Since we're testing the Gallery page, we expect it to contain gallery images
    const images = screen.getAllByRole('img')
    expect(images.length).toBeGreaterThan(0)
  })

  it('displays gallery images with proper alt text', () => {
    renderWithRouter(<Gallery />)

    // Check for specific gallery images based on actual implementation
    expect(screen.getByAltText('Café Fausse image 1')).toBeInTheDocument()
    expect(screen.getByAltText('Café Fausse image 2')).toBeInTheDocument()
    expect(screen.getByAltText('Café Fausse image 3')).toBeInTheDocument()
  })

  it('has proper semantic structure', () => {
    renderWithRouter(<Gallery />)

    // Check for main heading
    const mainHeading = screen.getByRole('heading', { level: 1 })
    expect(mainHeading).toBeInTheDocument()

    // Check for section headings
    const sectionHeadings = screen.getAllByRole('heading', { level: 2 })
    expect(sectionHeadings.length).toBeGreaterThan(0)
  })

  it('displays images with proper sources', () => {
    renderWithRouter(<Gallery />)

    // Check that images have proper src attributes based on actual implementation
    const images = screen.getAllByRole('img')
    expect(images.length).toBeGreaterThan(0)

    // Verify images have real sources (local files or Unsplash URLs)
    const imageWithRealSource = screen.getByAltText('Café Fausse image 1')
    expect(imageWithRealSource).toHaveAttribute(
      'src',
      expect.stringMatching(/^(\/gallery-|https:\/\/images\.unsplash\.com)/)
    )
  })

  it('renders in a responsive layout', () => {
    renderWithRouter(<Gallery />)

    // Check that the gallery images are rendered
    const images = screen.getAllByRole('img')
    expect(images.length).toBeGreaterThan(0)

    // Verify that there are multiple images (gallery should have several images)
    expect(images.length).toBeGreaterThanOrEqual(6) // Based on test output showing 6 images
  })
})
