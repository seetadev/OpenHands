import { isOnTosPage } from '../../../frontend/src/utils/is-on-tos-page';

// Mock window object
const mockWindow = {
  location: {
    pathname: '/',
  },
};

Object.defineProperty(window, 'location', {
  value: mockWindow.location,
  writable: true,
});

describe('isOnTosPage', () => {
  afterEach(() => {
    // Reset window.location
    mockWindow.location.pathname = '/';
  });

  describe('with pathname parameter', () => {
    it('should return true when pathname is /accept-tos', () => {
      const result = isOnTosPage('/accept-tos');
      expect(result).toBe(true);
    });

    it('should return false when pathname is not /accept-tos', () => {
      const result = isOnTosPage('/home');
      expect(result).toBe(false);
    });

    it('should return false when pathname is empty string', () => {
      const result = isOnTosPage('');
      expect(result).toBe(false);
    });

    it('should return false when pathname is /', () => {
      const result = isOnTosPage('/');
      expect(result).toBe(false);
    });

    it('should handle trailing slash correctly', () => {
      const result = isOnTosPage('/accept-tos/');
      expect(result).toBe(false);
    });

    it('should handle query parameters correctly', () => {
      const result = isOnTosPage('/accept-tos?redirect=/dashboard');
      expect(result).toBe(false);
    });
  });

  describe('without pathname parameter (using window.location)', () => {
    it('should return true when window.location.pathname is /accept-tos', () => {
      mockWindow.location.pathname = '/accept-tos';
      const result = isOnTosPage();
      expect(result).toBe(true);
    });

    it('should return false when window.location.pathname is not /accept-tos', () => {
      mockWindow.location.pathname = '/home';
      const result = isOnTosPage();
      expect(result).toBe(false);
    });

    it('should return false when window.location.pathname is /', () => {
      mockWindow.location.pathname = '/';
      const result = isOnTosPage();
      expect(result).toBe(false);
    });

    it('should handle complex paths', () => {
      mockWindow.location.pathname = '/dashboard/settings';
      const result = isOnTosPage();
      expect(result).toBe(false);
    });
  });

  describe('server-side rendering compatibility', () => {
    it('should return false when window is undefined', () => {
      const originalWindow = global.window;
      // @ts-ignore
      delete global.window;

      const result = isOnTosPage();
      expect(result).toBe(false);

      global.window = originalWindow;
    });
  });
});