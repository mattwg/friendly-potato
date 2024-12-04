'use client';

import { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

interface ProjectPageProps {
  params: { id: string };
}

const EXAMPLE_MARKDOWN = `
## Research Example

This is an example of how to structure your research objectives:

### Key Questions
1. What are the primary factors affecting...?
2. How do participants respond to...?
3. What patterns emerge from...?

### Methods
- Semi-structured interviews
- Thematic analysis
- Participant observation

### Expected Outcomes
- Understanding of key themes
- Identification of patterns
- Recommendations for future research
`;

export default function ProjectPage({ params }: ProjectPageProps) {
  const projectId = params.id;
  const [projectTitle, setProjectTitle] = useState('Project Title');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [transcripts, setTranscripts] = useState<File[]>([]);
  const [objectives, setObjectives] = useState('');
  const [showExample, setShowExample] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditingTitle(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setTranscripts(prev => [...prev, ...files]);
  };

  const handleRemoveFile = (index: number) => {
    setTranscripts(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    setTranscripts(prev => [...prev, ...files]);
  };

  return (
    <div className="py-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-8">
              {/* Project Title */}
              <div>
                {isEditingTitle ? (
                  <input
                    type="text"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    onBlur={handleTitleBlur}
                    onKeyDown={handleTitleKeyDown}
                    className="text-2xl font-semibold text-gray-900 w-full border-b-2 border-blue-500 focus:outline-none"
                    autoFocus
                  />
                ) : (
                  <h2 
                    onClick={handleTitleClick}
                    className="text-2xl font-semibold text-gray-900 cursor-pointer hover:text-gray-700"
                  >
                    {projectTitle}
                  </h2>
                )}
              </div>

              {/* Research Objectives */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Research Objectives
                  </label>
                  <button
                    onClick={() => setShowExample(!showExample)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {showExample ? 'Hide Example' : 'Show Example'}
                  </button>
                </div>
                {showExample && (
                  <div className="mb-4 p-4 bg-gray-50 rounded-md">
                    <ReactMarkdown className="prose prose-sm max-w-none">
                      {EXAMPLE_MARKDOWN}
                    </ReactMarkdown>
                  </div>
                )}
                <textarea
                  value={objectives}
                  onChange={(e) => setObjectives(e.target.value)}
                  placeholder="Enter your research objectives..."
                  rows={4}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              {/* Upload Transcripts */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Transcripts
                </label>
                <div 
                  className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="space-y-2 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                      >
                        <span>Upload files</span>
                        <input
                          id="file-upload"
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept=".txt"
                          className="sr-only"
                          onChange={handleFileUpload}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">TXT files up to 5MB each</p>
                  </div>
                </div>

                {/* File List */}
                {transcripts.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {transcripts.map((file, index) => (
                      <li key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-md">
                        <span className="text-sm text-gray-600">{file.name}</span>
                        <button
                          onClick={() => handleRemoveFile(index)}
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
