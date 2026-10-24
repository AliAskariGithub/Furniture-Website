/**
 * Utility functions for portfolio gallery lightbox navigation and resolution enhancement
 */

export function getNextIndex(currentIndex: number, total: number): number {
  if (total <= 0) return 0;
  return (currentIndex + 1) % total;
}

export function getPrevIndex(currentIndex: number, total: number): number {
  if (total <= 0) return 0;
  return (currentIndex - 1 + total) % total;
}

export function getHighResImageUrl(url: string): string {
  if (!url) return '';
  // If it's an Unsplash URL, upgrade width and quality parameters for high-resolution display
  if (url.includes('images.unsplash.com')) {
    try {
      const parsed = new URL(url);
      parsed.searchParams.set('w', '2400');
      parsed.searchParams.set('q', '95');
      parsed.searchParams.set('auto', 'format');
      return parsed.toString();
    } catch {
      return url;
    }
  }
  return url;
}
