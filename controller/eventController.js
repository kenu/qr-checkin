const Event = require("../models").Event;

let eventController = {
  index: async (req, res) => {
    const eventList = await Event.findAll();
    res.render("event/list", { eventList: eventList });
  },

  create: async (req, res) => {
    const record = {
      title: req.body.title,
      date: new Date(req.body.date + "T" + req.body.time),
    };
    let result = {};
    try {
      result = await Event.create(record);
      res.redirect("/events");
    } catch (err) {
      result = { success: false, message: err.message };
      res.end(JSON.stringify(result));
    }
  },

  qrReader: (req, res) => {
    res.render("reader", { eventId: req.params.id });
  },

  // editForm: async (req, res) => {
  //   res.render("event/editForm", { eventId: req.params.id });
  // },

  createForm: (req, res) => {
    res.render("event/createForm");
  },

  // deleteForm: async (req, res) => {
  //   res.render("event/deleteForm", { eventId: req.params.id });
  // },

  validateEventId: async (req, res, next) => {
    event_count = await Event.count({ where: { id: parseInt(req.params.id) } });
    if (event_count < 1) {
      res.status(400);
      result = { success: false, message: "Invalid EventId" };
      res.end(JSON.stringify(result));
    } else {
      next();
    }
  },
};

module.exports = {
  index: eventController.index,
  create: eventController.create,
  qrReader: eventController.qrReader,

  editForm: eventController.editForm,
  createForm: eventController.createForm,
  deleteForm: eventController.deleteForm,

  validateEventId: eventController.validateEventId,
};
