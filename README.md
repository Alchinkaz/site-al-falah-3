Al Falah Capital Partners — Supabase Integration Guide

Environment

- NEXT_PUBLIC_SUPABASE_URL=
- NEXT_PUBLIC_SUPABASE_ANON_KEY=
- SUPABASE_SERVICE_ROLE_KEY=

Database setup

- Use SQL: `supabase_sql_commands.sql` or `supabase_sql_commands_fixed.sql`
- Ensure tables: `homepage_config`, `translations`, `projects` (plus related)

Data flow

- Admin → Supabase:
  - POST `/api/admin/homepage` (images, stats, footer)
  - POST `/api/admin/translations` (i18n; supports nested composite keys)
- Public → Supabase:
  - `lib/supabase-services.ts` (homepage/projects)
  - `/api/public/translations` + `components/translations-loader.tsx` hydrate i18n, dispatch `i18n-updated`
- Live refresh: admin dispatches `homepage-data-updated`/`i18n-updated`; public pages listen and re-fetch

Debug endpoints

- GET `/api/debug/homepage`
- GET `/api/debug/translations`
- GET `/api/debug/projects`

Stats animation

- `hooks/use-counter-animation.ts` starts on visibility or if already in viewport

Notes

- `localStorage` remains for instant preview; canonical data is in Supabase.


