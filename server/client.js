import io from "socket.io-client";

const ws = io("http://localhost:8080");

ws.on("message", (msg) => {
  console.log(msg);
});

ws.on("newRequest", (listing) => {
  console.log(listing);
});

ws.on("newOffer", (listing) => {
  console.log(listing);
});

ws.emit("communities", { ids: ["1","2"]})
