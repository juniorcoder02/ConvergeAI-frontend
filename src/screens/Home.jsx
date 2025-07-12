import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user.context";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

function Home() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState([]);
  const [invites, setInvites] = useState([]);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  useEffect(() => {
    axios
      .get("/api/project-invite/my-invites")
      .then((res) => setInvites(res.data.invites))
      .catch((err) => console.error("Error fetching invites", err));

    axios
      .get("/api/project/all")
      .then((res) => setProjects(res.data.projects))
      .catch((err) => console.error("Error fetching projects", err));
  }, []);

  function createProject(e) {
    e.preventDefault();
    if (!projectName.trim()) {
      toast.error("Project name is required!");
      return;
    }
    axios
      .post("/api/project/create", { name: projectName })
      .then((res) => {
        const createdProjectId = res.data?.project?._id;
        if (!createdProjectId) {
          throw new Error("Project ID not returned from server");
        }

        return axios.get(`/api/project/get-project/${createdProjectId}`);
      })
      .then((res) => {
        setProjectName("");
        setIsModalOpen(false);
        setProjects((prev) => [...prev, res.data.project]);
        toast.success("Project created successfully!");
      })
      .catch((err) => {
        const errorData =
          err.response?.data?.errors ||
          err.response?.data?.error ||
          err.message ||
          "Something went wrong";

        if (Array.isArray(errorData)) {
          errorData.forEach((msg) => toast.error(msg.msg || msg));
        } else {
          toast.error(errorData);
        }
      });
  }

  function deleteProject(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirmDelete) return;
    axios
      .delete(`/api/project/delete/${id}`)
      .then(() => {
        setProjects((prev) => prev.filter((proj) => proj._id !== id));
        toast.success("Project deleted successfully!");
      })
      .catch((err) => {
        console.error("Error deleting project", err);
        toast.error("Failed to delete project");
      });
  }

  const handleInviteResponse = async (inviteId, response, project = null) => {
    try {
      const res = await axios.post(`/api/project-invite/respond/${inviteId}`, {
        response,
      });

      if (response === "accepted" && project) {
        setProjects((prev) => [...prev, project]);
        toast.success(`You joined "${project.name}"`);
      } else if (response === "rejected") {
        toast.info("Invite rejected");
      }

      // Remove the invite from UI
      setInvites((prev) => prev.filter((i) => i._id !== inviteId));
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to respond to invite");
    }
  };

  function closeModal() {
    setProjectName("");
    setIsModalOpen(false);
  }

  function logoutUser() {
    axios
      .get("/api/user/logout")
      .then(() => {
        localStorage.removeItem("token");
        setUser(null);
        toast.success("Logged out successfully!");
        navigate("/"); // redirect to home
      })
      .catch((err) => {
        toast.error(err.response?.data?.error || "Logout failed");
      });
  }

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <motion.h1
              className="text-3xl md:text-4xl font-extrabold flex items-center gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Welcome, {user?.email || "User"}
              <motion.span
                className="text-3xl"
                initial={{ y: 0 }}
                animate={{ y: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                👋
              </motion.span>
            </motion.h1>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 cursor-pointer md:mt-0 px-6 py-3 bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8] hover:bg-[#38bdf8]/20 rounded-xl shadow-xl backdrop-blur-md transition"
              onClick={() => setIsModalOpen(true)}
            >
              + Create Project
            </motion.button>
          </div>

          {invites.length > 0 && (
            <div className="mb-10 bg-[#1e293b]/70 p-6 rounded-xl border border-[#38bdf8]/20 shadow">
              <h2 className="text-xl font-semibold mb-4 text-[#38bdf8]">
                📨 Pending Invites
              </h2>
              <ul className="space-y-4">
                {invites.map((invite) => (
                  <li
                    key={invite._id}
                    className="bg-[#0f172a] p-4 rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-white font-medium">
                        {invite.project.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        From: {invite.sender.email}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() =>
                          handleInviteResponse(
                            invite._id,
                            "accepted",
                            invite.project
                          )
                        }
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          handleInviteResponse(invite._id, "rejected")
                        }
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                      >
                        Reject
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {projects.length === 0 ? (
            <div className="text-center text-gray-400 mt-10 text-lg">
              No projects found. Create one to get started! 🚀
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <motion.div
                  key={project?._id || Math.random()}
                  className="bg-[#334155]/60 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-lg hover:bg-[#1e293b] transition cursor-pointer"
                  onClick={() => navigate(`/project`, { state: { project } })}
                  whileHover={{ scale: 1.02 }}
                >
                  <h2 className="text-xl font-bold text-[#f1f5f9]">
                    {project?.name || "Unnamed Project"}
                  </h2>
                  <p className="text-gray-400 mt-2 text-sm">
                    Project ID:{" "}
                    <span className="text-[#94a3b8]">
                      {project?._id || "N/A"}
                    </span>
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <p className="text-gray-400 text-sm">
                      Collaborators: {project?.users?.length || 0}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProject(project._id);
                      }}
                      className="text-red-400 hover:text-red-600 text-sm"
                    >
                      <i className="ri-delete-bin-line text-red-500 hover:text-red-700 text-xl" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
            <div className="text-center py-10">
        <button
          onClick={logoutUser}
          className=" cursor-pointer px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
        </div>
      </main>
    

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-4">
          <motion.div
            className="bg-[#1e293b] border border-[#38bdf8]/30 p-6 rounded-2xl w-full max-w-md shadow-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">New Project</h2>
            <form onSubmit={createProject} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-transparent border-b-2 border-[#38bdf8] text-white focus:outline-none"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 cursor-pointer text-gray-300 border border-gray-600 rounded-md hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 cursor-pointer py-2 bg-[#38bdf8] text-[#0f172a] font-semibold rounded-md hover:bg-blue-400 transition"
                >
                  Create
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default Home;
