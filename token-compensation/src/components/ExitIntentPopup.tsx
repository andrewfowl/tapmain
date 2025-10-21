import { useState } from 'react';
import { X, Download, FileText, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ExitIntentPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExitIntentPopup({ isOpen, onClose }: ExitIntentPopupProps) {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const { error: insertError } = await supabase
        .from('lead_captures')
        .insert({
          email,
          full_name: fullName,
          company_name: companyName || null,
          source: 'exit_popup',
          resource_name: 'Token Compensation Calculator',
        });

      if (insertError) throw insertError;

      setShowThankYou(true);

      setTimeout(() => {
        window.open('https://docs.google.com/spreadsheets/d/1PkCGflrMrU3DFxSf0pNFjH00z3mGzHYP6dGGF2yIehY/edit', '_blank');
      }, 500);
    } catch (err) {
      console.error('Error capturing lead:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showThankYou) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-emerald-500/30 max-w-md w-full relative animate-slideUp shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">Thank You!</h2>
            <p className="text-slate-300 text-lg mb-6">
              Your calculator is opening in a new tab. Check your email for additional resources.
            </p>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-emerald-500/30 max-w-2xl w-full relative animate-slideUp shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">Wait! Don't Leave Empty-Handed</h2>
          <p className="text-slate-300 text-lg">
            Get our free Token Compensation Calculator before you go
          </p>
        </div>

        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 mb-6">
          <h3 className="font-bold text-white mb-3 text-lg">This Calculator Includes:</h3>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">✓</span>
              <span>Complete spreadsheet template for calculating token compensation expenses</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">✓</span>
              <span>Pre-built formulas in accordance with US GAAP</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">✓</span>
              <span>Step-by-step examples and instructions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">✓</span>
              <span>Audit-ready documentation templates</span>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold text-slate-300 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="John Smith"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="john@company.com"
            />
          </div>

          <div>
            <label htmlFor="companyName" className="block text-sm font-semibold text-slate-300 mb-2">
              Company Name (Optional)
            </label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="Acme Corp"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg rounded-lg transition-all duration-200 shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Get Free Calculator
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full px-8 py-4 text-slate-400 hover:text-white transition-colors"
          >
            No thanks, I'll figure it out myself
          </button>
        </form>
      </div>
    </div>
  );
}
