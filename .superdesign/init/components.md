# Shared UI Components

The project is a single-purpose festival experience. It has no generic component
library or shared primitive directory. All interactive UI components are defined
inside `src/components/FestivalPage.tsx` and are page-specific:

- `FestivalMark` — seven-ray brand mark.
- `Intro` — skippable session-scoped intro.
- `SectionReveal` — viewport reveal wrapper.
- `Poster` — CSS-art premiere poster.
- `Counter` — viewport-triggered result counter.
- `FilmDialog` — accessible full-screen film detail dialog.

The full implementation is in `src/components/FestivalPage.tsx` and is passed as
a context file for reproduction and redesign drafts.
