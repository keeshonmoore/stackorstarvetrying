import { TextReveal } from './magicui/text-reveal'

export default function Products() {
  return (
    <div className="py-12 bg-background font-custom">
      <section id="products" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {/* First Product: Image Left, Text Right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center py-16">
              <img
                src="/1.jpg"
                alt="StackOrStarveTrying Hoodie"
                className="w-full max-w-md rounded-xl shadow-apple object-cover animate-fade-in"
              />
              <div className="max-w-3xl mx-auto text-center">
                <TextReveal className="text-lg text-foreground mb-16 italic">
                  Our hoodies are crafted for the hustlers. Made with premium materials, they blend comfort and bold style to keep you pushing forward.
                </TextReveal>
              </div>
            </div>
            {/* Second Product: Text Left, Image Right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-6">
              <div className="max-w-3xl mx-auto text-center md:order-first">
                <TextReveal className="text-lg text-foreground mb-6 italic">
                  Our tees scream ambition. With unique designs and a perfect fit, they’re your go-to for making a statement without saying a word.
                </TextReveal>
              </div>
              <img
                src="/promo.jpg"
                alt="StackOrStarveTrying Tee"
                className="w-full max-w-md rounded-xl shadow-apple object-cover animate-fade-in"
              />
            </div>
            {/* Third Product: Image Left, Text Right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center py-16">
              <img
                src="/2.jpg"
                alt="StackOrStarveTrying Cap"
                className="w-full max-w-md rounded-xl shadow-apple object-cover animate-fade-in"
              />
              <div className="max-w-3xl mx-auto text-center">
                <TextReveal className="text-lg text-foreground mb-6 italic">
                  Top off your look with our caps. Designed for streetwear enthusiasts, they add the perfect touch of grit and style to any outfit.
                </TextReveal>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-5xl tracking-tighter text-foreground font-regular mb-8 text-center animate-fade-in">
            Brand Milestones
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center p-6 rounded-xl shadow-apple bg-primary/10 animate-fade-in">
              <p className="text-3xl lg:text-5xl font-semibold text-foreground">2023</p>
              <p className="text-lg text-muted-foreground mt-2 italic">Brand Launched</p>
              <p className="text-sm text-accent italic">Started the hustle</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl shadow-apple bg-primary/10 animate-fade-in">
              <p className="text-3xl lg:text-5xl font-semibold text-foreground">10K+</p>
              <p className="text-lg text-muted-foreground mt-2 italic">Pieces Sold</p>
              <p className="text-sm text-accent italic">Clothing the ambitious</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl shadow-apple bg-primary/10 animate-fade-in">
              <p className="text-3xl lg:text-5xl font-semibold text-foreground">World</p>
              <p className="text-lg text-muted-foreground mt-2 italic">Global Reach</p>
              <p className="text-sm text-accent italic">Building a movement</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}