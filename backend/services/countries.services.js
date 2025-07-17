const CountriesRepo = require("../repositories/countries.repositories");

class CountriesService {
  async createCountries(data) {
    return await CountriesRepo.create(data);
  }

  async getAllCountries() {
    return await CountriesRepo.findAll();
  }

  async getCountriesById(id) {
    return await CountriesRepo.findById(id);
  }

  async updateCountries(id, data) {
    return await CountriesRepo.update(id, data);
  }

  async deleteCountries(id) {
    return await CountriesRepo.delete(id);
  }
}

module.exports = new CountriesService();


