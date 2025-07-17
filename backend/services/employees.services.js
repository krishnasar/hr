const employeeRepo = require("../repositories/employees.repository");

class EmployeeService {
  async createEmployee(data) {
    return await employeeRepo.create(data);
  }

  async getAllEmployees() {
    return await employeeRepo.findAll();
  }

  async getEmployeeById(id) {
    return await employeeRepo.findById(id);
  }

  async updateEmployee(id, data) {
    return await employeeRepo.update(id, data);
  }

  async deleteEmployee(id) {
    return await employeeRepo.delete(id);
  }
}

module.exports = new EmployeeService();
