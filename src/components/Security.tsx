import React, { useState, useEffect } from "react";
import { resumeData } from "../utils/resumeData";
import { Shield, ShieldCheck, ShieldAlert, Lock, Key, AlertTriangle } from "lucide-react";

const SecurityTab = () => {
  const [securityScore, setSecurityScore] = useState(0);
  
  // Calculate security score based on portfolio data
  useEffect(() => {
    const calculateScore = () => {
      let score = 0;
      // Tech stack security points
      if (resumeData.skills.devops.includes("Docker")) score += 15;
      if (resumeData.skills.devops.includes("AWS")) score += 20;
      if (resumeData.skills.databases.includes("PostgreSQL")) score += 15;
      
      // Project security points
      resumeData.projects.forEach(project => {
        if (project.techStack.includes("Cloudflare")) score += 10;
        if (project.achievements.some(a => 
          a.toLowerCase().includes("security") || 
          a.toLowerCase().includes("authentication")
        )) score += 10;
      });

      setSecurityScore(Math.min(score, 100));
    };

    calculateScore();
  }, []);

  const securityAudit = [
    {
      category: "Authentication",
      status: "Implemented",
      details: "User authentication in Threads Clone project",
      icon: <ShieldCheck className="h-5 w-5 text-green-500" />,
      severity: "low"
    },
    {
      category: "Cloud Security",
      status: "Active",
      details: "AWS and Cloudflare implementation",
      icon: <Shield className="h-5 w-5 text-blue-500" />,
      severity: "info"
    },
    {
      category: "Database Security",
      status: "Protected",
      details: "PostgreSQL with proper data management",
      icon: <Lock className="h-5 w-5 text-yellow-500" />,
      severity: "medium"
    }
  ];

  const deploymentSecurityChecks = [
    {
      name: "Docker Containerization",
      status: "Passed",
      description: "Isolated environment for applications",
    },
    {
      name: "Cloud Infrastructure",
      status: "Monitored",
      description: "AWS security best practices implemented",
    },
    {
      name: "API Security",
      status: "Active",
      description: "Protected endpoints with authentication",
    }
  ];

  return (
    <div className="p-4 text-[#858585] space-y-6">
      {/* Security Score */}
      <section>
        <h2 className="text-[#fff] text-lg mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Security Score
        </h2>
        <div className="border border-[#454545] p-4 rounded">
          <div className="flex items-center justify-between mb-2">
            <span>Portfolio Security Rating</span>
            <span className={`font-bold ${
              securityScore > 70 ? 'text-green-500' : 
              securityScore > 40 ? 'text-yellow-500' : 
              'text-red-500'
            }`}>{securityScore}%</span>
          </div>
          <div className="w-full bg-[#3c3c3c] h-2 rounded">
            <div 
              className={`h-full rounded transition-all duration-1000 ${
                securityScore > 70 ? 'bg-green-500' : 
                securityScore > 40 ? 'bg-yellow-500' : 
                'bg-red-500'
              }`}
              style={{ width: `${securityScore}%` }}
            />
          </div>
        </div>
      </section>

      {/* Security Audit */}
      <section>
        <h2 className="text-[#fff] text-lg mb-4 flex items-center gap-2">
          <ShieldAlert className="h-5 w-5" />
          Security Audit
        </h2>
        <div className="space-y-3">
          {securityAudit.map((item, index) => (
            <div key={index} className="border border-[#454545] p-3 rounded flex items-start gap-3">
              {item.icon}
              <div>
                <h3 className="text-[#45a1ff] flex items-center gap-2">
                  {item.category}
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    item.severity === 'low' ? 'bg-green-500/20 text-green-500' :
                    item.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-500' :
                    'bg-blue-500/20 text-blue-500'
                  }`}>
                    {item.severity}
                  </span>
                </h3>
                <p className="text-sm mt-1">{item.details}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Deployment Security */}
      <section>
        <h2 className="text-[#fff] text-lg mb-4 flex items-center gap-2">
          <Key className="h-5 w-5" />
          Deployment Security
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {deploymentSecurityChecks.map((check, index) => (
            <div key={index} className="border border-[#454545] p-3 rounded">
              <div className="flex items-center justify-between">
                <h3 className="text-[#45a1ff]">{check.name}</h3>
                <span className="text-green-500 text-sm">{check.status}</span>
              </div>
              <p className="text-sm mt-2">{check.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SecurityTab;
