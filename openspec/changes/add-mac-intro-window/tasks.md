## 1. Profile data

- [ ] 1.1 Add `src/data/profile.ts` exporting a typed `profile` object: name, role, email,
      country, website label (`www.about.me`) and the English bio paragraph.

## 2. Intro window component

- [ ] 2.1 Add `src/components/IntroWindow.tsx`: a controlled dialog taking `onDismiss`,
      rendering backdrop + macOS window chrome (traffic lights, address bar) + identity body
      + "Know me" button.
- [ ] 2.2 Wire dismissal: the CTA, the red traffic light and the Escape key all trigger the
      closing state; `animationend` on the exit animation calls `onDismiss`.
- [ ] 2.3 Add accessibility: `role="dialog"`, `aria-modal`, accessible name, focus on mount,
      and a focus trap across the window's controls.
- [ ] 2.4 Add `src/components/IntroWindow.css`: window chrome, entrance/exit keyframes,
      responsive rules down to 375px, and a `prefers-reduced-motion` block.

## 3. App integration

- [ ] 3.1 `src/App.tsx`: own `isIntroOpen`, render `IntroWindow` while open, and mark the
      page content `aria-hidden` / non-interactive behind it.
- [ ] 3.2 Translate the remaining `App.tsx` copy to English.
- [ ] 3.3 Update `index.html` `lang` and meta description to English.

## 4. Verification

- [ ] 4.1 `npm run lint` and `npm run build` pass.
- [ ] 4.2 Manually verify in `npm run dev`: window appears on load, all three dismissal paths
      work, layout holds at 375px, reduced-motion path still dismisses.
