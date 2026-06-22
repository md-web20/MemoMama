import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, useParams, Navigate } from 'react-router-dom';
import { translations } from './translations';
import { auth, db } from './firebase'; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, collection, query, where, onSnapshot } from "firebase/firestore"; 
import { Loader2 } from 'lucide-react'; 

import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import InvoiceApp from './components/InvoiceApp';
import HistorySidebar from './components/HistorySidebar';
import Auth from './components/Auth';
import Profile from './components/Profile';
import Pricing from './components/Pricing';
import Success from './components/Success';
import StaticPages from './components/StaticPages';
import ProductsView from './components/ProductsView';
import RevenueView from './components/RevenueView';
import ExpensesView from './components/ExpensesView'; 
import CourierSettings from './components/CourierSettings';
import SEOContent from "./components/SEOContent";
import AboutUsLong from './components/AboutUsLong';
import PrivacyPolicyLong from './components/PrivacyPolicyLong';

// ১. মেইন রাউটার র‍্যাপার
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/:langCode/*" element={<AppContent />} />
      </Routes>
    </Router>
  );
}

// ডিফল্ট ল্যাঙ্গুয়েজ রিডাইরেক্টর
function RootRedirect() {
  const savedLang = localStorage.getItem('memo_lang') || 'us'; 
  return <Navigate to={`/${savedLang}`} replace />;
}

function AppContent() {
  const { langCode } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [view, setView] = useState('home'); 
  const [lang, setLang] = useState(translations[langCode] ? langCode : 'us');
  const [currency, setCurrency] = useState('৳');
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({ shopName: '', phone: '', logo: null, sign: null });
  const [memoHistory, setMemoHistory] = useState([]); 
  const [showHistory, setShowHistory] = useState(false);
  const [editMemoData, setEditMemoData] = useState(null); 

  const t = translations[lang] || translations['us'];

  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const currentView = pathParts[2] || 'home';
    setView(currentView);

    if (langCode && translations[langCode]) {
      setLang(langCode);
      localStorage.setItem('memo_lang', langCode);
    }
  }, [location, langCode]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('pay') === 'success') {
      navigate(`/${lang}/success`);
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        setUser(currentUser);
        const profileSnap = await getDoc(doc(db, "users", currentUser.uid));
        if (profileSnap.exists()) setUserProfile(profileSnap.data());
      } else {
        setUser(null);
        setUserProfile({ shopName: '', phone: '', logo: null, sign: null });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [lang, navigate]);

  useEffect(() => {
    if (!user) {
      setMemoHistory([]);
      return;
    }
    const q = query(collection(db, "sales"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const history = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date ? new Date(doc.data().date).toLocaleDateString() : 'N/A'
      }));
      setMemoHistory(history);
    }, (error) => console.error(error));
    return () => unsubscribe();
  }, [user]);

  const handleLogout = async () => {
    setLoading(true);
    await signOut(auth);
    setUser(null);
    navigate(`/${lang}/`);
    setLoading(false);
  };

  const goTo = (path) => {
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    navigate(`/${langCode || lang}/${cleanPath}`);
  };

  const protectedView = (targetPath) => {
    if (!user) navigate(`/${langCode || lang}/auth`);
    else {
      if (targetPath === '/app' || targetPath === 'app') setEditMemoData(null); 
      if (targetPath === 'history') setShowHistory(true);
      else goTo(targetPath);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin h-16 w-16 text-blue-600" />
        <p className="font-bold text-slate-400 animate-pulse uppercase tracking-widest text-xs">Syncing with MemoMama...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar 
        view={view}
        lang={lang} 
        setLang={(newLang) => {
            const currentPath = location.pathname.replace(`/${lang}`, '');
            navigate(`/${newLang}${currentPath || '/'}`);
        }} 
        t={t} user={user} 
        setView={goTo} 
        protectedView={protectedView}
        handleLogout={handleLogout} 
        currency={currency} setCurrency={setCurrency} 
        setShowHistory={setShowHistory} 
      />

      <div className="animate-in fade-in duration-500 pt-20">
        <Routes>
          {/* --- মেইন হোমপেজ এবং /home পাথ উভয়কেই সাপোর্ট দেওয়া হয়েছে --- */}
          <Route path="/" element={<HomeView t={t} lang={lang} setView={goTo} protectedView={protectedView} user={user} />} />
          <Route path="/home" element={<HomeView t={t} lang={lang} setView={goTo} protectedView={protectedView} user={user} />} />
          
          <Route path="/about" element={<AboutUsLong setView={goTo} />} />
          <Route path="/privacy" element={<PrivacyPolicyLong setView={goTo} />} />

          <Route path="/app/*" element={user ? (
            <InvoiceApp 
              t={t} currency={currency} 
              memoHistory={memoHistory} setMemoHistory={setMemoHistory} 
              setView={goTo} userProfile={userProfile}
              editMemoData={editMemoData} 
              openAddItem={location.pathname.includes('/add-item')}
            />
          ) : <Navigate to={`/${lang}/auth`} />} />

          <Route path="/products/*" element={user ? (
            <ProductsView 
              t={t} user={user} setView={goTo} currency={currency} 
              openAddProduct={location.pathname.includes('/add-product')}
            />
          ) : <Navigate to={`/${lang}/auth`} />} />
          
          <Route path="/revenue" element={user ? <RevenueView t={t} user={user} setView={goTo} currency={currency} /> : <Navigate to={`/${lang}/auth`} />} />
          <Route path="/expenses" element={user ? <ExpensesView t={t} user={user} setView={goTo} currency={currency} /> : <Navigate to={`/${lang}/auth`} />} />
          <Route path="/profile" element={user ? <Profile t={t} userProfile={userProfile} setUserProfile={setUserProfile} handleLogout={handleLogout} /> : <Navigate to={`/${lang}/auth`} />} />
          <Route path="/settings" element={user ? <CourierSettings user={user} t={t} /> : <Navigate to={`/${lang}/auth`} />} />
          <Route path="/pricing" element={<Pricing t={t} setView={goTo} />} />
          <Route path="/auth" element={!user ? <Auth t={t} setView={goTo} setUser={setUser} /> : <Navigate to={`/${lang}`} />} />
          <Route path="/success" element={<Success t={t} setView={goTo} />} />
          
          {['terms', 'contact'].map(page => (
            <Route key={page} path={`/${page}`} element={<StaticPages type={page} t={t} setView={goTo} />} />
          ))}
          
          <Route path="*" element={<Navigate to={`/${lang}`} />} />
        </Routes>
      </div>
      
      <HistorySidebar 
        t={t} memoHistory={memoHistory} setMemoHistory={setMemoHistory} 
        showHistory={showHistory} setShowHistory={setShowHistory} 
        currency={currency} setEditMemoData={setEditMemoData}
        setView={goTo}
      />
    </div>
  );
}