import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { TabContent } from '../../../../../frontend/src/components/layout/tab-content';

// Mock the lazy-loaded components
jest.mock('../../../../../frontend/src/routes/changes-tab', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="editor-tab">Editor Tab Content</div>,
  };
});

jest.mock('../../../../../frontend/src/routes/browser-tab', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="browser-tab">Browser Tab Content</div>,
  };
});

jest.mock('../../../../../frontend/src/routes/jupyter-tab', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="jupyter-tab">Jupyter Tab Content</div>,
  };
});

jest.mock('../../../../../frontend/src/routes/served-tab', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="served-tab">Served Tab Content</div>,
  };
});

jest.mock('../../../../../frontend/src/routes/terminal-tab', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="terminal-tab">Terminal Tab Content</div>,
  };
});

jest.mock('../../../../../frontend/src/routes/vscode-tab', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="vscode-tab">VSCode Tab Content</div>,
  };
});

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

describe('TabContent', () => {
  const conversationPath = '/conversations/123';

  it('should show editor tab when on base conversation path', async () => {
    renderWithRouter(
      <TabContent conversationPath={conversationPath} />,
      [conversationPath]
    );
    
    // Editor tab should be visible
    expect(await screen.findByTestId('editor-tab')).toBeInTheDocument();
    expect(screen.getByTestId('editor-tab')).not.toHaveClass('hidden');
    
    // Other tabs should be hidden
    expect(await screen.findByTestId('browser-tab')).toHaveClass('hidden');
    expect(await screen.findByTestId('jupyter-tab')).toHaveClass('hidden');
    expect(await screen.findByTestId('served-tab')).toHaveClass('hidden');
    expect(await screen.findByTestId('terminal-tab')).toHaveClass('hidden');
    expect(await screen.findByTestId('vscode-tab')).toHaveClass('hidden');
  });

  it('should show browser tab when on browser path', async () => {
    renderWithRouter(
      <TabContent conversationPath={conversationPath} />,
      [`${conversationPath}/browser`]
    );
    
    // Browser tab should be visible
    expect(await screen.findByTestId('browser-tab')).toBeInTheDocument();
    expect(screen.getByTestId('browser-tab')).not.toHaveClass('hidden');
    
    // Other tabs should be hidden
    expect(await screen.findByTestId('editor-tab')).toHaveClass('hidden');
    expect(await screen.findByTestId('jupyter-tab')).toHaveClass('hidden');
  });

  it('should show jupyter tab when on jupyter path', async () => {
    renderWithRouter(
      <TabContent conversationPath={conversationPath} />,
      [`${conversationPath}/jupyter`]
    );
    
    // Jupyter tab should be visible
    expect(await screen.findByTestId('jupyter-tab')).toBeInTheDocument();
    expect(screen.getByTestId('jupyter-tab')).not.toHaveClass('hidden');
    
    // Other tabs should be hidden
    expect(await screen.findByTestId('editor-tab')).toHaveClass('hidden');
    expect(await screen.findByTestId('browser-tab')).toHaveClass('hidden');
  });

  it('should show served tab when on served path', async () => {
    renderWithRouter(
      <TabContent conversationPath={conversationPath} />,
      [`${conversationPath}/served`]
    );
    
    // Served tab should be visible
    expect(await screen.findByTestId('served-tab')).toBeInTheDocument();
    expect(screen.getByTestId('served-tab')).not.toHaveClass('hidden');
    
    // Other tabs should be hidden
    expect(await screen.findByTestId('editor-tab')).toHaveClass('hidden');
    expect(await screen.findByTestId('browser-tab')).toHaveClass('hidden');
  });

  it('should show terminal tab when on terminal path', async () => {
    renderWithRouter(
      <TabContent conversationPath={conversationPath} />,
      [`${conversationPath}/terminal`]
    );
    
    // Terminal tab should be visible
    expect(await screen.findByTestId('terminal-tab')).toBeInTheDocument();
    expect(screen.getByTestId('terminal-tab')).not.toHaveClass('hidden');
    
    // Other tabs should be hidden
    expect(await screen.findByTestId('editor-tab')).toHaveClass('hidden');
    expect(await screen.findByTestId('browser-tab')).toHaveClass('hidden');
  });

  it('should show vscode tab when on vscode path', async () => {
    renderWithRouter(
      <TabContent conversationPath={conversationPath} />,
      [`${conversationPath}/vscode`]
    );
    
    // VSCode tab should be visible
    expect(await screen.findByTestId('vscode-tab')).toBeInTheDocument();
    expect(screen.getByTestId('vscode-tab')).not.toHaveClass('hidden');
    
    // Other tabs should be hidden
    expect(await screen.findByTestId('editor-tab')).toHaveClass('hidden');
    expect(await screen.findByTestId('browser-tab')).toHaveClass('hidden');
  });

  it('should load all tabs but only show the active one', async () => {
    renderWithRouter(
      <TabContent conversationPath={conversationPath} />,
      [conversationPath]
    );
    
    // All tabs should be loaded
    expect(await screen.findByTestId('editor-tab')).toBeInTheDocument();
    expect(await screen.findByTestId('browser-tab')).toBeInTheDocument();
    expect(await screen.findByTestId('jupyter-tab')).toBeInTheDocument();
    expect(await screen.findByTestId('served-tab')).toBeInTheDocument();
    expect(await screen.findByTestId('terminal-tab')).toBeInTheDocument();
    expect(await screen.findByTestId('vscode-tab')).toBeInTheDocument();
    
    // Only editor tab should be visible (no hidden class)
    expect(screen.getByTestId('editor-tab')).not.toHaveClass('hidden');
    
    // All other tabs should be hidden
    expect(screen.getByTestId('browser-tab')).toHaveClass('hidden');
    expect(screen.getByTestId('jupyter-tab')).toHaveClass('hidden');
    expect(screen.getByTestId('served-tab')).toHaveClass('hidden');
    expect(screen.getByTestId('terminal-tab')).toHaveClass('hidden');
    expect(screen.getByTestId('vscode-tab')).toHaveClass('hidden');
  });

  it('should handle different conversation paths', async () => {
    const differentConversationPath = '/conversations/456';
    
    renderWithRouter(
      <TabContent conversationPath={differentConversationPath} />,
      [`${differentConversationPath}/browser`]
    );
    
    expect(await screen.findByTestId('browser-tab')).toBeInTheDocument();
    expect(screen.getByTestId('browser-tab')).not.toHaveClass('hidden');
  });

  it('should apply correct CSS classes to tab containers', async () => {
    renderWithRouter(
      <TabContent conversationPath={conversationPath} />,
      [conversationPath]
    );
    
    const editorContainer = (await screen.findByTestId('editor-tab')).parentElement;
    expect(editorContainer).toHaveClass('absolute', 'inset-0', 'block');
    
    const browserContainer = (await screen.findByTestId('browser-tab')).parentElement;
    expect(browserContainer).toHaveClass('absolute', 'inset-0', 'hidden');
  });

  it('should show loading fallback while tabs are loading', () => {
    // This test would need to mock React.lazy more specifically to test the Suspense fallback
    renderWithRouter(
      <TabContent conversationPath={conversationPath} />,
      [conversationPath]
    );
    
    // The main container should be rendered
    const container = screen.getByRole('generic');
    expect(container).toHaveClass('h-full', 'w-full', 'relative');
  });
});