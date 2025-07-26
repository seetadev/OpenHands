import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { NavTab } from '../../../../../frontend/src/components/layout/nav-tab';

// Mock the beta badge and loading spinner components
jest.mock('../../../../../frontend/src/components/layout/beta-badge', () => ({
  BetaBadge: () => <span data-testid="beta-badge">BETA</span>,
}));

jest.mock('../../../../../frontend/src/components/shared/loading-spinner', () => ({
  LoadingSpinner: ({ size }: { size: string }) => (
    <div data-testid={`loading-spinner-${size}`}>Loading...</div>
  ),
}));

const renderWithRouter = (
  ui: React.ReactElement,
  initialEntries: string[] = ['/']
) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      {ui}
    </MemoryRouter>
  );
};

describe('NavTab', () => {
  const defaultProps = {
    to: '/test',
    label: 'Test Tab',
    icon: <span data-testid="tab-icon">📁</span>,
  };

  it('should render tab with label and icon', () => {
    renderWithRouter(<NavTab {...defaultProps} />);
    
    expect(screen.getByText('Test Tab')).toBeInTheDocument();
    expect(screen.getByTestId('tab-icon')).toBeInTheDocument();
  });

  it('should render as a link to the correct path', () => {
    renderWithRouter(<NavTab {...defaultProps} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/test');
  });

  it('should show active state when current path matches', () => {
    renderWithRouter(
      <NavTab {...defaultProps} />,
      ['/test']
    );
    
    const icon = screen.getByTestId('tab-icon');
    expect(icon.parentElement).toHaveClass('text-logo');
  });

  it('should not show active state when path does not match', () => {
    renderWithRouter(
      <NavTab {...defaultProps} />,
      ['/other']
    );
    
    const icon = screen.getByTestId('tab-icon');
    expect(icon.parentElement).not.toHaveClass('text-logo');
  });

  it('should render beta badge when isBeta is true', () => {
    renderWithRouter(
      <NavTab {...defaultProps} isBeta={true} />
    );
    
    expect(screen.getByTestId('beta-badge')).toBeInTheDocument();
    expect(screen.getByText('BETA')).toBeInTheDocument();
  });

  it('should not render beta badge when isBeta is false', () => {
    renderWithRouter(
      <NavTab {...defaultProps} isBeta={false} />
    );
    
    expect(screen.queryByTestId('beta-badge')).not.toBeInTheDocument();
  });

  it('should render loading spinner when isLoading is true', () => {
    renderWithRouter(
      <NavTab {...defaultProps} isLoading={true} />
    );
    
    expect(screen.getByTestId('loading-spinner-small')).toBeInTheDocument();
  });

  it('should not render loading spinner when isLoading is false', () => {
    renderWithRouter(
      <NavTab {...defaultProps} isLoading={false} />
    );
    
    expect(screen.queryByTestId('loading-spinner-small')).not.toBeInTheDocument();
  });

  it('should render right content when provided', () => {
    const rightContent = <button data-testid="right-button">Action</button>;
    
    renderWithRouter(
      <NavTab {...defaultProps} rightContent={rightContent} />
    );
    
    expect(screen.getByTestId('right-button')).toBeInTheDocument();
  });

  it('should handle React node as label', () => {
    const labelNode = (
      <div data-testid="custom-label">
        <span>Custom</span>
        <strong>Label</strong>
      </div>
    );
    
    renderWithRouter(
      <NavTab {...defaultProps} label={labelNode} />
    );
    
    expect(screen.getByTestId('custom-label')).toBeInTheDocument();
    expect(screen.getByText('Custom')).toBeInTheDocument();
    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  it('should render all elements together', () => {
    const rightContent = <span data-testid="count">5</span>;
    
    renderWithRouter(
      <NavTab
        {...defaultProps}
        isBeta={true}
        isLoading={true}
        rightContent={rightContent}
      />
    );
    
    expect(screen.getByText('Test Tab')).toBeInTheDocument();
    expect(screen.getByTestId('tab-icon')).toBeInTheDocument();
    expect(screen.getByTestId('beta-badge')).toBeInTheDocument();
    expect(screen.getByTestId('loading-spinner-small')).toBeInTheDocument();
    expect(screen.getByTestId('count')).toBeInTheDocument();
  });

  it('should apply correct CSS classes', () => {
    renderWithRouter(<NavTab {...defaultProps} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveClass('px-2');
    expect(link).toHaveClass('border-b');
    expect(link).toHaveClass('border-r');
    expect(link).toHaveClass('bg-base-secondary');
  });

  it('should truncate long labels', () => {
    const longLabel = 'This is a very long tab label that should be truncated';
    
    renderWithRouter(
      <NavTab {...defaultProps} label={longLabel} />
    );
    
    const labelElement = screen.getByText(longLabel);
    expect(labelElement).toHaveClass('truncate');
  });
});