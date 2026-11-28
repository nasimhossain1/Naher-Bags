
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import {
  Mail,
  Lock,
  ArrowRight,
  Globe,
} from 'lucide-react'
import toast from 'react-hot-toast'

import { auth, db } from '../firebase/firebase.config'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success('Login successful!')
      navigate('/')
    } catch (error) {
      console.error('Login error:', error)

      if (
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/user-not-found'
      ) {
        toast.error('Invalid email or password.')
      } else {
        toast.error(error.message || 'Login failed.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setGoogleLoading(true)

    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      const userRef = doc(db, 'users', user.uid)
      const userSnapshot = await getDoc(userRef)

      if (!userSnapshot.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName || '',
          email: user.email || '',
          createdAt: new Date().toISOString(),
        })
      }

      toast.success('Google login successful!')
      navigate('/')
    } catch (error) {
      console.error('Google login error:', error)
      toast.error(error.message || 'Google login failed.')
    } finally {
      setGoogleLoading(false)
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
            Welcome Back
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Login to your Naher Bags account.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email Address
            </label>

            <div className="flex items-center border border-gray-200 px-3 focus-within:border-brand-gold">
              <Mail size={19} className="text-gray-400" />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-3 py-3 text-sm outline-none"
              />
            </div>
          </div>

          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-xs font-medium text-brand-gold hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 bg-brand-black py-3.5 text-sm font-semibold text-white transition hover:bg-brand-gold disabled:opacity-60"
          >
            {loading ? 'Logging in...' : 'Login'}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="flex w-full items-center justify-center gap-3 border border-gray-200 py-3 text-sm font-medium transition hover:bg-gray-50 disabled:opacity-60"
        >
          <Globe size={19} />
          {googleLoading ? 'Please wait...' : 'Continue with Google'}
        </button>

        <p className="mt-7 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-semibold text-brand-gold hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </section>
  )
}

export default Login
