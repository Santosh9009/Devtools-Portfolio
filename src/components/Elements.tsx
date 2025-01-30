import React, { useState } from "react";
import { resumeData } from "../utils/resumeData";

const ElementsTab = () => {
  const [isOpen, setIsOpen] = useState({
    personalInfo: true,
    skills: false,
    workExperience: false,
    projects: false,
    education: false,
  });

  const toggleSection = (section: string) => {
    setIsOpen((prev:any) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="elements-tab h-full flex">
      {/* Elements Tree */}
      <div className="w-1/2 p-4 border-r border-[#454545] overflow-y-auto">
        <ul className="pl-4">
          <li className="my-1">
            <span className="text-[#5db0d7]">{"<html>"}</span>
            <ul className="pl-4">
              <li className="my-1">
                <span className="text-[#5db0d7]">{"<body>"}</span>
                <ul className="pl-4">
                  {/* Personal Info Section */}
                  <li>
                    <button
                      onClick={() => toggleSection("personalInfo")}
                      className="flex items-center space-x-1 text-sm hover:bg-[#2c2c2c] w-full px-1"
                    >
                      <span className="text-[#797979]">{isOpen.personalInfo ? "▼" : "▶"}</span>
                      <span className="text-[#5db0d7]">{"<PersonalInfo"}</span>
                      <span className="text-[#9cdcfe]">{" class="}</span>
                      <span className="text-[#ce9178]">{"dev-profile"}</span>
                      <span className="text-[#5db0d7]">{">"}</span>
                    </button>
                    {isOpen.personalInfo && (
                      <ul className="pl-8">
                        <li className="text-sm">
                          <span className="text-[#9cdcfe]">Email</span>:{" "}
                          <span className="text-[#ce9178]">"{resumeData.contact.email}"</span>
                        </li>
                        <li className="text-sm">
                          <span className="text-[#9cdcfe]">Phone</span>:{" "}
                          <span className="text-[#ce9178]">"{resumeData.contact.mobile}"</span>
                        </li>
                        <li className="text-sm">
                          <span className="text-[#9cdcfe]">Location</span>:{" "}
                          <span className="text-[#ce9178]">"{resumeData.contact.location}"</span>
                        </li>
                      </ul>
                    )}
                  </li>

                  {/* Skills Section */}
                  <li>
                    <button
                      onClick={() => toggleSection("skills")}
                      className="flex items-center space-x-1 text-sm hover:bg-[#2c2c2c] w-full px-1"
                    >
                      <span className="text-[#797979]">{isOpen.skills ? "▼" : "▶"}</span>
                      <span className="text-[#5db0d7]">{"<Skills>"}</span>
                    </button>
                    {isOpen.skills && (
                      <ul className="pl-8">
                        {Object.entries(resumeData.skills).map(([category, skills]) => (
                          <li key={category} className="text-sm">
                            <span className="text-[#9cdcfe]">{category}</span>:{" "}
                            <span className="text-[#ce9178]">["{skills.join('", "')}"]</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>

                  {/* Work Experience Section */}
                  <li>
                    <button
                      onClick={() => toggleSection("workExperience")}
                      className="flex items-center space-x-1 text-sm hover:bg-[#2c2c2c] w-full px-1"
                    >
                      <span className="text-[#797979]">{isOpen.workExperience ? "▼" : "▶"}</span>
                      <span className="text-[#5db0d7]">{"<WorkExperience>"}</span>
                    </button>
                    {isOpen.workExperience && (
                      <ul className="pl-8">
                        {resumeData.workExperience.map((exp, index) => (
                          <li key={index} className="text-sm mb-2">
                            <span className="text-[#9cdcfe]">company</span>:{" "}
                            <span className="text-[#ce9178]">"{exp.company}"</span>,
                            <br />
                            <span className="text-[#9cdcfe]">role</span>:{" "}
                            <span className="text-[#ce9178]">"{exp.role}"</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>

                  {/* Projects Section */}
                  <li>
                    <button
                      onClick={() => toggleSection("projects")}
                      className="flex items-center space-x-1 text-sm hover:bg-[#2c2c2c] w-full px-1"
                    >
                      <span className="text-[#797979]">{isOpen.projects ? "▼" : "▶"}</span>
                      <span className="text-[#5db0d7]">{"<Projects>"}</span>
                    </button>
                    {isOpen.projects && (
                      <ul className="pl-8">
                        {resumeData.projects.map((project, index) => (
                          <li key={index} className="text-sm mb-2">
                            <span className="text-[#9cdcfe]">name</span>:{" "}
                            <span className="text-[#ce9178]">"{project.name}"</span>,
                            <br />
                            <span className="text-[#9cdcfe]">link</span>:{" "}
                            <a 
                              href={`https://${project.link}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-[#ce9178] hover:text-[#daa] hover:underline"
                            >
                              "{project.link}"
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>

                  {/* Education Section */}
                  <li>
                    <button
                      onClick={() => toggleSection("education")}
                      className="flex items-center space-x-1 text-sm hover:bg-[#2c2c2c] w-full px-1"
                    >
                      <span className="text-[#797979]">{isOpen.education ? "▼" : "▶"}</span>
                      <span className="text-[#5db0d7]">{"<Education>"}</span>
                    </button>
                    {isOpen.education && (
                      <ul className="pl-8">
                        <li className="text-sm">
                          <span className="text-[#9cdcfe]">institution</span>:{" "}
                          <span className="text-[#ce9178]">"{resumeData.education.institution}"</span>
                        </li>
                        <li className="text-sm">
                          <span className="text-[#9cdcfe]">degree</span>:{" "}
                          <span className="text-[#ce9178]">"{resumeData.education.degree}"</span>
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      
      {/* Styles Panel */}
      <div className="w-1/2 bg-[#202124] p-4">
        <div className="text-sm text-[#858585]">Styles</div>
        <div className="mt-2 p-2 bg-[#2c2c2c] rounded">
          <div className="text-[#9cdcfe]">.dev-profile {" {"}</div>
          <div className="pl-4">
            <span className="text-[#9cdcfe]">background</span>
            <span className="text-white">: </span>
            <span className="text-[#ce9178]">#202124</span>;
          </div>
          <div className="text-[#9cdcfe]">{"}"}</div>
        </div>
      </div>
    </div>
  );
};

export default ElementsTab;
