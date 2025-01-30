"use client"
import React, { useState } from "react";
import ElementsTab from "./Elements";
import ConsoleTab from "./Console";
import NetworkTab from "./Network";
import { ModeToggle } from "./themeSwitcher";
import SourcesTab from "./Sources";
import PerformanceTab from "./Performance";
import ApplicationTab from "./Application";
import SecurityTab from "./Security";

const DevToolsPortfolio = () => {
  const [activeTab, setActiveTab] = useState("Elements");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "Elements":
        return <ElementsTab />;
      case "Console":
        return <ConsoleTab />;
      case "Network":
        return <NetworkTab />;
      case "Sources":
        return <SourcesTab />;
      case "Performance":
        return <PerformanceTab />;
      case "Application":
        return <ApplicationTab />;
      case "Security":
        return <SecurityTab />;
      default:
        return <ElementsTab />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#202124]">
      {/* Top Bar */}
      <div className="bg-[#2c2c2c] px-2 py-1 flex items-center border-b border-[#454545]">
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
          <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
        </div>
        <span className="text-[#858585] text-sm">Developer Tools - Portfolio</span>
      </div>

      {/* Tabs Header */}
      <div className="tabs flex bg-[#2c2c2c] text-[#858585] text-sm">
        {[
          "Elements",
          "Console",
          "Sources",
          "Network",
          "Performance",
          "Application",
          "Security"
        ].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 hover:bg-[#3c3c3c] ${
              activeTab === tab 
              ? "text-[#fff] bg-[#202124] border-t-2 border-[#45a1ff]" 
              : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto">
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default DevToolsPortfolio;
