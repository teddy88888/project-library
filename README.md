# Booky Library Web — MVP Frontend

Frontend project based on **Library Web – MVP Guide (Frontend)**.

## Stack
- React + TypeScript
- Tailwind CSS
- shadcn/ui-style components
- Redux Toolkit
- TanStack Query
- Optimistic UI for borrowing
- Day.js
- Sonner toast feedback
- React Router

## Pages
- `/login`
- `/register`
- `/` Home / recommendations
- `/books` Book List + category/rating filters + search
- `/books/:id` Book Detail + stock + reviews + borrow
- `/loans` My Loans
- `/profile` My Profile + loan statistics
- `/admin` Admin placeholder

## Run
```bash
npm install
npm run dev
```

## API connection
Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` to the backend base URL from the Swagger/OpenAPI documentation.

The exact Swagger endpoint/response schema was not included in the provided MVP PDF, so `src/lib/api.ts` isolates the endpoint adapter. The app is runnable with `VITE_USE_MOCK=true` and can be switched to the real API after mapping the Swagger routes/response fields.

Expected high-level backend operations:
- login/register
- books list/detail
- borrow
- loans
- add/delete review
- profile update

## UX requirements covered
- loading and error states
- toast feedback
- responsive Tailwind layout
- token attached to authenticated API requests
- optimistic stock update on borrow
- formatted loan dates with Day.js

## Visual assets
The supplied Booky reference screenshot was used to crop the hero and sample cover artwork into `public/assets/`. Replace these with production assets when the final design assets are available.
