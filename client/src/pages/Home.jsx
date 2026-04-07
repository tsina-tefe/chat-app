import React from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#fcfbff] dark:bg-[#0B0A10] font-sans selection:bg-purple-100">
      <nav className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl md:text-[40px] font-bold text-[#4a4658] tracking-tight">
            Fluid Chat
          </h1>
        </div>
        <ThemeToggle />
      </nav>

      <main className="flex flex-col items-center justify-center px-6 pt-20 pb-32 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#edeaf5] dark:bg-[#0B0A10] px-4 py-1.5 rounded-full mb-12 border border-white/50 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-[#8e8ba2]" />
          <span className="text-[10px] font-bold text-[#8e8ba2] uppercase tracking-widest">
            New: Collaborative rooms are here
          </span>
        </div>

        <h2 className="text-6xl md:text-8xl font-bold text-[#4a4658] leading-[1.1] mb-8 tracking-tight">
          Communication <br />
          <span className="italic font-light text-[#8e8ba2]">flows</span>{" "}
          through your <br />
          workspace.
        </h2>

        <p className="text-lg md:text-xl text-[#8e8ba2] max-w-2xl leading-relaxed mb-12">
          Experience an ethereal digital environment designed for deep focus and
          effortless connection. Fluid Chat simplifies complex team dynamics
          into beautiful conversations.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <NavLink
            className="px-10 py-4 bg-[#5c586d] text-white rounded-full font-bold text-lg hover:bg-[#4a4658] transition-all shadow-lg hover:shadow-purple-100 dark:hover:shadow-purple-100/20  active:scale-95"
            to={"register"}
          >
            Sign Up
          </NavLink>
          <NavLink
            className="px-10 py-4 bg-[#e2def2] dark:bg-[#e2def2b6] text-[#5c586d] rounded-full font-bold text-lg hover:bg-[#d5d0eb] transition-all active:scale-95"
            to={"login"}
          >
            Login to join rooms
          </NavLink>
        </div>
      </main>
      <footer>
        <p className="text-center text-[#8e8ba2]">
          © 2026 Fluid Chat Inc. All rights reserved.
        </p>
      </footer>

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-50/50 rounded-full blur-[120px] -z-10" />
    </div>
  );
};

export default Home;
