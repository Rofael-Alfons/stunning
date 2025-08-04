import { useState } from 'react';

interface AddSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (section: { name: string; content: string }) => void;
}

const SECTION_TEMPLATES = [
  {
    name: 'Hero',
    placeholder: 'Welcome to our amazing service! We provide exceptional quality and outstanding customer experience.'
  },
  {
    name: 'About',
    placeholder: 'Learn more about our company, our mission, and what makes us unique in the industry.'
  },
  {
    name: 'Services',
    placeholder: 'Discover our comprehensive range of services designed to meet all your needs.'
  },
  {
    name: 'Portfolio',
    placeholder: 'Explore our latest work and see examples of our expertise and creativity.'
  },
  {
    name: 'Testimonials',
    placeholder: 'Read what our satisfied customers have to say about their experience with us.'
  },
  {
    name: 'Contact',
    placeholder: 'Get in touch with us today. We\'d love to hear from you and discuss your needs.'
  },
  {
    name: 'FAQ',
    placeholder: 'Find answers to commonly asked questions about our services and processes.'
  },
  {
    name: 'Team',
    placeholder: 'Meet our talented team of professionals who are dedicated to your success.'
  },
  {
    name: 'Pricing',
    placeholder: 'Choose from our flexible pricing plans designed to fit your budget and requirements.'
  },
  {
    name: 'Blog',
    placeholder: 'Stay updated with our latest insights, tips, and industry news.'
  },
  {
    name: 'Custom',
    placeholder: 'Create your own custom section with personalized content.'
  }
];

export default function AddSectionModal({ isOpen, onClose, onAdd }: AddSectionModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState(SECTION_TEMPLATES[0]);
  const [customName, setCustomName] = useState('');
  const [content, setContent] = useState('');

  const handleTemplateSelect = (template: typeof SECTION_TEMPLATES[0]) => {
    setSelectedTemplate(template);
    setContent(template.placeholder);
    if (template.name !== 'Custom') {
      setCustomName('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const sectionName = selectedTemplate.name === 'Custom' ? customName : selectedTemplate.name;
    
    if (!sectionName.trim() || !content.trim()) {
      return;
    }

    onAdd({
      name: sectionName.trim(),
      content: content.trim()
    });

    // Reset form
    setSelectedTemplate(SECTION_TEMPLATES[0]);
    setCustomName('');
    setContent('');
    onClose();
  };

  const handleClose = () => {
    // Reset form on close
    setSelectedTemplate(SECTION_TEMPLATES[0]);
    setCustomName('');
    setContent('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800">Add New Section</h2>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Section Type Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Section Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SECTION_TEMPLATES.map((template) => (
                <button
                  key={template.name}
                  type="button"
                  onClick={() => handleTemplateSelect(template)}
                  className={`p-3 text-sm font-medium rounded-lg border transition-all duration-200 ${
                    selectedTemplate.name === template.name
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'bg-white border-slate-300 text-slate-700 hover:border-slate-400'
                  }`}
                >
                  {template.name}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Name Input */}
          {selectedTemplate.name === 'Custom' && (
            <div>
              <label htmlFor="customName" className="block text-sm font-medium text-slate-700 mb-2">
                Custom Section Name
              </label>
              <input
                type="text"
                id="customName"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Enter section name..."
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          )}

          {/* Content Input */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-slate-700 mb-2">
              Section Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter your section content..."
              rows={6}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
            <p className="text-xs text-slate-500 mt-2">
              Write compelling content that will engage your website visitors.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Add Section
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}