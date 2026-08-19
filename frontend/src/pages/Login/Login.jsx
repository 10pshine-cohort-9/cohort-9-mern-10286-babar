import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/auth.api'; 
import { saveToken } from '../../services/token.service';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // API State
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await loginUser({ email, password });
      const token = response?.data?.token;

      if (token) {
        saveToken(token);
        navigate('/dashboard'); 
      } else {
        throw new Error('Token not found in response data.');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#FAFAF9] font-sans selection:bg-teal-100 selection:text-teal-900">
      
      {/* Left Column - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:w-1/2 xl:w-5/12 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:max-w-md animate-fade-in-up">
          
          {/* Header & Logo */}
          <div className="flex flex-col items-start mb-8">
            <Link to="/" className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-600 shadow-sm mb-6 hover:scale-105 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </Link>
            <h2 className="text-3xl font-semibold tracking-tight text-stone-900">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-stone-500">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-teal-600 hover:text-teal-700 transition-colors">
                Sign up for free
              </Link>
            </p>
          </div>

          {/* Login Form Container */}
          <div className="bg-white py-8 px-6 sm:px-8 rounded-3xl shadow-xl shadow-stone-200/40 border border-stone-100">
            
            {/* Error Alert */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600">
                <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-stone-200 rounded-2xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all sm:text-sm"
                  placeholder="you@example.com"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-4 py-3 pr-12 border border-stone-200 rounded-2xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all sm:text-sm"
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-stone-400 hover:text-teal-600 transition-colors focus:outline-none"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all hover:shadow-md hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </div>
            </form>
          </div>
          
          <div className="mt-8">
            <Link to="/" className="text-sm text-stone-400 hover:text-stone-600 transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Right Column - Visual/Quote */}
      <div className="hidden lg:flex lg:flex-1 relative bg-stone-100 items-center justify-center overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-200/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-stone-200/60 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-md w-full bg-white/60 backdrop-blur-md p-10 rounded-3xl border border-white/40 shadow-2xl shadow-stone-200/50">
          <svg className="w-10 h-10 text-teal-600 mb-6 opacity-50" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="text-xl text-stone-700 font-medium leading-relaxed mb-6">
            "NoteSpace feels like a breath of fresh air. It's fast, beautifully simple, and keeps all my daily thoughts perfectly organized without any visual clutter."
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-stone-200"></div>
            <div>
              <h4 className="text-sm font-semibold text-stone-900">Sarah Jenkins</h4>
              <p className="text-xs text-stone-500">Product Designer</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;