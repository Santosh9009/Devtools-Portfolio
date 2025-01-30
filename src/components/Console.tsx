import React, { useState, useRef, useEffect } from "react";

interface ConsoleLog {
  type: 'command' | 'output' | 'error' | 'system';
  content: string;
}

interface Command {
  name: string;
  description: string;
  usage: string;
  subcommands?: string[];
}

const ConsoleTab = () => {
  const [logs, setLogs] = useState<ConsoleLog[]>([]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  const availableCommands: Command[] = [
    { 
      name: 'fetch', 
      description: 'Fetch data from different categories', 
      usage: 'fetch <profile|skills|contact>',
      subcommands: ['profile', 'skills', 'contact']
    },
    { 
      name: 'clear', 
      description: 'Clear the terminal screen', 
      usage: 'clear'
    },
    { 
      name: 'help', 
      description: 'Show available commands', 
      usage: 'help [command]'
    },
    { 
      name: 'about', 
      description: 'Display information about this terminal', 
      usage: 'about'
    }
  ];

  // Mock data for commands
  const mockData: any = {
    profile: {
      name: "Santosh Pati",
      role: "Full Stack Developer",
      location: "Odisha, India",
    },
    skills: ["JavaScript", "React", "Next.js", "Node.js", "MongoDB"],
    contact: {
      email: "patisantosh00@gmail.com",
      phone: "+91-6371195118",
    },
  };

  // Show initial welcome message
  useEffect(() => {
    setLogs([
      { 
        type: 'system', 
        content: `Welcome to Interactive Terminal v1.0.0
Type 'help' to see available commands.
Use ↑↓ to navigate history, and Tab to autocomplete.
`
      }
    ]);
  }, []);

  // Focus input on mount and any click
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const generateSuggestions = (inputValue: string): string[] => {
    const args = inputValue.trim().split(' ');
    const mainCommand = args[0].toLowerCase();
    
    // If we're typing a subcommand
    if (args.length > 1) {
      const command = availableCommands.find(cmd => cmd.name === mainCommand);
      if (command?.subcommands) {
        return command.subcommands
          .filter(sub => sub.startsWith(args[1].toLowerCase()))
          .map(sub => `${mainCommand} ${sub}`);
      }
      return [];
    }

    // If we're typing the main command
    return availableCommands
      .map(cmd => cmd.name)
      .filter(cmd => cmd.startsWith(mainCommand));
  };

  const updateSuggestions = (value: string) => {
    if (!value) {
      setSuggestions([]);
      return;
    }

    const newSuggestions = generateSuggestions(value);
    setSuggestions(newSuggestions);
    setSelectedSuggestion(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const command = input.trim();
      if (command) {
        handleCommand(command);
        setCommandHistory(prev => [...prev, command]);
        setHistoryIndex(-1);
        setInput("");
        setSuggestions([]);
        if (inputRef.current) {
          inputRef.current.textContent = "";
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        const suggestion = suggestions[selectedSuggestion === -1 ? 0 : selectedSuggestion];
        setInput(suggestion);
        if (inputRef.current) {
          inputRef.current.textContent = suggestion;
        }
        setSuggestions([]);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSelectedSuggestion(prev => 
          prev <= 0 ? suggestions.length - 1 : prev - 1
        );
      } else if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        const command = commandHistory[commandHistory.length - 1 - newIndex];
        setInput(command);
        if (inputRef.current) {
          inputRef.current.textContent = command;
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSelectedSuggestion(prev => 
          prev >= suggestions.length - 1 ? -1 : prev + 1
        );
      } else if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        const command = commandHistory[commandHistory.length - 1 - newIndex];
        setInput(command);
        if (inputRef.current) {
          inputRef.current.textContent = command;
        }
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
        if (inputRef.current) {
          inputRef.current.textContent = "";
        }
      }
    }
  };

  const handleCommand = (command: string) => {
    const args = command.split(' ');
    const mainCommand = args[0].toLowerCase();

    if (mainCommand === 'fetch') {
      const key = args[1];
      if (mockData[key]) {
        setLogs((prevLogs) => [
          ...prevLogs,
          { type: 'command', content: `> ${command}` },
          { type: 'output', content: JSON.stringify(mockData[key], null, 2) },
        ]);
      } else {
        setLogs((prevLogs) => [
          ...prevLogs,
          { type: 'command', content: `> ${command}` },
          { type: 'error', content: `Error: ${key} not found!` },
        ]);
      }
    } else if (command === "clear") {
      setLogs([]);
    } else if (command === "about") {
      setLogs((prevLogs) => [
        ...prevLogs,
        { type: 'command', content: `> ${command}` },
        { type: 'output', content: "Interactive Terminal v1.0.0\nA React-based terminal interface with command history and auto-suggestions." },
      ]);
    } else if (mainCommand === "help") {
      const specificCommand = args[1];
      if (specificCommand) {
        const cmdHelp = availableCommands.find(cmd => cmd.name === specificCommand);
        if (cmdHelp) {
          setLogs((prevLogs) => [
            ...prevLogs,
            { type: 'command', content: `> ${command}` },
            { type: 'output', content: `${cmdHelp.name} - ${cmdHelp.description}\nUsage: ${cmdHelp.usage}` },
          ]);
        } else {
          setLogs((prevLogs) => [
            ...prevLogs,
            { type: 'command', content: `> ${command}` },
            { type: 'error', content: `Command '${specificCommand}' not found.` },
          ]);
        }
      } else {
        setLogs((prevLogs) => [
          ...prevLogs,
          { type: 'command', content: `> ${command}` },
          { type: 'output', content: `Available commands:\n\n${availableCommands.map(cmd => 
            `${cmd.name.padEnd(10)} - ${cmd.description}\n   Usage: ${cmd.usage}`
          ).join('\n\n')}` },
        ]);
      }
    } else {
      setLogs((prevLogs) => [
        ...prevLogs,
        { type: 'command', content: `> ${command}` },
        { type: 'error', content: `Unknown command: ${command}\nType 'help' to see available commands.` },
      ]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    const newInput = e.target.innerText;
    setInput(newInput);
    updateSuggestions(newInput);
  };

  // Auto-scroll to bottom when logs change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div 
      className="h-full flex flex-col bg-[#1e1e1e] text-white font-mono cursor-text overflow-hidden relative"
      onClick={() => inputRef.current?.focus()}
    >
      <div 
        ref={containerRef}
        className="flex-1 overflow-auto p-4 min-h-0"
      >
        {logs.map((log, index) => (
          <div key={index} className="py-1">
            {log.type === 'command' && (
              <div className="text-[#8abeb7]">{log.content}</div>
            )}
            {log.type === 'output' && (
              <div className="text-[#a8ff60] whitespace-pre-wrap">{log.content}</div>
            )}
            {log.type === 'error' && (
              <div className="text-[#f44747]">{log.content}</div>
            )}
            {log.type === 'system' && (
              <div className="text-[#569cd6] whitespace-pre-wrap">{log.content}</div>
            )}
          </div>
        ))}
        <div className="flex items-center">
          <span className="text-[#8abeb7] mr-2">❯</span>
          <div
            ref={inputRef}
            contentEditable
            suppressContentEditableWarning
            onInput={handleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white focus:outline-none min-h-[1.5em]"
          />
        </div>
      </div>
      
      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute bottom-full left-6 mb-2 bg-[#2d2d2d] border border-[#454545] rounded shadow-lg max-h-48 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion}
              className={`px-4 py-2 hover:bg-[#454545] cursor-pointer ${
                index === selectedSuggestion ? 'bg-[#454545]' : ''
              }`}
              onClick={() => {
                setInput(suggestion);
                setSuggestions([]);
                if (inputRef.current) {
                  inputRef.current.textContent = suggestion;
                  inputRef.current.focus();
                }
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConsoleTab;