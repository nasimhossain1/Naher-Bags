
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { UserRound, Mail, Lock, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

import { auth, db } from '../firebase/firebase.config'

function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters.')
      return
    }

    setLoading(true)

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      )

      const user = userCredential.user

      await updateProfile(user, {
        displayName: formData.name,
      })

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: formData.name,
        email: formData.email,
        createdAt: new Date().toISOString(),
      })

      toast.success('Account created successfully!')
      navigate('/')
    } catch (error) {
      console.error('Registration error:', error)

      if (error.code === 'auth/email-already-in-use') {
        toast.error('This email is already registered.')
      } else if (error.code === 'auth/invalid-email') {
        toast.error('Please enter a valid email address.')
      } else if (error.code === 'auth/weak-password') {
        toast.error('Please choose a stronger password.')
      } else {
        toast.error(error.message || 'Registration failed.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-brand-cream px-4 py-12">
      <div className="w-full max-w-md bg-white p-7 shadow-lg sm:p-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-[3px] text-brand-black">
            NAHER <span className="text-brand-gold">BAGS</span>
          </h1>

          <p className="mt-2 text-xs tracking-[4px] text-gray-500">
            CARRY YOUR STYLE
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-brand-black">
            Create Account
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Join Naher Bags and discover your style.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Full Name
            </label>

            <div className="flex items-center border border-gray-200 px-3 focus-within:border-brand-gold">
              <UserRound size={19} className="text-gray-400" />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full px-3 py-3 text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email Address
            </label>

            <div className="flex items-center border border-gray-200 px-3 focus-within:border-brand-gold">
              <Mail size={19} className="text-gray-400" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full px-3 py-3 text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <div className="flex items-center border border-gray-200 px-3 focus-within:border-brand-gold">
              <Lock size={19} className="text-gray-400" />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
                minLength={6}
                required
                className="w-full px-3 py-3 text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Confirm Password
            </label>

            <div className="flex items-center border border-gray-200 px-3 focus-within:border-brand-gold">
              <Lock size={19} className="text-gray-400" />

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                className="w-full px-3 py-3 text-sm outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 bg-brand-black py-3.5 text-sm font-semibold text-white transition hover:bg-brand-gold disabled:opacity-60"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-brand-gold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  )
}

export default Register
