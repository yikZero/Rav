'use client';

import { Highlight, type PrismTheme } from 'prism-react-renderer';
import { Children, isValidElement } from 'react';

// Custom theme matching blog's brand colors (hue ~259)
const customTheme: PrismTheme = {
  plain: {
    color: 'oklch(0.85 0 0)', // --color-strong
    backgroundColor: 'oklch(0.16 0.025 259.58)', // slightly lighter than --color-background
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
      style: { color: 'oklch(0.623 0.214 259.815)' }, // --color-brand-500
    },
    {
      types: ['selector', 'attr-name', 'string', 'char', 'builtin', 'inserted'],
      style: { color: 'oklch(0.809 0.105 251.813)' }, // --color-brand-300
    },
    {
      types: ['operator', 'entity', 'url'],
      style: { color: 'oklch(0.85 0.15 60)' }, // orange accent
    },
    {
      types: ['atrule', 'attr-value', 'keyword'],
      style: { color: 'oklch(0.707 0.165 254.624)' }, // --color-brand-400
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

export default function Pre({ children }: PreProps) {
  const codeElement = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === 'code'
  ) as React.ReactElement<CodeProps> | undefined;

  if (!codeElement) {
    return <pre>{children}</pre>;
  }

  const code = codeElement.props.children?.trim() || '';
  const className = codeElement.props.className || '';
  const language = className.replace(/language-/, '') || 'text';

  return (
    <Highlight theme={customTheme} code={code} language={language}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre style={style}>
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
