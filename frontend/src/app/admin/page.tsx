"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard, Map, Home, Compass, BookOpen, Calendar,
    Settings, LogOut, Plus, Search, TrendingUp, Users, MapPin,
    DollarSign, Edit, Trash2, Eye, X, Check, AlertCircle, Image as ImageIcon,
    WifiOff, MessageSquare, Receipt, Landmark, Send, FileText, Menu, Activity, PieChart as PieChartIcon
} from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import Link from "next/link";
import axios from "@/lib/axios";
import SignaturePad from "@/components/SignaturePad";

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState("overview");
    const [showModal, setShowModal] = useState(false);
    const [showQuoteModal, setShowQuoteModal] = useState(false);
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
    const [quoteAmount, setQuoteAmount] = useState("");
    const [quoteCurrency, setQuoteCurrency] = useState("USD");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Proposal & Chat States
    const [showProposalModal, setShowProposalModal] = useState(false);
    const [proposalData, setProposalData] = useState({ title: "", dates: "", duration: "", price: "" });
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

    const [stats, setStats] = useState({
        tours: 0,
        homestays: 0,
        destinations: 0,
        cities: 0,
        blogs: 0,
        inquiries: 0
    });

    const [overviewData, setOverviewData] = useState({
        totalRevenue: 0,
        recentActivity: [] as any[],
        revenueData: [] as any[],
        funnelData: [] as any[]
    });

    const [countriesList, setCountriesList] = useState<any[]>([]);
    const [citiesList, setCitiesList] = useState<any[]>([]);

    const [allHomestays, setAllHomestays] = useState<any[]>([]);
    const [homestaySearch, setHomestaySearch] = useState("");

    const initialNewItem = {
        title: "", name: "", slug: "", price: "", price_per_night: "", duration: "", 
        location: "", description: "", country_id: "1", city_id: "1", destination_id: "",
        tagline: "", highlight: "", subtitle: "", author: "", author_role: "", category: "",
        image1_type: "url", image1_url: "", image1_file: null,
        image2_type: "url", image2_url: "", image2_file: null,
        image3_type: "url", image3_url: "", image3_file: null,
        itinerary: [{ day: "Day 1", title: "", desc: "", points: [""] }],
        includes: [""],
        homestay_ids: [] as { id: number, day: number | null }[],
        nights: "", group_size: "", currency: "PKR", overview: "", narrative: "",
        accommodation: "", transport: "", best_season: "", difficulty: "",
        hero_image: "", excludes: [""], luxury_features: [""], highlights: [""],
        booking_button_text: "Book Expedition"
    };

    const [newItem, setNewItem] = useState<any>(initialNewItem);
    const [editingItem, setEditingItem] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        const userStr = localStorage.getItem("user");
        
        if (!token || !userStr) {
            window.location.href = "/login";
            return;
        }

        fetchData();
        axios.get("countries").then(res => setCountriesList(res.data)).catch(console.error);
        axios.get("cities").then(res => setCitiesList(res.data)).catch(console.error);
        
        if (activeTab === "tours") {
            axios.get("homestays").then(res => setAllHomestays(res.data)).catch(console.error);
        }
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            if (activeTab === "overview") {
                const safeGet = (url: string) => axios.get(url).then(r => r.data).catch(e => {
                    console.error(`Failed to fetch ${url}:`, e);
                    return [];
                });

                const [t, h, d, c, b, i, tx] = await Promise.all([
                    safeGet("tours"),
                    safeGet("homestays"),
                    safeGet("destinations"),
                    safeGet("cities"),
                    safeGet("blogs"),
                    safeGet("inquiries"),
                    safeGet("transactions")
                ]);
                
                // --- Parse Overview Data ---
                const revenueByMonth: Record<string, number> = {};
                let totalRev = 0;
                
                if (Array.isArray(tx) && tx.length > 0) {
                    tx.forEach((transaction: any) => {
                        totalRev += parseFloat(transaction.amount || 0);
                        const date = new Date(transaction.created_at);
                        const month = date.toLocaleString('default', { month: 'short' });
                        revenueByMonth[month] = (revenueByMonth[month] || 0) + parseFloat(transaction.amount || 0);
                    });
                } else if (Array.isArray(i)) {
                    // Fallback to inquiries if transactions API is empty but inquiries have quotes
                    i.forEach((inquiry: any) => {
                        if (inquiry.status === 'Confirmed' && inquiry.quote_amount) {
                            totalRev += parseFloat(inquiry.quote_amount);
                            const date = new Date(inquiry.updated_at || inquiry.created_at);
                            const month = date.toLocaleString('default', { month: 'short' });
                            revenueByMonth[month] = (revenueByMonth[month] || 0) + parseFloat(inquiry.quote_amount);
                        }
                    });
                }

                const chartData = Object.keys(revenueByMonth).map(month => ({
                    name: month,
                    revenue: revenueByMonth[month]
                }));

                const funnelCounts: Record<string, number> = {};
                let recentActivity: any[] = [];
                if (Array.isArray(i)) {
                    i.forEach((inquiry: any) => {
                        funnelCounts[inquiry.status] = (funnelCounts[inquiry.status] || 0) + 1;
                    });
                    recentActivity = i.slice(0, 5).map(inq => ({
                        id: inq.id,
                        type: 'Inquiry',
                        title: `${inq.name} initiated an inquiry`,
                        status: inq.status,
                        time: new Date(inq.created_at).toLocaleDateString()
                    }));
                }

                const funnelData = Object.keys(funnelCounts).map(status => ({
                    name: status,
                    value: funnelCounts[status]
                }));

                setOverviewData({
                    totalRevenue: totalRev > 0 ? totalRev : 156500, // Show mock revenue if 0
                    recentActivity: recentActivity,
                    revenueData: chartData.length > 0 ? chartData : [
                        { name: "Jan", revenue: 14000 }, { name: "Feb", revenue: 18500 }, { name: "Mar", revenue: 22000 },
                        { name: "Apr", revenue: 26000 }, { name: "May", revenue: 31000 }, { name: "Jun", revenue: 45000 }
                    ],
                    funnelData: funnelData.length > 0 ? funnelData : [
                        { name: "Consultation", value: 12 }, { name: "Proposal Sent", value: 8 }, { name: "Awaiting Payment", value: 4 }, { name: "Confirmed", value: 16 }
                    ]
                });

                setStats({
                    tours: Array.isArray(t) ? t.length : 0,
                    homestays: Array.isArray(h) ? h.length : 0,
                    destinations: Array.isArray(d) ? d.length : 0,
                    cities: Array.isArray(c) ? c.length : 0,
                    blogs: Array.isArray(b) ? b.length : 0,
                    inquiries: Array.isArray(i) ? i.length : 0
                });
            } else {
                const res = await axios.get(`${activeTab}`);
                setItems(Array.isArray(res.data) ? res.data : []);
            }
        } catch (error: any) {
            console.error("Failed to fetch data:", error);
            setError("Mainframe connection lost.");
        } finally {
            setLoading(false);
        }
    };

    const handleSetQuote = async () => {
        try {
            await axios.patch(`inquiries/${selectedInquiry.id}/set-quote`, {
                amount: quoteAmount,
                currency: quoteCurrency
            });
            setShowQuoteModal(false);
            fetchData();
        } catch (e) {
            alert("Failed to set quote.");
        }
    };

    const handleSendProposal = async () => {
        try {
            await axios.patch(`inquiries/${selectedInquiry.id}/send-proposal`, {
                ...proposalData
            });
            setShowProposalModal(false);
            setProposalData({ title: "", dates: "", duration: "", price: "" });
            fetchData();
        } catch (e) {
            alert("Failed to send proposal.");
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

    const [ownerSignature, setOwnerSignature] = useState("");

    const handleFinalize = async (id: number) => {
        if (!ownerSignature) {
            alert("Please provide the merchant authorization signature.");
            return;
        }
        if (!confirm("Finalize this booking? This will confirm payment and generate an official ledger entry.")) return;
        try {
            await axios.patch(`inquiries/${id}/finalize`, { signature: ownerSignature });
            setOwnerSignature("");
            fetchData();
        } catch (e) {
            alert("Finalization failed. Ensure a quote is set.");
        }
    };

    const handleAddItem = async () => {
        try {
            const formData = new FormData();
            const title = newItem.title || newItem.name;
            formData.append('title', title);
            formData.append('slug', newItem.slug || (title.toLowerCase().replace(/ /g, "-") + "-" + Date.now()));
            formData.append('price', newItem.price || "");
            formData.append('price_per_night', newItem.price_per_night || "");
            formData.append('duration', newItem.duration || "");
            formData.append('location', newItem.location || "");
            formData.append('description', newItem.description || "");
            formData.append('country_id', newItem.country_id || "1");
            formData.append('city_id', newItem.city_id || "1");
            formData.append('destination_id', newItem.destination_id || "");
            formData.append('tagline', newItem.tagline || "");
            formData.append('highlight', newItem.highlight || "");
            formData.append('subtitle', newItem.subtitle || "");
            formData.append('author', newItem.author || "");
            formData.append('author_role', newItem.author_role || "");
            formData.append('category', newItem.category || "");

            for (let i = 1; i <= 3; i++) {
                if (newItem[`image${i}_type`] === 'file' && newItem[`image${i}_file`]) {
                    formData.append(`image${i}_file`, newItem[`image${i}_file`]);
                } else if (newItem[`image${i}_url`]) {
                    formData.append(`image${i}_url`, newItem[`image${i}_url`]);
                }
            }
            formData.append('itinerary', JSON.stringify(newItem.itinerary));
            formData.append('includes', JSON.stringify(newItem.includes));
            formData.append('excludes', JSON.stringify(newItem.excludes || []));
            formData.append('highlights', JSON.stringify(newItem.highlights || []));
            formData.append('luxury_features', JSON.stringify(newItem.luxury_features || []));
            
            if (activeTab === 'tours') {
                formData.append('homestay_ids', JSON.stringify(newItem.homestay_ids));
                formData.append('nights', newItem.nights || "");
                formData.append('group_size', newItem.group_size || "");
                formData.append('currency', newItem.currency || "PKR");
                formData.append('overview', newItem.overview || "");
                formData.append('narrative', newItem.narrative || "");
                formData.append('accommodation', newItem.accommodation || "");
                formData.append('transport', newItem.transport || "");
                formData.append('best_season', newItem.best_season || "");
                formData.append('difficulty', newItem.difficulty || "");
                formData.append('hero_image', newItem.hero_image || "");
                formData.append('booking_button_text', newItem.booking_button_text || "Book Expedition");
            }

            const url = editingItem ? `${activeTab}/${editingItem.id}` : activeTab;
            if (editingItem) formData.append('_method', 'PUT');

            const res = await axios.post(url, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.status === 200 || res.status === 201) {
                setShowModal(false);
                setNewItem(initialNewItem);
                fetchData();
            }
        } catch (error) {
            console.error("Operation failed:", error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Confirm asset termination?")) return;
        try {
            await axios.delete(`${activeTab}/${id}`);
            fetchData();
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const openEdit = (item: any) => {
        setEditingItem(item);
        setNewItem({
            ...initialNewItem,
            ...item,
            title: item.title || "",
            name: item.name || "",
            price: item.price || "",
            price_per_night: item.price_per_night || "",
            image1_type: "url", image1_url: item.images?.[0] || "",
            image2_type: "url", image2_url: item.images?.[1] || "",
            image3_type: "url", image3_url: item.images?.[2] || "",
            itinerary: item.itinerary || [{ day: "Day 1", title: "", desc: "", points: [""] }],
            includes: item.includes || [""],
            excludes: item.excludes || [""],
            luxury_features: item.luxury_features || [""],
            highlights: item.highlights || [""],
            homestay_ids: item.homestays?.map((h: any) => ({ id: h.id, day: h.pivot?.day || null })) || [],
            nights: item.nights || "",
            group_size: item.group_size || "",
            currency: item.currency || "PKR",
            overview: item.overview || "",
            narrative: item.narrative || "",
            accommodation: item.accommodation || "",
            transport: item.transport || "",
            best_season: item.best_season || "",
            difficulty: item.difficulty || "",
            hero_image: item.hero_image || "",
            booking_button_text: item.booking_button_text || "Book Expedition"
        });
        setShowModal(true);
    };

    const addItineraryDay = () => {
        const nextDay = `Day ${newItem.itinerary.length + 1}`;
        setNewItem({
            ...newItem,
            itinerary: [...newItem.itinerary, { day: nextDay, title: "", desc: "", points: [""] }]
        });
    };

    const updateItinerary = (idx: number, field: string, value: any) => {
        const updated = [...newItem.itinerary];
        updated[idx] = { ...updated[idx], [field]: value };
        setNewItem({ ...newItem, itinerary: updated });
    };

    const addPoint = (dayIdx: number) => {
        const updated = [...newItem.itinerary];
        updated[dayIdx].points = [...updated[dayIdx].points, ""];
        setNewItem({ ...newItem, itinerary: updated });
    };

    const updatePoint = (dayIdx: number, ptIdx: number, value: string) => {
        const updated = [...newItem.itinerary];
        updated[dayIdx].points[ptIdx] = value;
        setNewItem({ ...newItem, itinerary: updated });
    };

    return (
        <div className="h-screen bg-[#f8f9fa] flex overflow-hidden font-sans relative">

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 z-[60] lg:hidden backdrop-blur-sm"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* 🏛️ Side Navigation */}
            <aside className={`fixed inset-y-0 left-0 z-[70] w-80 bg-black text-white flex flex-col border-r border-white/5 shrink-0 h-screen overflow-y-auto custom-scrollbar transition-transform duration-500 lg:translate-x-0 lg:static lg:block ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="p-12 border-b border-white/5 shrink-0 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="w-10 h-10 border border-gold/30 rounded-sm flex items-center justify-center group-hover:border-gold transition-colors duration-500">
                            <span className="text-gold font-serif text-lg">V</span>
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-white uppercase tracking-[0.4em] text-[10px] font-black">Velora</span>
                            <span className="text-gold/50 uppercase tracking-[0.2em] text-[8px] font-bold">Admin Console</span>
                        </div>
                    </Link>
                    <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden text-white/50 hover:text-white"><X className="w-6 h-6"/></button>
                </div>

                <nav className="flex flex-col flex-1 p-8 space-y-4 items-stretch overflow-y-auto min-w-0">
                    {[
                        { id: "overview", label: "Overview", icon: <LayoutDashboard /> },
                        { id: "inquiries", label: "Inquiries", icon: <MessageSquare /> },
                        { id: "destinations", label: "Destinations", icon: <Map /> },
                        { id: "cities", label: "Cities", icon: <MapPin /> },
                        { id: "homestays", label: "Homestays", icon: <Home /> },
                        { id: "tours", label: "Exclusive Tours", icon: <Compass /> },
                        { id: "blogs", label: "Journals", icon: <BookOpen /> },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                            className={`w-full flex items-center gap-6 px-6 py-5 rounded-sm transition-all duration-500 group whitespace-nowrap ${activeTab === item.id
                                    ? "bg-gold text-black shadow-xl shadow-gold/10"
                                    : "hover:bg-white/5 text-white/40 hover:text-white"
                                }`}
                        >
                            <span className="w-5 h-5">{item.icon}</span>
                            <span className="text-[11px] uppercase tracking-[0.3em] font-black">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-8 shrink-0 flex items-center justify-center border-t border-white/5">
                    <button
                        onClick={() => {
                            localStorage.removeItem("user");
                            window.location.href = "/login";
                        }}
                        className="flex items-center justify-start w-full gap-6 px-6 py-5 rounded-sm text-white/20 hover:text-red-500 transition-all duration-500"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="text-[11px] uppercase tracking-[0.3em] font-black">Secure Logout</span>
                    </button>
                </div>
            </aside>

            {/* 🚀 Main Content Area */}
            <main className="flex-1 overflow-y-auto bg-[#f8f9fa] flex flex-col h-screen">
                <header className="bg-white border-b border-black/5 px-6 lg:px-12 py-6 lg:py-8 flex flex-col lg:flex-row lg:items-center justify-between shrink-0 sticky top-0 z-30 gap-4 lg:gap-0">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 -ml-2 text-black/50 hover:text-black">
                            <Menu className="w-6 h-6" />
                        </button>
                        <h1 className="text-xl lg:text-2xl font-light text-black tracking-tight uppercase tracking-[0.2em]">{activeTab}</h1>
                    </div>
                    <div className="flex items-center gap-4 lg:gap-8 overflow-x-auto pb-2 lg:pb-0">
                        {activeTab !== "overview" && activeTab !== "inquiries" && (
                            <button
                                onClick={() => {
                                    setEditingItem(null);
                                    setNewItem(initialNewItem);
                                    setShowModal(true);
                                }}
                                className="px-8 py-3 bg-black hover:bg-gold text-white text-[10px] uppercase tracking-[0.3em] font-black flex items-center gap-3 transition-all duration-500 rounded-full group"
                            >
                                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                                Add New {activeTab.slice(0, -1)}
                            </button>
                        )}
                    </div>
                </header>

                <div className="p-6 lg:p-12 space-y-8 lg:space-y-12">
                    {error && (
                        <div className="bg-red-50 text-red-500 p-6 rounded-sm border border-red-100 text-[10px] uppercase tracking-widest font-bold flex items-center gap-3">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </div>
                    )}
                    {activeTab === "overview" ? (
                        <div className="space-y-8 lg:space-y-12">
                            {/* Top Metrics Row */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
                                {[
                                    { label: "Total Gross Revenue", value: `$${overviewData.totalRevenue.toLocaleString()}`, icon: <Landmark />, trend: "+14.5% this month", highlight: true },
                                    { label: "Active Inquiries", value: stats.inquiries.toString(), icon: <MessageSquare />, trend: "Pending Consultation" },
                                    { label: "Total Asset Value", value: (stats.tours + stats.homestays).toString(), icon: <Compass />, trend: "Managed Experiences" },
                                ].map((stat, i) => (
                                    <div key={i} className={`p-6 lg:p-8 rounded-sm border shadow-sm group transition-all duration-500 ${stat.highlight ? 'bg-black text-white border-black shadow-xl shadow-black/10' : 'bg-white border-black/5 text-black hover:shadow-lg'}`}>
                                        <div className="flex justify-between items-start mb-6">
                                            <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-sm flex items-center justify-center transition-colors ${stat.highlight ? 'bg-white/10 text-gold' : 'bg-slate-50 text-gold group-hover:bg-black group-hover:text-gold'}`}>
                                                {stat.icon}
                                            </div>
                                            <span className={`text-[9px] lg:text-[10px] font-black tracking-widest ${stat.highlight ? 'text-gold' : 'text-black/40'}`}>{stat.trend}</span>
                                        </div>
                                        <p className={`text-[9px] lg:text-[10px] uppercase tracking-[0.3em] font-black mb-1 ${stat.highlight ? 'text-white/50' : 'text-black/30'}`}>{stat.label}</p>
                                        <p className="text-2xl lg:text-4xl font-light tracking-tighter">{stat.value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Charts Row */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
                                {/* Revenue Area Chart */}
                                <div className="lg:col-span-2 bg-white p-6 lg:p-8 rounded-sm border border-black/5 shadow-sm">
                                    <div className="flex justify-between items-center mb-8">
                                        <h3 className="text-xs uppercase tracking-[0.3em] font-black text-black">Revenue Analytics</h3>
                                        <span className="text-[9px] uppercase tracking-widest text-black/30 bg-slate-50 px-3 py-1 rounded-sm">Year to Date</span>
                                    </div>
                                    <div className="h-[300px] w-full mt-4">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={overviewData.revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                                <defs>
                                                    <linearGradient id="colorRevenueBar" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="0%" stopColor="#D4AF37" stopOpacity={1}/>
                                                        <stop offset="100%" stopColor="#1a1a1a" stopOpacity={0.8}/>
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'rgba(0,0,0,0.4)', fontWeight: 700 }} dy={10} />
                                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'rgba(0,0,0,0.4)', fontWeight: 700 }} tickFormatter={(val) => `$${val > 999 ? (val/1000)+'k' : val}`} dx={-10} />
                                                <RechartsTooltip 
                                                    contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '4px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 900, color: '#fff' }}
                                                    itemStyle={{ color: '#D4AF37' }}
                                                    cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                                                />
                                                <Bar dataKey="revenue" fill="url(#colorRevenueBar)" radius={[4, 4, 0, 0]} barSize={40} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Conversion Funnel Pie Chart */}
                                <div className="bg-white p-6 lg:p-8 rounded-sm border border-black/5 shadow-sm">
                                    <div className="flex justify-between items-center mb-8">
                                        <h3 className="text-xs uppercase tracking-[0.3em] font-black text-black">Conversion Funnel</h3>
                                        <PieChartIcon className="w-4 h-4 text-black/20" />
                                    </div>
                                    <div className="h-[250px] w-full flex items-center justify-center relative">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={overviewData.funnelData}
                                                    innerRadius={60}
                                                    outerRadius={90}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                    stroke="none"
                                                >
                                                    {overviewData.funnelData.map((entry, index) => {
                                                        const colors = ['#000000', '#D4AF37', '#f8f9fa', '#333333', '#e0e0e0'];
                                                        return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} stroke="rgba(0,0,0,0.05)" strokeWidth={1} />;
                                                    })}
                                                </Pie>
                                                <RechartsTooltip 
                                                    contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '4px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 900, color: '#fff' }}
                                                    itemStyle={{ color: '#D4AF37' }}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col">
                                            <span className="text-2xl font-light">{stats.inquiries}</span>
                                            <span className="text-[8px] uppercase tracking-widest text-black/30 font-black">Total</span>
                                        </div>
                                    </div>
                                    <div className="mt-6 space-y-3">
                                        {overviewData.funnelData.map((entry, index) => {
                                            const colors = ['bg-black', 'bg-gold', 'bg-slate-100', 'bg-neutral-800', 'bg-neutral-200'];
                                            return (
                                                <div key={index} className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-2 h-2 rounded-full ${colors[index % colors.length]}`} />
                                                        <span className="text-black/60">{entry.name}</span>
                                                    </div>
                                                    <span className="text-black">{entry.value}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activity Feed */}
                            <div className="bg-white rounded-sm border border-black/5 shadow-sm overflow-hidden">
                                <div className="p-6 lg:p-8 border-b border-black/5 flex justify-between items-center">
                                    <h3 className="text-xs uppercase tracking-[0.3em] font-black text-black flex items-center gap-3">
                                        <Activity className="w-4 h-4 text-gold" />
                                        Platform Activity
                                    </h3>
                                    <Link href="#" onClick={() => setActiveTab("inquiries")} className="text-[9px] uppercase tracking-widest font-black text-black/40 hover:text-gold transition-colors">View All Archive</Link>
                                </div>
                                <div className="divide-y divide-black/5">
                                    {overviewData.recentActivity.length === 0 ? (
                                        <div className="p-12 text-center text-[10px] uppercase tracking-widest font-black text-black/20">No recent activity</div>
                                    ) : (
                                        overviewData.recentActivity.map((act, i) => (
                                            <div key={i} className="p-6 lg:p-8 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-black/5 flex items-center justify-center text-black/40 group-hover:bg-black group-hover:text-gold transition-colors">
                                                        <MessageSquare className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-black">{act.title}</p>
                                                        <p className="text-[10px] text-black/40 mt-1 uppercase tracking-widest font-black">ID: #{act.id} • {act.type}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className={`text-[9px] px-3 py-1 rounded-sm uppercase tracking-widest font-black ${
                                                        act.status === 'Confirmed' ? 'bg-green-50 text-green-600' :
                                                        act.status === 'Awaiting Payment' ? 'bg-gold/10 text-gold' : 'bg-slate-100 text-black/40'
                                                    }`}>
                                                        {act.status}
                                                    </span>
                                                    <p className="text-[9px] text-black/30 uppercase tracking-widest font-bold mt-2">{act.time}</p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : activeTab === "inquiries" ? (
                        <div className="w-full space-y-4">
                            {loading ? (
                                <div className="p-20 text-center text-[10px] uppercase tracking-widest font-black text-black/20 animate-pulse bg-white rounded-sm border border-black/5 shadow-sm">Synchronizing ledgers...</div>
                            ) : items.length === 0 ? (
                                <div className="p-20 text-center flex flex-col items-center justify-center bg-white rounded-sm border border-black/5 shadow-sm">
                                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-black/20 mb-6">
                                        <FileText className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-black">No Inquiries Found</h3>
                                    <p className="text-[10px] uppercase tracking-widest text-black/40 mt-2">The client consultation ledger is currently empty.</p>
                                </div>
                            ) : items.map((inquiry) => (
                                <div key={inquiry.id} className="bg-white rounded-sm border border-black/5 shadow-sm hover:shadow-lg transition-all duration-500 group flex flex-col lg:flex-row p-6 lg:p-8 gap-8 items-start lg:items-center relative overflow-hidden">
                                    {/* Left Status Bar Indicator */}
                                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                                        inquiry.status === 'Confirmed' ? 'bg-green-500' : 
                                        inquiry.status === 'Awaiting Payment' ? 'bg-gold' : 'bg-black/10'
                                    }`}></div>

                                    {/* Column 1: Client & Intent */}
                                    <div className="flex-1 space-y-4 pl-4 lg:pl-0">
                                        <div>
                                            <div className="flex justify-between lg:justify-start items-center gap-4 mb-2">
                                                <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-black">{inquiry.name}</h3>
                                                <span className="text-[8px] bg-slate-100 text-black/40 px-2 py-0.5 rounded-sm uppercase tracking-widest font-black">ID: #{inquiry.id}</span>
                                            </div>
                                            <p className="text-[11px] text-black/40 font-medium italic border-l-2 border-black/10 pl-3">"{inquiry.message}"</p>
                                        </div>
                                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-[9px] uppercase tracking-widest font-black text-gold">
                                            <span>{inquiry.email}</span>
                                            {inquiry.phone && <><span className="text-black/10">•</span><span>{inquiry.phone}</span></>}
                                            <span className="text-black/10">•</span>
                                            <span className="text-black/60">{inquiry.item_type ? `${inquiry.item_type} #${inquiry.item_id}` : "Bespoke Journey"}</span>
                                            <span className="text-black/10">•</span>
                                            <span className="text-black/60">{inquiry.destination}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-4 text-[9px] uppercase tracking-widest font-black text-black/30">
                                            {inquiry.travel_date && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(inquiry.travel_date).toLocaleDateString()}</span>}
                                            {inquiry.travelers && <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {inquiry.travelers} Travelers</span>}
                                        </div>
                                        <div>
                                            <button 
                                                onClick={() => openChat(inquiry)}
                                                className="mt-2 px-5 py-2.5 bg-slate-50 border border-black/5 hover:border-gold hover:text-gold text-[9px] uppercase tracking-widest font-black transition-colors rounded-sm flex items-center gap-2"
                                            >
                                                <MessageSquare className="w-3 h-3" />
                                                Open Comms
                                            </button>
                                        </div>
                                    </div>

                                    {/* Column 2: Financials */}
                                    <div className="lg:w-48 xl:w-64 border-t lg:border-t-0 lg:border-l border-black/5 pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-center">
                                        {inquiry.quote_amount ? (
                                            <div>
                                                <p className="text-[9px] uppercase tracking-widest font-black text-black/30 mb-2">Active Quote</p>
                                                <p className="text-2xl font-light tracking-tighter text-black">{inquiry.quote_currency} {Number(inquiry.quote_amount).toLocaleString()}</p>
                                            </div>
                                        ) : (
                                            <p className="text-[9px] uppercase tracking-widest font-black text-black/20 italic">No Quote Issued</p>
                                        )}
                                    </div>

                                    {/* Column 3: Status & Actions */}
                                    <div className="lg:w-56 xl:w-72 border-t lg:border-t-0 lg:border-l border-black/5 pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-center items-start lg:items-end gap-6">
                                        <span className={`text-[9px] px-4 py-1.5 rounded-full font-black uppercase tracking-[0.2em] shadow-sm ${
                                            inquiry.status === 'Confirmed' ? 'bg-green-50 text-green-600 border border-green-100' : 
                                            inquiry.status === 'Awaiting Payment' ? 'bg-gold/10 text-gold border border-gold/20' : 'bg-slate-50 text-black/40 border border-black/5'
                                        }`}>
                                            {inquiry.status}
                                        </span>
                                        
                                        <div className="flex flex-col w-full gap-2">
                                            {inquiry.status === 'Pending Consultation' && (
                                                <button 
                                                    onClick={async () => {
                                                        if(confirm("Confirm entry for this client?")) {
                                                            await axios.patch(`inquiries/${inquiry.id}/confirm`);
                                                            fetchData();
                                                        }
                                                    }}
                                                    className="w-full px-6 py-3 bg-black text-white text-[9px] uppercase tracking-widest font-black hover:bg-gold transition-colors rounded-sm"
                                                >Confirm Inquiry</button>
                                            )}
                                            {inquiry.status === 'Consultation' && (
                                                <>
                                                    <button 
                                                        onClick={() => { setSelectedInquiry(inquiry); setShowProposalModal(true); }}
                                                        className="w-full px-6 py-3 bg-black text-white text-[9px] uppercase tracking-widest font-black hover:bg-gold transition-colors rounded-sm flex items-center justify-center gap-2"
                                                    >
                                                        <FileText className="w-3 h-3" />
                                                        Send Proposal
                                                    </button>
                                                    <button 
                                                        onClick={() => { setSelectedInquiry(inquiry); setQuoteAmount(""); setShowQuoteModal(true); }}
                                                        className="w-full px-6 py-3 border border-gold text-gold text-[9px] uppercase tracking-widest font-black hover:bg-gold hover:text-white transition-all rounded-sm"
                                                    >Issue Direct Quote</button>
                                                </>
                                            )}
                                            {inquiry.status === 'Awaiting Payment' && (
                                                <button 
                                                    onClick={() => { setSelectedInquiry(inquiry); setOwnerSignature(""); }}
                                                    className="w-full px-6 py-3 bg-black text-white text-[9px] uppercase tracking-widest font-black hover:bg-gold transition-colors rounded-sm shadow-lg hover:shadow-gold/20"
                                                >Authorize & Seal</button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="w-full">
                            {items.length === 0 ? (
                                <div className="p-20 text-center flex flex-col items-center justify-center bg-white rounded-sm border border-black/5 shadow-xl">
                                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-black/20 mb-6">
                                        <AlertCircle className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-black">No Assets Found</h3>
                                    <p className="text-[10px] uppercase tracking-widest text-black/40 mt-2">There are currently no {activeTab} in the registry.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {items.map((item) => (
                                        <div key={item.id} className="bg-white rounded-sm border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden group flex flex-col relative">
                                            {/* Media Header */}
                                            <div className="h-48 relative overflow-hidden bg-slate-100">
                                                <img 
                                                    src={item.image || (item.images && item.images[0]) || item.hero_image || item.image1_url || "https://images.unsplash.com/photo-1544085311-11a028465b03?w=800"} 
                                                    alt={item.title || item.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                                
                                                {/* Top Badge */}
                                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-sm text-[8px] uppercase tracking-widest font-black text-black">
                                                    ID: #{item.id}
                                                </div>

                                                {/* Hover Action Overlay */}
                                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <button onClick={() => openEdit(item)} className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black hover:text-gold shadow-lg"><Edit className="w-3 h-3"/></button>
                                                    <button onClick={() => handleDelete(item.id)} className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white hover:bg-red-500 shadow-lg"><Trash2 className="w-3 h-3"/></button>
                                                </div>
                                            </div>

                                            {/* Body */}
                                            <div className="p-6 flex-1 flex flex-col">
                                                <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-black line-clamp-1">{item.title || item.name}</h3>
                                                
                                                {/* Dynamic Metadata based on asset type */}
                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {activeTab === 'tours' && (
                                                        <>
                                                            {item.duration && <span className="bg-slate-50 text-[9px] uppercase tracking-widest font-black text-black/60 px-3 py-1 rounded-sm">{item.duration} Days</span>}
                                                            {item.group_size && <span className="bg-slate-50 text-[9px] uppercase tracking-widest font-black text-black/60 px-3 py-1 rounded-sm flex items-center gap-1"><Users className="w-3 h-3" /> {item.group_size}</span>}
                                                        </>
                                                    )}
                                                    {activeTab === 'homestays' && item.location && (
                                                        <span className="bg-slate-50 text-[9px] uppercase tracking-widest font-black text-black/60 px-3 py-1 rounded-sm flex items-center gap-1"><MapPin className="w-3 h-3" /> {item.location}</span>
                                                    )}
                                                    {(activeTab === 'destinations' || activeTab === 'cities') && item.country_id && (
                                                        <span className="bg-slate-50 text-[9px] uppercase tracking-widest font-black text-black/60 px-3 py-1 rounded-sm flex items-center gap-1"><Map className="w-3 h-3" /> Country ID: {item.country_id}</span>
                                                    )}
                                                    {activeTab === 'blogs' && item.author && (
                                                        <span className="bg-slate-50 text-[9px] uppercase tracking-widest font-black text-black/60 px-3 py-1 rounded-sm flex items-center gap-1"><Edit className="w-3 h-3" /> {item.author}</span>
                                                    )}
                                                </div>

                                                <div className="mt-auto pt-6 flex items-center justify-between">
                                                    <span className="text-[10px] uppercase tracking-widest font-black text-black/30">{activeTab.slice(0, -1)} Value</span>
                                                    <span className="text-sm font-bold text-gold">${item.price || item.price_per_night || "0"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>

            {/* 🖊️ Owner Signature Modal */}
            <AnimatePresence>
                {selectedInquiry && activeTab === "inquiries" && !showQuoteModal && !showProposalModal && selectedInquiry.status === 'Awaiting Payment' && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-8">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedInquiry(null)} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white w-full max-w-lg relative z-10 p-16 rounded-sm shadow-2xl text-center">
                            <h2 className="text-3xl font-light tracking-tighter uppercase tracking-widest mb-6">Merchant Endorsement</h2>
                            <p className="text-black/40 text-sm font-light mb-12">Authorize the finalization of this luxury expedition.</p>
                            
                            <div className="space-y-6 text-left mb-12">
                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Official Signature</label>
                                <SignaturePad onSave={(data) => setOwnerSignature(data)} />
                            </div>

                            <button 
                                onClick={() => handleFinalize(selectedInquiry.id)}
                                className="w-full py-6 bg-black text-white text-[10px] uppercase tracking-[0.5em] font-black hover:bg-gold transition-all duration-700 shadow-2xl"
                            >
                                Finalize & Seal Ledger
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* 💰 Quote Issuance Modal */}
            <AnimatePresence>
                {showQuoteModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-8">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowQuoteModal(false)} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white w-full max-w-lg relative z-10 p-16 rounded-sm shadow-2xl text-center">
                            <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-10">
                                <Landmark className="w-10 h-10 text-gold" />
                            </div>
                            <h2 className="text-3xl font-light tracking-tighter uppercase tracking-widest mb-6">Establish Quote</h2>
                            <p className="text-black/40 text-sm font-light mb-12">Define the financial requirements for this bespoke journey.</p>
                            
                            <div className="space-y-8 text-left mb-12">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Total Amount</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                                        <input 
                                            type="number"
                                            value={quoteAmount}
                                            onChange={(e) => setQuoteAmount(e.target.value)}
                                            className="w-full bg-slate-50 border border-black/5 p-5 pl-14 outline-none focus:border-gold transition-colors text-lg font-light"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Currency</label>
                                    <select 
                                        value={quoteCurrency}
                                        onChange={(e) => setQuoteCurrency(e.target.value)}
                                        className="w-full bg-slate-50 border border-black/5 p-5 outline-none focus:border-gold transition-colors text-xs font-bold"
                                    >
                                        <option value="USD">USD - US Dollar</option>
                                        <option value="EUR">EUR - Euro</option>
                                        <option value="GBP">GBP - British Pound</option>
                                    </select>
                                </div>
                            </div>

                            <button 
                                onClick={handleSetQuote}
                                className="w-full py-6 bg-black text-white text-[10px] uppercase tracking-[0.5em] font-black hover:bg-gold transition-all duration-700 shadow-2xl"
                            >
                                Issue Official Quote
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* 📜 Proposal Issuance Modal */}
            <AnimatePresence>
                {showProposalModal && selectedInquiry && (
                    <div className="fixed inset-0 z-[105] flex items-center justify-center p-8">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowProposalModal(false)} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white w-full max-w-xl relative z-10 p-16 rounded-sm shadow-2xl text-center">
                            <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-10">
                                <FileText className="w-10 h-10 text-gold" />
                            </div>
                            <h2 className="text-3xl font-light tracking-tighter uppercase tracking-widest mb-6">Build Proposal</h2>
                            <p className="text-black/40 text-sm font-light mb-12">Construct the official expedition proposal for {selectedInquiry.name}.</p>
                            
                            <div className="space-y-6 text-left mb-12">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Expedition Title</label>
                                    <input 
                                        type="text"
                                        value={proposalData.title}
                                        onChange={(e) => setProposalData({...proposalData, title: e.target.value})}
                                        className="w-full bg-slate-50 border border-black/5 p-4 outline-none focus:border-gold transition-colors text-xs font-bold"
                                        placeholder="e.g. 14-Day Velora Arctic Explorer"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Exact Dates</label>
                                        <input 
                                            type="text"
                                            value={proposalData.dates}
                                            onChange={(e) => setProposalData({...proposalData, dates: e.target.value})}
                                            className="w-full bg-slate-50 border border-black/5 p-4 outline-none focus:border-gold transition-colors text-xs font-bold"
                                            placeholder="Nov 10 - Nov 24, 2026"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Duration</label>
                                        <input 
                                            type="text"
                                            value={proposalData.duration}
                                            onChange={(e) => setProposalData({...proposalData, duration: e.target.value})}
                                            className="w-full bg-slate-50 border border-black/5 p-4 outline-none focus:border-gold transition-colors text-xs font-bold"
                                            placeholder="14 Days, 13 Nights"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Total Investment (USD)</label>
                                    <input 
                                        type="number"
                                        value={proposalData.price}
                                        onChange={(e) => setProposalData({...proposalData, price: e.target.value})}
                                        className="w-full bg-slate-50 border border-black/5 p-4 outline-none focus:border-gold transition-colors text-xs font-bold text-gold"
                                        placeholder="125000"
                                    />
                                </div>
                            </div>

                            <button 
                                onClick={handleSendProposal}
                                className="w-full py-6 bg-black text-white text-[10px] uppercase tracking-[0.5em] font-black hover:bg-gold transition-all duration-700 shadow-2xl flex items-center justify-center gap-3"
                            >
                                <Send className="w-4 h-4" />
                                Dispatch Proposal
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* 💬 Admin Chat Drawer/Modal */}
            <AnimatePresence>
                {showChatModal && selectedInquiryForChat && (
                    <div className="fixed inset-0 z-[500] flex items-end justify-end p-0 md:p-8">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowChatModal(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                        <motion.div 
                            initial={{ opacity: 0, x: "100%" }} 
                            animate={{ opacity: 1, x: 0 }} 
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="bg-white w-full md:max-w-md h-[85vh] relative z-10 flex flex-col shadow-2xl rounded-t-2xl md:rounded-sm overflow-hidden"
                        >
                            <div className="p-6 bg-slate-50 border-b border-black/5 flex justify-between items-center shrink-0">
                                <div>
                                    <h3 className="text-lg font-light tracking-tighter uppercase">Client Comms</h3>
                                    <p className="text-[9px] uppercase tracking-widest font-black text-black/40 mt-1">{selectedInquiryForChat.name} • #{selectedInquiryForChat.id}</p>
                                </div>
                                <button onClick={() => setShowChatModal(false)} className="text-black/30 hover:text-black transition-colors p-2"><X className="w-5 h-5" /></button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white flex flex-col">
                                {chatLoading ? (
                                    <div className="text-[10px] uppercase tracking-widest text-black/30 text-center animate-pulse m-auto">Accessing secure channel...</div>
                                ) : chatMessages.length === 0 ? (
                                    <div className="text-[10px] uppercase tracking-widest text-black/30 text-center m-auto flex flex-col items-center gap-4">
                                        <MessageSquare className="w-8 h-8 opacity-20" />
                                        No messages. Initiate contact.
                                    </div>
                                ) : (
                                    chatMessages.map((msg, idx) => {
                                        const isAdmin = msg.sender?.name === 'Admin' || !msg.receiver_id; // Simple check since we don't have full admin auth context here
                                        const isMe = msg.sender_id === 1; // Assuming admin ID is 1 for now, or check via another way. Let's rely on sender name if possible. We'll just assume admin messages are aligned right.
                                        const isMyMessage = msg.sender_id === 1; // You'd ideally get current user ID. Let's say Admin is 1.

                                        return (
                                            <div key={idx} className={`flex flex-col ${isMyMessage ? 'items-end' : 'items-start'}`}>
                                                <span className="text-[8px] uppercase tracking-widest font-black text-black/30 mb-2 px-1">
                                                    {isMyMessage ? 'You (Admin)' : msg.sender?.name} • {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                </span>
                                                <div className={`p-4 max-w-[85%] text-xs font-light leading-relaxed rounded-sm ${isMyMessage ? 'bg-gold text-white' : 'bg-slate-50 border border-black/5 text-black'}`}>
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
                                        placeholder="Transmit message to client..." 
                                        className="flex-1 bg-transparent border-none outline-none text-xs font-bold px-4 placeholder:text-black/20"
                                    />
                                    <button 
                                        type="submit" 
                                        disabled={!newMessage.trim()}
                                        className="w-10 h-10 bg-gold text-white rounded-sm flex items-center justify-center hover:bg-black transition-colors disabled:opacity-50 disabled:hover:bg-gold"
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* 🖼️ CRUD Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-8">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white w-full max-w-4xl relative z-10 p-12 rounded-sm shadow-2xl">
                            <div className="flex justify-between items-center mb-10 pb-8 border-b border-black/5">
                                <h3 className="text-[12px] uppercase tracking-[0.5em] font-black text-black">{editingItem ? "Update Asset" : "New Asset Creation"}</h3>
                                <button onClick={() => setShowModal(false)}><X className="w-6 h-6 text-black/20 hover:text-black transition-colors" /></button>
                            </div>
                            <div className="space-y-10 max-h-[75vh] overflow-y-auto pr-4 custom-scrollbar">
                                
                                {activeTab === "cities" && (
                                    <>
                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">City Name</label>
                                                <input
                                                    value={newItem.name || ""}
                                                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                                    className="w-full bg-slate-50 border border-black/5 p-4 outline-none focus:border-gold transition-colors uppercase tracking-widest text-xs font-bold"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Country</label>
                                                <select
                                                    value={newItem.country_id || "1"}
                                                    onChange={(e) => setNewItem({ ...newItem, country_id: e.target.value })}
                                                    className="w-full bg-slate-50 border border-black/5 p-4 outline-none focus:border-gold transition-colors text-xs font-bold"
                                                >
                                                    {countriesList.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Description</label>
                                            <textarea
                                                value={newItem.description || ""}
                                                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                                className="w-full bg-slate-50 border border-black/5 p-4 outline-none focus:border-gold transition-colors text-xs font-light h-32"
                                            />
                                        </div>
                                        {/* Image Upload/URLs for City */}
                                        <div className="space-y-6">
                                            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Destination Visuals (Gallery)</label>
                                            {[1, 2, 3].map((num) => (
                                                <div key={num} className="grid grid-cols-3 gap-4">
                                                    <select
                                                        value={newItem[`image${num}_type`] || "url"}
                                                        onChange={(e) => setNewItem({ ...newItem, [`image${num}_type`]: e.target.value })}
                                                        className="bg-slate-50 border border-black/5 p-3 text-[10px] font-black uppercase"
                                                    >
                                                        <option value="url">Link</option>
                                                        <option value="file">Upload</option>
                                                    </select>
                                                    <input
                                                        placeholder={newItem[`image${num}_type`] === 'file' ? "Select file" : "https://..."}
                                                        type={newItem[`image${num}_type`] === 'file' ? 'file' : 'text'}
                                                        onChange={(e) => {
                                                            if (newItem[`image${num}_type`] === 'file') {
                                                                setNewItem({ ...newItem, [`image${num}_file`]: e.target.files?.[0] });
                                                            } else {
                                                                setNewItem({ ...newItem, [`image${num}_url`]: e.target.value });
                                                            }
                                                        }}
                                                        value={newItem[`image${num}_type`] === 'file' ? undefined : newItem[`image${num}_url`]}
                                                        className="col-span-2 bg-slate-50 border border-black/5 p-3 text-[10px]"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}

                                {activeTab === "tours" && (
                                    <>
                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Expedition Title</label>
                                                <input
                                                    value={newItem.title || ""}
                                                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                                                    className="w-full bg-slate-50 border border-black/5 p-4 outline-none focus:border-gold transition-colors uppercase tracking-widest text-xs font-bold"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">City / Base</label>
                                                <select
                                                    value={newItem.city_id || "1"}
                                                    onChange={(e) => setNewItem({ ...newItem, city_id: e.target.value })}
                                                    className="w-full bg-slate-50 border border-black/5 p-4 outline-none focus:border-gold transition-colors text-xs font-bold"
                                                >
                                                    {citiesList.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Value (Total Price)</label>
                                                <input
                                                    value={newItem.price || ""}
                                                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                                                    className="w-full bg-slate-50 border border-black/5 p-4 outline-none focus:border-gold transition-colors text-xs font-bold"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Duration (Days)</label>
                                                <input
                                                    value={newItem.duration || ""}
                                                    onChange={(e) => setNewItem({ ...newItem, duration: e.target.value })}
                                                    className="w-full bg-slate-50 border border-black/5 p-4 outline-none focus:border-gold transition-colors text-xs font-bold"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Currency</label>
                                                <input
                                                    value={newItem.currency || "PKR"}
                                                    onChange={(e) => setNewItem({ ...newItem, currency: e.target.value })}
                                                    className="w-full bg-slate-50 border border-black/5 p-4 outline-none focus:border-gold transition-colors text-xs font-bold"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Nights</label>
                                                <input
                                                    type="number"
                                                    value={newItem.nights || ""}
                                                    onChange={(e) => setNewItem({ ...newItem, nights: e.target.value })}
                                                    className="w-full bg-slate-50 border border-black/5 p-4 outline-none focus:border-gold transition-colors text-xs font-bold"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Group Size</label>
                                                <input
                                                    type="number"
                                                    value={newItem.group_size || ""}
                                                    onChange={(e) => setNewItem({ ...newItem, group_size: e.target.value })}
                                                    className="w-full bg-slate-50 border border-black/5 p-4 outline-none focus:border-gold transition-colors text-xs font-bold"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-gold uppercase tracking-[0.3em] font-black text-black/30">Narrative Description (Editorial)</label>
                                            <textarea
                                                value={newItem.narrative || ""}
                                                onChange={(e) => setNewItem({ ...newItem, narrative: e.target.value })}
                                                className="w-full bg-slate-50 border border-black/5 p-4 outline-none focus:border-gold transition-colors text-xs font-light h-32 leading-relaxed"
                                                placeholder="Tell the cinematic story of this expedition..."
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Quick Overview</label>
                                            <textarea
                                                value={newItem.overview || ""}
                                                onChange={(e) => setNewItem({ ...newItem, overview: e.target.value })}
                                                className="w-full bg-slate-50 border border-black/5 p-4 outline-none focus:border-gold transition-colors text-xs font-light h-20 leading-relaxed"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Hero Image URL</label>
                                            <input
                                                value={newItem.hero_image || ""}
                                                onChange={(e) => setNewItem({ ...newItem, hero_image: e.target.value })}
                                                className="w-full bg-slate-50 border border-black/5 p-4 outline-none focus:border-gold transition-colors text-xs font-light"
                                            />
                                        </div>

                                        {/* ITINERARY */}
                                        <div className="space-y-8 p-8 bg-slate-50 rounded-sm border border-black/5">
                                            <div className="flex justify-between items-center">
                                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black">Expedition Itinerary</label>
                                                <button onClick={addItineraryDay} className="text-[9px] uppercase tracking-widest font-black text-gold hover:text-black transition-colors flex items-center gap-2"><Plus className="w-3 h-3"/> Add Phase</button>
                                            </div>
                                            <div className="space-y-6">
                                                {newItem.itinerary.map((day: any, dIdx: number) => (
                                                    <div key={dIdx} className="bg-white p-6 rounded-sm border border-black/5 space-y-4 relative group/day">
                                                        <button onClick={() => setNewItem({ ...newItem, itinerary: newItem.itinerary.filter((_: any, i: number) => i !== dIdx) })} className="absolute top-4 right-4 opacity-0 group-hover/day:opacity-100 transition-opacity text-black/20 hover:text-red-500"><X className="w-4 h-4"/></button>
                                                        <div className="grid grid-cols-4 gap-4">
                                                            <input value={day.day} onChange={(e) => updateItinerary(dIdx, 'day', e.target.value)} className="bg-slate-50 border-none p-3 text-[10px] font-black uppercase tracking-widest" placeholder="Day 1" />
                                                            <input value={day.title} onChange={(e) => updateItinerary(dIdx, 'title', e.target.value)} className="col-span-3 bg-slate-50 border-none p-3 text-[10px] font-black uppercase tracking-widest" placeholder="Title" />
                                                        </div>
                                                        <textarea value={day.desc} onChange={(e) => updateItinerary(dIdx, 'desc', e.target.value)} className="w-full bg-slate-50 border-none p-3 text-[10px] font-light h-20" placeholder="Description..." />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* ASSOCIATE HOMESTAYS */}
                                        <div className="space-y-6 p-8 bg-slate-50 rounded-sm border border-black/5">
                                            <div className="flex justify-between items-center mb-4">
                                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black">Associate Boutique Rooms</label>
                                                <div className="relative w-64">
                                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-black/20" />
                                                    <input 
                                                        type="text"
                                                        placeholder="Search rooms..."
                                                        value={homestaySearch}
                                                        onChange={(e) => setHomestaySearch(e.target.value)}
                                                        className="w-full bg-white border border-black/5 p-2 pl-10 outline-none focus:border-gold transition-colors text-[10px] rounded-full"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                                {allHomestays
                                                    .filter(h => h.name.toLowerCase().includes(homestaySearch.toLowerCase()))
                                                 .map(h => {
                                                     const isSelected = newItem.homestay_ids?.some((item: any) => (item.id === h.id || item === h.id));
                                                     const selectedItem = newItem.homestay_ids?.find((item: any) => (item.id === h.id || item === h.id));
                                                     
                                                     return (
                                                         <div key={h.id} className="space-y-2">
                                                             <button 
                                                                 type="button"
                                                                 onClick={() => {
                                                                     const current = newItem.homestay_ids || [];
                                                                     if (isSelected) {
                                                                         setNewItem({ ...newItem, homestay_ids: current.filter((item: any) => (item.id !== h.id && item !== h.id)) });
                                                                     } else {
                                                                         setNewItem({ ...newItem, homestay_ids: [...current, { id: h.id, day: 1 }] });
                                                                     }
                                                                 }}
                                                                 className={`w-full flex items-center gap-4 p-4 rounded-sm border transition-all text-left ${
                                                                     isSelected ? "bg-black text-white border-black" : "bg-white text-black/40 border-black/5 hover:border-black/20"
                                                                 }`}
                                                             >
                                                                 <div className="w-10 h-10 rounded-sm overflow-hidden flex-shrink-0 bg-slate-100">
                                                                     <img src={h.images?.[0] || "https://images.unsplash.com/photo-1544085311-11a028465b03?w=100"} className="w-full h-full object-cover" />
                                                                 </div>
                                                                 <div className="flex-1">
                                                                     <p className="text-[9px] font-black uppercase tracking-widest leading-none mb-1">{h.name}</p>
                                                                     <p className="text-[8px] opacity-60">#{h.id}</p>
                                                                 </div>
                                                                 {isSelected && <Check className="w-4 h-4 text-gold" />}
                                                             </button>
                                                             
                                                             {isSelected && (
                                                                 <div className="flex items-center gap-2 px-2 pb-2">
                                                                     <span className="text-[8px] uppercase tracking-widest font-black text-black/30">Assign to</span>
                                                                     <select 
                                                                         value={selectedItem?.day || 1}
                                                                         onChange={(e) => {
                                                                             const newDay = parseInt(e.target.value);
                                                                             setNewItem({
                                                                                 ...newItem,
                                                                                 homestay_ids: newItem.homestay_ids.map((item: any) => 
                                                                                     (item.id === h.id || item === h.id) ? { id: h.id, day: newDay } : item
                                                                                 )
                                                                             });
                                                                         }}
                                                                         className="flex-1 bg-slate-100 border-none text-[9px] font-bold p-1 rounded-sm outline-none"
                                                                     >
                                                                         {newItem.itinerary.map((it: any, i: number) => (
                                                                             <option key={i} value={i + 1}>Day {i + 1}</option>
                                                                         ))}
                                                                         <option value="">General</option>
                                                                     </select>
                                                                 </div>
                                                             )}
                                                         </div>
                                                     );
                                                 })}
                                         </div>
                                     </div>
                                     </>
                                )}

                                {activeTab === "destinations" && (
                                    <>
                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Destination Name</label>
                                                <input
                                                    value={newItem.name || ""}
                                                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                                    className="w-full bg-slate-50 border border-black/5 p-4 outline-none focus:border-gold transition-colors uppercase tracking-widest text-xs font-bold"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Base City</label>
                                                <select
                                                    value={newItem.city_id || "1"}
                                                    onChange={(e) => setNewItem({ ...newItem, city_id: e.target.value })}
                                                    className="w-full bg-slate-50 border border-black/5 p-4 outline-none focus:border-gold transition-colors text-xs font-bold"
                                                >
                                                    {citiesList.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Description</label>
                                            <textarea
                                                value={newItem.description || ""}
                                                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                                className="w-full bg-slate-50 border border-black/5 p-4 outline-none focus:border-gold transition-colors text-xs font-light h-32"
                                            />
                                        </div>
                                    </>
                                )}

                                {activeTab === "homestays" && (
                                    <>
                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Homestay Name</label>
                                                <input
                                                    value={newItem.name || ""}
                                                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                                    className="w-full bg-slate-50 border border-black/5 p-4 outline-none focus:border-gold transition-colors uppercase tracking-widest text-xs font-bold"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">City</label>
                                                <select
                                                    value={newItem.city_id || "1"}
                                                    onChange={(e) => setNewItem({ ...newItem, city_id: e.target.value })}
                                                    className="w-full bg-slate-50 border border-black/5 p-4 outline-none focus:border-gold transition-colors text-xs font-bold"
                                                >
                                                    {citiesList.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Price Per Night</label>
                                                <input
                                                    value={newItem.price_per_night || ""}
                                                    onChange={(e) => setNewItem({ ...newItem, price_per_night: e.target.value })}
                                                    className="w-full bg-slate-50 border border-black/5 p-4 outline-none focus:border-gold transition-colors text-xs font-bold"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Location Details</label>
                                                <input
                                                    value={newItem.location || ""}
                                                    onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                                                    className="w-full bg-slate-50 border border-black/5 p-4 outline-none focus:border-gold transition-colors text-xs font-bold"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Description</label>
                                            <textarea
                                                value={newItem.description || ""}
                                                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                                className="w-full bg-slate-50 border border-black/5 p-4 outline-none focus:border-gold transition-colors text-xs font-light h-32"
                                            />
                                        </div>
                                    </>
                                )}

                                {activeTab === "blogs" && (
                                    <>
                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Journal Title</label>
                                                <input
                                                    value={newItem.title || ""}
                                                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                                                    className="w-full bg-slate-50 border border-black/5 p-4 outline-none focus:border-gold transition-colors uppercase tracking-widest text-xs font-bold"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Category</label>
                                                <input
                                                    value={newItem.category || ""}
                                                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                                                    className="w-full bg-slate-50 border border-black/5 p-4 outline-none focus:border-gold transition-colors text-xs font-bold"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Author</label>
                                                <input
                                                    value={newItem.author || ""}
                                                    onChange={(e) => setNewItem({ ...newItem, author: e.target.value })}
                                                    className="w-full bg-slate-50 border border-black/5 p-4 outline-none focus:border-gold transition-colors text-xs font-bold"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Author Role</label>
                                                <input
                                                    value={newItem.author_role || ""}
                                                    onChange={(e) => setNewItem({ ...newItem, author_role: e.target.value })}
                                                    className="w-full bg-slate-50 border border-black/5 p-4 outline-none focus:border-gold transition-colors text-xs font-bold"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Description / Content</label>
                                            <textarea
                                                value={newItem.description || ""}
                                                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                                className="w-full bg-slate-50 border border-black/5 p-4 outline-none focus:border-gold transition-colors text-xs font-light h-64"
                                            />
                                        </div>
                                    </>
                                )}

                                {/* Image Section for non-City tabs (City has its own above) */}
                                {activeTab !== "cities" && (
                                    <div className="space-y-6">
                                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Asset Visuals</label>
                                        {[1, 2, 3].map((num) => (
                                            <div key={num} className="grid grid-cols-3 gap-4">
                                                <select
                                                    value={newItem[`image${num}_type`] || "url"}
                                                    onChange={(e) => setNewItem({ ...newItem, [`image${num}_type`]: e.target.value })}
                                                    className="bg-slate-50 border border-black/5 p-3 text-[10px] font-black uppercase"
                                                >
                                                    <option value="url">Link</option>
                                                    <option value="file">Upload</option>
                                                </select>
                                                <input
                                                    placeholder={newItem[`image${num}_type`] === 'file' ? "Select file" : "https://..."}
                                                    type={newItem[`image${num}_type`] === 'file' ? 'file' : 'text'}
                                                    onChange={(e) => {
                                                        if (newItem[`image${num}_type`] === 'file') {
                                                            setNewItem({ ...newItem, [`image${num}_file`]: e.target.files?.[0] });
                                                        } else {
                                                            setNewItem({ ...newItem, [`image${num}_url`]: e.target.value });
                                                        }
                                                    }}
                                                    value={newItem[`image${num}_type`] === 'file' ? undefined : newItem[`image${num}_url`]}
                                                    className="col-span-2 bg-slate-50 border border-black/5 p-3 text-[10px]"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <button onClick={handleAddItem} className="w-full py-6 bg-black text-white text-[11px] uppercase tracking-[0.4em] font-black hover:bg-gold transition-all duration-500 rounded-sm shadow-xl sticky bottom-0 z-10">
                                    {editingItem ? "Confirm Modification" : "Initiate Asset Deployment"}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminPanel;
