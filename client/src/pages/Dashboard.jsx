import React, { useState, useEffect } from "react";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import CurrentRoom from "./CurrentRoom";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1250) {
        setIsLeftOpen(false);
        setIsRightOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeAll = () => {
    setIsLeftOpen(false);
    setIsRightOpen(false);
  };

  return (
    <div className="flex h-screen w-full bg-[#F3F0F7] p-4 font-sans text-[#635B70] relative overflow-hidden">
      {(isLeftOpen || isRightOpen) && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 min-[1250px]:hidden"
          onClick={closeAll}
        />
      )}

      {/* --- LEFT SIDEBAR (Navigation) --- */}
      <LeftSidebar isLeftOpen={isLeftOpen} closeAll={closeAll} />

      <main className="flex-1 bg-white rounded-[2.5rem] shadow-sm flex flex-col overflow-hidden border border-white relative">
        <Header setIsLeftOpen={setIsLeftOpen} setIsRightOpen={setIsRightOpen} />

        <Outlet />
      </main>
      <RightSidebar isRightOpen={isRightOpen} closeAll={closeAll} />
    </div>
  );
};

export default Dashboard;
