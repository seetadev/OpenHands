import { extractNextPageFromLink } from '../../../frontend/src/utils/extract-next-page-from-link';

describe('extractNextPageFromLink', () => {
  it('should extract next page number from valid GitHub link header', () => {
    const link = '<https://api.github.com/user/repos?page=2>; rel="next", <https://api.github.com/user/repos?page=50>; rel="last"';
    const result = extractNextPageFromLink(link);
    expect(result).toBe(2);
  });

  it('should extract next page number when there are multiple parameters', () => {
    const link = '<https://api.github.com/user/repos?type=all&sort=updated&page=3&per_page=30>; rel="next"';
    const result = extractNextPageFromLink(link);
    expect(result).toBe(3);
  });

  it('should return null when there is no next page', () => {
    const link = '<https://api.github.com/user/repos?page=1>; rel="prev", <https://api.github.com/user/repos?page=50>; rel="last"';
    const result = extractNextPageFromLink(link);
    expect(result).toBe(null);
  });

  it('should return null for empty string', () => {
    const result = extractNextPageFromLink('');
    expect(result).toBe(null);
  });

  it('should return null for malformed link header', () => {
    const link = 'invalid-link-header';
    const result = extractNextPageFromLink(link);
    expect(result).toBe(null);
  });

  it('should handle HTTPS URLs', () => {
    const link = '<https://api.github.com/repos/owner/repo/issues?page=10>; rel="next"';
    const result = extractNextPageFromLink(link);
    expect(result).toBe(10);
  });

  it('should handle HTTP URLs', () => {
    const link = '<http://api.github.com/repos/owner/repo/issues?page=5>; rel="next"';
    const result = extractNextPageFromLink(link);
    expect(result).toBe(5);
  });

  it('should parse large page numbers correctly', () => {
    const link = '<https://api.github.com/user/repos?page=999>; rel="next"';
    const result = extractNextPageFromLink(link);
    expect(result).toBe(999);
  });

  it('should handle multiple rel types in the same header', () => {
    const link = '<https://api.github.com/user/repos?page=5>; rel="next", <https://api.github.com/user/repos?page=1>; rel="first"';
    const result = extractNextPageFromLink(link);
    expect(result).toBe(5);
  });
});