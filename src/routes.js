const express = require('express');

const router = express.Router();
const fs = require('fs');
const js2xmlparser = require('js2xmlparser');
// const stringify = require('xml-stringify');
const covid19ImpactEstimator = require('./estimator');

const logs = {
  log_data: []
};
let st = '';

router.post('/api/v1/on-covid-19', async (req, res) => {
  const start = new Date();
  res.send(covid19ImpactEstimator(req.body));
  req.on('close', (() => {
    const stop = new Date();
    logs.log_data.push({
      request: 'GET',
      url: '/api/v1/on-covid-19',
      status: 200,
      time: `${stop - start}`,
      milString: 'ms'
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
      time: `${stop - start}`,
      milString: 'ms'
    });
    const json = JSON.stringify(logs);
    fs.writeFile('./src/log.json', json, 'utf8', (() => {

    }));
  }));
});


router.post('/api/v1/on-covid-19/xml', async (req, res) => {
  const start = new Date();
  const estimateXml = js2xmlparser.parse('root', covid19ImpactEstimator(req.body));
  res.send(estimateXml);
  req.on('close', (() => {
    const stop = new Date();
    logs.log_data.push({
      request: 'GET',
      url: '/api/v1/on-covid-19/xml',
      status: 200,
      time: `${stop - start}`,
      milString: 'ms'
    });
    const json = JSON.stringify(logs);
    fs.writeFile('./src/log.json', json, 'utf8', (() => {

    }));
  }));
});

router.get('/api/v1/on-covid-19/logs', async (req, res) => {
  const returnString = '';
  const strArray = [];

  fs.readFile('./src/log.json', 'utf8', (err, data) => {
    if (err) {
      res.send(err);
    } else {
      const obj = JSON.parse(data);// now it an object
      const jsonObj = obj.log_data;
      jsonObj.forEach((key) => {
        st = returnString.concat(`${key.request} \t\t ${key.url} \t\t ${key.status} \t\t ${key.time} \t\t ${key.milString} \n`);
        strArray.push(st);
      });
      const newString = strArray.toString().replace(/\r|,/g, '');
      res.send(newString);
    }
  });
});

module.exports = router;
