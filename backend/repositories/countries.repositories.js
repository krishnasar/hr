const { Country } = require("../models");

class CountryRepository {
  async create(data) {
    return await Country.create(data);
  }

  async findAll() {
    return await Country.findAll();
  }

  async findById(id) {
    return await Country.findByPk(id);
  }

  async update(id, data) {
    const cont = await Country.findByPk(id);
    if (!cont) return null;
    return await cont.update(data);
  }

  async delete(id) {
    const cont = await Country.findByPk(id);
    if (!cont) return null;
    await cont.destroy();
    return cont;
  }
}

module.exports = new CountryRepository();
