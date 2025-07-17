module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Job", {
    job_id: {
      type: DataTypes.STRING(10),
      primaryKey: true
    },
    job_title: {
      type: DataTypes.STRING(35),
      allowNull: false
    },
    min_salary: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    max_salary: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: "jobs",
    timestamps: false
  });
};
