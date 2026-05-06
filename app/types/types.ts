export type Company = {
  id: string;
  name: string;
  country: string;
  emissions: GhgEmission[];
};

export type GhgEmission = {
  yearMonth: string;
  source: string;
  description: string;
  emissions: number;
};

export type Post = {
  id: string;
  title: string;
  resourceUid: string;
  dateTime: string;
  content: string;
};
