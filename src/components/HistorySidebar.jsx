import React, { useState, useEffect } from 'react';
import { X, Trash2, Calendar, ChevronDown, ChevronRight, FileEdit, Clock, PackageOpen, FileText, Printer, Truck, Loader2, Globe, CheckCircle2 } from 'lucide-react';
import { db, auth } from '../firebase';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';

export default function HistorySidebar({ t, memoHistory, setMemoHistory, showHistory, setShowHistory, currency, setEditMemoData, setView }) {
  const [openMonths, setOpenMonths] = useState({});
  const [openDates, setOpenDates] = useState({});
  const [selectedMemo, setSelectedMemo] = useState(null);
  
  // কুরিয়ার স্টেট
  const [courierSettings, setCourierSettings] = useState(null);
  const [showCourierMenu, setShowCourierMenu] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  // ফায়ারবেস থেকে কুরিয়ার সেটিংস লোড করা
  useEffect(() => {
    const fetchSettings = async () => {
      const currentUid = auth.currentUser?.uid;
      if (!currentUid) return;
      const userSnap = await getDoc(doc(db, "users", currentUid));
      if (userSnap.exists() && userSnap.data().courierSettings) {
        setCourierSettings(userSnap.data().courierSettings);
      }
    };
    if (showHistory) fetchSettings();
  }, [showHistory]);

  if (!showHistory) return null;

  // মাস এবং তারিখ অনুযায়ী গ্রুপিং লজিক
  const groupedMemos = memoHistory.reduce((acc, memo) => {
    const memoDate = memo.date ? new Date(memo.date) : new Date();
    const monthYear = memoDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    const fullDate = memoDate.toLocaleDateString();

    if (!acc[monthYear]) acc[monthYear] = {};
    if (!acc[monthYear][fullDate]) acc[monthYear][fullDate] = [];
    
    acc[monthYear][fullDate].push(memo);
    return acc;
  }, {});

  const toggleMonth = (month) => setOpenMonths(prev => ({ ...prev, [month]: !prev[month] }));
  const toggleDate = (date) => setOpenDates(prev => ({ ...prev, [date]: !prev[date] }));

  const deleteMemo = async (id) => {
    if(!window.confirm("Delete permanently?")) return;
    try {
      await deleteDoc(doc(db, "sales", id));
      const updated = memoHistory.filter(m => m.id !== id);
      setMemoHistory(updated);
      localStorage.setItem('memo_history', JSON.stringify(updated));
    } catch (err) {
      alert("Delete failed!");
    }
  };

  const handleOpenMemoForEdit = (memo) => {
    setEditMemoData(memo); // InvoiceApp-এ ডাটা পাঠানো
    setView('app');        // ভিউ পরিবর্তন
    setShowHistory(false); // সাইডবার বন্ধ
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

  const handleBookCourier = async (cId, cName) => {
    if (!selectedMemo.customerPhone || !selectedMemo.customerAddress) return alert("Phone and Address required!");
    setIsBooking(true);
    setShowCourierMenu(false);
    try {
      await new Promise(res => setTimeout(res, 2000));
      alert(`Success! Order sent to ${cName}`);
    } catch (err) { alert(err.message); } finally { setIsBooking(false); }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-md flex justify-end no-print font-sans">
      <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto animate-in slide-in-from-right duration-500 border-l">
        
        <div className="flex justify-between items-center mb-10 pt-4">
          <h2 className="text-2xl font-black italic flex items-center gap-3 tracking-tighter uppercase text-slate-800">
             <Clock className="text-blue-600" /> {t.historyTitle || 'Archive Records'}
          </h2>
          <button onClick={() => setShowHistory(false)} className="p-2 bg-slate-100 rounded-xl hover:bg-slate-200 transition"><X /></button>
        </div>

        <div className="space-y-4">
          {Object.keys(groupedMemos).length === 0 ? (
            <div className="text-center py-20 opacity-30 font-black text-xs uppercase tracking-widest text-slate-400">No Records Found</div>
          ) : (
            Object.keys(groupedMemos).sort((a, b) => new Date(b) - new Date(a)).map(month => (
              <div key={month} className="space-y-2">
                <button onClick={() => toggleMonth(month)} className="w-full flex justify-between items-center bg-blue-50/50 p-4 rounded-2xl border border-blue-100 font-black text-blue-900 text-sm">
                  <div className="flex items-center gap-2">{openMonths[month] ? <ChevronDown size={16}/> : <ChevronRight size={16}/>} {month}</div>
                </button>

                {openMonths[month] && (
                  <div className="pl-4 space-y-2 animate-in fade-in slide-in-from-top-2">
                    {Object.keys(groupedMemos[month]).sort((a,b) => new Date(b) - new Date(a)).map(date => (
                      <div key={date} className="space-y-1">
                        <button onClick={() => toggleDate(date)} className="w-full flex justify-between items-center bg-slate-50/50 p-3 rounded-xl border border-slate-100 font-bold text-slate-500 text-xs">
                           <span>{date}</span>
                           <span className="bg-white px-2 py-0.5 rounded-lg border text-[10px]">{groupedMemos[month][date].length} Memos</span>
                        </button>
                        {openDates[date] && (
                          <div className="space-y-2 mt-2 ml-2">
                            {groupedMemos[month][date].map(m => (
                              <div key={m.id} className="p-4 bg-white border border-slate-100 rounded-2xl hover:border-blue-300 transition-all cursor-pointer group" onClick={() => setSelectedMemo(m)}>
                                <div className="flex justify-between items-center text-xs">
                                  <div className="flex-1">
                                    <p className="font-black text-slate-800 uppercase tracking-tighter truncate max-w-[140px]">{m.customerName || "Walking Customer"}</p>
                                    <p className="font-bold text-blue-600 uppercase">৳{m.totalAmount?.toLocaleString()}</p>
                                  </div>
                                  <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                                    <button onClick={() => setSelectedMemo(m)} className="p-2 bg-slate-50 text-blue-600 rounded-lg"><FileText size={14}/></button>
                                    <button onClick={() => handleOpenMemoForEdit(m)} className="p-2 bg-slate-50 text-green-600 rounded-lg"><Printer size={14}/></button>
                                    <button onClick={() => deleteMemo(m.id)} className="p-2 bg-slate-50 text-red-400 rounded-lg"><Trash2 size={14}/></button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* --- পপ-আপ মেমো প্রিভিউ --- */}
      {selectedMemo && (
        <div className="fixed inset-0 z-[300] bg-slate-900/95 backdrop-blur-xl flex items-center justify-center p-4">
           <div className="bg-white w-full max-w-2xl max-h-[95vh] overflow-y-auto rounded-[2.5rem] shadow-2xl relative animate-in zoom-in-95">
              <div className="sticky top-0 bg-white/90 backdrop-blur-md p-6 border-b flex justify-between items-center z-20 no-print">
                 <div className="flex items-center gap-3">
                    <div className="relative">
                       <button onClick={() => setShowCourierMenu(!showCourierMenu)} className="bg-blue-600 text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 shadow-lg">
                         {isBooking ? <Loader2 size={14} className="animate-spin"/> : <Truck size={14}/>} 
                         {isBooking ? 'Processing...' : 'Send Courier'}
                         <ChevronDown size={12} />
                       </button>
                       {showCourierMenu && (
                         <div className="absolute left-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-2xl p-2 z-[310]">
                            {getActiveCouriers().length > 0 ? getActiveCouriers().map(c => (
                              <button key={c.id} onClick={() => handleBookCourier(c.id, c.name)} className="w-full flex items-center justify-between p-2.5 hover:bg-blue-50 rounded-xl transition font-black text-[10px] text-slate-700">
                                <span className="flex items-center gap-2">{c.type === 'Global' ? <Globe size={14} className="text-blue-500"/> : <CheckCircle2 size={14} className="text-green-500"/>} {c.name}</span>
                              </button>
                            )) : <p className="text-[9px] p-2 text-slate-400 italic">No courier active</p>}
                         </div>
                       )}
                    </div>
                    <button onClick={() => handleOpenMemoForEdit(selectedMemo)} className="bg-slate-900 text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 shadow-lg"><FileText size={14}/> Edit/Print</button>
                 </div>
                 <button onClick={() => setSelectedMemo(null)} className="p-2 bg-red-50 text-red-500 rounded-xl"><X size={20}/></button>
              </div>

              <div className="p-8 md:p-12 text-slate-900 font-sans">
                 <div className="flex justify-between items-start mb-10">
                    <h4 className="text-3xl font-black italic text-slate-900 uppercase tracking-tighter">MemoMama</h4>
                    <div className="text-right">
                       <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest leading-none mb-1">Receipt Date</p>
                       <p className="font-black text-blue-600">{selectedMemo.date}</p>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-8 mb-10 border-b pb-8">
                    <div>
                       <p className="text-[10px] font-black text-blue-600 uppercase mb-1 tracking-widest">Customer Info</p>
                       <h5 className="font-black text-slate-800 text-xl leading-tight">{selectedMemo.customerName}</h5>
                       <p className="text-sm font-bold text-slate-500 mt-1">{selectedMemo.customerPhone}</p>
                       <p className="text-xs text-slate-400 mt-1 leading-relaxed">{selectedMemo.customerAddress}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Total Amount</p>
                       <h5 className="text-4xl font-black text-slate-900 tracking-tighter">৳{selectedMemo.totalAmount?.toLocaleString()}</h5>
                    </div>
                 </div>
                 {selectedMemo.items && (
                   <table className="w-full text-left mb-10">
                      <thead><tr className="text-[10px] font-black text-slate-300 uppercase border-b"><th className="pb-3">Item Name</th><th className="pb-3 text-center">Qty</th><th className="pb-3 text-right">Total</th></tr></thead>
                      <tbody>{selectedMemo.items.map((item, i) => (<tr key={i} className="border-b border-slate-50"><td className="py-4 text-sm font-bold text-slate-700">{item.name}</td><td className="py-4 text-center text-sm font-bold text-slate-400">{item.qty}</td><td className="py-4 text-right text-sm font-black text-slate-900">৳{item.rowTotal}</td></tr>))}</tbody>
                   </table>
                 )}
                 <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em] text-center pt-10">Official Archive Record</p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}