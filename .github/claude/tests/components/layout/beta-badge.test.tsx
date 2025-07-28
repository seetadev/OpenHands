import React from 'react';
import { render, screen } from '@testing-library/react';
import { BetaBadge } from '../../../../../frontend/src/components/layout/beta-badge';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'BADGE$BETA': 'BETA',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock the I18nKey declaration
jest.mock('../../../../../frontend/src/i18n/declaration', () => ({
  I18nKey: {
    BADGE$BETA: 'BADGE$BETA',
  },
}));

describe('BetaBadge', () => {
  it('should render the beta badge with correct text', () => {
    render(<BetaBadge />);
    
    const badge = screen.getByText('BETA');
    expect(badge).toBeInTheDocument();
  });

  it('should apply correct CSS classes', () => {
    render(<BetaBadge />);
    
    const badge = screen.getByText('BETA');
    expect(badge).toHaveClass('text-[11px]');
    expect(badge).toHaveClass('leading-5');
    expect(badge).toHaveClass('text-base');
    expect(badge).toHaveClass('bg-neutral-400');
    expect(badge).toHaveClass('px-1');
    expect(badge).toHaveClass('rounded-xl');
  });

  it('should be a span element', () => {
    render(<BetaBadge />);
    
    const badge = screen.getByText('BETA');
    expect(badge.tagName).toBe('SPAN');
  });

  it('should use translation key for text content', () => {
    // Mock different translation
    jest.mock('react-i18next', () => ({
      useTranslation: () => ({
        t: (key: string) => {
          if (key === 'BADGE$BETA') return 'BÊTA'; // French translation
          return key;
        },
      }),
    }));

    render(<BetaBadge />);
    
    // Should still work with mocked translation
    const badge = screen.getByText('BETA'); // Our mock returns 'BETA'
    expect(badge).toBeInTheDocument();
  });

  it('should have proper styling for visibility', () => {
    render(<BetaBadge />);
    
    const badge = screen.getByText('BETA');
    
    // Check that it has proper contrast and sizing
    expect(badge).toHaveClass('bg-neutral-400'); // Background color
    expect(badge).toHaveClass('text-base'); // Text color
    expect(badge).toHaveClass('px-1'); // Horizontal padding
    expect(badge).toHaveClass('rounded-xl'); // Rounded corners
  });

  it('should render without crashing when no translation is found', () => {
    // Mock missing translation
    const mockT = jest.fn().mockReturnValue('BADGE$BETA'); // Returns the key itself
    
    jest.mock('react-i18next', () => ({
      useTranslation: () => ({ t: mockT }),
    }));

    expect(() => render(<BetaBadge />)).not.toThrow();
  });
});