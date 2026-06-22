import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Truck, ShieldCheck, Globe, Save, Loader2, Info, CheckCircle2 } from 'lucide-react';

export default function CourierSettings({ user, t = {} }) { // t={} দিয়ে ফিক্স করা হয়েছে যাতে ক্র্যাশ না করে
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // ১. ডিফল্ট স্টেট (অপরিবর্তিত)
  const defaultSettings = {
    testMode: true,
    local: {
      steadfast: { apiKey: '', secretKey: '', status: false, label: 'Steadfast' },
      pathao: { apiKey: '', secretKey: '', status: false, label: 'Pathao' },
      redx: { apiToken: '', status: false, label: 'RedX' },
      paperfly: { apiKey: '', status: false, label: 'Paperfly' },
      ecourier: { apiKey: '', secretKey: '', status: false, label: 'eCourier' }
    },
    global: {
      dhl: { apiKey: '', status: false, label: 'DHL Express' },
      fedex: { apiKey: '', secretKey: '', status: false, label: 'FedEx' },
      aramex: { apiKey: '', status: false, label: 'Aramex' },
      ups: { apiKey: '', status: false, label: 'UPS' }
    }
  };

  const [settings, setSettings] = useState(defaultSettings);

  // ২. ফায়ারবেস থেকে ডাটা আনা
  useEffect(() => {
    const fetchSettings = async () => {
      const currentUid = user?.uid || auth.currentUser?.uid;
      if (!currentUid) return;

      try {
        const docRef = doc(db, "users", currentUid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists() && docSnap.data().courierSettings) {
          const savedData = docSnap.data().courierSettings;
          setSettings({
            ...defaultSettings,
            ...savedData,
            local: { ...defaultSettings.local, ...(savedData.local || {}) },
            global: { ...defaultSettings.global, ...(savedData.global || {}) }
          });
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, [user]);

  // ৩. সেভ ফাংশন
  const handleSave = async () => {
    const currentUid = user?.uid || auth.currentUser?.uid;
    if (!currentUid) return;

    setIsSaving(true);
    try {
      const userRef = doc(db, "users", currentUid);
      await updateDoc(userRef, { courierSettings: settings });
      alert((t.save_config || "Saved") + "!");
    } catch (err) {
      alert("Save Failed: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-20 gap-4">
      <Loader2 className="animate-spin text-blue-600" size={40} />
      <p className="font-black text-slate-400 uppercase text-[10px] tracking-widest">{t.loading || "Loading..."}</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 animate-in fade-in duration-500 font-sans text-slate-900">
      
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic flex items-center gap-3">
            <Truck className="text-blue-600" size={40} /> {t.shipping_hub || "Shipping Hub"}
          </h2>
          <p className="text-slate-500 font-medium mt-1">{t.ship_sub || "Configure your local and international delivery channels"}</p>
        </div>
        
        {/* টেস্ট মোড সুইচ */}
        <div className={`p-4 rounded-2xl border-2 flex items-center gap-4 transition-all ${settings.testMode ? 'bg-amber-50 border-amber-200' : 'bg-green-50 border-green-200'}`}>
           <Info size={20} className={settings.testMode ? 'text-amber-500' : 'text-green-500'} />
           <span className="text-[10px] font-black uppercase text-slate-600">
             {settings.testMode ? (t.mode_testing || "Mode: Testing") : (t.live_mode || "Mode: Live")}
           </span>
           <button onClick={() => setSettings({...settings, testMode: !settings.testMode})} className={`px-4 py-1.5 rounded-lg font-black text-[9px] uppercase text-white shadow-sm transition-all ${settings.testMode ? 'bg-amber-500' : 'bg-green-600'}`}>
             {t.mode_switch || "Switch"}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* লোকাল কুরিয়ার সেকশন */}
        <div className="space-y-6">
           <p className="font-black text-slate-400 uppercase tracking-widest text-[10px] ml-2">{t.local_couriers || "Local Couriers"}</p>
           
           <CourierCard 
             id="steadfast" icon={<ShieldCheck className="text-red-500"/>} title="Steadfast" 
             settings={settings} setSettings={setSettings} type="local" t={t}
             fields={[{key: 'apiKey', label: t.api_key || "API Key"}, {key: 'secretKey', label: t.secret_key || "Secret Key"}]}
           />

           <CourierCard 
             id="pathao" icon={<CheckCircle2 className="text-orange-500"/>} title="Pathao" 
             settings={settings} setSettings={setSettings} type="local" t={t}
             fields={[{key: 'apiKey', label: t.access_token || "Access Token"}, {key: 'secretKey', label: t.store_id || "Store ID"}]}
           />

           <CourierCard 
             id="redx" icon={<Truck className="text-red-600"/>} title="RedX" 
             settings={settings} setSettings={setSettings} type="local" t={t}
             fields={[{key: 'apiToken', label: t.access_token || "API Token"}]}
           />

           <CourierCard 
             id="paperfly" icon={<Truck className="text-blue-800"/>} title="Paperfly" 
             settings={settings} setSettings={setSettings} type="local" t={t}
             fields={[{key: 'apiKey', label: t.api_key || "API Key"}]}
           />
        </div>

        {/* ইন্টারন্যাশনাল সেকশন */}
        <div className="space-y-6">
           <p className="font-black text-slate-400 uppercase tracking-widest text-[10px] ml-2">{t.intl_shipping || "International Shipping"}</p>

           <CourierCard 
             id="dhl" icon={<Globe className="text-yellow-600"/>} title="DHL Express" 
             settings={settings} setSettings={setSettings} type="global" t={t}
             fields={[{key: 'apiKey', label: t.api_key || "Account Number"}]}
           />

           <CourierCard 
             id="fedex" icon={<Globe className="text-purple-600"/>} title="FedEx" 
             settings={settings} setSettings={setSettings} type="global" t={t}
             fields={[{key: 'apiKey', label: t.api_key || "API Key"}, {key: 'secretKey', label: t.secret_key || "Secret Key"}]}
           />

           <CourierCard 
             id="aramex" icon={<Globe className="text-red-500"/>} title="Aramex" 
             settings={settings} setSettings={setSettings} type="global" t={t}
             fields={[{key: 'apiKey', label: t.user_name || "User Name"}, {key: 'secretKey', label: t.secret_key || "Password"}]}
           />
        </div>

      </div>

      <div className="sticky bottom-8 mt-12">
        <button 
          onClick={handleSave} disabled={isSaving}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-[2.5rem] font-black shadow-2xl shadow-blue-200 transition-all flex items-center justify-center gap-4 uppercase tracking-[0.2em] active:scale-95 disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="animate-spin" size={24}/> : <Save size={24}/>}
          {isSaving ? (t.processing || "Syncing...") : (t.save_config || "Save Configuration")}
        </button>
      </div>
    </div>
  );
}

function CourierCard({ id, icon, title, settings, setSettings, type, fields, t }) {
  const group = settings[type] || {};
  const config = group[id] || { status: false };
  const isActive = config.status;

  const handleChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [id]: { ...prev[type][id], [key]: value }
      }
    }));
  };

  const toggleStatus = () => {
    setSettings(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [id]: { ...prev[type][id], status: !isActive }
      }
    }));
  };

  return (
    <div className={`bg-white p-6 rounded-[2.5rem] border transition-all ${isActive ? 'border-blue-200 shadow-md ring-4 ring-blue-50/50' : 'border-slate-100 opacity-60'}`}>
       <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-slate-50 rounded-xl">{icon}</div>
             <h4 className="font-black text-slate-800 uppercase text-[11px] tracking-tight">{title}</h4>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={isActive} onChange={toggleStatus} />
            <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
          </label>
       </div>
       
       {isActive && (
         <div className="grid grid-cols-1 gap-3 animate-in slide-in-from-top-2 duration-300">
            {fields.map(f => (
              <input 
                key={f.key} type="password" placeholder={f.label} 
                className="w-full p-3 bg-slate-50 rounded-xl outline-none font-bold text-[10px] border-2 border-transparent focus:border-blue-100"
                value={config[f.key] || ''}
                onChange={(e) => handleChange(f.key, e.target.value)}
              />
            ))}
         </div>
       )}
    </div>
  );
}