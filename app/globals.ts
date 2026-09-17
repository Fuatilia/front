export type House = 'NATIONAL' | 'SENATE' | 'ALL';

export type BillStatus =
  | 'DRAFT'
  | 'FIRST_READING'
  | 'SECOND_READING'
  | 'THIRD_READING'
  | 'PASSED'
  | 'ASSENTED'
  | 'REJECTED'
  | string;

export type Bill = {
  id: string;
  title: string;
  status: BillStatus;
  sponsored_by: string;
  supported_by: string[] | null;
  house: House;
  bill_no: string;
  gazette_no: string;
  date_introduced: string;
  summary: string | null;
  summary_created_by: string | null;
  summary_upvoted_by: string[] | null;
  summary_downvoted_by: string[] | null;
  final_date_voted: string;
  topics_in_the_bill: string[] | null;
  metadata: Record<string, any>;
  file_url: string | null;
  last_updated_by: string | null;
  created_at: string;
  updated_at: string;
};

export type Party = 'UDA' | 'WDM' | 'ODM' | 'IND';
export type PositionClass = 'ELECTED' | 'NOMINATED';
export type Position = 'MP' | 'SENATOR'
export interface RepresentationSummary {
  [yearRange: string]: Array<{ party: string }>;
}

export type Representative = {
  id: string;
  full_name: string;
  position: Position;
  position_class: PositionClass;
  house: House;
  area_represented: string;
  phone_number: string | null;
  gender: string | null;
  current_parliamentary_roles: string | null;
  representation_summary: string;  // It arrives from the API as a string
  version: number;
  created_at: string;
  updated_at: string;
};

export type PaginationType = {
  page: number;
  items_per_page: number;
  total_pages: number;
};

export type Faq = {
  id: string;
  faq?: string;
  answer?: string;
}

export type Vote = {
  id: string;
  bill_id?: string;
  representative_id?: string;
  vote_type?: string;
  vote_summary?: string;
  house?: string;
  vote?: string;
}


export interface RepVoteSummary {
  id: string;
  title?: string;
  vote?: string;
  bill_id?: string;
  vote_type?: string;
}

export interface RepresentativeVoteListProps  {
  votedYes?: RepVoteSummary[];
  votedNo?: RepVoteSummary[];
}