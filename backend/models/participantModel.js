const mongoose = require("mongoose");

const participantSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    resume: {
      type: String,
      trim: true,
      required: false,
    },
    points: {
      type: Number,
      default: 0,
      required: true,
    },
    linkedin: {
      type: String,
      trim: true,
    },
    github: {
      type: String,
      trim: true,
    },
    portfolio: {
      type: String,
      trim: true,
    },
    coverLetter: String,
    photo: String,
    birthDate: Date,
    phone: String,
    address: String,
    postalCode: String,
    city: String,
    country: String,
    degree: {
      type: String,
      enum: ["Bachelor", "Master"],
    },
    fieldOfStudy: {
      type: String,
      trim: true,
    },
    university: {
      type: String,
      trim: true,
    },
    possibleStartDate: Date,
  },
  {
    timestamps: true,
  }
);

const Participant = mongoose.model("Participant", participantSchema);

module.exports = Participant;
