import React, { useContext, useEffect, useState } from "react";
import { Hash, ArrowRight } from "lucide-react";
import { getRooms } from "../api/roomService";
import { data, useNavigate, useOutletContext } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import { AuthContext } from "../context/AuthContext";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const { activeRoom } = useOutletContext();
  const { socket } = useContext(SocketContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log(activeRoom);
  // console.log(socket);
  // console.log(user);

  useEffect(() => {
    if (!socket) return;

    const handleGetRoom = async () => {
      try {
        const res = await getRooms();
        setRooms(res);
      } catch (error) {
        console.log(error);
      }
    };
    handleGetRoom();

    const handleSuccess = (data) => {
      navigate("/dashboard/room/" + data.roomId);
    };

    socket.on("room_joined_success", handleSuccess);
    socket.on("error", (data) => {
      console.log(data);
    });

    return () => {
      socket.off("room_joined_success", handleSuccess);
      socket.off("error");
    };
  }, [socket, navigate]);

  const handleJoinRoom = (roomId) => {
    console.log(typeof roomId);
    socket.emit("join_room", { roomId, userId: user.userId });
  };

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
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-white flex items-center justify-between hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center gap-5">
                <div
                  className={`w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-[#4a4658]`}
                >
                  <Hash size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">{room.room_name}</h4>
                </div>
              </div>
              <button
                className="bg-[#edeaf5] text-[#5c586d] px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#e2def2] transition-all active:scale-95"
                onClick={() => {
                  console.log("join room ", room.room_name, room.id);
                  handleJoinRoom(room.id);
                }}
              >
                Join{/* if room.is === activeRoom, navigate to currentRoom  */}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Rooms;
