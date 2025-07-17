const jobsService = require("../services/jobs.services");

exports.create = async (req, res, next) => {
  try {
    const job = await jobsService.createJobs(req.body);
    res.status(201).json(job);
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const job = await jobsService.getAllJobs();
    res.json(job);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const job = await jobsService.getJobsById(req.params.id);
    if (!job) return res.status(404).json({ message: "Jobs not found" });
    res.json(job);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const updated = await jobsService.updateJobs(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Jobs not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const removed = await jobsService.deleteJobs(req.params.id);
    if (!removed) return res.status(404).json({ message: "Jobs not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};
