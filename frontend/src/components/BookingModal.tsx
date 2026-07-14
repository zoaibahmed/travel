"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, ShieldCheck, DollarSign, MapPin, CheckCircle2 } from "lucide-react";
import axios from "@/lib/axios";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  itemType: string;
  itemId: number;
  price?: string | number;
}

const BookingModal: React.FC<BookingModalProps> = ({ 
  isOpen, 
  onClose, 
  itemName, 
  itemType, 
  itemId,
  price 
}) => {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    travel_date: string;
    travelers: number | string;
    message: string;
  }>(() => {
    let storedUser: any = null;
    if (typeof window !== "undefined") {
      const userJson = localStorage.getItem("user");
      if (userJson) storedUser = JSON.parse(userJson);
    }
    return {
      name: storedUser?.name || "",
      email: storedUser?.email || "",
      phone: "",
      travel_date: "",
      travelers: 2,
      message: `I am interested in booking the ${itemName}. Please provide more details regarding availability and customization.`,
    };
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("inquiries", {
        ...formData,
        destination: itemName, // itemName acts as the destination/subject
        item_type: itemType,
        item_id: itemId,
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        
        if (res.data.needs_setup) {
            window.location.href = `/setup-password?token=${res.data.setup_token}&email=${encodeURIComponent(res.data.email)}`;
        } else {
            window.location.href = "/dashboard?tab=Expeditions";
        }
      }, 3000);
    } catch (error) {
      alert("Consultation request failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-8">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md" 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 20 }}
            className="bg-white w-full max-w-lg relative z-10 overflow-hidden rounded-sm shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
          >
            <div className="p-8 border-b border-black/5 flex items-center justify-between bg-slate-50/50">
                <div>
                    <span className="text-gold uppercase tracking-[0.5em] text-[9px] font-black mb-1 block">Secure Consultation</span>
                    <h2 className="text-xl font-light uppercase tracking-widest">Inquiry Pipeline</h2>
                </div>
                <button onClick={onClose} className="text-black/20 hover:text-black transition-colors"><X className="w-6 h-6" /></button>
            </div>

            {!success ? (
                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    
                    {/* 💎 SELECTED ITEM DISPLAY (Read Only) */}
                    <div className="p-5 bg-black text-white rounded-sm flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gold">
                                <MapPin className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-[8px] uppercase tracking-[0.3em] font-black text-white/40 mb-1">Experience</p>
                                <p className="text-xs font-bold uppercase tracking-widest">{itemName}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[8px] uppercase tracking-[0.3em] font-black text-white/40 mb-1">Est. Value</p>
                            <p className="text-xs font-black text-gold">${price || "Custom"}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-[9px] uppercase tracking-[0.3em] font-black text-black/30">Your Name</label>
                            <input 
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full bg-slate-50 border border-black/5 p-3.5 outline-none focus:border-gold transition-colors text-[10px] font-bold uppercase tracking-widest"
                                placeholder="ALEXANDER VANCE"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[9px] uppercase tracking-[0.3em] font-black text-black/30">Private Email</label>
                            <input 
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full bg-slate-50 border border-black/5 p-3.5 outline-none focus:border-gold transition-colors text-[10px] font-bold uppercase tracking-widest"
                                placeholder="alex@velora.elite"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-[9px] uppercase tracking-[0.3em] font-black text-black/30">Phone</label>
                            <input 
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                className="w-full bg-slate-50 border border-black/5 p-3.5 outline-none focus:border-gold transition-colors text-[10px] font-bold uppercase tracking-widest"
                                placeholder="+1 234 567 8900"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[9px] uppercase tracking-[0.3em] font-black text-black/30">Travel Date</label>
                            <input 
                                type="date"
                                required
                                value={formData.travel_date}
                                onChange={(e) => setFormData({...formData, travel_date: e.target.value})}
                                className="w-full bg-slate-50 border border-black/5 p-3.5 outline-none focus:border-gold transition-colors text-[10px] font-bold uppercase tracking-widest"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[9px] uppercase tracking-[0.3em] font-black text-black/30">Travelers</label>
                            <input 
                                type="number"
                                min="1"
                                required
                                value={formData.travelers}
                                onChange={(e) => setFormData({...formData, travelers: e.target.value === '' ? '' : parseInt(e.target.value)})}
                                className="w-full bg-slate-50 border border-black/5 p-3.5 outline-none focus:border-gold transition-colors text-[10px] font-bold uppercase tracking-widest"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[9px] uppercase tracking-[0.3em] font-black text-black/30">Consultation Notes</label>
                        <textarea 
                            rows={3}
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                            className="w-full bg-slate-50 border border-black/5 p-3.5 outline-none focus:border-gold transition-colors text-xs font-light leading-relaxed"
                        />
                    </div>

                    <div className="flex items-center gap-4 text-black/30 pb-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                        <span className="text-[8px] uppercase tracking-widest font-black">All data is encrypted within the Velora private network.</span>
                    </div>

                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-5 text-[9px] uppercase tracking-[0.5em] font-black hover:bg-gold transition-all duration-700 shadow-2xl flex items-center justify-center gap-4 group"
                    >
                        {loading ? "Transmitting..." : "Initiate Consultation"}
                        <Send className="w-3.5 h-3.5 group-hover:translate-x-2 transition-transform" />
                    </button>
                </form>
            ) : (
                <div className="p-16 text-center space-y-6">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-light uppercase tracking-widest">Inquiry Logged</h2>
                    <p className="text-black/40 text-xs font-light italic max-w-xs mx-auto">"Our curators have received your intent for the {itemName}. A secure line will be established shortly."</p>
                </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
