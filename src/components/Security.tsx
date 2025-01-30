import React from "react";

const SecurityTab = () => {
  const certifications = [
    {
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: "2023",
      status: "Active"
    },
    // Add more certifications
  ];

  return (
    <div className="p-4 text-[#858585]">
      <h2 className="text-[#fff] text-lg mb-4">Certifications & Credentials</h2>
      <div className="space-y-4">
        {certifications.map((cert) => (
          <div key={cert.name} className="border border-[#454545] p-3 rounded">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              <h3 className="text-[#45a1ff]">{cert.name}</h3>
            </div>
            <div className="ml-4 mt-2 text-sm">
              <p>Issuer: {cert.issuer}</p>
              <p>Date: {cert.date}</p>
              <p>Status: {cert.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityTab;
