# Stunning - Website Idea Generator

A comprehensive full-stack web application that transforms website ideas into beautiful, editable previews and deployable websites instantly.

## 🚀 Features

### 🎨 **Core Generation**
- **AI-Powered Generation**: Transform any website idea into 3 relevant sections
- **Smart Section Types**: Hero, About, Services, Contact, Portfolio, Testimonials, FAQ, Team, Pricing, Blog, and more
- **Intelligent Content**: Context-aware content generation based on your specific idea

### ✏️ **Advanced Editing**
- **Inline Editing**: Click any section to edit content directly
- **Real-time Updates**: Changes instantly reflect in both card and preview views
- **Visual Feedback**: Green "Edited" badges show modified content
- **Undo/Redo**: Easy cancel and save functionality

### 🎯 **Dynamic Section Management**
- **Add New Sections**: Choose from 11+ pre-built section templates
- **Custom Sections**: Create completely custom sections with your own content
- **Reorder Sections**: Move sections up/down to perfect your layout
- **Delete Sections**: Remove unwanted sections with one click

### 🌐 **Website Preview**
- **Real Website Structure**: See your site as visitors would
- **Professional Layouts**: Specialized layouts for different section types
- **Responsive Design**: Preview works on desktop, tablet, and mobile
- **Live Updates**: All edits instantly appear in the preview

### 🚀 **Make it Live Deployment**
- **One-Click Deploy**: Deploy your website to the internet in minutes
- **Multiple Platforms**: Choose from Vercel, Netlify, or GitHub Pages
- **Custom Domains**: Register new domains or use existing ones
- **Free Subdomains**: Get started with free platform subdomains
- **Deployment Tracking**: Real-time deployment status and progress

### 💾 **Data Management**
- **MongoDB Storage**: All websites saved to secure cloud database
- **Persistent Sessions**: Your work is never lost
- **Version History**: Track changes and iterations (coming soon)
- **Export Options**: Download your website files (coming soon)

### 🎨 **Modern UI/UX**
- **Beautiful Design**: Clean, modern interface with Tailwind CSS
- **Loading States**: Elegant animations and feedback
- **Error Handling**: User-friendly error messages and recovery
- **Mobile-First**: Fully responsive across all devices
- **Dark Mode**: Coming soon

## 🛠 Tech Stack

### Frontend
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **React Hooks** for state management
- **Axios** for API communication

### Backend
- **NestJS** framework
- **TypeScript** for type safety
- **MongoDB Atlas** with Mongoose ODM
- **Express** server
- **CORS** enabled for cross-origin requests
- **Environment Variables** for configuration

### Database
- **MongoDB Atlas** (cloud database)
- **Mongoose** ODM for data modeling
- **Automatic timestamps** and indexing
- **Schema validation** and type checking

### Development Tools
- **Hot Reload** for both frontend and backend
- **ESLint** and **Prettier** for code quality
- **TypeScript** compilation and type checking
- **Environment-based configuration**

## 📦 Getting Started

### Prerequisites

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** for cloning the repository
- **MongoDB Atlas account** (free tier available) - [Sign up here](https://www.mongodb.com/atlas)

### Quick Setup (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stunning
   ```

2. **Install all dependencies**
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install
   
   # Install backend dependencies
   cd ../backend
   npm install
   ```


4. **Start the application**
   
   **Option A: One-Command Start (Recommended)**
   ```bash
   # Windows
   .\start-dev.bat
   
   # Linux/macOS
   chmod +x start-dev.sh
   ./start-dev.sh
   ```
   
   **Option B: Manual Start**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run start:dev
   
   # Terminal 2 - Frontend  
   cd frontend
   npm run dev
   ```

5. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

### Alternative MongoDB Setup

If you prefer to use your own MongoDB:

1. **Create a MongoDB Atlas account** (free)
2. **Create a new cluster** and database
3. **Get your connection string**
4. **Update the `.env` file** in the backend folder:
   ```env
   MONGODB_URI=your_mongodb_connection_string_here
   ```

### Local MongoDB (Advanced)

For local MongoDB development:

1. **Install MongoDB** locally
2. **Update connection string** in `backend/.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/stunning-websites
   ```

## 🎯 How to Use

### Basic Website Generation

1. **Enter Your Idea**: Type any website concept in the input field
   - Examples: "Landing page for a bakery", "Portfolio for a photographer", "E-commerce site for handmade jewelry"

2. **Generate Sections**: Click the "Generate" button
   - Wait for AI to create 3 relevant sections
   - Sections are automatically saved to database

3. **View Your Website**: Toggle between two views
   - **Section Cards**: Edit individual sections
   - **Website Preview**: See the full website layout

### Advanced Editing Features

4. **Edit Content**: 
   - Click the edit icon on any section card
   - Modify content in real-time
   - Save or cancel changes
   - See "Edited" badges on modified sections

5. **Manage Sections**:
   - **Add New**: Click "Add Section" to choose from 11+ templates
   - **Reorder**: Use up/down arrows to change section order
   - **Delete**: Remove unwanted sections with the delete button

6. **Website Preview**:
   - Switch to "Website Preview" mode
   - See your site as visitors would
   - All edits appear instantly
   - Responsive design preview

### Deployment (Make it Live!)

7. **Deploy Your Website**:
   - Click the "Make it Live! 🚀" button
   - Choose deployment platform (Vercel, Netlify, GitHub Pages)
   - Select domain option (free subdomain or custom domain)
   - Watch real-time deployment progress
   - Get your live website URL in minutes!

### Tips for Best Results

- **Be Specific**: "Bakery in downtown Seattle" vs "bakery"
- **Include Purpose**: "Landing page for", "Portfolio for", "E-commerce for"
- **Mention Style**: "Modern", "minimalist", "colorful", "professional"
- **Edit Freely**: All changes are saved automatically
- **Preview Often**: Switch to website preview to see your progress

## 🏗 Project Structure

```
stunning/
├── frontend/                    # Next.js React app
│   ├── src/
│   │   ├── app/                # App router pages
│   │   │   ├── globals.css     # Global styles (Tailwind)
│   │   │   ├── layout.tsx      # Root layout
│   │   │   └── page.tsx        # Home page
│   │   └── components/         # React components
│   │       ├── WebsiteGenerator.tsx    # Main generator component
│   │       ├── SectionCard.tsx         # Individual section cards
│   │       ├── WebsitePreview.tsx      # Full website preview
│   │       ├── AddSectionModal.tsx     # Add new sections
│   │       ├── MakeItLiveModal.tsx     # Deployment modal
│   │       └── LoadingSpinner.tsx      # Loading component
│   ├── public/                 # Static assets
│   ├── tailwind.config.ts      # Tailwind configuration
│   └── package.json
├── backend/                    # NestJS API
│   ├── src/
│   │   ├── website/           # Website module
│   │   │   ├── website.controller.ts  # API endpoints
│   │   │   ├── website.service.ts     # Business logic
│   │   │   ├── website.schema.ts      # MongoDB schema
│   │   │   └── website.module.ts      # Module definition
│   │   ├── ai/                # AI integration (ready)
│   │   │   ├── ai.service.ts          # AI service
│   │   │   ├── ai.module.ts           # AI module
│   │   │   └── ai.config.ts           # AI configuration
│   │   ├── config/            # Configuration files
│   │   ├── app.module.ts      # Main app module
│   │   └── main.ts            # Entry point
│   ├── .env                   # Environment variables
│   ├── start-with-env.bat     # Windows startup script
│   ├── start-with-env.sh      # Linux/macOS startup script
│   └── package.json
├── start-dev.bat              # Windows development script
├── start-dev.sh               # Linux/macOS development script
├── AI_INTEGRATION_GUIDE.md    # AI setup guide
├── SECTION_MANAGEMENT_GUIDE.md # Section features guide
└── README.md
```

## 🎨 UI/UX Features

### Visual Design
- **Modern Interface**: Clean, professional design with Tailwind CSS
- **Smooth Animations**: Fade-in effects, hover states, and transitions
- **Loading States**: Beautiful spinners and progress indicators
- **Visual Feedback**: Success states, error messages, and status badges
- **Responsive Design**: Perfect on desktop, tablet, and mobile

### User Experience
- **Intuitive Navigation**: Clear buttons and logical flow
- **Real-time Updates**: Instant feedback on all actions
- **Error Recovery**: Helpful error messages with suggested actions
- **Accessibility**: Keyboard navigation and screen reader support
- **Performance**: Fast loading and smooth interactions

## 🔧 API Endpoints

### Website Management
- `POST /api/websites/generate` - Generate website sections from idea
- `GET /api/websites` - Get all generated websites
- `GET /api/websites/:id` - Get specific website by ID

### Deployment (Coming Soon)
- `POST /api/deployment/deploy` - Deploy website to platform
- `GET /api/deployment/status/:id` - Check deployment status
- `POST /api/domain/check` - Check domain availability
- `POST /api/domain/register` - Register new domain

### AI Integration (Ready)
- `POST /api/ai/generate` - Generate content with AI models
- `GET /api/ai/status` - Check AI service availability

## 🔮 Future Enhancements

### Planned Features
- **🤖 AI Integration**: OpenAI/Anthropic for better content generation
- **🎨 Theme System**: Multiple design themes and color schemes
- **📱 Mobile App**: React Native mobile application
- **👥 User Accounts**: Save and manage multiple websites
- **🔄 Version Control**: Track changes and revert to previous versions
- **📊 Analytics**: Website performance and visitor analytics
- **🛒 E-commerce**: Built-in shopping cart and payment integration
- **🌐 Multi-language**: Support for multiple languages
- **🔌 Integrations**: Connect with popular services (Mailchimp, Google Analytics)

### Technical Improvements
- **⚡ Performance**: Implement caching and optimization
- **🔐 Security**: Add authentication and authorization
- **🧪 Testing**: Comprehensive test coverage
- **📈 Monitoring**: Error tracking and performance monitoring
- **🚀 CI/CD**: Automated testing and deployment pipelines

## 🛠 Development

### Available Scripts

#### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

#### Backend
```bash
npm run start:dev    # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm run start        # Start production server
npm run test         # Run tests
```

### Code Quality

- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **TypeScript**: Type safety and better developer experience
- **Husky**: Git hooks for pre-commit checks (coming soon)

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Getting Started
1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/your-username/stunning.git`
3. **Create** a feature branch: `git checkout -b feature/amazing-feature`
4. **Install** dependencies: `npm install` in both frontend and backend
5. **Make** your changes
6. **Test** thoroughly
7. **Commit**: `git commit -m 'Add some amazing feature'`
8. **Push**: `git push origin feature/amazing-feature`
9. **Submit** a Pull Request

### Contribution Guidelines
- Follow existing code style and conventions
- Add tests for new functionality
- Update documentation as needed
- Ensure all tests pass
- Write clear, descriptive commit messages

### Areas for Contribution
- 🐛 **Bug Fixes**: Report and fix issues
- ✨ **New Features**: Implement planned enhancements
- 📚 **Documentation**: Improve guides and examples
- 🎨 **UI/UX**: Design improvements and accessibility
- ⚡ **Performance**: Optimization and speed improvements
- 🧪 **Testing**: Add test coverage


*Transform your ideas into stunning websites instantly!* ✨