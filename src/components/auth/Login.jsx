import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import AuthLayout from './AuthLayout';
import { Mail, Lock, LogIn, LoaderCircle, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      navigate('/');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Login to access your fire collection and saved favorites."
    >
      <form onSubmit={handleLogin} className="space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/50 flex items-center gap-3 text-red-400 text-sm animate-shake">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}
        
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
          <input 
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder:text-slate-500 transition-all" 
            placeholder="Email address"
          />
        </div>

        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
          <input 
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder:text-slate-500 transition-all" 
            placeholder="Password"
          />
        </div>

        <div className="flex justify-end">
          <Link to="/forgot-password" size="sm" className="text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
            Forgot Password?
          </Link>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-black py-4 rounded-xl hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all active:scale-[0.98] disabled:opacity-70"
        >
          {loading ? <LoaderCircle className="w-6 h-6 animate-spin" /> : <LogIn className="w-5 h-5" />}
          Login
        </button>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-900 px-2 text-slate-500 font-bold tracking-widest">Or continue with</span>
          </div>
        </div>

        <button 
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white text-black font-black py-4 rounded-xl hover:bg-slate-200 transition-all active:scale-[0.98]"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/smartlock/google.svg" alt="Google" className="w-5 h-5" />
          Google Account
        </button>

        <p className="mt-8 text-slate-400 text-sm">
          Don't have an account? {' '}
          <Link to="/register" className="text-cyan-400 font-bold hover:underline">
            Register for Free
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
