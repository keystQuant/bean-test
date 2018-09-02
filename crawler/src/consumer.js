const amqp = require('amqplib/callback_api');
const axios = require('axios');

const API = require('./api.js');

amqp.connect('amqp://admin:admin123@rabbit:5672//', (err, conn) => {
  conn.createChannel((err, ch) => {
    const q = 'crawl';

    ch.assertQueue(q, { durable: true });
    console.log("[*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, async (msg) => {
      console.log("[x] 태스크 요청 받음");
      const receivedMSG = JSON.parse(msg.content.toString());
      console.log(receivedMSG);

      if (receivedMSG === 'crawl upbit') {
        const api = new API.API();
        const data = await api.requestUpbit();
        const postData = await api.formatData(data);
        for (const jsonData of postData) {
          await api.saveData(jsonData);
        }
      }

    }, { noAck: false });
  });
});
