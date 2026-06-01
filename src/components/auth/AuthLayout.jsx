import React from 'react';
import VinylLogo from '../VinylLogo';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-8 pt-12 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/20 rotate-3">
             <VinylLogo className="w-12 h-12 text-black animate-spin-slow" />
          </div>
          
          <h2 className="text-2xl font-black text-white mb-2 italic uppercase tracking-tighter">{title}</h2>
          <p className="text-slate-400 text-sm mb-8">{subtitle}</p>
          
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
