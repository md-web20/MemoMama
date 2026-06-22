import React from 'react';
import { ArrowLeft, ShieldCheck, Globe, Zap, Truck, BarChart3, Users, Award, Shield, CheckCircle, Database } from 'lucide-react';

export default function AboutUsLong({ setView }) {
  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-white font-sans text-slate-800 animate-in fade-in duration-700">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation */}
        <button 
          onClick={() => setView('home')} 
          className="flex items-center gap-2 text-blue-600 font-bold mb-12 hover:underline transition-all"
        >
          <ArrowLeft size={20} /> Back to Dashboard
        </button>

        {/* Hero Section */}
        <header className="mb-20 text-center">
           <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter mb-6 italic uppercase">
             Inside <span className="text-blue-600">MemoMama.</span>
           </h1>
           <p className="text-xl md:text-2xl font-bold text-slate-400 uppercase tracking-[0.2em]">
             The Global Authority in Digital Invoicing and SME Automation
           </p>
        </header>

        {/* Main SEO Article Content */}
        <div className="space-y-12 leading-relaxed text-lg md:text-xl border-t border-slate-100 pt-16">
          
          {/* Section 1: The Evolution of Invoicing */}
          <section className="space-y-6 text-justify">
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
              <Zap className="text-yellow-500" /> Digital Transformation of Traditional Bookkeeping
            </h2>
            <p className="first-letter:text-7xl first-letter:font-black first-letter:text-blue-600 first-letter:mr-3 first-letter:float-left">
              In the rapidly evolving landscape of modern commerce, the traditional paper-based bookkeeping system has become an obsolete bottleneck for growth. <strong>MemoMama</strong> stands at the forefront of this digital revolution, offering a sophisticated <strong>Digital Cash Memo Maker</strong> and <strong>Online Invoice Generator</strong> designed to empower small to medium-sized enterprises (SMEs). Our platform isn't just a simple billing tool; it is a comprehensive <strong>Business Management Ecosystem</strong> that addresses the core pain points of the 21st-century entrepreneur. From <strong>F-commerce sellers in Bangladesh</strong> to <strong>freelancers in Europe</strong>, our technology provides a universal solution for <strong>professional digital billing</strong> and <strong>automated financial tracking</strong>.
            </p>
            <p>
              The transition from manual entry to <strong>automated invoicing</strong> is no longer a luxury—it is a necessity for survival. When business owners search for a <strong>free invoice maker online</strong>, they are looking for more than just a PDF generator. They need a system that ensures <strong>data integrity</strong>, enhances <strong>brand credibility</strong>, and optimizes <strong>workflow efficiency</strong>. MemoMama was engineered specifically to meet these demands by providing a high-speed, <strong>minimalist SaaS interface</strong> that requires zero technical training.
            </p>
          </section>

          {/* Section 2: Core Product Deep Dive - Professional Invoicing */}
          <section className="grid md:grid-cols-2 gap-12 items-center bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
                Mastering Professional Branding through Smart Invoices
              </h2>
              <p className="text-base md:text-lg">
                Every transaction is a marketing opportunity. A <strong>custom-branded invoice</strong> with your shop logo and digital signature acts as a silent ambassador for your business. Our <strong>smart invoicing system</strong> supports <strong>21+ global languages</strong> and over <strong>20 international currencies</strong>, including BDT, USD, EUR, and INR. This versatility allows users to operate as a local shop or a <strong>global cross-border merchant</strong> without changing platforms.
              </p>
              <p className="text-base md:text-lg">
                Our algorithm handles complex tax structures with <strong>automated VAT calculations</strong> and <strong>dynamic discount applications</strong>. Whether you are providing a service or selling physical goods, our <strong>receipt generator</strong> ensures that the final output is optimized for <strong>A4 paper printing</strong> and high-quality <strong>digital sharing on WhatsApp</strong> and Messenger.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-2xl space-y-6 border border-blue-100">
               <div className="flex items-center gap-4">
                  <Award className="text-blue-600" size={32}/>
                  <h4 className="font-black text-slate-800 uppercase text-sm">Industry Standard Invoicing</h4>
               </div>
               <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  "By utilizing MemoMama’s <strong>cloud-synced invoicing</strong>, retailers can reduce billing time by 85%. Our <strong>PDF receipt maker</strong> is trusted by thousands of online entrepreneurs for its precision and elegant design aesthetics."
               </p>
            </div>
          </section>

          {/* Section 3: Inventory and Stock Management SEO Focus */}
          <section className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3 text-left">
              <Database className="text-blue-600" /> Advanced Inventory Management for Modern Retail
            </h2>
            <p>
              Inventory management is often the most neglected yet most critical part of a business. Small business owners often struggle with <strong>stock reconciliation</strong> and <strong>inventory tracking</strong>. MemoMama’s <strong>Inventory Management System</strong> solves this by offering a real-time <strong>stock monitoring dashboard</strong>. Every time you generate a <strong>digital memo</strong>, our backend automatically synchronizes with your <strong>product database</strong>, performing an <strong>instant stock deduction</strong>. 
            </p>
            <p>
              This seamless integration prevents the nightmare of "over-selling" items that are out of stock. For sellers looking for <strong>inventory software in Bangladesh</strong>, our tool offers unique features like <strong>cost-price tracking</strong> and <strong>low-stock alerts</strong>. You can easily manage your <strong>SKU (Stock Keeping Units)</strong>, track <strong>initial stock levels</strong>, and analyze which products are your top performers. This level of <strong>product lifecycle management</strong> was once only available to large corporations; today, it is at your fingertips for free.
            </p>
          </section>

          {/* Section 4: Logistics and Courier Integration - THE BD SEO KILLER */}
          <section className="bg-blue-600 text-white p-12 md:p-16 rounded-[4rem] shadow-2xl relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 opacity-10 rotate-12"><Truck size={300} /></div>
            <div className="relative z-10 space-y-8">
               <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">
                 Pioneering <span className="text-yellow-400">Courier Automation</span> in South Asia
               </h2>
               <p className="text-lg md:text-xl font-medium max-w-3xl opacity-90">
                 The <strong>e-commerce ecosystem in Bangladesh</strong> faces a unique challenge: logistics friction. Manually booking parcels on courier portals like <strong>Steadfast, Pathao, RedX, and Paperfly</strong> is a tedious, error-prone process. MemoMama bridges this gap with its revolutionary <strong>One-Click Courier Integration</strong>. 
               </p>
               <div className="grid md:grid-cols-2 gap-8 text-sm">
                  <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-md border border-white/20">
                     <h4 className="font-black uppercase mb-3 text-yellow-300">Local Logistics API</h4>
                     <p>Direct integration with <strong>BD Courier APIs</strong> allows for instant <strong>Tracking ID generation</strong>. No more double entries, no more mistakes in shipping addresses.</p>
                  </div>
                  <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-md border border-white/20">
                     <h4 className="font-black uppercase mb-3 text-yellow-300">Global blacklisting CRM</h4>
                     <p>Our <strong>Customer Relationship Management (CRM)</strong> tool features a <strong>Global Blacklist Search</strong>. Identify <strong>fraudulent customers</strong> and high <strong>parcel return rates</strong> before you ship.</p>
                  </div>
               </div>
            </div>
          </section>

          {/* Section 5: Financial Intelligence & Net Profit Analytics */}
          <section className="space-y-8">
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
              <BarChart3 className="text-green-600" /> Real-time Financial Intelligence & Profitability Reports
            </h2>
            <div className="text-lg text-slate-600 space-y-6">
              <p>
                Knowing your revenue is vanity; knowing your <strong>Net Profit</strong> is sanity. Most <strong>online billing apps</strong> only show you the total sales volume. MemoMama’s <strong>Financial Analytics Hub</strong> provides a dual-layer accounting perspective. By tracking both <strong>Gross Revenue</strong> and <strong>Business Expenses</strong>, our system provides an accurate calculation of your <strong>Net Income</strong>. 
              </p>
              <p>
                Users can categorize expenses into marketing, logistics, utility, and general costs, creating a <strong>comprehensive financial statement</strong>. For entrepreneurs who need to report their earnings, our <strong>CSV Export tool</strong> allows you to download your <strong>sales history</strong> and <strong>expense reports</strong> in an Excel-compatible format. This makes MemoMama the perfect <strong>lite-accounting software</strong> for tax preparation and business audits. 
              </p>
              <p>
                Our <strong>profitability dashboard</strong> uses advanced data visualization to show you trends over days, weeks, and months. This <strong>data-driven approach</strong> enables shop owners to make informed decisions about scaling their inventory or increasing their ad spend.
              </p>
            </div>
          </section>

          {/* Section 6: Security, Privacy & Reliability */}
          <section className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
              <Shield className="text-purple-600" /> Cybersecurity and Data Privacy for Small Businesses
            </h2>
            <p>
              In the age of digital threats, <strong>business data security</strong> is paramount. MemoMama utilizes a <strong>privacy-first architecture</strong>. While many competitors store sensitive business data on unsecured servers, we utilize <strong>Google Firebase’s encrypted cloud infrastructure</strong> for our registered users and <strong>local browser storage</strong> for our guest users. 
            </p>
            <p>
              We have implemented <strong>Two-Factor Authentication (2FA)</strong> and <strong>Secure Session Management</strong> to ensure that only you can access your <strong>financial records</strong> and <strong>customer database</strong>. Our <strong>Cloud History Sync</strong> ensures that you can access your <strong>digital memo books</strong> from any device—whether it's a mobile phone, a tablet, or a desktop computer—without ever losing a single transaction record.
            </p>
          </section>

          {/* Section 7: Why We Are Different (The Competitor Comparison) */}
          <section className="py-12 border-y border-slate-100">
             <h2 className="text-4xl font-black text-slate-900 text-center uppercase mb-12 italic">Why MemoMama Leads the <span className="text-blue-600">Market</span></h2>
             <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100">
                   <CheckCircle className="mx-auto text-blue-600 mb-4" />
                   <h5 className="font-black uppercase text-sm mb-3">No Registration</h5>
                   <p className="text-xs text-slate-500 font-bold leading-relaxed">Unlike other <strong>billing SaaS</strong>, we allow you to start creating invoices instantly. No forced sign-ups, just pure productivity.</p>
                </div>
                <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100">
                   <Globe2 className="mx-auto text-green-600 mb-4" />
                   <h5 className="font-black uppercase text-sm mb-3">Global Reach</h5>
                   <p className="text-xs text-slate-500 font-bold leading-relaxed">Supporting <strong>21+ regional dialects</strong>. We are the first <strong>digital memo tool</strong> to truly speak your language.</p>
                </div>
                <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100">
                   <Zap className="mx-auto text-yellow-500 mb-4" />
                   <h5 className="font-black uppercase text-sm mb-3">Lightning Speed</h5>
                   <p className="text-xs text-slate-500 font-bold leading-relaxed">Our <strong>SPA architecture</strong> ensures that generating an invoice takes less than 30 seconds. Speed is our core philosophy.</p>
                </div>
             </div>
          </section>

          {/* Section 8: Final Mission Statement */}
          <section className="text-center py-20">
             <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 uppercase tracking-tighter italic">Based in Dhaka. <span className="text-blue-600">Built for the World.</span></h2>
             <p className="max-w-4xl mx-auto text-slate-500 font-medium text-lg md:text-xl leading-relaxed">
               Founded by a team of visionary developers and entrepreneurs in <strong>Dhaka, Bangladesh</strong>, MemoMama is on a mission to democratize enterprise-grade business tools. We believe that every <strong>online entrepreneur</strong>, <strong>Instagram seller</strong>, and <strong>mom-and-pop shop</strong> deserves the same level of technology as a Fortune 500 company. We are committed to continuous <strong>SaaS innovation</strong>, ensuring that MemoMama remains the <strong>world's easiest invoicing and business management platform</strong> forever.
             </p>
          </section>

        </div>

        {/* Mega SEO Footer - Comprehensive Keyword Cloud for Google indexing */}
        <footer className="mt-32 pt-16 border-t border-slate-100 opacity-20 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
              <div className="flex flex-col gap-2">
                 <span>Online Invoice Generator</span>
                 <span>Digital Cash Memo Maker</span>
                 <span>Free Billing Software BD</span>
                 <span>Cloud Inventory Tracker</span>
                 <span>VAT Calculator Online</span>
              </div>
              <div className="flex flex-col gap-2">
                 <span>Steadfast Courier Booking</span>
                 <span>Pathao Courier Automation</span>
                 <span>RedX Shipping Tool</span>
                 <span>Blacklist Customer Check</span>
                 <span>E-commerce Logistics SaaS</span>
              </div>
              <div className="flex flex-col gap-2">
                 <span>Small Business Accounting</span>
                 <span>Revenue vs Expense Tracker</span>
                 <span>Net Profit Calculator</span>
                 <span>Business Management OS</span>
                 <span>F-Commerce Seller Tool</span>
              </div>
              <div className="flex flex-col gap-2">
                 <span>Multi-Language Invoicing</span>
                 <span>Global Currency Billing</span>
                 <span>2FA Secure Accounts</span>
                 <span>SME Productivity Hub</span>
                 <span>MemoMama Global SaaS</span>
              </div>
           </div>
           <p className="mt-12 text-center border-t pt-8">Developed and Managed by MemoMama Global Team - All Rights Reserved 2024</p>
        </footer>
      </div>
    </div>
  );
}

// আইকন ইমপোর্ট ফিক্স: 
function Globe2({className}) { return <Globe className={className} /> }