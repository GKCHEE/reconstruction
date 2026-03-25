import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { collection, addDoc } from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import { db } from './firebase';
import { HeartPulse, Scale, ShieldAlert, Fingerprint, Activity, Banknote, MapPin, Search, FileText } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      // Save directly to Firestore via imported db
      if (db) {
        await addDoc(collection(db, 'messages'), {
          ...formData,
          timestamp: new Date()
        });
      }

      // Send via EmailJS using environment variables
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus('Message sent successfully. Thank you.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('Failed to send message. Please ensure environment variables are configured.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-[#10B981] selection:text-white">
      {/* 1. Hero Section: The Molecular Threshold */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-sunrise-gradient opacity-10 z-0 pointer-events-none"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#10B981] blur-[180px] rounded-full opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#F59E0B] blur-[180px] rounded-full opacity-20 pointer-events-none"></div>
        
        <motion.div 
          className="relative z-10 max-w-5xl mx-auto text-center"
          initial="hidden" animate="visible" variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#10B981]/30 bg-[#10B981]/10 text-[#10B981] text-sm font-semibold tracking-widest uppercase">
              <Activity className="w-4 h-4" /> The Molecular Threshold
            </span>
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tight">
            What defines a human? <br />
            <span className="text-sunrise-gradient drop-shadow-sm">Science says 4 Genes. I survive on 2.</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg md:text-2xl text-slate-300 leading-relaxed max-w-4xl mx-auto font-light">
            At the fundamental cellular level, human life is formed by inheriting four alpha-globin genes—two from each parent—to build healthy, oxygen-rich blood. I was born with <strong className="text-white font-semibold">Heterozygous Alpha-thalassemia-1 (SEA Deletion)</strong>. Two of my genes are completely depleted, meaning I have operated on exactly 50% biological capacity since my first breath.
          </motion.p>
          <motion.p variants={fadeInUp} className="mt-8 text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto">
            If I had lost more than two genes, I would not have survived birth. I live on the exact biological threshold of survival. This missing genetic code has left me fighting a lifelong, invisible battle against Hypochromic Microcytic Anemia. My red blood cells are unnaturally small, pale, and structurally malformed, perpetually failing to deliver adequate oxygen to my brain and organs.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. The Biological Tax: The Acuity Gap */}
      <section className="py-24 px-6 bg-slate-800/40 relative border-t border-slate-800/50">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 variants={fadeInUp} className="flex items-center gap-4 text-3xl md:text-5xl font-bold mb-10 text-white">
            <HeartPulse className="text-[#F59E0B] w-10 h-10" /> The Science of Survival at 50% Capacity
          </motion.h2>
          <div className="space-y-8 text-lg md:text-xl text-slate-300 leading-relaxed font-light">
            <motion.div variants={fadeInUp} className="border-l-4 border-slate-700 pl-6">
              Living with Alpha-thalassemia-1 is a permanent biological constraint. Because my blood cells are malformed—showing up as "target cells," "teardrop cells," and "crenated cells" with jagged edges under a microscope—my oxygen delivery system is profoundly inefficient. My lungs frequently hyperventilate, desperately trying to force oxygen into a system that mathematically cannot carry it, while my heart pulls blood away from my limbs to protect my vital organs.
            </motion.div>
            <motion.div variants={fadeInUp} className="border-l-4 border-slate-700 pl-6">
              This creates a <strong className="text-white">"Many Mouths to Feed" nutritional crisis</strong>. To think, move, and function, my body consumes caloric energy and specialized nutrients at an accelerated rate just to break even. I am biologically "expensive" to maintain.
            </motion.div>
            <motion.div variants={fadeInUp} className="relative p-8 bg-slate-900/80 rounded-2xl border border-slate-700 shadow-2xl backdrop-blur-sm mt-12">
              <div className="absolute -top-4 -left-4 bg-[#F59E0B] text-slate-900 px-4 py-1 rounded-full font-bold text-sm shadow-lg">The Acuity Gap</div>
              <p className="text-white font-medium leading-relaxed">
                The most devastating cost was the Loss of Acuity. Insight, wisdom, and risk assessment are products of a nurtured, oxygenated mind. For decades, chronic hypoxia (oxygen starvation) created an unyielding brain fog. I did not lack ambition; I lacked the oxygen to fuel the prefrontal cortex—the part of the brain responsible for spotting red flags. This biological starvation created the perfect blind spot for a predator to exploit.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 3. The Stolen Decades: Forensic Fraud Analysis */}
      <section className="py-24 px-6">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 variants={fadeInUp} className="flex items-center gap-4 text-3xl md:text-5xl font-bold mb-10 text-white">
            <Search className="text-[#10B981] w-10 h-10" /> The Exploitation of Vulnerability
          </motion.h2>
          <div className="space-y-8 text-lg md:text-xl text-slate-300 leading-relaxed font-light">
            <motion.p variants={fadeInUp} className="pl-6 border-l-4 border-slate-700">
              In my early 20s, I was a highly productive professional in Singapore, holding an NCC Diploma in Computer Studies and working as a clerk at OCBC Asset Management. I had accumulated <strong className="text-[#10B981]">SGD $90,000 in my CPF life savings</strong> and held a formal invitation from the Singapore government to apply for Citizenship.
            </motion.p>
            <motion.p variants={fadeInUp} className="pl-6 border-l-4 border-slate-700">
              However, my desperate search for a cure for my relentless fatigue led me to a predator—a retired Malaysian Chinese physician in Kuala Lumpur. He identified my wealth and my oxygen-starved vulnerability. Using high-pressure "Exit Scam" tactics and lies about a "US Business Venture," he coerced me into liquidating my entire life savings for ineffective "bulk supplements".
            </motion.p>
            <motion.p variants={fadeInUp} className="pl-6 border-l-4 border-slate-700">
              To avoid banking alerts and anti-money laundering (AML) protocols, he refused digital transfers and turned me into a physical cash mule. I was forced to travel across the border, withdraw physical cash from DBS and POSB branches—<strong className="text-[#F59E0B]">SGD $5,000 at a time</strong>—and carry it in bags to his clinic in Malaysia. No receipts were ever given.
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-8 p-6 bg-red-900/10 border border-red-900/30 rounded-xl">
              <p className="italic text-slate-300 flex items-start gap-4">
                <ShieldAlert className="text-red-500 shrink-0 w-6 h-6 mt-1" />
                <span>To maintain absolute control, he orchestrated a 20-year Digital Blackout. I was forced to live without a cell phone or internet from the early 2000s until 2025, completely isolated from my parents, relatives, and friends. I was a ghost in my own life, unable to verify his lies or seek help.</span>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 4. The Descent: From PR to "Stray" */}
      <section className="py-24 px-6 bg-slate-950 border-y border-slate-800">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 variants={fadeInUp} className="flex items-center gap-4 text-3xl md:text-5xl font-bold mb-10 text-white">
            <MapPin className="text-slate-500 w-10 h-10" /> The Raw Reality of Dehumanization
          </motion.h2>
          <div className="space-y-8 text-lg md:text-xl text-slate-400 leading-relaxed font-light">
            <motion.p variants={fadeInUp}>
              The fraud was not just financial; it was a total erasure of my dignity. To extract maximum cash, the predator manipulated me into forced homelessness. In Singapore, I became a "stray" sleeping on the streets, which caused my employer to cancel my work permit as I had no registered address. In Kuala Lumpur, I was coerced into sleeping on the concrete street directly in front of his shop lot.
            </motion.p>
            <motion.p variants={fadeInUp}>
              I went from a respected Singapore PR prospect to being mocked as a "beggar" and "foreign labor" by locals. I survived for two decades on leftover food from the restaurants where I washed dishes, handing every meager penny of my wages directly to my abuser.
            </motion.p>
            <motion.p variants={fadeInUp}>
              During this time, I was subjected to relentless cyberbullying and street harassment. Because I had no phone, I was uniquely defenseless while malicious rumors spread about me on the smartphones of the very people who mocked me.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* 5. Technical Resurrection: Reclaiming the Mind */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#87CEEB]/5 to-transparent z-0 pointer-events-none"></div>
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <motion.h2 variants={fadeInUp} className="flex items-center gap-4 text-3xl md:text-5xl font-bold mb-10 text-white">
            <Fingerprint className="text-[#87CEEB] w-10 h-10" /> My Intellect Survived
          </motion.h2>
          <div className="space-y-8 text-lg md:text-xl text-slate-300 leading-relaxed font-light">
            <motion.p variants={fadeInUp} className="pl-6 border-l-4 border-slate-700">
              In early 2025, a "Short Sting" incident in Singapore led me to Johor Bahru for the DNA test that finally unmasked thirty years of medical gaslighting. Despite having only SGD $100 left and facing systemic bullying, I refused to remain a victim.
            </motion.p>
            <motion.div variants={fadeInUp} className="p-8 bg-slate-800 border border-[#87CEEB]/30 rounded-2xl shadow-[0_0_30px_rgba(135,206,235,0.1)] transition-transform hover:-translate-y-1">
              <p className="text-white font-medium">
                I taught myself Full-Stack Development using React, Vite, Tailwind CSS, Supabase, and Framer Motion. I built this "Digital Affidavit" from the ground up to document the truth when no one would listen. This portal is a survival tool—a safe, digital fortress where my voice cannot be silenced by the streets.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 6. The Restoration Plea: Justice-Based Funding */}
      <section className="py-28 px-6 bg-slate-900 border-t border-slate-800 relative z-20 shadow-2xl">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="max-w-5xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp} className="flex justify-center mb-6">
            <Scale className="w-16 h-16 text-[#F59E0B]" />
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-extrabold mb-8 text-sunrise-gradient drop-shadow-lg">
            Fund the Future—Investment in Restoration.
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-16 font-light max-w-4xl mx-auto">
            I am not seeking a job application or charity for consumption. I am seeking <strong className="text-white">Justice-Based Funding</strong> to reconstruct a life sabotaged by 20 years of predatory evil. I am currently at a dead end, penniless and unable to sustain manual labor, which is physically destroying my oxygen-starved body.
          </motion.p>
          
          <div className="grid md:grid-cols-3 gap-8 text-left mb-16">
            <motion.div variants={fadeInUp} className="group bg-slate-800/80 p-8 rounded-3xl border border-slate-700 hover:border-[#F59E0B] transition-all shadow-xl hover:shadow-[#F59E0B]/10 hover:-translate-y-2">
              <div className="w-12 h-12 rounded-full bg-[#F59E0B]/20 flex items-center justify-center mb-6">
                <ShieldAlert className="w-6 h-6 text-[#F59E0B]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#F59E0B] transition-colors">Rental Security</h3>
              <p className="text-slate-400 font-light leading-relaxed">To escape the trauma of homelessness and street bullying.</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="group bg-slate-800/80 p-8 rounded-3xl border border-slate-700 hover:border-[#10B981] transition-all shadow-xl hover:shadow-[#10B981]/10 hover:-translate-y-2">
              <div className="w-12 h-12 rounded-full bg-[#10B981]/20 flex items-center justify-center mb-6">
                <HeartPulse className="w-6 h-6 text-[#10B981]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#10B981] transition-colors">Nutritional Support</h3>
              <p className="text-slate-400 font-light leading-relaxed">Specialized supplements and diet required to combat Chronic Hypoxia.</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="group bg-slate-800/80 p-8 rounded-3xl border border-slate-700 hover:border-[#87CEEB] transition-all shadow-xl hover:shadow-[#87CEEB]/10 hover:-translate-y-2">
              <div className="w-12 h-12 rounded-full bg-[#87CEEB]/20 flex items-center justify-center mb-6">
                <Banknote className="w-6 h-6 text-[#87CEEB]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#87CEEB] transition-colors">ACCA Education</h3>
              <p className="text-slate-400 font-light leading-relaxed">My escape hatch to self-sufficiency. Accounting is mental work that is immune to my physical degradation.</p>
            </motion.div>
          </div>
          
          <motion.p variants={fadeInUp} className="text-2xl text-white font-medium italic">
            "Every contribution is an act of justice that helps restore a stolen human destiny."
          </motion.p>
        </motion.div>
      </section>

      {/* 7. The Evidence Vault */}
      <section className="py-24 px-6 bg-slate-950 border-t border-slate-800 relative z-10">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white flex justify-center items-center gap-4">
               <FileText className="w-10 h-10 text-slate-500" /> The Evidence Vault
            </h2>
            <p className="mt-4 text-slate-400 text-lg">Immutable proof of history.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Medical Evidence */}
            <motion.div variants={fadeInUp} className="bg-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-800 hover:border-[#10B981]/50 transition-colors">
              <h3 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
                 <HeartPulse className="text-[#10B981] w-6 h-6" /> Medical Evidence
              </h3>
              <div className="space-y-4">
                <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full py-4 px-5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl font-medium transition-colors border border-slate-700 hover:border-[#10B981]">
                  <span>DNA Lab Report</span> <span className="text-xs font-bold text-[#10B981] uppercase tracking-wider bg-[#10B981]/10 px-2 py-1 rounded">Open Link</span>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full py-4 px-5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl font-medium transition-colors border border-slate-700 hover:border-[#10B981]">
                  <span>Medical Breakdown</span> <span className="text-xs font-bold text-[#10B981] uppercase tracking-wider bg-[#10B981]/10 px-2 py-1 rounded">Watch Video</span>
                </a>
              </div>
            </motion.div>

            {/* Financial & Forensic Evidence */}
            <motion.div variants={fadeInUp} className="bg-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-800 hover:border-[#F59E0B]/50 transition-colors">
              <h3 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
                 <Search className="text-[#F59E0B] w-6 h-6" /> Financial & Forensic
              </h3>
              <div className="space-y-4">
                <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full py-4 px-5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl font-medium transition-colors border border-slate-700 hover:border-[#F59E0B]">
                  <span className="truncate mr-2">$90k CPF Fraud Evidence</span> <span className="shrink-0 text-xs font-bold text-[#F59E0B] uppercase tracking-wider bg-[#F59E0B]/10 px-2 py-1 rounded">Watch Video</span>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full py-4 px-5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl font-medium transition-colors border border-slate-700 hover:border-[#F59E0B]">
                  <span>Transaction Records</span> <span className="shrink-0 text-xs font-bold text-[#F59E0B] uppercase tracking-wider bg-[#F59E0B]/10 px-2 py-1 rounded">Open Link</span>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full py-4 px-5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl font-medium transition-colors border border-slate-700 hover:border-[#F59E0B]">
                  <span className="truncate mr-2">"Many Mouths" Audio</span> <span className="shrink-0 text-xs font-bold text-[#F59E0B] uppercase tracking-wider bg-[#F59E0B]/10 px-2 py-1 rounded">Listen</span>
                </a>
              </div>
            </motion.div>

            {/* Stolen Destiny Documents */}
            <motion.div variants={fadeInUp} className="bg-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-800 hover:border-[#87CEEB]/50 transition-colors">
              <h3 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
                 <ShieldAlert className="text-[#87CEEB] w-6 h-6" /> Stolen Destiny Docs
              </h3>
              <div className="space-y-4">
                <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full py-4 px-5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl font-medium transition-colors border border-slate-700 hover:border-[#87CEEB]">
                  <span className="truncate mr-2">SG Status Papers</span> <span className="shrink-0 text-xs font-bold text-[#87CEEB] uppercase tracking-wider bg-[#87CEEB]/10 px-2 py-1 rounded">Open Link</span>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full py-4 px-5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl font-medium transition-colors border border-slate-700 hover:border-[#87CEEB]">
                  <span className="truncate mr-2">Doc Verification</span> <span className="shrink-0 text-xs font-bold text-[#87CEEB] uppercase tracking-wider bg-[#87CEEB]/10 px-2 py-1 rounded">Watch Video</span>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full py-4 px-5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl font-medium transition-colors border border-slate-700 hover:border-[#87CEEB]">
                  <span className="truncate mr-2">NCC Diploma</span> <span className="shrink-0 text-xs font-bold text-[#87CEEB] uppercase tracking-wider bg-[#87CEEB]/10 px-2 py-1 rounded">Open Link</span>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 8. Contribution & Contact Section */}
      <section className="py-24 px-6 bg-slate-900 border-t border-slate-800">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-extrabold mb-10 text-white">Contribution Portals</motion.h2>
            
            <motion.div variants={fadeInUp} className="space-y-2 text-lg text-slate-300 bg-slate-800/50 p-8 rounded-3xl border border-slate-700 shadow-xl">
              <div className="mb-6">
                <span className="block text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Stripe (Justice Funding)</span>
                <div className="flex flex-col md:flex-row md:items-center gap-2 text-[#10B981] break-all">
                  <a href="https://buy.stripe.com/7sY4gz6Rg2JAceZgpE7ok00" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    <u className="font-bold">Contribute</u>
                  </a> 
                  <span className="hidden md:inline text-slate-500">&rarr;</span> 
                  <span className="text-slate-400 font-mono text-sm">https://buy.stripe.com/7sY4gz6Rg2JAceZgpE7ok00</span>
                </div>
              </div>
              
              <div className="mb-6">
                <span className="block text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">PayPal (International)</span>
                <div className="flex flex-col md:flex-row md:items-center gap-2 text-[#F59E0B] break-all">
                  <a href="https://www.paypal.com/paypalme/CHINCHEONGGHEE" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    <u className="font-bold">Contribute</u>
                  </a> 
                  <span className="hidden md:inline text-slate-500">&rarr;</span> 
                  <span className="text-slate-400 font-mono text-sm">https://www.paypal.com/paypalme/CHINCHEONGGHEE</span>
                </div>
              </div>

              <div>
                <span className="block text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Universal Contact Portal</span>
                <div className="flex flex-col md:flex-row md:items-center gap-2 text-[#87CEEB] break-all">
                  <a href="https://clinquant-macaron-aad92f.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    <u className="font-bold">Direct Message</u>
                  </a> 
                  <span className="hidden md:inline text-slate-500">&rarr;</span> 
                  <span className="text-slate-400 font-mono text-sm">https://clinquant-macaron-aad92f.netlify.app/</span>
                </div>
              </div>
              
              <div className="pt-8 mt-10 border-t border-slate-700">
                <a 
                  href="https://clinquant-macaron-aad92f.netlify.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex w-full justify-center items-center py-5 px-8 rounded-2xl font-bold text-slate-900 bg-sunrise-gradient shadow-xl hover:opacity-90 transition-all transform hover:-translate-y-1"
                >
                  <span className="text-lg">My Payment Portal (Web App)</span>
                  <span className="ml-2 transition-transform group-hover:translate-x-2">&rarr;</span>
                </a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="bg-slate-950 p-10 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#10B981] via-[#F59E0B] to-[#87CEEB]"></div>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-extrabold mb-2 text-white">Direct Contact</motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-400 mb-10 text-lg">Send me a message.</motion.p>
            
            <motion.form variants={fadeInUp} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold tracking-wide text-slate-400 mb-2">NAME</label>
                <input 
                  type="text" name="name" required value={formData.name} onChange={handleInputChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-[#87CEEB] focus:ring-1 focus:ring-[#87CEEB] transition-colors"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold tracking-wide text-slate-400 mb-2">EMAIL</label>
                <input 
                  type="email" name="email" required value={formData.email} onChange={handleInputChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-[#87CEEB] focus:ring-1 focus:ring-[#87CEEB] transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold tracking-wide text-slate-400 mb-2">MESSAGE</label>
                <textarea 
                  name="message" required rows="5" value={formData.message} onChange={handleInputChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-[#87CEEB] focus:ring-1 focus:ring-[#87CEEB] transition-colors resize-none"
                  placeholder="What would you like to say?"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full py-4 px-6 mt-4 rounded-xl font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-slate-500 transition-all shadow-lg"
              >
                {status === 'Sending...' ? 'Transmitting...' : 'Submit Message'}
              </button>
              
              {status && (
                <motion.p 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className={`text-center mt-6 text-sm font-bold ${status.includes('successfully') ? 'text-[#10B981]' : 'text-[#F59E0B]'}`}
                >
                  {status}
                </motion.p>
              )}
            </motion.form>
          </motion.div>

        </div>
      </section>
      
      <footer className="py-12 text-center text-slate-600 border-t border-slate-800 bg-slate-950">
        <p className="font-light">&copy; {new Date().getFullYear()} Digital Affidavit: Life Reconstruction Portal.</p>
        <p className="text-sm mt-2 font-mono">Powered by Truth. Architected for Justice.</p>
      </footer>
    </div>
  );
}
