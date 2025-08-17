import { useEffect, useState, useRef } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useInView } from 'react-intersection-observer'

export default function Hero() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  })
  const audioRef = useRef(null)
  const [hasPlayed, setHasPlayed] = useState(false)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          console.log('Audio playback started successfully')
          setHasPlayed(true)
        })
        .catch((error) => {
          console.error('Audio playback failed:', error)
        })
    }
  }, [])

  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          console.log('Audio playback started successfully via button')
          setHasPlayed(true)
        })
        .catch((error) => {
          console.error('Audio playback failed via button:', error)
        })
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-background py-12 overflow-hidden"
      ref={ref}
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        aria-hidden="true"
      >
        <source src="/bg.mov" type="video/mp4" />
      </video>
      {/* Overlay for Text Readability */}
      <div className="absolute inset-0 bg-primary/50 z-10" aria-hidden="true"></div>

      {/* Audio */}
      <audio
        ref={audioRef}
        autoPlay
        loop
        className="hidden"
        aria-label="Background music"
        onError={(e) => console.error('Audio loading error:', e)}
      >
        <source src="/music.mp3" type="audio/mp3" />
      </audio>

      {/* Text Content */}
      <div className="container mx-auto px-4 flex flex-col items-center text-center z-20">
        <img
          src="/logo.png"
          alt="StackOrStarveTrying Logo"
          className={`max-w-[300px] md:max-w-[400px] mb-2 rounded-xl ${
            inView ? 'animate-scroll-in' : 'opacity-0'
          }`}
        />
        <p className="text-lg text-gray-200 mb-6 max-w-md animate-fade-in italic">
          you either gon' stack or starve.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Input
            placeholder="Enter your email"
            className="rounded-xl border-gray-300/20 bg-white/10 text-primary shadow-apple max-w-xs italic"
            type="email"
            aria-label="Email for newsletter"
          />
          <Button
            className="rounded-xl bg-accent text-white hover:bg-accent/80 shadow-apple transition-all duration-200"
          >
            Join the Movement
          </Button>
        </div>
        {!hasPlayed && (
          <Button
            className="mt-4 rounded-xl bg-accent text-white hover:bg-accent/80 shadow-apple transition-all duration-200"
            onClick={handlePlayAudio}
            aria-label="Play background music"
          >
            Play Audio
          </Button>
        )}
      </div>
    </section>
  )
}