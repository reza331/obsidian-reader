export interface ChapterItem {
  id: string;
  type: 'chapter';
  attributes: {
    volume: string | null;
    chapter: string | null;
    title: string;
    translatedLanguage: string;
    externalUrl: string | null;
    isUnavailable: boolean;
    publishAt: string;
    readableAt: string;
    createdAt: string;
    updatedAt: string;
    version: number;
    pages: number;
  };
  relationships: {
    id: string;
    type: 'scanlation_group' | 'manga' | 'user' | string;
  }[];
}

export interface ChaptersResponse {
  result: string;
  response: string;
  data: ChapterItem[];
  limit: number;
  offset: number;
  total: number;
}

export interface ChapterResponse {
  result: string;
  response: string;
  data: ChapterItem;
}