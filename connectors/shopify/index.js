require('dotenv').config();

const rp         = require('request-promise');
const Bottleneck = require('bottleneck');

class Shopify {
  constructor(opt = {}) {
    this.limiter = new Bottleneck({
      maxConcurrent: 1,
      minTime: 333,
    });

    this.apiKey    = opt.apiKey    || process.env.SHOPIFY_API_KEY;
    this.password  = opt.password  || process.env.SHOPIFY_PASSWORD;
    this.storeName = opt.storeName || process.env.SHOPIFY_STORE_NAME;
  }

  getUrl(endpoint) {
    let url = `https://${this.apiKey}:${this.password}@${this.storeName}.myshopify.com/admin`;

    if (!endpoint.startsWith('/')) {
      url += '/'
    }

    url += endpoint;

    return url;
  }

  request(method, url, data, qs) {
    const options = {
      method,
      url: this.getUrl(url),
      resolveWithFullResponse: true,
      json: true,
      qs: {},
    };

    if (data) {
      Object.assign(options, {
        body: data,
      });
    }

    if (qs) {
      Object.assign(options.qs, qs);
    }

    return this.limiter.schedule(rp, options);
  }

  get(url, params) {
    return this.request('GET', url, null, params);
  }

  post(url, data) {
    return this.request('POST', url, data);
  }

  put(url, data) {
    return this.request('PUT', url, data);
  }

  delete(url) {
    return this.request('DELETE', url);
  }
}

module.exports = Shopify;
