import React, { useState } from 'react';
import { Lock, Smartphone, MessageCircle, ShieldCheck, Monitor, ChevronRight, X, Mail, Check, Loader2 } from 'lucide-react';
import { auth, db } from '../firebase';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { doc, updateDoc } from 'firebase/firestore';

export default function SecuritySettings({ t, userProfile, setUserProfile }) {
  const [showPassModal, setShowPassModal] = useState(false);
  const [activeSetup, setActiveSetup] = useState(null); // 'sms', 'whatsapp', 'email'
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [passData, setPassData] = useState({ current: '', new: '', confirm: '' });

  // পাসওয়ার্ডের শক্তি চেক করার লজিক (আপনার আগের লজিক)
  const getPassStrength = (p) => {
    let s = 0;
    if (p.length >= 6) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[a-z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[!@#$%^&*]/.test(p)) s++;
    return s;
  };
  const strength = getPassStrength(passData.new);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passData.new !== passData.confirm) return alert("New passwords do not match!");
    if (strength < 5) return alert(t.passReq || "Password too weak!");
    
    setLoading(true);
    try {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(user.email, passData.current);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, passData.new);
      alert("Password updated successfully!");
      setShowPassModal(false);
      setPassData({ current: '', new: '', confirm: '' });
    } catch (error) {
      alert("Error: " + error.message);
    }
    setLoading(false);
  };

  const handle2FASetup = async () => {
    if (!inputVal) return;
    setLoading(true);
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        is2FAEnabled: true,
        mfaMethod: activeSetup,
        mfaContact: inputVal
      });
      setUserProfile({ ...userProfile, is2FAEnabled: true, mfaMethod: activeSetup, mfaContact: inputVal });
      alert("2FA Enabled Successfully!");
      setActiveSetup(null);
      setInputVal('');
    } catch (e) { alert(e.message); }
    setLoading(false);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <h3 className="text-3xl font-black text-slate-900">{t.securityTitle}</h3>

      {/* ১. পাসওয়ার্ড পরিবর্তন কার্ড (Fixed Translation) */}
      <div 
        onClick={() => setShowPassModal(true)}
        className="p-6 bg-white border-2 border-slate-100 rounded-3xl flex justify-between items-center group cursor-pointer hover:border-blue-300 transition-all shadow-sm"
      >
        <div className="flex items-center gap-4">
          <div className="p-4 bg-blue-50 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Lock size={24}/>
          </div>
          <div>
            <h4 className="font-bold text-lg">{t.changePass}</h4>
            <p className="text-xs text-slate-400 font-medium">{t.passSubText}</p>
          </div>
        </div>
        <ChevronRight className="text-slate-300 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
      </div>

      {/* ২. ২-ফ্যাক্টর ভেরিফিকেশন সেকশন (Fixed Translation) */}
      <div className="bg-slate-50 p-10 rounded-[3rem] border-2 border-slate-100">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h4 className="text-2xl font-black flex items-center gap-2">
              <ShieldCheck className="text-blue-600" /> {t.twoFactor}
            </h4>
            <p className="text-sm text-slate-400 font-bold mt-1 uppercase tracking-widest">{t.twoFactorDesc}</p>
          </div>
          {userProfile?.is2FAEnabled && (
            <span className="bg-green-100 text-green-600 px-4 py-1.5 rounded-full text-xs font-black uppercase border border-green-200">
              {t.statusActive}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { id: 'sms', name: t.methodSms, icon: <Smartphone />, color: "blue" },
            { id: 'whatsapp', name: t.methodWhatsapp, icon: <MessageCircle />, color: "green" },
            { id: 'email', name: t.secondaryEmail || "Email", icon: <Mail />, color: "indigo" }
          ].map(method => (
            <button 
              key={method.id}
              onClick={() => setActiveSetup(method.id)}
              className={`p-8 bg-white rounded-[2.5rem] border-2 transition-all flex flex-col items-center gap-4 hover:shadow-xl ${activeSetup === method.id ? 'border-blue-600 scale-105' : 'border-slate-50'}`}
            >
              <div className={`p-4 bg-${method.color}-50 text-${method.color}-600 rounded-2xl`}>{method.icon}</div>
              <span className="font-black text-sm">{method.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ৩. একটিভ ডিভাইস (Fixed Translation) */}
      <div className="p-6 bg-white border border-slate-100 rounded-3xl flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-slate-100 rounded-xl text-slate-500"><Monitor size={20}/></div>
          <div>
            <p className="font-bold text-sm">{t.browser}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase">{t.lastLogin}: Today 2:30 PM</p>
          </div>
        </div>
        <span className="px-4 py-1.5 bg-green-50 text-green-600 text-[10px] font-black rounded-full uppercase border border-green-100">
          {t.currentDevice}
        </span>
      </div>

      {/* পাসওয়ার্ড পপ-আপ (Health Bar সহ) */}
      {showPassModal && (
        <div className="fixed inset-0 z-[500] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl relative border border-white">
            <button onClick={() => setShowPassModal(false)} className="absolute top-8 right-8 text-slate-300 hover:text-red-500 transition"><X /></button>
            <h3 className="text-3xl font-black mb-8">{t.changePass}</h3>
            <form onSubmit={handlePasswordChange} className="space-y-5">
              <input required type="password" placeholder={t.currentPass} className="w-full p-4 bg-slate-50 rounded-2xl border outline-none focus:border-blue-600 font-bold" onChange={e => setPassData({...passData, current: e.target.value})} />
              
              <div className="space-y-2">
                <input required type="password" placeholder={t.newPass} className="w-full p-4 bg-slate-50 rounded-2xl border outline-none focus:border-blue-600 font-bold" onChange={e => setPassData({...passData, new: e.target.value})} />
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex gap-0.5">
                   {[1,2,3,4,5].map(i => (
                     <div key={i} className={`h-full flex-1 transition-all ${strength >= i ? (strength < 3 ? 'bg-red-500' : strength < 5 ? 'bg-yellow-500' : 'bg-green-500') : 'bg-slate-200'}`}></div>
                   ))}
                </div>
              </div>

              <input required type="password" placeholder={t.confirmPass} className="w-full p-4 bg-slate-50 rounded-2xl border outline-none focus:border-blue-600 font-bold" onChange={e => setPassData({...passData, confirm: e.target.value})} />
              
              <button type="submit" disabled={loading || strength < 5} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-blue-700 transition disabled:bg-slate-300">
                {loading ? "Updating..." : t.updatePassBtn}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2FA সেটআপ মডাল (Fixed Translation) */}
      {activeSetup && (
        <div className="fixed inset-0 z-[500] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-6 text-center">
          <div className="bg-white w-full max-w-md rounded-[3rem] p-12 shadow-2xl relative border border-white">
             <button onClick={() => setActiveSetup(null)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-600"><X /></button>
             <h3 className="text-3xl font-black mb-8 capitalize">{activeSetup} {t.setupTitle}</h3>
             <div className="space-y-6">
                <input 
                  type={activeSetup === 'email' ? 'email' : 'tel'} 
                  placeholder={activeSetup === 'email' ? 'Enter Email' : '+880 1XXX XXX XXX'}
                  className="w-full p-5 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-blue-600 font-bold text-xl text-center"
                  value={inputVal} onChange={(e) => setInputVal(e.target.value)}
                />
                <button onClick={handle2FASetup} disabled={loading} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl shadow-xl flex items-center justify-center gap-3 disabled:bg-slate-300">
                  {loading ? <Loader2 className="animate-spin" /> : <Check />} {loading ? t.activating : t.enable2FABtn}
                </button>
                <button type="button" onClick={() => setActiveSetup(null)} className="w-full text-slate-400 font-bold py-1">
                  {t.cancel}
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}