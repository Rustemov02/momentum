import React from "react";
import momentumLogo from "/momentum.jpg";
import { BASE_URL } from "@/constants/variables";

const LandingPage: React.FC = () => {
    const handleLogin = () => {
        window.location.href = `${BASE_URL}/auth/google`;
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-linear-to-b from-[#1a1a1a] to-[#0a0a0a] items-center justify-center px-6 font-sans antialiased overflow-hidden">
            {/* Decorative Blur */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px]"></div>
            </div>

            <main className="relative z-10 flex flex-col items-center text-center max-w-4xl w-full">
                <div className="flex flex-col items-center mb-4">
                    <div className="size-24 mb-6 text-primary flex items-center justify-center">
                        <img src={momentumLogo} alt="Momentum Logo" className="w-full h-full rounded-2xl shadow-2xl shadow-cyan-500/20" />
                    </div>
                    <h1 className="text-slate-100 text-6xl md:text-8xl font-black tracking-tighter mb-4">
                        MOMENTUM
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl font-light tracking-wide max-w-lg">
                        Offline-first note-taking with AI support.
                    </p>
                </div>

                <div className="mt-12 mb-16">
                    <button
                        onClick={handleLogin}
                        className="group relative flex items-center justify-center gap-3 rounded-full h-14 px-10 bg-white text-black text-base font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(19,200,236,0.15)] hover:shadow-[0_0_30px_rgba(19,200,236,0.3)] cursor-pointer"
                    >
                        <img
                            alt="Google"
                            className="size-5"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAq4dB1X2vVlIkvBNgv8QJnkVOCPMqrACrrB3qUcgmz5ztXU_K14hWTvLtRaWSTgqL_WwmNOR4W0leLYK5AZMvo5_hZCLn8-opm2LiBxkEHpj4ilLKjiZzOvmQ1pboRRz_TEIehc8pdTOEnVo5FARj11VvjnEVORKAS7EsJct7wSbyX7ZfGSZS2tWbU4E-9TuuO4i0G-9AbRhCjxVBZHREfJJgc3luCzGlLTpXVvO0UqC1ndhScXvdaDq8xympFd5iswKZMWQqJMQ"
                        />
                        <span>Continue with Google</span>
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 w-full max-w-2xl border-t border-slate-800/50 pt-12">
                    <div className="flex flex-col items-center gap-3 group">
                        <span className="material-symbols-outlined text-slate-500 group-hover:text-cyan-400 transition-colors text-2xl">cloud_off</span>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 group-hover:text-slate-300 transition-colors">Offline</span>
                    </div>
                    <div className="flex flex-col items-center gap-3 group">
                        <span className="material-symbols-outlined text-slate-500 group-hover:text-cyan-400 transition-colors text-2xl">smart_toy</span>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 group-hover:text-slate-300 transition-colors">AI Support</span>
                    </div>
                    <div className="flex flex-col items-center gap-3 group">
                        <span className="material-symbols-outlined text-slate-500 group-hover:text-cyan-400 transition-colors text-2xl">auto_delete</span>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 group-hover:text-slate-300 transition-colors">Auto-Delete</span>
                    </div>
                    <div className="flex flex-col items-center gap-3 group">
                        <span className="material-symbols-outlined text-slate-500 group-hover:text-cyan-400 transition-colors text-2xl">sell</span>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 group-hover:text-slate-300 transition-colors">Tagging</span>
                    </div>
                </div>
            </main>

            <footer className="absolute bottom-8 w-full flex justify-center gap-6 text-[10px] uppercase tracking-widest text-slate-600">
                <a className="hover:text-cyan-400 transition-colors" href="#">Privacy</a>
                <span>•</span>
                <a className="hover:text-cyan-400 transition-colors" href="#">Terms</a>
                <span>•</span>
                <a className="hover:text-cyan-400 transition-colors" href="https://github.com">Github</a>
            </footer>
        </div>
    );
};

export default LandingPage;
