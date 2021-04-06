const express = require("express");
const router = express.Router();
const { eventController } = require("../controller");

router.get("", eventController.index);
router.get(
  "/:id/reader",
  eventController.validateEventId,
  eventController.qrReader
);

router.post("", eventController.create);
// router.patch("", eventController.update);
// router.delete("", eventController.delete);

// router.get("/:id/editForm", eventController.editForm);
router.get("/createForm", eventController.createForm);
// router.get("/:id/deleteForm", eventController.deleteForm);

module.exports = router;
