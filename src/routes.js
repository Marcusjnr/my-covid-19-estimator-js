const express = require('express');

const router = express.Router();
const fs = require('fs');
// const js2xmlparser = require('js2xmlparser');
const covid19ImpactEstimator = require('./estimator');

const logs = {
  log_data: []
};

router.post('/api/v1/on-covid-19', async (req, res) => {
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

router.post('/api/v1/on-covid-19/json', async (req, res) => {
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


// router.post('/api/v1/on-covid-19/xml', async (req, res) => {
//   const start = new Date();
//   const estimateXml = js2xmlparser.parse('root', covid19ImpactEstimator(req.body));
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

module.exports = router;
