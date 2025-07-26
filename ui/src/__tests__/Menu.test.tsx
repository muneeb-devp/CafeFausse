import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Menu from '../pages/Menu'

// Mock framer-motion with filterProps
vi.mock('framer-motion', () => {
  const filterProps = (props: Record<string, any>) => {
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
      ...rest
    } = props
    return rest
  }

  return {
    motion: {
      div: (props: Record<string, any>) => <div {...filterProps(props)} />,
      section: (props: Record<string, any>) => (
        <section {...filterProps(props)} />
      ),
      h1: (props: Record<string, any>) => <h1 {...filterProps(props)} />,
      h2: (props: Record<string, any>) => <h2 {...filterProps(props)} />,
      h3: (props: Record<string, any>) => <h3 {...filterProps(props)} />,
      p: (props: Record<string, any>) => <p {...filterProps(props)} />,
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  }
})

// Mock MenuItem component
vi.mock('../components/MenuItem', () => ({
  __esModule: true,
  default: ({
    item,
  }: {
    item: { name: string; category: string; price: number; description: string }
  }) => (
    <div data-testid="menu-item">
      <h3>{item.name}</h3>
      <div>{item.category}</div>
      <div>${item.price}</div>
      <p>{item.description}</p>
    </div>
  ),
}))

const renderMenu = () => {
  return render(
    <BrowserRouter>
      <Menu />
    </BrowserRouter>
  )
}

describe('Menu', () => {
  it('renders the page title', () => {
    renderMenu()
    expect(screen.getByText('Our Menu')).toBeInTheDocument()
  })

  it('displays menu categories', () => {
    renderMenu()
    expect(
      screen.getByRole('heading', { name: 'Starters' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Main Courses' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Desserts' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Beverages' })
    ).toBeInTheDocument()
  })

  it('renders menu items for each category', () => {
    renderMenu()
    const menuItems = screen.getAllByTestId('menu-item')
    expect(menuItems.length).toBeGreaterThan(0)
  })

  it('displays specific menu items', () => {
    renderMenu()
    expect(screen.getByText('Bruschetta')).toBeInTheDocument()
    expect(screen.getByText('Grilled Salmon')).toBeInTheDocument()
    expect(screen.getByText('Tiramisu')).toBeInTheDocument()
  })

  it('displays menu items with prices', () => {
    renderMenu()
    expect(screen.getByText('$8.5')).toBeInTheDocument()
    expect(screen.getByText('$22')).toBeInTheDocument()
    expect(screen.getByText('$7.5')).toBeInTheDocument()
  })
})
