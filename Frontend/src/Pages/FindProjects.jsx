import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import { useNavigate } from "react-router-dom";
import LoadinPage from "@/components/LoadingPage";
import Navigate from "@/helpers/Navigate";
import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
import CreateProjectSection from "@/components/CreateProjectButton";

const FindProjects = () => {
  const { user, isLoaded } = useUser();
  const [userId, setUserId] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && user) {
      setUserId(user.id);
    }
  }, [isLoaded, user]);

  useEffect(() => {
    const fetchProjects = async () => {
      if (userId) {
        try {
          const res = await axios.get(
            `http://localhost:3000/user/${userId}/projects`
          );
          setProjects(res.data);
        } catch (error) {
          console.error("Error fetching projects:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProjects();
  }, [userId]);

  if (loading) {
    return <LoadinPage />;
  }

  return (
    <>
      <Navigate name={"Projects"} item={"My-Projects"} path={"my-projects"} />
      <main className="px-4 mx-auto max-w-7xl md:px-6 lg:px-3">
        <div className="w-full">
          <div className="flex flex-col w-full gap-3 mb-4 sm:justify-between sm:items-center sm:flex-row">
            <h1 className="float-left text-4xl font-bold tracking-tight">
              Projects For You:
            </h1>
            <CreateProjectSection />
          </div>

          <TextField
            label="Search Projects"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ marginBottom: 4 }}
          />
          <p className="mb-6 text-text">
            Explore a variety of freelance projects tailored to your skills and
            expertise. Whether you're a beginner or an experienced professional,
            discover exciting opportunities to work on diverse projects and grow
            your freelancing career.
          </p>
        </div>
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <ProjectCard
                  name={project.title}
                  tags={project.tags}
                  experienceLevel={project.experienceLevel}
                  price={project.price}
                  onViewProject={() => navigate(`/project/${project._id}`)}
                />
              </motion.div>
            ))
          ) : (
            <p className="text-lg text-gray-600">No projects found...</p>
          )}
        </motion.div>
      </main>
    </>
  );
};

export default FindProjects;
