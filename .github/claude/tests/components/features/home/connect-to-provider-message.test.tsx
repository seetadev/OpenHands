import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ConnectToProviderMessage } from '../../../../../../frontend/src/components/features/home/connect-to-provider-message';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'HOME$CONNECT_PROVIDER_MESSAGE': 'Please connect to a provider to get started.',
        'SETTINGS$TITLE': 'Settings',
        'HOME$LOADING': 'Loading...',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock the settings hook
const mockUseSettings = {
  isLoading: false,
};

jest.mock('../../../../../../frontend/src/hooks/query/use-settings', () => ({
  useSettings: () => mockUseSettings,
}));

// Mock the brand button component
jest.mock('../../../../../../frontend/src/components/features/settings/brand-button', () => ({
  BrandButton: ({ 
    children, 
    isDisabled, 
    ...props 
  }: { 
    children: React.ReactNode; 
    isDisabled: boolean;
    type: string;
    variant: string;
  }) => (
    <button 
      {...props}
      disabled={isDisabled}
      data-testid="brand-button"
    >
      {children}
    </button>
  ),
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(
    <MemoryRouter>
      {ui}
    </MemoryRouter>
  );
};

describe('ConnectToProviderMessage', () => {
  beforeEach(() => {
    mockUseSettings.isLoading = false;
  });

  it('should render the connection message', () => {
    renderWithRouter(<ConnectToProviderMessage />);
    
    expect(screen.getByText('Please connect to a provider to get started.')).toBeInTheDocument();
  });

  it('should render settings button with correct text when not loading', () => {
    renderWithRouter(<ConnectToProviderMessage />);
    
    const button = screen.getByTestId('brand-button');
    expect(button).toHaveTextContent('Settings');
    expect(button).not.toBeDisabled();
  });

  it('should render loading text when loading', () => {
    mockUseSettings.isLoading = true;
    
    renderWithRouter(<ConnectToProviderMessage />);
    
    const button = screen.getByTestId('brand-button');
    expect(button).toHaveTextContent('Loading...');
    expect(button).toBeDisabled();
  });

  it('should link to settings integrations page', () => {
    renderWithRouter(<ConnectToProviderMessage />);
    
    const link = screen.getByTestId('navigate-to-settings-button');
    expect(link).toHaveAttribute('href', '/settings/integrations');
  });

  it('should disable button when loading', () => {
    mockUseSettings.isLoading = true;
    
    renderWithRouter(<ConnectToProviderMessage />);
    
    const button = screen.getByTestId('brand-button');
    expect(button).toBeDisabled();
  });

  it('should enable button when not loading', () => {
    mockUseSettings.isLoading = false;
    
    renderWithRouter(<ConnectToProviderMessage />);
    
    const button = screen.getByTestId('brand-button');
    expect(button).not.toBeDisabled();
  });

  it('should render with proper structure', () => {
    renderWithRouter(<ConnectToProviderMessage />);
    
    // Should have a div with flex flex-col gap-4 classes
    const container = screen.getByText('Please connect to a provider to get started.').parentElement;
    expect(container).toHaveClass('flex', 'flex-col', 'gap-4');
  });

  it('should handle button props correctly', () => {
    renderWithRouter(<ConnectToProviderMessage />);
    
    const button = screen.getByTestId('brand-button');
    expect(button).toHaveAttribute('type', 'button');
    // Note: We can't easily test the variant prop without mocking the component more deeply
  });

  it('should work with different loading states', () => {
    // Test transition from loading to not loading
    const { rerender } = renderWithRouter(<ConnectToProviderMessage />);
    
    // Initially not loading
    expect(screen.getByTestId('brand-button')).toHaveTextContent('Settings');
    expect(screen.getByTestId('brand-button')).not.toBeDisabled();
    
    // Change to loading
    mockUseSettings.isLoading = true;
    rerender(<ConnectToProviderMessage />);
    
    expect(screen.getByTestId('brand-button')).toHaveTextContent('Loading...');
    expect(screen.getByTestId('brand-button')).toBeDisabled();
    
    // Back to not loading
    mockUseSettings.isLoading = false;
    rerender(<ConnectToProviderMessage />);
    
    expect(screen.getByTestId('brand-button')).toHaveTextContent('Settings');
    expect(screen.getByTestId('brand-button')).not.toBeDisabled();
  });
});