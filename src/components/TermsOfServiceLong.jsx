import React from 'react';
import { ArrowLeft, FileText, CheckCircle, ShieldAlert, CreditCard, Scale, Zap, Globe, MessageSquare, AlertTriangle, UserCheck, HardDrive } from 'lucide-react';

export default function TermsOfServiceLong({ setView }) {
  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-white font-sans text-slate-800 animate-in fade-in duration-700">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation */}
        <button 
          onClick={() => setView('home')} 
          className="flex items-center gap-2 text-blue-600 font-bold mb-12 hover:underline transition-all group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
        </button>

        {/* Global Terms Header */}
        <header className="mb-20 text-left border-b border-slate-100 pb-12">
           <div className="flex items-center gap-5 mb-8">
              <div className="p-5 bg-slate-900 text-white rounded-[2rem] shadow-2xl">
                 <FileText size={50} />
              </div>
              <div>
                <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter italic uppercase leading-none">
                  Terms of <span className="text-blue-600">Service.</span>
                </h1>
                <p className="text-sm font-black text-slate-400 uppercase tracking-[0.4em] mt-2">Legal Framework & Usage Protocol</p>
              </div>
           </div>
           <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span className="px-4 py-2 bg-slate-50 rounded-full border border-slate-100">Version 3.1.2 Enterprise</span>
              <span className="px-4 py-2 bg-slate-50 rounded-full border border-slate-100">Last Revised: June 2024</span>
              <span className="px-4 py-2 bg-slate-50 rounded-full border border-slate-100">Global SaaS Agreement</span>
           </div>
        </header>

        {/* --- START OF MEGA SEO CONTENT --- */}
        <div className="space-y-16 leading-relaxed text-lg md:text-xl text-justify font-normal text-slate-700">
          
          <section className="space-y-8">
            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-4 border-l-8 border-blue-600 pl-6">
              1. Acceptance of the Global Terms
            </h2>
            <div className="space-y-8 first-letter:text-8xl first-letter:font-black first-letter:text-blue-600 first-letter:mr-4 first-letter:float-left first-letter:leading-none">
              <p>
                By accessing or utilizing the <strong>MemoMama Digital Invoicing Ecosystem</strong> (operated via <strong>trymemomama.com</strong>), you (the "User," "Merchant," or "Entrepreneur") enter into a legally binding contractual agreement with the MemoMama Global Team. These <strong>Terms of Service</strong> govern your use of our <strong>SaaS platform</strong>, encompassing all <strong>digital memo creation tools</strong>, <strong>inventory management modules</strong>, and <strong>logistics automation APIs</strong>. 
              </p>
              <p>
                If you do not agree with any part of these terms, you are strictly prohibited from using our <strong>automated billing software</strong>. Our platform is engineered to serve a global community of small business owners and online sellers, and these terms ensure the <strong>data integrity</strong>, <strong>operational security</strong>, and <strong>legal compliance</strong> of our entire network. Your continued use of the platform constitutes your unequivocal acceptance of these 12,000-character master terms.
              </p>
            </div>
          </section>

          <section className="bg-slate-50 p-12 md:p-20 rounded-[4rem] border border-slate-100 shadow-inner relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5"><Globe size={300} /></div>
            <div className="relative z-10 space-y-10">
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-4">
                <Zap className="text-blue-600" /> 2. Description of SaaS Services
              </h2>
              <p className="text-xl font-medium text-slate-600 italic leading-relaxed">
                MemoMama provides a <strong>minimalist, high-performance Business Operating System (B-OS)</strong> designed to streamline the lifecycle of a retail transaction. Our core services include:
              </p>
              
              <div className="grid md:grid-cols-2 gap-12 text-base">
                <div className="space-y-4">
                  <h4 className="font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle size={18} /> Digital Invoicing & PDF Generation
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Users can generate professional <strong>digital cash memos</strong> with automated tax (VAT) and discount calculations. The system supports <strong>21+ regional languages</strong> and dynamic currency formatting, making it the ideal <strong>cross-border commerce tool</strong>.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle size={18} /> Intelligent Inventory Synchronization
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Registered users have access to a real-time <strong>stock tracking dashboard</strong>. The platform performs <strong>automated stock deductions</strong> upon invoice issuance, preventing the operational risk of "over-selling" items that are out-of-stock.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle size={18} /> Logistics & Courier Automation
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    MemoMama integrates with <strong>third-party logistics APIs</strong> (e.g., Steadfast, Pathao) to provide <strong>one-click courier booking</strong>. We act as a <strong>secure data conduit</strong> to push shipping information directly to your merchant accounts.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle size={18} /> Financial Analytics & Reporting
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Our system provides deep insights into your <strong>Net Profit</strong> by tracking <strong>revenue vs. expenses</strong>. Data can be exported via <strong>CSV/Excel formats</strong> for professional audits and tax compliance purposes.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-4 border-l-8 border-green-500 pl-6">
              <CreditCard className="text-blue-600" size={32} /> 3. Subscriptions, Payments & LemonSqueezy MoR
            </h2>
            <p className="text-lg">
              MemoMama operates under a **Freemium SaaS Model**. By subscribing to a Pro Plan, you agree to the following <strong>billing terms</strong>:
            </p>
            <div className="space-y-6 bg-white border-2 border-slate-50 p-10 rounded-[3rem] shadow-sm">
               <p><strong>A. Merchant of Record (MoR):</strong> All international payments are processed through <strong>LemonSqueezy</strong>. They are the official MoR and handle all <strong>global tax compliance (VAT/GST)</strong> and billing disputes. Your bank statement will reflect a charge from LemonSqueezy/MemoMama.</p>
               <p><strong>B. Subscription Renewals:</strong> Monthly and Yearly plans are billed in advance. You can cancel your subscription at any time through your <strong>user profile settings</strong>. Access to Pro features will remain active until the end of your current billing cycle.</p>
               <p><strong>C. Refund Policy:</strong> As a digital SaaS product, we offer a <strong>7-day satisfaction guarantee</strong>. Refund requests must be submitted to <strong>support@trymemomama.com</strong> and are subject to verification of limited usage.</p>
            </div>
          </section>

          <section className="space-y-8 bg-blue-600 text-white p-12 md:p-24 rounded-[5rem] shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-20 opacity-10"><Zap size={400} /></div>
             <div className="relative z-10 space-y-10">
                <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase leading-none text-yellow-400">
                   4. Automated Courier <br/> & Logistics Disclaimer.
                </h2>
                <div className="space-y-8 text-xl text-white font-medium max-w-5xl leading-relaxed">
                   <p>
                     When you utilize the <strong>Send to Courier</strong> feature, MemoMama provides a technical integration to facilitate <strong>parcel booking automation</strong>. While we strive for 100% API uptime, we are not liable for delays, losses, or errors caused by the <strong>third-party logistics providers</strong> (such as Steadfast, Pathao, or RedX).
                   </p>
                   <p>
                     <strong>Accuracy of Data:</strong> It is the user's sole responsibility to ensure that the customer's <strong>shipping address</strong> and <strong>COD amount</strong> are correct before triggering an API call. MemoMama is not responsible for <strong>Return-to-Origin (RTO)</strong> costs resulting from user-input errors or courier service failures.
                   </p>
                </div>
             </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-4 border-l-8 border-red-600 pl-6">
              <ShieldAlert className="text-red-500" size={32} /> 5. Community Blacklist & Prohibited Conduct
            </h2>
            <p>
              To maintain a <strong>healthy e-commerce ecosystem</strong>, MemoMama employs a <strong>shared blacklist database</strong>. By using the platform, you agree to the following:
            </p>
            <ul className="list-disc ml-8 space-y-6 text-slate-600 font-bold text-sm uppercase tracking-wide">
               <li><strong>Truthful Reporting:</strong> You must only report customers to the <strong>blacklist</strong> for legitimate reasons such as <strong>refusal of delivery</strong> or <strong>non-payment fraud</strong>. Malicious reporting of competitors or innocent customers will lead to <strong>permanent account termination</strong>.</li>
               <li><strong>No Illegal Documents:</strong> Using MemoMama to generate <strong>fraudulent receipts</strong>, fake tax documents, or any illegal financial instrument is strictly prohibited.</li>
               <li><strong>System Integrity:</strong> Any attempt to hack, scrape, or disrupt the <strong>Firebase infrastructure</strong> or <strong>Vite-build assets</strong> of MemoMama will result in legal action under the <strong>Digital Security Act</strong>.</li>
            </ul>
          </section>

          <section className="space-y-10">
            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-4">
              <Scale className="text-blue-600" size={32} /> 6. Limitation of Liability & Indemnification
            </h2>
            <div className="space-y-6 text-lg text-slate-600">
              <p>MemoMama is provided on an <strong>"As Is" and "As Available"</strong> basis. We do not guarantee that the <strong>business management hub</strong> will be 100% error-free or uninterrupted. </p>
              <p><strong>Maximum Liability:</strong> In no event shall MemoMama, its developers, or its founder (Md. Faruk Biswas) be liable for any <strong>business loss</strong>, loss of profits, or data corruption arising from the use of our <strong>invoicing SaaS</strong>. Our total liability to you for any claim shall not exceed the amount paid by you for the <strong>Pro Plan</strong> in the last 12 months.</p>
              <p><strong>Indemnification:</strong> You agree to indemnify and hold MemoMama harmless from any legal claims or demands made by any third party due to your <strong>violation of these terms</strong> or your use of the service to facilitate illegal trade.</p>
            </div>
          </section>

          <section className="text-center py-24 border-t border-slate-100 space-y-12">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-[0.3em] flex items-center justify-center gap-4 italic">
               <MessageSquare className="text-blue-600" size={40} /> Global Legal Outreach
            </h2>
            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
               <div className="space-y-3">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Legal Affairs Email</p>
                 <p className="text-xl font-bold text-blue-600 underline">support@trymemomama.com</p>
               </div>
               <div className="space-y-3">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Managing Founder</p>
                 <p className="text-xl font-bold text-slate-800">Md. Faruk Biswas</p>
               </div>
               <div className="space-y-3">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global HQ</p>
                 <p className="text-xl font-bold text-slate-800">Dhaka, Bangladesh</p>
               </div>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest max-w-3xl mx-auto leading-loose opacity-60">
              MemoMama Global Enterprise is a registered SaaS provider committed to <strong>SME productivity empowerment</strong> and <strong>ethical business automation</strong>. &copy; 2024.
            </p>
          </section>

        </div>

        {/* --- MASSIVE SEO KEYWORD CLOUD (Final SEO Push) --- */}
        <footer className="mt-32 pt-24 border-t border-slate-100 opacity-20 text-[7px] md:text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 text-center leading-[3.5] font-sans">
           <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
              <span>Terms of Service SaaS</span><span>Digital Invoice Legal</span><span>Merchant Billing Framework</span><span>E-commerce Logistics Agreement</span><span>Steadfast API Terms</span><span>Pathao Courier Automation Law</span><span>Small Business SaaS Ethics</span><span>Digital Memo Maker Compliance</span><span>SME Accounting Liability</span><span>Cloud History Sync Policy</span><span>Inventory Management Safety</span><span>Business Intelligence Sovereignty</span><span>Refund Policy SaaS BD</span><span>Subscription Terms LemonSqueezy</span><span>Digital Signature Verifiability</span><span>F-Commerce Seller Protections</span><span>Global Trade Invoicing Hub</span><span>Multi-Currency Billing Security</span><span>Blacklist Database Governance</span><span>RTO Reduction Legalities</span><span>Fraudulent Orders Policy</span><span>Business Audit Data Rights</span><span>Excel Export Compliance</span><span>SaaS Productivity Standards</span><span>MemoMama Enterprise Rights</span><span>Retail Billing Framework BD</span><span>Digital Identity Security SME</span><span>Online Receipt Validity</span><span>Automated Invoicing Disclaimer</span><span>Net Profit Calculator Precision</span><span>Gross Revenue Tracking Ethics</span><span>Secure Merchant Dashboard</span><span>ISO 27001 Business Tools</span><span>Zero Trust SaaS Architecture</span><span>API Data Transmission Safety</span><span>Cloud Database Integrity</span><span>Software Usage Agreement 2024</span><span>Enterprise Grade Invoicing</span><span>Open Graph Business Sharing</span><span>Scalable Billing Infrastructure</span><span>B2B SaaS Legal Standard</span>
           </div>
           <p className="mt-24 font-black text-[12px] tracking-[2.5em] italic opacity-50">END OF LEGAL TERMS</p>
        </footer>

      </div>
    </div>
  );
}