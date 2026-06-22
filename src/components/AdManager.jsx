import React, { useEffect } from 'react';

const ADSENSE_PUB_ID = "ca-pub-5257246589447812"; 

export const BannerAd = ({ userProfile }) => {
  if (userProfile?.isPro) return null;

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  return (
    <div className="no-print w-full flex flex-col items-center my-4 overflow-hidden">
      <div className="bg-slate-50 border border-slate-100 rounded-xl w-full max-w-[728px] min-h-[90px] flex items-center justify-center">
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client={ADSENSE_PUB_ID}
             data-ad-slot="1234567890"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>
    </div>
  );
};

export const PopupAd = ({ userProfile, onClose }) => {
  if (userProfile?.isPro) return null;

  return (
    <div className="fixed inset-0 z-[600] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-[3rem] shadow-2xl relative max-w-md w-full text-center border">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-300 hover:text-red-500 transition">
           <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
           <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
        </div>
        <h3 className="text-2xl font-black mb-4">ডেইলি লিমিট শেষ!</h3>
        <p className="text-slate-500 font-medium mb-8">আনলিমিটেড মেমো তৈরি করতে আজই প্রো মেম্বার হয়ে যান।</p>
        <button onClick={onClose} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-100">প্ল্যানগুলো দেখুন</button>
      </div>
    </div>
  );
};