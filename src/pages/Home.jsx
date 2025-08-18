import Header from '../components/Header'
import Hero from '../components/Hero'
import Products from '../components/Products'
import ProductShowcase from '../components/ProductShowcase'
import FeaturedCollections from '../components/FeaturedCollections'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

function Home() {
  return (
    <>
      <Header />
      <Hero />
      <FeaturedCollections />
      <Products />
      <ProductShowcase />
      <CTASection
        badge={{
          text: 'Get Started',
          className: 'border-accent text-accent',
        }}
        title="Wear Your Hustle"
        description="Join the movement and shop our latest collection to elevate your streetwear game."
        action={{
          text: 'Shop Now',
          href: '/shop',
          className: 'bg-accent text-accent-foreground hover:bg-accent/80 rounded-xl shadow-apple transition-all duration-200',
          'aria-label': 'Shop the latest StackOrStarveTrying collection',
        }}
        className="max-w-4xl mx-auto text-foreground shadow-apple rounded-xl"
      />
      <Footer />
    </>
  )
}

export default Home