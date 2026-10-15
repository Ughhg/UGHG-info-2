
export interface Activity {
  name: string;
  description: string;
}

export interface Sector {
  id: string;
  title: string;
  description: string;
  icon: string;
  activities: Activity[];
}

export interface CompanyFact {
  label: string;
  value: string;
}
