import { Kafka } from "kafkajs";
import { Partitioners } from "kafkajs";
run();
const msg = process.argv[2];

async function run() {
  try {
    const kafka = new Kafka({
      clientId: "myapp",
      brokers: [`shivam-mac.local:9092`],
    });
    const producer = kafka.producer({
      createPartitioner: Partitioners.LegacyPartitioner, // overriding default partitioning behaviour
    });

    console.log("connecting...");
    await producer.connect();
    console.log("connected!");
    //A-M 0 , N-Z 1
    const partition = msg[0] < "n" ? 0 : 1;

    const result = await producer.send({
      topic: "Users",
      messages: [
        {
          value: msg,
          partition: partition,
        },
      ],
    });

    console.log(`done! send successfully ${JSON.stringify(result)}`);
    await producer.disconnect();
  } catch (e) {
    console.error(`something went wrong ${e}`);
  } finally {
    process.exit(0);
  }
}
