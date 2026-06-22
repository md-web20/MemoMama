import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, query, where, deleteDoc, doc } from 'firebase/firestore';
import { Plus, Trash2, Package, AlertTriangle, BarChart3, Loader2, Search, ArrowRightLeft, MoreVertical } from 'lucide-react';

export default function ProductsView({ user, t, currency }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', buyPrice: '', sellPrice: '', stock: '' });

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "products"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const prods = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(prods);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "products"), {
        name: formData.name,
        buyPrice: Number(formData.buyPrice), 
        sellPrice: Number(formData.sellPrice),
        stock: Number(formData.stock),
        userId: user.uid,
        createdAt: new Date().toISOString()
      });
      setFormData({ name: '', buyPrice: '', sellPrice: '', stock: '' });
      setShowAddModal(false);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const deleteProduct = async (id) => {
    if(window.confirm((t.delete || "Delete") + "?")) {
      await deleteDoc(doc(db, "products", id));
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div className="space-y-1">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter flex items-center gap-3 italic uppercase">
            <div className="p-2 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-100">
               <Package size={28} />
            </div>
            {t.inv_title}
          </h2>
          <p className="text-slate-400 font-bold text-[10px] md:text-xs ml-1 uppercase tracking-widest opacity-70">{t.inv_sub}</p>
        </div>
        
        <button 
          onClick={() => setShowAddModal(true)}
          className="group flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-black shadow-xl shadow-blue-100 transition-all active:scale-95 w-full md:w-auto justify-center"
        >
          <Plus size={22} className="group-hover:rotate-90 transition-transform duration-300" /> 
          {t.inv_add_btn}
        </button>
      </div>

      {/* স্ট্যাটাস কার্ড গ্রিড - মোবাইলে ২ কলামে দেখাবে */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        <StatCard label={t.inv_total_prod} value={products.length} icon={<Package size={20}/>} color="blue" currency={null} />
        <StatCard label={t.inv_low_stock} value={products.filter(p => Number(p.stock) < 5).length} icon={<AlertTriangle size={20}/>} color="red" currency={null} />
        <StatCard 
            label={t.inv_stock_value} 
            value={products.reduce((acc, p) => acc + (Number(p.buyPrice || 0) * Number(p.stock || 0)), 0).toLocaleString()} 
            icon={<BarChart3 size={20}/>} 
            color="green" 
            currency={currency}
        />
      </div>

      {/* কন্টেন্ট এরিয়া */}
      <div className="bg-white border border-slate-100 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl shadow-slate-200/50 overflow-hidden">
        
        {/* ডেস্কটপ টেবিল ভিউ (hidden on small screens) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t.inv_col_name}</th>
                <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">{t.inv_col_stock}</th>
                <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t.inv_col_buy}</th>
                <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t.inv_col_sell}</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">{t.inv_col_action}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-8 py-6">
                     <p className="font-black text-slate-800 uppercase tracking-tighter text-sm">{p.name}</p>
                     <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">ID: {p.id.slice(-6)}</p>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-sm border ${Number(p.stock) < 5 ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'}`}>
                      {p.stock} {t.inv_pcs}
                    </span>
                  </td>
                  <td className="px-6 py-6 font-bold text-slate-500 text-sm">{currency} {p.buyPrice}</td>
                  <td className="px-6 py-6 font-black text-blue-600 text-base">{currency} {p.sellPrice}</td>
                  <td className="px-8 py-6 text-right">
                    <button onClick={() => deleteProduct(p.id)} className="p-3 text-slate-300 hover:text-red-500 transition-all"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* মোবাইল কার্ড লিস্ট ভিউ (shown only on small screens) */}
        <div className="md:hidden divide-y divide-slate-50">
           {products.length > 0 ? products.map((p) => (
             <div key={p.id} className="p-5 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 transition-all">
                <div className="flex gap-4 items-center">
                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${Number(p.stock) < 5 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                      {p.name.charAt(0).toUpperCase()}
                   </div>
                   <div className="space-y-0.5">
                      <p className="font-black text-slate-800 uppercase text-xs tracking-tighter">{p.name}</p>
                      <div className="flex items-center gap-2">
                         <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${Number(p.stock) < 5 ? 'bg-red-50 text-red-500' : 'bg-slate-100 text-slate-500'}`}>
                            {p.stock} {t.inv_pcs}
                         </span>
                         <span className="text-[10px] font-black text-blue-600">{currency} {p.sellPrice}</span>
                      </div>
                   </div>
                </div>
                <button onClick={() => deleteProduct(p.id)} className="p-3 text-slate-300 active:text-red-500">
                   <Trash2 size={18} />
                </button>
             </div>
           )) : (
             <div className="py-20 text-center opacity-20 font-black text-xs uppercase tracking-widest">{t.rev_no_data}</div>
           )}
        </div>
      </div>

      {/* অ্যাড প্রোডাক্ট মডাল - মোবাইল অপ্টিমাইজড */}
      {showAddModal && (
        <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-t-[2.5rem] md:rounded-[3rem] w-full max-w-md p-8 md:p-12 shadow-2xl border border-white animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center gap-4 mb-8">
               <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Plus size={24}/></div>
               <h3 className="text-2xl font-black tracking-tighter uppercase italic">{t.inv_add_btn}</h3>
            </div>
            <form onSubmit={handleAdd} className="space-y-5">
              <div className="space-y-1">
                 <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">{t.inv_col_name}</label>
                 <input type="text" required className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold text-sm border-2 border-transparent focus:border-blue-600 transition-all" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                   <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">{t.inv_col_buy}</label>
                   <input type="number" required className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold text-sm" value={formData.buyPrice} onChange={e => setFormData({...formData, buyPrice: e.target.value})} />
                </div>
                <div className="space-y-1">
                   <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">{t.inv_col_sell}</label>
                   <input type="number" required className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold text-sm" value={formData.sellPrice} onChange={e => setFormData({...formData, sellPrice: e.target.value})} />
                </div>
              </div>
              <div className="space-y-1">
                 <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">{t.initial_stock}</label>
                 <input type="number" required className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold text-sm" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-4 font-black text-slate-400 uppercase text-[11px] tracking-widest">{t.cancel}</button>
                <button type="submit" className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-100 uppercase text-[11px] tracking-widest">
                    {t.save_product}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon, color, currency }) {
  const colors = {
    blue: 'text-blue-600 bg-blue-50 border-blue-100',
    red: 'text-red-600 bg-red-50 border-red-100',
    green: 'text-green-600 bg-green-50 border-green-100'
  };
  return (
    <div className={`bg-white p-5 md:p-6 rounded-[2rem] border-2 transition-all shadow-sm flex items-center justify-between ${colors[color]}`}>
      <div className="space-y-0.5">
        <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-60">{label}</p>
        <p className="text-2xl md:text-3xl font-black tracking-tighter">
           {currency && <span className="text-sm mr-1 font-bold">{currency}</span>}
           {value}
        </p>
      </div>
      <div className="p-3 md:p-4 rounded-2xl bg-white shadow-inner border border-inherit">
         {icon}
      </div>
    </div>
  );
}