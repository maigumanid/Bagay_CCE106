const crypto = require('node:crypto');
const cors = require('cors');
const express = require('express');

const PORT = Number(process.env.PORT) || 3000;

const examUser = Object.freeze({
  id: 1,
  name: 'Exam Student',
  email: 'student@example.com',
  role: 'student',
});

// The seeded password is stored as a scrypt hash. The testing password is documented
// in server/README.md so an instructor can sign in without placing plaintext in code.
const passwordSalt = 'a86129a3210c865db0f5892c1ac869ef';
const passwordHash = '21445072b09a8b663b2b9abd23b66188b3f24996c6ba9e7f6cc36d5c7a22cce3b50dbe542fef87687c2f2aec4170b82d219a9857226110f5bc1cb4fe40ec5df4';

const students = Object.freeze([
  Object.freeze({ id: 1, name: 'Alyssa Cruz', email: 'alyssa.cruz@example.com', course: 'BS Information Technology' }),
  Object.freeze({ id: 2, name: 'Marco Reyes', email: 'marco.reyes@example.com', course: 'BS Computer Science' }),
  Object.freeze({ id: 3, name: 'Janelle Santos', email: 'janelle.santos@example.com', course: 'BS Information Systems' }),
]);

const sessions = new Map();
const app = express();

app.use(cors());
app.use(express.json());

function passwordMatches(password) {
  const submittedHash = crypto.scryptSync(password, passwordSalt, 64);
  const expectedHash = Buffer.from(passwordHash, 'hex');

  return crypto.timingSafeEqual(submittedHash, expectedHash);
}

function requireAuthentication(request, response, next) {
  const authorization = request.get('authorization') ?? '';
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  const session = match ? sessions.get(match[1]) : undefined;

  if (!session) {
    return response.status(401).json({ message: 'Unauthorized' });
  }

  request.authenticatedUser = session.user;
  return next();
}

app.post('/login', (request, response) => {
  const email = typeof request.body?.email === 'string' ? request.body.email.trim().toLowerCase() : '';
  const password = typeof request.body?.password === 'string' ? request.body.password : '';

  if (!email || !password) {
    return response.status(400).json({ message: 'Email and password are required.' });
  }

  if (email !== examUser.email || !passwordMatches(password)) {
    return response.status(401).json({ message: 'Invalid email or password.' });
  }

  const accessToken = crypto.randomBytes(32).toString('base64url');
  sessions.set(accessToken, { user: examUser });

  return response.json({ accessToken, user: examUser });
});

app.get('/students', requireAuthentication, (_request, response) => {
  return response.json(students);
});

app.get('/students/:id', requireAuthentication, (request, response) => {
  const student = students.find(({ id }) => String(id) === request.params.id);

  if (!student) {
    return response.status(404).json({ message: 'Student not found.' });
  }

  return response.json(student);
});

app.get('/profile', requireAuthentication, (request, response) => {
  return response.json(request.authenticatedUser);
});

app.use((_request, response) => {
  return response.status(404).json({ message: 'Endpoint not found.' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Exam API listening on http://0.0.0.0:${PORT}`);
});
