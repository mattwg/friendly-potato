'use client';

import { useState } from 'react';
import ProjectCard from './components/ProjectCard';

export default function Home() {
  const [projects, setProjects] = useState([
    { id: '1', title: 'Example Project', transcriptCount: 0, lastModified: new Date().toLocaleDateString() }
  ]);

  const createNewProject = () => {
    const newProject = {
      id: (projects.length + 1).toString(),
      title: `New Project ${projects.length + 1}`,
      transcriptCount: 0,
      lastModified: new Date().toLocaleDateString()
    };
    setProjects([...projects, newProject]);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Transcript Analysis Projects</h1>
          <button
            onClick={createNewProject}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Create New Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
}
