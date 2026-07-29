# Routes

## `/`

- Entry: `app/page.tsx`
- Layout: `app/layout.tsx`
- Page component: `src/components/FestivalPage.tsx`
- Description: complete single-page festival experience with intro, hero,
  five-day journey, seven premieres, 35 authors, results, program, nominations,
  finale, film dialogs, mobile navigation, and toast feedback.

```tsx
import { FestivalPage } from "@/src/components/FestivalPage";

export default function Home() {
  return <FestivalPage />;
}
```

## `/icon.svg`

- Source: `app/icon.svg`
- Description: generated Next.js favicon route containing the seven-spark mark.
