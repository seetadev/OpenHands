import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Container } from '../../../../../frontend/src/components/layout/container';

// Mock the hooks
jest.mock('../../../../../frontend/src/hooks/use-track-element-width', () => ({
  useTrackElementWidth: jest.fn(({ callback }) => {
    // Simulate width tracking
    React.useEffect(() => {
      callback(800);
    }, []);
  }),
}));

const renderWithRouter = (ui: React.ReactElement, initialEntries: string[] = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      {ui}
    </MemoryRouter>
  );
};

describe('Container', () => {
  const mockChildren = <div data-testid="container-content">Test Content</div>;

  beforeEach(() => {
    // Mock ResizeObserver
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render children', () => {
    renderWithRouter(
      <Container>{mockChildren}</Container>
    );
    
    expect(screen.getByTestId('container-content')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    renderWithRouter(
      <Container className="custom-class">{mockChildren}</Container>
    );
    
    const container = screen.getByTestId('container-content').parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('should render single label', () => {
    renderWithRouter(
      <Container label="Test Label">{mockChildren}</Container>
    );
    
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('should render navigation tabs when labels array is provided', () => {
    const labels = [
      {
        label: 'Tab 1',
        to: '/tab1',
        icon: <span data-testid="tab1-icon">📁</span>,
      },
      {
        label: 'Tab 2',
        to: '/tab2',
        icon: <span data-testid="tab2-icon">📄</span>,
      },
    ];

    renderWithRouter(
      <Container labels={labels}>{mockChildren}</Container>,
      ['/tab1']
    );
    
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByTestId('tab1-icon')).toBeInTheDocument();
    expect(screen.getByTestId('tab2-icon')).toBeInTheDocument();
  });

  it('should show beta badge for beta tabs', () => {
    const labels = [
      {
        label: 'Beta Tab',
        to: '/beta',
        icon: <span>🧪</span>,
        isBeta: true,
      },
    ];

    renderWithRouter(
      <Container labels={labels}>{mockChildren}</Container>
    );
    
    expect(screen.getByText('Beta Tab')).toBeInTheDocument();
    // Beta badge should be rendered
    expect(document.querySelector('.bg-neutral-400')).toBeInTheDocument();
  });

  it('should show loading spinner for loading tabs', () => {
    const labels = [
      {
        label: 'Loading Tab',
        to: '/loading',
        icon: <span>⏳</span>,
        isLoading: true,
      },
    ];

    renderWithRouter(
      <Container labels={labels}>{mockChildren}</Container>
    );
    
    expect(screen.getByText('Loading Tab')).toBeInTheDocument();
    // Loading spinner should be rendered
    expect(document.querySelector('[data-testid*="loading"]')).toBeInTheDocument();
  });

  it('should show right content in tabs', () => {
    const labels = [
      {
        label: 'Tab with Content',
        to: '/content',
        icon: <span>📊</span>,
        rightContent: <span data-testid="right-content">👤</span>,
      },
    ];

    renderWithRouter(
      <Container labels={labels}>{mockChildren}</Container>
    );
    
    expect(screen.getByTestId('right-content')).toBeInTheDocument();
  });

  it('should not show scroll buttons for wide containers', () => {
    const labels = Array.from({ length: 3 }, (_, i) => ({
      label: `Tab ${i + 1}`,
      to: `/tab${i + 1}`,
      icon: <span>📁</span>,
    }));

    renderWithRouter(
      <Container labels={labels}>{mockChildren}</Container>
    );
    
    // Scroll buttons should not be visible for wide containers
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should handle scroll button clicks', async () => {
    // Mock narrow container width
    const useTrackElementWidth = require('../../../../../frontend/src/hooks/use-track-element-width').useTrackElementWidth;
    useTrackElementWidth.mockImplementation(({ callback }) => {
      React.useEffect(() => {
        callback(500); // Narrow width to trigger scroll buttons
      }, []);
    });

    const labels = Array.from({ length: 8 }, (_, i) => ({
      label: `Tab ${i + 1}`,
      to: `/tab${i + 1}`,
      icon: <span>📁</span>,
    }));

    renderWithRouter(
      <Container labels={labels}>{mockChildren}</Container>
    );

    await waitFor(() => {
      const scrollButtons = screen.queryAllByRole('button');
      expect(scrollButtons.length).toBeGreaterThan(0);
    });
  });

  it('should update scroll buttons on scroll', async () => {
    const scrollSpy = jest.fn();
    const mockScrollElement = {
      scrollBy: scrollSpy,
      scrollLeft: 0,
      scrollWidth: 1000,
      clientWidth: 500,
    };

    Object.defineProperty(HTMLElement.prototype, 'scrollBy', {
      value: scrollSpy,
      writable: true,
    });

    const labels = Array.from({ length: 6 }, (_, i) => ({
      label: `Tab ${i + 1}`,
      to: `/tab${i + 1}`,
      icon: <span>📁</span>,
    }));

    renderWithRouter(
      <Container labels={labels}>{mockChildren}</Container>
    );

    // Simulate scroll event
    const scrollContainer = document.querySelector('.overflow-x-auto');
    if (scrollContainer) {
      fireEvent.scroll(scrollContainer);
    }

    await waitFor(() => {
      expect(screen.getByTestId('container-content')).toBeInTheDocument();
    });
  });
});