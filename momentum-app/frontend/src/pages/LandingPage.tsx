import React, { useEffect, useRef, useState } from "react";
import { BASE_URL } from "@/constants/variables";
import momentumLogo from "/momentum.jpg";

const LandingPage: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleLogin = () => {
        window.location.href = `${BASE_URL}/auth/google`;
    };

    // Auto-carousel logic for mobile
    useEffect(() => {
        const startAutoScroll = () => {
            timerRef.current = setInterval(() => {
                if (scrollRef.current && window.innerWidth < 1024) {
                    const container = scrollRef.current;
                    const children = container.children;
                    const cardWidth = (children[0] as HTMLElement).offsetWidth + 24; // width + gap

                    let nextIndex = activeIndex + 1;
                    if (nextIndex >= children.length) {
                        nextIndex = 0;
                    }

                    container.scrollTo({
                        left: nextIndex * cardWidth,
                        behavior: "smooth"
                    });
                    setActiveIndex(nextIndex);
                }
            }, 1000);
        };

        startAutoScroll();

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [activeIndex]);

    return (
        <div className="relative h-screen flex flex-col items-center justify-between bg-radial-gradient overflow-hidden text-slate-100 selection:bg-cyan-500/30 font-sans p-6">
            {/* Header Section */}
            <header className="w-full flex flex-col items-center pt-2 pb-4 z-10 shrink-0">
                <div className="flex flex-col items-center mb-2">
                    <div className="size-16 mb-2 text-primary flex items-center justify-center">
                        <img src={momentumLogo} alt="Momentum Logo" className="w-full h-full rounded-xl shadow-2xl shadow-[#13c8ec]/20" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-[0.2em] text-white">MOMENTUM</h1>
                </div>
                <p className="text-slate-400 text-[10px] tracking-wide uppercase">Zəkanızı sürətləndirin</p>
            </header>

            {/* Main Login Content */}
            <main className="flex-1 flex flex-col items-center justify-center w-full max-w-6xl z-10 min-h-0">
                {/* CTA Button */}
                <div className="w-full max-w-sm mb-8 shrink-0">
                    <button
                        onClick={handleLogin}
                        className="w-full h-12 bg-[#13c8ec] hover:bg-[#13c8ec]/90 text-black font-bold rounded-xl flex items-center justify-center gap-3 transition-all duration-300 glow-cyan cursor-pointer"
                    >
                        <span className="material-symbols-outlined !text-[20px]">account_circle</span>
                        <span className="text-sm">Google ilə davam et</span>
                    </button>
                    <p className="text-center text-slate-500 text-[10px] mt-3 uppercase tracking-widest">OAuth 2.0 ilə təhlükəsiz giriş</p>
                </div>

                {/* Feature Carousel */}
                <div className="w-full relative overflow-hidden">
                    <div
                        ref={scrollRef}
                        className="flex gap-4 overflow-x-auto pb-4 pt-2 hide-scrollbar snap-x px-4 lg:justify-center"
                    >
                        {/* Card 1: Notes List */}
                        <div className="flex-none w-64 h-80 bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-4 snap-center hover:border-[#13c8ec]/50 transition-colors">
                            <div className="bg-slate-800/80 rounded-lg p-2.5 mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-slate-400 text-xs text-sm">search</span>
                                <div className="h-1.5 w-20 bg-slate-700 rounded"></div>
                            </div>
                            <h3 className="text-white text-sm font-semibold mb-0.5">Qeydlər Siyahısı</h3>
                            <p className="text-slate-400 text-[10px] mb-3">Fikirlərinizi idarə edin</p>
                            <div className="space-y-2">
                                <div className="h-12 bg-slate-800/40 rounded-lg border-l-2 border-[#13c8ec] p-2">
                                    <div className="h-1.5 w-3/4 bg-slate-600 rounded mb-1.5"></div>
                                    <div className="h-1.5 w-1/2 bg-slate-700 rounded"></div>
                                </div>
                                <div className="h-12 bg-slate-800/40 rounded-lg p-2">
                                    <div className="h-1.5 w-2/3 bg-slate-600 rounded mb-1.5"></div>
                                    <div className="h-1.5 w-1/3 bg-slate-700 rounded"></div>
                                </div>
                                <div className="h-12 bg-slate-800/40 rounded-lg p-2">
                                    <div className="h-1.5 w-4/5 bg-slate-600 rounded mb-1.5"></div>
                                    <div className="h-1.5 w-1/4 bg-slate-700 rounded"></div>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: AI View */}
                        <div className="flex-none w-64 h-80 bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-4 snap-center hover:border-[#13c8ec]/50 transition-colors">
                            <h3 className="text-white text-sm font-semibold mb-0.5">AI İzahı</h3>
                            <p className="text-slate-400 text-[10px] mb-3">AI tərəfindən verilən xülasələr</p>
                            <div className="bg-[#13c8ec]/5 rounded-xl border border-[#13c8ec]/20 p-3 h-52 overflow-hidden relative">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="material-symbols-outlined text-[#13c8ec] text-xs">auto_awesome</span>
                                    <span className="text-[9px] text-[#13c8ec] font-bold uppercase tracking-widest">AI Xülasə</span>
                                </div>
                                <div className="space-y-1.5">
                                    <div className="h-1.5 w-full bg-[#13c8ec]/20 rounded"></div>
                                    <div className="h-1.5 w-full bg-[#13c8ec]/20 rounded"></div>
                                    <div className="h-1.5 w-4/5 bg-[#13c8ec]/20 rounded"></div>
                                </div>
                                <div className="mt-4 border-t border-slate-800 pt-3">
                                    <div className="h-1.5 w-full bg-slate-700 rounded mb-1.5"></div>
                                    <div className="h-1.5 w-full bg-slate-700 rounded mb-1.5"></div>
                                    <div className="h-1.5 w-full bg-slate-700 rounded mb-1.5"></div>
                                    <div className="h-1.5 w-3/4 bg-slate-700 rounded"></div>
                                </div>
                            </div>
                        </div>

                        {/* Card 3: Advanced Tagging */}
                        <div className="flex-none w-64 h-80 bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-4 snap-center hover:border-[#13c8ec]/50 transition-colors">
                            <h3 className="text-white text-sm font-semibold mb-0.5">Ağıllı Teqləmə</h3>
                            <p className="text-slate-400 text-[10px] mb-4">Rahatlıqla qruplaşdırın</p>
                            <div className="flex flex-wrap gap-1.5">
                                <span className="px-2 py-0.5 bg-[#13c8ec]/20 text-[#13c8ec] text-[9px] font-bold rounded-full border border-[#13c8ec]/30">#Məhsuldarlıq</span>
                                <span className="px-2 py-0.5 bg-slate-800 text-slate-400 text-[9px] font-bold rounded-full border border-slate-700">#Araşdırma</span>
                                <span className="px-2 py-0.5 bg-slate-800 text-slate-400 text-[9px] font-bold rounded-full border border-slate-700">#İdeyalar</span>
                                <span className="px-2 py-0.5 bg-[#13c8ec] text-black text-[9px] font-bold rounded-full">#Qeydlər</span>
                                <span className="px-2 py-0.5 bg-slate-800 text-slate-400 text-[9px] font-bold rounded-full border border-slate-700">#Dizayn</span>
                                <span className="px-2 py-0.5 bg-slate-800 text-slate-400 text-[9px] font-bold rounded-full border border-slate-700">#Strategiya</span>
                                <span className="px-2 py-0.5 bg-slate-800 text-slate-400 text-[9px] font-bold rounded-full border border-slate-700">#Reseptlər</span>
                                <span className="px-2 py-0.5 bg-[#13c8ec]/20 text-[#13c8ec] text-[9px] font-bold rounded-full border border-[#13c8ec]/30">#Kodlama</span>
                                <span className="px-2 py-0.5 bg-slate-800 text-slate-400 text-[9px] font-bold rounded-full border border-slate-700">#Səyahət</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visual Accents: Particle Field Effect Simulation */}
                <div className="absolute bottom-16 left-0 w-full h-20 pointer-events-none overflow-hidden flex justify-center opacity-30">
                    <div className="flex gap-16 items-end">
                        <div className="w-1 h-1 bg-[#13c8ec] rounded-full blur-[1px]"></div>
                        <div className="w-2 h-2 bg-[#13c8ec]/50 rounded-full blur-[2px]"></div>
                        <div className="w-1.5 h-1.5 bg-[#13c8ec]/80 rounded-full blur-[1px]"></div>
                        <div className="w-2 h-2 bg-[#13c8ec]/40 rounded-full blur-[3px]"></div>
                        <div className="w-1 h-1 bg-[#13c8ec] rounded-full blur-[1px]"></div>
                        <div className="w-2 h-2 bg-[#13c8ec]/50 rounded-full blur-[2px]"></div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full pb-4 flex flex-col items-center gap-4 z-10 shrink-0">
                <div className="flex items-center gap-6 text-[9px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                    <a className="hover:text-[#13c8ec] transition-colors" href="#">Məxfilik</a>
                    <a className="hover:text-[#13c8ec] transition-colors" href="#">Şərtlər</a>
                    <a className="hover:text-[#13c8ec] transition-colors" href="https://github.com/Rustemov02/momentum" target="_blank" rel="noreferrer">Github</a>
                </div>
                <div className="text-[9px] text-slate-600 tracking-widest uppercase">
                    © 2024 MOMENTUM AI LABS.
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
