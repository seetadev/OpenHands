import { renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { useIsOnTosPage } from '../../../frontend/src/hooks/use-is-on-tos-page';

const renderHookWithRouter = (initialPath: string) => {
  return renderHook(() => useIsOnTosPage(), {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={[initialPath]}>
        {children}
      </MemoryRouter>
    ),
  });
};

describe('useIsOnTosPage', () => {
  it('should return true when on ToS page', () => {
    const { result } = renderHookWithRouter('/accept-tos');
    expect(result.current).toBe(true);
  });

  it('should return false when on home page', () => {
    const { result } = renderHookWithRouter('/');
    expect(result.current).toBe(false);
  });

  it('should return false when on settings page', () => {
    const { result } = renderHookWithRouter('/settings');
    expect(result.current).toBe(false);
  });

  it('should return false when on any other page', () => {
    const { result } = renderHookWithRouter('/some-other-page');
    expect(result.current).toBe(false);
  });

  it('should handle paths with query parameters', () => {
    const { result } = renderHookWithRouter('/accept-tos?redirect=/dashboard');
    expect(result.current).toBe(false); // exact match required
  });

  it('should handle paths with trailing slashes', () => {
    const { result } = renderHookWithRouter('/accept-tos/');
    expect(result.current).toBe(false); // exact match required
  });
});