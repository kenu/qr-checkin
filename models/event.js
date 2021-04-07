"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Attend, {
        foreignKey: "eventId",
        sourceKey: "id",
      });
    }
    getDateTimeFormatting() {
      function pad2(n) {
        return n < 10 ? "0" + n : n;
      }

      const dt = this.date;
      return (
        dt.getFullYear().toString() +
        "-" +
        pad2(dt.getMonth() + 1) +
        "-" +
        pad2(dt.getDate()) +
        "T" +
        pad2(dt.getHours()) +
        ":" +
        pad2(dt.getMinutes())
      );
    }
  }

  Event.init(
    {
      title: DataTypes.STRING,
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Event",
    }
  );

  return Event;
};
