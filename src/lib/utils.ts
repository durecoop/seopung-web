export function getImagePath(path: string): string {
  const basePath = process.env.NODE_ENV === 'production' ? '/seopung-web' : '';
  return `${basePath}${path}`;
}
