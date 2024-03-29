'use strict';

const childProcess = require('child_process');

module.exports = class Util {

  static isValidIPv4(str) {
    const blocks = str.split('.');
    if (blocks.length !== 4) return false;

    for (let value of blocks) {
      value = parseInt(value, 10);
      if (Number.isNaN(value)) return false;
      if (value < 0 || value > 255) return false;
    }

    return true;
  }

  static nextIP(startIP) {
    const tIP = startIP.split('.', 4);
    let ip = (tIP[0] << 24) | (tIP[1] << 16) | (tIP[2] << 8) | (tIP[3] << 0);
    ip++;
    const nextIP = [
      (ip >> 24) & 0xff,
      (ip >> 16) & 0xff,
      (ip >> 8) & 0xff,
      (ip >> 0) & 0xff,
    ];
    return nextIP.join('.');
  }

  static generateNextIp(clients) {
    const clientsArray = Object.values(clients);

    const ipsLimit = [];

    // eslint-disable-next-line array-callback-return
    clientsArray.map(c => {
      ipsLimit.push(c.address);
    });

    const ips = [];

    let sIp = '10.7.0.1';
    let i = 1;
    do {
      i += 1;
      const tIP = sIp.split('.', 4);
      let ip = (tIP[0] << 24) | (tIP[1] << 16) | (tIP[2] << 8) | (tIP[3] << 0);
      ip++;
      const nextIP = [
        (ip >> 24) & 0xff,
        (ip >> 16) & 0xff,
        (ip >> 8) & 0xff,
        (ip >> 0) & 0xff,
      ];
      sIp = nextIP.join('.');
      ips.push(nextIP.join('.'));
    } while (i !== 65535);

    const newIps = ips.filter(e => !~ipsLimit.indexOf(e));
    return newIps[0];
  }

  static promisify(fn) {
    // eslint-disable-next-line func-names
    return function(req, res) {
      Promise.resolve().then(async () => fn(req, res))
        .then(result => {
          if (res.headersSent) return;

          if (typeof result === 'undefined') {
            return res
              .status(204)
              .end();
          }

          return res
            .status(200)
            .json(result);
        })
        .catch(error => {
          if (typeof error === 'string') {
            error = new Error(error);
          }

          // eslint-disable-next-line no-console
          console.error(error);

          return res
            .status(error.statusCode || 500)
            .json({
              error: error.message || error.toString(),
              stack: error.stack,
            });
        });
    };
  }

  static async exec(cmd, {
    log = true,
  } = {}) {
    if (typeof log === 'string') {
      // eslint-disable-next-line no-console
      console.log(`$ ${log}`);
    } else if (log === true) {
      // eslint-disable-next-line no-console
      console.log(`$ ${cmd}`);
    }

    if (process.platform !== 'linux') {
      return '';
    }

    return new Promise((resolve, reject) => {
      childProcess.exec(cmd, {
        shell: 'bash',
      }, (err, stdout) => {
        if (err) return reject(err);
        return resolve(String(stdout).trim());
      });
    });
  }

};
