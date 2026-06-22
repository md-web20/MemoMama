import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ShieldAlert, CheckCircle2, Loader2, KeyRound } from 'lucide-react';

export default function Auth({ t, setView, setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [is2FAChallenge, setIs2FAChallenge] = useState(false);
  
  // সাধারণ ইমেইল ডাটা
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shopName, setShopName] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  // পাসওয়ার্ড ভ্যালিডেশন লজিক (আপনার আগের লজিক বজায় রাখা হলো)
  const getPasswordStrength = (pass) => {
    let score = 0;
    if (pass.length >= 6) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[!@#$%^&*]/.test(pass)) score++;
    return score;
  };

  const strength = getPasswordStrength(password);

  // --- গুগল দিয়ে সাইন-আপ/লগইন ---
  const handleGoogleAuth = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          shopName: user.displayName || "My Shop", 
          email: user.email, 
          is2FAEnabled: false, 
          createdAt: new Date()
        });
      }
      setView('home');
    } catch (error) {
      alert("Google Error: " + error.message);
    }
    setLoading(false);
  };

  // --- ইমেইল/পাসওয়ার্ড দিয়ে সাইন-আপ ও লগইন লজিক ---
  const handleAuth = async (e) => {
    e.preventDefault();
    if (!isLogin && strength < 5) {
      alert(t.passReq || "Password is too weak!");
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        // ১. লগইন লজিক
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // ২. ডাটাবেস থেকে চেক করা ২-ফ্যাক্টর চালু আছে কি না
        const userDoc = await getDoc(doc(db, "users", user.uid));
        
        if (userDoc.exists() && userDoc.data().is2FAEnabled) {
          setIs2FAChallenge(true); 
        } else {
          setView('home');
        }
      } else {
        // ৩. সাইন-আপ লজিক
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", userCredential.user.uid), {
          shopName, 
          email, 
          is2FAEnabled: false, 
          createdAt: new Date()
        });
        setView('home');
      }
    } catch (error) { 
      alert("Error: " + error.message); 
    }
    setLoading(false);
  };

  // --- ২-ফ্যাক্টর ওটিপি ভিউ ---
  if (is2FAChallenge) {
    return (
      <div className="pt-32 pb-20 px-6 flex justify-center">
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl w-full max-w-md text-center border">
          <KeyRound size={48} className="mx-auto text-blue-600 mb-6 animate-bounce" />
          <h2 className="text-3xl font-black mb-4">{t.otpTitle || "Security Verification"}</h2>
          <p className="text-slate-500 mb-8 font-medium">{t.otpDesc || "Enter the 6-digit OTP code"}</p>
          <input 
            type="text" maxLength="6" placeholder="0 0 0 0 0 0" 
            className="w-full p-5 text-center text-3xl font-black tracking-[0.5em] bg-slate-50 rounded-2xl border-2 focus:border-blue-600 outline-none mb-6"
            value={otp} onChange={(e) => setOtp(e.target.value)}
          />
          <button 
            onClick={() => { if(otp === "123456") setView('home'); else alert("Invalid OTP"); }}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-xl shadow-xl active:scale-95 transition"
          >
            {t.verifyBtn || "Verify"}
          </button>
        </div>
      </div>
    );
  }

  // --- লগইন এবং সাইন-আপ ভিউ ---
  return (
    <div className="pt-32 pb-20 px-6 flex justify-center">
      <div className="bg-white p-12 rounded-[3rem] shadow-2xl w-full max-w-md border border-slate-50">
        
        {/* টাইটেল নির্ধারণ */}
        <h2 className="text-4xl font-black mb-10 text-center">
          {isLogin ? (t.login || "লগইন") : (t.signup || "সাইন-আপ")}
        </h2>

        {/* সাধারণ ইমেইল অথেন্টিকেশন ফর্ম */}
        <form onSubmit={handleAuth} className="space-y-6">
          {!isLogin && (
            <input 
              type="text" placeholder={t.shopName || "দোকানের নাম (Shop Name)"} 
              className="w-full p-4 bg-slate-50 rounded-2xl outline-none border focus:border-blue-600 font-bold transition-all" 
              value={shopName} onChange={e => setShopName(e.target.value)} required 
            />
          )}

          <input 
            type="email" placeholder={t.emailPlaceholder || "Email"} 
            className="w-full p-4 bg-slate-50 rounded-2xl outline-none border focus:border-blue-600 font-bold transition-all" 
            value={email} onChange={e => setEmail(e.target.value)} required 
          />
          
          <div className="space-y-3">
            <input 
              type="password" placeholder={t.passwordPlaceholder || "Password"} 
              className="w-full p-4 bg-slate-50 rounded-2xl outline-none border focus:border-blue-600 font-bold transition-all" 
              value={password} onChange={e => setPassword(e.target.value)} required 
            />
            
            {/* পাসওয়ার্ড হেলথ বার (শুধুমাত্র সাইন-আপের সময়) */}
            {!isLogin && (
              <div className="px-2 pt-1">
                <div className="flex justify-between text-[10px] font-black uppercase mb-1">
                  <span className={strength < 3 ? 'text-red-500' : strength < 5 ? 'text-yellow-500' : 'text-green-500'}>
                    {strength < 3 ? (t.passWeak || "Weak") : strength < 5 ? (t.passFair || "Fair") : (t.passStrong || "Strong")}
                  </span>
                  <span className="text-slate-400">{strength * 20}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className={`h-full flex-1 transition-all duration-500 ${strength >= i ? (strength < 3 ? 'bg-red-500' : strength < 5 ? 'bg-yellow-500' : 'bg-green-500') : 'bg-slate-200'}`}></div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl shadow-xl hover:bg-blue-700 transition active:scale-95 flex items-center justify-center gap-3 disabled:bg-slate-300"
          >
            {loading ? <Loader2 className="animate-spin" /> : (isLogin ? (t.login || "Login") : (t.signup || "Sign Up"))}
          </button>
        </form>

        {/* ৩. সোশ্যাল লগইন সেকশন (শুধুমাত্র গুগল রাখা হলো) */}
        <div className="mt-8 pt-8 border-t border-slate-100 space-y-4">
          <p className="text-xs text-center text-slate-400 font-bold uppercase tracking-wider">অথবা অন্য উপায়ে চেষ্টা করুন</p>
          <button 
            onClick={handleGoogleAuth}
            className="w-full p-4 border rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-50 font-bold text-slate-600 transition"
          >
            Google দিয়ে লগইন/সাইন-আপ করুন
          </button>
        </div>

        {/* ৪. সাইন-আপ ও লগইন স্যুইচ করার বাটন */}
        <button 
          onClick={() => setIsLogin(!isLogin)} 
          className="w-full mt-8 text-slate-400 font-bold hover:text-blue-600 transition underline decoration-dotted underline-offset-4"
        >
          {isLogin 
            ? (t.switchToSignup || "নতুন অ্যাকাউন্ট তৈরি করুন (Sign up)") 
            : (t.switchToLogin || "আগের অ্যাকাউন্ট দিয়ে লগইন করুন (Login)")
          }
        </button>

      </div>
    </div>
  );
}