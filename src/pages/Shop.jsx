import { useState, useEffect } from 'react'
import { Button } from '../components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Shop() {
  const [products, setProducts] = useState([])
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [priceFilter, setPriceFilter] = useState('All')

  useEffect(() => {
    fetch('/data/products.json')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error))
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter
    const matchesPrice =
      priceFilter === 'All' ||
      (priceFilter === 'Under $30' && product.price < 30) ||
      (priceFilter === '$30-$50' && product.price >= 30 && product.price <= 50) ||
      (priceFilter === 'Over $50' && product.price > 50)
    return matchesCategory && matchesPrice
  })

  return (
    <div className="min-h-screen bg-background font-custom">
      <Header />
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 py-12">
            <h1 className="text-3xl lg:text-5xl tracking-tighter text-foreground font-regular">
              Shop Our Collection
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-4xl mx-auto">
            <Select onValueChange={setCategoryFilter} defaultValue="All">
              <SelectTrigger className="rounded-xl border-secondary bg-background text-foreground shadow-apple italic">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-background text-foreground rounded-xl border-secondary">
                <SelectItem value="All">All Categories</SelectItem>
                <SelectItem value="Hoodies">Hoodies</SelectItem>
                <SelectItem value="Tees">Tees</SelectItem>
                <SelectItem value="Accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={setPriceFilter} defaultValue="All">
              <SelectTrigger className="rounded-xl border-secondary bg-background text-foreground shadow-apple italic">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent className="bg-background text-foreground rounded-xl border-secondary">
                <SelectItem value="All">All Prices</SelectItem>
                <SelectItem value="Under $30">Under $30</SelectItem>
                <SelectItem value="$30-$50">$30 - $50</SelectItem>
                <SelectItem value="Over $50">Over $50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {filteredProducts.length === 0 ? (
              <p className="text-foreground text-center col-span-full italic">No products found.</p>
            ) : (
              filteredProducts.map((product) => (
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
              ))
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}