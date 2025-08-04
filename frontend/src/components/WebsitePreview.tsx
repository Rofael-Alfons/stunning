interface Section {
  name: string;
  content: string;
}

interface WebsitePreviewProps {
  sections: Section[];
  websiteIdea: string;
}

export default function WebsitePreview({ sections, websiteIdea }: WebsitePreviewProps) {
  const businessName = extractBusinessName(websiteIdea);
  
  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-fadeInUp">
      {/* Website Header/Navigation */}
      <div className="bg-slate-900 text-white px-6 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="text-xl font-bold">{businessName}</div>
          <nav className="hidden md:flex space-x-6">
            {sections.map((section, index) => (
              <a 
                key={index}
                href={`#${section.name.toLowerCase()}`} 
                className="hover:text-blue-300 transition-colors"
              >
                {section.name}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Website Sections */}
      <div className="max-h-[500px] overflow-y-auto scrollbar-hide">
        {sections.map((section, index) => (
          <WebsiteSection 
            key={index}
            section={section}
            index={index}
            businessName={businessName}
            isFirst={index === 0}
          />
        ))}
      </div>

      {/* Website Footer */}
      <div className="bg-slate-800 text-white px-6 py-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-lg font-semibold mb-2">{businessName}</div>
          <div className="text-slate-400 text-sm">
            © 2024 {businessName}. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}

function WebsiteSection({ section, index, businessName, isFirst }: {
  section: Section;
  index: number;
  businessName: string;
  isFirst: boolean;
}) {
  const sectionName = section.name.toLowerCase();

  if (sectionName === 'hero') {
    return (
      <section id={sectionName} className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-6 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{businessName}</h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            {section.content}
          </p>
          <div className="space-x-4">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Get Started
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (sectionName === 'about') {
    return (
      <section id={sectionName} className="px-6 py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">About {businessName}</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                {section.content}
              </p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-blue-600">5+</div>
                  <div className="text-sm text-slate-600">Years Experience</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-blue-600">100+</div>
                  <div className="text-sm text-slate-600">Happy Clients</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-200 h-64 rounded-lg flex items-center justify-center">
              <span className="text-slate-500">Image Placeholder</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (sectionName === 'contact') {
    return (
      <section id={sectionName} className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Contact Us</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {section.content}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600">📧</span>
                </div>
                <div>
                  <div className="font-semibold text-slate-800">Email</div>
                  <div className="text-slate-600">contact@{businessName.toLowerCase().replace(/\s+/g, '')}.com</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600">📞</span>
                </div>
                <div>
                  <div className="font-semibold text-slate-800">Phone</div>
                  <div className="text-slate-600">+1 (555) 123-4567</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600">📍</span>
                </div>
                <div>
                  <div className="font-semibold text-slate-800">Address</div>
                  <div className="text-slate-600">123 Business St, City, State 12345</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <form className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <textarea 
                  placeholder="Your Message" 
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Handle additional section types
  if (sectionName === 'testimonials') {
    return (
      <section id={sectionName} className="px-6 py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">{section.name}</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">
              {section.content}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((item) => (
              <div key={item} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-slate-200 rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold">Customer {item}</div>
                    <div className="text-sm text-slate-600">Satisfied Client</div>
                  </div>
                </div>
                <p className="text-slate-600 italic">"Amazing service and quality! Highly recommend to anyone looking for professional results."</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (sectionName === 'faq') {
    return (
      <section id={sectionName} className="px-6 py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">{section.name}</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {section.content}
            </p>
          </div>
          <div className="space-y-4">
            {[
              { q: "What services do you offer?", a: "We provide comprehensive solutions tailored to your needs." },
              { q: "How long does it take?", a: "Timeline varies based on project scope, typically 2-4 weeks." },
              { q: "What are your rates?", a: "We offer competitive pricing with flexible packages." }
            ].map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-lg p-4">
                <div className="font-semibold text-slate-800 mb-2">{faq.q}</div>
                <div className="text-slate-600">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (sectionName === 'team') {
    return (
      <section id={sectionName} className="px-6 py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">{section.name}</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {section.content}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="text-center">
                <div className="w-32 h-32 bg-slate-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Team Member {item}</h3>
                <p className="text-slate-600 mb-2">Professional Title</p>
                <p className="text-sm text-slate-500">Expert in their field with years of experience.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (sectionName === 'pricing') {
    return (
      <section id={sectionName} className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">{section.name}</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {section.content}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Basic', price: '$99', features: ['Feature 1', 'Feature 2', 'Feature 3'] },
              { name: 'Pro', price: '$199', features: ['Everything in Basic', 'Feature 4', 'Feature 5'] },
              { name: 'Enterprise', price: '$299', features: ['Everything in Pro', 'Feature 6', 'Priority Support'] }
            ].map((plan, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-blue-600 mb-4">{plan.price}</div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="text-slate-600">{feature}</li>
                  ))}
                </ul>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (sectionName === 'blog') {
    return (
      <section id={sectionName} className="px-6 py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">{section.name}</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {section.content}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-slate-200"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Blog Post {item}</h3>
                  <p className="text-slate-600 mb-4">Insights and tips from our experts to help you succeed.</p>
                  <div className="text-sm text-slate-500">Published 2 days ago</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Generic section for custom or unrecognized sections
  return (
    <section 
      id={sectionName} 
      className={`px-6 py-16 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">{section.name}</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            {section.content}
          </p>
        </div>
        
        {sectionName === 'services' && (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-6 rounded-lg shadow-lg border border-slate-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-blue-600 text-xl">⭐</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Service {item}</h3>
                <p className="text-slate-600">Professional service description that highlights the benefits and value proposition.</p>
              </div>
            ))}
          </div>
        )}

        {sectionName === 'menu' && (
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: 'Signature Dish', price: '$24.99', description: 'Our most popular item with fresh ingredients' },
              { name: 'Chef Special', price: '$28.99', description: 'Seasonal specialty crafted by our head chef' },
              { name: 'Classic Favorite', price: '$19.99', description: 'Traditional recipe with a modern twist' },
              { name: 'Daily Fresh', price: '$22.99', description: 'Made fresh daily with local ingredients' },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-start bg-white p-4 rounded-lg border border-slate-200">
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-slate-600 text-sm">{item.description}</p>
                </div>
                <span className="text-blue-600 font-bold">{item.price}</span>
              </div>
            ))}
          </div>
        )}

        {sectionName === 'portfolio' && (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-slate-200 h-48 rounded-lg flex items-center justify-center hover:bg-slate-300 transition-colors cursor-pointer">
                <span className="text-slate-500">Project {item}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function extractBusinessName(idea: string): string {
  const words = idea.split(' ');
  if (words.includes('for') && words.includes('a')) {
    const forIndex = words.indexOf('for');
    const aIndex = words.lastIndexOf('a');
    if (forIndex > aIndex) {
      const name = words.slice(aIndex + 1, forIndex).join(' ');
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
  }
  return 'Your Business';
}