import { GlowCard } from './ui/spotlight-card'
import { Button } from './ui/button'

export default function Showcase() {
  const products = [
    {
      title: 'Signature Hoodie',
      description: 'Crafted for comfort and style, our signature hoodie is perfect for the hustle.',
      image: 'https://cdn.pixabay.com/photo/2023/02/07/12/32/hoodie-7774416_1280.jpg',
      href: '/shop/hoodie',
    },
    {
      title: 'Bold Tee',
      description: 'Make a statement with our bold tee, designed for those who dare to dream big.',
      image: 'https://cdn.pixabay.com/photo/2017/01/13/01/22/tee-1976045_1280.jpg',
      href: '/shop/tee',
    },
    {
      title: 'Street Cap',
      description: 'Top your look with our street cap, blending grit and style effortlessly.',
      image: 'https://cdn.pixabay.com/photo/2016/11/23/15/23/cap-1853300_1280.jpg',
      href: '/shop/cap',
    },
  ]

  return (
    <section className="py-16 bg-background font-custom">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-5xl tracking-tighter text-foreground font-regular mb-12 text-center animate-fade-in italic">
          Featured Products
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          {products.map((product, index) => (
            <GlowCard key={index} className="w-full max-w-sm">
              <div className="p-6">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-64 object-cover rounded-xl shadow-apple mb-4"
                />
                <h3 className="text-xl font-semibold text-foreground mb-2 italic">{product.title}</h3>
                <p className="text-muted-foreground mb-4 italic">{product.description}</p>
                <Button
                  className="rounded-xl bg-accent text-accent-foreground hover:bg-accent/80 shadow-apple transition-all duration-200 w-full"
                  asChild
                >
                  <a href={product.href} aria-label={`Shop ${product.title}`}>
                    Shop Now
                  </a>
                </Button>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  )
}