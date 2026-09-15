## 1. Profile data

- [x] 1.1 Add `src/data/profile.ts` exporting a typed `profile` object: name, role, email,
      country, website label (`www.about.me`) and the English bio paragraph.

## 2. Intro window component

- [x] 2.1 Add `src/components/IntroWindow.tsx`: a controlled dialog taking `onDismiss`,
      rendering backdrop + macOS window chrome (traffic lights, address bar) + identity body
      + "Know me" button.
- [x] 2.2 Wire dismissal: the CTA, the red traffic light and the Escape key all trigger the
      closing state; `animationend` on the exit animation calls `onDismiss`.
- [x] 2.3 Add accessibility: `role="dialog"`, `aria-modal`, accessible name, focus on mount,
      and a focus trap across the window's controls.
- [x] 2.4 Add `src/components/IntroWindow.css`: window chrome, entrance/exit keyframes,
      responsive rules down to 375px, and a `prefers-reduced-motion` block.

## 3. App integration

- [x] 3.1 `src/App.tsx`: own `isIntroOpen`, render `IntroWindow` while open, and mark the
      page content `aria-hidden` / non-interactive behind it.
- [x] 3.2 Translate the remaining `App.tsx` copy to English.
- [x] 3.3 Update `index.html` `lang` and meta description to English.

## 4. Verification

- [x] 4.1 `npm run lint` and `npm run build` pass.
- [ ] 4.2 Manually verify in `npm run dev`: window appears on load, all three dismissal paths
      work, layout holds at 375px, reduced-motion path still dismisses.

> 4.2 note: browser verification was attempted but the Chrome extension was not
> connected, so the manual pass is pending on the developer's machine.
