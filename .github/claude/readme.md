# OpenHands: Code Less, Make More

OpenHands (formerly OpenDevin) is a cutting-edge AI-powered software development platform that enables autonomous agents to perform complex development tasks. These AI agents can modify code, execute commands, browse the web, call APIs, and handle the full spectrum of software development activities that human developers typically perform.

## 🚀 Features

- **Autonomous AI Agents**: Deploy intelligent agents that can understand, write, and modify code independently
- **Multi-Runtime Support**: Compatible with Docker, E2B, Daytona, Runloop, Modal, and local environments
- **Web-Based IDE**: Full-featured browser-based development environment with real-time collaboration
- **Terminal Integration**: Built-in terminal access for command execution and system interaction
- **Browser Automation**: Integrated web browsing capabilities for research and API interaction
- **Jupyter Notebook Support**: Native support for interactive Python development and data analysis
- **VSCode Integration**: Seamless integration with Visual Studio Code for familiar development experience
- **Multi-Language Support**: Comprehensive support for Python, TypeScript, JavaScript, and more
- **Cloud & Self-Hosted Options**: Available both as a cloud service and self-hosted solution
- **Evaluation Framework**: Built-in benchmarking and evaluation tools for agent performance
- **Microagents System**: Specialized agents for specific development tasks
- **Security-First Design**: Sandboxed execution environments for safe code execution

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript for the main UI
- **Tailwind CSS** for styling and responsive design
- **React Router** for client-side navigation
- **React Query (TanStack Query)** for data fetching and state management
- **React Hook Form** for form management
- **React i18next** for internationalization
- **Vite** for build tooling and development server
- **Storybook** for component documentation and testing

### Backend/Services
- **Python 3.11+** as the primary backend language
- **FastAPI** for REST API services
- **WebSocket** for real-time communication
- **Docker** for containerization and runtime environments
- **Kubernetes** for orchestration and scaling
- **SQLite/PostgreSQL** for data persistence
- **Redis** for caching and session management

### Development Tools
- **Docker Compose** for local development orchestration
- **ESLint & Prettier** for code formatting and linting
- **Husky** for Git hooks and pre-commit checks
- **Jest & Playwright** for testing
- **Ruff & MyPy** for Python code quality
- **GitHub Actions** for CI/CD automation

### AI/ML Infrastructure
- **LiteLLM** for multi-provider LLM integration
- **OpenAI API** compatibility
- **Custom agent framework** built in Python
- **Evaluation harness** for performance benchmarking

## 📁 Project Structure

```
├── frontend/                 # React-based web interface
│   ├── src/                 # Source code for UI components
│   ├── public/              # Static assets and HTML templates
│   └── tests/               # Frontend testing suite
├── openhands/               # Core Python backend
│   ├── agenthub/           # AI agent implementations
│   ├── controller/         # Agent orchestration and control
│   ├── runtime/            # Execution environment management
│   ├── llm/                # Large language model integrations
│   ├── server/             # FastAPI web server
│   └── events/             # Event system for agent communication
├── containers/              # Docker configurations
│   ├── app/                # Application container setup
│   ├── dev/                # Development environment
│   └── runtime/            # Runtime environment configs
├── evaluation/             # Performance evaluation framework
├── docs/                   # Comprehensive documentation
├── microagents/           # Specialized micro-agent implementations
└── tests/                 # Backend testing suite
```

## 🔧 Installation & Setup

### Prerequisites
- **Docker** (version 20.10 or higher)
- **Docker Compose** (version 2.0 or higher)
- **Node.js** (version 18 or higher) - for frontend development
- **Python** (version 3.11 or higher) - for backend development
- **Git** for version control

### Quick Start with Docker

```bash
# Clone the repository
git clone https://github.com/All-Hands-AI/OpenHands.git
cd OpenHands

# Start the application using Docker Compose
docker-compose up -d

# Access the application at http://localhost:3000
```

### Development Setup

```bash
# Clone and navigate to the project
git clone https://github.com/All-Hands-AI/OpenHands.git
cd OpenHands

# Build the Docker images
make build

# Set up your configuration
cp config.template.toml config.toml
# Edit config.toml with your API keys and preferences

# Start in development mode
docker-compose -f containers/dev/compose.yml up
```

### Local Development (Frontend)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Local Development (Backend)

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -e .

# Run tests
python -m pytest tests/

# Start the backend server
python -m openhands.server.listen
```

## 🎯 Usage

### Getting Started with OpenHands Cloud

The easiest way to start is with [OpenHands Cloud](https://app.all-hands.dev):

1. Sign up for an account
2. Connect your preferred LLM provider (OpenAI, Anthropic, etc.)
3. Create a new conversation and start coding with AI assistance

### Self-Hosted Deployment

```bash
# Using Docker (Recommended)
docker-compose up -d

# Using local setup
python -m openhands.server.listen --host 0.0.0.0 --port 3000

# With specific runtime
export RUNTIME=e2b  # or docker, runloop, daytona
docker-compose up -d
```

### CLI Mode

```bash
# Run OpenHands in headless mode
python -m openhands.cli.main \
  --task "Fix the bug in the authentication system" \
  --repo-path /path/to/your/project \
  --llm-provider openai \
  --llm-model gpt-4
```

### Configuration Options

Create a `config.toml` file with your preferences:

```toml
[llm]
provider = "openai"
model = "gpt-4"
api_key = "your-api-key-here"

[runtime]
type = "docker"
image = "docker.all-hands.dev/all-hands-ai/runtime:latest"

[security]
enable_auto_lint = true
restrict_file_operations = false
```

## 📊 Runtime Environments

OpenHands supports multiple runtime environments:

- **Docker**: Standard containerized runtime (default)
- **E2B**: Secure cloud sandboxes for AI code execution
- **Daytona**: Scalable development environments
- **Runloop**: Fast and secure AI sandboxes
- **Modal**: Serverless computing platform
- **Local**: Direct execution on host system

## 🧪 Testing

### Frontend Testing

```bash
cd frontend
npm test                    # Run Jest tests
npm run test:e2e           # Run Playwright E2E tests
npm run test:coverage      # Generate coverage report
```

### Backend Testing

```bash
# Unit tests
python -m pytest tests/unit/

# Integration tests
python -m pytest tests/integration/

# E2E tests
python -m pytest tests/e2e/

# Run with coverage
pytest --cov=openhands tests/
```

### Agent Evaluation

```bash
# Run evaluation benchmarks
python -m evaluation.benchmarks.swe_bench \
  --model gpt-4 \
  --runtime docker \
  --num-instances 100
```

## 🔄 Deployment

### Docker Deployment

```bash
# Production build
docker build -f containers/app/Dockerfile -t openhands:latest .

# Deploy with custom configuration
docker run -d \
  -p 3000:3000 \
  -v ~/.openhands:/opt/workspace_base \
  -e SANDBOX_RUNTIME_CONTAINER_IMAGE=runtime:latest \
  openhands:latest
```

### Kubernetes Deployment

```bash
# Apply Kubernetes manifests
kubectl apply -f kind/manifests/

# Scale deployment
kubectl scale deployment openhands --replicas=3
```

### Environment Variables

Key environment variables for deployment:

```bash
# LLM Configuration
export LLM_PROVIDER="openai"
export LLM_MODEL="gpt-4"
export OPENAI_API_KEY="your-key"

# Runtime Configuration
export RUNTIME="docker"
export SANDBOX_RUNTIME_CONTAINER_IMAGE="runtime:latest"

# Security
export ENABLE_SECURITY_ANALYSIS="true"
export RESTRICT_FILE_OPERATIONS="false"
```

## 📱 Platform Support

- **Web**: Full-featured web application (Chrome, Firefox, Safari, Edge)
- **Desktop**: Cross-platform desktop app via web technologies
- **API**: RESTful API and WebSocket support for integrations
- **CLI**: Command-line interface for automation and scripting
- **VS Code Extension**: Native Visual Studio Code integration
- **GitHub Action**: CI/CD integration for automated development tasks

## 🔐 Security

OpenHands implements multiple security layers:

- **Sandboxed Execution**: All code runs in isolated containers
- **Permission Controls**: Configurable file and network access restrictions  
- **API Key Management**: Secure credential storage and rotation
- **Audit Logging**: Comprehensive logging of all agent activities
- **Static Analysis**: Built-in security scanning and vulnerability detection

## 🤝 Contributing

We welcome contributions from the community! Please see our [Contributing Guidelines](CONTRIBUTING.md) for detailed information.

### Quick Contributing Steps

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following our coding standards
4. Run tests (`npm test` for frontend, `pytest` for backend)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines

- Follow TypeScript/JavaScript standards for frontend code
- Use Python type hints and follow PEP 8 for backend code
- Write comprehensive tests for new features
- Update documentation for user-facing changes
- Ensure Docker builds pass before submitting PRs

### Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) to understand our community standards.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- **All-Hands-AI Team** for creating and maintaining this innovative platform
- **Open Source Community** for contributions and feedback
- **AI Research Community** for advancing the field of autonomous software development
- **Docker, E2B, Daytona, and Runloop** for providing robust runtime environments

## 📞 Support & Contact

- **Documentation**: [docs.all-hands.dev](https://docs.all-hands.dev)
- **GitHub Issues**: [Report bugs and request features](https://github.com/All-Hands-AI/OpenHands/issues)
- **Slack Community**: [Join our Slack](https://join.slack.com/t/openhands-ai/shared_invite/zt-3847of6xi-xuYJIPa6YIPg4ElbDWbtSA)
- **Discord**: [Join our Discord](https://discord.gg/ESHStjSjD4)
- **Commercial Support**: Fill out our [Design Partner form](https://docs.google.com/forms/d/e/1FAIpQLSet3VbGaz8z32gW9Wm-Grl4jpt5WgMXPgJ4EDPVmCETCBpJtQ/viewform) for enterprise inquiries

## 🚀 What's Next?

OpenHands is actively developed with regular releases. Check out our:

- **Roadmap**: See planned features and improvements
- **Benchmarks**: View our latest [performance scores](https://docs.google.com/spreadsheets/d/1wOUdFCMyY6Nt0AIqF705KN4JKOWgeI4wUGUP60krXXs/edit?gid=0#gid=0)
- **Research Paper**: Read our [arXiv publication](https://arxiv.org/abs/2407.16741)
- **Success Stories**: Explore real-world use cases and implementations

---

*OpenHands - Empowering developers with AI-powered autonomous coding capabilities. Code less, make more.* 🤖✨