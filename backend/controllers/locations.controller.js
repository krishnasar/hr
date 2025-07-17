const locationsService = require("../services/locations.services");

exports.create = async (req, res, next) => {
  try {
    const emp = await locationsService.createLocations(req.body);
    res.status(201).json(emp);
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const emps = await locationsService.getAllLocations();
    res.json(emps);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const emp = await locationsService.getLocationsById(req.params.id);
    if (!emp) return res.status(404).json({ message: "Employee not found" });
    res.json(emp);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const updated = await locationsService.updateLocations(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Employee not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const removed = await locationsService.deleteLocations(req.params.id);
    if (!removed) return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};
