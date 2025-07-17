module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Location", {
    location_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    street_address: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    postal_code: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    state_province: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    country_id: {
      type: DataTypes.STRING(2),
      allowNull: true
    }
  }, {
    tableName: "locations",
    timestamps: false
  });
};
