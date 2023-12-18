const asyncHandler = require("express-async-handler");
const Participant = require("../models/participantModel");
const { validateParticipant } = require("../utils/validators");
const { fieldPointMapping } = require("../utils/fieldsScore");

// GET /api/participants
const getAllParticipants = asyncHandler(async (req, res) => {
  const participants = await Participant.find().sort({ score: -1 }); // Populate author field with username
  res.json(participants);
});

// GET /api/participants/:id
const getParticipant = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const participant = await Participant.findById(id);
  if (!participant) {
    return res.status(404).json({ msg: "Participant not found!" });
  }
  res.json(participant);
});

// POST /api/participants
const addParticipant = asyncHandler(async (req, res) => {
  const { error } = validateParticipant(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const { email } = req.body;
  const existingParticipant = await Participant.findOne({ email });
  if (existingParticipant) {
    res.status(400);
    throw new Error("Email is already in use!");
  }

  const points = Object.keys(req.body).reduce(
    (totalPoints, field) => totalPoints + (fieldPointMapping[field] || 0),
    0
  );

  const participant = await Participant.create({ ...req.body, score: points });

  res
    .status(201)
    .json({ msg: "Participant added successfully!", details: participant });
});

// DELETE /api/participants/:id
const deleteParticipant = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedParticipant = await Participant.findByIdAndDelete(id);
  if (!deletedParticipant) {
    return res.status(404).json({ msg: "Participant not found!" });
  }
  res.json({
    msg: "Participant deleted successfully!",
    details: deletedParticipant,
  });
});

module.exports = {
  getAllParticipants,
  getParticipant,
  addParticipant,
  deleteParticipant,
};
