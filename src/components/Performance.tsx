import React from "react";

const PerformanceTab = () => {
  const skills = [
    { name: "React", proficiency: 90 },
    { name: "JavaScript", proficiency: 85 },
    { name: "TypeScript", proficiency: 80 },
    { name: "Node.js", proficiency: 75 },
    { name: "Next.js", proficiency: 85 },
    { name: "CSS/Tailwind", proficiency: 88 },
    { name: "Git/GitHub", proficiency: 85 },
    { name: "REST APIs", proficiency: 82 }
  ];

  const statistics = [
    { label: "Completed Projects", value: "25+" },
    { label: "Client Satisfaction", value: "95%" },
    { label: "Years Experience", value: "3+" },
    { label: "GitHub Contributions", value: "500+" }
  ];

  return (
    <div className="p-4 text-[#858585]">
      <div className="mb-8">
        <h2 className="text-[#fff] text-lg mb-4">Statistics</h2>
        <div className="grid grid-cols-2 gap-4">
          {statistics.map((stat) => (
            <div key={stat.label} className="bg-[#2a2a2a] p-4 rounded-lg">
              <div className="text-[#45a1ff] text-2xl font-bold">{stat.value}</div>
              <div className="text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-[#fff] text-lg mb-4">Technical Skills</h2>
        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.name} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{skill.name}</span>
                <span>{skill.proficiency}%</span>
              </div>
              <div className="w-full bg-[#3c3c3c] h-2 rounded">
                <div
                  className="bg-[#45a1ff] h-full rounded"
                  style={{ width: `${skill.proficiency}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceTab;
