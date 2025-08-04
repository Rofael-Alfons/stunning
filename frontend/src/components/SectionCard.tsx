import { useState } from 'react';

interface SectionCardProps {
  name: string;
  content: string;
  index: number;
  onContentChange: (newContent: string) => void;
  onDelete?: (index: number) => void;
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
  totalSections: number;
}

export default function SectionCard({ 
  name, 
  content, 
  index, 
  onContentChange, 
  onDelete, 
  onMoveUp, 
  onMoveDown, 
  totalSections 
}: SectionCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [hasBeenEdited, setHasBeenEdited] = useState(false);

  const handleSave = () => {
    onContentChange(editedContent);
    setIsEditing(false);
    setHasBeenEdited(true);
  };

  const handleCancel = () => {
    setEditedContent(content);
    setIsEditing(false);
  };
  return (
    <div 
      className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fadeInUp"
      style={{
        animationDelay: `${index * 150}ms`,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <h3 className="text-xl font-semibold text-slate-800">{name}</h3>
        </div>
        {!isEditing && (
          <div className="flex items-center space-x-1">
            {/* Move Up Button */}
            {onMoveUp && index > 0 && (
              <button
                onClick={() => onMoveUp(index)}
                className="text-slate-400 hover:text-blue-600 transition-colors p-1 rounded"
                title="Move up"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
            )}
            
            {/* Move Down Button */}
            {onMoveDown && index < totalSections - 1 && (
              <button
                onClick={() => onMoveDown(index)}
                className="text-slate-400 hover:text-blue-600 transition-colors p-1 rounded"
                title="Move down"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
            
            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(true)}
              className="text-slate-400 hover:text-blue-600 transition-colors p-1 rounded"
              title="Edit content"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            
            {/* Delete Button */}
            {onDelete && totalSections > 1 && (
              <button
                onClick={() => onDelete(index)}
                className="text-slate-400 hover:text-red-600 transition-colors p-1 rounded"
                title="Delete section"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
      
      <div className="text-slate-600 leading-relaxed mb-4">
        {isEditing ? (
          <div className="space-y-3">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
              autoFocus
            />
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p>{content}</p>
        )}
      </div>

      <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
          Section {index + 1}
        </span>
        {hasBeenEdited && (
          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
            Edited
          </span>
        )}
      </div>
    </div>
  );
}