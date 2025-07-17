const { Job } = require("../models");

class JobRepository {
  async create(data) {
    return await Job.create(data);
  }

  async findAll() {
    return await Job.findAll();
  }

  async findById(id) {
    return await Job.findByPk(id);
  }

  async update(id, data) {
    const Job1 = await Job.findByPk(id);
    if (!Job1) return null;
    return await Job1.update(data);
  }

  async delete(id) {
    const Job1 = await Job.findByPk(id);
    if (!Job1) return null;
    await Job1.destroy();
    return Job1;
  }
}

module.exports = new JobRepository();
