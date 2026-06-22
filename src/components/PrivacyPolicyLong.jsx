import React from 'react';
import { ArrowLeft, ShieldCheck, Lock, Database, Globe, FileText, Shield } from 'lucide-react';

export default function PrivacyPolicyLong({ setView }) {
  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-white font-sans text-slate-800 animate-in fade-in duration-700">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation */}
        <button 
          onClick={() => setView('home')} 
          className="flex items-center gap-2 text-blue-600 font-bold mb-12 hover:underline transition-all"
        >
          <ArrowLeft size={20} /> Back to Dashboard
        </button>

        {/* Header */}
        <header className="mb-20 text-left border-b border-slate-100 pb-12">
           <div className="flex items-center gap-5 mb-8">
              <div className="p-5 bg-blue-600 text-white rounded-[2rem] shadow-2xl">
                 <ShieldCheck size={50} />
              </div>
              <div>
                <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter italic uppercase leading-none">
                  Privacy <span className="text-blue-600">Policy.</span>
                </h1>
                <p className="text-sm font-black text-slate-400 uppercase tracking-[0.4em] mt-2">Enterprise SaaS Compliance Framework</p>
              </div>
           </div>
        </header>

        {/* --- START OF 10,000+ CHARACTER CONTENT --- */}
        <div className="space-y-16 leading-relaxed text-lg md:text-xl text-justify font-normal text-slate-700">
          
          <section className="space-y-8">
            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-4 border-l-8 border-blue-600 pl-6">
              1. Detailed Introduction and Platform Governance
            </h2>
            <p className="first-letter:text-8xl first-letter:font-black first-letter:text-blue-600 first-letter:mr-4 first-letter:float-left first-letter:leading-none">
              Welcome to <strong>MemoMama</strong>, the world's most sophisticated yet minimalist digital invoicing and business automation ecosystem. This Privacy Policy is a legally binding disclosure that governs your relationship with our platform, located at <strong>trymemomama.com</strong>. We understand that for small business owners, online retailers, freelancers, and SME entrepreneurs, data is the lifeblood of their operations. Our mission is to provide an impenetrable fortress for your sensitive financial records and customer information. In an era where big data is often exploited for predatory marketing, MemoMama stands as a lighthouse of decentralized privacy. We have engineered our architecture from the ground up to ensure that you, the user, remain the primary guardian of your business intelligence. 
            </p>
            <p>
              Our Privacy Policy outlines our uncompromising commitment to securing the business intelligence and personal information of entrepreneurs who use our Digital Invoicing SaaS Platform. In an era where big data is often exploited, MemoMama stands as a sanctuary of decentralized privacy. We utilize end-to-end encryption and local-first storage to ensure that your financial records, inventory data, and customer CRM remain under your absolute control. Whether you are an F-commerce seller in Bangladesh or a startup founder in the USA, our protocols are designed to exceed international standards like GDPR and CCPA.
            </p>
          </section>

          <section className="bg-slate-50 p-12 md:p-20 rounded-[4rem] border border-slate-100 shadow-inner relative overflow-hidden">
            <div className="relative z-10 space-y-10">
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-4">
                <Database className="text-blue-600" /> 2. Granular Data Collection Methodology
              </h2>
              <p className="text-xl font-medium text-slate-600 italic">
                Our data transparency initiative ensures you know exactly what happens to every byte of information. We categorize data into four distinct layers:
              </p>
              
              <div className="grid md:grid-cols-2 gap-12 text-base">
                <div className="space-y-4">
                  <h4 className="font-black text-blue-600 uppercase tracking-widest">A. Authentication Data</h4>
                  <p>
                    To maintain a secure SaaS environment, we use Google Firebase Auth. This collects your primary Email Address and machine-generated Unique ID (UID). This data is the anchor for your Cloud History Sync. We never store plain-text passwords; all authentication is handled through encrypted tokens that prevent identity theft and unauthorized account access. Every login session is monitored to ensure that your business account remains safe from brute-force attacks.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-black text-blue-600 uppercase tracking-widest">B. Business Asset Management</h4>
                  <p>
                    Your Business Logo and Digital Signature are critical for Professional Branding. MemoMama converts these files into Base64 encrypted strings. They are stored in an isolated bucket within the Google Cloud infrastructure. Access to these assets is restricted by Firebase Security Rules, ensuring that only your validated session can retrieve or modify them for your professional invoicing needs. We do not use these images for any secondary commercial purposes.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-black text-blue-600 uppercase tracking-widest">C. Operational Sales Records</h4>
                  <p>
                    When you create an invoice, you enter recipient details like Customer Name, Mobile Number, and Shipping Address. We categorize this as "Zero-Knowledge Data." While our system processes this to generate your PDF memo, our internal employees and developers are strictly prohibited from viewing or accessing your specific customer CRM records for any secondary usage or data selling. Your sales figures, product prices, and customer lists are exclusively yours.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-black text-blue-600 uppercase tracking-widest">D. Metadata & Telemetry</h4>
                  <p>
                    To optimize our Vite-based frontend and React performance, we collect anonymous telemetry. This includes browser fingerprints, load times, and error logs via Cloudflare and Google Analytics 4. This data helps us scale MemoMama to support 21+ global languages while maintaining sub-second response times for SME billing software. We do not use this data to identify individual business owners, but rather to improve the overall stability of the platform.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-4 border-l-8 border-green-500 pl-6">
              <Lock className="text-blue-600" size={32} /> 3. Advanced Encryption and the Decentralized Storage Model
            </h2>
            <p>
              One of MemoMama's core innovations is our decentralized data management approach. We understand that financial records are sensitive, and centralization creates a single point of failure. Our hybrid model is designed to protect your revenue reports and inventory stock levels from large-scale data breaches through the following protocols:
            </p>
            <div className="space-y-6 bg-white border-2 border-slate-50 p-10 rounded-[3rem] shadow-sm">
               <p><strong>1. Local-First Sovereignty:</strong> For guest users (those who use the app without logging in), MemoMama utilizes the W3C standard LocalStorage and IndexedDB technology within your specific web browser. This means your invoice data and customer phone numbers never leave your physical device. You are the absolute owner and guardian of this data. However, please be advised that clearing your browser cache or switching devices will result in permanent data loss in this mode.</p>
               <p><strong>2. Encrypted Cloud Synchronization:</strong> For registered entrepreneurs and Pro users, we enjoy the benefits of Real-time Cloud Synchronization. Your sales history is synced to Google Cloud Firestore servers located in high-security data centers. We implement 256-bit AES encryption at rest and TLS/SSL encryption in transit to protect your data from unauthorized access or packet sniffing. This ensures 99.9% data availability across all your devices.</p>
               <p><strong>3. Cryptographic Hashing:</strong> All sensitive identifiers are put through cryptographic hashing functions. This prevents "Database Harvesting" where an attacker tries to collect lists of shop owners. Your business remains your private matter.</p>
            </div>
          </section>

          <section className="space-y-8 bg-slate-900 text-white p-12 md:p-24 rounded-[5rem] shadow-2xl relative overflow-hidden">
             <div className="absolute -bottom-20 -right-20 p-20 opacity-10 rotate-12"><Globe size={400} /></div>
             <div className="relative z-10 space-y-10">
                <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">
                  4. International Data <span className="text-blue-400">Sovereignty.</span>
                </h2>
                <div className="space-y-8 text-xl text-slate-300 font-medium max-w-4xl">
                   <p>
                     MemoMama is a Global SaaS entity. We strictly adhere to the General Data Protection Regulation (GDPR) for our users in the European Union, the California Consumer Privacy Act (CCPA) for North America, and the Digital Personal Data Protection Act for our users in South Asia and Bangladesh.
                   </p>
                   <p>
                     We believe in the Right to Portability. You should never be "locked-in" to a platform. Our Revenue and Expense Tracker includes a CSV/Excel Export feature, allowing you to take your business data whenever you wish. This is part of our commitment to user sovereignty. Furthermore, we comply with Standard Contractual Clauses (SCCs) for the transfer of data between international borders, ensuring that PII data is treated with the same legal rigor across all global territories where MemoMama is active.
                   </p>
                </div>
             </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-4 border-l-8 border-red-600 pl-6">
              5. Logistics APIs and Blacklist Transparency
            </h2>
            <p>
              To offer a world-class business automation suite, we collaborate with several industry leaders in logistics. We ensure that our partners adhere to the same ethical data standards as MemoMama.
            </p>
            <div className="grid md:grid-cols-2 gap-10">
               <div className="p-8 bg-slate-50 rounded-[3rem] border border-slate-100">
                  <h4 className="font-black text-slate-800 uppercase text-xs mb-4">A. One-Click Courier Booking</h4>
                  <p className="text-sm text-slate-500 font-bold leading-relaxed">
                    When you utilize our automated courier booking for <strong>Steadfast, Pathao, or RedX</strong>, we transmit only the minimum required dataset: Name, Phone, and Delivery Address. This data is sent via an encrypted JSON payload to the courier's secure endpoint. MemoMama does not store these details for secondary ad targeting or profile building.
                  </p>
               </div>
               <div className="p-8 bg-slate-50 rounded-[3rem] border border-slate-100">
                  <h4 className="font-black text-slate-800 uppercase text-xs mb-4">B. Community Blacklist Governance</h4>
                  <p className="text-sm text-slate-500 font-bold leading-relaxed">
                    Our Global Blacklist Database allows users to report fraudulent orders or parcel returns (RTO). We store only the unique phone number and a factual reason code. To protect consumer privacy, we never share the customer's full identity or social profiles in this shared repository. This community intelligence helps protect sellers from financial loss.
                  </p>
               </div>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">6. Comprehensive User Rights and Legal Redressal</h2>
            <div className="space-y-6 text-lg">
              <p>As a user of trymemomama.com, you are granted the following irrevocable rights over your business financial data and shop profile:</p>
              <ul className="grid md:grid-cols-2 gap-6">
                <li className="p-6 bg-slate-50 rounded-2xl border border-slate-100 font-bold text-sm">Right to Access: Request a copy of all data stored about your business.</li>
                <li className="p-6 bg-slate-50 rounded-2xl border border-slate-100 font-bold text-sm">Right to Erasure: Request a "Full System Wipe" of your account.</li>
                <li className="p-6 bg-slate-50 rounded-2xl border border-slate-100 font-bold text-sm">Right to Portability: Export your sales history to Excel/CSV anytime.</li>
                <li className="p-6 bg-slate-50 rounded-2xl border border-slate-100 font-bold text-sm">Right to Object: Opt-out of any non-essential analytical tracking.</li>
              </ul>
              <p>To exercise any of these rights, simply email our Data Protection Officer (DPO) at <strong>support@trymemomama.com</strong>. We guarantee a response within 48-72 business hours.</p>
            </div>
          </section>

          <section className="text-center py-20 border-t border-slate-100 space-y-10">
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-[0.3em] flex items-center justify-center gap-4 italic">
               <LifeBuoy className="text-blue-600" /> Global Legal Contact
            </h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-10">
               <div className="space-y-2">
                 <p className="text-[10px] font-black text-slate-400 uppercase">Support Email</p>
                 <p className="text-lg font-bold text-blue-600 underline">support@trymemomama.com</p>
               </div>
               <div className="space-y-2">
                 <p className="text-[10px] font-black text-slate-400 uppercase">DPO / Founder</p>
                 <p className="text-lg font-bold text-slate-800">Md. Faruk Biswas</p>
               </div>
               <div className="space-y-2">
                 <p className="text-[10px] font-black text-slate-400 uppercase">Global HQ</p>
                 <p className="text-lg font-bold text-slate-800">Dhaka, Bangladesh</p>
               </div>
            </div>
          </section>

        </div>

        {/* --- MASSIVE SEO KEYWORD FOOTER --- */}
        <footer className="mt-32 pt-24 border-t border-slate-100 opacity-20 text-[7px] md:text-[9px] font-black uppercase tracking-[0.5em] text-slate-400 text-center leading-[3.5]">
           <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
              <span>Secure Digital Invoicing SaaS</span><span>Privacy Policy Invoicing Tool</span><span>Encrypted Business Database</span><span>No-Login Digital Memo App</span><span>GDPR Compliant Billing Tool</span><span>Firebase AES-256 Encryption</span><span>Cloud Sync Data Safety</span><span>F-Commerce Seller Security</span><span>Digital Receipt Storage Hub</span><span>Business Account Integrity</span><span>Anonymous Telemetry Analysis</span><span>Merchant CRM Data Rights</span><span>Logistics API Security BD</span><span>Steadfast Data Protection</span><span>Pathao Courier Privacy Hub</span><span>Blacklist Database Ethics</span><span>E-commerce Fraud Prevention</span><span>PII Data Masking System</span><span>SME Cybersecurity Standard</span><span>ISO 27001 SaaS Protocol</span><span>Zero Knowledge Bookkeeping</span><span>Minimalist SaaS Privacy</span><span>Digital Signature Security</span><span>Global Currency Encryption</span><span>Automated Billing Logic</span><span>SaaS Revenue Expense Safety</span><span>Net Profit Calculator Security</span><span>Multi-Language Invoicing Privacy</span><span>Cross-Border Trade Data Hub</span><span>Pro Invoicing Data Sync</span><span>Online Account Erasure Right</span><span>Excel Export Data Portability</span><span>SME Productivity Hub Privacy</span><span>MemoMama Legal Framework</span><span>Business Strategy Data Safety</span><span>Inventory Stock Data Privacy</span><span>Retail Billing Security BD</span><span>Cloudflare DDoS WAF Protection</span><span>Encrypted Transaction History</span><span>End-to-End Business Hub</span><span>Digital Smart Memo Security</span><span>Accounting Software GDPR</span><span>SME Finance Transparency</span><span>Cloud-Based Memo Book Privacy</span><span>F-Commerce Automation Logic</span><span>Online Business Audit Safety</span><span>Secure Payment Webhook Flow</span><span>Merchant Database Isolation</span><span>Cross-Device Cloud Syncing</span><span>Invoice Data Sovereignty</span><span>GDPR Compliance Officer</span><span>Legal SME Tech Framework</span>
           </div>
           <p className="mt-24 font-black text-[12px] tracking-[2.5em] italic opacity-50">END OF PRIVACY DISCLOSURE</p>
        </footer>

      </div>
    </div>
  );
}

// আইকন ফিক্স (যাতে কোনোভাবেই ক্র্যাশ না করে)
function LifeBuoy(props) { return <FileText {...props} /> }