import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import SecuritySettings from './SecuritySettings';
import { Save, User, Store, Shield, Loader2, LogOut, CheckCircle, ImageIcon, PenTool, Globe, Phone, MapPin, Mail, Calendar, Link as LinkIcon } from 'lucide-react';

export default function Profile({ t, userProfile, setUserProfile, handleLogout }) {
  const [activeTab, setActiveTab] = useState('general'); // ডিফল্ট জেনারেল রাখা হয়েছে যাতে সামনেই থাকে
  const [temp, setTemp] = useState(userProfile);
  const [loading, setLoading] = useState(false);

  // ইমেজ কম্প্রেস লজিক (অপরিবর্তিত)
  const compressImage = (file, key) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 300;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * (MAX_WIDTH / img.width);
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        setTemp({ ...temp, [key]: canvas.toDataURL('image/jpeg', 0.7) });
      };
    };
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await setDoc(doc(db, "users", auth.currentUser.uid), temp, { merge: true });
      setUserProfile(temp);
      alert(t.saveSuccess || "Profile Updated Successfully!");
    } catch (e) { alert(e.message); }
    setLoading(false);
  };

  return (
    <div className="pt-32 pb-20 px-4 max-w-6xl mx-auto font-sans">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* বাম পাশের সাইডবার মেনু */}
        <div className="md:w-1/4 space-y-2">
          <button onClick={() => setActiveTab('general')} className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-bold transition ${activeTab === 'general' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-500 hover:bg-slate-100'}`}>
            <div className="flex items-center gap-3"><User size={20} /> {t.personalInfo || "Personal Info"}</div>
            {activeTab === 'general' && <CheckCircle size={14} />}
          </button>
          <button onClick={() => setActiveTab('shop')} className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-bold transition ${activeTab === 'shop' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-500 hover:bg-slate-100'}`}>
            <div className="flex items-center gap-3"><Store size={20} /> {t.shopSettings || "Shop Settings"}</div>
            {activeTab === 'shop' && <CheckCircle size={14} />}
          </button>
          <button onClick={() => setActiveTab('security')} className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-bold transition ${activeTab === 'security' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-500 hover:bg-slate-100'}`}>
            <div className="flex items-center gap-3"><Shield size={20} /> {t.security || "Security"}</div>
            {activeTab === 'security' && <CheckCircle size={14} />}
          </button>
          <div className="pt-10 border-t mt-10">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition">
              <LogOut size={20} /> {t.signOut || "Log Out"}
            </button>
          </div>
        </div>

        {/* ডান পাশের কন্টেন্ট এরিয়া */}
        <div className="md:w-3/4 bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-slate-100 min-h-[600px] text-left">
          
          {/* ১. ব্যক্তিগত তথ্য */}
          {activeTab === 'general' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
               <div className="flex justify-between items-center border-b pb-4">
                  <h3 className="text-3xl font-black">{t.personalInfo || "Personal Information"}</h3>
                  <div className="px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">Member Since: {auth.currentUser?.metadata.creationTime ? new Date(auth.currentUser.metadata.creationTime).getFullYear() : '2024'}</div>
               </div>

               {/* প্রোফাইল পিকচার সেকশন */}
               <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                  <label className="relative cursor-pointer group">
                    <div className="w-20 h-20 rounded-[1.5rem] overflow-hidden bg-white border-4 border-white shadow-lg flex items-center justify-center">
                      {temp.profilePic ? <img src={temp.profilePic} className="w-full h-full object-cover" /> : <User size={32} className="text-slate-300"/>}
                    </div>
                    <div className="absolute inset-0 bg-blue-600/60 opacity-0 group-hover:opacity-100 transition rounded-[1.5rem] flex items-center justify-center text-white"><ImageIcon size={16}/></div>
                    <input type="file" accept="image/*" onChange={e => compressImage(e.target.files[0], 'profilePic')} className="hidden" />
                  </label>
                  <div>
                    <h4 className="text-xl font-black text-slate-800">{temp.fullName || temp.ownerName || "Business Owner"}</h4>
                    <p className="text-sm text-slate-400 font-bold">{auth.currentUser?.email}</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* পূর্ণ নাম */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">{t.fullName || "Full Name"}</label>
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-4 text-slate-300" />
                      <input type="text" placeholder={t.ownerName} className="w-full p-4 pl-12 bg-slate-50/50 rounded-2xl border focus:border-blue-600 outline-none font-bold transition" value={temp.fullName || temp.ownerName || ''} onChange={e => setTemp({...temp, fullName: e.target.value})} />
                    </div>
                  </div>

                  {/* জন্ম তারিখ */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">{t.dob || "Date of Birth"}</label>
                    <div className="relative">
                      <Calendar size={16} className="absolute left-4 top-4 text-slate-300" />
                      <input type="date" className="w-full p-4 pl-12 bg-slate-50/50 rounded-2xl border focus:border-blue-600 outline-none font-bold transition" value={temp.dob || ''} onChange={e => setTemp({...temp, dob: e.target.value})} />
                    </div>
                  </div>

                  {/* লিঙ্গ */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">{t.gender || "Gender"}</label>
                    <select className="w-full p-4 bg-slate-50/50 rounded-2xl border focus:border-blue-600 outline-none font-bold transition" value={temp.gender || ''} onChange={e => setTemp({...temp, gender: e.target.value})}>
                      <option value="">Select</option>
                      <option value="male">{t.male || "Male"}</option>
                      <option value="female">{t.female || "Female"}</option>
                    </select>
                  </div>

                  {/* বিকল্প ইমেইল */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">{t.secondaryEmail || "Backup Email"}</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-4 text-slate-300" />
                      <input type="email" placeholder="backup@example.com" className="w-full p-4 pl-12 bg-slate-50/50 rounded-2xl border focus:border-blue-600 outline-none font-bold transition" value={temp.secondaryEmail || ''} onChange={e => setTemp({...temp, secondaryEmail: e.target.value})} />
                    </div>
                  </div>

                  {/* দেশ */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">{t.country || "Country"}</label>
                    <div className="relative">
                      <Globe size={16} className="absolute left-4 top-4 text-slate-300" />
                      <input type="text" placeholder="Bangladesh" className="w-full p-4 pl-12 bg-slate-50/50 rounded-2xl border focus:border-blue-600 outline-none font-bold transition" value={temp.country || ''} onChange={e => setTemp({...temp, country: e.target.value})} />
                    </div>
                  </div>

                  {/* শহর */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">{t.city || "City"}</label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-4 top-4 text-slate-300" />
                      <input type="text" placeholder="Dhaka" className="w-full p-4 pl-12 bg-slate-50/50 rounded-2xl border focus:border-blue-600 outline-none font-bold transition" value={temp.city || ''} onChange={e => setTemp({...temp, city: e.target.value})} />
                    </div>
                  </div>
               </div>

               {/* অনলাইন প্রেজেন্স */}
               <div className="space-y-4 pt-6 border-t">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Online Presence</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">{t.websiteLabel || "Website URL"}</label>
                      <input type="text" placeholder={t.website || "https://yourshop.com"} className="w-full p-4 bg-slate-50/50 rounded-2xl border outline-none focus:border-blue-600 font-bold transition" value={temp.website || ''} onChange={e => setTemp({...temp, website: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">{t.socialLabel || "Social Link"}</label>
                      <input type="text" placeholder={t.socialLink || "Facebook / Instagram"} className="w-full p-4 bg-slate-50/50 rounded-2xl border outline-none focus:border-blue-600 font-bold transition" value={temp.socialLink || ''} onChange={e => setTemp({...temp, socialLink: e.target.value})} />
                    </div>
                  </div>
               </div>

               <button onClick={handleSave} disabled={loading} className="w-full bg-blue-600 text-white py-5 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 shadow-xl shadow-blue-100 hover:bg-blue-700 transition active:scale-95 disabled:bg-slate-300">
                  {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />} {t.saveProfile || "Save Profile"}
               </button>
            </div>
          )}

          {/* ২. শপ সেটিংস */}
          {activeTab === 'shop' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h3 className="text-3xl font-black">{t.shopSettings || "Shop Settings"}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder={t.shopName} className="w-full p-4 bg-slate-50 rounded-2xl border focus:border-blue-600 font-bold" value={temp.shopName || ''} onChange={e => setTemp({...temp, shopName: e.target.value})} />
                <input type="text" placeholder="Phone" className="w-full p-4 bg-slate-50 rounded-2xl border focus:border-blue-600 font-bold" value={temp.phone || ''} onChange={e => setTemp({...temp, phone: e.target.value})} />
              </div>
              <input type="text" placeholder={t.shopAddress} className="w-full p-4 bg-slate-50 rounded-2xl border focus:border-blue-600 font-bold" value={temp.address || ''} onChange={e => setTemp({...temp, address: e.target.value})} />
              <textarea placeholder={t.defaultNote} className="w-full p-4 bg-slate-50 rounded-2xl border outline-none focus:border-blue-600 font-bold h-24" value={temp.defaultNote || ''} onChange={e => setTemp({...temp, defaultNote: e.target.value})}></textarea>
              
              <div className="grid grid-cols-2 gap-4">
                <label className="cursor-pointer p-6 border-2 border-dashed rounded-3xl text-center hover:bg-blue-50 transition">
                  {temp.logo ? <img src={temp.logo} className="h-12 mx-auto" alt="Logo" /> : <ImageIcon className="mx-auto mb-2 text-slate-300" />}
                  <p className="text-[10px] font-bold uppercase">{t.uploadLogo || "Upload Logo"}</p>
                  <input type="file" accept="image/*" onChange={e => compressImage(e.target.files[0], 'logo')} className="hidden" />
                </label>
                <label className="cursor-pointer p-6 border-2 border-dashed rounded-3xl text-center hover:bg-blue-50 transition">
                  {temp.sign ? <img src={temp.sign} className="h-12 mx-auto" alt="Sign" /> : <PenTool className="mx-auto mb-2 text-slate-300" />}
                  <p className="text-[10px] font-bold uppercase">{t.uploadSign || "Upload Sign"}</p>
                  <input type="file" accept="image/*" onChange={e => compressImage(e.target.files[0], 'sign')} className="hidden" />
                </label>
              </div>
              <button onClick={handleSave} disabled={loading} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black flex items-center gap-2 shadow-lg hover:bg-blue-700 transition disabled:bg-slate-300">
                {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />} {t.saveProfile || "Save Profile"}
              </button>
            </div>
          )}

          {/* ৩. নিরাপত্তা ট্যাব */}
          {activeTab === 'security' && (
            <SecuritySettings 
              t={t} 
              userProfile={userProfile} 
              setUserProfile={setUserProfile} 
            />
          )}
        </div>
      </div>
    </div>
  );
}