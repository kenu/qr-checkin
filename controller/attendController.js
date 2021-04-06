const { decrypt } = require("../util/cryptoUtil");
const Attend = require("../models").Attend;

let attendController = {
  index: async function (req, res) {
    const list = await Attend.findAll();
    res.render("list", { list });
  },

  create: async function (req, res) {
    const data = decrypt(req.body.data);
    if (data) {
      const row = data.split("|");
      console.log(row);
      if (row.length < 2) {
        res.send({ success: false, message: "Login Again!" });
        return;
      }
      // event: process.env.EVENT_NAME || "202103os",
      const record = {
        eventId: parseInt(req.body.eventId),
        username: row[1],
        created: new Date(Number(row[0])),
      };
      let result = {};
      try {
        result = await Attend.save(record);
      } catch (err) {
        result = { success: false, message: err.message };
      }
      res.end(JSON.stringify(result));
    } else {
      res.send({ success: false, message: "Invalid Data." });
    }
  },
};

module.exports = {
  index: attendController.index,
  create: attendController.create,
};
