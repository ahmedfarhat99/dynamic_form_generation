const asyncHandler = require("express-async-handler");
const Participant = require("../models/participantModel");
const { validateParticipant } = require("../utils/validators");

// GET /api/participants
const getAllParticipants = asyncHandler(async (req, res) => {
  const participants = await Participant.find().sort({ points: -1 }); // Populate author field with username
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

  const fieldPointMapping = {
    firstName: 25,
    lastName: 25,
    email: 25,
    resume: 15,
    phone: 15,
    linkedin: 10,
    github: 10,
    portfolio: 10,
    coverLetter: 10,
    photo: 10,
    birthDate: 5,
    address: 5,
    postalCode: 5,
    city: 5,
    country: 5,
    degree: 5,
    fieldOfStudy: 5,
    university: 5,
    possibleStartDate: 5,
  };
  const points = Object.keys(req.body).reduce(
    (totalPoints, field) => totalPoints + (fieldPointMapping[field] || 0),
    0
  );

  const participant = await Participant.create({ ...req.body, points });

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
