import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { TrendingUp, DollarSign, ShoppingBag, Loader2, Calendar, Wallet, ArrowDownCircle, Download, ChevronDown, BarChart3 } from 'lucide-react';

export default function RevenueView({ t, currency }) { // currency প্রপস যোগ করা হয়েছে
  const [sales, setSales] = useState([]);
  const [expenses, setExpenses] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); 
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    // ১. বিক্রির ডাটা আনা
    const salesQ = query(collection(db, "sales"), where("userId", "==", user.uid));
    const unsubSales = onSnapshot(salesQ, (snapshot) => {
      setSales(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // ২. খরচের ডাটা আনা (কানেকশন)
    const expenseQ = query(collection(db, "expenses"), where("userId", "==", user.uid));
    const unsubExpenses = onSnapshot(expenseQ, (snapshot) => {
      setExpenses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return () => { unsubSales(); unsubExpenses(); };
  }, []);

  // --- CSV/Excel এক্সপোর্ট লজিক (অপরিবর্তিত) ---
  const exportToCSV = (data, fileName, type) => {
    if (data.length === 0) return alert("No data available to export!");
    let csvContent = "data:text/csv;charset=utf-8,";
    if (type === 'sales') {
      csvContent += "Date,Customer,Total Amount,Profit\n";
      data.forEach(row => {
        csvContent += `${new Date(row.date).toLocaleDateString()},${row.customerName || t.rev_walking},${row.totalAmount},${row.profit}\n`;
      });
    } else {
      csvContent += "Date,Expense Detail,Category,Amount\n";
      data.forEach(row => {
        csvContent += `${row.date},${row.title},${row.category},${row.amount}\n`;
      });
    }
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${fileName}_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- ফিল্টারিং লজিক (অপরিবর্তিত) ---
  const filterData = (dataList) => {
    return dataList.filter(item => {
      const itemDate = new Date(item.date);
      const today = new Date();
      if (filter === 'today') return itemDate.toDateString() === today.toDateString();
      if (filter === 'week') {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);
        return itemDate >= sevenDaysAgo;
      }
      if (filter === 'monthly') return itemDate.getMonth() === Number(selectedMonth) && itemDate.getFullYear() === Number(selectedYear);
      return true;
    });
  };

  const filteredSales = filterData(sales);
  const filteredExpenses = filterData(expenses);

  // ক্যালকুলেশন
  const totalSales = filteredSales.reduce((acc, s) => acc + (Number(s.totalAmount) || 0), 0);
  const grossProfit = filteredSales.reduce((acc, s) => acc + (Number(s.profit) || 0), 0);
  const totalExpenses = filteredExpenses.reduce((acc, e) => acc + (Number(e.amount) || 0), 0);
  const netProfit = grossProfit - totalExpenses; 

  const monthOptions = [
    { key: 'jan', value: 0 }, { key: 'feb', value: 1 }, { key: 'mar', value: 2 },
    { key: 'apr', value: 3 }, { key: 'may', value: 4 }, { key: 'jun', value: 5 },
    { key: 'jul', value: 6 }, { key: 'aug', value: 7 }, { key: 'sep', value: 8 },
    { key: 'oct', value: 9 }, { key: 'nov', value: 10 }, { key: 'dec', value: 11 }
  ];

  const years = [2024, 2025, 2026, 2027];

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-20 gap-4">
      <Loader2 className="animate-spin text-blue-600" size={40} />
      <p className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">{t.loading}</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 animate-in fade-in slide-in-from-bottom-6 duration-700 font-sans text-slate-900">
      
      {/* ১. হেডার এবং স্মার্ট ফিল্টার মেনু */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic flex items-center gap-3">
            <div className="p-2 bg-green-500 text-white rounded-2xl shadow-lg shadow-green-100">
              <TrendingUp size={28} />
            </div>
            {t.rev_title}
          </h2>
          <p className="text-slate-400 font-bold text-xs ml-1 uppercase tracking-widest opacity-70">{t.rev_sub}</p>
        </div>

        {/* ফিল্টার বাটন প্যানেল */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-100/80 p-1.5 rounded-[1.5rem] border border-slate-200/50 w-full lg:w-auto">
          <FilterBtn active={filter === 'all'} onClick={() => setFilter('all')} label={t.rev_filter_all} />
          <FilterBtn active={filter === 'today'} onClick={() => setFilter('today')} label={t.rev_filter_today} />
          <FilterBtn active={filter === 'week'} onClick={() => setFilter('week')} label={t.rev_filter_7d} />
          
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all ${filter === 'monthly' ? 'bg-white shadow-sm' : ''}`}>
             <span className="text-[9px] font-black text-slate-400 uppercase">{t.rev_filter_month}:</span>
             <select 
              value={selectedMonth} 
              onChange={(e) => {setSelectedMonth(e.target.value); setFilter('monthly');}} 
              className="bg-transparent text-[11px] font-black outline-none cursor-pointer text-blue-600 uppercase"
             >
               {monthOptions.map((m) => (
                 <option key={m.key} value={m.value}>{t[m.key] || m.key}</option>
               ))}
             </select>
             <select 
              value={selectedYear} 
              onChange={(e) => {setSelectedYear(e.target.value); setFilter('monthly');}} 
              className="bg-transparent text-[11px] font-black outline-none cursor-pointer text-slate-500"
             >
               {years.map(y => <option key={y} value={y}>{y}</option>)}
             </select>
          </div>
        </div>
      </div>

      {/* ২. ৪টি কার্ডের ড্যাশবোর্ড (মোবাইল অপ্টিমাইজড) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <StatCard label={t.rev_total_sales} value={totalSales.toLocaleString()} icon={<DollarSign size={20}/>} color="blue" currency={currency} />
        <StatCard label={t.rev_total_exp} value={totalExpenses.toLocaleString()} icon={<ArrowDownCircle size={20}/>} color="red" currency={currency} />
        <StatCard label={t.rev_gross_profit} value={grossProfit.toLocaleString()} icon={<ShoppingBag size={20}/>} color="purple" currency={currency} />
        <StatCard label={t.rev_net_profit} value={netProfit.toLocaleString()} icon={<Wallet size={20}/>} color="green" currency={currency} />
      </div>

      {/* ৩. সাম্প্রতিক লেনদেনের গ্রিড */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* সাম্প্রতিক বিক্রি */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 overflow-hidden">
          <div className="p-7 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
            <h3 className="font-black text-slate-800 uppercase text-[10px] tracking-widest">{t.rev_recent_sales}</h3>
            <button 
              onClick={() => exportToCSV(filteredSales, 'Sales_Report', 'sales')}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase shadow-lg shadow-blue-100 hover:scale-105 transition-all"
            >
              <Download size={14} /> {t.rev_export}
            </button>
          </div>
          <div className="max-h-[450px] overflow-y-auto">
            <table className="w-full text-left">
              <tbody className="divide-y divide-slate-50">
                {filteredSales.sort((a,b) => new Date(b.date) - new Date(a.date)).map((sale) => (
                  <tr key={sale.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-8 py-5 text-[10px] font-bold text-slate-400">{new Date(sale.date).toLocaleDateString()}</td>
                    <td className="px-4 py-5 font-black text-slate-800 text-sm uppercase tracking-tighter">{sale.customerName || t.rev_walking}</td>
                    <td className="px-8 py-5 text-right font-black text-blue-600 text-base">{currency} {sale.totalAmount?.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* সাম্প্রতিক খরচ */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 overflow-hidden">
          <div className="p-7 border-b border-slate-50 bg-red-50/30 flex justify-between items-center">
            <h3 className="font-black text-slate-800 uppercase text-[10px] tracking-widest text-red-600">{t.rev_recent_exp}</h3>
            <button 
              onClick={() => exportToCSV(filteredExpenses, 'Expenses_Report', 'expenses')}
              className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase shadow-lg hover:bg-black transition-all"
            >
              <Download size={14} /> {t.rev_export}
            </button>
          </div>
          <div className="max-h-[450px] overflow-y-auto">
            <table className="w-full text-left">
              <tbody className="divide-y divide-slate-50">
                {filteredExpenses.sort((a,b) => new Date(b.date) - new Date(a.date)).map((exp) => (
                  <tr key={exp.id} className="hover:bg-red-50/30 transition-colors">
                    <td className="px-8 py-5 text-[10px] font-bold text-slate-400">{exp.date}</td>
                    <td className="px-4 py-5 font-black text-slate-800 text-sm uppercase tracking-tighter">{exp.title}</td>
                    <td className="px-8 py-5 text-right font-black text-red-600 text-base">{currency} {exp.amount?.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

// ছোট হেল্পার কম্পোনেন্ট: ফিল্টার বাটন
function FilterBtn({ label, active, onClick }) {
  return (
    <button 
      onClick={onClick} 
      className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${
        active 
        ? 'bg-white text-blue-600 shadow-md border border-slate-200/50' 
        : 'text-slate-500 hover:text-slate-800'
      }`}
    >
      {label}
    </button>
  );
}

// স্ট্যাটাস কার্ড কম্পোনেন্ট
function StatCard({ label, value, icon, color, currency }) {
  const colors = { 
    blue: 'bg-blue-50 text-blue-600 border-blue-100', 
    green: 'bg-green-50 text-green-600 border-green-100', 
    red: 'bg-red-50 text-red-600 border-red-100', 
    purple: 'bg-purple-50 text-purple-600 border-purple-100' 
  };
  
  return (
    <div className={`bg-white p-6 rounded-[2.2rem] border-2 transition-all hover:shadow-xl ${colors[color]} shadow-sm flex items-center justify-between group`}>
      <div className="space-y-1">
        <p className="text-[10px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">{label}</p>
        <p className="text-2xl font-black text-slate-900 tracking-tighter">
          {currency && <span className="text-sm mr-1 font-bold text-inherit opacity-70">{currency}</span>}
          {value}
        </p>
      </div>
      <div className={`p-4 rounded-2xl bg-white shadow-inner border border-inherit transition-transform group-hover:scale-110`}>
         {icon}
      </div>
    </div>
  );
}