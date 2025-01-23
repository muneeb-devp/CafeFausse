import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ReservationFormData } from '../types/reservationFormData'

const ReservationForm: React.FC = () => {
  const [formData, setFormData] = useState<ReservationFormData>({
    timeSlot: '',
    numGuests: 1,
    customerName: '',
    emailAddress: '',
    phoneNumber: '',
    newsletterSignup: false,
  })
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      // Clean up any pending timeouts
      setShowSuccessPopup(false)
    }
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setFormData((prev: ReservationFormData) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    setIsSuccess(false)

    // Client-side validation (FR-7)
    if (
      !formData.timeSlot ||
      !formData.customerName ||
      !formData.emailAddress ||
      formData.numGuests < 1
    ) {
      setMessage(
        'Please fill in all required fields (Time Slot, Number of Guests, Name, Email).'
      )
      return
    }
    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        formData.emailAddress
      )
    ) {
      setMessage('Please enter a valid email address.')
      return
    }

    setIsLoading(true)
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
      const response = await fetch(`${apiUrl}/api/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (response.ok) {
        setMessage(data.message)
        setIsSuccess(true)
        setShowSuccessPopup(true)

        // Hide popup after 3 seconds
        setTimeout(() => {
          setShowSuccessPopup(false)
        }, 3000)

        // Clear form on success
        setFormData({
          timeSlot: '',
          numGuests: 1,
          customerName: '',
          emailAddress: '',
          phoneNumber: '',
          newsletterSignup: false,
        })
      } else {
        setMessage(
          data.message || 'Failed to make reservation. Please try again.'
        )
        setIsSuccess(false)
      }
    } catch (error) {
      console.error('Reservation error:', error)
      setMessage('An error occurred. Please try again later.')
      setIsSuccess(false)
    } finally {
      setIsLoading(false)
    }
  }

  // Generate time slots for the next 7 days, every hour from 5 PM to 10 PM
  const generateTimeSlots = () => {
    const slots = []
    const now = new Date()
    for (let i = 0; i < 7; i++) {
      // Next 7 days
      const date = new Date(now)
      date.setDate(now.getDate() + i)
      for (let hour = 17; hour <= 22; hour++) {
        // 5 PM to 10 PM
        const slot = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          hour,
          0,
          0
        )
        // Only add future slots
        if (slot > now) {
          slots.push(slot.toISOString().slice(0, 16)) // YYYY-MM-DDTHH:MM format
        }
      }
    }
    return slots
  }

  const availableTimeSlots = generateTimeSlots()

  return (
    <motion.section
      className="bg-white p-8 rounded-lg shadow-xl max-w-3xl mx-auto my-12"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="text-4xl font-serif text-center text-gray-800 mb-8"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Make a Reservation
      </motion.h2>
      <motion.form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {/* Time Slot (FR-6) */}
        <div>
          <label
            htmlFor="timeSlot"
            className="block text-gray-700 text-lg font-medium mb-2"
          >
            Time Slot <span className="text-red-500">*</span>
          </label>
          <select
            id="timeSlot"
            name="timeSlot"
            value={formData.timeSlot}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          >
            <option value="">Select a date and time</option>
            {availableTimeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {new Date(slot).toLocaleString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}
              </option>
            ))}
          </select>
        </div>

        {/* Number of Guests (FR-6) */}
        <div>
          <label
            htmlFor="numGuests"
            className="block text-gray-700 text-lg font-medium mb-2"
          >
            Number of Guests <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="numGuests"
            name="numGuests"
            value={formData.numGuests}
            onChange={handleChange}
            min="1"
            max="10"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        {/* Customer Name (FR-6) */}
        <div>
          <label
            htmlFor="customerName"
            className="block text-gray-700 text-lg font-medium mb-2"
          >
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        {/* Email Address (FR-6) */}
        <div>
          <label
            htmlFor="emailAddress"
            className="block text-gray-700 text-lg font-medium mb-2"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="emailAddress"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        {/* Phone Number (Optional) (FR-6) */}
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-gray-700 text-lg font-medium mb-2"
          >
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Newsletter Signup */}
        <div className="md:col-span-2 flex items-center mt-4">
          <input
            type="checkbox"
            id="newsletterSignup"
            name="newsletterSignup"
            checked={formData.newsletterSignup}
            onChange={handleChange}
            className="h-5 w-5 text-orange-600 rounded focus:ring-orange-500 border-gray-300"
          />
          <label
            htmlFor="newsletterSignup"
            className="ml-3 text-gray-700 text-lg"
          >
            Sign me up for the Café Fausse newsletter!
          </label>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 text-center mt-6">
          <motion.button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-md transition-colors duration-200 text-xl disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? 'Booking...' : 'Confirm Reservation'}
          </motion.button>
        </div>
      </motion.form>
      <AnimatePresence>
        {message && (
          <motion.p
            className={`mt-6 text-center text-xl font-semibold ${
              isSuccess ? 'text-green-600' : 'text-red-600'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Success Popup Alert */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 text-center"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 25,
                duration: 0.5,
              }}
            >
              {/* Success Icon */}
              <motion.div
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <motion.svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              </motion.div>

              {/* Success Message */}
              <motion.h3
                className="text-2xl font-bold text-gray-800 mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                Reservation Confirmed!
              </motion.h3>

              <motion.p
                className="text-gray-600 text-lg mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                Your table has been successfully reserved.
              </motion.p>

              <motion.p
                className="text-orange-600 font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                We'll see you soon at Café Fausse!
              </motion.p>

              {/* Auto-close indicator */}
              <motion.div
                className="mt-6 w-full h-1 bg-gray-200 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                <motion.div
                  className="h-full bg-orange-600 rounded-full"
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: 3, ease: 'linear', delay: 0.7 }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}

export default ReservationForm
