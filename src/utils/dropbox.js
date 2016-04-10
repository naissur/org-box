const DB_API_CORE = 'https://api.dropboxapi.com/1';
const DB_API_HTTP = 'https://api.dropboxapi.com/2';
const DB_API_CONTENT = 'https://content.dropboxapi.com/1';

const queryString = require('query-string');

import Promise from 'bluebird';
const request = require('superagent');


export const authorize = () => {
  const params = {
    'response_type': 'token',
    'client_id': 'f1urc0vbuey95it',
    'redirect_uri': 'https://org-box.com.s3-website-us-east-1.amazonaws.com/'
  };

  window.location = `https://www.dropbox.com/1/oauth2/authorize?${ queryString.stringify(params) }`
}

export const getAccountInfo = config => {
  return new Promise((resolve, reject) => {
    request
    .get(`${ DB_API_CORE }/account/info`)
    .set(`Authorization`, `Bearer ${ config.access_token }`)
    .end((err, res) => {
      if (err) reject(res);
      resolve(JSON.parse(res.text));
    });
  });
}

export const getFolder = (config, path) => {
  return new Promise((resolve, reject) => {
    request
    .post(`${ DB_API_HTTP }/files/list_folder`)
    .send({ path })
    .set(`Authorization`, `Bearer ${ config.access_token }`)
    .end((err, res) => {
      if (err) reject(res);
      resolve(JSON.parse(res.text));
    });
  });
}

export const getFile = (config, path) => {
  return new Promise((resolve, reject) => {
    request
    .get(`${ DB_API_CONTENT }/files/auto/${ path }`)
    .set(`Authorization`, `Bearer ${ config.access_token }`)
    .end((err, res) => {
      if (err) reject(res);
      resolve(res.text);
    });
  });
}
