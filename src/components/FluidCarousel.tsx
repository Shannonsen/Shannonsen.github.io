import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import type { EmblaCarouselType } from 'embla-carousel'
import { experience, projects, skillGroups } from '../data/portfolio'
import { profile } from '../data/profile'
import { FilterPills } from './FilterPills'
import type { Filter } from '../data/sections'
import './FluidCarousel.css'

type Slide =
  | { kind: 'skills'; section: 'Skills' }
  | { kind: 'experience'; section: 'Experience'; index: number }
  | { kind: 'project'; section: 'Projects'; index: number }

const ALL_SLIDES: Slide[] = [
  { kind: 'skills', section: 'Skills' },
  ...experience.map((_, index) => ({
    kind: 'experience' as const,
    section: 'Experience' as const,
    index,
  })),
  ...projects.map((_, index) => ({
    kind: 'project' as const,
    section: 'Projects' as const,
    index,
  })),
]

const slidesFor = (filter: Filter) =>
  filter === 'All' ? ALL_SLIDES : ALL_SLIDES.filter((slide) => slide.section === filter)

// How fast a slide reaches its fully-receded state as it leaves the center.
// Scaled by slide count so the curve does not change shape when slides are added.
const TWEEN_FACTOR_BASE = 0.42

const MAX_ROTATE = 34
const MAX_TRANSLATE_Z = 140
const MAX_SCALE_DROP = 0.18
const MAX_OPACITY_DROP = 0.62

// Inner layers slide against the card as it travels. Each element carries a data-depth, and
// the deepest ones lag furthest behind — which is what reads as flow rather than as a slide
// arriving all in one piece.
const PARALLAX_PX = 90
// Blur is at odds with a flat graphic language, but it is the cue that makes the planes
// separate. Kept low enough that the cards still look printed.
const MAX_BLUR = 2

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

export function FluidCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    containScroll: false,
    skipSnaps: false,
  })

  const [filter, setFilter] = useState<Filter>('All')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const slides = useMemo(() => slidesFor(filter), [filter])
  const tweenNodes = useRef<HTMLElement[]>([])
  const tweenLayers = useRef<{ el: HTMLElement; depth: number }[][]>([])
  const progressRef = useRef<HTMLDivElement>(null)
  const tweenFactor = useRef(0)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  )

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      scrollPrev()
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      scrollNext()
    }
  }

  useEffect(() => {
    if (!emblaApi) return
    // Embla's watchSlides observer would re-init on its own, but asynchronously — doing it
    // here means the re-centre below cannot run against the previous slide set.
    emblaApi.reInit()
    emblaApi.scrollTo(0, true)
  }, [emblaApi, filter])

  useEffect(() => {
    if (!emblaApi) return

    // Queried once and kept live, rather than re-created on every frame of a drag.
    const motionQuery = window.matchMedia(REDUCED_MOTION_QUERY)

    const setTweenNodes = (api: EmblaCarouselType) => {
      const inners = api
        .slideNodes()
        .map((node) => node.querySelector('.fluid-carousel__inner') as HTMLElement)
        .filter(Boolean)
      tweenNodes.current = inners
      // Collected once per re-init rather than queried every frame.
      tweenLayers.current = inners.map((inner) =>
        Array.from(inner.querySelectorAll<HTMLElement>('[data-depth]')).map((el) => ({
          el,
          depth: Number(el.dataset.depth) || 0,
        })),
      )
    }

    const setTweenFactor = (api: EmblaCarouselType) => {
      tweenFactor.current = TWEEN_FACTOR_BASE * api.scrollSnapList().length
    }

    // Transforms are a function of scroll position, so a half-finished drag renders a
    // half-finished tween. Styles are written imperatively: doing this through React state
    // would re-render every slide on every frame of a drag.
    const tween = (api: EmblaCarouselType, eventName?: string) => {
      const reduceMotion = motionQuery.matches
      const engine = api.internalEngine()
      const scrollProgress = api.scrollProgress()
      const slidesInView = api.slidesInView()
      const isScrollEvent = eventName === 'scroll'

      api.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress
        const slidesInSnap = engine.slideRegistry[snapIndex]

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return

          // A looped slide has been repositioned to the far side of the track, so its raw
          // distance to the snap point no longer matches where it visually sits. Rewrite it
          // against the wrapped progress, or slides crossing the seam flip orientation for
          // a frame.
          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target()
              if (slideIndex !== loopItem.index || target === 0) return

              const sign = Math.sign(target)
              if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress)
              if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
            })
          }

          const node = tweenNodes.current[slideIndex]
          if (!node) return

          const distance = clamp(diffToTarget * tweenFactor.current, -1, 1)
          const magnitude = Math.abs(distance)

          if (reduceMotion) {
            node.style.transform = 'none'
            node.style.opacity = '1'
            node.style.filter = 'none'
            tweenLayers.current[slideIndex]?.forEach(({ el }) => {
              el.style.transform = 'none'
            })
            return
          }

          // Rotation keeps the sign so the two sides mirror; everything else is symmetric.
          node.style.transform = [
            `translateZ(${-magnitude * MAX_TRANSLATE_Z}px)`,
            `rotateY(${distance * -MAX_ROTATE}deg)`,
            `scale(${1 - magnitude * MAX_SCALE_DROP})`,
          ].join(' ')
          node.style.opacity = `${1 - magnitude * MAX_OPACITY_DROP}`
          node.style.filter = `blur(${magnitude * MAX_BLUR}px)`

          tweenLayers.current[slideIndex]?.forEach(({ el, depth }) => {
            el.style.transform = `translateX(${distance * depth * PARALLAX_PX}px)`
          })
        })
      })

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${clamp(scrollProgress, 0, 1)})`
      }
    }

    const onSelect = (api: EmblaCarouselType) => setSelectedIndex(api.selectedScrollSnap())

    setTweenNodes(emblaApi)
    setTweenFactor(emblaApi)
    tween(emblaApi)
    onSelect(emblaApi)

    const onReInit = (api: EmblaCarouselType) => {
      setTweenNodes(api)
      setTweenFactor(api)
      tween(api)
    }

    const onMotionPreferenceChange = () => tween(emblaApi)
    motionQuery.addEventListener('change', onMotionPreferenceChange)

    emblaApi
      .on('reInit', onReInit)
      .on('reInit', onSelect)
      .on('scroll', tween)
      .on('slideFocus', tween)
      .on('select', onSelect)

    return () => {
      motionQuery.removeEventListener('change', onMotionPreferenceChange)
      emblaApi
        .off('reInit', onReInit)
        .off('reInit', onSelect)
        .off('scroll', tween)
        .off('slideFocus', tween)
        .off('select', onSelect)
    }
  }, [emblaApi])

  return (
    <section
      className="fluid-carousel"
      aria-roledescription="carousel"
      aria-label="Skills, experience and projects"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <FilterPills active={filter} onChange={setFilter} />

      <div className="fluid-carousel__viewport" ref={emblaRef}>
        <div className="fluid-carousel__container">
          {slides.map((slide, index) => (
            <div
              className="fluid-carousel__slide"
              key={`${slide.kind}-${index}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}: ${slide.section}`}
            >
              <article className="fluid-carousel__inner">
                <span className={`fluid-carousel__badge is-${slide.kind}`} data-depth="1">
                  {slide.section}
                </span>
                <SlideCard slide={slide} />
              </article>
            </div>
          ))}
        </div>
      </div>

      <div className="fluid-carousel__controls">
        <button
          type="button"
          className="fluid-carousel__arrow"
          onClick={scrollPrev}
          aria-label="Previous slide"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path fill="currentColor" d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>

        <div className="fluid-carousel__rail" aria-hidden="true">
          <div className="fluid-carousel__rail-fill" ref={progressRef} />
        </div>

        <div className="fluid-carousel__dots">
          {slides.map((slide, index) => (
            <button
              type="button"
              key={`dot-${slide.kind}-${index}`}
              className={`fluid-carousel__dot${index === selectedIndex ? ' is-selected' : ''}`}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}: ${slide.section}`}
              aria-current={index === selectedIndex || undefined}
            />
          ))}
        </div>

        <button
          type="button"
          className="fluid-carousel__arrow"
          onClick={scrollNext}
          aria-label="Next slide"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path fill="currentColor" d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>
      </div>
    </section>
  )
}

function SlideCard({ slide }: { slide: Slide }) {
  if (slide.kind === 'skills') {
    return (
      <>
        <h2 className="fluid-carousel__title" data-depth="0.6">What I work with</h2>
        <p className="fluid-carousel__lead" data-depth="0.3">{profile.bio}</p>
        <ul className="fluid-carousel__groups" data-depth="0.15">
          {skillGroups.map((group) => (
            <li key={group.label} className="fluid-carousel__group">
              <h3>{group.label}</h3>
              <ul className="fluid-carousel__tags">
                {group.items.map((item) => (
                  <li key={item} className="fluid-carousel__tag">
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </>
    )
  }

  if (slide.kind === 'experience') {
    const entry = experience[slide.index]
    return (
      <>
        <p className="fluid-carousel__period" data-depth="0.8">{entry.period}</p>
        <h2 className="fluid-carousel__title" data-depth="0.6">{entry.role}</h2>
        <p className="fluid-carousel__company" data-depth="0.45">{entry.company}</p>
        <p className="fluid-carousel__lead" data-depth="0.3">{entry.summary}</p>
      </>
    )
  }

  const project = projects[slide.index]
  return (
    <>
      <h2 className="fluid-carousel__title" data-depth="0.6">{project.name}</h2>
      <p className="fluid-carousel__lead" data-depth="0.3">{project.description}</p>
      <ul className="fluid-carousel__tags" data-depth="0.15">
        {project.tech.map((item) => (
          <li key={item} className="fluid-carousel__tag">
            {item}
          </li>
        ))}
      </ul>
      {project.url && (
        <a className="fluid-carousel__link" href={project.url} target="_blank" rel="noreferrer">
          View project
          <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
            <path
              fill="currentColor"
              d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7ZM5 5h4V3H3v18h18v-6h-2v4H5V5Z"
            />
          </svg>
        </a>
      )}
    </>
  )
}
