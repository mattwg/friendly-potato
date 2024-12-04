'use client';

import { useState } from 'react';
import { use } from 'react';

interface Transcript {
  id: string;
  name: string;
  size: number;
}

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const projectId = resolvedParams.id;
  
  const [projectTitle, setProjectTitle] = useState('Project Title');
  const [objectives, setObjectives] = useState('');
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newTranscripts: Transcript[] = Array.from(files).map((file, index) => ({
      id: (transcripts.length + index + 1).toString(),
      name: file.name,
      size: file.size
    }));

    setTranscripts([...transcripts, ...newTranscripts]);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Project Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Project Settings</h1>
          <input
            type="text"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            className="text-xl bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 outline-none"
            placeholder="Enter project title"
          />
        </div>

        {/* Research Objectives */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Research Objectives</h2>
          <textarea
            value={objectives}
            onChange={(e) => setObjectives(e.target.value)}
            className="w-full h-32 p-4 border rounded-lg resize-none"
            placeholder="Enter your research objectives here..."
          />
        </div>

        {/* Transcript Upload */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Transcripts</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              onChange={handleFileUpload}
              multiple
              accept=".txt"
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Upload Transcripts
            </label>
            <p className="mt-2 text-sm text-gray-500">Only .txt files up to 5MB are supported</p>
          </div>

          {/* Transcript List */}
          <div className="space-y-2">
            {transcripts.map((transcript) => (
              <div
                key={transcript.id}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
              >
                <span>{transcript.name}</span>
                <span className="text-sm text-gray-500">
                  {(transcript.size / 1024).toFixed(1)} KB
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
