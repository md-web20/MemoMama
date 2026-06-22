import React, { useEffect } from 'react';
import { CheckCircle, ArrowRight, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Success({ t, setView }) {
  useEffect(() => {
    // কনফেটি বা রঙিন কাগজ ওড়ানোর ম্যাজিক
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  }, []);

  return (
    <div className="min-h-screen pt-40 pb-20 px-6 flex items-center justify-center bg-slate-50">
      <div className="max-w-2xl w-full bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl border-4 border-blue-50 text-center relative overflow-hidden">
        
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12"><Star size={100} /></div>

        <div className="relative z-10">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-10 animate-bounce">
            <CheckCircle size={56} strokeWidth={3} />
          </div>
          
          <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tighter">অভিনন্দন মামা!</h2>
          <p className="text-xl text-slate-500 font-medium leading-relaxed mb-12">
            আপনার পেমেন্ট সফল হয়েছে। আপনি এখন <span className="text-blue-600 font-black italic">MemoMama Pro</span> মেম্বার। আপনার ব্যবসার সব মেমো এখন হবে স্মার্ট ও ডিজিটাল।
          </p>

          <button 
            onClick={() => setView('app')}
            className="group bg-blue-600 text-white px-12 py-5 rounded-[2rem] font-black text-2xl shadow-[0_20px_50px_rgba(37,_99,_235,_0.3)] hover:bg-blue-700 transition-all flex items-center gap-4 mx-auto active:scale-95"
          >
            মেমো তৈরি শুরু করুন <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}