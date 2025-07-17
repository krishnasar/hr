const DepartmentsRepo = require("../repositories/departments.repositories");

class DepartmentsService {
  async createDepartments(data) {
    return await DepartmentsRepo.create(data);
  }

  async getAllDepartments() {
    return await DepartmentsRepo.findAll();
  }

  async getDepartmentsById(id) {
    return await DepartmentsRepo.findById(id);
  }

  async updateDepartments(id, data) {
    return await DepartmentsRepo.update(id, data);
  }

  async deleteDepartments(id) {
    return await DepartmentsRepo.delete(id);
  }
}

module.exports = new DepartmentsService();
