import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Reset form after submission
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-background font-custom">
      <Header />
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl lg:text-5xl tracking-tighter text-foreground font-regular mb-8">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground mb-8 italic">
              Have questions or want to join the movement? Drop us a message!
            </p>
            <div className="bg-primary/10 p-8 rounded-xl shadow-apple">
              <div className="space-y-6">
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="rounded-xl border-secondary bg-background text-foreground shadow-apple italic"
                  aria-label="Your Name"
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="rounded-xl border-secondary bg-background text-foreground shadow-apple italic"
                  aria-label="Your Email"
                />
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="rounded-xl border-secondary bg-background text-foreground shadow-apple italic min-h-[150px]"
                  aria-label="Your Message"
                />
                <Button
                  onClick={handleSubmit}
                  className="rounded-xl bg-accent text-accent-foreground hover:bg-accent/80 shadow-apple transition-all duration-200 w-full"
                  aria-label="Submit Contact Form"
                >
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}