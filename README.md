# Rav

Rav is a modern personal blog built with Next.js 15, featuring MDX content management, internationalization support, and AI integration.

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Content**: MDX with enhanced features
- **Internationalization**: next-intl
- **AI Integration**: @ai-sdk/react and @ai-sdk/xai
- **Package Manager**: pnpm
- **Code Quality**: ESLint + Prettier
- **Deployment**: Docker support

## Key Features

- 🚀 Modern framework based on Next.js 15
- 📝 MDX content support with enhanced features
- 🌍 Internationalization support with next-intl
- 🤖 AI integration capabilities
- 🎨 Tailwind CSS styling system
- 📱 Responsive design
- 🔍 SEO optimization
- 🐳 Docker containerization support
- 📦 SVG optimization with SVGR
- 📊 RSS feed support

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 10.6.5+
- Docker (optional, for containerized deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/yikZero/Rav.git

# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm dev
```

The development server will start at http://localhost:11300.

### Build and Production

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

### Docker Deployment

```bash
# Build Docker image
docker build -t rav .

# Run Docker container
docker run -p 11300:11300 rav
```

## Project Structure

```
rav/
├── app/                # Next.js application directory
├── assets/            # Source assets
├── components/        # React components
├── content/           # MDX content files
├── fonts/            # Custom fonts
├── i18n/             # Internationalization config
├── lib/              # Utility functions and shared code
├── messages/         # Internationalization messages
├── public/           # Static assets
└── ...
```

## Development Guide

### Code Style

- ESLint for code linting
- Prettier for code formatting
- TypeScript strict mode
- Import sorting with @trivago/prettier-plugin-sort-imports

### SVG Optimization

```bash
# Generate optimized SVG components
pnpm svg
```

## License

[MIT](https://github.com/yikZero/Rav/blob/main/LICENSE)
