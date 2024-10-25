import { Kafka } from "kafkajs";

run();

async function run() {
  try {
    const kafka = new Kafka({
      clientId: "myapp",
      brokers: ["shivam-mac.local:9092"],
    });

    const admin = kafka.admin();
    console.log("connecting...");
    await admin.connect();
    console.log("conncected!");
    await admin.createTopics({
      topics: [
        {
          topic: "Users",
          numPartitions: 2,
        },
      ],
    });
    console.log("done! created successfully");
    await admin.disconnect();
  } catch (e) {
    console.error(`something went wrong ${e}`);
  } finally {
    process.exit(0);
  }
}
