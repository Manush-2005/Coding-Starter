import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import {
  addReviewToUser,
  addUser,
  editPropertiesOfUser,
  editUser,
  getAllProjectsOfUser,
  getUser,
  getUserUsingClerkId,
  shortlistUser,
} from "./Controllers/User.js";

import { getSkills } from "./Controllers/skills.js";

import { addProposalToProject, getProposal } from "./Controllers/proposals.js";
import {
  createProject,
  getAllProposalsOfProject,
  getProject,
  hireFreelancerForProject,
} from "./Controllers/project.js";
import {
  checkIfUserExists,
  getprojectByID,
  getProjectsbyClerkID,
  getToken,
  getTokenbyClerkID,
} from "./Controllers/authentication.js";
import {
  CreateOffer,
  AcceptOffer,
  DeclineOffer,
  PayOffer,
  sumbitwork,
  approvework,
  getAllOffersOfClient,
  getAllOffersOfFreelancer,
} from "./Controllers/offers.js";
import { payment, verify } from "./Controllers/payment.js";
import { GiveScorceToProposal } from "./Controllers/AIFunctions.js";
const PORT = 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  mongoose
    .connect(
      "mongodb+srv://zobime660:manush2005@cluster0.dxrqqdn.mongodb.net/Freelancing?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("Connected to Database");
    });
});

// User Routes
app.post("/user/add", addUser);
app.post("/user/:id/edit", editUser);
app.get("/user/:id", getUser);
app.get("/user/clerk/:id", getUserUsingClerkId);
app.post("/user/:id/edit-properties", editPropertiesOfUser);
app.get("/user/:id/projects", getAllProjectsOfUser);
app.put("/shortlist/user/:id", shortlistUser);
app.post("/user/:id/add-review", addReviewToUser);

// Project Routes
app.get("/project/:id", getProject);
app.post("/project/add", createProject);
app.post("/project/:id/add-proposal", addProposalToProject);
app.get("/project/:id/proposals", getAllProposalsOfProject);
app.get("/project/:pId/freelancer/:fId/hire", hireFreelancerForProject);

// Proposal Routes
app.get("/proposal/:id", getProposal);

// Skills Routes
app.get("/skills", getSkills);

// Authentication Routes
app.post("/checkifuserexists", checkIfUserExists);

// Offers Routes
app.post("/CreateOffer", CreateOffer);
app.put("/:offerId/accept", AcceptOffer);
app.put("/:offerId/decline", DeclineOffer);
app.put("/:offerId/pay", PayOffer);
app.put("/:offerId/sumbit", sumbitwork);
app.put("/:offerId/approve", approvework);
app.get("/client/:id/offers", getAllOffersOfClient);
app.get("/freelancer/:id/offers", getAllOffersOfFreelancer);

// AI Analysis routes
app.post("/GiveScore", GiveScorceToProposal);

// Payment Routes
app.post("/payment", payment);
app.post("/verify", verify);

// Authentication routes
app.post("/getToken", getToken); // It takes in the email and gives the token for chatting
app.post("/getTokenbyClerkID", getTokenbyClerkID); // It takes in the Clerk_id and gives the token for chatting
app.post("/getProjectsbyClerkID", getProjectsbyClerkID); // Thiss sget the projects by the clerk_id
app.post("/getprojectByID", getprojectByID);
