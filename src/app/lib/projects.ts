// Temporary mock data until we have a database
const MOCK_PROJECTS = {
  '1': {
    id: '1',
    title: 'Healthcare Access Study',
    description: 'Research on healthcare accessibility in rural communities',
    createdAt: '2023-12-01',
    updatedAt: '2023-12-15',
  },
  '2': {
    id: '2',
    title: 'Education Technology Impact',
    description: 'Analysis of EdTech adoption in primary schools',
    createdAt: '2023-12-05',
    updatedAt: '2023-12-10',
  },
};

export interface Project {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export async function getProject(id: string): Promise<Project | null> {
  // This will be replaced with a database call in production
  return MOCK_PROJECTS[id as keyof typeof MOCK_PROJECTS] || null;
}
