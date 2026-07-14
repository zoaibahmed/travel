"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "@/lib/axios";
import { Lock, ArrowRight, ShieldCheck, KeyRound } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SetupPasswordPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        token: "",
        password: "",
        password_confirmation: ""
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const email = params.get('email');
        if (token && email) {
            setFormData(prev => ({ ...prev, token, email }));
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccessMsg("");

        try {
            // Reusing the reset password endpoint since we inserted a token directly
            const res = await axios.post("password/reset", formData);
            setSuccessMsg("Access Key established successfully. Logging you in...");
            
            // Auto login after setup
            setTimeout(async () => {
                try {
                    const loginRes = await axios.post("login", {
                        email: formData.email,
                        password: formData.password
                    });
                    localStorage.setItem("access_token", loginRes.data.access_token);
                    localStorage.setItem("user", JSON.stringify(loginRes.data.user));
                    window.location.href = "/dashboard?tab=Expeditions";
                } catch (err) {
                    window.location.href = "/login";
                }
            }, 2000);

        } catch (err: any) {
            setError(err.response?.data?.message || "Operation failed.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-black font-sans">
            <Navbar />

            <div className="pt-48 pb-20 container mx-auto px-6 flex items-center justify-center min-h-screen">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-xl bg-slate-50 border border-black/5 p-12 md:p-20 rounded-sm shadow-[0_100px_200px_-50px_rgba(0,0,0,0.1)] relative overflow-hidden"
                >
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="text-center mb-16 relative z-10">
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-20 h-20 border border-gold/30 rounded-full flex items-center justify-center mx-auto mb-8 group hover:border-gold transition-colors duration-700"
                        >
                             <KeyRound className="w-10 h-10 text-gold" />
                        </motion.div>
                        <h2 className="text-4xl font-light tracking-tighter uppercase tracking-[0.3em] mb-4">
                            Establish Key
                        </h2>
                        <p className="text-black/30 text-[10px] uppercase tracking-[0.4em] font-black italic">
                            Secure your Velora Account
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="p-5 bg-red-50 border border-red-100 text-red-500 text-[10px] uppercase tracking-widest font-bold text-center"
                                >
                                    {error}
                                </motion.div>
                            )}
                            {successMsg && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="p-5 bg-green-50 border border-green-100 text-green-600 text-[10px] uppercase tracking-widest font-bold text-center"
                                >
                                    {successMsg}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-8">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30 flex items-center gap-3 ml-1">
                                    <Lock className="w-3 h-3 text-gold" />
                                    New Access Key
                                </label>
                                <input 
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    required
                                    className="w-full bg-white border border-black/5 p-6 outline-none focus:border-gold transition-colors text-xs font-bold tracking-widest"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30 flex items-center gap-3 ml-1">
                                    <ShieldCheck className="w-3 h-3 text-gold" />
                                    Confirm New Key
                                </label>
                                <input 
                                    type="password"
                                    value={formData.password_confirmation}
                                    onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
                                    required
                                    className="w-full bg-white border border-black/5 p-6 outline-none focus:border-gold transition-colors text-xs font-bold tracking-widest"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="pt-6">
                            <button 
                                type="submit"
                                disabled={loading}
                                className="w-full bg-black text-white py-8 flex items-center justify-center gap-6 text-[10px] uppercase tracking-[0.6em] font-black hover:bg-gold transition-all duration-1000 group shadow-2xl"
                            >
                                {loading ? "Verifying..." : (
                                    <>
                                        Establish Access
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-700" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-16 text-center text-[9px] text-black/10 uppercase tracking-[0.5em] font-black animate-pulse">
                        Velora Private Network Protocol • SSL v3.0
                    </div>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
};

export default SetupPasswordPage;
