import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

export default function FAQSection({ lang, t }) {
  const [openIndex, setOpenContent] = useState(null);

  const faqs = lang === 'bn' ? [
    { q: "মেমো মামা (MemoMama) কি সম্পূর্ণ ফ্রি?", a: "হ্যাঁ, মেমো মামার বেসিক ফিচারগুলো সবার জন্য ১০০% ফ্রি। আপনি কোনো রেজিস্ট্রেশন ছাড়াই প্রফেশনাল মেমো তৈরি করতে পারবেন।" },
    { q: "অনলাইন ক্যাশ মেমো কিভাবে তৈরি করব?", a: "মেমো মামার ড্যাশবোর্ডে গিয়ে 'আইটেম যোগ করুন' বাটনে ক্লিক করে পণ্যের নাম ও দাম বসিয়ে খুব সহজে কয়েক সেকেন্ডে মেমো তৈরি করা যায়।" },
    { q: "স্টক বা ইনভেন্টরি কিভাবে ম্যানেজ করব?", a: "আমাদের ইনভেন্টরি সেকশনে আপনার পণ্যের তালিকা যোগ করুন। মেমো তৈরি করার সময় পণ্য সিলেক্ট করলে স্টক স্বয়ংক্রিয়ভাবে কমে যাবে।" },
    { q: "স্টিডফাস্ট বা পাঠাও কুরিয়ার বুকিং কি এখান থেকে করা যায়?", a: "অবশ্যই! মেমো মামার সাথে স্টিডফাস্ট এবং পাঠাও কুরিয়ার সরাসরি কানেক্টেড। আপনি ১ ক্লিকেই পার্সেল বুকিং করতে পারবেন।" },
    { q: "দোকানের লাভ-ক্ষতির হিসাব কিভাবে দেখব?", a: "আমাদের রেভিনিউ রিপোর্টে আপনার দৈনিক, সাপ্তাহিক এবং মাসিক লাভ-ক্ষতির (Net Profit) বিস্তারিত হিসাব স্বয়ংক্রিয়ভাবে তৈরি হয়।" },
    { q: "আমার ডাটা কি সুরক্ষিত থাকবে?", a: "মেমো মামা গুগল ফায়ারবেস এবং AES-256 এনক্রিপশন ব্যবহার করে, যা আপনার ব্যবসায়িক ডাটাকে সর্বোচ্চ নিরাপত্তা প্রদান করে।" },
    { q: "কাস্টমার ব্ল্যাকলিস্ট ফিচারটি কী?", a: "যদি কোনো কাস্টমার আগে পার্সেল রিটার্ন করে থাকে, তবে তার ফোন নম্বর ইনপুট দেওয়ার সাথে সাথে সিস্টেম আপনাকে সতর্ক করে দেবে।" },
    { q: "আমি কি মেমোতে নিজের লোগো এবং স্বাক্ষর ব্যবহার করতে পারব?", a: "হ্যাঁ, প্রোফাইল সেকশন থেকে আপনি খুব সহজে দোকানের লোগো এবং আপনার ডিজিটাল স্বাক্ষর মেমোতে যুক্ত করতে পারবেন।" },
    { q: "মেমো কি ডাউনলোড বা প্রিন্ট করা যায়?", a: "তৈরি করা প্রতিটি মেমো আপনি প্রফেশনাল PDF ফরম্যাটে ডাউনলোড করতে পারবেন অথবা সরাসরি প্রিন্ট করতে পারবেন।" },
    { q: "এটি কি মোবাইলে ব্যবহার করা যাবে?", a: "হ্যাঁ, মেমো মামা মোবাইল অপ্টিমাইজড। আপনি যেকোনো স্মার্টফোন থেকে এটি খুব সহজে ব্যবহার করতে পারবেন।" },
    { q: "বিনা মূল্যে কতগুলো মেমো তৈরি করা যাবে?", a: "ফ্রি টিয়ারে আপনি প্রতিদিন নির্দিষ্ট সংখ্যক মেমো তৈরি করতে পারবেন। আনলিমিটেড মেমোর জন্য আমাদের প্রো প্ল্যান নিতে পারেন।" },
    { q: "কারেন্সি বা মুদ্রা পরিবর্তন করা যায় কি?", a: "মেমো মামা বিশ্বের সব কারেন্সি সাপোর্ট করে। আপনি সেটিংস থেকে টাকা, ডলার বা অন্য যেকোনো মুদ্রা সেট করতে পারবেন।" },
    { q: "মেমোতে কি কিউআর কোড (QR Code) থাকে?", a: "হ্যাঁ, প্রতিটি মেমোতে ইউনিক কোড থাকে যা আপনার ব্যবসার বিশ্বস্ততা বাড়ায়।" },
    { q: "ভ্যাট এবং ডিসকাউন্ট কিভাবে যোগ করব?", a: "আইটেম যোগ করার সময় আপনি চাইলে নির্দিষ্ট শতাংশ ভ্যাট এবং ডিসকাউন্ট ইনপুট দিতে পারেন।" },
    { q: "হিস্ট্রি বা পুরনো মেমো কি সেভ থাকে?", a: "হ্যাঁ, আপনার করা সব মেমো হিস্ট্রি সেকশনে তারিখ অনুযায়ী সুন্দরভাবে সেভ থাকবে।" },
    { q: "আমি কি পুরনো মেমো এডিট করতে পারব?", a: "অবশ্যই, হিস্ট্রি থেকে যেকোনো মেমো ওপেন করে আপনি তথ্য সংশোধন বা আপডেট করতে পারবেন।" },
    { q: "লেমন স্কুইজি পেমেন্ট কি নিরাপদ?", a: "মেমো মামা আন্তর্জাতিক পেমেন্টের জন্য লেমন স্কুইজি ব্যবহার করে, যা বিশ্বের অন্যতম নিরাপদ পেমেন্ট গেটওয়ে।" },
    { q: "এটি কি অফলাইনে কাজ করে?", a: "মেমো তৈরির জন্য ইন্টারনেট প্রয়োজন, তবে আপনার ডাটা ব্রাউজারে ক্যাশ হিসেবে জমা থাকে।" },
    { q: "২১টি ভাষায় ব্যবহারের সুবিধা কী?", a: "আপনার ভাষা যাই হোক না কেন, মেমো মামা আপনার ভাষাতেই কাজ করবে। এটি গ্লোবাল ব্যবসার জন্য তৈরি।" },
    { q: "মেমো মামার সাপোর্ট টিমকে কিভাবে পাব?", a: "যেকোনো সমস্যায় support@trymemomama.com এ ইমেইল করতে পারেন অথবা আমাদের হোয়াটসঅ্যাপে নক দিতে পারেন।" }
  ] : [
    { q: "Is MemoMama completely free?", a: "Yes, MemoMama offers a generous free tier where you can create professional invoices without any registration." },
    { q: "How do I create a digital cash memo?", a: "Simply go to the dashboard, click 'Add Item', enter product details, and generate your professional PDF in seconds." },
    { q: "How does the inventory system work?", a: "Add your products to the inventory. When you create a memo, the system automatically deducts the quantity from your stock." },
    { q: "Can I automate courier booking?", a: "Yes! MemoMama integrates with local couriers like Steadfast and Pathao for one-click parcel booking." },
    { q: "How can I track my business profit?", a: "Our Revenue dashboard automatically calculates your Gross and Net Profit by analyzing your sales and expenses." },
    { q: "Is my business data secure?", a: "We use Google Firebase with AES-256 encryption. Your sensitive records are isolated and strictly protected." },
    { q: "What is the Customer Blacklist feature?", a: "It alerts you if a customer has a history of returning parcels, helping you reduce RTO costs significantly." },
    { q: "Can I add my shop logo and signature?", a: "Yes, you can upload your custom business logo and digital signature from the Profile settings." },
    { q: "Does it support multiple currencies?", a: "MemoMama supports BDT, USD, EUR, and all major global currencies via independent settings." },
    { q: "Is registration required?", a: "No, you can start creating memos as a guest. However, cloud sync requires a free account." },
    { q: "How many languages are supported?", a: "MemoMama currently supports 21+ global languages including Arabic, Hindi, and Spanish." },
    { q: "Can I export my data to Excel?", a: "Yes, all your revenue and expense reports can be downloaded as CSV/Excel files." },
    { q: "Is it mobile-friendly?", a: "Absolutely! MemoMama is designed as a progressive web app that works perfectly on smartphones." },
    { q: "How do I add VAT or Taxes?", a: "You can input percentage-based VAT and discounts for each item individually while billing." },
    { q: "What happens after payment on LemonSqueezy?", a: "Your account is automatically upgraded to Pro via our secure webhook integration." },
    { q: "Can I edit an archived memo?", a: "Yes, you can open any memo from your history, edit details, and reprint it as needed." },
    { q: "Does MemoMama provide QR-coded receipts?", a: "Yes, our high-end professional designs include all modern invoicing elements including QR support." },
    { q: "How to report a fraudulent buyer?", a: "You can report a buyer to our global blacklist database if they refuse delivery without payment." },
    { q: "Where is MemoMama based?", a: "We are a team of dedicated developers based in Dhaka, Bangladesh, serving the world." },
    { q: "How do I contact support?", a: "You can reach us at support@trymemomama.com for any technical or legal inquiries." }
  ];

  return (
    <section className="py-24 px-6 bg-slate-50 border-t border-slate-100 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
            <HelpCircle size={14} /> Knowledge Base
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">
             {lang === 'bn' ? 'সাধারণ জিজ্ঞাসাসমূহ' : 'Frequently Asked Questions'}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-3xl border border-slate-200 overflow-hidden transition-all duration-300">
              <button 
                onClick={() => setOpenContent(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-black text-slate-800 text-sm md:text-base leading-tight pr-4">
                  {index + 1}. {faq.q}
                </span>
                <ChevronDown className={`text-blue-600 transition-transform duration-500 shrink-0 ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-8 pt-0 text-slate-500 font-medium text-sm md:text-base leading-relaxed border-t border-slate-50 mt-2 bg-slate-50/30">
                   <div className="flex gap-4 items-start">
                      <div className="p-2 bg-blue-600 text-white rounded-lg mt-1"><MessageCircle size={16}/></div>
                      <p className="pt-1">{faq.a}</p>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-10 bg-slate-900 rounded-[3rem] text-center text-white space-y-4 shadow-2xl">
           <h3 className="text-xl font-bold uppercase tracking-widest text-blue-400">Still have questions?</h3>
           <p className="text-slate-400 font-medium">We're here to help you grow your business 24/7.</p>
           <a href="mailto:support@trymemomama.com" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all active:scale-95">Contact Support</a>
        </div>
      </div>
    </section>
  );
}