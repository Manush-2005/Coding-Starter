import React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import LoadinPage from "@/components/LoadingPage";
import Navigate from "@/helpers/Navigate";

const ProjectDetailPage = () => {
  const navi = useNavigate();

  const { id } = useParams();
  const projectid = id;
  const [isProposalDialogOpen, setIsProposalDialogOpen] = useState(false);

  const { user, isLoaded } = useUser();
  const [userId, setUserId] = useState(null);
  const [project, setproject] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [createdBy, setCreatedBy] = useState(null);
  const [loading, setLoading] = useState(true);

  const [coverLetter, setCoverLetter] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [answers, setAnswers] = useState([]);
  const [deliveryTimes, setDeliveryTimes] = useState([]);

  useEffect(() => {
    if (isLoaded && user) {
      setUserId(user.id);
    }
  }, [isLoaded, user]);

  useEffect(() => {
    const fetchproject = async () => {
      if (userId) {
        let res = await axios.get(
          `http://localhost:3000/project/${projectid}`,
          {
            Clerk_id: userId,
          }
        );
        setproject(res.data.project);
        console.log(res.data.project);

        res = await axios.get(
          `http://localhost:3000/user/${res.data.project.createdBy}`
        );
        setCreatedBy(res.data.user);

        res = await axios.get(
          `http://localhost:3000/project/${projectid}/proposals`
        );
        let data = res.data.proposals;

        for (let i = 0; i < data.length; i++) {
          res = await axios.get(
            `http://localhost:3000/user/${data[i].createdBy}`
          );
          data[i]["createdBy"] = res.data.user;
        }
        setProposals(data);
        setLoading(false);
      }
    };
    fetchproject();

    // return () => chatClient.disconnectUser();
  }, [userId]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3000/project/${projectid}/add-proposal`,
        {
          description: coverLetter,
          price: bidAmount,
          answers: answers,
          Clerk_id: userId,
        }
      );

      // Reset states
      setCoverLetter("");
      setBidAmount("");
      setAnswers([]);
      setDeliveryTimes([]);

      // Close dialog
      setIsProposalDialogOpen(false);

      // Show alert
      toast.success("Proposal submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit proposal. Please try again.");
    }
  };
  const openPDF = (publicId) => {
    const url = `https://res.cloudinary.com/dktw0yum9/image/upload/${publicId}.pdf`;
    window.open(url, "_blank");
  };

  if (loading) {
    return <LoadinPage />;
  }

  const handleShortList = async (proposal) => {
    const res = await axios.put(
      `http://localhost:3000/shortlist/user/${proposal._id}`
    );
    if (res.data.message === "The proposal is shortlisted.") {
      toast.success("Proposal is shortlisted");
    }
  };

  const handleHiring = async (data) => {
    toast.loading("Starting the process..");
    const res = await axios.post("http://localhost:3000/CreateOffer", data);
    if (res.data.newOffer) {
      toast.dismiss();
      toast.success("New Offer is created..");
      navi("/myoffers");
    }
  };

  return (
    <>
      <Navigate name={"Project"} item={projectid} path={"my-projects"} />
      <div className="container p-4 mx-auto max-w-7xl">
        {/* Main Project Card */}
        {project ? (
          <div className="mx-auto max-w-7xl">
            <Card className="mb-8 overflow-hidden border border-gray-200 shadow-lg rounded-2xl">
              <CardHeader className="p-6 bg-gray-100">
                <div className="flex flex-col items-start justify-between md:flex-row">
                  <div>
                    <CardTitle className="text-2xl font-semibold text-gray-800">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="mt-2 text-sm text-text">
                      Posted on{" "}
                      {Date(project.postedOn).toString().split("GMT")[0]}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    <p className="text-base font-bold text-btn">
                      <span className="font-semibold text-text">Price :</span>
                      <span> &#8377;{project.price}</span>
                    </p>
                    <div className="flex gap-2 text-base">
                      <span className="font-semibold text-text">
                        Experience Level :
                      </span>
                      <Badge className="px-3 py-1 text-center text-white capitalize rounded-md bg-btn">
                        {project.experienceLevel}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col gap-8 md:flex-row">
                  <div className="flex-1">
                    <h3 className="mb-2 text-lg font-semibold text-gray-800">
                      Project Description
                    </h3>
                    <p className="mb-6 leading-relaxed text-gray-700">
                      {project.description}
                    </p>

                    <div className="mb-6">
                      <h3 className="mb-2 text-lg font-semibold text-gray-800">
                        Skills Required
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            className="px-3 py-1 text-gray-800 bg-gray-200 rounded-md"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {project.milestones.length > 0 && (
                      <div className="mb-6">
                        <h3 className="mb-2 text-lg font-semibold text-gray-800">
                          Milestones
                        </h3>
                        <ul className="pl-6 text-gray-700 list-disc">
                          {project.milestones.map((milestone, index) => (
                            <li key={index} className="mb-1">
                              {milestone}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {project.questions.length > 0 && (
                      <div className="mb-6">
                        <h3 className="mb-2 text-lg font-semibold text-gray-800">
                          Screening Questions
                        </h3>
                        <ul className="pl-6 text-gray-700 list-disc">
                          {project.questions.map((question, index) => (
                            <li key={index} className="mb-1">
                              {question}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {project?.file && (
                      <div className="mb-6">
                        <h3 className="mb-2 text-lg font-semibold text-gray-800">
                          Attachments
                        </h3>
                        <Button
                          variant="outline"
                          onClick={() => {
                            openPDF(project.file);
                          }}
                          className="flex items-center justify-start gap-2 px-4 py-2 rounded-lg border-btn text-text"
                        >
                          <span className="text-lg">📄</span>
                          <span>{project.file.slice(0, 20)}</span>
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="w-full p-4 border rounded-lg shadow-md md:w-80 shrink-0 bg-gray-50 border-btn">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base font-semibold text-gray-800">
                          About the Client
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-3 mb-4">
                          {createdBy?.image && (
                            <Avatar>
                              <AvatarImage
                                src={createdBy.image}
                                alt={createdBy.name}
                              />
                              <AvatarFallback>
                                {createdBy.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div>
                            {createdBy?.name && (
                              <p className="font-medium text-gray-800">
                                Name: {createdBy.name}
                              </p>
                            )}
                            {createdBy?.title && (
                              <p className="text-sm text-gray-600">
                                {createdBy.title}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2 text-sm text-gray-700">
                          {createdBy?.rating && (
                            <div className="flex justify-between">
                              <span>Rating:</span>
                              <span className="font-medium">
                                ⭐ {createdBy.rating}/5
                              </span>
                            </div>
                          )}

                          {createdBy?.projectsPosted && (
                            <div className="flex justify-between">
                              <span>Projects Posted:</span>
                              <span className="font-medium">
                                {createdBy.projectsPosted}
                              </span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center p-6 bg-gray-100">
                <Button
                  size="lg"
                  className="w-full px-6 py-3 font-medium text-white rounded-lg shadow-md bg-btn md:w-auto hover:bg-blue-700"
                  onClick={() => setIsProposalDialogOpen(true)}
                >
                  Submit a Proposal
                </Button>
              </CardFooter>
            </Card>

            <Dialog
              open={isProposalDialogOpen}
              onOpenChange={setIsProposalDialogOpen}
            >
              <DialogContent className="max-w-2xl bg-white">
                <DialogHeader>
                  <DialogTitle>Submit a Proposal</DialogTitle>
                  <DialogDescription>
                    Tell the client why you're the best fit for this project
                  </DialogDescription>
                </DialogHeader>

                <div className="py-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cover-letter">
                      Describe how you will tackle this project
                    </Label>
                    <Textarea
                      id="cover-letter"
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      rows={6}
                      placeholder="Introduce yourself and explain why you're qualified for this project..."
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bid-amount">Your Bid (INR)</Label>
                      <div className="relative">
                        <span className="absolute -translate-y-1/2 left-3 top-1/2">
                          &#8377;
                        </span>
                        <input
                          id="bid-amount"
                          type="number"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          className="w-full h-10 px-3 py-2 pl-8 border rounded-md border-input bg-background"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  {project.milestones.length > 0 && (
                    <div className="space-y-2">
                      <Label>Milestones</Label>
                      {project.milestones.map((milestone, index) => (
                        <div key={index} className="flex m-0">
                          <Label>{`${index + 1} ${milestone}`}</Label>
                          <input
                            type="number"
                            placeholder="Enter Number of days needed"
                            value={deliveryTimes[index] || ""}
                            onChange={(e) => {
                              const newDelieveryTimes = [...deliveryTimes];
                              deliveryTimes[index] = e.target.value;
                              setAnswers(newDelieveryTimes);
                            }}
                            className="p-2 mb-4 border rounded"
                            required
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  {project.questions.length > 0 && (
                    <div className="space-y-2">
                      <Label>Answer Screening Questions</Label>
                      {project.questions.map((question, index) => (
                        <div key={index} className="mt-4">
                          <p className="mb-2 font-medium">{question}</p>
                          <Textarea
                            rows={3}
                            placeholder="Your answer..."
                            value={answers[index] || ""}
                            onChange={(e) => {
                              const newAnswers = [...answers];
                              newAnswers[index] = e.target.value;
                              setAnswers(newAnswers);
                            }}
                            required
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsProposalDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit}>Submit Proposal</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <>
            <h1> No project found with this id..</h1>
          </>
        )}

        {/* Proposals Section */}
        <div className="p-4 rounded-lg shadow-lg bg-bg md:p-6">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">
            Proposals ({project.proposals.length})
          </h2>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="flex gap-2 space-x-4">
              <TabsTrigger
                value="all"
                className="px-4 py-2 text-sm font-medium"
              >
                All Proposals
              </TabsTrigger>
              <TabsTrigger
                value="shortlisted"
                className="px-4 py-2 text-sm font-medium"
              >
                Shortlisted
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6 space-y-6">
              {proposals.length > 0 ? (
                proposals.map((proposal) => (
                  <Card
                    key={proposal._id}
                    className="p-3 border rounded-lg shadow-md sm:p-6 border-btn"
                  >
                    <CardHeader className="flex items-start justify-start">
                      <div>
                        <h3 className="text-lg font-semibold text-text">
                          {proposal.createdBy.name}
                        </h3>
                      </div>
                    </CardHeader>
                    <CardContent className="text-text">
                      <div className="flex flex-col items-start justify-start gap-2">
                        <div>
                          <p className="flex flex-wrap gap-1 text-sm sm:gap-2 text-text">
                            <span className="font-semibold">Descripton :</span>{" "}
                            <p>{proposal.description}</p>
                          </p>
                        </div>
                        <div>
                          <p className="flex gap-2 text-sm font-bold text-btn">
                            <span className="font-semibold text-text">
                              Price :
                            </span>
                            <p>&#8377; {proposal.price}</p>
                          </p>
                        </div>
                        <div>
                          <p>{proposal.coverLetter}</p>
                        </div>
                        <div>
                          <p className="flex items-center gap-1 text-sm">
                            <span className="font-semibold text-text">
                              Rating :
                            </span>
                            <span className="font-bold text-btn">
                              ⭐ {proposal.createdBy.rating}/5
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="flex items-center gap-1 text-sm">
                            <span className="font-semibold text-text">
                              Completed Projects :
                            </span>
                            <span className="font-bold text-btn">
                              {proposal.createdBy.createdProjects.length}
                            </span>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start gap-3 sm:justify-end sm:flex-row sm:items-center">
                      {!proposal.isShortListed && (
                        <Button
                          variant="outline"
                          className="px-6 py-3 font-medium text-white rounded-lg shadow-md bg-btn md:w-auto hover:bg-blue-700"
                          onClick={() => handleShortList(proposal)}
                        >
                          Shortlist
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        className="px-6 py-3 font-medium text-white rounded-lg shadow-md bg-btn md:w-auto hover:bg-blue-700"
                        onClick={() =>
                          navi(
                            `/project/${projectid}/proposal/${proposal._id}/analyze`
                          )
                        }
                      >
                        AI Analysis
                      </Button>
                      <Button
                        variant="outline"
                        className="px-6 py-3 font-medium text-white rounded-lg shadow-md bg-btn md:w-auto hover:bg-blue-700"
                      >
                        Message
                      </Button>
                      <Button
                        variant="outline"
                        className="px-6 py-3 font-medium text-white rounded-lg shadow-md bg-btn md:w-auto hover:bg-blue-700"
                        onClick={() =>
                          handleHiring({
                            clientId: project.createdBy,
                            FreelancerId: proposal.createdBy._id,
                            ProjectId: projectid,
                            amount: proposal.price,
                          })
                        }
                      >
                        Hire Freelancer
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <p className="text-gray-500">No Proposals submitted yet</p>
              )}
            </TabsContent>

            <TabsContent value="shortlisted" className="mt-6 space-y-6">
              {proposals.length > 0 ? (
                proposals.map(
                  (proposal) =>
                    proposal.isShortListed && (
                      <Card
                        key={proposal._id}
                        className="p-3 border rounded-lg shadow-md sm:p-6 border-btn"
                      >
                        <CardHeader className="flex items-start justify-start">
                          <div>
                            <h3 className="text-lg font-semibold text-text">
                              {proposal.createdBy.name}
                            </h3>
                          </div>
                        </CardHeader>
                        <CardContent className="text-text">
                          <div className="flex flex-col items-start justify-start gap-2">
                            <div>
                              <p className="flex flex-wrap gap-1 text-sm sm:gap-2 text-text">
                                <span className="font-semibold">
                                  Descripton :
                                </span>{" "}
                                <p>{proposal.description}</p>
                              </p>
                            </div>
                            <div>
                              <p className="flex gap-2 text-sm font-bold text-btn">
                                <span className="font-semibold text-text">
                                  Price :
                                </span>
                                <p>&#8377; {proposal.price}</p>
                              </p>
                            </div>
                            <div>
                              <p>{proposal.coverLetter}</p>
                            </div>
                            <div>
                              <p className="flex items-center gap-1 text-sm">
                                <span className="font-semibold text-text">
                                  Rating :
                                </span>
                                <span className="font-bold text-btn">
                                  ⭐ {proposal.createdBy.rating}/5
                                </span>
                              </p>
                            </div>
                            <div>
                              <p className="flex items-center gap-1 text-sm">
                                <span className="font-semibold text-text">
                                  Completed Projects :
                                </span>
                                <span className="font-bold text-btn">
                                  {proposal.createdBy.createdProjects.length}
                                </span>
                              </p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex flex-col items-start gap-3 sm:justify-end sm:flex-row sm:items-center">
                          <Button
                            variant="outline"
                            className="px-6 py-3 font-medium text-white rounded-lg shadow-md bg-btn md:w-auto hover:bg-blue-700"
                            onClick={() =>
                              navi(
                                `/project/${projectid}/proposal/${proposal._id}/analyze`
                              )
                            }
                          >
                            AI Analysis
                          </Button>
                          <Button
                            variant="outline"
                            className="px-6 py-3 font-medium text-white rounded-lg shadow-md bg-btn md:w-auto hover:bg-blue-700"
                          >
                            Message
                          </Button>
                          <Button
                            variant="outline"
                            className="px-6 py-3 font-medium text-white rounded-lg shadow-md bg-btn md:w-auto hover:bg-blue-700"
                            onClick={() =>
                              handleHiring({
                                clientId: project.createdBy,
                                FreelancerId: proposal.createdBy._id,
                                ProjectId: projectid,
                                amount: proposal.price,
                              })
                            }
                          >
                            Hire Freelancer
                          </Button>
                        </CardFooter>
                      </Card>
                    )
                )
              ) : (
                <p className="text-gray-500">No Shortlisted candidates yet</p>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Submit Proposal Dialog */}
      </div>
    </>
  );
};

export default ProjectDetailPage;
