import { Button } from './ui/button'
import { Input } from './ui/input'

function Footer() {
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Timeline', href: '/timeline' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <footer className="bg-transparent text-white py-12 font-custom">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <img
            src="/logo.png"
            alt="StackOrStarveTrying Logo"
            className="w-full max-w-[200px] mb-4 rounded-xl shadow-apple"
          />
          <p className="text-muted-foreground italic">
            123 Hustle Street, Ambition City, AC 12345
            <br />
            Email: contact@stackorstarvetrying.com
            <br />
            Phone: (123) 456-7890
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Links</h3>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-muted-foreground hover:text-accent transition-colors duration-300 italic"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Newsletter</h3>
          <div className="flex gap-4">
            <Input
              type="email"
              placeholder="Your email"
              className="rounded-xl border-secondary text-foreground italic"
            />
            <Button
              className="rounded-xl bg-accent text-accent-foreground hover:bg-accent/80 px-6 py-2"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer