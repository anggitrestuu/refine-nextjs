// src/components/chat/MarkdownMessage.tsx
import { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Box, Typography, Button, keyframes } from '@mui/material';
import 'katex/dist/katex.min.css';

const blinkAnimation = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

interface MarkdownMessageProps {
  content: string;
  isStreaming?: boolean;
}

export const MarkdownMessage = memo(
  ({ content, isStreaming }: MarkdownMessageProps) => {
    const components = {
      h1: ({ children }: { children: React.ReactNode }) => (
        <Typography variant="h4" sx={{ my: 2, fontWeight: 'bold' }}>
          {children}
        </Typography>
      ),
      h2: ({ children }: { children: React.ReactNode }) => (
        <Typography variant="h5" sx={{ my: 1.5, fontWeight: 'semibold' }}>
          {children}
        </Typography>
      ),
      h3: ({ children }: { children: React.ReactNode }) => (
        <Typography variant="h6" sx={{ my: 1, fontWeight: 'medium' }}>
          {children}
        </Typography>
      ),
      p: ({ children }: { children: React.ReactNode }) => (
        <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.6 }}>
          {children}
        </Typography>
      ),
      a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
        <Typography
          component="a"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            textDecoration: 'underline',
            textUnderlineOffset: '2px',
            textDecorationThickness: '2px',
            opacity: 0.9,
            '&:hover': { opacity: 1 },
          }}
        >
          {children}
        </Typography>
      ),
      blockquote: ({ children }: { children: React.ReactNode }) => (
        <Box
          sx={{
            borderLeft: 4,
            borderColor: 'current',
            pl: 2,
            my: 2,
            fontStyle: 'italic',
            opacity: 0.9,
          }}
        >
          {children}
        </Box>
      ),
      ul: ({ children }: { children: React.ReactNode }) => (
        <Box
          component="ul"
          sx={{ my: 2, ml: 2, listStyle: 'disc', '& > *': { my: 1 } }}
        >
          {children}
        </Box>
      ),
      ol: ({ children }: { children: React.ReactNode }) => (
        <Box
          component="ol"
          sx={{ my: 2, ml: 2, listStyle: 'decimal', '& > *': { my: 1 } }}
        >
          {children}
        </Box>
      ),
      li: ({ children }: { children: React.ReactNode }) => (
        <Box component="li" sx={{ ml: 2 }}>
          {children}
        </Box>
      ),
      code({ node, inline, className, children, ...props }: any) {
        const match = /language-(\w+)/.exec(className || '');

        if (inline) {
          return (
            <Box
              component="code"
              sx={{
                px: 0.75,
                py: 0.25,
                borderRadius: 1,
                bgcolor: 'action.hover',
                fontFamily: 'monospace',
                fontSize: '0.875em',
                wordBreak: 'break-word',
              }}
            >
              {children}
            </Box>
          );
        }

        if (match) {
          return (
            <Box
              sx={{
                position: 'relative',
                my: 2,
                '&:hover button': { opacity: 1 },
              }}
            >
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                {...props}
                customStyle={{
                  margin: 0,
                  borderRadius: '8px',
                }}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
              <Button
                onClick={() => navigator.clipboard.writeText(String(children))}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  opacity: 0,
                  transition: 'opacity 0.2s',
                  bgcolor: 'grey.800',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'grey.700',
                  },
                  fontSize: '0.75rem',
                  py: 0.5,
                }}
              >
                Copy
              </Button>
            </Box>
          );
        }

        return (
          <Box
            component="code"
            sx={{
              px: 0.75,
              py: 0.25,
              borderRadius: 1,
              bgcolor: 'action.hover',
              fontFamily: 'monospace',
              fontSize: '0.875em',
            }}
          >
            {children}
          </Box>
        );
      },
    };

    return (
      <Box className={isStreaming ? 'streaming' : ''}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm, [remarkMath, { singleDollar: true }]]}
          rehypePlugins={[rehypeKatex as any]}
          components={components as any}
        >
          {content}
        </ReactMarkdown>
        {isStreaming && (
          <Box
            component="span"
            sx={{
              display: 'inline-block',
              width: '0.5rem',
              height: '1rem',
              bgcolor: 'text.primary',
              ml: 0.5,
              animation: `${blinkAnimation} 1s infinite`,
            }}
          />
        )}
      </Box>
    );
  }
);
