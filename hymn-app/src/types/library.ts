export interface Chapter {
  id: string;
  title: string;
  content: string; // Markdown or formatted text
  pageNumber?: number;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: 'Doctrine' | 'Church Order' | 'Ministry' | 'Evangelism' | 'History' | 'Commentary';
  description: string;
  year?: number;
  pages?: number;
  fileSize: string;
  isFree: boolean;
  price?: string;
  isUnlocked?: boolean;
  coverColor: string;
  chapters: Chapter[];
  pdfUrl?: string;
}

export interface StudyLesson {
  id: string;
  lessonNumber: number;
  title: string;
  scriptureReferences: string[];
  aim: string;
  content: string;
  discussionQuestions: string[];
}

export interface BibleStudySeries {
  id: string;
  title: string;
  author: string;
  targetAudience: string;
  description: string;
  lessons: StudyLesson[];
}

export interface MagazineArticle {
  id: string;
  title: string;
  author: string;
  subtitle?: string;
  content: string;
  scriptureAnchor?: string;
}

export interface MagazineIssue {
  id: string;
  publicationName: 'Needed Truth' | 'Search and See' | 'Bible Studies Quarterly';
  volume: string;
  issue: string;
  year: number;
  month: string;
  theme: string;
  fileSize: string;
  articles: MagazineArticle[];
}

export interface DailyDevotion {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  scriptureReading: string;
  keyVerse: string;
  keyVerseCitation: string;
  exposition: string;
  reflectionQuestion: string;
  prayer: string;
  relatedHymnNumber?: number;
  author: string;
}

export interface DownloadedItem {
  id: string;
  itemType: 'book' | 'study' | 'magazine';
  title: string;
  author: string;
  downloadedAt: number;
  fileSize: string;
  data: any; // Cached object payload
}

export type MainNavTab = 'hymns' | 'library' | 'devotions' | 'bookstore' | 'saved';
