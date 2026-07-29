# Theme

## Compact token summary

- Background: `#070816`
- Raised surface: `#0d1024`
- Card surface: `#12162e`
- Festival blue: `#2464ec`
- Ultraviolet: `#6c3bff`
- Electric cyan: `#35d7ff`
- Warm spark: `#ffca3a`
- Coral: `#ff5c7a`
- Primary text: `#ffffff`
- Secondary text: `#b8c5e3`
- Border: `rgba(255,255,255,.12)`
- Display font: Unbounded 600–800
- Body/interface font: Manrope 400–700
- Main content width: 1440px
- Main radii: 15px controls, 22–30px panels
- Breakpoints used by the page: 1100px, 820px, 560px, 350px
- Reduced motion: all decorative animations collapse to 0.01ms, smooth scrolling
  is disabled, and hero parallax is removed.

## Raw source

The complete active theme and responsive implementation is in
`app/globals.css` (447 lines) and is passed whole to Superdesign because it is
below the 900-line trimming threshold.

Tailwind v4 is enabled through:

```css
@import "tailwindcss";
```

Core variables:

```css
:root {
  --space: #070816;
  --surface: #0d1024;
  --surface-2: #12162e;
  --blue: #2464ec;
  --violet: #6c3bff;
  --cyan: #35d7ff;
  --yellow: #ffca3a;
  --coral: #ff5c7a;
  --text: #fff;
  --muted: #b8c5e3;
  --border: rgba(255, 255, 255, 0.12);
  --max: 1440px;
}
```
