import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import AuthLayout from './AuthLayout';
import { Mail, Lock, UserPlus, LoaderCircle, AlertCircle, User, CheckCircle2 } from 'lucide-react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <AuthLayout 
        title="Check Your Email" 
        subtitle={`We've sent a verification link to ${email}.`}
      >
        <div className="flex flex-col items-center py-8">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <p className="text-slate-300 mb-8 leading-relaxed">Please click the link in your email to confirm your account and start downloading!</p>
          <Link to="/login" className="w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-slate-200 transition-colors text-center">
            Back to Login
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Join the elite community of DJs and start your collection today."
    >
      <form onSubmit={handleRegister} className="space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/50 flex items-center gap-3 text-red-400 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}
        
        <div className="relative group">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
          <input 
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder:text-slate-500 transition-all" 
            placeholder="Full Name"
          />
        </div>

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
            placeholder="Password (min 6 characters)"
            minLength={6}
          />
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-black py-4 rounded-xl hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all active:scale-[0.98] disabled:opacity-70 mt-4"
        >
          {loading ? <LoaderCircle className="w-6 h-6 animate-spin" /> : <UserPlus className="w-5 h-5" />}
          Join Now
        </button>

        <p className="mt-8 text-slate-400 text-sm text-center">
          Already have an account? {' '}
          <Link to="/login" className="text-cyan-400 font-bold hover:underline">
            Log In
          </Link>
        </p>

        <p className="text-[10px] text-slate-500 uppercase tracking-widest leading-relaxed mt-6 text-center">
          By signing up, you agree to our <br />
          <span className="text-slate-400 font-bold underline cursor-pointer">Terms of Service</span> & <span className="text-slate-400 font-bold underline cursor-pointer">Privacy Policy</span>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;
