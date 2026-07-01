export interface MangaItem {
  id: string;
  type: 'manga';
  attributes: {
    title: Record<string, string>; // { en: 'Skyhigh', ja: 'スカイハイ', ... }
    altTitles: Record<string, string>[]; // [{ ja: 'スカイハイ' }, { en: 'Sky High' }]
    description: Record<string, string>; // { en: '...', es: '...' }
    isLocked: boolean;
    links: Record<string, string | null>;
    officialLinks: Record<string, string | null> | null;
    originalLanguage: string;
    lastVolume: string;
    lastChapter: string;
    publicationDemographic: string | null;
    status: string;
    year: number;
    contentRating: string;
    tags: {
      id: string;
      type: 'tag';
      attributes: {
        name: Record<string, string>;
        description: Record<string, string>;
        group: string;
        version: number;
      };
      relationships: any[];
    }[];
    state: string;
    chapterNumbersResetOnNewVolume: boolean;
    createdAt: string;
    updatedAt: string;
    version: number;
    availableTranslatedLanguages: string[];
    latestUploadedChapter: string;
  };
  relationships: {
    id: string;
    type: string;
    related?: string;
    attributes: { fileName: string }
  }[];
}

export interface MangaResponse {
  result: string;
  response: string;
  data: MangaItem;
}


export interface MangasResponse {
  result: string;
  response: string;
  data: MangaItem[];
  limit: number;
  offset: number;
  total: number;
}
