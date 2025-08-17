import { Button } from './ui/button'
import { Link } from 'react-router-dom'

export default function CTASection({ badge, title, description, action, className }) {
  return (
    <section
      className={`relative py-16 bg-background font-custom ${className}`}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/hero.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <span
          className={`inline-block px-4 py-1 mb-4 text-sm font-semibold text-accent border border-accent rounded-xl ${badge.className}`}
        >
          {badge.text}
        </span>
        <h2 className="text-3xl lg:text-5xl tracking-tighter text-foreground font-regular mb-6 animate-fade-in">
          {title}
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto italic">
          {description}
        </p>
        <Button
          className={`rounded-xl bg-accent text-accent-foreground hover:bg-accent/80 shadow-apple transition-all duration-200 ${action.className}`}
          asChild
        >
          <Link to={action.href} aria-label={action['aria-label']}>
            {action.text}
          </Link>
        </Button>
      </div>
    </section>
  )
}