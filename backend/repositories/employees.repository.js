const { Employee } = require("../models");

class EmployeeRepository {
  async create(data) {
    return await Employee.create(data);
  }

  async findAll() {
    return await Employee.findAll();
  }

  async findById(id) {
    return await Employee.findByPk(id);
  }

  async update(id, data) {
    const emp = await Employee.findByPk(id);
    if (!emp) return null;
    return await emp.update(data);
  }

  async delete(id) {
    const emp = await Employee.findByPk(id);
    if (!emp) return null;
    await emp.destroy();
    return emp;
  }
}

module.exports = new EmployeeRepository();
