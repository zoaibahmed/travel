"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const move = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", move);

        // Add hover effect for interactive elements
        const updateHoverState = () => {
            const els = document.querySelectorAll("button, a, .group, input, textarea, [role='button']");
            const on = () => setIsHovering(true);
            const off = () => setIsHovering(false);
            
            els.forEach(el => {
                el.addEventListener("mouseenter", on);
                el.addEventListener("mouseleave", off);
            });
        };

        updateHoverState();

        // Re-check for new elements periodically (e.g., after client-side nav)
        const interval = setInterval(updateHoverState, 2000);

        return () => {
            window.removeEventListener("mousemove", move);
            clearInterval(interval);
        };
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full border-2 border-gold"
            animate={{
                x: position.x - (isHovering ? 20 : 12),
                y: position.y - (isHovering ? 20 : 12),
                width: isHovering ? 40 : 24,
                height: isHovering ? 40 : 24,
                backgroundColor: isHovering ? "rgba(212,175,55,0.15)" : "rgba(212,175,55,0)",
            }}
            transition={{ type: "spring", stiffness: 600, damping: 30, mass: 0.4 }}
        />
    );
};

export default CustomCursor;
