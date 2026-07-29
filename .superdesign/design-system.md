# 7 ИСКР — Street Cinema Editorial Design System

## Product and mood

Russian-language youth film-festival page for Documentolog × Jedai Academy.
It should feel like an independent street screening assembled by a young film
crew: contemporary, airy, tactile, energetic and slightly rebellious.

The page is a living editorial poster rather than a sci-fi interface or a
conventional marketing landing page. Its emotional references are festival
zines, 35mm contact sheets, wheat-pasted city posters, handwritten production
notes, cinema tickets, clapperboards and light leaking through film.

The content remains truthful: six real teams with exactly 29 supplied names and
one empty “Секретный портал” premiere slot. Do not invent film names, stories,
facts about children, awards or metrics.

## Creative principles

1. **Air carries hierarchy.** Large paper-colored fields and uneven gaps create
   the rhythm. Do not fill every area with decoration.
2. **Type is the key visual.** Use extreme scale changes, tightly tracked
   headlines, vertical labels and occasional handwritten annotations.
3. **Images feel physical.** Treat imagery as film frames, contact sheets,
   pasted posters or cropped stills with grain and edge marks—not glossy cards.
4. **One memorable move per scene.** A crossing headline, torn ticket, rotating
   reel or light leak is enough. Avoid visual noise.
5. **Designed imperfection.** Slight rotations, offset rules and marginal notes
   may break the grid while text alignment and reading order stay precise.

## Palette

- Paper: `#F4F0E7`
- Warm white: `#FFFDF8`
- Ink: `#141414`
- Cobalt: `#2457FF`
- Acid lime: `#D8FF3E`
- Coral light leak: `#FF654A`
- Signal yellow: `#F4C84A`
- Asphalt: `#292927`
- Muted graphite: `#74716B`
- Hairline: `rgba(20,20,20,.18)`

Paper and ink dominate. Cobalt is the primary festival signal. Acid lime is
used for small stickers, active states and the secret slot. Coral appears as a
localized analog light leak or underline, never as a full-page gradient.
Use only one bright accent as the dominant accent in any viewport.

## Typography

- Display: Unbounded, 650–900. Headlines are compact, architectural and often
  split across lines.
- Body/interface: Manrope, 400–750.
- Handwritten accent: Caveat or a restrained cursive fallback, only for short
  notes such as “снято нами”, arrows and timestamps.
- Micro labels: Manrope/monospace fallback, uppercase, 11–13px, wide tracking.
- Hero: `clamp(4rem, 11vw, 11rem)`, line-height `.82–.9`, tracking `-.055em`.
- Section titles: `clamp(2.6rem, 7vw, 7.2rem)`.
- Body: 16–19px, line-height `1.5–1.65`, max width about 64 characters.

Avoid glowing type, gradient text, excessive all-caps body copy and multiple
bold weights inside one paragraph. Display words may be outlined or inverted
on a cobalt block, but must remain readable.

## Page composition

- **Opening:** quick analog leader/countdown, with “7” assembled from crop marks
  and film dust. Skip remains visible.
- **Hero:** off-white poster field, giant “7 ИСКР” crossing the viewport,
  asymmetric cinematic still/contact sheet, cobalt festival strip, handwritten
  date note and one clear CTA. No centered cosmic portal.
- **Intensive:** five days appear as a staggered production storyboard with
  oversized day numerals and a horizontal film strip.
- **Premieres:** seven poster-sized film frames in a playful horizontal reel.
  Posters alternate portrait/landscape crops and slight physical rotations.
  The seventh is an intentionally blank acid-lime/ink teaser.
- **Authors:** 29 names become rolling credits and taped crew lists, grouped by
  team with excellent readability. Folk Valley is visibly the only named team.
- **Results:** factual large figures and short statements on an ink-colored
  cinema intermission panel.
- **Program:** editorial timetable with huge times, rules and clapper marks—not
  a card grid.
- **Nominations:** typographic festival stamps and ticket fragments, clearly
  non-competitive.
- **Finale:** seven colored paper strips/film frames converge into the existing
  seven-ray mark, followed by a spacious closing message.

## Surfaces and image treatment

- Prefer square corners, 0–12px radii, thin ink rules and hard offset shadows.
- Do not use glassmorphism, holographic panels, neon borders, HUD decoration,
  generic SaaS cards, emoji icons or decorative gradient blobs.
- Film imagery uses 2.39:1 and 4:3 crops, warm grain, subtle scratches,
  perforations/contact-sheet numbering and occasional orange/pink light leaks.
- Decorative characters must not resemble named children. Avoid fantasy,
  superhero or glossy 3D-cartoon aesthetics.
- Buttons feel like screen-print labels or ticket stubs: compact, high contrast,
  lightly skewed on hover, minimum 44×44px.
- Header is a slim paper/ink editorial bar with the seven-spark mark, section
  anchors and a cobalt ticket CTA. Mobile navigation becomes a full paper sheet.
- Film detail is a full-screen screening sheet with poster, team credits and
  actions; mobile behaves as a focused vertical scene.

## Motion

Motion should feel filmed and hand-assembled rather than synthetic:

- reveal headlines with clip masks and slightly offset baselines;
- move film strips horizontally with scroll progress;
- let stickers land with one soft overshoot;
- drift a localized warm light leak across image surfaces;
- give posters restrained pointer tilt on fine-pointer desktop;
- make handwritten arrows and underlines draw once;
- use magnetic movement only on the primary CTA;
- shift film grain at very low opacity.

No perpetual bouncing everywhere, no scroll hijacking and no competing
transforms on the same element. Continuous animation runs only while visible
and pauses when the tab is hidden. Mobile removes pointer tracking, keeps a
horizontal scroll-snap premiere reel and uses low-amplitude breathing motion.
`prefers-reduced-motion` skips the intro, stops grain/light-leak motion, removes
parallax and makes all reveals immediate.

## Responsive and accessibility

- Validate 1440, 1024, 768, 390 and 320px.
- Mobile is recomposed, not merely scaled down: headlines wrap intentionally,
  marginal notes move into the reading flow and credits become a single column.
- Horizontal movement is isolated to explicit scroll-snap rails; the page must
  never overflow horizontally.
- Maintain AA contrast and visible focus. Information cannot rely on color,
  motion, crop marks or texture alone.
- Dialog traps focus, closes on Escape and restores focus to its trigger.
- Navigation, mobile menu, swipe, toast and safe external-link behavior remain.

## Implementation boundaries

- Next.js App Router, TypeScript, Tailwind v4, Motion and Lucide.
- Static export and local assets; no database or authentication.
- `src/data/festival.ts` is the single data source for seven slots.
- Six populated teams contain exactly 29 supplied names; slot seven is secret
  and empty. Duplicate names use composite React keys.
- Preserve the existing seven-ray brand mark while translating it into the new
  paper/cobalt/coral visual language.
- Use the Open Design materials `after-hours-editorial`,
  `frame-light-leak-cinema`, `poster-hero`, editorial typography and animation
  discipline as design guidance. Do not copy a template wholesale.
