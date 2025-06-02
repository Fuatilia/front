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
  supported_by: string | null;
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
export type PositionClass = 'ELECTED' | 'NOMINATED' | string;
export type Position = 'MP' | 'SENATOR'

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
  representation_summary: {
    party: Party;
  };
  version: number;
  created_at: string;
  updated_at: string;
};

