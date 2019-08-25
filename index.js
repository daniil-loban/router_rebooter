const fetch = require("node-fetch");
const md5 = require('md5');

const HOST = "192.168.0.1";

const base64 = {
  decode: s => Buffer.from(s, 'base64'),
  encode: b => Buffer.from(b).toString('base64')
};

function login(headers_template) {
  protectedUrl = `http://${HOST}/userRpm/LoginRpm.htm?Save=Save`
  return fetch(protectedUrl, {
    headers: {
      ...headers_template,
      "Referer": `http://${HOST}/`,
    }
  });
}

function reset(headers_template, pass) {
  protectedUrl = `http://${HOST}/${pass}/userRpm/SysRebootRpm.htm?Reboot=Reboot`
  return fetch(protectedUrl, {
    headers: {
      ...headers_template,
      "Referer": `http://${HOST}/${pass}/userRpm/SysRebootRpm.htm`,
    }
  });
}

(function() {
  const password = 'admin'; 
  const user = 'admin';
  const Cookie = `Authorization=Basic ${base64.encode(`${user}:${md5(password).toLowerCase()}`)}`
  const headers_template = {
    "Host": HOST,
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:68.0) Gecko/20100101 Firefox/68.0",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
    "Accept-Encoding": "gzip, deflate",
    "Connection": "keep-alive",
    Cookie,
    "Upgrade-Insecure-Requests": "1"
  }
  login(headers_template).then( response => response.text().then(_=> {
    var regexConst = new RegExp(`http://${HOST}/([A-Z]*)/userRpm/Index.htm`);
    const match_pass = _.match(regexConst)
    if (match_pass && match_pass instanceof Array && match_pass.length === 2){
      reset(headers_template, match_pass[1]).then(_ => console.log('OK'))
    }
  }))
}());





