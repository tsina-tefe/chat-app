import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, ArrowLeft, MessageSquareOff } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f7fd] dark:bg-[#0B0A10] flex items-center justify-center p-6 font-sans transition-colors duration-300">
      <div className="max-w-md w-full text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-white dark:bg-[#15131D] rounded-[2rem] shadow-sm border border-white dark:border-[#242132] flex items-center justify-center text-[#5c586d] dark:text-[#A69CB0]">
            <MessageSquareOff size={48} strokeWidth={1.5} />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-[#4a4658] dark:text-white mb-3">
          Lost in the ether?
        </h2>

        <p className="text-[#8e8ba2] dark:text-[#7B748A] mb-10 leading-relaxed">
          The page you're looking for has drifted away. Let's get you back to
          the workspace.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-8 py-4 bg-[#5c586d] hover:bg-[#4a4658] text-white font-bold rounded-full shadow-lg shadow-purple-500/10 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="px-8 py-4 bg-[#edeaf5] dark:bg-[#1E1B29] text-[#5c586d] dark:text-[#E2D9F3] font-bold rounded-full hover:bg-[#e2def2] dark:hover:bg-[#2A263D] transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>

        <div className="mt-16 flex items-center justify-center gap-2 text-[#a19fb1] dark:text-[#2D2A3D]">
          <div className="w-1 h-1 bg-current rounded-full" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
            Fluid Chat • Ethereal Workspace
          </span>
          <div className="w-1 h-1 bg-current rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
