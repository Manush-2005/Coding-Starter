import mongoose from "mongoose";
import joi from "joi";
import JoiObjectId from "joi-objectid";
const ObjectId = JoiObjectId(joi);

let userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: Number,
  },
  Clerk_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    default: null,
  },

  previousWork: {
    type: [
      {
        projectsDone: { type: Number, default: 0 },
        moneyEarned: { type: Number, default: 0 },
      },
    ],
  },

  education: {
    type: [
      {
        school: { type: String, required: true },
        degree: { type: String, required: true },
        fieldOfStudy: { type: String, required: true },
        startDate: { type: String, required: true },
        endDate: { type: String, required: true },
        skills: [{ type: String, default: [] }],
      },
    ],
    default: [],
  },

  projects: {
    type: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        link: { type: String },
        startDate: { type: String, required: true },
        endDate: { type: String, required: true },
        skills: [{ type: String, default: [] }], // Array of skills
      },
    ],
    default: [],
  },

  createdProjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      default: [],
    },
  ],
  rating: {
    type: Number,
    default: 0,
  },
  languages: [
    {
      type: String,
      default: [],
    },
  ],

  skills: {
    type: [String],
    default: [],
  },

  expertise: {
    type: String,
    default: null,
  },
  aboutMe: {
    type: String,
    default: null,
  },
  links: {
    type: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    default: [],
  },
  reviews: {
    type: [
      {
        createdBy: {
          type: String,
          required: true,
        },
        rating: { type: Number, required: true, min: 1, max: 5 },
        description: { type: String, required: true },
      },
    ],
    default: [],
  },
  pending_amount: {
    type: Number,
    default: 0
  },
  withdrawable_amount: {
    type: Number,
    default: 0
  }
});

export const userSchemaValidation = joi.object({
  email: joi.string().email().required(),
  Clerk_id: joi.string().required(),
  name: joi.string().required(),

  education: joi.array().items(
    joi.object().keys({
      school: joi.string().required(),
      degree: joi.string().required(),
      fieldOfStudy: joi.string().required(),
      startDate: joi.string().required(),
      endDate: joi.string().required(),
      skills: joi.array().items(joi.string()), // Ensures skills is an array of strings
    })
  ),

  previousWork: joi.array().items(
    joi.object().keys({
      projectsDone: joi.number().required(),
      moneyEarned: joi.number().required(),
    })
  ),

  projects: joi.array().items(
    joi.object().keys({
      title: joi.string().required(),
      description: joi.string().required(),
      link: joi.string().optional(),
      startDate: joi.string().required(),
      endDate: joi.string().required(),
      skills: joi.array().items(joi.string()), // Ensures skills is an array of strings
    })
  ),

  links: joi.array().items(
    joi.object().keys({
      name: joi.string().required(),
      url: joi.string().uri().required(), // Ensures URL is valid
    })
  ),

  reviews: joi.array().items(
    joi.object().keys({
      createdBy: joi.string().required(),
      rating: joi.number().min(1).max(5).required(),
      description: joi.string().required(),
    })
  ),
});

export const User = mongoose.model("User", userSchema);
