import { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import './NameCarousel.css'

export function NameCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: 'center'
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  )

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const slides = [
    {
      name: "Shannon Sen Perdomo",
      role: "Full Stack Developer",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      name: "Shannon Sen Perdomo",
      role: "Creative Problem Solver",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      name: "Shannon Sen Perdomo",
      role: "Tech Enthusiast",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    }
  ]

  return (
    <div className="carousel-container">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide" key={index}>
              <div 
                className="slide-content"
                style={{ background: slide.gradient }}
              >
                <h1 className="slide-name">{slide.name}</h1>
                <p className="slide-role">{slide.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="embla__controls">
        <button className="embla__button embla__button--prev" onClick={scrollPrev}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
        <button className="embla__button embla__button--next" onClick={scrollNext}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
