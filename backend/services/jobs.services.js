const JobsRepo = require("../repositories/jobs.repositories");

class JobsServices {
  async createJobs(data) {
    return await JobsRepo.create(data);
  }

  async getAllJobs() {
    return await JobsRepo.findAll();
  }

  async getJobsById(id) {
    return await JobsRepo.findById(id);
  }

  async updateJobs(id, data) {
    return await JobsRepo.update(id, data);
  }

  async deleteJobs(id) {
    return await JobsRepo.delete(id);
  }
}

module.exports = new JobsServices();

