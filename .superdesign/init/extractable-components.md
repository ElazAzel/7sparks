# Extractable Components

## FestivalMark

- Source: `src/components/FestivalPage.tsx`
- Category: layout
- Description: seven colored rays arranged around a white core; used in intro,
  navigation, finale, and footer.
- Extractable props: `compact` (boolean, default `false`)
- Hardcoded: seven-ray geometry and brand colors sourced from film records.

## SiteHeader

- Source: `src/components/FestivalPage.tsx`
- Category: layout
- Description: fixed glass navigation with brand, section anchors, films CTA,
  and mobile menu.
- Extractable props: `menuOpen` (boolean, default `false`)
- Hardcoded: navigation labels, icons, and section anchors.

## FilmPoster

- Source: `src/components/FestivalPage.tsx`
- Category: basic
- Description: reusable 2:3 CSS-art premiere poster with per-film colors and
  geometric portal variants.
- Extractable props: `film`, `small`
- Hardcoded: CSS portal geometry and festival label.

## FilmDialog

- Source: `src/components/FestivalPage.tsx`
- Category: basic
- Description: accessible responsive film-detail dialog with focus trapping.
- Extractable props: `film`, `onClose`, `onPortal`
- Hardcoded: content structure and close affordance.
