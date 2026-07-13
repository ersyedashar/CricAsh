import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num?.toString() || '0';
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

export function formatDateTime(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function truncate(str, len = 100) {
  if (!str || str.length <= len) return str;
  return str.slice(0, len) + '...';
}

export const countryFlags = {
  India: '🇮🇳', Australia: '🇦🇺', England: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', Pakistan: '🇵🇰',
  'South Africa': '🇿🇦', 'New Zealand': '🇳🇿', 'Sri Lanka': '🇱🇰', Bangladesh: '🇧🇩',
  Afghanistan: '🇦🇫', 'West Indies': '🏏', Ireland: '🇮🇪', Zimbabwe: '🇿🇼',
  Netherlands: '🇳🇱', Scotland: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', Nepal: '🇳🇵', UAE: '🇦🇪', USA: '🇺🇸',
};

export const roleColors = {
  'Batsman': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'Bowler': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  'All-Rounder': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  'Wicket-Keeper': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  'Batting All-Rounder': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  'Bowling All-Rounder': 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
};
