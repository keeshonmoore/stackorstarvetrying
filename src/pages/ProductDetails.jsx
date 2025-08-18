import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { loadStripe } from '@stripe/stripe-js'
import Header from '../components/Header'
import Footer from '../components/Footer'

const stripePromise = loadStripe('pk_test_51RxH8zRxeAcSqD7NTCjPo77m02HgyDYNzH6LW4Tjtq6rhzSYMm2zmk7Bm8kHpwEED9Z4jOUkq9ZK50P4FMGzVTsJ00yTlA3etp')

export default function ProductDetails() {
  const { productId } = useParams()
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/data/products.json')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data)
        const foundProduct = data.find((p) => p.productId === productId)
        setProduct(foundProduct || null)
        if (foundProduct) {
          const availableSizes = [...new Set(foundProduct.variants.map((v) => v.size))]
          const availableColors = [...new Set(foundProduct.variants.filter((v) => v.size === availableSizes[0]).map((v) => v.color))]
          setSelectedSize(availableSizes[0] || '')
          setSelectedColor(availableColors[0] || '')
        }
      })
      .catch((error) => console.error('Error fetching products:', error))
  }, [productId])

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(10, Number(value)))
    setQuantity(newQuantity)
    validateStock(newQuantity, selectedSize, selectedColor)
  }

  const handleSizeChange = (size) => {
    setSelectedSize(size)
    const availableColors = [...new Set(product.variants.filter((v) => v.size === size).map((v) => v.color))]
    setSelectedColor(availableColors[0] || '')
    validateStock(quantity, size, availableColors[0] || '')
  }

  const handleColorChange = (color) => {
    setSelectedColor(color)
    validateStock(quantity, selectedSize, color)
  }

  const validateStock = (qty, size, color) => {
    if (!product) return
    const variant = product.variants.find((v) => v.size === size && v.color === color)
    if (variant && qty > variant.stock) {
      setError(`Only ${variant.stock} available for ${size} ${color}`)
    } else {
      setError('')
    }
  }

  const handleCheckout = async () => {
    setIsLoading(true)
    setError('')
    try {
      const variant = product.variants.find((v) => v.size === selectedSize && v.color === selectedColor)
      if (!variant || quantity > variant.stock) {
        setError(`Only ${variant.stock} available for ${selectedSize} ${selectedColor}`)
        setIsLoading(false)
        return
      }

      const stripe = await stripePromise
      const response = await fetch('http://localhost:4242/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: variant.priceId, quantity }),
      })
      const { clientSecret, sessionId } = await response.json()

      if (!clientSecret) {
        throw new Error('Failed to get client secret')
      }

      const result = await stripe.redirectToCheckout({ sessionId })
      if (result.error) {
        console.error('Checkout error:', result.error.message)
        setError(result.error.message)
      }
    } catch (error) {
      console.error('Error initiating checkout:', error)
      setError('Failed to initiate checkout. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background font-custom">
        <Header />
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl text-foreground italic">Product Not Found</h2>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  const originalPrice = product.sale ? (product.price / (1 - product.sale / 100)).toFixed(2) : null
  const availableSizes = [...new Set(product.variants.map((v) => v.size))]
  const availableColors = [...new Set(product.variants.filter((v) => v.size === selectedSize).map((v) => v.color))]

  return (
    <div className="min-h-screen bg-background font-custom">
      <Header />
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative rounded-xl shadow-apple">
                <img
                  src={product.image1}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-xl"
                />
                <img
                  src={product.image2}
                  alt={`${product.name} alternate view`}
                  className="absolute inset-0 w-full h-96 object-cover rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"
                />
                {product.sale && (
                  <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-sm font-semibold px-3 py-1 rounded-xl shadow-apple">
                    {product.sale}% Off
                  </span>
                )}
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="text-3xl lg:text-4xl font-semibold text-foreground mb-4">{product.name}</h1>
                <p className="text-lg text-muted-foreground mb-4 italic">{product.description}</p>
                <div className="flex items-center gap-2 mb-4">
                  <p className="text-xl text-accent font-semibold">${product.price.toFixed(2)}</p>
                  {product.sale && (
                    <p className="text-lg text-muted-foreground line-through">${originalPrice}</p>
                  )}
                </div>
                <div className="mb-4">
                  <h3 className="text-lg text-foreground font-semibold">Material</h3>
                  <p className="text-base text-muted-foreground italic">{product.material}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg text-foreground font-semibold">Fit</h3>
                  <p className="text-base text-muted-foreground italic">{product.fit}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg text-foreground font-semibold">Size</h3>
                  <Select value={selectedSize} onValueChange={handleSizeChange}>
                    <SelectTrigger className="rounded-xl border-secondary bg-background text-foreground shadow-apple italic mt-2">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent className="bg-background text-foreground rounded-xl border-secondary">
                      {availableSizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg text-foreground font-semibold">Color</h3>
                  <Select value={selectedColor} onValueChange={handleColorChange}>
                    <SelectTrigger className="rounded-xl border-secondary bg-background text-foreground shadow-apple italic mt-2">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent className="bg-background text-foreground rounded-xl border-secondary">
                      {availableColors.map((color) => (
                        <SelectItem key={color} value={color}>
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-lg text-foreground font-semibold">Quantity</h3>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      className="rounded-xl border-secondary text-foreground shadow-apple"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(e.target.value)}
                      className="w-16 rounded-xl border-secondary bg-background text-foreground shadow-apple italic text-center"
                      min="1"
                      max="10"
                      aria-label="Quantity"
                    />
                    <Button
                      variant="outline"
                      className="rounded-xl border-secondary text-foreground shadow-apple"
                      onClick={() => handleQuantityChange(quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </Button>
                  </div>
                </div>
                {error && (
                  <p className="text-destructive text-sm mb-4 italic">{error}</p>
                )}
                <Button
                  className="rounded-xl bg-accent text-accent-foreground hover:bg-accent/80 shadow-apple transition-all duration-200"
                  onClick={handleCheckout}
                  disabled={isLoading || !!error}
                  aria-label="Proceed to checkout"
                >
                  {isLoading ? 'Processing...' : 'Checkout'}
                </Button>
              </div>
            </div>
            <div className="mt-8">
              <Tabs defaultValue="materials" className="max-w-4xl mx-auto">
                <TabsList className="grid grid-cols-3 gap-4 bg-primary/10 rounded-xl">
                  <TabsTrigger
                    value="materials"
                    className="rounded-xl text-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
                  >
                    Materials
                  </TabsTrigger>
                  <TabsTrigger
                    value="care"
                    className="rounded-xl text-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
                  >
                    Care Instructions
                  </TabsTrigger>
                  <TabsTrigger
                    value="sizing"
                    className="rounded-xl text-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
                  >
                    Sizing
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="materials" className="mt-4 text-muted-foreground italic">
                  {product.material}
                </TabsContent>
                <TabsContent value="care" className="mt-4 text-muted-foreground italic">
                  {product.careInstructions}
                </TabsContent>
                <TabsContent value="sizing" className="mt-4 text-muted-foreground italic">
                  Available in {product.variants.map((v) => v.size).join(', ')}. {product.fit} fit. Refer to our sizing chart for detailed measurements.
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}