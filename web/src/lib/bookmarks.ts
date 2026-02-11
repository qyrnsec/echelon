import type { BookmarkedItem } from "./types";
import { getStorageItem, setStorageItem } from "./storage";

const STORAGE_KEY = "echelon:bookmarks";

export function getBookmarks(): BookmarkedItem[] {
  return getStorageItem<BookmarkedItem[]>(STORAGE_KEY) || [];
}

export function addBookmark(item: BookmarkedItem): void {
  const bookmarks = getBookmarks();
  if (bookmarks.some((b) => b.url === item.url)) return;
  setStorageItem(STORAGE_KEY, [...bookmarks, item]);
}

export function removeBookmark(url: string): void {
  const bookmarks = getBookmarks();
  setStorageItem(STORAGE_KEY, bookmarks.filter((b) => b.url !== url));
}

export function isBookmarked(url: string): boolean {
  return getBookmarks().some((b) => b.url === url);
}
