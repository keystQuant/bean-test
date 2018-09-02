const axios = require('axios');

class API {

  constructor() {
    this.URL = 'https://api.upbit.com/v1/candles/days?market=KRW-BTC&&count=10';
    this.saveURL = 'http://45.76.101.102:3000/upbit-api/candle/';
  }

  async requestUpbit() {
    const data = await axios.get(this.URL);
    return data.data;
  }

  async formatData(data) {
    let postDataList = [];
    for (const json of data) {
      const market = json['market'];
      const timestamp = String(json['candle_date_time_kst']);
      const trade_price = json['trade_price'];
      const candle_acc_trade_volume = json['candle_acc_trade_volume'];
      const postData = {
        market,
        timestamp,
        trade_price,
        candle_acc_trade_volume,
      };
      postDataList.push(postData);
    }
    return postDataList;
  }

  async saveData(jsonData) {
    const response = await axios.post(this.saveURL, jsonData);
    if (response == 1) {
      console.log('데이터가 성공적으로 저장되었습니다')
    }
  }

}

module.exports = {
  API,
}
