import { useState, useEffect } from 'react'
import { Button } from './ui/button'

export default function ProductShowcase() {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
                    }
                  }
                }
              }
            `,
          }),
        })

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText}`)
        }

        const { data, errors } = await response.json()
        if (errors) {
          throw new Error(`GraphQL errors: ${JSON.stringify(errors)}`)
        }
        if (!data || !data.products || !data.products.edges || data.products.edges.length === 0) {
          throw new Error('No products found in the response. Ensure at least one product is published to the Online Store.')
        }

        setProduct(data.products.edges[0].node)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching Shopify product:', error)
        setError(error.message)
        setLoading(false)
      }
    }
    fetchProduct()
  }, [])

  return (
    <section className="py-16 bg-background font-custom">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-5xl tracking-tighter text-foreground font-regular mb-12 text-center animate-fade-in">
          Featured Products
        </h2>
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <p className="text-foreground text-center italic">Loading...</p>
          ) : error ? (
            <p className="text-foreground text-center italic">
              Error: {error}. Please verify your Shopify Storefront API token, store domain, or product availability.
            </p>
          ) : !product ? (
            <p className="text-foreground text-center italic">
              No product found. Please check your Shopify store configuration.
            </p>
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
                  >
                    <a
                      href={`https://${import.meta.env.VITE_SHOPIFY_STORE_DOMAIN}/products/${product.handle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${product.title} on Shopify`}
                    >
                      View
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}