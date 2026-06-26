export interface ScanlationGroupResponse {
  result: string;
  response: string;
  data: ScanlationGroup;
}

export interface ScanlationGroup {
  id: string;
  type: 'scanlation_group';
  attributes: ScanlationGroupAttributes;
  relationships: unknown[];
}

export interface ScanlationGroupAttributes {
  name: string;
  altNames: {
    [key: string]: string;
  }[];
  locked: boolean;
  website: string | null;
  ircServer: string | null;
  ircChannel: string | null;
  discord: string | null;
  contactEmail: string | null;
  description: string | null;
  twitter: string | null;
  mangaUpdates: string | null;
  focusedLanguages: string[];
  official: boolean;
  verified: boolean;
  inactive: boolean;
  publishDelay: number | null;
  exLicensed: boolean;
  createdAt: string;
  updatedAt: string;
  version: number;
}