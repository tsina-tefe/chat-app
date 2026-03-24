const socket = io("ws://localhost:3500");

const data = document.querySelector(".data");
const message = document.querySelector(".message");

socket.on("connect", salut);

socket.on("message", (data) => {
  console.log("from socket");
  console.log(data);
  message.textContent = data;
});

console.log("wagoan");

async function salut() {
  const res = await fetch("http://localhost:3500");
  const msg = await res.json();
  console.log(msg);
  data.textContent = msg.data;
}
