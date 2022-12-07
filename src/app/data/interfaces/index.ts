export interface Ranking {
  image: string;
  interestRate: number;
  approvalTime: number;
  procedures: string;
  rating: number;
  entity: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface Benefit {
  title: string;
  description: string;
}
