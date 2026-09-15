import { useCallback, useEffect, useRef, useState } from 'react'
import { profile } from '../data/profile'
import './IntroWindow.css'

const EXIT_ANIMATION = 'intro-window-exit'
const FOCUSABLE = 'a[href], button:not([disabled])'

type IntroWindowProps = {
  onDismiss: () => void
}

export function IntroWindow({ onDismiss }: IntroWindowProps) {
  const [isClosing, setIsClosing] = useState(false)
  const windowRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => setIsClosing(true), [])

  useEffect(() => {
    windowRef.current?.focus()
  }, [])

  // Escape closes, Tab stays inside the window while it is open.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      close()
      return
    }

    if (event.key !== 'Tab') return

    const focusable = Array.from(
      windowRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [],
    )
    if (focusable.length === 0) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    const active = document.activeElement

    if (event.shiftKey && (active === first || active === windowRef.current)) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && active === last) {
      event.preventDefault()
      first.focus()
    }
  }

  // The exit animation owns the unmount: let it finish, then tell the parent.
  const handleAnimationEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
    if (event.animationName === EXIT_ANIMATION) onDismiss()
  }

  return (
    <div className={`intro-overlay${isClosing ? ' is-closing' : ''}`}>
      <div
        ref={windowRef}
        className={`intro-window${isClosing ? ' is-closing' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="intro-window-name"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="intro-window__titlebar">
          <div className="intro-window__lights">
            <button
              type="button"
              className="intro-window__light intro-window__light--close"
              aria-label="Close window"
              onClick={close}
            />
            <span className="intro-window__light intro-window__light--minimize" />
            <span className="intro-window__light intro-window__light--zoom" />
          </div>

          <div className="intro-window__address" aria-hidden="true">
            <span className="intro-window__lock">
              <svg viewBox="0 0 24 24" width="12" height="12">
                <path
                  fill="currentColor"
                  d="M12 1a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5Zm-3 5a3 3 0 1 1 6 0v3H9V6Z"
                />
              </svg>
            </span>
            <span className="intro-window__url">{profile.website}</span>
          </div>
        </div>

        <div className="intro-window__body">
          <p className="intro-window__greeting">Hi, I&apos;m</p>
          <h1 className="intro-window__name" id="intro-window-name">
            {profile.name}
          </h1>
          <p className="intro-window__role">{profile.role}</p>

          <dl className="intro-window__details">
            <div className="intro-window__detail">
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </dd>
            </div>
            <div className="intro-window__detail">
              <dt>Country</dt>
              <dd>{profile.country}</dd>
            </div>
          </dl>

          <p className="intro-window__bio">{profile.bio}</p>

          <button type="button" className="intro-window__cta" onClick={close}>
            Know me
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path fill="currentColor" d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
