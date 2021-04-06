const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Attend extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Event, {
        foreignKey: "eventId",
        targetKey: "id",
      });
    }
  }

  Attend.init(
    {
      eventId: DataTypes.INTEGER,
      username: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Attend",
    }
  );

  Attend.save = async function save(attend) {
    await sequelize.sync();
    const result = await Attend.findAll({
      where: { eventId: attend.eventId, username: attend.username },
    });
    if (result.length === 0) {
      const result2 = await Attend.create(attend);
      return result2;
    } else {
      throw new Error("Already registered!");
    }
  };

  return Attend;
};
