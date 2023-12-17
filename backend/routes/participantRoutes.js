const express = require("express");
const {
  getAllParticipants,
  getParticipant,
  addParticipant,
  deleteParticipant,
} = require("../controllers/participantController");

const router = express.Router();

router.get("/", getAllParticipants);

router.get("/:id", getParticipant);

router.post("/", addParticipant);

router.delete("/:id", deleteParticipant);

module.exports = router;
