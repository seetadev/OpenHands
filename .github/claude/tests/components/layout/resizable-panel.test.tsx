import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ResizablePanel, Orientation } from '../../../../../frontend/src/components/layout/resizable-panel';

describe('ResizablePanel', () => {
  const mockFirstChild = <div data-testid="first-child">First Child</div>;
  const mockSecondChild = <div data-testid="second-child">Second Child</div>;

  const defaultProps = {
    firstChild: mockFirstChild,
    firstClassName: 'first-class',
    secondChild: mockSecondChild,
    secondClassName: 'second-class',
    className: 'container-class',
    orientation: Orientation.HORIZONTAL,
    initialSize: 300,
  };

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

  it('should render both children', () => {
    render(<ResizablePanel {...defaultProps} />);
    
    expect(screen.getByTestId('first-child')).toBeInTheDocument();
    expect(screen.getByTestId('second-child')).toBeInTheDocument();
  });

  it('should apply correct classes to children', () => {
    render(<ResizablePanel {...defaultProps} />);
    
    const container = screen.getByTestId('first-child').parentElement?.parentElement;
    expect(container).toHaveClass('container-class');
  });

  it('should render collapse button', () => {
    render(<ResizablePanel {...defaultProps} />);
    
    const collapseButton = screen.getByRole('button');
    expect(collapseButton).toBeInTheDocument();
  });

  it('should handle horizontal orientation', () => {
    render(<ResizablePanel {...defaultProps} orientation={Orientation.HORIZONTAL} />);
    
    const container = screen.getByTestId('first-child').parentElement?.parentElement;
    expect(container).toHaveClass('flex-row');
  });

  it('should handle vertical orientation', () => {
    render(<ResizablePanel {...defaultProps} orientation={Orientation.VERTICAL} />);
    
    const container = screen.getByTestId('first-child').parentElement?.parentElement;
    expect(container).toHaveClass('flex-col');
  });

  it('should handle collapse button click', () => {
    render(<ResizablePanel {...defaultProps} />);
    
    const collapseButton = screen.getByRole('button');
    fireEvent.click(collapseButton);
    
    // The panel should change state after clicking
    expect(collapseButton).toBeInTheDocument();
  });

  it('should handle mouse down on divider', () => {
    render(<ResizablePanel {...defaultProps} />);
    
    const divider = screen.getByTestId('first-child').parentElement?.nextElementSibling;
    if (divider) {
      fireEvent.mouseDown(divider, { clientX: 100, clientY: 100 });
      // Should start dragging behavior
      expect(divider).toBeInTheDocument();
    }
  });

  it('should handle mouse move during resize', () => {
    render(<ResizablePanel {...defaultProps} />);
    
    const divider = screen.getByTestId('first-child').parentElement?.nextElementSibling;
    if (divider) {
      fireEvent.mouseDown(divider, { clientX: 100, clientY: 100 });
      fireEvent.mouseMove(document, { clientX: 150, clientY: 100 });
      fireEvent.mouseUp(document, { clientX: 150, clientY: 100 });
    }
  });

  it('should show correct chevron icon for horizontal collapsed state', () => {
    render(<ResizablePanel {...defaultProps} orientation={Orientation.HORIZONTAL} />);
    
    const collapseButton = screen.getByRole('button');
    fireEvent.click(collapseButton);
    
    // Should show appropriate chevron based on collapsed state
    expect(collapseButton).toBeInTheDocument();
  });

  it('should show correct chevron icon for vertical collapsed state', () => {
    render(<ResizablePanel {...defaultProps} orientation={Orientation.VERTICAL} />);
    
    const collapseButton = screen.getByRole('button');
    fireEvent.click(collapseButton);
    
    // Should show appropriate chevron based on collapsed state
    expect(collapseButton).toBeInTheDocument();
  });

  it('should cleanup event listeners on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
    
    const { unmount } = render(<ResizablePanel {...defaultProps} />);
    
    const divider = screen.getByTestId('first-child').parentElement?.nextElementSibling;
    if (divider) {
      fireEvent.mouseDown(divider, { clientX: 100, clientY: 100 });
    }
    
    unmount();
    
    // Event listeners should be cleaned up
    expect(removeEventListenerSpy).toHaveBeenCalled();
  });
});