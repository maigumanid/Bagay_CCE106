# Exam API

Small Express API for the Student Service Portal practical exam.

## Start

From the repository root:

```sh
npm run api
```

The API listens on port `3000` by default and binds to `0.0.0.0` so an Expo app on the same LAN can reach it. Set the server-only `PORT` environment variable to use another port.

## Seeded login

- Email: `student@example.com`
- Password: `ExamPass123!`

The password is documented for testing, but only its scrypt hash is stored in the server source. Each successful login creates a new random, in-memory session token. Sessions end when the API process restarts.

## Endpoints

- `POST /login` with JSON `{ "email": "...", "password": "..." }`
- `GET /students` with `Authorization: Bearer <token>`
- `GET /students/:id` with `Authorization: Bearer <token>`
- `GET /profile` with `Authorization: Bearer <token>`

The Expo client's API base URL is intentionally unchanged. Choose its local or LAN URL after deciding whether Expo is running in a web browser, emulator, or physical device.
