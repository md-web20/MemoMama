import React, { useState, useEffect, useRef } from 'react';
import { Plus, Printer, ArrowLeft, Trash2, ShieldCheck, Truck, Loader2, Target, ChevronDown, CheckCircle2, Globe, Save, X } from 'lucide-react';
import { BannerAd, PopupAd } from './AdManager'; 
import { auth, db } from '../firebase'; 
import { collection, query, where, onSnapshot, doc, updateDoc, increment, addDoc, getDoc } from "firebase/firestore";

export default function InvoiceApp({ t, currency, setView, userProfile, memoHistory, setMemoHistory, editMemoData }) {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '' });
  const [newItem, setNewItem] = useState({ name: '', qty: 1, price: 0, vat: 0, disc: 0, inventoryId: null });
  const [note, setNote] = useState(''); 
  const [memoCount, setMemoCount] = useState(0); 
  const [showPopupAd, setShowPopupAd] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  
  const [courierSettings, setCourierSettings] = useState(null);
  const [showCourierMenu, setShowCourierMenu] = useState(false);
  const courierRef = useRef(null);

  const [inventoryProducts, setInventoryProducts] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [customerHistory, setCustomerHistory] = useState(null);

  useEffect(() => {
    if (editMemoData) {
      setItems(editMemoData.items || []);
      setCustomer({ 
        name: editMemoData.customerName || '', 
        phone: editMemoData.customerPhone || '', 
        address: editMemoData.customerAddress || '' 
      });
      setNote(editMemoData.note || userProfile?.defaultNote || '');
    } else {
      setItems([]);
      setCustomer({ name: '', phone: '', address: '' });
      if (userProfile?.defaultNote) setNote(userProfile.defaultNote);
    }
  }, [editMemoData, userProfile]);

  useEffect(() => {
    const currentUserId = auth.currentUser?.uid;
    if (!currentUserId) return;

    const q = query(collection(db, "products"), where("userId", "==", currentUserId));
    const unsubscribeInv = onSnapshot(q, (snapshot) => {
      setInventoryProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const fetchCourierSettings = async () => {
        const userRef = doc(db, "users", currentUserId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists() && userSnap.data().courierSettings) {
            setCourierSettings(userSnap.data().courierSettings);
        }
    };
    fetchCourierSettings();

    return () => unsubscribeInv();
  }, [userProfile]);

  useEffect(() => {
    const currentUserId = auth.currentUser?.uid;
    if (customer.phone.length === 11 && currentUserId && !editMemoData) {
      const q = query(collection(db, "sales"), where("userId", "==", currentUserId), where("customerPhone", "==", customer.phone));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const salesData = snapshot.docs.map(doc => doc.data());
          const totalSpent = salesData.reduce((acc, s) => acc + (Number(s.totalAmount) || 0), 0);
          setCustomerHistory({ count: salesData.length, spent: totalSpent });
        } else setCustomerHistory(null);
      });
      return () => unsubscribe();
    } else setCustomerHistory(null);
  }, [customer.phone, editMemoData]);

  useEffect(() => {
    if (!userProfile?.isPro) {
      const today = new Date().toLocaleDateString();
      const lastDate = localStorage.getItem('memo_date');
      if (lastDate !== today) {
        localStorage.setItem('memo_date', today);
        localStorage.setItem('memos_today', '0');
        setMemoCount(0);
      } else {
        setMemoCount(parseInt(localStorage.getItem('memos_today') || '0'));
      }
    }
  }, [userProfile]);

  const addItem = (e) => {
    e.preventDefault();
    if (!newItem.name || newItem.price < 0) return;
    const q = Number(newItem.qty) || 1;
    const p = Number(newItem.price) || 0;
    const v = Number(newItem.vat) || 0;
    const d = Number(newItem.disc) || 0;
    const rowTotal = (q * p) + ((q * p * v) / 100) - ((q * p * d) / 100);

    setItems([...items, { ...newItem, qty: q, price: p, id: Date.now(), rowTotal: Number(rowTotal.toFixed(2)) }]);
    setNewItem({ name: '', qty: 1, price: 0, vat: 0, disc: 0, inventoryId: null });
    setShowForm(false);
  };

  const grandTotal = items.reduce((acc, item) => acc + item.rowTotal, 0);

  const handleCourierBooking = async (courierId, courierName) => {
    if (!customer.phone || !customer.address) return alert("Phone and Address required!");
    setShowCourierMenu(false);
    setIsBooking(true);
    try {
      const isTest = courierSettings?.testMode;
      await new Promise(res => setTimeout(res, 2000));
      alert(`Success! Order sent to ${courierName}.`);
    } catch (err) { alert(err.message); } finally { setIsBooking(false); }
  };

  const handlePrint = async () => {
    if (items.length === 0) return alert(t.noItems || "Add items first!");
    if (editMemoData) { window.print(); return; }
    if (isSaving) return;
    setIsSaving(true);
    try {
      let totalCost = 0;
      let totalSalesExcludingVat = 0;
      for (const item of items) {
        const invProd = inventoryProducts.find(p => p.id === item.inventoryId);
        if (invProd) totalCost += (Number(invProd.buyPrice || 0) * item.qty);
        totalSalesExcludingVat += (item.price * item.qty) - ((item.price * item.qty * item.disc) / 100);
        if (item.inventoryId) {
          await updateDoc(doc(db, "products", item.inventoryId), { stock: increment(-Math.abs(item.qty)) });
        }
      }
      const currentUid = auth.currentUser.uid;
      await addDoc(collection(db, "sales"), {
        userId: currentUid,
        customerName: customer.name,
        customerPhone: customer.phone,
        customerAddress: customer.address,
        totalAmount: Number(grandTotal),
        profit: Number(totalSalesExcludingVat - totalCost),
        date: new Date().toISOString(),
        items: items,
        note: note
      });
      if (!userProfile?.isPro) {
        const newCount = memoCount + 1;
        localStorage.setItem('memos_today', newCount.toString());
        setMemoCount(newCount);
      }
      const newMemo = { id: Date.now(), date: new Date().toLocaleDateString(), total: grandTotal, currency, customerName: customer.name, customerPhone: customer.phone, customerAddress: customer.address, items: items, note: note };
      setMemoHistory([newMemo, ...memoHistory]);
      localStorage.setItem(`history_${currentUid}`, JSON.stringify([newMemo, ...memoHistory]));
      window.print();
    } catch (err) { alert("Error processing memo!"); } finally { setIsSaving(false); }
  };

  const getActiveCouriers = () => {
      if (!courierSettings) return [];
      const active = [];
      if(courierSettings.local) {
          Object.keys(courierSettings.local).forEach(key => {
              if (courierSettings.local[key].status) active.push({ id: key, name: courierSettings.local[key].label, type: 'Local' });
          });
      }
      if(courierSettings.global) {
          Object.keys(courierSettings.global).forEach(key => {
              if (courierSettings.global[key].status) active.push({ id: key, name: courierSettings.global[key].label, type: 'Global' });
          });
      }
      return active;
  };

  return (
    <main className="pt-24 pb-20 px-2 md:px-4 max-w-5xl mx-auto font-sans text-slate-900">
      <BannerAd userProfile={userProfile} />

      {/* ১. কন্ট্রোল প্যানেল (ফিক্সড বাটন লেবেল) */}
      <div className="no-print flex flex-col md:flex-row justify-between items-center mb-6 bg-white p-4 rounded-3xl shadow-sm border border-slate-100 gap-4">
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <button onClick={() => setView('home')} className="p-3 bg-slate-50 text-blue-600 rounded-2xl transition"><ArrowLeft size={20} /></button>
          {!userProfile?.isPro && (
            <div className="bg-amber-50 text-amber-600 px-4 py-1.5 rounded-full border border-amber-100 text-[10px] font-black uppercase tracking-tighter">Daily: {memoCount}/5</div>
          )}
        </div>

        <div className="grid grid-cols-3 md:flex gap-2 w-full md:w-auto">
          <button 
            onClick={() => setShowCourierMenu(true)} 
            disabled={isBooking} 
            className="bg-blue-50 text-blue-600 p-3 md:px-6 md:py-3 rounded-2xl font-black text-[10px] md:text-sm flex flex-col md:flex-row items-center justify-center gap-1 shadow-sm hover:bg-blue-100 transition"
          >
            {isBooking ? <Loader2 size={16} className="animate-spin"/> : <Truck size={18}/>}
            <span className="truncate">{t.send_courier?.split(' ')[0] || "Courier"}</span>
          </button>
          
          {!editMemoData ? (
            <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white p-3 md:px-6 md:py-3 rounded-2xl font-black text-[10px] md:text-sm flex flex-col md:flex-row items-center justify-center gap-1 shadow-lg shadow-blue-100">
              <Plus size={18}/> <span className="truncate">{t.app_add?.split(' ')[0] || "Add"}</span>
            </button>
          ) : <div className="hidden md:block"></div>}

          <button onClick={handlePrint} disabled={isSaving} className={`${isSaving ? 'bg-slate-400' : 'bg-slate-900'} text-white p-3 md:px-6 md:py-3 rounded-2xl font-black text-[10px] md:text-sm flex flex-col md:flex-row items-center justify-center gap-1 shadow-lg`}>
            {editMemoData ? <Save size={18}/> : <Printer size={18}/>}
            <span className="truncate">{editMemoData ? "Update" : (t.app_print?.split(' ')[0] || "Print")}</span>
          </button>
        </div>
      </div>

      {/* কুরিয়ার পপআপ */}
      {showCourierMenu && (
          <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300 no-print">
              <div className="bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl p-6 animate-in zoom-in-95 duration-200 border border-white">
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="font-black text-slate-800 uppercase text-xs tracking-widest flex items-center gap-2"><Truck size={16} className="text-blue-600" /> Select Courier</h3>
                      <button onClick={() => setShowCourierMenu(false)} className="p-2 bg-slate-100 rounded-xl hover:text-red-500 transition"><X size={18}/></button>
                  </div>
                  <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                      {getActiveCouriers().length > 0 ? getActiveCouriers().map(c => (
                          <button key={c.id} onClick={() => handleCourierBooking(c.id, c.name)} className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-blue-600 hover:text-white rounded-2xl transition-all group">
                              <div className="flex items-center gap-3">{c.type === 'Global' ? <Globe size={18} className="text-blue-500 group-hover:text-white" /> : <CheckCircle2 size={18} className="text-green-500 group-hover:text-white" />}<span className="text-sm font-black">{c.name}</span></div>
                              <span className="text-[8px] font-black uppercase opacity-40 group-hover:opacity-100">{c.type}</span>
                          </button>
                      )) : <div className="py-12 text-center opacity-30"><p className="text-[10px] font-bold uppercase tracking-widest">No active couriers</p></div>}
                  </div>
              </div>
          </div>
      )}

      {/* মেমো ডিজাইন (সংশোধিত হেডার) */}
      <div className="w-full flex justify-center pb-20 overflow-x-hidden md:overflow-visible">
        <div id="memo-to-print" className="print-area bg-white border border-slate-100 shadow-2xl origin-top" 
             style={{ width: '210mm', height: '297mm', padding: '12mm', transform: 'scale(var(--memo-scale, 1))' }}>
          
          <div className="bg-slate-900 text-white p-7 rounded-2xl flex justify-between items-center mb-6">
            <div className="flex items-center gap-6">
              {userProfile.logo && <img src={userProfile.logo} className="w-16 h-16 rounded-xl bg-white p-1 object-contain" alt="Logo" />}
              <div className="space-y-0.5 text-left">
                <h2 className="text-3xl font-black italic text-yellow-400 leading-none">{userProfile.shopName || "Shop Name"}</h2>
                <p className="text-sm font-bold text-slate-200 mt-1">{userProfile.ownerName}</p>
                <p className="text-[10px] text-slate-400 uppercase">{userProfile.phone}</p>
                <p className="text-[10px] text-slate-400 leading-tight">{userProfile.address}</p>
              </div>
            </div>
            <div className="text-right">
              <h3 className="text-3xl font-black opacity-10 uppercase leading-none">{t.app_invoice}</h3>
              <p className="text-[9px] font-black text-blue-300 mt-2 flex items-center justify-end gap-1"><ShieldCheck size={10} /> Smart Invoicing</p>
              <p className="text-[9px] font-bold text-slate-500 uppercase mt-1">{editMemoData ? new Date(editMemoData.date).toLocaleDateString() : new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* ক্রেতার তথ্য */}
          <div className="px-5 py-4 bg-slate-50 rounded-xl border border-slate-100 mb-6 font-bold text-[11px] md:text-sm relative">
            {customerHistory && (
              <div className="no-print absolute -top-3 right-5 bg-blue-600 text-white text-[9px] px-3 py-1 rounded-full animate-bounce flex items-center gap-2 shadow-xl">
                <Target size={12}/> {t.crm_returning}: {customerHistory.count} {t.crm_orders} | {t.currency}{customerHistory.spent}
              </div>
            )}
            <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-slate-800 text-left">
               <div className="flex gap-2 items-center">
                  <span className="text-slate-400 uppercase text-[10px]">{t.buyerLabel}:</span>
                  <input disabled={!!editMemoData} value={customer.name} onChange={(e)=>setCustomer({...customer,name:e.target.value})} className="bg-transparent border-b border-dashed border-slate-200 outline-none flex-1 font-bold" />
               </div>
               <div className="flex gap-2 text-right justify-end items-center">
                  <span className="text-slate-400 uppercase text-[10px]">{t.buyerPhonePlaceholder}:</span>
                  <input disabled={!!editMemoData} value={customer.phone} onChange={(e)=>setCustomer({...customer,phone:e.target.value})} className="bg-transparent border-b border-dashed border-slate-200 outline-none w-32 text-right font-bold" />
               </div>
               <div className="col-span-2 flex gap-2 items-center">
                  <span className="text-slate-400 uppercase text-[10px]">{t.buyerAddress}:</span>
                  <input disabled={!!editMemoData} value={customer.address} onChange={(e)=>setCustomer({...customer,address:e.target.value})} placeholder={t.shippingAddress} className="bg-transparent border-b border-dashed border-slate-200 outline-none flex-1 font-bold" />
               </div>
            </div>
          </div>

          <div className="mb-5 min-h-[420px] border-x border-b border-slate-100 rounded-b-xl overflow-hidden">
            <div className="grid grid-cols-8 p-3 bg-slate-100 font-black text-[9px] uppercase text-slate-500 text-center tracking-widest border-b">
              <span className="col-span-3 text-left pl-2">{t.itemDesc}</span>
              <span>{t.itemQty}</span><span>{t.itemPrice}</span><span>{t.vat?.split(' ')[0] || "VAT"}</span><span>{t.discount?.split(' ')[0] || "Disc"}</span><span className="text-right pr-2">{t.totalLabel?.split(' ')[0] || "Total"}</span>
            </div>
            {items.map(item => (
              <div key={item.id} className="grid grid-cols-8 px-4 py-3 text-xs font-bold items-center text-center border-b border-slate-50 text-slate-700">
                <span className="col-span-3 text-left font-black text-slate-800 flex items-center gap-2 uppercase truncate">{item.name}{!editMemoData && <button onClick={()=>setItems(items.filter(i=>i.id!==item.id))} className="no-print text-red-200 hover:text-red-500"><Trash2 size={12}/></button>}</span>
                <span className="text-slate-400">{item.qty}</span><span className="text-slate-400">{currency}{item.price}</span><span className="text-blue-500/70">{item.vat}%</span><span className="text-red-400/70">{item.disc}%</span><span className="text-right pr-2 font-black text-slate-900">{currency}{item.rowTotal}</span>
              </div>
            ))}
          </div>

          {/* বিশেষ দ্রষ্টব্য */}
          <div className="px-2 mb-6 text-left">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex gap-3 items-start uppercase text-[9px] font-black text-slate-400">
                  <span>{t.noteLabel}</span>
                  <textarea value={note} onChange={(e)=>setNote(e.target.value)} className="no-print w-full bg-transparent text-[11px] outline-none h-10 resize-none text-slate-800 font-bold" />
                  <p className="hidden print:block text-[11px] font-medium text-slate-600 italic leading-snug">{note}</p>
              </div>
          </div>

          <div className="flex justify-between items-end px-4">
            <div className="w-56 text-center border-t border-slate-100 pt-2 text-slate-400">
              {userProfile.sign ? <img src={userProfile.sign} className="h-14 mx-auto mb-1 object-contain" alt="Signature" /> : <div className="h-14 mb-1"></div>}
              <p className="text-[9px] font-black uppercase tracking-widest">{t.signatureLabel}</p>
            </div>
            <div className="text-right bg-blue-50 p-6 rounded-[2.5rem] border-2 border-blue-100 shadow-xl min-w-[220px]">
              <p className="text-[9px] font-black text-slate-400 uppercase mb-1 tracking-widest">{t.totalLabel}</p>
              <div className="text-5xl font-black tracking-tighter text-blue-600">{currency}{grandTotal.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* --- ৩. আইটেম অ্যাড মডাল (১০০% ফিক্সড লেবেলসহ) --- */}
      {showForm && !editMemoData && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-4 z-[500] no-print text-slate-900">
           <div className="bg-white p-10 rounded-[3rem] w-full max-w-xl animate-in zoom-in-200 shadow-2xl border border-white">
              <h2 className="font-black text-2xl text-slate-900 text-center uppercase mb-8 tracking-tighter italic">
                  {t.app_add || "Add Item"}
              </h2>
              
              <form onSubmit={addItem} className="space-y-5 text-slate-800 font-sans text-left">
                <div className="relative"> 
                  <label className="text-[10px] font-black text-slate-400 ml-2 uppercase tracking-widest">{t.itemDesc}</label>
                  <input required type="text" placeholder="..." className="w-full p-4 mt-1 bg-slate-50 rounded-2xl outline-none font-bold border focus:border-blue-600 transition-all" value={newItem.name} 
                    onChange={(e) => {
                      const val = e.target.value;
                      setNewItem({...newItem, name: val});
                      if (val.trim().length > 0) {
                        const filtered = inventoryProducts.filter(p => p.name.toLowerCase().includes(val.toLowerCase()));
                        setFilteredSuggestions(filtered);
                        setShowDropdown(true);
                      } else setShowDropdown(false);
                    }} 
                    onFocus={() => newItem.name.length > 0 && setShowDropdown(true)}
                  />
                  {showDropdown && filteredSuggestions.length > 0 && (
                    <div className="absolute left-0 right-0 z-[600] mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl max-h-48 overflow-y-auto p-2">
                      {filteredSuggestions.map((p) => (
                        <div key={p.id} className="flex justify-between items-center p-4 hover:bg-blue-50 rounded-xl cursor-pointer transition text-left"
                          onClick={() => {
                            setNewItem({ ...newItem, name: p.name, price: Number(p.sellPrice), inventoryId: p.id });
                            setShowDropdown(false);
                          }}>
                          <div><p className="font-black text-slate-800 text-sm">{p.name}</p><p className="text-[10px] text-slate-400 uppercase font-black">{t.stock}: {p.stock} {t.inv_pcs}</p></div>
                          <p className="font-black text-blue-600 text-sm">৳ {p.sellPrice}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-[10px] font-black text-slate-400 ml-2 uppercase tracking-widest">{t.itemQty}</label><input type="number" min="1" required className="w-full p-4 mt-1 bg-slate-50 rounded-2xl font-bold border focus:border-blue-600" value={newItem.qty} onChange={(e) => setNewItem({...newItem, qty: e.target.value})} /></div>
                  <div><label className="text-[10px] font-black text-slate-400 ml-2 uppercase tracking-widest">{t.itemPrice}</label><input type="number" required className="w-full p-4 mt-1 bg-slate-50 rounded-2xl font-bold border focus:border-blue-600" value={newItem.price} onChange={(e) => setNewItem({...newItem, price: e.target.value})} /></div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-left">
                  <div><label className="text-[10px] font-black text-blue-400 ml-2 uppercase tracking-widest">{t.vat || "VAT"}</label><input type="number" className="w-full p-4 mt-1 bg-blue-50/30 rounded-2xl font-bold border border-blue-100" value={newItem.vat} onChange={(e) => setNewItem({...newItem, vat: e.target.value})} /></div>
                  <div><label className="text-[10px] font-black text-red-400 ml-2 uppercase tracking-widest">{t.discount || "Discount"}</label><input type="number" className="w-full p-4 mt-1 bg-red-50/30 rounded-2xl font-bold border border-red-100" value={newItem.disc} onChange={(e) => setNewItem({...newItem, disc: e.target.value})} /></div>
                </div>
                
                <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-3xl font-black text-lg shadow-xl shadow-blue-200 transition-all hover:bg-blue-700 active:scale-95 uppercase tracking-widest">{t.app_add}</button>
                <button type="button" onClick={() => setShowForm(false)} className="w-full text-slate-400 font-black py-2 uppercase text-[10px] tracking-[0.2em] hover:text-slate-600 transition-all text-center">{t.cancel}</button>
              </form>
           </div>
        </div>
      )}

      <style>{`
        :root { --memo-scale: 1; }
        @media (max-width: 768px) { :root { --memo-scale: 0.46; } main { padding-top: 5rem !important; } }
        @media print {
          @page { size: A4; margin: 0; }
          nav, .no-print { display: none !important; }
          body { background: white !important; margin: 0 !important; padding: 0 !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          #memo-to-print { position: absolute !important; top: 0; left: 0; width: 210mm !important; height: 297mm !important; border: none !important; box-shadow: none !important; transform: scale(1) !important; margin: 0 !important; }
          html, body { height: 297mm; overflow: hidden; }
        }
      `}</style>
    </main>
  );
}