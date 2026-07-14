"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "@/lib/axios";
import { 
  Heart, 
  MapPin, 
  Calendar, 
  CreditCard, 
  LogOut, 
  Compass,
  Award,
  CheckCircle2,
  X,
  Share2,
  Trash2,
  ArrowRight,
  DollarSign,
  Receipt,
  Ticket,
  ShieldCheck,
  AlertCircle,
  MessageSquare,
  Send,
  Clock
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import SignaturePad from "@/components/SignaturePad";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("Expeditions");
  const [savedEscapes, setSavedEscapes] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [pendingInvoices, setPendingInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  
  // Modals state
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  // Payment State
  const [couponCode, setCouponCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [userSignature, setUserSignature] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Chat State
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedInquiryForChat, setSelectedInquiryForChat] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showChatModal && selectedInquiryForChat) {
        interval = setInterval(async () => {
            try {
                const res = await axios.get(`inquiries/${selectedInquiryForChat.id}/messages`);
                setChatMessages(res.data);
            } catch (e) {}
        }, 3000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [showChatModal, selectedInquiryForChat]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("access_token");

    if (!token || !storedUser) {
        window.location.href = "/login";
        return;
    }

    setUser(JSON.parse(storedUser));
    
    // Check for tab param
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam === 'Transactions') {
        setActiveTab('Transactions');
    } else if (tabParam === 'Escapes') {
        setActiveTab('Saved Escapes');
    } else if (tabParam === 'Expeditions') {
        setActiveTab('Expeditions');
    }

    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
        const [savedRes, transRes, inqRes] = await Promise.all([
            axios.get('saved-escapes'),
            axios.get('transactions'),
            axios.get('inquiries')
        ]);
        setSavedEscapes(savedRes.data);
        setTransactions(transRes.data);
        setInquiries(inqRes.data);
        
        // Treat "Awaiting Payment" inquiries as pending invoices for the ledger
        const pending = inqRes.data.filter((inq: any) => inq.status === 'Awaiting Payment');
        setPendingInvoices(pending);
    } catch (e) {
        console.error(e);
    } finally {
        setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!selectedInvoice) return;
    if (!userSignature) {
        alert("Please sign the verification pad to proceed.");
        return;
    }
    setPaymentLoading(true);
    try {
        await axios.post(`inquiries/${selectedInvoice.id}/pay`, {
            coupon: couponCode,
            method: paymentMethod,
            signature: userSignature
        });
        setPaymentSuccess(true);
        // Refresh data immediately in background
        fetchData();
        
        setTimeout(() => {
            setShowPaymentModal(false);
            setSelectedInvoice(null);
            setPaymentSuccess(false);
            setCouponCode("");
            setUserSignature("");
            setActiveTab("Transactions");
        }, 5000);
    } catch (e) {
        alert("Payment failed. Please verify your coupon or contact support.");
    } finally {
        setPaymentLoading(false);
    }
  };

  const handleUnsave = async (id: number) => {
    try {
        await axios.delete(`saved-escapes/${id}`);
        setSavedEscapes(savedEscapes.filter(item => item.id !== id));
    } catch (e) {
        alert("Failed to unsave.");
    }
  };

  const handleAcceptProposal = async (id: number) => {
    try {
        await axios.patch(`inquiries/${id}/accept-proposal`);
        const inq = inquiries.find(i => i.id === id);
        if (inq) {
            setSelectedInvoice({...inq, quote_amount: inq.proposal_data?.price || inq.quote_amount});
            setShowPaymentModal(true);
        }
        fetchData();
    } catch (e) {
        alert("Failed to accept proposal.");
    }
  };

  const openChat = async (inquiry: any) => {
      setSelectedInquiryForChat(inquiry);
      setShowChatModal(true);
      setChatLoading(true);
      try {
          const res = await axios.get(`inquiries/${inquiry.id}/messages`);
          setChatMessages(res.data);
      } catch (e) {
          console.error("Failed to load chat", e);
      } finally {
          setChatLoading(false);
      }
  };

  const sendMessage = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!newMessage.trim() || !selectedInquiryForChat) return;
      try {
          const res = await axios.post(`inquiries/${selectedInquiryForChat.id}/messages`, {
              message: newMessage
          });
          setChatMessages([...chatMessages, res.data]);
          setNewMessage("");
      } catch (e) {
          alert("Failed to send message.");
      }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans relative">
      <Navbar />
      
      <div className="container-luxury pt-48 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* 🧭 Sidebar */}
          <aside className="lg:col-span-3">
            <div className="bg-slate-50 border border-black/5 p-10 rounded-sm sticky top-40">
                <div className="text-center mb-12">
                    <div className="w-24 h-24 rounded-full bg-black mx-auto mb-6 flex items-center justify-center text-gold text-2xl font-black shadow-2xl uppercase">
                        {user?.name?.substring(0, 2) || "SE"}
                    </div>
                    <h2 className="text-2xl font-light tracking-tighter">{user?.name || "Member"}</h2>
                    <p className="text-gold text-[10px] uppercase tracking-[0.4em] font-black mt-2">Velora Elite Member</p>
                </div>

                <nav className="space-y-4">
                    {[
                        { icon: <Compass className="w-5 h-5" />, label: "Expeditions" },
                        { icon: <Heart className="w-5 h-5" />, label: "Saved Escapes" },
                        { icon: <CreditCard className="w-5 h-5" />, label: "Transactions" },
                    ].map((item) => (
                        <button
                            key={item.label}
                            onClick={() => setActiveTab(item.label)}
                            className={`w-full flex items-center gap-6 px-8 py-5 rounded-sm transition-all duration-500 ${
                                activeTab === item.label ? "bg-white border border-black/5 text-black shadow-lg shadow-black/5" : "text-black/30 hover:text-black"
                            }`}
                        >
                            <span className={activeTab === item.label ? "text-gold" : ""}>{item.icon}</span>
                            <span className="text-[11px] uppercase tracking-[0.4em] font-black">{item.label}</span>
                        </button>
                    ))}
                    <button onClick={handleLogout} className="w-full flex items-center gap-6 px-8 py-8 text-black/20 hover:text-red-500 transition-colors mt-8 border-t border-black/5">
                        <LogOut className="w-5 h-5" />
                        <span className="text-[11px] uppercase tracking-[0.4em] font-black">Sign Out</span>
                    </button>
                </nav>
            </div>
          </aside>

          {/* 🏛️ Main Content */}
          <main className="lg:col-span-9">
            <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                <div>
                    <span className="text-gold uppercase tracking-[1em] text-[10px] font-black mb-4 block">{activeTab}</span>
                    <h1 className="text-6xl md:text-8xl font-light tracking-tighter uppercase">
                        {activeTab === "Expeditions" && <>Your <span className="italic font-serif text-gold">Journeys</span></>}
                        {activeTab === "Saved Escapes" && <>Saved <span className="italic font-serif text-gold">Escapes</span></>}
                        {activeTab === "Transactions" && <>Private <span className="italic font-serif text-gold">Ledger</span></>}
                    </h1>
                </div>
            </header>

            {/* TAB CONTENT */}
            <div className="space-y-12">

                {activeTab === "Expeditions" && (
                    <div className="space-y-12">
                        {loading ? (
                            <div className="p-12 text-center text-black/30 font-light animate-pulse border border-black/5 rounded-sm uppercase tracking-widest text-xs">Accessing Expedition Logs...</div>
                        ) : inquiries.length === 0 ? (
                            <div className="p-20 text-center border border-black/5 bg-slate-50 rounded-sm">
                                <Compass className="w-12 h-12 text-black/10 mx-auto mb-6" />
                                <h3 className="text-2xl font-light tracking-tighter uppercase mb-2">No Active Journeys</h3>
                                <p className="text-black/30 text-xs font-black uppercase tracking-widest">You have not initiated any consultations yet.</p>
                            </div>
                        ) : (
                            inquiries.map((inq) => (
                                <div key={inq.id} className="bg-white border border-black/5 rounded-sm shadow-xl overflow-hidden group">
                                    <div className="p-8 md:p-12 bg-slate-50/50 border-b border-black/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                        <div>
                                            <span className="text-[9px] uppercase tracking-[0.4em] font-black text-black/40 block mb-2">Journey ID #{inq.id.toString().padStart(6, '0')}</span>
                                            <h3 className="text-2xl font-light tracking-tighter uppercase">{inq.destination || "Bespoke Expedition"}</h3>
                                            <div className="flex items-center gap-4 mt-3 text-[10px] uppercase tracking-widest font-black text-black/50">
                                                <span className="flex items-center gap-2"><Calendar className="w-3 h-3 text-gold" /> {inq.travel_date ? new Date(inq.travel_date).toLocaleDateString() : 'Flexible'}</span>
                                                <span>•</span>
                                                <span className="flex items-center gap-2">Travelers: {inq.travelers || 'N/A'}</span>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => openChat(inq)}
                                            className="px-6 py-4 bg-white border border-black/10 text-[9px] uppercase tracking-widest font-black flex items-center gap-3 hover:border-gold hover:text-gold transition-colors rounded-sm shadow-sm"
                                        >
                                            <MessageSquare className="w-4 h-4" />
                                            Concierge Comm
                                        </button>
                                    </div>
                                    
                                    {/* STATUS TRACKER */}
                                    <div className="p-8 md:p-12">
                                        <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4 relative">
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-black/5 hidden md:block z-0" />
                                            {[
                                                { label: "Initiated", statuses: ['Pending Consultation', 'Consultation', 'Proposal Sent', 'Awaiting Payment', 'Confirmed'] },
                                                { label: "Reviewing", statuses: ['Consultation', 'Proposal Sent', 'Awaiting Payment', 'Confirmed'] },
                                                { label: "Proposal", statuses: ['Proposal Sent', 'Awaiting Payment', 'Confirmed'] },
                                                { label: "Payment", statuses: ['Awaiting Payment', 'Confirmed'] },
                                                { label: "Confirmed", statuses: ['Confirmed'] }
                                            ].map((step, idx) => {
                                                const isCompleted = step.statuses.includes(inq.status);
                                                const isActive = step.label === "Initiated" && inq.status === 'Pending Consultation' || 
                                                                 step.label === "Reviewing" && inq.status === 'Consultation' ||
                                                                 step.label === "Proposal" && inq.status === 'Proposal Sent' ||
                                                                 step.label === "Payment" && inq.status === 'Awaiting Payment' ||
                                                                 step.label === "Confirmed" && inq.status === 'Confirmed';
                                                
                                                return (
                                                    <div key={step.label} className="relative z-10 flex flex-col items-center gap-3 bg-white px-2">
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${isActive ? 'border-gold bg-gold/10 text-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]' : isCompleted ? 'border-black bg-black text-white' : 'border-black/10 bg-white text-black/20'}`}>
                                                            {isCompleted && !isActive ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-[10px] font-black">{idx + 1}</span>}
                                                        </div>
                                                        <span className={`text-[8px] uppercase tracking-widest font-black ${isActive ? 'text-gold' : isCompleted ? 'text-black' : 'text-black/30'}`}>{step.label}</span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    {/* PROPOSAL CARD */}
                                    {inq.status === 'Proposal Sent' && inq.proposal_data && (
                                        <div className="mx-8 md:mx-12 mb-12 p-8 bg-slate-50 border border-gold/30 rounded-sm relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                                                <Award className="w-32 h-32" />
                                            </div>
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-1 h-8 bg-gold" />
                                                <h4 className="text-xl font-light uppercase tracking-widest">Official Proposal</h4>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 relative z-10">
                                                <div>
                                                    <p className="text-[9px] uppercase tracking-widest text-black/40 font-black mb-1">Expedition</p>
                                                    <p className="text-sm font-bold uppercase">{inq.proposal_data.title}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[9px] uppercase tracking-widest text-black/40 font-black mb-1">Dates</p>
                                                    <p className="text-sm font-bold uppercase">{inq.proposal_data.dates}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[9px] uppercase tracking-widest text-black/40 font-black mb-1">Duration</p>
                                                    <p className="text-sm font-bold uppercase">{inq.proposal_data.duration}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[9px] uppercase tracking-widest text-black/40 font-black mb-1">Total Investment</p>
                                                    <p className="text-lg font-black text-gold">${inq.proposal_data.price}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4 relative z-10">
                                                <button 
                                                    onClick={() => handleAcceptProposal(inq.id)}
                                                    className="px-8 py-4 bg-black text-white text-[9px] uppercase tracking-widest font-black hover:bg-gold transition-colors shadow-lg"
                                                >
                                                    Accept & Deposit
                                                </button>
                                                <button 
                                                    onClick={() => openChat(inq)}
                                                    className="px-8 py-4 bg-white border border-black/10 text-black text-[9px] uppercase tracking-widest font-black hover:border-black transition-colors"
                                                >
                                                    Ask Question
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                )}
                
                {activeTab === "Saved Escapes" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {loading ? (
                             <div className="col-span-full p-12 text-center text-black/30 font-light animate-pulse border border-black/5 rounded-sm uppercase tracking-widest text-xs">Recalling Saved Territories...</div>
                        ) : savedEscapes.length === 0 ? (
                            <div className="col-span-full p-12 text-center text-black/30 font-light border border-black/5 rounded-sm uppercase tracking-widest text-xs">No escapes saved yet.</div>
                        ) : (
                            savedEscapes.map((item, idx) => (
                                <motion.div 
                                    key={item.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group relative bg-white border border-black/5 overflow-hidden rounded-sm hover:border-gold/30 transition-all duration-700 shadow-xl"
                                >
                                    <div className="aspect-[16/10] overflow-hidden relative">
                                        <img 
                                            src={item.data?.images?.[0] || item.data?.image || "https://images.unsplash.com/photo-1544085311-11a028465b03"} 
                                            alt={item.data?.title || item.data?.name}
                                            className="w-full h-full object-cover transition-transform duration-[4000ms] group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 right-4 z-10">
                                            <button 
                                                onClick={() => handleUnsave(item.id)}
                                                className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-8 space-y-4">
                                        <span className="text-[9px] text-gold uppercase tracking-[0.4em] font-black block">{item.item_type}</span>
                                        <h3 className="text-2xl font-light tracking-tighter uppercase">{item.data?.title || item.data?.name}</h3>
                                        <Link 
                                            href={`/${item.item_type}s/${item.data?.slug || item.data?.id}`}
                                            className="inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-black group/link"
                                        >
                                            View Estate
                                            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform text-gold" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                )}

                {activeTab === "Transactions" && (
                    <div className="space-y-12">
                        
                        {/* 💰 PENDING INVOICES (Integrated into Ledger) */}
                        {pendingInvoices.length > 0 && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <AlertCircle className="w-4 h-4 text-gold" />
                                    <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold">Awaiting Finalization</h3>
                                </div>
                                {pendingInvoices.map((inv) => (
                                    <div key={inv.id} className="bg-gold/5 border border-gold/20 p-8 rounded-sm flex items-center justify-between">
                                        <div className="flex items-center gap-8">
                                            <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center text-gold">
                                                <Receipt className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-lg font-bold uppercase tracking-tight">{inv.destination || "Bespoke Journey"}</p>
                                                <p className="text-[9px] uppercase tracking-widest text-black/30 font-black mt-1">Official Quote: {inv.quote_currency} {inv.quote_amount}</p>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => { setSelectedInvoice(inv); setShowPaymentModal(true); }}
                                            className="px-10 py-4 bg-black text-white text-[10px] uppercase tracking-[0.5em] font-black hover:bg-gold transition-all duration-500 shadow-xl"
                                        >
                                            Process Payment
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="w-4 h-4 text-black/30" />
                                <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-black/30">Confirmed Records</h3>
                            </div>
                            {loading ? (
                                <div className="p-12 text-center text-black/30 font-light animate-pulse border border-black/5 rounded-sm uppercase tracking-widest text-xs">Accessing Ledger...</div>
                            ) : transactions.length === 0 ? (
                                <div className="p-20 text-center border border-black/5 bg-slate-50 rounded-sm">
                                    <CreditCard className="w-12 h-12 text-black/10 mx-auto mb-6" />
                                    <h3 className="text-2xl font-light tracking-tighter uppercase mb-2">Clear Ledger</h3>
                                    <p className="text-black/30 text-xs font-black uppercase tracking-widest">No confirmed transaction history found.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {transactions.map((tx) => (
                                        <div key={tx.id} className="bg-white border border-black/5 rounded-sm p-6 lg:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:shadow-lg transition-shadow duration-500 group relative overflow-hidden">
                                            {/* Status Bar */}
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-black/10 group-hover:bg-gold transition-colors"></div>
                                            
                                            <div className="flex-1 pl-4 lg:pl-0 flex flex-col gap-1">
                                                <p className="text-[9px] uppercase tracking-widest font-black text-black/40 flex items-center gap-2">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(tx.created_at).toLocaleDateString()}
                                                </p>
                                                <h4 className="text-lg font-light tracking-tighter uppercase mt-2">
                                                    {tx.inquiry?.item_type && tx.inquiry?.item_id ? (
                                                        <Link href={`/${tx.inquiry.item_type}s/${tx.inquiry.item_id}`} className="hover:text-gold transition-colors">
                                                            {tx.inquiry.destination || "Expedition Deposit"}
                                                        </Link>
                                                    ) : (
                                                        tx.inquiry?.destination || "Expedition Deposit"
                                                    )}
                                                </h4>
                                                <div className="flex items-center gap-3 mt-1 text-[9px] uppercase tracking-widest font-black text-black/30">
                                                    <span>Ref: #{tx.id}</span>
                                                    <span className="w-1 h-1 rounded-full bg-black/10"></span>
                                                    <span className="flex items-center gap-1"><CreditCard className="w-3 h-3" /> Method: {tx.method}</span>
                                                </div>
                                            </div>

                                            <div className="w-full lg:w-auto flex flex-col lg:items-end gap-4 border-t lg:border-t-0 lg:border-l border-black/5 pt-6 lg:pt-0 lg:pl-8">
                                                <div className="text-left lg:text-right">
                                                    <p className="text-[9px] uppercase tracking-widest font-black text-black/30 mb-1">Settled Amount</p>
                                                    <p className="font-light text-2xl tracking-tighter text-black">{tx.currency} {tx.amount}</p>
                                                </div>
                                                <button 
                                                    onClick={() => { setSelectedTransaction(tx); setShowReceiptModal(true); }}
                                                    className="w-full lg:w-auto text-[9px] px-6 py-3 rounded-sm font-black uppercase tracking-[0.2em] border border-black/10 hover:border-gold hover:text-gold transition-all text-center flex justify-center items-center gap-2"
                                                >
                                                    <Receipt className="w-3 h-3" />
                                                    View Receipt
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Loyalty Section */}
            <div className="mt-24 p-16 rounded-sm bg-slate-50 border border-black/5 relative overflow-hidden group">
                <div className="relative z-10">
                    <div className="flex items-center gap-6 mb-8">
                        <Award className="w-8 h-8 text-gold" />
                        <span className="text-gold uppercase tracking-[1em] text-[10px] font-black">Elite Privileges</span>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-light tracking-tighter mb-6">The Velora Circle</h3>
                    <p className="text-black/40 text-xl font-light leading-relaxed mb-10 max-w-2xl">Invite distinguished guests to the collection and unlock priority access to unlisted homestays.</p>
                    <button 
                        onClick={() => setShowInviteModal(true)}
                        className="px-12 py-6 bg-black text-white text-[10px] uppercase tracking-[0.5em] font-black hover:bg-gold transition-all duration-700 shadow-2xl"
                    >
                        Extend Invitation
                    </button>
                </div>
            </div>
          </main>
        </div>
      </div>

      {/* 💳 Payment Checkout Modal */}
      <AnimatePresence>
        {showPaymentModal && (
            <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 md:p-12 overflow-y-auto">
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    onClick={() => setShowPaymentModal(false)}
                    className="fixed inset-0 bg-black/90 backdrop-blur-xl" 
                />
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="bg-white w-full max-w-2xl relative z-10 rounded-sm shadow-2xl my-auto max-h-[90vh] overflow-y-auto custom-scrollbar"
                >
                    {!paymentSuccess ? (
                        <div className="p-12 md:p-16 text-center space-y-10">
                            <header>
                                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
                                    <ShieldCheck className="w-8 h-8 text-gold" />
                                </div>
                                <h2 className="text-3xl font-light uppercase tracking-widest mb-2">Secure Verification</h2>
                                <p className="text-black/40 text-[10px] font-black uppercase tracking-[0.4em]">Settling Account #{selectedInvoice?.id}</p>
                            </header>

                            {/* Payment Methods Selection */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { id: "Credit Card", icon: <CreditCard className="w-5 h-5" /> },
                                    { id: "PayPal", icon: <CreditCard className="w-5 h-5" /> },
                                    { id: "Apple Pay", icon: <CreditCard className="w-5 h-5" /> },
                                    { id: "Bank Wire", icon: <Receipt className="w-5 h-5" /> }
                                ].map((m) => (
                                    <button 
                                        key={m.id}
                                        onClick={() => setPaymentMethod(m.id)}
                                        className={`flex flex-col items-center gap-3 p-6 rounded-sm border transition-all duration-500 ${
                                            paymentMethod === m.id ? "bg-black text-white border-black" : "bg-slate-50 border-black/5 text-black/40 hover:border-black/20"
                                        }`}
                                    >
                                        {m.icon}
                                        <span className="text-[8px] uppercase tracking-widest font-black">{m.id}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="p-8 bg-slate-50 border border-black/5 rounded-sm text-left space-y-6">
                                <div className="flex justify-between items-center pb-4 border-b border-black/5">
                                    <span className="text-[10px] uppercase tracking-widest font-black text-black/30">Commitment Value</span>
                                    <span className="text-xl font-black font-serif italic text-gold">{selectedInvoice?.quote_currency} {selectedInvoice?.quote_amount}</span>
                                </div>
                                
                                {paymentMethod === "Credit Card" && (
                                    <div className="space-y-4 pt-4 border-b border-black/5 pb-6">
                                        <label className="text-[10px] uppercase tracking-widest font-black text-black/30">Card Information</label>
                                        <input 
                                            type="text" 
                                            placeholder="Card Number" 
                                            className="w-full bg-white border border-black/10 p-4 text-xs font-bold outline-none focus:border-gold transition-colors"
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input 
                                                type="text" 
                                                placeholder="MM/YY" 
                                                className="w-full bg-white border border-black/10 p-4 text-xs font-bold outline-none focus:border-gold transition-colors"
                                            />
                                            <input 
                                                type="text" 
                                                placeholder="CVC" 
                                                className="w-full bg-white border border-black/10 p-4 text-xs font-bold outline-none focus:border-gold transition-colors"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase tracking-widest font-black text-black/30">Promotional Access Code</label>
                                    <div className="relative">
                                        <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
                                        <input 
                                            type="text"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                            placeholder="Use VELORA2026"
                                            className="w-full bg-white border border-black/10 p-4 pl-12 text-xs font-bold outline-none focus:border-gold transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Digital Signature Pad */}
                                <div className="space-y-3 pt-4">
                                    <label className="text-[10px] uppercase tracking-widest font-black text-black/30">Mandatory Digital Signature</label>
                                    <SignaturePad onSave={(data) => setUserSignature(data)} />
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-black/5">
                                <button 
                                    disabled={paymentLoading || !userSignature}
                                    onClick={handlePayment}
                                    className={`w-full py-6 text-[10px] uppercase tracking-[0.5em] font-black transition-all duration-700 shadow-2xl ${
                                        !userSignature ? "bg-black/10 text-black/20 cursor-not-allowed" : "bg-black text-white hover:bg-gold"
                                    }`}
                                >
                                    {paymentLoading ? "Validating Dossier..." : "Authorize Transaction"}
                                </button>
                                <button 
                                    onClick={() => setShowPaymentModal(false)}
                                    className="text-[9px] uppercase tracking-[0.3em] font-black text-black/30 hover:text-black transition-colors"
                                >
                                    Abort Settlement
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="p-24 text-center space-y-10">
                            <motion.div 
                                initial={{ scale: 0 }} 
                                animate={{ scale: 1 }} 
                                className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-10 border border-green-200"
                            >
                                <ShieldCheck className="w-12 h-12 text-green-600" />
                            </motion.div>
                            <div className="space-y-4">
                                <h2 className="text-4xl font-light uppercase tracking-widest">Entry Confirmed</h2>
                                <p className="text-black/40 text-xs font-black uppercase tracking-[0.3em]">Ledger Updated • Dossier Sealed</p>
                            </div>
                            <p className="text-black/50 text-sm font-light italic leading-relaxed px-10">
                                "Your commitment is now officially recorded in the Velora Network. <br />
                                Access your official receipt in the ledger."
                            </p>
                        </div>
                    )}
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* 🧾 Official Receipt Modal (Real Slip Style) */}
      <AnimatePresence>
        {showReceiptModal && selectedTransaction && (
            <div className="fixed inset-0 z-[400] flex items-center justify-center p-6 md:p-12 overflow-y-auto">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowReceiptModal(false)} className="fixed inset-0 bg-black/95 backdrop-blur-md" />
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="bg-white w-full max-w-4xl relative z-10 p-10 md:p-20 rounded-sm shadow-2xl my-auto max-h-[90vh] overflow-y-auto custom-scrollbar"
                    id="printable-receipt"
                >
                    {/* Watermark Background */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none z-0">
                        <h2 className="text-[25rem] font-black uppercase tracking-widest leading-none">OFFICIAL</h2>
                    </div>
                    
                    <div className="relative z-10 flex flex-col h-full border-[1px] border-black/10 p-8 md:p-16">
                        
                        {/* Header Slip Style */}
                        <div className="flex justify-between items-start mb-24 pb-12 border-b-2 border-dashed border-black/10">
                            <div className="space-y-4">
                                <h2 className="text-4xl font-light tracking-tighter uppercase leading-none">
                                    Velora <br />
                                    <span className="italic font-serif text-gold text-2xl lowercase">Elite Collection</span>
                                </h2>
                                <p className="text-[10px] uppercase tracking-[0.5em] font-black text-black/30">Verified Bespoke Merchant • ID #VEL-MAIN-001</p>
                            </div>
                            <div className="text-right space-y-4">
                                <div className="inline-block p-6 bg-slate-50 rounded-sm border border-black/5">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-2">Network Ledger Record</p>
                                    <p className="text-xl font-bold font-mono tracking-tighter">#{selectedTransaction.id.toString().padStart(8, '0')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Customer & Info Info */}
                        <div className="grid grid-cols-2 gap-20 mb-24 text-xs">
                            <div className="space-y-10">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 mb-4">Issued to Registered Guest</p>
                                    <p className="font-bold uppercase text-lg tracking-tight">{user?.name}</p>
                                    <p className="text-black/40 mt-2 font-mono">{user?.email}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 mb-4">Official Service Date</p>
                                    <p className="font-bold text-lg">{new Date(selectedTransaction.created_at).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                                </div>
                            </div>
                            <div className="text-right space-y-10">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 mb-4">Settlement Instrument</p>
                                    <p className="font-bold uppercase text-lg">{selectedTransaction.method}</p>
                                    <p className="text-green-600 font-black text-[9px] uppercase tracking-widest mt-2">● Verified & Finalized</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 mb-4">Dossier Reference</p>
                                    <p className="font-mono text-[11px] opacity-40">TRX-HASH-{selectedTransaction.id}-{Math.random().toString(36).substring(7).toUpperCase()}</p>
                                </div>
                            </div>
                        </div>

                        {/* Line Items - Real Slip Style */}
                        <div className="border-y-2 border-black/5 py-16 mb-24 space-y-12 bg-slate-50/30 px-12">
                            <div className="flex justify-between items-center">
                                <div className="space-y-4">
                                    <p className="text-3xl font-light uppercase tracking-tighter">{selectedTransaction.inquiry?.destination || "Elite Expedition Deposit"}</p>
                                    <p className="text-[10px] text-black/40 font-black uppercase tracking-[0.3em]">Signature Collection • All-Inclusive Bespoke Service</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-4xl font-black font-serif italic text-gold">{selectedTransaction.currency} {selectedTransaction.amount}</p>
                                    <p className="text-[10px] uppercase tracking-widest font-black text-black/20 mt-2">Net Investment Value</p>
                                </div>
                            </div>
                        </div>

                        {/* Signature Section - Professional Dual Slip */}
                        <div className="grid grid-cols-2 gap-32 pt-16 mt-auto border-t border-dashed border-black/10">
                            <div className="space-y-8">
                                <div className="flex justify-between items-center">
                                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-black/20">Guest Verification</p>
                                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" title="Verified Token" />
                                </div>
                                <div className="h-32 border-b border-black/10 flex items-center justify-center pb-4 relative bg-slate-50/50">
                                    {selectedTransaction.user_signature ? (
                                        <img src={selectedTransaction.user_signature} className="h-24 w-auto object-contain grayscale" alt="Guest Signature" />
                                    ) : (
                                        <span className="text-[10px] uppercase font-black text-black/20 italic">Signature Not Recorded</span>
                                    )}
                                    <span className="absolute bottom-4 right-4 text-[8px] font-black uppercase tracking-widest opacity-20 font-mono">ID: {user?.id}</span>
                                </div>
                                <p className="text-[9px] text-black/40 font-light italic leading-loose text-center">"This signature serves as a binding commitment to the <br/> Velora Luxury Terms & Conditions."</p>
                            </div>
                            <div className="space-y-8">
                                <div className="flex justify-between items-center">
                                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-black/20">Merchant Endorsement</p>
                                    <ShieldCheck className="w-4 h-4 text-gold" />
                                </div>
                                <div className="h-32 border-b border-black/10 flex items-center justify-center pb-4 relative bg-gold/[0.02]">
                                    {selectedTransaction.owner_signature ? (
                                        <img src={selectedTransaction.owner_signature} className="h-24 w-auto object-contain grayscale" alt="Merchant Signature" />
                                    ) : (
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Charles_Darwin_signature.png" className="h-24 w-auto object-contain opacity-20 grayscale" alt="Default Authorization" />
                                    )}
                                    <div className="absolute inset-0 border border-gold/10 pointer-events-none" />
                                </div>
                                <p className="text-[9px] text-black/40 font-light italic leading-loose text-center">"Officially authorized by the Velora Elite Collection <br/> Management Office."</p>
                            </div>
                        </div>

                        <div className="mt-24 text-center space-y-8">
                            <div className="flex justify-center items-center gap-10">
                                <div className="h-px w-20 bg-black/5" />
                                <p className="text-[9px] uppercase tracking-[0.8em] font-black text-black/10">Finem Proferre</p>
                                <div className="h-px w-20 bg-black/5" />
                            </div>
                            <div className="flex justify-center gap-16 no-print">
                                <button 
                                    onClick={() => window.print()} 
                                    className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-black text-gold hover:text-black transition-all group"
                                >
                                    <Receipt className="w-4 h-4" />
                                    Download Instrument
                                </button>
                                <button 
                                    onClick={() => setShowReceiptModal(false)} 
                                    className="text-[10px] uppercase tracking-widest font-black text-black/30 hover:text-red-500 transition-colors"
                                >
                                    Close Ledger
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <button onClick={() => setShowReceiptModal(false)} className="absolute top-10 right-10 text-black/20 hover:text-black transition-colors no-print"><X className="w-8 h-8" /></button>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* 🤝 Invitation Modal */}
      <AnimatePresence>
        {showInviteModal && (
            <div className="fixed inset-0 z-[250] flex items-center justify-center p-6 md:p-12">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowInviteModal(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white w-full max-w-xl relative z-10 p-16 rounded-sm shadow-2xl text-center">
                    <Share2 className="w-10 h-10 text-gold mx-auto mb-10" />
                    <h2 className="text-3xl font-light uppercase tracking-widest mb-6">Extend Invitation</h2>
                    <div className="bg-slate-50 p-6 border border-black/5 flex items-center justify-between gap-4">
                        <code className="text-[10px] font-black text-black/50">https://velora.elite/join?ref={user?.id}</code>
                        <button className="text-[9px] uppercase tracking-widest font-black text-gold">Copy Link</button>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* 💬 Chat Drawer/Modal */}
      <AnimatePresence>
        {showChatModal && selectedInquiryForChat && (
            <div className="fixed inset-0 z-[500] flex items-end md:items-center justify-end md:justify-center p-0 md:p-12">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowChatModal(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                <motion.div 
                    initial={{ opacity: 0, x: "100%" }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, x: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="bg-white w-full md:max-w-md h-[85vh] md:h-[600px] relative z-10 flex flex-col shadow-2xl rounded-t-2xl md:rounded-sm overflow-hidden"
                >
                    <div className="p-6 bg-slate-50 border-b border-black/5 flex justify-between items-center shrink-0">
                        <div>
                            <h3 className="text-lg font-light tracking-tighter uppercase">Concierge Line</h3>
                            <p className="text-[9px] uppercase tracking-widest font-black text-black/40 mt-1">Ref #{selectedInquiryForChat.id.toString().padStart(6, '0')} • {selectedInquiryForChat.destination}</p>
                        </div>
                        <button onClick={() => setShowChatModal(false)} className="text-black/30 hover:text-black transition-colors p-2"><X className="w-5 h-5" /></button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white flex flex-col">
                        {chatLoading ? (
                            <div className="text-[10px] uppercase tracking-widest text-black/30 text-center animate-pulse m-auto">Establishing secure connection...</div>
                        ) : chatMessages.length === 0 ? (
                            <div className="text-[10px] uppercase tracking-widest text-black/30 text-center m-auto flex flex-col items-center gap-4">
                                <ShieldCheck className="w-8 h-8 opacity-20" />
                                Secure line open. State your request.
                            </div>
                        ) : (
                            chatMessages.map((msg, idx) => {
                                const isMe = msg.sender_id === user?.id;
                                return (
                                    <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                        <span className="text-[8px] uppercase tracking-widest font-black text-black/30 mb-2 px-1">
                                            {isMe ? 'You' : msg.sender?.name || 'Concierge'} • {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                        </span>
                                        <div className={`p-4 max-w-[85%] text-xs font-light leading-relaxed rounded-sm ${isMe ? 'bg-black text-white' : 'bg-slate-50 border border-black/5 text-black'}`}>
                                            {msg.message}
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>

                    <div className="p-4 bg-slate-50 border-t border-black/5 shrink-0">
                        <form onSubmit={sendMessage} className="flex items-center gap-3 bg-white border border-black/10 p-2 pr-2 focus-within:border-gold transition-colors rounded-sm shadow-sm">
                            <input 
                                type="text" 
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Transmit message..." 
                                className="flex-1 bg-transparent border-none outline-none text-xs font-bold px-4 placeholder:text-black/20"
                            />
                            <button 
                                type="submit" 
                                disabled={!newMessage.trim()}
                                className="w-10 h-10 bg-black text-white rounded-sm flex items-center justify-center hover:bg-gold transition-colors disabled:opacity-50 disabled:hover:bg-black"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default UserDashboard;
