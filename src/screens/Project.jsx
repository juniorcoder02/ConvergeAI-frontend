import "../index.css";
import React, { useState, useEffect, useContext, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "../config/axios.js";
import { UserContext } from "../context/user.context.jsx";
import {
  initializeSocket,
  recieveMessage,
  sendMessage,
} from "../config/socket.js";
import Markdown from "markdown-to-jsx";
import { Editor } from "@monaco-editor/react";
import { toast } from "react-toastify";

const Project = () => {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [users, setUsers] = useState([]);
  const [project, setProject] = useState(location.state?.project || {});
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const messageEndRef = useRef(null);
  const [fileTree, setFileTree] = useState({});
  const [currentFile, setCurrentFile] = useState(null);
  const [openFiles, setOpenFiles] = useState([]);

  useEffect(() => {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    messageEndRef.current?.scrollIntoView({
      behavior: isMobile ? "auto" : "smooth",
      block: "end",
    });
  }, [chatMessages]);

  useEffect(() => {
    if (!project?._id) return;
    initializeSocket(project._id);

    recieveMessage("project-message", (data) => {
      setChatMessages((prev) => [...prev, { ...data, type: "incoming" }]);
    });

    recieveMessage("project-filetree", (data) => {
      if (data.fileTree) {
        setFileTree((prev) => ({ ...prev, ...data.fileTree }));
        const fileNames = Object.keys(data.fileTree);
        if (fileNames.length > 0) {
          setCurrentFile(fileNames[0]);
          setOpenFiles(fileNames);
        }
      }
    });

    axios.get(`/api/project/get-project/${project._id}`).then((res) => {
      setProject(res.data.project);
    });

    axios.get("/api/user/all").then((res) => setUsers(res.data.users));
  }, [project._id]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    const msgObject = { message, sender: user };
    sendMessage("project-message", msgObject);
    setChatMessages((prev) => [...prev, { ...msgObject, type: "outgoing" }]);
    setMessage("");
  };

  const getLanguage = (filename) => {
    if (filename.endsWith(".js")) return "javascript";
    if (filename.endsWith(".ts")) return "typescript";
    if (filename.endsWith(".jsx")) return "javascript";
    if (filename.endsWith(".json")) return "json";
    if (filename.endsWith(".html")) return "html";
    if (filename.endsWith(".css")) return "css";
    if (filename.endsWith(".py")) return "python";
    if (filename.endsWith(".java")) return "java";
    if (filename.endsWith(".md")) return "markdown";
    return "plaintext";
  };

  return (
    <main className="min-h-screen w-screen flex flex-col md:flex-row overflow-hidden">
      {/* Chat & FileTree */}
      <section className="md:w-1/2 w-full bg-[#F1F5F9] flex flex-col max-h-[50vh] md:max-h-full overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-[#E2E8F0] shadow-md">
          <button
            onClick={() => setIsUserModalOpen(true)}
            className="text-sm font-semibold text-blue-700 hover:underline cursor-pointer"
          >
            + Add Collaborator
          </button>
          <button
            onClick={() => setIsSidePanelOpen(true)}
            className="bg-blue-600 cursor-pointer text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Team
          </button>
        </div>

        {/* Chat Box */}
        <div
          className="flex-grow overflow-y-auto px-4 py-2 space-y-3 scroll-smooth"
          style={{ maxHeight: "100%" }}
        >
          {chatMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[80%] px-4 py-2 rounded-lg shadow-sm text-sm ${
                msg.type === "outgoing"
                  ? "ml-auto bg-blue-100"
                  : msg.sender?.email === "AI"
                  ? "bg-black text-white"
                  : "bg-white"
              }`}
            >
              <small className="text-xs font-medium text-gray-500">
                {msg.sender?.email || "You"}
              </small>
              <div className="mt-1">
                {msg.message.startsWith("**AI**:") ? (
                  <Markdown>{msg.message.replace("**AI**:", "")}</Markdown>
                ) : (
                  <p>{msg.message}</p>
                )}
              </div>
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>

        {/* Input */}
        <div className="p-2 border-t flex gap-2 bg-white">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow px-4 py-2 border rounded focus:outline-none"
            placeholder="Enter your message..."
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 cursor-pointer text-white px-4 rounded hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </section>

      {/* Code Editor */}
      <section className="md:w-1/2 w-full bg-[#0F172A] flex flex-col">
        {/* File Tabs */}
        <div className="flex gap-2 p-2 bg-[#1E293B] border-b border-[#334155] overflow-x-auto">
          {openFiles.map((file) => (
            <button
              key={file}
              onClick={() => setCurrentFile(file)}
              className={`px-4 py-2 rounded-t whitespace-nowrap ${
                currentFile === file
                  ? "bg-blue-600 text-white"
                  : "bg-[#CBD5E1] text-black"
              }`}
            >
              {file}
            </button>
          ))}
        </div>

        {/* Code Area */}
        <div className="flex-grow">
          {fileTree[currentFile] && (
            <Editor
              height="100%"
              theme="vs-dark"
              language={getLanguage(currentFile)}
              defaultValue={fileTree[currentFile].content}
              value={fileTree[currentFile].content}
              onChange={(value) => {
                setFileTree((prev) => ({
                  ...prev,
                  [currentFile]: {
                    ...prev[currentFile],
                    content: value,
                  },
                }));
              }}
            />
          )}
        </div>
      </section>

      {/* Side Panel */}
      {isSidePanelOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-72 bg-white shadow-lg h-full p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Team Members</h2>
              <button onClick={() => setIsSidePanelOpen(false)}>❌</button>
            </div>
            {project?.users?.map((u) => (
              <div key={u._id} className="flex items-center gap-3 mb-3">
                <div className="bg-gray-600 text-white w-8 h-8 rounded-full flex items-center justify-center">
                  👤
                </div>
                <span className="text-sm text-gray-800">{u.email}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Collaborator Modal */}
      {isUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Invite Collaborators</h2>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {users
                .filter((u) => u._id !== user._id)
                .map((u) => {
                  const alreadyInProject = project?.users?.some(
                    (pu) => pu._id === u._id
                  );
                  const alreadyInvited = project?.invites?.some(
                    (inviteId) => inviteId === u._id
                  );
                  const isDisabled = alreadyInProject || alreadyInvited;

                  return (
                    <div
                      key={u._id}
                      onClick={() => {
                        if (isDisabled) return;
                        setSelectedUserIds((prev) =>
                          prev.includes(u._id)
                            ? prev.filter((id) => id !== u._id)
                            : [...prev, u._id]
                        );
                      }}
                      className={`p-2 border rounded flex items-center gap-3 cursor-pointer ${
                        isDisabled
                          ? "bg-gray-200 cursor-not-allowed opacity-60"
                          : selectedUserIds.includes(u._id)
                          ? "bg-blue-100 border-blue-500"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <div className="bg-gray-600 text-white w-8 h-8 rounded-full flex items-center justify-center">
                        👤
                      </div>
                      <span className="text-sm">{u.email}</span>
                      {alreadyInProject && (
                        <span className="text-xs ml-auto text-green-600">
                          In Project
                        </span>
                      )}
                      {alreadyInvited && !alreadyInProject && (
                        <span className="text-xs ml-auto text-yellow-600">
                          Invited
                        </span>
                      )}
                    </div>
                  );
                })}
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsUserModalOpen(false)}
                className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!selectedUserIds.length)
                    return toast.info("select at least one user to send");

                  axios
                    .post("/api/project-invite/send", {
                      receiverIds: selectedUserIds, // Send as array
                      projectId: project._id,
                    })
                    .then(() => {
                      toast.success("Invitations sent!");
                      setSelectedUserIds([]);
                      setIsUserModalOpen(false);
                    })
                    .catch((err) => {
                      console.error(err);
                      toast.error(
                        err.response?.data?.error ||
                          "Failed to send invitations. Try again."
                      );
                    });
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Send Invites
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Project;
