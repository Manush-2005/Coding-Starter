import { Proposal } from "../Models/Proposal.js";
import { projectSchemaValidation } from "../Models/Project.js";
import { Project } from "../Models/Project.js";
import { User } from "../Models/User.js";

export const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    let project = await Project.findById(id);

    if (!project) {
      return res.status(403).json({ message: "Project does not exists" });
    }

    return res.status(200).json({ message: "success", project });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

export const createProject = async (req, res) => {
  const {
    title,
    description,
    experienceLevel,
    price,
    tags,
    questions,
    projectFile,
    Clerk_id,
  } = req.body;

  try {
    const requser = await User.findOne({ Clerk_id: Clerk_id });

    if (!requser) {
      return res.status(404).json({ message: "User not found" });
    }

    const project = new Project({
      title,
      description,
      experienceLevel,
      price,
      tags,
      questions,
      file: projectFile,
      createdBy: requser._id,
    });

    const savedProject = await project.save();
    requser.createdProjects.push(savedProject._id);
    await requser.save();

    return res
      .status(200)
      .json({ message: "Project Created", project: savedProject });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error Occurred !!!", err });
  }
};

export const getAllProposalsOfProject = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);

  if (!project) {
    return res.status(404).json({ message: "Project does not exist" });
  }
  let proposals = [];

  for (let i = 0; i < project.proposals.length; i++) {
    let proposal = await Proposal.findById(project.proposals[i]);
    proposals.push(proposal);
  }

  project
    .save()
    .then(() => {
      res.status(200).json({ message: "success", proposals });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error Occurred !!!" });
    });
};

export const hireFreelancerForProject = async(req, res) => {
  const { pId, fId} = req.params;
  const project = await Project.findById(pId);

  if (!project) {
    return res.status(404).json({ message: "Project does not exist" });
  }

  project.hiredPerson = fId;

  project
    .save()
    .then(() => {
      res.status(200).json({ message: "success"});
    })
    .catch((err) => {
      res.status(500).json({ message: "Error Occurred !!!" });
    });

}
