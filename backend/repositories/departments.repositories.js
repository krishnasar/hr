const { Department } = require("../models");

class DepartmentRepository {
  async create(data) {
    return await Department.create(data);
  }

  async findAll() {
    return await Department.findAll();
  }

  async findById(id) {
    return await Department.findByPk(id);
  }

  async update(id, data) {
    const dept = await Department.findByPk(id);
    if (!dept) return null;
    return await dept.update(data);
  }

  async delete(id) {
    const dept = await Department.findByPk(id);
    if (!dept) return null;
    await dept.destroy();
    return dept;
  }
}

module.exports = new DepartmentRepository();
