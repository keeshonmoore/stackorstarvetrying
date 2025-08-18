import { CardsParallax } from './ui/scroll-cards'

const cardItems = [
  {
    title: 'Hoodie Collection',
    description: 'Bold, comfortable, and built for the hustle. Explore our premium hoodies.',
    tag: 'Hoodies',
    src: '531802579_1138338211445813_1075887862410973956_n.jpg',
    link: '/shop',
    color: '#0d0d0d',
    textColor: '#ffffff',
  },
  {
    title: 'Tee Collection',
    description: 'Make a statement with our iconic tees, designed for fearless ambition.',
    tag: 'Tees',
    src: '529741467_3943947912532796_937981445670220611_n.jpg',
    link: '/shop',
    color: '#0d0d0d',
    textColor: '#ffffff',
  },
  {
    title: 'Accessories Collection',
    description: 'Complete your look with caps and more, crafted for streetwear enthusiasts.',
    tag: 'Accessories',
    src: '533104718_620206071147992_2304875724625872429_n.jpg',
    link: '/shop',
    color: '#0d0d0d',
    textColor: '#ffffff',
  },
]

export default function FeaturedCollections() {
  return (
    <section className="py-16 bg-background font-custom">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl tracking-tighter text-foreground font-regular animate-fade-in">
            Made For The Streets
          </h2>
          {/* <p className="text-lg text-muted-foreground mt-4 italic max-w-2xl mx-auto">
            Discover the essence of StackOrStarveTrying with our curated collections, designed for those who live boldly.
          </p> */}
        </div>
        <CardsParallax items={cardItems} />
      </div>
    </section>
  )
}