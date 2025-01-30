import React, { useState } from 'react';
import { ChevronDown, ChevronRight, File, Folder } from 'lucide-react';
import { resumeData } from '../utils/resumeData';

const SourcesTab = () => {
  const [expandedFolders, setExpandedFolders] = useState<{ [key: string]: boolean }>({});
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  // Create file structure based on projects
  const projectFiles = resumeData.projects.reduce((acc: any, project) => {
    const sanitizedName = project.name.toLowerCase().replace(/\s+/g, '-');
    acc[sanitizedName] = {
      'src': {
        'components': {
          'App.tsx': 'React Component',
          'index.tsx': 'Entry Point'
        },
        'styles': {
          'main.css': 'Styles'
        },
        'utils': {
          'helpers.ts': 'Helper Functions'
        }
      },
      'package.json': 'Dependencies',
      'README.md': `# ${project.name}\n\n## Tech Stack\n${project.techStack.join(', ')}\n\n## Features\n${project.achievements.join('\n')}`
    };
    return acc;
  }, {});

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const renderFileTree = (tree: any, path: string = '') => {
    return Object.entries(tree).map(([key, value]: [string, any]) => {
      const currentPath = path ? `${path}/${key}` : key;
      const isFolder = typeof value === 'object';

      return (
        <div key={currentPath} className="ml-4">
          <div 
            className="flex items-center space-x-1 hover:bg-[#2c2c2c] cursor-pointer py-0.5 px-1 rounded"
            onClick={() => isFolder ? toggleFolder(currentPath) : setSelectedFile(currentPath)}
          >
            {isFolder ? (
              <>
                {expandedFolders[currentPath] ? 
                  <ChevronDown size={14} /> : 
                  <ChevronRight size={14} />
                }
                <Folder size={14} className="text-[#c09553]" />
              </>
            ) : (
              <>
                <File size={14} className="text-[#858585]" />
              </>
            )}
            <span className="text-sm">{key}</span>
          </div>
          {isFolder && expandedFolders[currentPath] && (
            <div>{renderFileTree(value, currentPath)}</div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="h-full flex text-[#858585]">
      <div className="w-64 border-r border-[#454545] p-2 overflow-y-auto">
        <div className="text-sm">
          {Object.entries(projectFiles).map(([projectName, files]) => (
            <div key={projectName}>
              <div 
                className="flex items-center space-x-1 hover:bg-[#2c2c2c] cursor-pointer p-1 rounded"
                onClick={() => toggleFolder(projectName)}
              >
                {expandedFolders[projectName] ? 
                  <ChevronDown size={14} /> : 
                  <ChevronRight size={14} />
                }
                <Folder size={14} className="text-[#c09553]" />
                <span>{projectName}</span>
              </div>
              {expandedFolders[projectName] && renderFileTree(files)}
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 p-4 bg-[#1e1e1e] overflow-y-auto">
        {selectedFile ? (
          <pre className="text-sm font-mono">
            <code>
              {projectFiles[selectedFile.split('/')[0]][selectedFile.split('/').slice(1).join('/')] || 
               'File content would be displayed here'}
            </code>
          </pre>
        ) : (
          <div className="text-sm opacity-50">Select a file to view its content</div>
        )}
      </div>
    </div>
  );
};

export default SourcesTab;
