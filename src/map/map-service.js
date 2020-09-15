const express = require('express');
const axios = require('axios');
const client = new Client({});

client
  .places({
    params: {
      input: '',
      locations: [{ lat: 45, lng: -110 }],
      key: process.env.GOOGLE_MAPS_API_KEY
    },
    timeout: 1000 // milliseconds
  }, axiosInstance)
  .then(r => {
    console.log(r.data.results[0].places);
  })
  .catch(e => {
    console.log(e);
  });