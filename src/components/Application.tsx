import React from "react";

const ApplicationTab = () => {
  return (
    <div className="p-4 text-[#858585]">
      <div className="space-y-6">
        <section>
          <h2 className="text-[#fff] text-lg mb-3">Work Experience</h2>
          <div className="space-y-4">
            <div className="border border-[#454545] p-3 rounded">
              <h3 className="text-[#45a1ff]">Senior Software Engineer</h3>
              <p className="text-sm">Tech Company Inc. • 2020 - Present</p>
              <ul className="list-disc ml-4 mt-2 text-sm">
                <li>Led development of microservices architecture serving 1M+ users</li>
                <li>Optimized application performance by 40% through code refactoring</li>
                <li>Mentored junior developers and conducted code reviews</li>
              </ul>
            </div>
            <div className="border border-[#454545] p-3 rounded">
              <h3 className="text-[#45a1ff]">Software Developer</h3>
              <p className="text-sm">Software Solutions Ltd. • 2018 - 2020</p>
              <ul className="list-disc ml-4 mt-2 text-sm">
                <li>Developed and maintained multiple web applications using React</li>
                <li>Implemented CI/CD pipelines reducing deployment time by 60%</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-[#fff] text-lg mb-3">Skills</h2>
          <div className="border border-[#454545] p-3 rounded">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-[#45a1ff] mb-2">Languages</h3>
                <p className="text-sm">JavaScript, TypeScript, Python, Java</p>
              </div>
              <div>
                <h3 className="text-[#45a1ff] mb-2">Frameworks</h3>
                <p className="text-sm">React, Node.js, Express, Next.js</p>
              </div>
              <div>
                <h3 className="text-[#45a1ff] mb-2">Tools</h3>
                <p className="text-sm">Git, Docker, AWS, Jenkins</p>
              </div>
              <div>
                <h3 className="text-[#45a1ff] mb-2">Soft Skills</h3>
                <p className="text-sm">Leadership, Problem Solving, Communication</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-[#fff] text-lg mb-3">Education</h2>
          <div className="space-y-4">
            <div className="border border-[#454545] p-3 rounded">
              <h3 className="text-[#45a1ff]">Master's in Software Engineering</h3>
              <p className="text-sm">Tech University • 2020 - 2022</p>
              <p className="text-sm mt-2">GPA: 3.8/4.0</p>
            </div>
            <div className="border border-[#454545] p-3 rounded">
              <h3 className="text-[#45a1ff]">Bachelor's in Computer Science</h3>
              <p className="text-sm">University Name • 2016 - 2020</p>
              <p className="text-sm mt-2">Dean's List, Computer Science Club President</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-[#fff] text-lg mb-3">Certifications</h2>
          <div className="space-y-4">
            <div className="border border-[#454545] p-3 rounded">
              <h3 className="text-[#45a1ff]">AWS Certified Solutions Architect</h3>
              <p className="text-sm">Amazon Web Services • 2023</p>
            </div>
            <div className="border border-[#454545] p-3 rounded">
              <h3 className="text-[#45a1ff]">Professional Scrum Master I</h3>
              <p className="text-sm">Scrum.org • 2022</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ApplicationTab;
