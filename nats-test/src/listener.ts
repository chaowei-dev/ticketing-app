import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";

console.clear();

// random id
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  const subsrciption = stan.subscribe(
    "ticket:created",
    "orders-service-queue-group"
  );

  subsrciption.on("message", (msg: Message) => {
    const data = msg.getData();

    if (typeof data === "string") {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    }
  });
});
