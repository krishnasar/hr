module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Employee", {
    employee_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: DataTypes.STRING,
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone_number: DataTypes.STRING,
    hire_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    job_id: DataTypes.STRING,
    salary: DataTypes.DECIMAL(8, 2)
  }, {
    tableName: "employees",
    timestamps: false
  });
};
