# Secure Profile App

Name: Michaela Darry G. Bagay
Section: 2013 CCE106

Commands to run:
- npm install
- npx expo start

# Reflection Questions

1. Why is SecureStore more appropriate than plain-text storage for an access token?
I used SecureStore instead of AsyncStorage because SecureStore encrypts data using the phone's hardware security (iOS Keychain and Android Keystore). AsyncStorage only saves data as plain text, which isn't safe for sensitive things like login tokens that could easily be stolen.

2. What is the purpose of the Authorization header?
The Authorization: Bearer <token> header tells the server who is making the request. By attaching our saved access token to the headers when calling protected routes like /auth/me, the server can verify our session without asking for our username and password every time.

What should the app do when a stored token is expired or rejected?
When the API returns a 401 Unauthorized error, it means the token is invalid or expired. The app handles this by automatically wiping the stored token from SecureStore, clearing the profile state, and kicking the user back to the login screen so they can sign in again.