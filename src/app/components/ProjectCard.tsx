import Link from 'next/link';

interface ProjectCardProps {
  id: string;
  title: string;
  transcriptCount: number;
  lastModified: string;
}

export default function ProjectCard({ id, title, transcriptCount, lastModified }: ProjectCardProps) {
  return (
    <Link href={`/project/${id}`} className="block">
      <div className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <div className="space-y-1">
          <p className="text-sm text-gray-600">{transcriptCount} transcripts</p>
          <p className="text-sm text-gray-500">Last modified: {lastModified}</p>
        </div>
      </div>
    </Link>
  );
}
