module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Country111", {
    country_id: {
      type: DataTypes.STRING(2),
      primaryKey: true
    },
    country_name: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    region_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: "countries",
    timestamps: false
  });
};
