import React from 'react';
import { ArrowLeft, Mail, MapPin, ShieldCheck, FileText, Info, Globe } from 'lucide-react';

export default function StaticPages({ type, setView }) {
  
  // কন্টেন্টগুলো শুধুমাত্র ইংরেজিতে রাখা হলো (International Standard)
  const pages = {
    about: {
      icon: <Info />,
      title: "About MemoMama",
      content: `Welcome to MemoMama, the next-generation digital invoicing ecosystem designed specifically for the modern global entrepreneur. 

      At MemoMama, we understand that for small to medium-sized business owners, every second counts. Managing physical memo books, calculating taxes manually, and keeping track of transaction history can be overwhelming. That is why we built MemoMama – to simplify your billing process and give your business a professional digital edge.

      Our Mission: 
      Our mission is to empower over 10 million small businesses worldwide with tools that were previously only available to large enterprises. We believe that professional branding, automated calculations, and secure data management should be accessible to everyone, regardless of their technical background.

      What makes us unique?
      Unlike other complicated accounting software, MemoMama focuses on extreme minimalism and speed. We offer:
      - Multi-lingual support for 25+ global languages.
      - Smart currency switching for cross-border trade.
      - Privacy-first architecture: We don't store your sensitive business data on our servers unless you sync it to the cloud.
      - High-end professional invoice designs optimized for A4 printing.

      Based in Dhaka, Bangladesh, our team is committed to continuous innovation, ensuring that MemoMama remains the world's easiest invoicing platform.`
    },

    privacy: {
      icon: <ShieldCheck />,
      title: "Privacy Policy",
      content: `Last Updated: May 2024

      At MemoMama (trymemomama.com), we take your privacy seriously. This Privacy Policy describes how your personal information is collected, used, and shared when you visit or use our services.

      1. Information We Collect:
      When you register for an account, we collect basic profile information such as your Email Address, Shop Name, and Phone Number. For our Pro users, we may also store your shop logo and digital signature as Base64 strings within our secured Firebase database.

      2. Local Storage and Data Safety:
      To ensure the fastest performance and maximum privacy, MemoMama utilizes your browser's "Local Storage" for temporary invoice data. This means that while you are creating an invoice, the data resides on your own device. Cloud syncing is only performed for registered users to ensure cross-device accessibility.

      3. Third-Party Services:
      We use trusted third-party services to enhance our platform:
      - Google Firebase: For secure authentication and database management.
      - LemonSqueezy: Our "Merchant of Record" for international payment processing.
      - Google AdSense: To serve advertisements for our free-tier users.
      - Cloudflare: For website performance and security.

      4. Data Protection Rights (GDPR/CCPA):
      We are committed to international data protection standards. Users have the right to access, delete, or modify their data at any time through the Profile Settings. We do not sell your data to third-party marketers.

      5. Security:
      All communications between your browser and our servers are encrypted using industry-standard SSL (Secure Sockets Layer) technology.`
    },

    terms: {
      icon: <FileText />,
      title: "Terms of Service",
      content: `1. Acceptance of Terms:
      By accessing and using trymemomama.com, you agree to comply with and be bound by these Terms of Service. If you do not agree, please refrain from using our tool.

      2. Description of Service:
      MemoMama is a SaaS-based invoice generation tool. The service is provided "as is." While we strive for 100% uptime and calculation accuracy, we are not liable for any business loss resulting from system downtime or user-input errors.

      3. User Conduct:
      Users are prohibited from using MemoMama for:
      - Generating fraudulent or illegal financial documents.
      - Storing prohibited or copyright-infringing images as logos.
      - Attempting to hack or disrupt the Firebase backend infrastructure.

      4. Subscription and Payments:
      Subscriptions are processed through LemonSqueezy. By subscribing to a Pro Plan (Monthly/Yearly), you agree to their billing terms. You may cancel your subscription at any time. Refunds are governed by our refund policy provided at the checkout page.

      5. Limitation of Liability:
      In no event shall MemoMama or its owners be liable for any indirect, incidental, special, or consequential damages arising out of the use of our invoicing tool.

      6. Changes to Terms:
      We reserve the right to update these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.`
    },

    contact: {
      icon: <Mail />,
      title: "Contact Us",
      content: "Have questions or need technical support? Our team is ready to help you grow your business."
    }
  };

  const page = pages[type] || pages.about;

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-white font-sans animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => setView('home')} className="flex items-center gap-2 text-blue-600 font-bold mb-12 hover:underline">
          <ArrowLeft size={20} /> Back to Home
        </button>
        
        <div className="flex items-center gap-5 mb-12 border-b border-slate-100 pb-10">
           <div className="p-5 bg-blue-50 text-blue-600 rounded-[2rem] shadow-inner">{page.icon}</div>
           <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">{page.title}</h1>
        </div>

        {/* Detailed Content Area */}
        <div className="text-slate-600 leading-relaxed text-lg md:text-xl space-y-8">
          {page.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="whitespace-pre-line first-letter:text-3xl first-letter:font-bold first-letter:text-blue-600">
              {paragraph.trim()}
            </p>
          ))}
          
          {type === 'contact' && (
  <div className="grid md:grid-cols-2 gap-8 mt-12">
     <div 
        onClick={() => {
          navigator.clipboard.writeText("support@trymemomama.com");
          alert("Email Address Copied to Clipboard!");
          window.location.href = "mailto:support@trymemomama.com";
        }}
        className="p-8 bg-slate-50 rounded-[3rem] border border-slate-100 hover:shadow-xl transition-all cursor-pointer group"
     >
        <Mail className="text-blue-600 mb-4 group-hover:scale-110 transition-transform" size={32} />
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Email Support</p>
        <p className="font-bold text-xl text-slate-800 border-b-2 border-transparent group-hover:border-blue-600 inline-block">
          support@trymemomama.com
        </p>
        <p className="text-[10px] text-blue-500 font-bold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Click to Copy & Send Email</p>
     </div>
     
     <div className="p-8 bg-slate-50 rounded-[3rem] border border-slate-100 hover:shadow-xl transition-all">
        <MapPin className="text-blue-600 mb-4" size={32} />
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Global HQ</p>
        <p className="font-bold text-xl text-slate-800">Dhaka, Bangladesh</p>
     </div>
  </div>
)}
        </div>

        {/* Professional Footer Seal */}
        <div className="mt-32 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 opacity-50">
           <div className="flex items-center gap-3 text-slate-400 font-bold text-xs uppercase tracking-widest">
              <ShieldCheck size={18} className="text-green-500" /> Secure Business Verified
           </div>
           <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
              <Globe size={18} /> Global SaaS Standard
           </div>
        </div>
      </div>
    </div>
  );
}