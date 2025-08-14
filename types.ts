
export interface Student {
  id: string;
  name: string;
  class: string;
  rollNumber: string;
  parentContact: string;
  address: string;
}

export interface Fee {
  studentId: string;
  month: string;
  year: number;
  amount: number;
  status: 'Paid' | 'Unpaid';
  issueDate: string;
  dueDate: string;
}

export interface FeeVoucher extends Fee {
    studentName: string;
    className: string;
    rollNumber: string;
    breakdown: {
        tuition: number;
        sports: number;
        library: number;
        lateFee: number;
        discount: number;
    };
}

export enum Page {
  Dashboard,
  Students,
  FeeManager,
  AIAssistant,
}
