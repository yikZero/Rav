# Rav

Rav is my personal blog built with Next.js 15, featuring MDX content management and internationalization support.

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Content**: MDX
- **Internationalization**: next-intl
- **Package Manager**: pnpm
- **Code Quality**: ESLint + Prettier

## Key Features

- 🚀 Modern framework based on Next.js 15
- 📝 MDX content support
- 🌍 Internationalization support
- 🎨 Tailwind CSS styling system
- 📱 Responsive design
- 🔍 SEO optimization

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 10.6.5+
- Enable corepack:
  ```bash
  corepack enable
  ```

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

The development server will start at http://localhost:12300.

### Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## Project Structure

```
rav/
├── app/                # Next.js application directory
├── content/           # MDX content files
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

## License

[MIT](https://github.com/yikZero/Rav/blob/main/LICENSE)
