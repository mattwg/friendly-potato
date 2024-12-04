interface TabViewProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: React.ReactNode;
}

export default function TabView({ tabs, activeTab, onTabChange, children }: TabViewProps) {
  return (
    <div>
      <div className="border-b border-gray-200">
        <div className="overflow-x-auto">
          <nav className="-mb-px flex space-x-8 min-w-full pb-2" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex-shrink-0
                  ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>
      <div className="mt-4">
        {children}
      </div>
    </div>
  );
}
