import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Globe2, CheckCircle2, BarChart3 } from 'lucide-react';
import SEOContent from './SEOContent';
import FAQSection from './FAQSection';

export default function HomeView({ t, lang, setView, protectedView }) {
  return (
    <div className="bg-white font-sans overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-full h-full max-w-7xl">
           <div className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] bg-blue-50 rounded-full blur-[100px] opacity-60"></div>
           <div className="absolute bottom-[10%] left-[-5%] w-[300px] h-[300px] bg-indigo-50 rounded-full blur-[100px] opacity-40"></div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide border border-blue-100">
              <CheckCircle2 size={14} /> {t.hero_badge}
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[1.1] tracking-tighter">
              {t.hero_title} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 italic">
                {t.hero_title_color}
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
              {t.hero_desc} 
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-4">
              <button 
                onClick={() => protectedView('app')} 
                className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-[0_20px_50px_rgba(37,_99,_235,_0.3)] active:scale-95 flex items-center justify-center gap-3 mx-auto lg:mx-0"
              >
                {t.startBtn} <ArrowRight size={24} />
              </button>
              
              <div className="flex items-center gap-4 text-slate-400 font-bold px-4 justify-center">
                 <span className="flex items-center gap-1.5 text-sm">
                   <CheckCircle2 size={16} className="text-green-500" /> {t.tag_free}
                 </span>
                 <span className="flex items-center gap-1.5 text-sm">
                   <CheckCircle2 size={16} className="text-green-500" /> {t.tag_no_login}
                 </span>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 relative group">
            <div className="relative bg-white border border-slate-100 p-8 rounded-[40px] shadow-2xl space-y-6 animate-float">
               <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                  <div className="h-4 w-32 bg-slate-100 rounded-lg"></div>
                  <div className="h-8 w-8 bg-blue-600 rounded-lg"></div>
               </div>
               <div className="space-y-3">
                  <div className="h-3 w-full bg-slate-50 rounded"></div>
                  <div className="h-3 w-2/3 bg-slate-50 rounded"></div>
               </div>
               <div className="bg-blue-600 p-6 rounded-3xl text-white flex justify-between items-center shadow-lg">
                  <div>
                     <p className="text-[10px] font-bold opacity-70 uppercase">Total Amount</p>
                     <p className="text-3xl font-black tracking-tighter">৳ ৪২,৫০০.০০</p>
                  </div>
                  <Zap size={24} fill="currentColor" />
               </div>

               <div className="absolute -bottom-6 -left-10 bg-white p-5 rounded-3xl shadow-2xl border border-slate-50 flex items-center gap-4 animate-float-delayed hidden md:flex">
                  <div className="bg-green-100 p-3 rounded-2xl text-green-600 shadow-inner">
                    <BarChart3 size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider leading-none mb-1">Total Invoices</p>
                    <p className="text-2xl font-black text-slate-900 tracking-tighter">১০,০০০+</p>
                  </div>
               </div>
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-[40px] blur-2xl opacity-10 -z-10 group-hover:opacity-20 transition duration-1000"></div>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">{t.feat_title}</h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">{t.feat_desc}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: t.feat_1, desc: t.feat_1_desc, icon: <ShieldCheck size={32} />, color: "text-blue-600", bg: "bg-blue-50" },
              { title: t.feat_2, desc: t.feat_2_desc, icon: <Zap size={32} />, color: "text-yellow-500", bg: "bg-yellow-50" },
              { title: t.feat_3, desc: t.feat_3_desc, icon: <Globe2 size={32} />, color: "text-indigo-600", bg: "bg-indigo-50" }
            ].map((f, i) => (
              <div key={i} className="group p-10 rounded-[3rem] bg-white border border-slate-100 hover:shadow-xl transition-all duration-300">
                <div className={`mb-6 w-16 h-16 rounded-2xl flex items-center justify-center ${f.bg} ${f.color} group-hover:scale-110 transition duration-300`}>
                   {f.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 text-slate-900">{f.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA SECTION (সংশোধিত এবং হেডলাইনযুক্ত) --- */}
      <section className="pb-24 px-6">
         <div className="max-w-7xl mx-auto bg-slate-900 rounded-[50px] p-12 md:p-24 text-center space-y-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent"></div>
            
            {/* আপনার চাওয়া হেডলাইনটি এখানে যোগ করা হলো */}
            <h2 className="text-4xl md:text-7xl font-black text-white leading-tight relative z-10 animate-in fade-in duration-700">
               {t.cta_headline || "আপনার ব্যবসাকে পরবর্তী ধাপে নিতে প্রস্তুত?"}
            </h2>
            
            <button 
              onClick={() => protectedView('app')} 
              className="bg-white text-slate-900 px-12 py-6 rounded-3xl font-black text-2xl hover:bg-blue-600 hover:text-white transition shadow-2xl relative z-10 active:scale-95"
            >
               {t.startBtn}
            </button>
         </div>
      </section>
         <SEOContent lang={lang} t={t} />

      {/* --- MASTER FOOTER (সঠিক স্ট্রাকচার) --- */}
      <footer className="bg-slate-900 text-white pt-20 pb-10 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-black italic text-yellow-400">MemoMama.</h2>
            <p className="text-slate-400 font-medium leading-relaxed">{t.footer_desc}</p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <div className="space-y-4">
              <h4 className="font-black uppercase tracking-widest text-xs text-blue-500">Quick Links</h4>
              <div className="flex flex-col gap-3 text-slate-300 font-bold">
                 <button onClick={() => setView('about')} className="text-left hover:text-white transition">{t.about}</button>
                 <button onClick={() => setView('contact')} className="text-left hover:text-white transition">{t.contact}</button>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-black uppercase tracking-widest text-xs text-blue-500">Legal</h4>
              <div className="flex flex-col gap-3 text-slate-300 font-bold">
                 <button onClick={() => setView('privacy')} className="text-left hover:text-white transition">{t.privacy}</button>
                 <button onClick={() => setView('terms')} className="text-left hover:text-white transition">{t.terms}</button>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 text-center text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]">
           {t.footer_text}
        </div>
      </footer>
      <FAQSection lang={lang} t={t} />
      {/* --- ANIMATIONS (CSS) --- */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(15px) translateX(10px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
      `}</style>
    </div>
  );
}