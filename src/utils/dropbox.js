import fetch from 'node-fetch';
import Promise from 'bluebird';

console.log(fetch);

export const authorize = () => {
  return fetch('http://localhost:3000/')
         .then(res => res.text());
}
