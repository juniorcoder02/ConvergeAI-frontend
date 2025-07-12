import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../screens/Navbar";
import {
  FaCode,
  FaUsers,
  FaLock,
  FaRobot,
  FaBrain,
  FaLaptopCode,
  FaRegComments,

  FaRocket,
} from "react-icons/fa";
import homeImage from "../assets/ConvergeAI_img1.png"; // PNG Image
import Footer from "./Footer";

const typingText = ["Collaborate. Code.", "Create with AI."];

const features = [
  {
    icon: <FaLaptopCode />,
    title: "Code Like a Pro",
    description:
      "Experience a blazing-fast real-time editor that feels just like VS Code. Syntax highlighting, auto-save, and multi-user support all in one place.",
  },
  {
    icon: <FaUsers />,
    title: "Seamless Collaboration",
    description:
      "Add team members to projects, share updates, and co-edit files — all without switching tabs or tools.",
  },
  {
    icon: <FaLock />,
    title: "End-to-End Encryption",
    description:
      "Your code, chats, and ideas are safe. We use state-of-the-art security protocols to ensure your work stays private.",
  },
  {
    icon: <FaRobot />,
    title: "AI-Powered Chat",
    description:
      "Ask questions, generate code, or troubleshoot bugs using our built-in AI with /ai prompt right inside the chat.",
  },
  {
    icon: <FaRegComments />,
    title: "Live Chat Integration",
    description:
      "Chat with your teammates in real time. Discuss code, bugs, or ideas — all in the same window as your code.",
  },
  {
    icon: <FaRocket />,
    title: "Faster Project Launch",
    description:
      "No more delays! Create, build, and deploy your projects faster with integrated tools and team workflows.",
  },
];

const TypingEffect = ({ text }) => {
  return (
    <div className="space-y-2">
      {text.map((line, index) => (
        <motion.span
          key={index}
          className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-[#27374D] pr-1 block"
        >
          {line.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 + index * 1 }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </div>
  );
};

function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      {/* Home Section */}
      <section
        id="home"
        className="min-h-screen bg-[#DDE6ED] px-6 md:px-20  flex items-center justify-center"
      >
        <div className="flex flex-wrap-reverse md:flex-nowrap items-center justify-between gap-16 w-full max-w-7xl">
          {/* Text + Button Section */}
          <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#27374D]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <TypingEffect text={typingText} />
            </motion.h1>

            {/* Subheading to fill space */}
            <p className="mt-4 text-base md:text-lg text-[#27374D]/80 leading-relaxed">
              The next-gen collaborative coding platform — code with friends,
              chat live, and use <code>/ai</code> to generate, debug, or improve
              code instantly{" "}
            </p>

            <button
              onClick={() => navigate("/home")}
              className="mt-6 cursor-pointer px-6 py-4 border-2 border-[#27374D] text-[#27374D] rounded-md hover:bg-[#27374D] hover:text-white transition-all duration-300 text-sm md:text-base w-fit mx-auto md:mx-0"
            >
              Getting Started
            </button>
          </div>

          {/* Image with abstract background fill */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
            <img
              src={homeImage}
              alt="Converge AI Hero"
              className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain z-10"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-[#526D82] py-20 px-6 md:px-20">
  <div className="max-w-7xl mx-auto">
    <motion.h2
      className="text-4xl md:text-5xl font-bold text-center text-[#DDE6ED] mb-12"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      Why Choose <span className="text-blue-300">Converge AI</span>?
    </motion.h2>

    {/* Features Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          className="bg-[#DDE6ED] rounded-xl shadow-lg p-6 border-l-4 border-[#27374D] hover:shadow-xl transition-all group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-4xl text-[#27374D] mb-4 group-hover:scale-110 transition-transform">
            {feature.icon}
          </div>
          <h3 className="text-xl font-semibold text-[#27374D] mb-2">
            {feature.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {feature.description}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>


<section
  id="about"
  className="min-h-screen bg-[#27374D] py-20 px-6 md:px-20 flex items-center"
>
  <div className="max-w-6xl mx-auto w-full">
    {/* Heading */}
    <motion.h2
      className="text-4xl md:text-5xl font-bold text-[#DDE6ED] text-center mb-4"
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      About <span className="text-blue-400">Converge AI</span>
    </motion.h2>

    {/* Divider */}
    <motion.div
      className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8 rounded-full"
      initial={{ width: 0 }}
      whileInView={{ width: "6rem" }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    />

    {/* Intro Paragraph */}
    <motion.p
      className="text-lg md:text-xl text-[#DDE6ED] leading-relaxed text-justify mb-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: true }}
    >
      <span className="text-blue-300 font-semibold">Converge AI</span> is a
      powerful and collaborative real-time development workspace. Built with
      developers and innovation in mind, it merges chat, code, and AI into one
      seamless platform. Whether you're brainstorming with your team or building
      production-ready software, Converge AI empowers you with smart tools to
      code faster, collaborate better, and deliver smarter.
    </motion.p>

    {/* Key Features */}
    <motion.div
      className="grid md:grid-cols-2 gap-6 text-[#DDE6ED]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Feature 1 */}
      <div className="flex items-start gap-4">
        <FaBrain className="text-blue-400 text-3xl mt-1" />
        <p>
          Smart AI Assistant that can generate code, debug errors, and assist
          with documentation using the <code className="bg-white/20 px-1 rounded">/ai</code> prompt.
        </p>
      </div>

      {/* Feature 2 */}
      <div className="flex items-start gap-4">
        <FaLock className="text-green-400 text-3xl mt-1" />
        <p>
          End-to-end encrypted team chat, allowing secure and productive
          communication while working in real-time.
        </p>
      </div>

      {/* Feature 3 */}
      <div className="flex items-start gap-4">
        <FaCode className="text-yellow-400 text-3xl mt-1" />
        <p>
          Real-time collaborative code editor that feels just like VS Code with
          multi-user live syncing.
        </p>
      </div>

      {/* Feature 4 */}
      <div className="flex items-start gap-4">
        <FaRocket className="text-purple-400 text-3xl mt-1" />
        <p>
          Launch, manage and grow your projects with integrated tools, clean UI,
          and seamless project sharing.
        </p>
      </div>
    </motion.div>

    {/* CTA */}
    <motion.div
      className="mt-12 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7 }}
      viewport={{ once: true }}
    >
      <p className="text-[#DDE6ED] text-lg mb-4">
        From solo coding to team-driven innovation, Converge AI adapts to your
        workflow and scales with your vision.
      </p>
      <button
      onClick={()=>navigate("/home")}
       className="mt-2 px-6 py-3 border border-[#DDE6ED] text-[#DDE6ED] hover:bg-[#DDE6ED] hover:text-[#27374D] transition rounded-lg cursor-pointer">
        Get Started Today
      </button>
    </motion.div>
  </div>
</section>
      <Footer />
    </>
  );
}

export default LandingPage;
