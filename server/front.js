const socket = io("ws://localhost:3500", {
  auth: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9vbSI6bnVsbCwiaWF0IjoxNzc0NTk2MjM1LCJleHAiOjE3NzQ2ODI2MzV9.WIToj4pmykXOfXF-0ndpIAYMvEuMGLwaAcZSVZmxoLM",
  },
});

const data = document.querySelector(".data");
const message = document.querySelector(".message");

// socket.emit("message", "Message from front end");

socket.on("message", (data) => {
  console.log("from socket");
  console.log(data);
  message.textContent = data;

  // socket.emit("enterRoom", "Can I join");
  // socket.emit("join_room", {
  //   userId: 3,
  //   roomId: null,
  // });

  // socket.emit("leave_room"); // add a callback functions to make sure user actually leaves the room

  // socket.emit("send_message", { content: "Hey there", roomId: 1 });

  // socket.emit("get_message_history", { roomId: 1 });

  socket.emit("typing", { roomId: 1, isTyping: true });
});

// socket.on("messageRoom", (message) => {
//   console.log(message);
// });

// socket.on("room_joined_success", (data) => {
//   console.log(data);
// });

// socket.on("leave_success", (data) => {
//   console.log(data);
// });

// socket.on("receive_message", (data) => {
//   console.log(data);
// });

// socket.on("message_history", (data) => {
//   console.log(data);
// });

socket.on("user_typing", (data) => {
  console.log(data);
});

socket.on("error", (error) => {
  console.log(error);
});

console.log("wagoan");

// socket.on("connect", salut);

// async function salut() {
//   const res = await fetch("http://localhost:3500");
//   const msg = await res.json();
//   console.log(msg);
//   data.textContent = msg.data;
// }
