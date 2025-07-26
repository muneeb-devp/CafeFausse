import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '../test/utils'
import ReservationForm from '../components/ReservationForm'

// Mock framer-motion using centralized mock
vi.mock('framer-motion', async () => {
  const mock = await import('./mocks/framer-motion')
  return mock.default
})

// Mock global fetch
const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

describe('ReservationForm', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  it('renders form with all required fields', () => {
    render(<ReservationForm />)

    expect(screen.getByText('Make a Reservation')).toBeInTheDocument()
    expect(screen.getByLabelText(/Time Slot/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Number of Guests/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Your Name/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email Address/)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Confirm Reservation/ })
    ).toBeInTheDocument()
  })

  it('displays form elements correctly', () => {
    render(<ReservationForm />)

    const timeSlotSelect = screen.getByLabelText(/Time Slot/)
    expect(timeSlotSelect).toHaveAttribute('required')
    expect(timeSlotSelect.tagName).toBe('SELECT')

    const nameInput = screen.getByLabelText(/Your Name/)
    expect(nameInput).toHaveAttribute('required')
    expect(nameInput).toHaveAttribute('type', 'text')

    const emailInput = screen.getByLabelText(/Email Address/)
    expect(emailInput).toHaveAttribute('required')
    expect(emailInput).toHaveAttribute('type', 'email')

    const phoneInput = screen.getByLabelText(/Phone Number/)
    expect(phoneInput).toHaveAttribute('type', 'tel')
    expect(phoneInput).not.toHaveAttribute('required')
  })

  it('updates form fields when user types', () => {
    render(<ReservationForm />)

    const nameInput = screen.getByLabelText(/Your Name/)
    const emailInput = screen.getByLabelText(/Email Address/)

    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })

    expect(nameInput).toHaveValue('John Doe')
    expect(emailInput).toHaveValue('john@example.com')
  })

  it('has time slot options available', () => {
    render(<ReservationForm />)

    const timeSlotSelect = screen.getByLabelText(/Time Slot/)
    const options = timeSlotSelect.querySelectorAll('option')

    expect(options.length).toBeGreaterThan(1) // Should have at least the default option plus time slots
    expect(options[0]).toHaveTextContent('Select a date and time')
  })

  it('renders submit button with correct text', () => {
    render(<ReservationForm />)

    const submitButton = screen.getByRole('button', {
      name: /Confirm Reservation/,
    })
    expect(submitButton).toHaveAttribute('type', 'submit')
    expect(submitButton).toBeInTheDocument()
  })
})
