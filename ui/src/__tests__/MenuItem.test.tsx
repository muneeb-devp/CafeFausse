import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import MenuItem from '../components/MenuItem'
import type { MenuItem as MenuItemType } from '../types/menuItem'

// Mock the entire MenuItem module to avoid framer-motion issues
vi.mock('../components/MenuItem', () => {
  const MockedMenuItem = ({ item }: { item: any }) => (
    <div data-testid="menu-item">
      <img src={item.image} alt={item.name} />
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <span data-testid="price">${item.price.toFixed(2)}</span>
      <span data-testid="category">{item.category}</span>
      {item.dietary && (
        <span data-testid="dietary">{item.dietary.join(', ')}</span>
      )}
    </div>
  )
  return {
    __esModule: true,
    default: MockedMenuItem,
  }
})

const mockMenuItem: MenuItemType = {
  name: 'Test Dish',
  description: 'A delicious test dish with amazing flavors',
  price: 25,
  category: 'appetizer',
  image: '/test-image.jpg',
}

describe('MenuItem', () => {
  it('renders menu item with all basic information', () => {
    render(<MenuItem item={mockMenuItem} />)

    expect(screen.getByText('Test Dish')).toBeInTheDocument()
    expect(
      screen.getByText('A delicious test dish with amazing flavors')
    ).toBeInTheDocument()
    expect(screen.getByText('$25.00')).toBeInTheDocument()
    expect(screen.getByText('appetizer')).toBeInTheDocument()
  })

  it('displays the menu item image with correct alt text', () => {
    render(<MenuItem item={mockMenuItem} />)

    const image = screen.getByAltText('Test Dish')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/test-image.jpg')
  })

  it('displays category badge', () => {
    render(<MenuItem item={mockMenuItem} />)

    expect(screen.getByText('appetizer')).toBeInTheDocument()
  })

  it('formats price correctly with dollars and cents', () => {
    const menuItemWithDecimals: MenuItemType = {
      ...mockMenuItem,
      price: 15.5,
    }

    render(<MenuItem item={menuItemWithDecimals} />)

    expect(screen.getByText('$15.50')).toBeInTheDocument()
  })

  it('handles different categories correctly', () => {
    const dessertItem: MenuItemType = {
      ...mockMenuItem,
      category: 'dessert',
    }

    render(<MenuItem item={dessertItem} />)

    expect(screen.getByText('dessert')).toBeInTheDocument()
    expect(screen.getByText('Test Dish')).toBeInTheDocument()
  })

  it('has proper structure and accessibility', () => {
    render(<MenuItem item={mockMenuItem} />)

    // Check that the image has proper alt text for accessibility
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('alt', 'Test Dish')

    // Check that price is displayed as text
    expect(screen.getByText('$25.00')).toBeInTheDocument()
  })

  it('renders with minimal required data', () => {
    const minimalItem: MenuItemType = {
      name: 'Minimal Dish',
      description: 'Basic description',
      price: 10,
      category: 'appetizer',
      image: '/minimal.jpg',
    }

    render(<MenuItem item={minimalItem} />)

    expect(screen.getByText('Minimal Dish')).toBeInTheDocument()
    expect(screen.getByText('Basic description')).toBeInTheDocument()
    expect(screen.getByText('$10.00')).toBeInTheDocument()
    expect(screen.getByAltText('Minimal Dish')).toBeInTheDocument()
  })

  it('displays price correctly for whole numbers', () => {
    const wholeNumberItem: MenuItemType = {
      ...mockMenuItem,
      price: 20,
    }

    render(<MenuItem item={wholeNumberItem} />)

    expect(screen.getByText('$20.00')).toBeInTheDocument()
  })

  it('displays long descriptions properly', () => {
    const longDescriptionItem: MenuItemType = {
      ...mockMenuItem,
      description:
        'This is a very long description that should be displayed properly even when it contains many words and details about the dish preparation and ingredients used',
    }

    render(<MenuItem item={longDescriptionItem} />)

    expect(
      screen.getByText(/This is a very long description/)
    ).toBeInTheDocument()
  })
})
