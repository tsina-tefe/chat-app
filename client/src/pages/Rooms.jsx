import React from "react";
import {
  Plus,
  TrendingUp,
  Hash,
  Terminal,
  PartyPopper,
  Palette,
  ArrowRight,
} from "lucide-react";

const Rooms = () => {
  // Mock data for active rooms
  const activeRooms = [
    {
      id: 1,
      name: "general",
      desc: "All hands on deck",
      icon: <Hash size={20} />,
      bgColor: "bg-gray-100",
    },
    {
      id: 2,
      name: "tech-talk",
      desc: "Engineering & R&D",
      icon: <Terminal size={20} />,
      bgColor: "bg-indigo-50",
    },
    {
      id: 3,
      name: "random",
      desc: "Watercooler & Memes",
      icon: <PartyPopper size={20} />,
      bgColor: "bg-orange-50",
    },
    {
      id: 4,
      name: "design-critique",
      desc: "Visual & UX feedback",
      icon: <Palette size={20} />,
      bgColor: "bg-purple-50",
    },
    {
      id: 4,
      name: "design-critique",
      desc: "Visual & UX feedback",
      icon: <Palette size={20} />,
      bgColor: "bg-purple-50",
    },
    {
      id: 4,
      name: "design-critique",
      desc: "Visual & UX feedback",
      icon: <Palette size={20} />,
      bgColor: "bg-purple-50",
    },
    {
      id: 4,
      name: "design-critique",
      desc: "Visual & UX feedback",
      icon: <Palette size={20} />,
      bgColor: "bg-purple-50",
    },
    {
      id: 4,
      name: "design-critique",
      desc: "Visual & UX feedback",
      icon: <Palette size={20} />,
      bgColor: "bg-purple-50",
    },
    {
      id: 4,
      name: "design-critique",
      desc: "Visual & UX feedback",
      icon: <Palette size={20} />,
      bgColor: "bg-purple-50",
    },
    {
      id: 4,
      name: "design-critique",
      desc: "Visual & UX feedback",
      icon: <Palette size={20} />,
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto h-screen bg-[#fcfbff] flex flex-col p-8 md:p-16 font-sans text-[#4a4658] custom-scrollbar">
      <header className="mb-12 max-w-2xl">
        <h1 className="text-5xl font-bold mb-4 tracking-tight">
          Rooms Explorer
        </h1>
        <p className="text-[#8e8ba2] text-lg leading-relaxed">
          Dive into curated spaces designed for focused collaboration and
          spontaneous interactions.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="md:col-span-2 bg-white rounded-[3rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-white flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Create New Room</h2>
            <p className="text-[#8e8ba2] text-sm mb-8">
              Start a new conversation thread with your team.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#a19fb1] font-medium">
                #
              </span>
              <input
                type="text"
                placeholder="room-name-exam"
                className="w-full bg-[#edeaf5] border-none rounded-full py-4 pl-10 pr-6 text-sm outline-none focus:ring-2 focus:ring-purple-100 transition-all"
              />
            </div>
            <button className="bg-[#5c586d] text-white px-8 py-4 rounded-full font-bold hover:bg-[#4a4658] transition-all shadow-lg active:scale-95">
              Create
            </button>
          </div>
        </div>

        <div className="bg-[#e2def2] rounded-[3rem] p-10 flex flex-col justify-between items-start relative overflow-hidden">
          {/* <TrendingUp size={48} className="text-[#5c586d] opacity-40" /> */}
          <div>
            <h3 className="text-5xl font-bold mb-1">124</h3>
            <p className="text-[#5c586d] font-semibold opacity-70">
              Online now
            </p>
          </div>
          <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-white/20 rounded-full blur-2xl" />
        </div>
      </div>

      <section>
        <div className="flex items-center justify-between mb-8 px-4">
          <h2 className="text-2xl font-bold">Active Rooms</h2>
          <button className="flex items-center gap-2 text-sm font-bold text-[#8e8ba2] hover:text-[#4a4658] transition-colors">
            View all <ArrowRight size={16} />
          </button>
        </div>

        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeRooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-white flex items-center justify-between hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center gap-5">
                <div
                  className={`w-14 h-14 ${room.bgColor} rounded-full flex items-center justify-center text-[#4a4658]`}
                >
                  {room.icon}
                </div>
                <div>
                  <h4 className="font-bold text-lg">{room.name}</h4>
                  <p className="text-xs text-[#8e8ba2] font-medium">
                    {room.desc}
                  </p>
                </div>
              </div>
              <button className="bg-[#edeaf5] text-[#5c586d] px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#e2def2] transition-all active:scale-95">
                Join
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Rooms;
