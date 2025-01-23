import React, { useState } from 'react'

const NewsletterSignup: React.FC = () => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const isValidEmail = (email: string) => {
        // Basic regex for email validation (FR-15)
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return regex.test(email)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage('')
        setIsSuccess(false)

        if (!email) {
            setMessage('Please enter your email address.')
            return
        }
        if (!isValidEmail(email)) {
            setMessage('Please enter a valid email address.')
            return
        }

        setIsLoading(true)
        try {
            const response = await fetch(
                'http://localhost:5000/api/newsletter',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                }
            )

            const data = await response.json()
            if (response.ok) {
                setMessage(data.message)
                setIsSuccess(true)
                setEmail('') // Clear email on success
            } else {
                setMessage(
                    data.message || 'Failed to subscribe. Please try again.'
                )
                setIsSuccess(false)
            }
        } catch (error) {
            console.error('Newsletter signup error:', error)
            setMessage('An error occurred. Please try again later.')
            setIsSuccess(false)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className="bg-gray-800 text-white py-12 px-4 rounded-lg shadow-xl max-w-2xl mx-auto my-8">
            <h2 className="text-3xl font-serif text-center mb-6">
                Join Our Newsletter
            </h2>
            <p className="text-center text-lg mb-8">
                Stay updated with our latest news, special offers, and events!
            </p>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 justify-center"
            >
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 flex-grow"
                    required
                />
                <button
                    type="submit"
                    className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    {isLoading ? 'Subscribing...' : 'Subscribe'}
                </button>
            </form>
            {message && (
                <p
                    className={`mt-4 text-center text-lg ${
                        isSuccess ? 'text-green-400' : 'text-red-400'
                    }`}
                >
                    {message}
                </p>
            )}
        </section>
    )
}

export default NewsletterSignup
