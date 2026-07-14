"use client";

import React, { useRef, useEffect, useState } from "react";
import { Eraser, CheckCircle2 } from "lucide-react";

interface SignaturePadProps {
    onSave: (signatureData: string) => void;
}

const SignaturePad: React.FC<SignaturePadProps> = ({ onSave }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
    }, []);

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDrawing(true);
        draw(e);
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        const canvas = canvasRef.current;
        if (canvas) {
            onSave(canvas.toDataURL("image/png"));
        }
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        let x, y;

        if ("touches" in e) {
            x = e.touches[0].clientX - rect.left;
            y = e.touches[0].clientY - rect.top;
        } else {
            x = (e as React.MouseEvent).clientX - rect.left;
            y = (e as React.MouseEvent).clientY - rect.top;
        }

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const clear = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        onSave("");
    };

    return (
        <div className="space-y-4">
            <div className="relative border border-black/10 rounded-sm bg-slate-50 overflow-hidden cursor-crosshair">
                <canvas
                    ref={canvasRef}
                    width={500}
                    height={200}
                    onMouseDown={startDrawing}
                    onMouseUp={stopDrawing}
                    onMouseMove={draw}
                    onTouchStart={startDrawing}
                    onTouchEnd={stopDrawing}
                    onTouchMove={draw}
                    className="w-full h-[150px] touch-none"
                />
                <div className="absolute bottom-4 right-4 flex gap-2">
                    <button 
                        onClick={clear}
                        className="p-2 rounded-full bg-white/80 hover:bg-white text-black/40 hover:text-red-500 transition-all shadow-sm"
                        title="Clear Signature"
                    >
                        <Eraser className="w-4 h-4" />
                    </button>
                </div>
                <div className="absolute top-4 left-6 pointer-events-none">
                   <p className="text-[8px] uppercase tracking-[0.3em] font-black text-black/20">Digital Signature Pad</p>
                </div>
            </div>
            <p className="text-[9px] text-center text-black/30 font-medium italic">"I hereby verify this transaction in the Velora Ledger"</p>
        </div>
    );
};

export default SignaturePad;
