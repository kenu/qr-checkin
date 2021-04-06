const Event = require("../models").Event;

let eventController = {
  index: async (req, res) => {
    const eventList = await Event.findAll();
    res.render("eventList", { eventList: eventList });
  },

  qrReader: async (req, res) => {
    res.render("reader", { eventId: req.params.id });
  },
};

module.exports = {
  index: eventController.index,
  qrReader: eventController.qrReader,
};
