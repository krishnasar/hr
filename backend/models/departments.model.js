module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define("Department", {
    department_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Optional: remove if you're manually assigning IDs
    },
    department_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    manager_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: "departments",
    timestamps: false,
  });

  Department.associate = (models) => {
    Department.belongsTo(models.Location, {
      foreignKey: "location_id",
      as: "location",
    });
  };

  return Department;
};
