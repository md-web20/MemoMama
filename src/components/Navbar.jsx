import React, { useState } from 'react';
import { Globe2, ChevronDown, Check, History, User, CreditCard, LogOut, Home as HomeIcon, Menu, X, Package, BarChart3, Rocket, ReceiptText, Settings, Plus, Coins } from 'lucide-react';
import { translations } from '../translations';

export default function Navbar({ view, lang, setLang, setView, t, user, protectedView, handleLogout, currency, setCurrency, setShowHistory }) {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobile = () => setIsMobileMenuOpen(false);

  // কারেন্সি লিস্ট (আপনার দেওয়া ইউনিক লিস্ট)
  const currencyOptions = [
    { code: 'BDT', symbol: '৳', name: 'Taka' },
    { code: 'USD', symbol: '$', name: 'Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'Pound' },
    { code: 'INR', symbol: '₹', name: 'Rupee' },
    { code: 'SAR', symbol: 'SR', name: 'Riyal' },
    { code: 'AED', symbol: 'د.إ', name: 'Dirham' },
    { code: 'CNY', symbol: '¥', name: 'Yuan' },
    { code: 'JPY', symbol: '¥', name: 'Yen' },
    { code: 'MYR', symbol: 'RM', name: 'Ringgit' },
    { code: 'TRY', symbol: '₺', name: 'Lira' },
    { code: 'RUB', symbol: '₽', name: 'Ruble' },
    { code: 'KRW', symbol: '₩', name: 'Won' },
    { code: 'IDR', symbol: 'Rp', name: 'Rupiah' },
    { code: 'BRL', symbol: 'R$', name: 'Real' },
    { code: 'PKR', symbol: 'Rs', name: 'Rupee' },
    { code: 'PHP', symbol: '₱', name: 'Peso' },
    { code: 'VND', symbol: '₫', name: 'Dong' },
    { code: 'SEK', symbol: 'kr', name: 'Krona' },
    { code: 'PLN', symbol: 'zł', name: 'Zloty' },
  ];

  const menuItems = [
    { id: 'home', label: t.nav_home, icon: <HomeIcon size={20}/>, action: () => setView('home') },
    { id: 'products', label: t.nav_products, icon: <Package size={20}/>, action: () => protectedView('products') },
    { id: 'revenue', label: t.nav_revenue, icon: <BarChart3 size={20}/>, action: () => protectedView('revenue') },
    { id: 'expenses', label: t.nav_expenses, icon: <ReceiptText size={20}/>, action: () => protectedView('expenses') },
    { id: 'history', label: t.nav_history, icon: <History size={20}/>, action: () => protectedView('history') },
    { id: 'pricing', label: t.nav_pricing, icon: <CreditCard size={20}/>, action: () => setView('pricing') },
    { id: 'settings', label: t.nav_settings, icon: <Settings size={20}/>, action: () => protectedView('settings') },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-[100] bg-white/90 backdrop-blur-xl border-b border-slate-100 px-4 md:px-8 py-3 font-sans">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          
          {/* ১. লোগো এবং নাম */}
          <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => {setView('home'); closeMobile();}}>
            <img src="/brand-logo.png" className="h-8 md:h-10 w-auto" alt="Logo" />
            <h1 className="text-lg md:text-2xl font-black text-slate-900 tracking-tighter uppercase italic">
              MemoMama<span className="text-blue-600">.</span>
            </h1>
          </div>

          {/* ২. ডেস্কটপ মেনু (ল্যাপটপে দেখাবে) */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/50">
            {menuItems.map(item => (
              <button key={item.id} onClick={item.action} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${view === item.id ? 'bg-white text-blue-600 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'}`}>
                {item.icon} <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* ৩. ডান দিকের সেটিংস গ্রুপ */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* ভাষা ও কারেন্সি ড্রপডাউন বাটন */}
            <div className="relative">
              <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 px-3 py-2 rounded-xl transition border border-slate-200/50">
                <span className="text-base">{translations[lang].flag}</span>
                <span className="text-xs font-black text-blue-600">{currency}</span>
                <ChevronDown size={14} className={`text-slate-400 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangOpen && (
                <>
                <div className="fixed inset-0 z-10" onClick={() => setIsLangOpen(false)}></div>
                <div className="absolute right-0 mt-3 w-[320px] md:w-[420px] bg-white border border-slate-100 rounded-[2rem] shadow-2xl z-[200] overflow-hidden animate-in zoom-in-95 duration-200">
                  <div className="flex divide-x divide-slate-100">
                    
                    {/* বাম পাশ: ভাষা নির্বাচন */}
                    <div className="w-1/2 p-2">
                       <p className="text-[9px] font-black text-slate-400 uppercase p-3 tracking-widest border-b border-slate-50 mb-2">{t.lang_title || "Language"}</p>
                       <div className="max-h-[350px] overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                          {Object.keys(translations).map(code => (
                            <button key={code} onClick={() => { setLang(code); }} className={`flex items-center justify-between w-full p-2.5 rounded-xl text-[10px] font-bold transition-all ${lang === code ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-50 text-slate-600'}`}>
                              <span className="flex items-center gap-2"><span>{translations[code].flag}</span> {translations[code].name}</span>
                              {lang === code && <Check size={12} />}
                            </button>
                          ))}
                       </div>
                    </div>

                    {/* ডান পাশ: কারেন্সি নির্বাচন */}
                    <div className="w-1/2 p-2 bg-slate-50/30">
                       <p className="text-[9px] font-black text-slate-400 uppercase p-3 tracking-widest border-b border-slate-100 mb-2">{t.currency_title || "Currency"}</p>
                       <div className="max-h-[350px] overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                          {currencyOptions.map(opt => (
                            <button 
                              key={opt.code} 
                              onClick={() => { setCurrency(opt.symbol); setIsLangOpen(false); }} 
                              className={`flex items-center justify-between w-full p-2.5 rounded-xl text-[10px] font-bold transition-all ${
                                currency === opt.symbol 
                                ? 'bg-blue-600 text-white shadow-lg' 
                                : 'hover:bg-white text-slate-600 border border-transparent'
                              }`}
                            >
                              <div className="flex items-center gap-2 text-left">
                                <Coins size={12} className={currency === opt.symbol ? 'text-white' : 'text-blue-500'}/> 
                                <span>{opt.code} ({opt.symbol})</span>
                              </div>
                              {currency === opt.symbol && <Check size={12} />}
                            </button>
                          ))}
                       </div>
                    </div>

                  </div>
                  <div className="bg-slate-900 p-3 text-center">
                      <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">{t.regional_footer || "Settings Saved Automatically"}</p>
                  </div>
                </div>
                </>
              )}
            </div>

            {/* ডেস্কটপ ইউজার অপশন */}
            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <button onClick={() => setView('profile')} className="text-sm font-bold text-slate-600 hover:text-blue-600 px-3 transition-colors">{t.nav_profile}</button>
              ) : (
                <button onClick={() => setView('auth')} className="text-sm font-bold text-slate-600 hover:text-blue-600 px-3 transition-colors">{t.login}</button>
              )}
              <button onClick={() => protectedView('app')} className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-black text-sm shadow-lg hover:bg-blue-700 transition active:scale-95">
                {t.nav_cta}
              </button>
            </div>

            {/* মোবাইল হ্যামবার্গার মেনু বাটন */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-slate-600 bg-slate-100 rounded-xl active:bg-slate-200 transition-all">
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- মোবাইল ফুল-স্ক্রিন মেনু --- */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-[150] animate-in slide-in-from-right duration-300 flex flex-col pt-[72px]">
          <div className="flex-1 overflow-y-auto px-6 py-8 space-y-3">
            {menuItems.map(item => (
              <button key={item.id} onClick={() => { item.action(); closeMobile(); }} className={`w-full flex items-center justify-between p-5 rounded-2xl font-black text-sm border transition-all ${view === item.id ? 'bg-blue-600 text-white border-blue-600 shadow-xl' : 'bg-slate-50 text-slate-600 border-slate-50'}`}>
                <div className="flex items-center gap-4">
                    <span className={view === item.id ? 'text-white' : 'text-blue-600'}>{item.icon}</span>
                    <span>{item.label}</span>
                </div>
                {view === item.id && <Check size={18}/>}
              </button>
            ))}
            
            <div className="pt-4 border-t border-slate-100 space-y-3">
               <button onClick={() => { setView(user ? 'profile' : 'auth'); closeMobile(); }} className="w-full flex items-center gap-4 p-5 rounded-2xl font-black text-sm bg-slate-50 text-slate-600 border border-slate-50">
                  <User size={20} className="text-blue-600"/> {user ? t.nav_profile : t.login}
               </button>
            </div>

            <div className="pt-4">
              <button onClick={() => { protectedView('app'); closeMobile(); }} className="w-full bg-blue-600 text-white py-5 rounded-[2rem] font-black text-lg shadow-2xl shadow-blue-200 flex items-center justify-center gap-3 active:scale-95 transition-all">
                <Rocket size={24} /> {t.nav_cta}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}