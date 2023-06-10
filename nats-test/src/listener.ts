import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";

console.clear();

// random id
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  // client close
  stan.on("close", () => {
    console.log("NATS connection closed!");
    process.exit();
  });

  const options = stan.subscriptionOptions().setManualAckMode(true);

  const subsrciption = stan.subscribe(
    "ticket:created",
    "orders-service-queue-group",
    options
  );

  subsrciption.on("message", (msg: Message) => {
    const data = msg.getData();

    if (typeof data === "string") {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    }

    msg.ack();
  });
});

// client close
process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
