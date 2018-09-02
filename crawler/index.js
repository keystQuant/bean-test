const express = require('express');
const axios = require('axios');

const amqp = require('amqplib/callback_api');

const RUN_ENV = process.env.RUN_ENV || 'local'; // 도커 컨테이너 내부에 있다면 'remote'
const RUN_HEADLESS = process.env.RUN_HEADLESS || false; // 도커 컨테이너 내부에 있다면 true

const app = express();

const sendToQueue = (msg) => {
  console.log(msg);
  amqp.connect('amqp://admin:admin123@rabbit:5672//', (err, conn) => {
    conn.createChannel((err, ch) => {
      const q = 'crawl';
      ch.assertQueue(q, { durable: true });
      ch.sendToQueue(q, new Buffer(JSON.stringify(msg)), { persistent: true });
      console.log("[x] 태스크 요청 전송")
    });
  });
};

app.listen(8080, async () => {
  console.log('server started on port 8080');
});

// 테스트 api
app.get('/', async (req, res) => {
  res.send('DONE');
});

app.get('/TASK', async (req, res) => {
  const msg = 'crawl upbit';
  sendToQueue(msg);
  res.status(200);
  res.send('CRAWL TASK SENT');
});
