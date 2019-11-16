/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// [START gae_node_request_example]
const express = require('express');

const app = express();

let minimum, maximum, mean, median
let heartRateLog = []

app.get('/', (req, res) => {
  res
    .status(200)
    .send('Hello, world!')
    .end();
});

app.get('/addData', (req, res) => {
  res
    .status(200)
    .send('I am in great pain.')
    .end()
  heartRateLog.push(parseFloat(req.query.heartRate))
  minimum = heartRateLog[0]
  maximum = heartRateLog[0]
  for(let i = 1; i < heartRateLog.length; i++){
    if(heartRateLog[i] < minimum){
      minimum = heartRateLog[i]
    }
  }
  for(let i = 1; i < heartRateLog.length; i++){
    if(heartRateLog[i] > maximum){
      maximum = heartRateLog[i]
    }
  }
  let count = 0
  for(let i = 0; i < heartRateLog.length; i++){
    count += heartRateLog[i]
  }
  mean = count / heartRateLog.length

  heartRateLog = heartRateLog.sort()
  //Converting to an int: https://stackoverflow.com/questions/596467
  median = heartRateLog[~~(heartRateLog.length/2)]
})

app.get('/statistics', (req, res) => {
  res
    .status(200)
    .send(`minimum: ${minimum}. maximum: ${maximum}. mean: ${mean}. median: ${median}.`)
    .end()
})

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]

module.exports = app;
