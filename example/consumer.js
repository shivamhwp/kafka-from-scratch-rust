import { Kafka } from "kafkajs";

run();

async function run() {
  try {
    const kafka = new Kafka({
      clientId: "myapp",
      brokers: [`shivam-mac.local:9092`], // your computer's name
    });
    const consumer = kafka.consumer({
      groupId: "group1",
    });

    console.log("connecting...");
    await consumer.connect();
    console.log("connected!");

    consumer.subscribe({
      topic: "Users",
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async (result) => {
        console.log(
          `Recieved message : ${result.message.value} on partition ${result.partition}`
        );
      },
    });
  } catch (e) {
    console.error(`something went wrong ${e}`);
  } finally {
  }
}
