const socket = io("ws://localhost:3500", {
  auth: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzc0NDU2NTAzLCJleHAiOjE3NzQ1NDI5MDN9.iqBKkDSzOfgLFNp9FFBaPgizH9tIC6aOy7h7ElbP97U",
  },
});

const data = document.querySelector(".data");
const message = document.querySelector(".message");

socket.emit("message", "Message from front end");

socket.on("message", (data) => {
  console.log("from socket");
  console.log(data);
  message.textContent = data;
});

console.log("wagoan");

// socket.on("connect", salut);

// async function salut() {
//   const res = await fetch("http://localhost:3500");
//   const msg = await res.json();
//   console.log(msg);
//   data.textContent = msg.data;
// }
