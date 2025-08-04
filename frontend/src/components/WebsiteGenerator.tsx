'use client';

import { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import SectionCard from './SectionCard';
import WebsitePreview from './WebsitePreview';
import AddSectionModal from './AddSectionModal';
import MakeItLiveModal from './MakeItLiveModal';

interface Section {
  name: string;
  content: string;
}

interface Website {
  _id: string;
  idea: string;
  sections: Section[];
  createdAt: string;
}

interface ApiResponse {
  success: boolean;
  data?: Website;
  error?: string;
}

export default function WebsiteGenerator() {
  const [idea, setIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sections, setSections] = useState<Section[]>([]);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'preview'>('cards');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isMakeItLiveModalOpen, setIsMakeItLiveModalOpen] = useState(false);

  const handleSectionContentChange = (index: number, newContent: string) => {
    setSections(prevSections => 
      prevSections.map((section, i) => 
        i === index ? { ...section, content: newContent } : section
      )
    );
  };

  const handleAddSection = (newSection: { name: string; content: string }) => {
    setSections(prevSections => [...prevSections, newSection]);
  };

  const handleDeleteSection = (index: number) => {
    setSections(prevSections => prevSections.filter((_, i) => i !== index));
  };

  const handleMoveSection = (fromIndex: number, toIndex: number) => {
    setSections(prevSections => {
      const newSections = [...prevSections];
      const [movedSection] = newSections.splice(fromIndex, 1);
      newSections.splice(toIndex, 0, movedSection);
      return newSections;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!idea.trim()) {
      setError('Please enter a website idea');
      return;
    }

    setIsLoading(true);
    setError('');
    setSections([]);

    try {
      const response = await fetch('http://localhost:3001/api/websites/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idea: idea.trim() }),
      });

      const result: ApiResponse = await response.json();

      if (result.success && result.data) {
        setSections(result.data.sections);
      } else {
        setError(result.error || 'Failed to generate website');
      }
    } catch (err) {
      setError('Network error. Please make sure the backend is running.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-slate-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="idea" className="block text-sm font-medium text-slate-700 mb-3">
              Your Stunning Website Idea
            </label>
            <input
              type="text"
              id="idea"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Enter your stunning website idea…"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-800 placeholder-slate-400"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !idea.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-3">
                <LoadingSpinner />
                <span>Stunning…</span>
              </div>
            ) : (
              'Let’s Stun!'
            )}
          </button>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}
        </form>
      </div>

      {/* Results Preview Section */}
      {sections.length > 0 && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Website Preview
            </h2>
            <p className="text-slate-600 mb-6">
              Here&apos;s your generated website structure. Click the edit icon on any section card to customize the content!
            </p>
            
            {/* View Toggle and Action Buttons */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-8">
              <div className="bg-slate-100 p-1 rounded-lg inline-flex">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                    viewMode === 'cards'
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  Section Cards
                </button>
                <button
                  onClick={() => setViewMode('preview')}
                  className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                    viewMode === 'preview'
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  Website Preview
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Add Section</span>
                </button>
                
                <button
                  onClick={() => setIsMakeItLiveModalOpen(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg transform hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Make it Live! 🚀</span>
                </button>
              </div>
            </div>
          </div>

          {viewMode === 'cards' ? (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {sections.map((section, index) => (
                <SectionCard
                  key={index}
                  name={section.name}
                  content={section.content}
                  index={index}
                  totalSections={sections.length}
                  onContentChange={(newContent) => handleSectionContentChange(index, newContent)}
                  onDelete={handleDeleteSection}
                  onMoveUp={(index) => handleMoveSection(index, index - 1)}
                  onMoveDown={(index) => handleMoveSection(index, index + 1)}
                />
              ))}
            </div>
          ) : (
            <WebsitePreview sections={sections} websiteIdea={idea} />
          )}
        </div>
      )}

      {/* Add Section Modal */}
      <AddSectionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddSection}
      />

      {/* Make it Live Modal */}
      <MakeItLiveModal
        isOpen={isMakeItLiveModalOpen}
        onClose={() => setIsMakeItLiveModalOpen(false)}
        sections={sections}
        websiteIdea={idea}
      />
    </div>
  );
}