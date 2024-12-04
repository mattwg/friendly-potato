'use client';

import { useState } from 'react';
import ProjectCard from './components/ProjectCard';

export default function Home() {
  const [projects, setProjects] = useState([
    {
      id: '1',
      title: 'Healthcare Access Study',
      transcriptCount: 3,
      lastModified: '2024-01-04'
    },
    {
      id: '2',
      title: 'Education Impact Research',
      transcriptCount: 5,
      lastModified: '2024-01-03'
    }
  ]);

  const handleCreateProject = () => {
    const newProject = {
      id: (projects.length + 1).toString(),
      title: 'New Research Project',
      transcriptCount: 0,
      lastModified: new Date().toISOString().split('T')[0]
    };
    setProjects([...projects, newProject]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Research Projects
          </h1>
          <button
            onClick={handleCreateProject}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Project
          </button>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              transcriptCount={project.transcriptCount}
              lastModified={project.lastModified}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
