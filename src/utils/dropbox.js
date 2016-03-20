const DB_API_PREFIX = 'https://api.dropboxapi.com/1';

const queryString = require('query-string');

import Promise from 'bluebird';
const request = require('superagent');


export const authorize = () => {
  const params = {
    response_type: 'token',
    client_id: 'f1urc0vbuey95it',
    redirect_uri: 'http://localhost:3000'
  };

  window.location = `https://www.dropbox.com/1/oauth2/authorize?${ queryString.stringify(params) }`
}

export const getAccountInfo = config => {
  return new Promise((resolve, reject) => {
    request
    .get(`${ DB_API_PREFIX }/account/info`)
    .set(`Authorization`, `Bearer ${ config.access_token }`)
    .end((err, res) => {
      if (err) reject(res);
      resolve(JSON.parse(res.text));
    });
  });
}
