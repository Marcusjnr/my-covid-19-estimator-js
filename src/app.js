const express = require('express');
const fs = require('fs');
const { covid19ImpactEstimator } = require('./estimator');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// const builder = new xml2js.Builder({
//   trim: true
// });


const logs = {
  log_data: []
};

app.get('/api/v1/on-covid-19', async (req, res) => {
  const start = new Date();
  res.send(covid19ImpactEstimator(req.body));
  req.on('close', (() => {
    const stop = new Date();
    logs.log_data.push({
      request: 'GET',
      url: '/api/v1/on-covid-19',
      status: 200,
      time: stop - start
    });
    const json = JSON.stringify(logs);
    fs.writeFile('./src/log.json', json, 'utf8', (() => {

    }));
  }));
});

app.get('/api/v1/on-covid-19/json', async (req, res) => {
  const start = new Date();
  res.send(covid19ImpactEstimator(req.body));
  req.on('close', (() => {
    const stop = new Date();
    logs.log_data.push({
      request: 'GET',
      url: '/api/v1/on-covid-19/json',
      status: 200,
      time: stop - start
    });
    const json = JSON.stringify(logs);
    fs.writeFile('./src/log.json', json, 'utf8', (() => {

    }));
  }));
});

// app.get('/api/v1/on-covid-19/xml', async (req, res) => {
//   const start = new Date();
//   const estimateXml = builder.buildObject(covid19ImpactEstimator(req.body));
//   res.send(estimateXml);
//   req.on('close', (() => {
//     const stop = new Date();
//     logs.log_data.push({
//       request: 'GET',
//       url: '/api/v1/on-covid-19/xml',
//       status: 200,
//       time: stop - start
//     });
//     const json = JSON.stringify(logs);
//     fs.writeFile('./src/log.json', json, 'utf8', (() => {
//
//     }));
//   }));
// });

// app.get('/api/v1/on-covid-19/logs', async (req, res) => {
//
// });

app.listen(port, () => {

});
