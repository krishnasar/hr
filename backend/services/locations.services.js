const LocationsRepo = require("../repositories/locations.repositories");

class LocationsService {
  async createLocations(data) {
    return await LocationsRepo.create(data);
  }

  async getAllLocations() {
    return await LocationsRepo.findAll();
  }

  async getLocationsById(id) {
    return await LocationsRepo.findById(id);
  }

  async updateLocations(id, data) {
    return await LocationsRepo.update(id, data);
  }

  async deleteLocations(id) {
    return await LocationsRepo.delete(id);
  }
}

module.exports = new LocationsService();
