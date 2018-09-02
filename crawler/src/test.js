const API = require('./api.js');

const main = async () => {
  const api = new API.API();
  const data = await api.requestUpbit();
  await api.formatData(data);
};

main();
