import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
//   { label: 'Timeline', href: '/timeline' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-0 z-50 w-full px-2">
      <nav data-state={mobileMenuOpen && 'active'} className="group">
        <div
          className={`mx-auto mt-2 h-auto max-w-7xl px-6 transition-all duration-300 lg:px-12 ${
            isScrolled
              ? 'bg-white/10 rounded-xl border-gray-100/10 backdrop-blur-lg shadow-apple'
              : 'bg-transparent'
          }`}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link to="/" aria-label="StackOrStarveTrying Home" className="flex items-center space-x-2">
                <img
                  src="/logo.png"
                  alt="StackOrStarveTrying Logo"
                  className="h-10 w-auto rounded-xl"
                />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className={`m-auto size-6 duration-200 text-white ${mobileMenuOpen ? 'rotate-180 scale-0 opacity-0' : ''}`} />
                <X className={`absolute inset-0 m-auto size-6 duration-200 text-white ${mobileMenuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-180 scale-0 opacity-0'}`} />
              </button>
            </div>
            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="text-white hover:text-accent block duration-150 font-medium "
                      aria-label={`Navigate to ${item.label}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className={`bg-white ${mobileMenuOpen ? 'block' : 'hidden'} lg:flex mb-6 w-full flex-wrap items-center justify-end space-y-8 rounded-xl border border-gray-200/20 p-6 shadow-apple lg:m-0 lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none`}
            >
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {navItems.map((item) => (
                    <li key={item.label}>
                      <Link
                        to={item.href}
                        className="text-primary hover:text-accent block duration-150 font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                        aria-label={`Navigate to ${item.label}`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button
                  className="rounded-xl bg-accent text-white hover:bg-red-600 shadow-apple transition-all duration-200"
                  asChild
                >
                  <Link to="/shop" aria-label="Shop Now with StackOrStarveTrying">
                    Shop Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}