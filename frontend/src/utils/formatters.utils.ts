// Turns "https://www.example.com/page" into "example.com" for the source label.
export function getHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}