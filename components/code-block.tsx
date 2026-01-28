'use client';

import { Highlight, type PrismTheme } from 'prism-react-renderer';
import { Children, isValidElement } from 'react';

// Custom theme matching blog's brand colors (hue ~259)
const customTheme: PrismTheme = {
  plain: {
    color: 'oklch(0.85 0 0)', // --color-strong
    backgroundColor: 'oklch(0.21 0.025 259.58)', // slightly lighter than --color-background
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: { color: 'oklch(0.45 0 0)' }, // --color-weak
    },
    {
      types: ['punctuation'],
      style: { color: 'oklch(0.65 0 0)' }, // --color-soft
    },
    {
      types: ['property', 'tag', 'boolean', 'number', 'constant', 'symbol', 'deleted'],
      style: { color: 'oklch(0.68 0.1 259.815)' }, // --color-brand-500 (reduced chroma)
    },
    {
      types: ['selector', 'attr-name', 'string', 'char', 'builtin', 'inserted'],
      style: { color: 'oklch(0.81 0.07 251.813)' }, // --color-brand-300 (reduced chroma)
    },
    {
      types: ['operator', 'entity', 'url'],
      style: { color: 'oklch(0.85 0.15 60)' }, // orange accent
    },
    {
      types: ['atrule', 'attr-value', 'keyword'],
      style: { color: 'oklch(0.74 0.07 254.624)' }, // --color-brand-400 (reduced chroma)
    },
    {
      types: ['function', 'class-name'],
      style: { color: 'oklch(0.85 0.12 340)' }, // pink accent
    },
    {
      types: ['regex', 'important', 'variable'],
      style: { color: 'oklch(0.85 0.15 60)' }, // orange accent
    },
  ],
};

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

export default function Pre({ children }: PreProps) {
  const codeElement = Children.toArray(children).find(isCodeElement);

  if (!codeElement) {
    return <pre>{children}</pre>;
  }

  const code = codeElement.props.children?.trim() || '';
  const language = parseLanguage(codeElement.props.className || '');

  return (
    <Highlight theme={customTheme} code={code} language={language}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre style={style} aria-label={`Code block in ${language}`}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
