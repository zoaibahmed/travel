"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "@/lib/axios";
import { LogIn, Mail, Lock, ArrowRight, ShieldCheck, UserPlus, User, KeyRound } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isRecovering, setIsRecovering] = useState(false);
    const [recoveryStep, setRecoveryStep] = useState(1); // 1 = Request Email, 2 = Enter OTP + New Password

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        token: "" // For OTP
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleAuthSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccessMsg("");

        try {
            const endpoint = isLogin ? "login" : "register";
            const res = await axios.post(endpoint, formData);
            const { access_token, user } = res.data;

            localStorage.setItem("access_token", access_token);
            localStorage.setItem("user", JSON.stringify(user));

            if (user.is_admin) {
                window.location.href = "/admin";
            } else {
                window.location.href = "/dashboard";
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Authentication failed. Please verify your details.");
        } finally {
            setLoading(false);
        }
    };

    const handleRecoverySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccessMsg("");

        try {
            if (recoveryStep === 1) {
                // Request OTP
                const res = await axios.post("password/email", { email: formData.email });
                setSuccessMsg(res.data.message);
                setRecoveryStep(2);
            } else {
                // Verify OTP and Reset
                const res = await axios.post("password/reset", {
                    email: formData.email,
                    token: formData.token,
                    password: formData.password,
                    password_confirmation: formData.password_confirmation
                });
                setSuccessMsg(res.data.message);
                // Switch back to login after successful reset
                setTimeout(() => {
                    setIsRecovering(false);
                    setIsLogin(true);
                    setSuccessMsg("");
                }, 2000);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Operation failed.");
        } finally {
            setLoading(false);
        }
    };

    const toggleRecovery = () => {
        setIsRecovering(!isRecovering);
        setRecoveryStep(1);
        setError("");
        setSuccessMsg("");
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
                    {/* Background Decorative Blur */}
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="text-center mb-16 relative z-10">
                        <motion.div 
                            key={isRecovering ? "recover-icon" : (isLogin ? "login-icon" : "register-icon")}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-20 h-20 border border-gold/30 rounded-full flex items-center justify-center mx-auto mb-8 group hover:border-gold transition-colors duration-700"
                        >
                             {isRecovering ? <KeyRound className="w-10 h-10 text-gold" /> : (isLogin ? <ShieldCheck className="w-10 h-10 text-gold" /> : <UserPlus className="w-10 h-10 text-gold" />)}
                        </motion.div>
                        <h2 className="text-4xl font-light tracking-tighter uppercase tracking-[0.3em] mb-4">
                            {isRecovering ? "Recover Access" : (isLogin ? "Member Login" : "Join the Elite")}
                        </h2>
                        <p className="text-black/30 text-[10px] uppercase tracking-[0.4em] font-black italic">
                            {isRecovering ? "Establish New Key" : "Access the Velora Collection"}
                        </p>
                    </div>

                    <form onSubmit={isRecovering ? handleRecoverySubmit : handleAuthSubmit} className="space-y-10 relative z-10">
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
                            {!isRecovering && !isLogin && (
                                <motion.div 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="space-y-2"
                                >
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30 flex items-center gap-3 ml-1">
                                        <User className="w-3 h-3 text-gold" />
                                        Full Identity
                                    </label>
                                    <input 
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        required={!isLogin}
                                        className="w-full bg-white border border-black/5 p-6 outline-none focus:border-gold transition-colors text-xs font-bold tracking-widest"
                                        placeholder="ALEXANDER VANCE"
                                    />
                                </motion.div>
                            )}

                            {(!isRecovering || recoveryStep === 1) && (
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30 flex items-center gap-3 ml-1">
                                        <Mail className="w-3 h-3 text-gold" />
                                        Private Email
                                    </label>
                                    <input 
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        required
                                        className="w-full bg-white border border-black/5 p-6 outline-none focus:border-gold transition-colors text-xs font-bold tracking-widest"
                                        placeholder="CLIENT@VELORA.COM"
                                    />
                                </div>
                            )}

                            {isRecovering && recoveryStep === 2 && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="space-y-8"
                                >
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30 flex items-center gap-3 ml-1">
                                            <KeyRound className="w-3 h-3 text-gold" />
                                            Verification OTP
                                        </label>
                                        <input 
                                            type="text"
                                            value={formData.token}
                                            onChange={(e) => setFormData({...formData, token: e.target.value})}
                                            required
                                            maxLength={6}
                                            className="w-full bg-white border border-black/5 p-6 outline-none focus:border-gold transition-colors text-xl font-black tracking-[1em] text-center"
                                            placeholder="••••••"
                                        />
                                    </div>
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
                                </motion.div>
                            )}

                            {!isRecovering && (
                                <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30 flex items-center gap-3 ml-1">
                                            <Lock className="w-3 h-3 text-gold" />
                                            {isLogin ? "Private Access Key" : "Establish New Key"}
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

                                    {!isLogin && (
                                        <motion.div 
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="space-y-2"
                                        >
                                            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30 flex items-center gap-3 ml-1">
                                                <ShieldCheck className="w-3 h-3 text-gold" />
                                                Confirm Access Key
                                            </label>
                                            <input 
                                                type="password"
                                                value={formData.password_confirmation}
                                                onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
                                                required={!isLogin}
                                                className="w-full bg-white border border-black/5 p-6 outline-none focus:border-gold transition-colors text-xs font-bold tracking-widest"
                                                placeholder="••••••••"
                                            />
                                        </motion.div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="pt-6 space-y-6">
                            <button 
                                type="submit"
                                disabled={loading}
                                className="w-full bg-black text-white py-8 flex items-center justify-center gap-6 text-[10px] uppercase tracking-[0.6em] font-black hover:bg-gold transition-all duration-1000 group shadow-2xl"
                            >
                                {loading ? "Verifying..." : (
                                    <>
                                        {isRecovering ? (recoveryStep === 1 ? "Request Code" : "Update Access Key") : (isLogin ? "Enter Collection" : "Establish Membership")}
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-700" />
                                    </>
                                )}
                            </button>

                            <div className="flex items-center justify-center gap-8 pt-8 border-t border-black/5">
                                <button 
                                    type="button"
                                    onClick={() => { setIsRecovering(false); setIsLogin(!isLogin); setError(""); }}
                                    className="text-[9px] uppercase tracking-[0.3em] font-black text-black/30 hover:text-gold transition-colors"
                                >
                                    {isLogin ? "Need an invitation?" : "Already a member?"}
                                </button>
                                <span className="w-1 h-1 bg-black/10 rounded-full" />
                                <button 
                                    type="button"
                                    onClick={toggleRecovery}
                                    className={`text-[9px] uppercase tracking-[0.3em] font-black transition-colors ${isRecovering ? 'text-black' : 'text-black/30 hover:text-black'}`}
                                >
                                    {isRecovering ? "Cancel Recovery" : "Recover Access"}
                                </button>
                            </div>
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

export default AuthPage;
