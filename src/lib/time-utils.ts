export function getCurrentTime(): number {
  return Math.floor(Date.now() / 1000);
}

export function getTimeAgo(timestamp: number): string {
  const currentTime = getCurrentTime();

  const diff = currentTime - timestamp;

  if (diff < 60) {
    return `${diff}s ago`; // seconds ago
  } else if (diff < 3600) {
    return `${Math.floor(diff / 60)}m ago`; // minutes ago
  } else if (diff < 86400) {
    return `${Math.floor(diff / 3600)}h ago`; // hours ago
  } else if (diff < 604800) {
    return `${Math.floor(diff / 86400)}d ago`; // days ago
  } else if (diff < 31536000) {
    return `${Math.floor(diff / 604800)}w ago`; // weeks ago
  } else {
    return `${Math.floor(diff / 31536000)}y ago`; // years ago
  }
}
