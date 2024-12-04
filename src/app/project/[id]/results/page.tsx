'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import ReactMarkdown from 'react-markdown';
import TabView from '../../../components/TabView';
import { getProject, type Project } from '../../../lib/projects';

interface AnalysisResult {
  id: string;
  analyzerName: string;
  timestamp: string;
  markdownContent?: string;
  imageUrl?: string;
}

const SAMPLE_ANALYSES = {
  'Thematic Analysis': `# Interview Thematic Analysis

## Major Themes Identified

### 1. Healthcare Access Barriers
- **Frequency**: 15 mentions across 3 interviews
- **Context**: Discussed in relation to rural communities
- **Key Quotes**:
  > "The nearest specialist is over two hours away, which makes regular check-ups impossible for many elderly residents"
  > "Transportation is a huge issue - not everyone can drive that far or afford the fuel costs"

### 2. Telehealth Adoption
- **Frequency**: 23 mentions across all interviews
- **Context**: Mixed experiences with technology
- **Key Quotes**:
  > "Video consultations have been a game-changer for our regular patients"
  > "Some older patients struggle with the technology, but their families often help"

### 3. Community Support Networks
- **Frequency**: 18 mentions
- **Context**: Informal healthcare support systems
- **Key Quotes**:
  > "Neighbors check on each other, especially during bad weather"
  > "The local church group organizes transport to medical appointments"

## Theme Relationships
- Healthcare Access ← strongly linked to → Telehealth Adoption
- Community Support ← moderately linked to → Healthcare Access
- Telehealth Adoption ← weakly linked to → Community Support

## Recommendations
1. Explore hybrid telehealth-community support models
2. Investigate transportation assistance programs
3. Consider technology training initiatives for older residents`,

  'Sentiment Analysis': `# Interview Sentiment Analysis

## Overall Emotional Tone

\`\`\`
Positive:    ████████████ 30%  (Hope about new solutions)
Neutral:     ████████████████ 40%  (Factual discussions)
Negative:    ████████████ 30%  (Frustration with barriers)
\`\`\`

## Key Sentiment Patterns

### Positive Associations
1. **Telehealth Solutions**
   - 85% positive when discussing successful cases
   - Words: "helpful", "convenient", "lifesaver"

2. **Community Support**
   - 90% positive mentions
   - Words: "supportive", "caring", "together"

### Negative Associations
1. **Transportation Issues**
   - 75% negative sentiment
   - Words: "difficult", "challenging", "impossible"

2. **Technology Barriers**
   - 60% negative sentiment
   - Words: "confusing", "frustrating", "complicated"

## Temporal Sentiment Flow
- Interviews typically start neutral → negative (discussing problems) → positive (discussing solutions)
- Strongest positive sentiment when discussing community initiatives
- Most negative when discussing geographic isolation`,

  'Key Concepts Extraction': `# Key Healthcare Concepts Analysis

## Primary Concepts Map

### 1. Rural Healthcare Infrastructure
- **Mentions**: 32
- **Related Terms**:
  * Distance to facilities
  * Emergency services
  * Specialist availability
  * Transport infrastructure

### 2. Digital Health Solutions
- **Mentions**: 28
- **Related Terms**:
  * Video consultations
  * Remote monitoring
  * Digital prescriptions
  * Internet connectivity

### 3. Social Determinants
- **Mentions**: 25
- **Related Terms**:
  * Economic factors
  * Transportation access
  * Family support
  * Community resources

## Concept Network
\`\`\`
Rural Healthcare ─────── Digital Health
       │                      │
       │                      │
       └──── Social ─────────┘
     Determinants
\`\`\`

## Emerging Trends
1. Increasing integration of digital and traditional care
2. Growing importance of community-based solutions
3. Rising focus on preventive care strategies`,

  'Pattern Recognition': `# Communication Pattern Analysis

## Interview Dynamics

### 1. Response Patterns
\`\`\`
Detailed responses:  ████████████ 45%
Brief responses:     ████████ 30%
Stories/anecdotes:   ██████ 25%
\`\`\`

### 2. Topic Transitions
- Natural flow between healthcare access → technology → community support
- Average topic duration: 8.5 minutes
- Most detailed responses: Community support initiatives
- Most brief responses: Technical difficulties

## Language Usage Analysis

### 1. Technical Terms
- Medical terminology: 15% of discussion
- Technology terms: 12% of discussion
- Administrative terms: 8% of discussion

### 2. Narrative Elements
- Personal stories: 35% of content
- Observed experiences: 45% of content
- Hypothetical scenarios: 20% of content

## Key Patterns
1. Participants more engaged when discussing:
   - Community initiatives
   - Successful telehealth experiences
   - Local support systems

2. Less engagement during:
   - Technical infrastructure discussions
   - Administrative processes
   - Policy details`
};

export default function ResultsPage({ params }: { params: { id: string } }) {
  const projectId = params.id;
  
  const [results, setResults] = useState<AnalysisResult[]>([
    {
      id: '1',
      analyzerName: 'Thematic Analysis',
      timestamp: '12/4/2023, 2:30 PM',
      markdownContent: SAMPLE_ANALYSES['Thematic Analysis']
    },
    {
      id: '2',
      analyzerName: 'Sentiment Analysis',
      timestamp: '12/4/2023, 2:35 PM',
      markdownContent: SAMPLE_ANALYSES['Sentiment Analysis']
    },
    {
      id: '3',
      analyzerName: 'Key Concepts Extraction',
      timestamp: '12/4/2023, 2:40 PM',
      markdownContent: SAMPLE_ANALYSES['Key Concepts Extraction']
    }
  ]);
  const [selectedAnalyzer, setSelectedAnalyzer] = useState('');
  const [activeResultId, setActiveResultId] = useState<string | null>('1');
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const loadProject = async () => {
      const projectData = await getProject(params.id);
      setProject(projectData);
    };
    loadProject();
  }, [params.id]);

  const analyzers = Object.keys(SAMPLE_ANALYSES);

  const runAnalysis = () => {
    if (!selectedAnalyzer) return;

    const newResult: AnalysisResult = {
      id: (results.length + 1).toString(),
      analyzerName: selectedAnalyzer,
      timestamp: new Date().toLocaleString(),
      markdownContent: SAMPLE_ANALYSES[selectedAnalyzer as keyof typeof SAMPLE_ANALYSES]
    };

    setResults([...results, newResult]);
    setActiveResultId(newResult.id);
  };

  const activeResult = results.find(r => r.id === activeResultId);

  return (
    <div className="py-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-lg p-6">
          {project && (
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
            </div>
          )}
          <div className="space-y-8">
            {/* Analysis Controls */}
            <div className="flex justify-end">
              <div className="flex gap-4">
                <select
                  value={selectedAnalyzer}
                  onChange={(e) => setSelectedAnalyzer(e.target.value)}
                  className="border rounded-lg p-2"
                >
                  <option value="">Select Analyzer</option>
                  {analyzers.map((analyzer) => (
                    <option key={analyzer} value={analyzer}>
                      {analyzer}
                    </option>
                  ))}
                </select>
                <button
                  onClick={runAnalysis}
                  disabled={!selectedAnalyzer}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300"
                >
                  Run Analysis
                </button>
              </div>
            </div>

            {/* Results Section */}
            {results.length > 0 ? (
              <TabView
                tabs={results.map(r => `${r.analyzerName} (${r.timestamp})`)}
                activeTab={activeResult ? `${activeResult.analyzerName} (${activeResult.timestamp})` : ''}
                onTabChange={(tab) => {
                  const result = results.find(r => `${r.analyzerName} (${r.timestamp})` === tab);
                  if (result) {
                    setActiveResultId(result.id);
                  }
                }}
              >
                {activeResult && (
                  <div className="mt-6">
                    {activeResult.markdownContent && (
                      <div className="prose max-w-none">
                        <ReactMarkdown>{activeResult.markdownContent}</ReactMarkdown>
                      </div>
                    )}
                    {activeResult.imageUrl && (
                      <img
                        src={activeResult.imageUrl}
                        alt={`${activeResult.analyzerName} visualization`}
                        className="max-w-full h-auto rounded-lg"
                      />
                    )}
                  </div>
                )}
              </TabView>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">No analysis results yet</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Select an analyzer and run analysis to see results here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
