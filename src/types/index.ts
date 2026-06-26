export interface ShareClassRow {
  id: string;
  name: string;
  sharesOutstanding: number | null;
  conversionRatio: number;
  asIfConverted: number;
  fullyDilutedPct: number;
  issuePrice: number;
  isTotal?: boolean;
  isSection?: boolean;
  sectionLabel?: string;
  /** traceId per column — keys match column semantics, values are traces.json keys */
  traceIds?: {
    issuePrice?: string;
    sharesOutstanding?: string;
  };
}

export interface DrawerData {
  lpRank: string;
  lpMultiple: string;
  participation: string;
  participationCap: string | null;
  dividendRate: string; // display only, no longer traceable
  issueDate: string;
  conversionRatio: string;
  liqPrefPerShare: string;
  totalLiqPref: string;
  /** traceId per drawer field — same registry keys as traces.json */
  traceIds: {
    issuePrice?: string;
    sharesOutstanding?: string;
    totalLiqPref?: string;
  };
}

export type TraceType = "stated" | "computed";

export interface StatedTrace {
  type: "stated";
  label: string;
  value: string;
  source: {
    docId: string;
    page: number;
    match: string;
  };
}

export interface ComputedTrace {
  type: "computed";
  label: string;
  value: string;
  formula: string;
  expression: string;
  inputs: string[];
}

export type Trace = StatedTrace | ComputedTrace;
