import { type BundledLanguage, type ThemeRegistration, codeToHtml } from 'shiki';
import { Children, isValidElement } from 'react';

const customTheme: ThemeRegistration = {
  name: 'rav-dark',
  type: 'dark',
  colors: {
    'editor.background': '#1a1c2b',
    'editor.foreground': '#d4d4d4',
  },
  tokenColors: [
    {
      scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
      settings: { foreground: '#737373' },
    },
    {
      scope: ['punctuation', 'meta.brace', 'meta.delimiter'],
      settings: { foreground: '#a6a6a6' },
    },
    {
      scope: [
        'entity.name.tag',
        'constant',
        'constant.numeric',
        'constant.language',
        'variable.language',
        'support.constant',
        'keyword.other.unit',
        'constant.character.escape',
      ],
      settings: { foreground: '#7b82c7' },
    },
    {
      scope: [
        'string',
        'entity.other.attribute-name',
        'markup.inserted',
        'support.type.property-name',
        'meta.object-literal.key',
      ],
      settings: { foreground: '#b3c0e8' },
    },
    {
      scope: [
        'keyword.operator',
        'punctuation.definition.template-expression',
        'constant.other.color',
        'string.other.link',
      ],
      settings: { foreground: '#d9a66c' },
    },
    {
      scope: [
        'keyword',
        'storage',
        'storage.type',
        'support.type',
        'entity.other.inherited-class',
      ],
      settings: { foreground: '#9ba3d0' },
    },
    {
      scope: [
        'entity.name.function',
        'support.function',
        'entity.name.type',
        'entity.name.class',
        'meta.function-call',
      ],
      settings: { foreground: '#d9a0c0' },
    },
    {
      scope: ['string.regexp', 'keyword.other.important'],
      settings: { foreground: '#d9a66c' },
    },
    {
      scope: ['markup.deleted'],
      settings: { foreground: '#e06c75' },
    },
    {
      scope: ['markup.heading', 'markup.bold'],
      settings: { foreground: '#d4d4d4', fontStyle: 'bold' },
    },
    {
      scope: ['markup.italic'],
      settings: { fontStyle: 'italic' },
    },
  ],
};

const SUPPORTED_LANGS = new Set([
  'javascript', 'typescript', 'jsx', 'tsx', 'css', 'html', 'json',
  'bash', 'shell', 'sh', 'zsh', 'markdown', 'md', 'yaml', 'yml',
  'python', 'go', 'rust', 'sql', 'graphql', 'xml', 'swift', 'kotlin',
  'java', 'c', 'cpp', 'diff', 'toml', 'ini', 'dockerfile', 'ruby',
  'php', 'lua', 'makefile', 'plaintext', 'text',
]);

interface PreProps {
  children: React.ReactNode;
}

interface CodeProps {
  children?: string;
  className?: string;
}

function isCodeElement(child: React.ReactNode): child is React.ReactElement<CodeProps> {
  return isValidElement(child) && child.type === 'code';
}

function parseLanguage(className: string): string {
  const match = className.match(/language-(\w+)/);
  return match?.[1] || 'text';
}

export default async function Pre({ children }: PreProps) {
  const codeElement = Children.toArray(children).find(isCodeElement);

  if (!codeElement) {
    return <pre>{children}</pre>;
  }

  const code = codeElement.props.children?.trim() || '';
  const rawLang = parseLanguage(codeElement.props.className || '');
  const lang = SUPPORTED_LANGS.has(rawLang) ? rawLang : 'text';

  const html = await codeToHtml(code, {
    lang: lang as BundledLanguage,
    theme: customTheme,
  });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      aria-label={`Code block in ${rawLang}`}
    />
  );
}
