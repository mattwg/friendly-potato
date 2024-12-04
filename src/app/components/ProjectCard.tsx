import Link from 'next/link';

interface ProjectCardProps {
  id: string;
  title: string;
  transcriptCount: number;
  lastModified: string;
}

export default function ProjectCard({ id, title, transcriptCount, lastModified }: ProjectCardProps) {
  return (
    <Link href={`/project/${id}`}>
      <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow cursor-pointer bg-white">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <div className="text-sm text-gray-600">
          <p>{transcriptCount} transcripts</p>
          <p>Last modified: {lastModified}</p>
        </div>
      </div>
    </Link>
  );
}
