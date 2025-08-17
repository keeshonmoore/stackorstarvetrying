import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

export default function ProductShowcase() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('/data/products.json')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error))
  }, [])

  return (
    <section className="py-16 bg-background font-custom">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-5xl tracking-tighter text-foreground font-regular mb-12 text-center animate-fade-in">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col items-end text-right p-6 rounded-xl shadow-apple bg-primary/10 h-96 bg-cover bg-center transition-all duration-300"
              style={{ backgroundImage: `url(${product.image1})` }}
            >
              {/* Hover Image */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-cover bg-center transition-opacity duration-300 rounded-xl"
                style={{ backgroundImage: `url(${product.image2})` }}
              ></div>
              {/* Overlay for Text Readability */}
              <div className="absolute inset-0 bg-primary/50 rounded-xl z-10"></div>
              {/* Content */}
              <div className="relative z-20 flex flex-col justify-end h-full">
                <h3 className="text-xl font-semibold text-foreground">{product.name}</h3>
                {/* <p className="text-base text-muted-foreground mt-2 italic">{product.description}</p> */}
                <p className="text-lg text-accent mt-2 font-semibold">${product.price.toFixed(2)}</p>
                <Button
                  className="mt-4 rounded-xl bg-accent text-accent-foreground hover:bg-accent/80 shadow-apple transition-all duration-200"
                  asChild
                >
                  <Link to={product.href} aria-label={`View ${product.name}`}>
                    View
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}