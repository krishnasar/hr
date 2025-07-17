const { Location2 } = require("../models");

class LocationRepository {
  async create(data) {
    return await Location2.create(data);
  }

  async findAll() {
    return await Location2.findAll();
  }

  async findById(id) {
    return await Location2.findByPk(id);
  }

  async update(id, data) {
    const location1 = await Location2.findByPk(id);
    if (!location1) return null;
    return await location1.update(data);
  }

  async delete(id) {
    const location1 = await Location2.findByPk(id);
    if (!location1) return null;
    await location1.destroy();
    return location1;
  }
}

module.exports = new LocationRepository();
