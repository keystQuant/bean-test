const amqp = require('amqplib/callback_api');

const puppeteer = require('puppeteer');

const URL = 'http://fnguide.com/api/Fgdd/StkIndByTimeGrdDataDate?IN_SEARCH_DT=20180831&IN_SEARCH_TYPE=I&IN_KOS_VALUE=0';

const LOGIN_PAGE = 'https://www.fnguide.com/home/login'

const IDInputSelector = '#txtID';
const PWInputSelector = '#txtPW';
const loginBtnSelector = '#container > div > div > div.log--wrap > div.log--area > form > div > fieldset > button';
const logoutOtherIPUserBtnSelector = '#divLogin > div.lay--popFooter > form > button.btn--back';
const FnguideLogoSelector = 'body > div.header > div > h1 > a';

const ID = 'keystone2016';
const PW = 'keystone2016';

amqp.connect('amqp://admin:admin123@rabbit:5672//', (err, conn) => {
  conn.createChannel((err, ch) => {
    const q = 'crawl';

    ch.assertQueue(q, { durable: true });
    console.log("[*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, async (msg) => {
      console.log("[x] 태스크 요청 받음");
      const receivedMSG = JSON.parse(msg.content.toString());
      console.log(receivedMSG);

      if (receivedMSG === 'crawl fnguide') {

        const puppeteerConfig = {
          headless: true,
          args: ['--no-sandbox'],
          slowMo: 100,
        };
        const browser = await puppeteer.launch(puppeteerConfig);
        const page = await browser.newPage();

        await page.goto(LOGIN_PAGE);
        await page.waitForSelector(IDInputSelector);
        await page.click(IDInputSelector);
        await page.type(IDInputSelector, ID);
        await page.click(PWInputSelector);
        await page.type(PWInputSelector, PW);
        await page.click(loginBtnSelector);

        const logoutOtherIPUserBtnExists = await page.$eval(
          logoutOtherIPUserBtnSelector,
          el => (!!el),
        ).catch((error) => { console.log(error); });
        if (logoutOtherIPUserBtnExists) {
          await page.click(logoutOtherIPUserBtnSelector);
        }

        // issues with waitForSelector
        // force wait for 5 seconds before waitForSelector
        // initially waited for userIDSelector but didn't work
        // so now waiting for FnguideLogoSelector
        // console.log('page waiting 5 secs')
        await page.waitFor(5000)
          .then(() => {
            page.waitForSelector(FnguideLogoSelector).then().catch();
          });

        await page.goto(URL);
        const data = await page.evaluate(() => {
          const data = JSON.parse(document.querySelector('body').innerText);
          return data
        });
        console.log(data);

        browser.close();

      }

    }, { noAck: false });
  });
});
