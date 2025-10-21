import { useState, useEffect } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { Star, ArrowRight, Shield, CheckCircle2, FileSpreadsheet, FileText, Download, Mail, Clock, Users, Calendar, TrendingUp, X } from 'lucide-react';
import {
  AnimatedCalculator,
  AnimatedShield,
  AnimatedDocument,
  AnimatedTrend,
  AnimatedCheckCircle,
  AnimatedUsers,
  AnimatedAward,
  AnimatedLightbulb,
  AnimatedChart,
  AnimatedTarget
} from './components/AnimatedIcons';
import SignupModal from './components/SignupModal';
import ExitIntentPopup from './components/ExitIntentPopup';
import { trackButtonClick, trackExitIntent, trackResourceDownload } from './lib/analytics';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [hasShownExitPopup, setHasShownExitPopup] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownExitPopup) {
        trackExitIntent();
        setShowExitPopup(true);
        setHasShownExitPopup(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShownExitPopup]);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({namespace: '30min'});
      cal('ui', {
        theme: 'dark',
        cssVarsPerTheme: {
          light: { 'cal-brand': '#10b981' },
          dark: { 'cal-brand': '#10b981' }
        },
        hideEventTypeDetails: false,
        layout: 'week_view'
      });
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-700 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <AnimatedCalculator />
            <span className="text-2xl font-bold text-white">TokenAccrual</span>
          </div>
          <button
            onClick={() => {
              trackButtonClick('Book Consultation', 'header');
              scrollToSection('booking');
            }}
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105"
          >
            Book Consultation
          </button>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-6">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 text-sm font-semibold">Trusted by Leading Web3 Companies</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Token Compensation<br />
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Accruals Accounting
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Navigate complex token grant expense accounting with confidence.
              US GAAP compliant solutions designed for modern crypto finance teams.
            </p>

            <div className="flex items-center justify-center gap-2 mb-10">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 border-2 border-slate-900"></div>
                ))}
              </div>
              <div className="flex gap-1 ml-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-slate-300 text-sm ml-2">Rated 5.0 by finance leaders</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  trackButtonClick('Schedule Free Consultation', 'hero');
                  scrollToSection('booking');
                }}
                className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg rounded-lg transition-all duration-200 shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 flex items-center justify-center gap-2"
              >
                Schedule Free Consultation
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="px-8 py-4 bg-slate-700/50 hover:bg-slate-700 text-white font-bold text-lg rounded-lg transition-all duration-200 border border-slate-600 hover:border-slate-500"
              >
                See How It Works
              </button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-1">500+</div>
                <div className="text-slate-400 text-sm">Grants Processed</div>
              </div>
              <div className="text-center border-x border-slate-700">
                <div className="text-3xl font-bold text-emerald-400 mb-1">$50M+</div>
                <div className="text-slate-400 text-sm">Token Value Tracked</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-1">100%</div>
                <div className="text-slate-400 text-sm">GAAP Compliant</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto">
          <p className="text-slate-400 text-center mb-8 text-sm uppercase tracking-wider font-semibold">Credentials & Trust</p>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-3">
                <Shield className="w-8 h-8 text-emerald-400" />
              </div>
              <div className="font-bold text-white mb-1">CPA Certified</div>
              <div className="text-slate-400 text-sm">Licensed professionals</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-3">
                <AnimatedAward />
              </div>
              <div className="font-bold text-white mb-1">Big 4 Experience</div>
              <div className="text-slate-400 text-sm">Audit-tested expertise</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <div className="font-bold text-white mb-1">US GAAP Compliant</div>
              <div className="text-slate-400 text-sm">100% compliant methods</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-3">
                <Star className="w-8 h-8 text-emerald-400 fill-emerald-400" />
              </div>
              <div className="font-bold text-white mb-1">5-Star Rated</div>
              <div className="text-slate-400 text-sm">By finance leaders</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-emerald-400 font-semibold uppercase tracking-wider text-sm">The Problem</span>
          </div>
          <h2 className="text-4xl font-bold text-white text-center mb-4">The Challenges You Face</h2>
          <p className="text-slate-400 text-center mb-16 text-lg max-w-2xl mx-auto">
            Token compensation accounting shouldn't hold your business back
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-red-500/20 hover:border-red-500/40 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl"></div>
              <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <AnimatedShield />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Complexity</h3>
              <p className="text-slate-300 leading-relaxed">
                Token grant expense accounting is subject to complex accounting rules that are extremely difficult to implement naively.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl"></div>
              <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <AnimatedDocument />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Regulatory Uncertainty</h3>
              <p className="text-slate-300 leading-relaxed">
                Applicable standards remain ambiguous. Existing guidance often excludes crypto transactions without offering alternatives—creating significant barriers for finance leaders.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl"></div>
              <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <AnimatedTrend />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Missing Costs</h3>
              <p className="text-slate-300 leading-relaxed">
                Token grant costs are frequently omitted from P&L until distribution date, resulting in material token compensation liabilities missing from issuers' books.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-emerald-400 font-semibold uppercase tracking-wider text-sm">The Solution</span>
          </div>
          <h2 className="text-4xl font-bold text-white text-center mb-4">Comprehensive Solution</h2>
          <p className="text-slate-400 text-center mb-16 text-lg max-w-2xl mx-auto">
            Everything you need to stay compliant and confident
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 group relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-2xl"></div>
              <div className="flex justify-center mb-5 transform group-hover:scale-110 transition-transform duration-300">
                <AnimatedCheckCircle />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Customizable Standard Template</h3>
              <p className="text-slate-300 leading-relaxed">
                Battlefield-tested approach. The only solution designed to help companies calculate and recognize token grant liability in accordance with US GAAP.
              </p>
            </div>

            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 group relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-2xl"></div>
              <div className="flex justify-center mb-5 transform group-hover:scale-110 transition-transform duration-300">
                <AnimatedUsers />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Highly Experienced Team</h3>
              <p className="text-slate-300 leading-relaxed">
                We provide advice around best practices, backed by years of expertise in token compensation accounting.
              </p>
            </div>

            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 group relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-2xl"></div>
              <div className="flex justify-center mb-5 transform group-hover:scale-110 transition-transform duration-300">
                <AnimatedAward />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Vendor Selection</h3>
              <p className="text-slate-300 leading-relaxed">
                We assist with the selection of potential token grant management software platforms and their implementation.
              </p>
            </div>

            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 group relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-2xl"></div>
              <div className="flex justify-center mb-5 transform group-hover:scale-110 transition-transform duration-300">
                <AnimatedCalculator />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Embedded Derivative Accounting</h3>
              <p className="text-slate-300 leading-relaxed">
                Embedded derivative accounting calculations available in our template by default.
              </p>
            </div>

            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 group relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-2xl"></div>
              <div className="flex justify-center mb-5 transform group-hover:scale-110 transition-transform duration-300">
                <AnimatedChart />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Unvested Token Compensation</h3>
              <p className="text-slate-300 leading-relaxed">
                Template helps determine the amount of unvested token compensation expense in compliance with US GAAP.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-br from-emerald-900/20 to-cyan-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-emerald-400 font-semibold uppercase tracking-wider text-sm">The Benefits</span>
          </div>
          <h2 className="text-4xl font-bold text-white text-center mb-4">Why Choose Us</h2>
          <p className="text-slate-400 text-center mb-16 text-lg max-w-2xl mx-auto">
            Transform your token accounting from liability to competitive advantage
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900/70 p-10 rounded-2xl border border-emerald-500/30 backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-300 group">
              <div className="flex justify-center mb-6">
                <AnimatedLightbulb />
              </div>
              <div className="text-5xl font-bold text-emerald-400 mb-4">01</div>
              <h3 className="text-2xl font-bold text-white mb-4">Best Practices</h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                We help our clients avoid common pitfalls and implement industry best practices. Establish standards and build processes customized for your startup needs.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm">Proven methodologies</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm">Custom workflows</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/70 p-10 rounded-2xl border border-emerald-500/30 backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-300 group">
              <div className="flex justify-center mb-6">
                <AnimatedChart />
              </div>
              <div className="text-5xl font-bold text-emerald-400 mb-4">02</div>
              <h3 className="text-2xl font-bold text-white mb-4">Insightful Analytics</h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                Robust support proven to be helpful when dealing with auditors and providing explanation of fluctuations to financial planning and analytics teams.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm">Audit-ready reports</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm">Real-time dashboards</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/70 p-10 rounded-2xl border border-emerald-500/30 backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-300 group">
              <div className="flex justify-center mb-6">
                <AnimatedTarget />
              </div>
              <div className="text-5xl font-bold text-emerald-400 mb-4">03</div>
              <h3 className="text-2xl font-bold text-white mb-4">Informed Decisions</h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                Create financial statements that consider all costs required by US GAAP and relevant for your business decisions.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm">Complete visibility</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm">Strategic insights</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-900/70">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-emerald-400 font-semibold uppercase tracking-wider text-sm">Testimonials</span>
          </div>
          <h2 className="text-4xl font-bold text-white text-center mb-4">Trusted by Finance Leaders</h2>
          <p className="text-slate-400 text-center mb-16 text-lg max-w-2xl mx-auto">
            See what CFOs and Controllers say about our token compensation accounting solutions
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 leading-relaxed mb-6 italic">
                  "Working with this team saved us months of research and implementation. They identified $2M in unreported liabilities we didn't even know we had. Their template is now the backbone of our quarterly close process."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center text-white font-bold text-lg">
                    SM
                  </div>
                  <div>
                    <div className="font-bold text-white">Sarah Mitchell</div>
                    <div className="text-slate-400 text-sm">CFO, Leading DeFi Protocol</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 leading-relaxed mb-6 italic">
                  "Our audit went smoothly for the first time in years. The embedded derivative calculations and comprehensive documentation gave our auditors everything they needed. Worth every penny."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center text-white font-bold text-lg">
                    JC
                  </div>
                  <div>
                    <div className="font-bold text-white">James Chen</div>
                    <div className="text-slate-400 text-sm">Controller, Top 10 Exchange</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 leading-relaxed mb-6 italic">
                  "The expertise this team brings is unmatched. They helped us establish processes from scratch and guided us through vendor selection. Our token grant management is now completely audit-ready."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center text-white font-bold text-lg">
                    AP
                  </div>
                  <div>
                    <div className="font-bold text-white">Aisha Patel</div>
                    <div className="text-slate-400 text-sm">VP Finance, Web3 Gaming Platform</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-900/20 to-cyan-900/20 p-10 rounded-2xl border border-emerald-500/30 max-w-4xl mx-auto backdrop-blur-sm">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-emerald-400 mb-2">$500M+</div>
                <div className="text-slate-300">Average Liability Identified</div>
              </div>
              <div className="border-x border-slate-700">
                <div className="text-4xl font-bold text-emerald-400 mb-2">2 Weeks</div>
                <div className="text-slate-300">Average Implementation</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-emerald-400 mb-2">100%</div>
                <div className="text-slate-300">Audit Pass Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-emerald-400 font-semibold uppercase tracking-wider text-sm">Compare Your Options</span>
          </div>
          <h2 className="text-4xl font-bold text-white text-center mb-4">DIY vs Professional Implementation</h2>
          <p className="text-slate-400 text-center mb-16 text-lg max-w-2xl mx-auto">
            See why working with specialists saves time, money, and stress
          </p>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border border-slate-700 overflow-hidden max-w-5xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left p-6 text-slate-400 font-semibold">Feature</th>
                    <th className="p-6 text-center">
                      <div className="text-red-400 font-bold text-xl mb-1">DIY Approach</div>
                      <div className="text-slate-500 text-sm">Figure it out yourself</div>
                    </th>
                    <th className="p-6 text-center bg-emerald-900/20">
                      <div className="text-emerald-400 font-bold text-xl mb-1">With TokenAccrual</div>
                      <div className="text-slate-500 text-sm">Professional implementation</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-700/50">
                    <td className="p-6 text-white font-semibold">Implementation Time</td>
                    <td className="p-6 text-center text-slate-300">3-6 months</td>
                    <td className="p-6 text-center text-emerald-400 font-bold bg-emerald-900/10">2 weeks</td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="p-6 text-white font-semibold">Cost (Time + Resources)</td>
                    <td className="p-6 text-center text-slate-300">$50K-$150K in staff time</td>
                    <td className="p-6 text-center text-emerald-400 font-bold bg-emerald-900/10">Fraction of the cost</td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="p-6 text-white font-semibold">Audit-Ready Documentation</td>
                    <td className="p-6 text-center text-slate-300">Risk of gaps</td>
                    <td className="p-6 text-center text-emerald-400 font-bold bg-emerald-900/10">100% compliant</td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="p-6 text-white font-semibold">Embedded Derivative Calculations</td>
                    <td className="p-6 text-center text-slate-300">Manual, error-prone</td>
                    <td className="p-6 text-center text-emerald-400 font-bold bg-emerald-900/10">Automated in template</td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="p-6 text-white font-semibold">Expert Support</td>
                    <td className="p-6 text-center text-slate-300">Stack Overflow & hope</td>
                    <td className="p-6 text-center text-emerald-400 font-bold bg-emerald-900/10">10+ years experience</td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="p-6 text-white font-semibold">Risk of Errors</td>
                    <td className="p-6 text-center text-red-400">High</td>
                    <td className="p-6 text-center text-emerald-400 font-bold bg-emerald-900/10">Minimal</td>
                  </tr>
                  <tr>
                    <td className="p-6 text-white font-semibold">Ongoing Updates</td>
                    <td className="p-6 text-center text-slate-300">You track changes</td>
                    <td className="p-6 text-center text-emerald-400 font-bold bg-emerald-900/10">We stay current</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-amber-500/10 border border-amber-500/30 rounded-lg mb-6">
              <Clock className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 font-semibold">Limited Availability: Only 3 consultation slots left this month</span>
            </div>
            <div>
              <button
                onClick={() => scrollToSection('booking')}
                className="px-10 py-5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xl rounded-lg transition-all duration-200 shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 inline-flex items-center gap-2"
              >
                Claim Your Spot Now
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-emerald-400 font-semibold uppercase tracking-wider text-sm">Free Resources</span>
          </div>
          <h2 className="text-4xl font-bold text-white text-center mb-4">Start Today with Our Template</h2>
          <p className="text-slate-400 text-center mb-16 text-lg max-w-2xl mx-auto">
            Download our free template to begin calculating token compensation expenses in accordance with US GAAP
          </p>

          <div className="max-w-3xl mx-auto mb-16">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 group">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <FileSpreadsheet className="w-7 h-7 text-emerald-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white">Accrued Token Compensation Calculator</h3>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-slate-500 text-xs">Downloaded by 500+ finance professionals</span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    Complete spreadsheet template to calculate token compensation expenses in accordance with US GAAP. Includes formulas and examples.
                  </p>
                  <a
                    href="https://docs.google.com/spreadsheets/d/1PkCGflrMrU3DFxSf0pNFjH00z3mGzHYP6dGGF2yIehY/edit"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackResourceDownload('Token Compensation Calculator')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-semibold rounded-lg transition-all duration-200 border border-emerald-500/30 hover:border-emerald-500/50"
                  >
                    <Download className="w-4 h-4" />
                    Access Google Sheet
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 p-10 rounded-2xl border border-slate-700 max-w-4xl mx-auto backdrop-blur-sm">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Want It Done For You?</h3>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                If you'd rather not spend hours setting this up, our team can implement a compliant, audit-ready system tailored to your business in just 2 weeks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => scrollToSection('booking')}
                  className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg rounded-lg transition-all duration-200 shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 flex items-center gap-2"
                >
                  Schedule Free Consultation
                  <ArrowRight className="w-5 h-5" />
                </button>
                <a
                  href="mailto:info@techaccountingpro.com"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-slate-700/50 hover:bg-slate-700 text-white font-bold text-lg rounded-lg transition-all duration-200 border border-slate-600 hover:border-slate-500"
                >
                  <Mail className="w-5 h-5" />
                  Email Us
                </a>
              </div>
              <p className="text-slate-400 text-sm mt-6">
                Contact us at: <a href="mailto:info@techaccountingpro.com" className="text-emerald-400 hover:text-emerald-300 transition-colors">info@techaccountingpro.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-900/70">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-emerald-400 font-semibold uppercase tracking-wider text-sm">FAQ</span>
          </div>
          <h2 className="text-4xl font-bold text-white text-center mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-center mb-16 text-lg">
            Everything you need to know about our token compensation accounting services
          </p>

          <div className="space-y-4">
            <details className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 group">
              <summary className="font-bold text-white text-lg cursor-pointer flex items-center justify-between">
                What if I already have an accountant?
                <span className="text-emerald-400 text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-slate-300 mt-4 leading-relaxed">
                Great! We work alongside your existing accounting team, not replace them. We specialize specifically in token compensation accounting, which is a highly specialized niche that most traditional accountants don't have experience with. We'll provide the templates, processes, and expertise your current team needs to handle token grants properly.
              </p>
            </details>

            <details className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 group">
              <summary className="font-bold text-white text-lg cursor-pointer flex items-center justify-between">
                How much does this cost?
                <span className="text-emerald-400 text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-slate-300 mt-4 leading-relaxed">
                Pricing varies based on your company's size, complexity, and specific needs. During your free consultation, we'll assess your situation and provide transparent pricing. Most clients find our services cost significantly less than the penalties and complications of non-compliance or the time spent trying to figure this out internally.
              </p>
            </details>

            <details className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 group">
              <summary className="font-bold text-white text-lg cursor-pointer flex items-center justify-between">
                How long does implementation take?
                <span className="text-emerald-400 text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-slate-300 mt-4 leading-relaxed">
                Most implementations are completed within 2 weeks. This includes customizing our template to your specific grant structures, training your team, and ensuring everything is audit-ready. More complex situations with multiple token types or historical grants to catch up on may take 3-4 weeks.
              </p>
            </details>

            <details className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 group">
              <summary className="font-bold text-white text-lg cursor-pointer flex items-center justify-between">
                Do you work with my existing software?
                <span className="text-emerald-400 text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-slate-300 mt-4 leading-relaxed">
                Yes! Our templates are designed to work with any accounting software. We also assist with token grant management platform selection and implementation if you don't already have one. We have experience integrating with all major accounting systems including QuickBooks, NetSuite, Xero, and custom solutions.
              </p>
            </details>

            <details className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 group">
              <summary className="font-bold text-white text-lg cursor-pointer flex items-center justify-between">
                What happens during the free consultation?
                <span className="text-emerald-400 text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-slate-300 mt-4 leading-relaxed">
                During the 30-minute call, we'll discuss your current token grant structure, identify any compliance gaps, and outline exactly how we can help. You'll walk away with actionable insights even if you choose not to move forward. There's no pressure, no obligation, and no sales pitch—just honest expert advice.
              </p>
            </details>

            <details className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 group">
              <summary className="font-bold text-white text-lg cursor-pointer flex items-center justify-between">
                Is this compliant with US GAAP?
                <span className="text-emerald-400 text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-slate-300 mt-4 leading-relaxed">
                Absolutely. Our entire approach is built around US GAAP compliance. We stay current with all relevant accounting standards and regulatory guidance. Our templates and processes are designed to withstand audit scrutiny and have been successfully used by companies that have passed Big 4 audits.
              </p>
            </details>

            <details className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 group">
              <summary className="font-bold text-white text-lg cursor-pointer flex items-center justify-between">
                What if I'm not sure if I need this?
                <span className="text-emerald-400 text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-slate-300 mt-4 leading-relaxed">
                If you're issuing token grants to employees, advisors, or contractors, you likely need proper accounting for them. The cost of getting this wrong can be substantial—from audit failures to inaccurate financial statements that mislead investors and stakeholders. Our free consultation will help you understand your specific risk and obligations.
              </p>
            </details>

            <details className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 group">
              <summary className="font-bold text-white text-lg cursor-pointer flex items-center justify-between">
                Can you help with historical grants we haven't accounted for?
                <span className="text-emerald-400 text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-slate-300 mt-4 leading-relaxed">
                Yes! We frequently help companies catch up on historical token grants that were never properly accounted for. We'll work with you to reconstruct the grant history, calculate the appropriate expense recognition, and create audit-ready documentation. Better late than never—especially before your next audit.
              </p>
            </details>

            <details className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 group">
              <summary className="font-bold text-white text-lg cursor-pointer flex items-center justify-between">
                Do you provide ongoing support after implementation?
                <span className="text-emerald-400 text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-slate-300 mt-4 leading-relaxed">
                Yes. We offer ongoing support packages for companies that want continued guidance during quarterly closes, new grant issuances, or audit preparation. Many clients start with full implementation and then move to a lighter support arrangement once their team is trained and comfortable with the processes.
              </p>
            </details>
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-400 mb-6">Still have questions?</p>
            <button
              onClick={() => scrollToSection('booking')}
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg rounded-lg transition-all duration-200 shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 inline-flex items-center gap-2"
            >
              Schedule a Free Call
              <Calendar className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section id="booking" className="py-20 px-6 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-emerald-400 font-semibold uppercase tracking-wider text-sm">Book Your Consultation</span>
          </div>
          <h2 className="text-5xl font-bold text-white text-center mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-slate-300 text-center mb-12 max-w-3xl mx-auto leading-relaxed">
            Don't let token compensation accounting complexity hold you back.
            Schedule a free 30-minute consultation and discover how we can help.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
            <div className="bg-slate-900/50 p-6 rounded-xl border border-emerald-500/20 text-center">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-2">30 Minutes</div>
              <div className="text-slate-400 text-sm">Free consultation call</div>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-xl border border-emerald-500/20 text-center">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-2">Expert Team</div>
              <div className="text-slate-400 text-sm">10+ years experience</div>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-xl border border-emerald-500/20 text-center">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-2">2 Weeks</div>
              <div className="text-slate-400 text-sm">Average implementation</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl border border-emerald-500/30 max-w-5xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent"></div>
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-3">Pick a Time That Works for You</h3>
                <p className="text-slate-400">Click below to see available slots and book instantly</p>
              </div>

              <div className="rounded-2xl overflow-hidden" style={{width: '100%', height: '700px'}}>
                <Cal
                  namespace="30min"
                  calLink="andrew-belonogov/30min"
                  style={{width: '100%', height: '100%', overflow: 'scroll'}}
                  config={{layout: 'week_view', theme: 'dark'}}
                />
              </div>

              <div className="mt-8 text-center">
                <p className="text-slate-400 text-sm">
                  Prefer email? Contact us at: <a href="mailto:info@techaccountingpro.com" className="text-emerald-400 hover:text-emerald-300 transition-colors font-semibold">info@techaccountingpro.com</a>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-6 px-8 py-4 bg-emerald-500/10 rounded-full border border-emerald-500/30">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-slate-300">No credit card required</span>
              </div>
              <div className="w-px h-6 bg-slate-700"></div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-slate-300">Get started in days, not months</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-white mb-2">24hr</div>
              <div className="text-slate-400">Response Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">5-Star</div>
              <div className="text-slate-400">Client Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">10+</div>
              <div className="text-slate-400">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-slate-400">Happy Clients</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <AnimatedCalculator />
            <span className="text-xl font-bold text-white">TokenAccrual</span>
          </div>
          <p className="text-slate-400 mb-2">
            Professional token compensation accruals accounting services
          </p>
          <p className="text-slate-400 text-sm mb-4">
            Contact: <a href="mailto:info@techaccountingpro.com" className="text-emerald-400 hover:text-emerald-300 transition-colors">info@techaccountingpro.com</a>
          </p>
          <p className="text-slate-500 text-sm">
            © 2024 TokenAccrual. All rights reserved.
          </p>
        </div>
      </footer>

      <SignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ExitIntentPopup isOpen={showExitPopup} onClose={() => setShowExitPopup(false)} />
    </div>
  );
}

export default App;
