# OLX Clone (React + Firebase)

A classifieds marketplace UI modelled on OLX. Users sign in, post items for sale, edit their own listings, browse all listings, and keep a wishlist. Firebase provides authentication and the Firestore database.

Live demo: https://react-olx-clone-three.vercel.app

## Features

- **Authentication** (Firebase Auth)
  - Google sign-in (popup)
  - Email/password sign-up and sign-in with client-side validation (name, email format, password strength)
  - Sign-up also writes a record to the Firestore `user` collection
  - Logout from the profile dropdown
- **Listings** (Firestore `products` collection)
  - Home page grid of all listings ("Fresh Recommendations")
  - Sell modal: title, category, price, description, and one image (logged-in users only)
  - Item details page with price, category, description, seller name, and date
  - Sellers can edit their own listings from the details page
- **Wishlist**
  - Heart icon on each card toggles wishlist (requires login)
  - `/wishlist` page with empty-state screen
- Toast notifications (react-toastify), responsive layout with Tailwind CSS

### Known limitations

- Images are stored as base64 data URLs inside the Firestore document, not in Firebase Storage (Storage is initialised but unused). Large images can exceed Firestore's 1 MiB document limit.
- The wishlist is held in React state only, so it resets on page reload.
- The details page gets its item from router state. Opening `/details` directly or refreshing it shows an empty page.
- The search inputs and the "Load more" button are UI only, with no behaviour wired up.

## Tech stack

| Area | Tools |
| --- | --- |
| UI | React 19, React Router 7 |
| Build | Vite 6 with `@vitejs/plugin-react-swc` |
| Styling | Tailwind CSS 3, Flowbite / Flowbite React, PostCSS + Autoprefixer |
| Backend | Firebase 11: Auth, Firestore |
| Other | react-firebase-hooks, react-toastify |
| Linting | ESLint 9 (flat config) with react-hooks and react-refresh plugins |

## Folder structure

```
.
├── index.html               # Vite HTML entry, loads /src/main.jsx
├── public/                  # static files served as-is (favicon)
├── src/
│   ├── main.jsx             # React root, router and context providers
│   ├── app/App.jsx          # route table + global footer and toast container
│   ├── assets/
│   │   ├── icons/           # SVG icons
│   │   └── images/          # PNG / GIF / WebP images
│   ├── components/
│   │   ├── layout/          # Navbar, Footer, Footer2
│   │   └── ui/              # Banner, Card, Dropdown, Input
│   ├── features/
│   │   ├── auth/            # Login + EmailLogin modals, AuthContext
│   │   ├── items/           # Sell modal, ItemsContext
│   │   └── wishlist/        # WishlistContext
│   ├── pages/               # Home, Details, Wishlist
│   ├── services/firebase.js # Firebase init + auth/Firestore helpers
│   └── styles/              # global CSS
├── .env.example             # required environment variable names
├── jsconfig.json            # "@/*" path alias for editors
├── vite.config.js           # plugins, base path, "@" alias
├── tailwind.config.js
├── postcss.config.js
└── eslint.config.js
```

Imports use the `@/` alias for `src/`, for example `import { auth } from "@/services/firebase"`.

### Routes

| Path | Page |
| --- | --- |
| `/` | Home: banner and listing grid |
| `/details` | Item details (item passed via router state) |
| `/wishlist` | Wishlisted items |

## Prerequisites

- Node.js `^18.0.0 || ^20.0.0 || >=22.0.0` (required by Vite 6)
- npm (the repo ships a `package-lock.json`)
- A Firebase project with:
  - a Web app registered, to get the config values
  - Authentication enabled with the **Google** and **Email/Password** providers
  - a Cloud Firestore database (the app uses the `products` and `user` collections)

## Setup

```bash
git clone https://github.com/CodeWith-vivek/react-olx-clone.git
cd react-olx-clone
npm install          # also runs "flowbite-react patch" via postinstall
cp .env.example .env # then fill in your Firebase values
```

## Environment variables

Vite reads these from `.env`. All are values from your Firebase Web app config (Project settings → General → Your apps).

| Variable | Purpose |
| --- | --- |
| `VITE_FIREBASE_API_KEY` | Firebase Web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Auth domain used for sign-in popups |
| `VITE_FIREBASE_PROJECT_ID` | Firebase / Firestore project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Storage bucket name |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Cloud Messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase Web app ID |

Build-time variable, read in `vite.config.js`:

| Variable | Purpose |
| --- | --- |
| `VITE_BASE_PATH` | Public base path the app is served from. Defaults to `/react-olx-clone`. It is read from `process.env`, so set it in the shell or the hosting provider's environment settings. Putting it in `.env` has no effect here. |

`.env` is git-ignored. Never commit real keys.

## Development

```bash
npm run dev      # start the Vite dev server with HMR
npm run lint     # run ESLint on the project
```

The dev server is served under the base path, so by default it runs at `http://localhost:5173/react-olx-clone/`.

> **Note:** `BrowserRouter` in `src/main.jsx` has no `basename`, so under the default `/react-olx-clone` base the routes (`/`, `/wishlist`, …) do not match and only the footer renders. To run at the root instead:
>
> ```bash
> VITE_BASE_PATH=/ npm run dev          # macOS / Linux / Git Bash
> $env:VITE_BASE_PATH="/"; npm run dev  # PowerShell
> ```

## Build and preview

```bash
npm run build    # production build into dist/
npm run preview  # serve the built dist/ locally
```

## Tests

No test framework or test files are set up yet.

## Deployment

The repository has no CI workflow or hosting config file. The live demo linked above is hosted on Vercel.

To deploy on any static host (Vercel, Netlify, and similar):

1. Build command: `npm run build`. Output directory: `dist`.
2. Add all `VITE_FIREBASE_*` variables in the host's environment settings.
3. Set `VITE_BASE_PATH` to the path the site is served from, for example `/` for a root domain.
4. Configure a rewrite of all paths to `index.html` so client-side routes like `/wishlist` work on refresh.
5. Add the deployed domain to Firebase Authentication → Settings → Authorized domains so Google sign-in works.
