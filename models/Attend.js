const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Attend extends Model {
    static associate(models) {
      // define association here
    }
  }

  Attend.init(
    {
      event: DataTypes.STRING,
      username: DataTypes.STRING,
      created: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "attend",
    }
  );

  Attend.save = async function save(attend) {
    await sequelize.sync();
    const result = await Attend.findAll({
      where: { event: attend.event, username: attend.username },
    });
    console.log(result);
    if (result.length === 0) {
      const result2 = await Attend.create(attend);
      return result2;
    } else {
      throw new Error("Already registered!");
    }
  };

  return Attend;
};
