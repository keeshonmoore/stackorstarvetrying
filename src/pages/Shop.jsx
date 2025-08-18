import { useState, useEffect } from 'react'
import { Button } from '../components/ui/button'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Shop() {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`https://${import.meta.env.VITE_SHOPIFY_STORE_DOMAIN}/api/2025-04/graphql.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': import.meta.env.VITE_SHOPIFY_STOREFRONT_API_TOKEN,
          },
          body: JSON.stringify({
            query: `
              query {
                products(first: 1) {
                  edges {
                    node {
                      id
                      handle
                      title
                      description
                      priceRange {
                        minVariantPrice {
                          amount
                          currencyCode
                        }
                      }
                      images(first: 2) {
                        edges {
                          node {
                            url
                            altText
                          }
                        }
                      }
                      variants(first: 1) {
                        edges {
                          node {
                            id
                          }
                        }
                      }
                    }
                  }
                }
              }
            `,
          }),
        })
        const { data } = await response.json()
        setProduct(data.products.edges[0]?.node || null)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching Shopify product:', error)
        setLoading(false)
      }
    }
    fetchProduct()
  }, [])

  const handleBuyNow = async () => {
    if (!product) return
    try {
      const response = await fetch(`https://${import.meta.env.VITE_SHOPIFY_STORE_DOMAIN}/api/2025-04/graphql.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': import.meta.env.VITE_SHOPIFY_STOREFRONT_API_TOKEN,
        },
        body: JSON.stringify({
          query: `
            mutation {
              cartCreate(input: { lines: [{ quantity: 1, merchandiseId: "${product.variants.edges[0].node.id}" }] }) {
                cart {
                  id
                  checkoutUrl
                }
              }
            }
          `,
        }),
      })
      const cartData = await response.json()
      if (cartData.data?.cartCreate?.cart?.checkoutUrl) {
        window.location.href = cartData.data.cartCreate.cart.checkoutUrl
      } else {
        console.error('No checkout URL returned:', cartData)
      }
    } catch (error) {
      console.error('Error creating cart:', error)
    }
  }

  return (
    <div className="min-h-screen bg-background font-custom">
      <Header />
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <img
              src="/logo.png"
              alt="StackOrStarveTrying Logo"
              className="w-full max-w-[200px] mx-auto mb-4 rounded-xl shadow-apple"
            />
            <h1 className="text-3xl lg:text-5xl tracking-tighter text-foreground font-regular">
              Shop Our Collection
            </h1>
          </div>
          <div className="max-w-4xl mx-auto">
            {loading ? (
              <p className="text-foreground text-center italic">Loading...</p>
            ) : !product ? (
              <p className="text-foreground text-center italic">No product found. Please check your Shopify store configuration.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                  className="group relative flex flex-col items-end text-right p-6 rounded-xl shadow-apple bg-primary/10 h-96 bg-cover bg-center transition-all duration-300"
                  style={{ backgroundImage: `url(${product.images.edges[0]?.node.url})` }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-cover bg-center transition-opacity duration-300 rounded-xl"
                    style={{ backgroundImage: `url(${product.images.edges[1]?.node.url || product.images.edges[0]?.node.url})` }}
                  ></div>
                  <div className="absolute inset-0 bg-primary/50 rounded-xl z-10"></div>
                  <div className="relative z-20 flex flex-col justify-end h-full">
                    <h3 className="text-xl font-semibold text-foreground">{product.title}</h3>
                    <p className="text-base text-muted-foreground mt-2 italic">{product.description}</p>
                    <p className="text-lg text-accent mt-2 font-semibold">
                      ${product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode}
                    </p>
                    <Button
                      className="mt-4 rounded-xl bg-accent text-accent-foreground hover:bg-accent/80 shadow-apple transition-all duration-200"
                      onClick={handleBuyNow}
                      aria-label={`Buy ${product.title}`}
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}