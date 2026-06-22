import React, { useState } from 'react';
import { Check, Zap, Globe, Smartphone, X, ShieldCheck, Star, MessageCircle } from 'lucide-react';
import { auth } from '../firebase'; // ফায়ারবেস অথেন্টিকেশন ইমপোর্ট করা হলো

export default function Pricing({ t, setView, userProfile }) {
  const [selectedPlan, setSelectedPlan] = useState(null);

  // আপনার ফোন নম্বরটি এখানে সেট করা আছে
  const myWhatsAppNumber = "8801305064060"; 

  const checkoutLinks = {
    '1m': { 
        intl: 'https://memomama.lemonsqueezy.com/checkout/buy/09bdd57e-a39e-475b-9425-d09c6ac4485d', 
        bdt: 250 
    },
    '3m': { 
        intl: 'https://memomama.lemonsqueezy.com/checkout/buy/d28877b7-742c-4355-a255-07818a48583a', 
        bdt: 600 
    },
    '12m': { 
        intl: 'https://memomama.lemonsqueezy.com/checkout/buy/f5d08dac-6690-40bf-8b2d-44db095aa023', 
        bdt: 1800 
    }
  };

  const plans = [
    { id: 'free', name: t.plan_free, price: "0", desc: t.limit_text },
    { id: '1m', name: t.plan_1m, price: "2", bdt: "250", desc: "30 Days" },
    { id: '3m', name: t.plan_3m, price: "5", bdt: "600", desc: "90 Days", popular: true },
    { id: '12m', name: t.plan_12m, price: "15", bdt: "1800", desc: "365 Days", save: "9" }
  ];

  const handleLocalPayment = (plan) => {
    const message = encodeURIComponent(`সালাম মামা! আমি মেমো মামার "${plan.name}" প্ল্যানটি কিনতে চাই। দাম: ৳${plan.bdt}। আমাকে বিকাশ/নগদ পেমেন্ট ডিটেইলস দিন।`);
    const waLink = `https://api.whatsapp.com/send?phone=${myWhatsAppNumber}&text=${message}`;
    window.location.href = waLink;
  };

  // --- নতুন লজিক: ইন্টারন্যাশনাল পেমেন্ট লিঙ্কে ইউজার আইডি যোগ করা ---
  const handleIntlPayment = (planId) => {
    const userId = auth.currentUser?.uid; // ইউজারের ইউনিক আইডি সংগ্রহ
    const baseUrl = checkoutLinks[planId].intl;
    
    if (userId) {
      // লিঙ্কের শেষে ইউজার আইডি জুড়ে দেওয়া হলো যাতে অটোমেশন কাজ করে
      const finalUrl = `${baseUrl}?checkout[custom][user_id]=${userId}`;
      window.location.href = finalUrl;
    } else {
      setView('auth'); // লগইন না থাকলে লগইন পেজে পাঠাবে
    }
  };

  return (
    <div className="pt-32 pb-32 px-4 max-w-7xl mx-auto font-sans relative animate-in fade-in duration-500">
      {/* টাইটেল সেকশন */}
      <div className="text-center mb-16 md:mb-20 space-y-4">
        <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter leading-tight">{t.pricingMainTitle}</h2>
        <p className="text-lg md:text-xl text-slate-500 font-medium italic px-4">{t.pricingSubTitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {plans.map((plan) => (
          <div key={plan.id} className={`relative p-8 md:p-10 rounded-[3.5rem] border-2 bg-white flex flex-col transition-all duration-500 hover:shadow-2xl ${plan.popular ? 'border-blue-600 scale-100 lg:scale-105 z-10 shadow-xl' : 'border-slate-100'}`}>
            
            {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase flex items-center gap-2 shadow-lg">
                    <Star size={12} fill="currentColor"/> {t.mostPopular}
                </div>
            )}
            {plan.save && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase shadow-lg animate-pulse">
                    {t.saveText} ${plan.save} (৳১০০০+)
                </div>
            )}
            
            <h3 className="text-2xl font-black mb-6">{plan.name}</h3>
            <div className="text-5xl font-black mb-1">${plan.price}</div>
            <p className="text-[10px] font-bold text-slate-400 mb-8 uppercase tracking-widest leading-none">{plan.desc}</p>
            
            <div className="space-y-4 mb-12 flex-grow text-sm font-bold text-slate-600">
               <p className="flex items-center gap-2 text-blue-600"><Check size={16} strokeWidth={3}/> {t.unlimited}</p>
               <p className="flex items-center gap-2 text-green-600"><Check size={16} strokeWidth={3}/> {plan.id === 'free' ? "Includes Ads" : t.noAds}</p>
               <p className="flex items-center gap-2"><Check size={16} /> {t.customBranding}</p>
               <p className="flex items-center gap-2"><Check size={16} /> Cloud Support</p>
            </div>

            <button onClick={() => plan.id === 'free' ? setView('app') : setSelectedPlan(plan)} className={`w-full py-5 rounded-2xl font-black text-lg transition shadow-lg active:scale-95 ${plan.id === 'free' ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
              {plan.id === 'free' ? t.startNow : t.buyNow}
            </button>
          </div>
        ))}
      </div>

      {/* পেমেন্ট সিলেকশন মডাল */}
      {selectedPlan && (
        <div className="fixed inset-0 z-[500] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4">
           <div className="bg-white w-full max-w-xl rounded-[3rem] p-8 md:p-12 shadow-2xl relative border border-white animate-in zoom-in duration-300">
              <button onClick={() => setSelectedPlan(null)} className="absolute top-6 right-6 text-slate-300 hover:text-red-500 transition"><X size={28}/></button>
              <h3 className="text-3xl font-black mb-2 tracking-tighter">{t.selectPayment}</h3>
              <p className="text-blue-600 font-bold mb-8">{selectedPlan.name} - ${selectedPlan.price} (৳{selectedPlan.bdt})</p>

              <div className="space-y-4">
                 {/* ১. আন্তর্জাতিক অপশন - এখন এটি ইউজার আইডি পাঠাবে */}
                 <button onClick={() => handleIntlPayment(selectedPlan.id)} className="w-full p-6 rounded-3xl border-2 border-slate-100 hover:border-blue-600 text-left flex items-center gap-5 group transition">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition"><Globe size={24}/></div>
                    <div><h4 className="text-lg font-black">{t.intlMethod}</h4><p className="text-[10px] text-slate-400 font-bold">{t.intlDesc}</p></div>
                 </button>

                 {/* ২. লোকাল অপশন (WhatsApp) */}
                 <button 
                  onClick={() => handleLocalPayment(selectedPlan)}
                  className="w-full p-6 rounded-3xl border-2 border-slate-100 hover:border-green-600 text-left flex items-center gap-5 group transition"
                 >
                    <div className="p-3 bg-green-50 text-green-600 rounded-2xl group-hover:bg-green-600 group-hover:text-white transition"><MessageCircle size={24}/></div>
                    <div><h4 className="text-lg font-black">Bkash / Nagad / Rocket</h4><p className="text-[10px] text-slate-400 font-bold">সরাসরি কথা বলে দ্রুত এক্টিভেট করুন</p></div>
                 </button>
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 text-slate-300 text-[10px] font-black uppercase tracking-widest">
                 <ShieldCheck size={14} className="text-green-500" /> {t.paymentSecurity}
              </div>
           </div>
        </div>
      )}
    </div>
  );
}