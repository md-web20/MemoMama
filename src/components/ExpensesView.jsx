import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, onSnapshot, query, where, deleteDoc, doc } from 'firebase/firestore';
import { Receipt, Plus, Trash2, Loader2, CreditCard, Calendar, ArrowDownCircle, Search } from 'lucide-react';

export default function ExpensesView({ t, currency }) { // currency প্রপস যোগ করা হয়েছে
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', amount: '', category: 'General', date: new Date().toISOString().split('T')[0] });

  // ফায়ারবেস থেকে ডাটা আনা
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(db, "expenses"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setExpenses(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // খরচ যোগ করা
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "expenses"), {
        ...formData,
        amount: Number(formData.amount),
        userId: auth.currentUser.uid,
        createdAt: new Date().toISOString()
      });
      setFormData({ title: '', amount: '', category: 'General', date: new Date().toISOString().split('T')[0] });
      setShowModal(false);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const deleteExpense = async (id) => {
    if (window.confirm((t.delete || "Delete") + "?")) {
      await deleteDoc(doc(db, "expenses", id));
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-20 gap-4">
        <Loader2 className="animate-spin text-blue-600" size={40} />
        <p className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">{t.loading}</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 animate-in fade-in slide-in-from-bottom-6 duration-700 font-sans text-slate-900">
      
      {/* হেডার সেকশন */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div className="space-y-1">
          <h2 className="text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tighter uppercase italic">
            <div className="p-2 bg-red-500 text-white rounded-2xl shadow-lg shadow-red-100">
               <Receipt size={28} />
            </div>
            {t.exp_title}
          </h2>
          <p className="text-slate-400 font-bold text-xs ml-1 uppercase tracking-widest opacity-70">{t.exp_sub}</p>
        </div>
        
        <button 
          onClick={() => setShowModal(true)}
          className="group flex items-center gap-3 bg-slate-900 hover:bg-black text-white px-8 py-4 rounded-[2rem] font-black shadow-xl transition-all active:scale-95 w-full md:w-auto justify-center"
        >
          <Plus size={22} className="group-hover:rotate-90 transition-transform duration-300" /> 
          {t.exp_add_btn}
        </button>
      </div>

      {/* টোটাল খরচ কার্ড (মডার্ন ডিজাইন) */}
      <div className="relative overflow-hidden bg-red-600 p-8 rounded-[2.5rem] mb-12 shadow-2xl shadow-red-200 group transition-all hover:scale-[1.01]">
        <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform">
           <ArrowDownCircle size={150} />
        </div>
        <div className="relative z-10">
           <p className="text-[10px] font-black text-red-100 uppercase tracking-[0.2em] mb-2">{t.exp_total_rec}</p>
           <p className="text-6xl font-black text-white tracking-tighter">
             <span className="text-2xl mr-1 opacity-80">{currency}</span>
             {expenses.reduce((acc, e) => acc + Number(e.amount), 0).toLocaleString()}
           </p>
        </div>
      </div>

      {/* খরচ তালিকা টেবিল (মোবাইল অপ্টিমাইজড) */}
      <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 overflow-hidden">
        <div className="p-7 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
           <h3 className="font-black text-slate-400 uppercase text-[10px] tracking-widest flex items-center gap-2">
              <Calendar size={14} /> Recent Transactions
           </h3>
           <span className="text-[10px] font-black bg-red-100 text-red-600 px-3 py-1 rounded-full uppercase">{expenses.length} items</span>
        </div>
        
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/30 text-[10px] uppercase font-black text-slate-400 tracking-[0.15em] border-b">
                <tr>
                <th className="px-8 py-6">{t.exp_col_date}</th>
                <th className="px-8 py-6">{t.exp_col_detail}</th>
                <th className="px-8 py-6 text-center">{t.exp_col_cat}</th>
                <th className="px-8 py-6 text-right">{t.exp_col_amount}</th>
                <th className="px-8 py-6 text-right">{t.inv_col_action || "Action"}</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
                {expenses.length > 0 ? expenses.sort((a,b) => new Date(b.date) - new Date(a.date)).map((exp) => (
                <tr key={exp.id} className="hover:bg-red-50/30 transition-colors group">
                    <td className="px-8 py-6 text-slate-400 font-bold text-[10px]">{exp.date}</td>
                    <td className="px-8 py-6 font-black text-slate-800 text-sm uppercase tracking-tight">{exp.title}</td>
                    <td className="px-8 py-6 text-center">
                      <span className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-xl text-[9px] font-black uppercase tracking-wider">
                          {exp.category === 'General' ? t.cat_general : 
                           exp.category === 'Marketing' ? t.cat_marketing :
                           exp.category === 'Packaging' ? t.cat_packaging :
                           exp.category === 'Logistics' ? t.cat_logistics :
                           exp.category === 'Utility' ? t.cat_utility : exp.category}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right font-black text-red-600 text-base">{currency} {exp.amount?.toLocaleString()}</td>
                    <td className="px-8 py-6 text-right">
                       <button 
                         onClick={() => deleteExpense(exp.id)} 
                         className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                       >
                         <Trash2 size={18}/>
                       </button>
                    </td>
                </tr>
                )) : (
                  <tr>
                    <td colSpan="5" className="py-20 text-center opacity-20 font-black text-xs uppercase tracking-widest">
                       {t.rev_no_data || "No expenses found"}
                    </td>
                  </tr>
                )}
            </tbody>
            </table>
        </div>
      </div>

      {/* রেকর্ড খরচ মডাল */}
      {showModal && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] w-full max-w-md p-8 md:p-12 shadow-2xl border border-white animate-in zoom-in-95">
            <h3 className="text-2xl font-black mb-8 text-slate-900 tracking-tighter uppercase italic text-center border-b pb-4">
                {t.record_exp_title}
            </h3>
            
            <form onSubmit={handleAdd} className="space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">{t.exp_col_detail}</label>
                <input 
                    type="text" placeholder={t.exp_placeholder} required 
                    className="w-full p-5 bg-slate-50 rounded-2xl outline-none font-bold border-2 border-transparent focus:border-red-500 transition-all text-sm"
                    value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">{t.exp_col_amount}</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">{currency}</span>
                      <input 
                        type="number" required 
                        className="w-full p-5 pl-10 bg-slate-50 rounded-2xl outline-none font-bold text-sm"
                        value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})}
                      />
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">{t.exp_col_cat}</label>
                    <select 
                      className="w-full p-5 bg-slate-50 rounded-2xl outline-none font-bold text-sm cursor-pointer"
                      value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
                    >
                      <option value="General">{t.cat_general}</option>
                      <option value="Marketing">{t.cat_marketing}</option>
                      <option value="Packaging">{t.cat_packaging}</option>
                      <option value="Logistics">{t.cat_logistics}</option>
                      <option value="Utility">{t.cat_utility}</option>
                    </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">{t.exp_col_date}</label>
                <input 
                    type="date" required 
                    className="w-full p-5 bg-slate-50 rounded-2xl outline-none font-bold text-sm"
                    value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})}
                />
              </div>

              <div className="flex gap-4 pt-6">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-5 font-black text-slate-400 uppercase text-[11px] tracking-widest hover:text-slate-600 transition-colors">
                    {t.cancel}
                </button>
                <button type="submit" className="flex-1 py-5 bg-blue-600 text-white rounded-[1.5rem] font-black shadow-xl shadow-blue-100 uppercase text-[11px] tracking-[0.2em] active:scale-95 transition-all">
                    {t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}