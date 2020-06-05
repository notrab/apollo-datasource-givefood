const { RESTDataSource } = require('apollo-datasource-rest');

class GiveFoodDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://www.givefood.org.uk/api/1/';
  }

  async getAll() {
    return this.get('foodbanks');
  }

  async getBySlug(slug) {
    return this.get(`foodbank/${slug}`);
  }

  async getByLatLng(lat, lng) {
    return this.get(`foodbanks/search`, {
      lattlong: `${lat},${lng}`,
    });
  }

  async getByAddress(address) {
    return this.get(`foodbanks/search`, {
      address,
    });
  }
}

module.exports = { GiveFoodDataSource };
