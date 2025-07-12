import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#27374D] text-[#DDE6ED] py-8 px-6 md:px-20 border-t border-[#DDE6ED]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left: Developer Info */}
        <div className="text-center md:text-left text-sm">
          <p>© {new Date().getFullYear()} Developed and maintained by <span className="font-semibold">Adnan Qureshi</span></p>
        </div>

        {/* Right: Social Links */}
        <div className="flex space-x-6 text-lg">
          <a
            href="mailto:aadiqureshi89@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#9DB2BF] transition"
            title="Email"
          >
            <FaEnvelope />
          </a>
          <a
            href="tel:+918965939588"
            className="hover:text-[#9DB2BF] transition"
            title="Contact"
          >
            <FaPhone />
          </a>
          <a
            href="https://www.linkedin.com/in/adnan-qureshi-aa1517246"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#9DB2BF] transition"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/juniorcoder02/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#9DB2BF] transition"
            title="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.instagram.com/aadii__here"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#9DB2BF] transition"
            title="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://twitter.com/1nadanparinda"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#9DB2BF] transition"
            title="Twitter"
          >
            <FaTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
