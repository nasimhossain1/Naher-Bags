
import { useState } from 'react'
import { Send } from 'lucide-react'
import toast from 'react-hot-toast'

function Newsletter() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email.trim()) {
      toast.error('Please enter your email address')
      return
    }

    toast.success('Thank you for subscribing!')
    setEmail('')
  }

  return (
    <section className="bg-brand-cream py-16">
      <div className="container-width text-center">

        <p className="text-xs font-semibold tracking-[0.3em] text-brand-gold">
          STAY IN TOUCH
        </p>

        <h2 className="mt-3 text-3xl font-semibold text-brand-black md:text-4xl">
          Join Our Newsletter
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-gray-600">
          Subscribe to receive updates about new collections,
          exclusive offers and special promotions.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="min-w-0 flex-1 border border-gray-300 bg-white px-5 py-4 text-sm outline-none focus:border-brand-gold"
          />

          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-brand-black px-7 py-4 text-xs font-semibold tracking-widest text-white transition hover:bg-brand-gold"
          >
            SUBSCRIBE
            <Send size={16} />
          </button>
        </form>

      </div>
    </section>
  )
}

export default Newsletter
