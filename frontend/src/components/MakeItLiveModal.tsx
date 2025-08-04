import { useState } from 'react';

interface MakeItLiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  sections: Array<{ name: string; content: string }>;
  websiteIdea: string;
}

interface DeploymentOption {
  id: string;
  name: string;
  description: string;
  icon: string;
  pricing: string;
  features: string[];
  deployTime: string;
  recommended?: boolean;
}

interface DomainOption {
  id: string;
  name: string;
  extension: string;
  price: string;
  available: boolean;
}

const DEPLOYMENT_OPTIONS: DeploymentOption[] = [
  {
    id: 'vercel',
    name: 'Vercel',
    description: 'Lightning-fast deployments with global CDN',
    icon: '▲',
    pricing: 'Free tier available',
    features: ['Instant deployments', 'Custom domains', 'SSL certificates', 'Global CDN'],
    deployTime: '30 seconds',
    recommended: true
  },
  {
    id: 'netlify',
    name: 'Netlify',
    description: 'Modern web platform for developers',
    icon: '🌐',
    pricing: 'Free tier available',
    features: ['Continuous deployment', 'Form handling', 'Split testing', 'Edge functions'],
    deployTime: '45 seconds'
  },
  {
    id: 'github-pages',
    name: 'GitHub Pages',
    description: 'Free hosting directly from GitHub',
    icon: '🐙',
    pricing: 'Free',
    features: ['GitHub integration', 'Custom domains', 'Jekyll support', 'Version control'],
    deployTime: '2-3 minutes'
  }
];

export default function MakeItLiveModal({ isOpen, onClose, sections, websiteIdea }: MakeItLiveModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDeployment, setSelectedDeployment] = useState<string>('');
  const [domainOption, setDomainOption] = useState<'custom' | 'subdomain'>('subdomain');
  const [customDomain, setCustomDomain] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'deploying' | 'success' | 'error'>('idle');
  const [deploymentUrl, setDeploymentUrl] = useState('');

  // Generate suggested domains based on website idea
  const generateDomainSuggestions = (idea: string): DomainOption[] => {
    const cleanIdea = idea.toLowerCase().replace(/[^a-z0-9]/g, '');
    const words = idea.toLowerCase().split(' ').filter(word => 
      !['a', 'an', 'the', 'for', 'of', 'website', 'page', 'site'].includes(word)
    );
    
    const suggestions: DomainOption[] = [];
    
    // Add main suggestion
    if (cleanIdea.length > 0) {
      suggestions.push({
        id: '1',
        name: cleanIdea.slice(0, 20),
        extension: '.com',
        price: '$12.99/year',
        available: Math.random() > 0.3
      });
    }

    // Add word combinations
    if (words.length >= 2) {
      suggestions.push({
        id: '2',
        name: words.slice(0, 2).join(''),
        extension: '.com',
        price: '$12.99/year',
        available: Math.random() > 0.5
      });
    }

    // Add alternatives
    suggestions.push(
      {
        id: '3',
        name: cleanIdea.slice(0, 15),
        extension: '.net',
        price: '$14.99/year',
        available: true
      },
      {
        id: '4',
        name: cleanIdea.slice(0, 15),
        extension: '.org',
        price: '$13.99/year',
        available: true
      }
    );

    return suggestions;
  };

  const domainSuggestions = generateDomainSuggestions(websiteIdea);

  const handleDeploy = async () => {
    setIsDeploying(true);
    setDeploymentStatus('deploying');
    
    try {
      // Simulate deployment process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate demo URL based on selection
      const baseUrl = selectedDeployment === 'vercel' 
        ? 'vercel.app' 
        : selectedDeployment === 'netlify' 
        ? 'netlify.app' 
        : 'github.io';
      
      const projectName = websiteIdea.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 20);
      const demoUrl = `https://${projectName}-demo.${baseUrl}`;
      
      setDeploymentUrl(demoUrl);
      setDeploymentStatus('success');
    } catch (error) {
      setDeploymentStatus('error');
    } finally {
      setIsDeploying(false);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setSelectedDeployment('');
    setDomainOption('subdomain');
    setCustomDomain('');
    setDeploymentStatus('idle');
    setDeploymentUrl('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Make it Live! 🚀</h2>
            <p className="text-slate-600">Deploy your website to the world in minutes</p>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? 'bg-blue-600' : 'bg-slate-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-slate-600">
            <span>Choose Platform</span>
            <span>Configure Domain</span>
            <span>Deploy</span>
          </div>
        </div>

        <div className="p-6">
          {/* Step 1: Choose Deployment Platform */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Choose Your Deployment Platform</h3>
                <p className="text-slate-600">Select where you want to host your website</p>
              </div>

              <div className="grid gap-4">
                {DEPLOYMENT_OPTIONS.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => setSelectedDeployment(option.id)}
                    className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      selectedDeployment === option.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="text-3xl">{option.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="text-lg font-semibold text-slate-800">{option.name}</h4>
                            {option.recommended && (
                              <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                                Recommended
                              </span>
                            )}
                          </div>
                          <p className="text-slate-600 mb-3">{option.description}</p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-slate-700">Pricing: </span>
                              <span className="text-green-600">{option.pricing}</span>
                            </div>
                            <div>
                              <span className="font-medium text-slate-700">Deploy Time: </span>
                              <span className="text-blue-600">{option.deployTime}</span>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="flex flex-wrap gap-2">
                              {option.features.map((feature, idx) => (
                                <span key={idx} className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded">
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        selectedDeployment === option.id
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-slate-300'
                      }`}>
                        {selectedDeployment === option.id && (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setCurrentStep(2)}
                  disabled={!selectedDeployment}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Configure Domain */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Configure Your Domain</h3>
                <p className="text-slate-600">Choose how you want to access your website</p>
              </div>

              <div className="space-y-4">
                {/* Subdomain Option */}
                <div
                  onClick={() => setDomainOption('subdomain')}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    domainOption === 'subdomain'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-slate-800">Use Free Subdomain</h4>
                      <p className="text-slate-600">Get started instantly with a free subdomain</p>
                      <p className="text-sm text-slate-500 mt-1">
                        Example: your-site-name.{selectedDeployment === 'vercel' ? 'vercel.app' : selectedDeployment === 'netlify' ? 'netlify.app' : 'github.io'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                        Free
                      </span>
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        domainOption === 'subdomain'
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-slate-300'
                      }`}>
                        {domainOption === 'subdomain' && (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Custom Domain Option */}
                <div
                  onClick={() => setDomainOption('custom')}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    domainOption === 'custom'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-slate-800">Get Custom Domain</h4>
                      <p className="text-slate-600">Professional domain for your brand</p>
                      
                      {domainOption === 'custom' && (
                        <div className="mt-4 space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Or enter your own domain:
                            </label>
                            <input
                              type="text"
                              value={customDomain}
                              onChange={(e) => setCustomDomain(e.target.value)}
                              placeholder="mydomain.com"
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-slate-700 mb-3">Available domains for "{websiteIdea}":</h5>
                            <div className="grid gap-2">
                              {domainSuggestions.map((domain) => (
                                <div key={domain.id} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg">
                                  <div className="flex items-center space-x-3">
                                    <div className={`w-3 h-3 rounded-full ${domain.available ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                    <span className="font-medium">{domain.name}{domain.extension}</span>
                                    <span className="text-sm text-slate-600">{domain.price}</span>
                                  </div>
                                  <button
                                    disabled={!domain.available}
                                    className={`px-3 py-1 text-sm rounded ${
                                      domain.available
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                                    }`}
                                  >
                                    {domain.available ? 'Select' : 'Taken'}
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ml-4 ${
                      domainOption === 'custom'
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-slate-300'
                    }`}>
                      {domainOption === 'custom' && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Deploy */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Ready to Deploy! 🚀</h3>
                <p className="text-slate-600">Review your configuration and deploy your website</p>
              </div>

              {/* Deployment Summary */}
              <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                <h4 className="font-semibold text-slate-800">Deployment Summary</h4>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-slate-600">Platform</div>
                    <div className="font-medium">{DEPLOYMENT_OPTIONS.find(opt => opt.id === selectedDeployment)?.name}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-slate-600">Domain</div>
                    <div className="font-medium">
                      {domainOption === 'subdomain' 
                        ? `Free subdomain (.${selectedDeployment === 'vercel' ? 'vercel.app' : selectedDeployment === 'netlify' ? 'netlify.app' : 'github.io'})`
                        : customDomain || 'Custom domain'
                      }
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-slate-600">Sections</div>
                    <div className="font-medium">{sections.length} sections</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-slate-600">Estimated Deploy Time</div>
                    <div className="font-medium">{DEPLOYMENT_OPTIONS.find(opt => opt.id === selectedDeployment)?.deployTime}</div>
                  </div>
                </div>
              </div>

              {/* Deployment Status */}
              {deploymentStatus !== 'idle' && (
                <div className={`p-4 rounded-xl border-2 ${
                  deploymentStatus === 'deploying' ? 'border-blue-200 bg-blue-50' :
                  deploymentStatus === 'success' ? 'border-green-200 bg-green-50' :
                  'border-red-200 bg-red-50'
                }`}>
                  {deploymentStatus === 'deploying' && (
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                      <div>
                        <div className="font-medium text-blue-800">Deploying your website...</div>
                        <div className="text-sm text-blue-600">This usually takes about 30-60 seconds</div>
                      </div>
                    </div>
                  )}
                  
                  {deploymentStatus === 'success' && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium text-green-800">🎉 Your website is live!</div>
                          <div className="text-sm text-green-600">Successfully deployed to {DEPLOYMENT_OPTIONS.find(opt => opt.id === selectedDeployment)?.name}</div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border border-green-200">
                        <div className="text-sm text-green-700 mb-2">Your website URL:</div>
                        <div className="flex items-center space-x-2">
                          <a 
                            href={deploymentUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 font-medium break-all"
                          >
                            {deploymentUrl}
                          </a>
                          <button 
                            onClick={() => navigator.clipboard.writeText(deploymentUrl)}
                            className="text-slate-500 hover:text-slate-700"
                            title="Copy URL"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {deploymentStatus === 'error' && (
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-red-800">Deployment failed</div>
                        <div className="text-sm text-red-600">Please try again or contact support</div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentStep(2)}
                  disabled={isDeploying}
                  className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Back
                </button>
                
                {deploymentStatus === 'idle' && (
                  <button
                    onClick={handleDeploy}
                    disabled={isDeploying}
                    className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center space-x-2"
                  >
                    <span>🚀 Deploy Now</span>
                  </button>
                )}
                
                {deploymentStatus === 'success' && (
                  <div className="flex space-x-3">
                    <a
                      href={deploymentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      View Website
                    </a>
                    <button
                      onClick={handleClose}
                      className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}