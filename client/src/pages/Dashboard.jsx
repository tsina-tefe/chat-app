import React, { useState, useEffect, useContext } from "react";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getRoomInfo } from "../api/roomInfoService";

const Dashboard = () => {
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);

  const { token, user } = useContext(AuthContext);
  const [activeRoom, setActiveRoom] = useState(user?.roomId);
  const [roomDetails, setRoomDetails] = useState([]);
  const navigate = useNavigate();

  // redirect effect
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (
      location.pathname === "/dashboard" ||
      location.pathname === "/dashboard/"
    ) {
      if (user?.roomId) {
        navigate(`room/${user.roomId}`, { replace: true });
      } else {
        navigate("rooms", { replace: true });
      }
    }
  }, [token, user, location.pathname, navigate]);

  // fetch details
  useEffect(() => {
    if (!token || !user?.roomId) {
      setRoomDetails([]);
      return;
    }
    const fetchDetails = async () => {
      try {
        const res = await getRoomInfo(user.roomId);
        setRoomDetails(res);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchDetails();
  }, [activeRoom, token, user]);

  // resize effect
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

  const handleSetActiveRoom = (newRoomId) => {
    setActiveRoom(newRoomId);
  };

  return (
    <div className="flex h-screen w-full bg-[#F3F0F7] p-4 font-sans text-[#635B70] relative overflow-hidden">
      {(isLeftOpen || isRightOpen) && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 min-[1250px]:hidden"
          onClick={closeAll}
        />
      )}

      <LeftSidebar
        isLeftOpen={isLeftOpen}
        closeAll={closeAll}
        activeRoom={activeRoom}
      />

      <main className="flex-1 bg-white rounded-[2.5rem] shadow-sm flex flex-col overflow-hidden border border-white relative">
        <Header
          setIsLeftOpen={setIsLeftOpen}
          setIsRightOpen={setIsRightOpen}
          activeRoom={activeRoom}
          roomDetails={roomDetails}
        />

        <Outlet context={{ activeRoom, handleSetActiveRoom }} />
      </main>
      <RightSidebar
        isRightOpen={isRightOpen}
        closeAll={closeAll}
        roomDetails={roomDetails}
      />
    </div>
  );
};

export default Dashboard;
