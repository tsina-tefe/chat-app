import React from "react";
import { Sparkles } from "lucide-react";
import { NavLink } from "react-router-dom";

const AuthHeader = ({ header }) => {
  return (
    <div className="text-center mb-8 z-10">
      <NavLink
        className="inline-flex items-center justify-center w-16 h-16 bg-[#5c586d] rounded-full mb-4 shadow-lg"
        to={"/"}
      >
        <Sparkles className="text-white" size={32} />
      </NavLink>
      <h1 className="text-4xl font-bold text-[#4a4658] mb-2 tracking-tight">
        Fluid Chat
      </h1>
      <p className="text-[#8e8ba2] font-medium">{header}</p>
    </div>
  );
};

export default AuthHeader;
