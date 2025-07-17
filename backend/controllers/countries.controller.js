const countriesService = require("../services/countries.services");

exports.create = async (req, res, next) => {
  try {
    const cont = await countriesService.createCountries(req.body);
    res.status(201).json(cont);
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const cont = await countriesService.getAllCountries();
    res.json(cont);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const cont = await countriesService.getCountriesById(req.params.id);
    if (!cont) return res.status(404).json({ message: "Countries not found" });
    res.json(cont);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const updated = await countriesService.updateCountries(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Countries not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const removed = await countriesService.deleteCountries(req.params.id);
    if (!removed) return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};
