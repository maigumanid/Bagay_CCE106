# CCE106 Practical Laboratory Examination

## Student Service Portal

### Student Information

Name: MICHAELA DARRY G. BAGAY

Section: CCE106 2013

Date: OCTOBER 3, 2026

### Required Features

- [x] Login
- [x] Authentication state
- [x] Secure token storage implementation
- [x] Protected navigation
- [x] Dashboard
- [x] Student API request
- [x] Loading state
- [x] Error state
- [x] Empty state
- [x] Search/filter
- [x] Dynamic student details
- [x] Profile
- [x] Session restoration implementation
- [x] Logout

Native Android/iOS SecureStore persistence verification remains pending.

### API

Base URL: configure `EXPO_PUBLIC_API_URL`, with `http://localhost:3000` as the
same-computer web fallback in `constants/api.ts`.

POST /login

GET /students

GET /students/{id}

GET /profile

See `server/README.md` for the local exam API contract and testing credentials.

### How to Run

```sh
npm install
npx expo start
```

Press `w` for web, or run `npm run web` directly.

The app opens the sign-in screen when no valid session is available. After login,
Expo Router protects the application tabs and the dynamic student detail route.
Student and profile records are loaded from the local exam API, and **View Details**
opens the matching `/student/[id]` route.

Search for `TODO EXAM` throughout the project. The seeded testing credentials are
documented in `server/README.md`.

Expo SecureStore is used only in `context/AuthContext.tsx` on supported native
platforms. Web sessions remain memory-only. The native implementation is complete,
but secure session persistence still needs verification on Android/iOS. See the
[Expo SDK 54 SecureStore documentation](https://docs.expo.dev/versions/v54.0.0/sdk/securestore/).

Compiler and lint checks:

```sh
npx tsc --noEmit
npm run lint
```

### Required Git Commits

Students must create at least five meaningful commits.

Suggested examples:

- `exam: setup navigation`
- `exam: implement login`
- `exam: integrate student api`
- `exam: add dynamic student details`
- `exam: implement session and logout`

### Submission

Submit the GitHub repository URL according to the instructor's instructions.
