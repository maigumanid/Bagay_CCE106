import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';

export const PORTAL_THEME = {
  colors: {
    bg: '#0a0e17',
    card: '#111827',
    cardHover: '#1f2937',
    input: '#0b1320',
    border: '#1f2d40',
    primary: '#10b981',
    primaryDark: '#059669',
    accent: '#6366f1',
    text: '#f9fafb',
    textMuted: '#9ca3af',
    danger: '#f43f5e',
    dangerBg: 'rgba(244, 63, 94, 0.12)',
    successBg: 'rgba(16, 185, 129, 0.12)',
  },
  radius: '8px',
  shadow: '0 4px 20px rgba(0, 0, 0, 0.35)',
};

const StyleInjector: React.FC = () => (
  <style>{`
    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    html, body {
      width: 100%;
      min-height: 100%;
      height: auto;
      overflow-y: auto;
      overflow-x: hidden;
      background-color: ${PORTAL_THEME.colors.bg};
      color: ${PORTAL_THEME.colors.text};
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    #root, .app-wrapper {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    
    .portal-container {
      width: 100%;
      max-width: 1100px;
      margin: 0 auto;
      padding: 1rem;
      flex: 1;
    }

    .portal-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
      align-items: start;
    }
    
    .card-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.75rem;
    }
    
    @media (min-width: 640px) {
      .card-grid { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
    }
    
    @media (min-width: 868px) {
      .portal-grid { grid-template-columns: 2fr 1fr; }
    }

    .responsive-header {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    @media (min-width: 520px) {
      .responsive-header { flex-direction: row; align-items: center; justify-content: space-between; }
    }

    .responsive-row {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    @media (min-width: 480px) {
      .responsive-row { flex-direction: row; align-items: center; justify-content: space-between; }
    }

    .spinner {
      width: 16px; height: 16px;
      border: 2px solid rgba(255,255,255,0.2);
      border-top-color: #ffffff;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      display: inline-block;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  `}</style>
);

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'admin';
  studentId?: string;
  major?: string;
  gpa?: number;
}

const MOCK_USERS: Record<string, { pass: string; user: User }> = {
  'bagay@university.edu': {
    pass: 'password123',
    user: { id: 'u101', email: 'bagay@university.edu', name: 'Michaela Bagay', role: 'student', studentId: 'STU-8842', major: 'IT', gpa: 3.88 }
  },
  'admin.portal@university.edu': {
    pass: 'admin123',
    user: { id: 'u999', email: 'admin.portal@university.edu', name: 'Dr. Evelyn Vance', role: 'admin' }
  }
};

const STORAGE_KEY = 'portal_jwt_token';

const makeToken = (user: User) => {
  const payload = btoa(JSON.stringify({ userId: user.id, role: user.role, exp: Date.now() + 300000 }));
  return `mockHeader.${payload}.signature`;
};

const parseToken = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
};

const MockApi = {
  login: async (email: string, pass: string) => {
    await new Promise(r => setTimeout(r, 600));
    const found = MOCK_USERS[email.toLowerCase().trim()];
    if (!found || found.pass !== pass) throw new Error('Invalid email or password.');
    return { token: makeToken(found.user), user: found.user };
  },
  fetchProfile: async (authHeader?: string) => {
    await new Promise(r => setTimeout(r, 400));
    if (!authHeader?.startsWith('Bearer ')) throw { status: 401, message: 'Missing Bearer token.' };
    
    const decoded = parseToken(authHeader.split(' ')[1]);
    if (!decoded || Date.now() > decoded.exp) throw { status: 401, message: 'Token expired or invalid.' };
    
    const entry = Object.values(MOCK_USERS).find(u => u.user.id === decoded.userId);
    if (!entry) throw { status: 404, message: 'User not found.' };

    return {
      user: entry.user,
      courses: [
        { code: 'IT-401', name: 'Distributed Systems Architecture', grade: 'A', credits: 4 },
        { code: 'IT-450', name: 'Neural Networks & Deep Learning', grade: 'A-', credits: 3 },
        { code: 'MATH-302', name: 'Applied Linear Algebra', grade: 'B+', credits: 3 },
        { code: 'IT-380', name: 'Database Systems & Internals', grade: 'A', credits: 4 },
        { code: 'IT-490', name: 'Senior Capstone Project', grade: 'A', credits: 3 },
      ]
    };
  }
};

interface AuthContextType {
  user: User | null;
  token: string | null;
  isRestoring: boolean;
  error: string | null;
  login: (e: string, p: string) => Promise<void>;
  logout: () => void;
  fetchData: () => Promise<any>;
  corruptToken: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isRestoring, setIsRestoring] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setToken(null);
    setUser(null);
    setError(null);
  }, []);

  const restoreSession = useCallback(async () => {
    setIsRestoring(true);
    const savedToken = localStorage.getItem(STORAGE_KEY);
    if (savedToken) {
      try {
        const res = await MockApi.fetchProfile(`Bearer ${savedToken}`);
        setToken(savedToken);
        setUser(res.user);
      } catch (err: any) {
        logout();
        if (err.status === 401) setError('Session expired. Please log in again.');
      }
    }
    setIsRestoring(false);
  }, [logout]);

  useEffect(() => { restoreSession(); }, [restoreSession]);

  const login = async (e: string, p: string) => {
    setError(null);
    const res = await MockApi.login(e, p);
    if (!res?.token) throw new Error('Token is undefined in API response.');
    localStorage.setItem(STORAGE_KEY, res.token);
    setToken(res.token);
    setUser(res.user);
  };

  const fetchData = async () => {
    try {
      return await MockApi.fetchProfile(`Bearer ${token}`);
    } catch (err: any) {
      if (err.status === 401) {
        setError('Unauthorized request (401). Logging out.');
        logout();
      }
      throw err;
    }
  };

  const corruptToken = () => {
    const badToken = 'INVALID_TOKEN';
    localStorage.setItem(STORAGE_KEY, badToken);
    setToken(badToken);
  };

  return (
    <AuthContext.Provider value={{ user, token, isRestoring, error, login, logout, fetchData, corruptToken }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};


const LoginForm: React.FC = () => {
  const { login, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidation('');
    if (!email.trim() || !password.trim()) return setValidation('Email and password are required.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setValidation('Enter a valid email address.');

    try {
      setLoading(true);
      await login(email, password);
    } catch (err: any) {
      // Error state handled in Context
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', width: '100%' }}>
      <div style={{
        width: '100%',
        maxWidth: '380px',
        backgroundColor: PORTAL_THEME.colors.card,
        border: `1px solid ${PORTAL_THEME.colors.border}`,
        borderRadius: PORTAL_THEME.radius,
        padding: '1.5rem',
        boxShadow: PORTAL_THEME.shadow,
      }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', textAlign: 'center' }}>Portal Login</h2>
        <p style={{ fontSize: '0.8rem', color: PORTAL_THEME.colors.textMuted, marginBottom: '1.25rem', textAlign: 'center' }}>Sign in to access student records</p>

        {(validation || error) && (
          <div style={{
            padding: '0.6rem',
            backgroundColor: PORTAL_THEME.colors.dangerBg,
            border: `1px solid ${PORTAL_THEME.colors.danger}`,
            borderRadius: PORTAL_THEME.radius,
            color: '#fca5a5',
            fontSize: '0.8rem',
            marginBottom: '1rem',
          }}>
            {validation || error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', color: PORTAL_THEME.colors.textMuted, marginBottom: '0.3rem' }}>Email</label>
            <input
              type="email"
              placeholder="student@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem',
                backgroundColor: PORTAL_THEME.colors.input,
                border: `1px solid ${PORTAL_THEME.colors.border}`,
                borderRadius: PORTAL_THEME.radius,
                color: PORTAL_THEME.colors.text,
                fontSize: '0.9rem',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', color: PORTAL_THEME.colors.textMuted, marginBottom: '0.3rem' }}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem',
                backgroundColor: PORTAL_THEME.colors.input,
                border: `1px solid ${PORTAL_THEME.colors.border}`,
                borderRadius: PORTAL_THEME.radius,
                color: PORTAL_THEME.colors.text,
                fontSize: '0.9rem',
                outline: 'none',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.7rem',
              backgroundColor: PORTAL_THEME.colors.primary,
              color: '#fff',
              border: 'none',
              borderRadius: PORTAL_THEME.radius,
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            {loading ? <><span className="spinner" /> Authenticating...</> : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: `1px solid ${PORTAL_THEME.colors.border}` }}>
          <p style={{ fontSize: '0.7rem', color: PORTAL_THEME.colors.textMuted, marginBottom: '0.5rem' }}>QUICK DEMO CREDENTIALS:</p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => { setEmail('bagay@university.edu'); setPassword('password123'); setValidation(''); }}
              style={{ flex: 1, padding: '0.35rem', backgroundColor: PORTAL_THEME.colors.input, border: `1px solid ${PORTAL_THEME.colors.border}`, color: PORTAL_THEME.colors.primary, borderRadius: PORTAL_THEME.radius, fontSize: '0.75rem', cursor: 'pointer' }}
            >
              Student
            </button>
            <button
              onClick={() => { setEmail('admin.portal@university.edu'); setPassword('admin123'); setValidation(''); }}
              style={{ flex: 1, padding: '0.35rem', backgroundColor: PORTAL_THEME.colors.input, border: `1px solid ${PORTAL_THEME.colors.border}`, color: PORTAL_THEME.colors.accent, borderRadius: PORTAL_THEME.radius, fontSize: '0.75rem', cursor: 'pointer' }}
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  return (
    <header style={{ backgroundColor: PORTAL_THEME.colors.card, borderBottom: `1px solid ${PORTAL_THEME.colors.border}`, padding: '0.85rem 1rem', position: 'sticky', top: 0, zIndex: 10 }}>
      <div className="portal-container responsive-header" style={{ padding: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.2rem' }}>🎓</span>
          <strong style={{ fontSize: '1rem' }}>StudentPortal</strong>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.85rem' }}>{user?.name}</span>
          <span style={{
            fontSize: '0.65rem',
            padding: '2px 6px',
            borderRadius: '4px',
            backgroundColor: user?.role === 'admin' ? PORTAL_THEME.colors.accent : PORTAL_THEME.colors.primary,
            color: '#fff',
            fontWeight: 'bold',
            textTransform: 'uppercase'
          }}>
            {user?.role}
          </span>
          <button
            onClick={logout}
            style={{
              padding: '0.35rem 0.75rem',
              backgroundColor: 'transparent',
              border: `1px solid ${PORTAL_THEME.colors.danger}`,
              color: PORTAL_THEME.colors.danger,
              borderRadius: PORTAL_THEME.radius,
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

const StudentDashboard: React.FC<{ user: User }> = ({ user }) => {
  const { fetchData } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData()
      .then(res => setCourses(res.courses))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ backgroundColor: PORTAL_THEME.colors.card, border: `1px solid ${PORTAL_THEME.colors.border}`, borderRadius: PORTAL_THEME.radius, padding: '1rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Student Profile</h3>
        <div className="card-grid">
          <div style={{ backgroundColor: PORTAL_THEME.colors.input, padding: '0.75rem', borderRadius: PORTAL_THEME.radius }}>
            <div style={{ fontSize: '0.7rem', color: PORTAL_THEME.colors.textMuted }}>ID</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{user.studentId}</div>
          </div>
          <div style={{ backgroundColor: PORTAL_THEME.colors.input, padding: '0.75rem', borderRadius: PORTAL_THEME.radius }}>
            <div style={{ fontSize: '0.7rem', color: PORTAL_THEME.colors.textMuted }}>Major</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{user.major}</div>
          </div>
          <div style={{ backgroundColor: PORTAL_THEME.colors.input, padding: '0.75rem', borderRadius: PORTAL_THEME.radius }}>
            <div style={{ fontSize: '0.7rem', color: PORTAL_THEME.colors.textMuted }}>GPA</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: PORTAL_THEME.colors.primary }}>{user.gpa}</div>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: PORTAL_THEME.colors.card, border: `1px solid ${PORTAL_THEME.colors.border}`, borderRadius: PORTAL_THEME.radius, padding: '1rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Protected Enrolled Courses</h3>
        {loading ? (
          <div style={{ fontSize: '0.85rem', color: PORTAL_THEME.colors.textMuted, display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span className="spinner" /> Loading records...
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {courses.map((c, i) => (
              <div key={i} className="responsive-row" style={{ padding: '0.65rem 0.8rem', backgroundColor: PORTAL_THEME.colors.input, borderRadius: PORTAL_THEME.radius, border: `1px solid ${PORTAL_THEME.colors.border}`, fontSize: '0.85rem' }}>
                <div>
                  <strong style={{ color: PORTAL_THEME.colors.primary, marginRight: '0.5rem' }}>{c.code}</strong>
                  <span>{c.name}</span>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: PORTAL_THEME.colors.textMuted }}>{c.credits} Credits</span>
                  <span style={{ fontWeight: 'bold' }}>Grade: {c.grade}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const AdminDashboard: React.FC<{ user: User }> = ({ user }) => (
  <div style={{ backgroundColor: PORTAL_THEME.colors.card, border: `1px solid ${PORTAL_THEME.colors.accent}`, borderRadius: PORTAL_THEME.radius, padding: '1rem' }}>
    <h3 style={{ fontSize: '1rem', color: PORTAL_THEME.colors.accent, marginBottom: '0.5rem' }}>🛡️ Admin Panel</h3>
    <p style={{ fontSize: '0.85rem', color: PORTAL_THEME.colors.textMuted }}>Role: Administrator ({user.name}). Accessing administrative tools and roster permissions.</p>
  </div>
);

const PortalContent: React.FC = () => {
  const { user, isRestoring } = useAuth();

  if (isRestoring) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.5rem' }}>
        <span className="spinner" style={{ width: 24, height: 24 }} />
        <span style={{ fontSize: '0.85rem', color: PORTAL_THEME.colors.textMuted }}>Restoring session...</span>
      </div>
    );
  }

  if (!user) return <LoginForm />;

  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="portal-container">
        <div className="portal-grid">
          <div>{user.role === 'student' ? <StudentDashboard user={user} /> : <AdminDashboard user={user} />}</div>
        </div>
      </main>
    </div>
  );
};

export default function AuthenticatedStudentPortal() {
  return (
    <>
      <StyleInjector />
      <AuthProvider>
        <PortalContent />
      </AuthProvider>
    </>
  );
}