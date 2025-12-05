export type ExpenseItem = { 
    _id: string;
    name: string; 
    type: string; 
    amount: number; 
    createdAt: string;
}

export interface GroupedExpense {
  date: string;
  totalAmt: number;
  expenseList: ExpenseItem[];
}

export interface ExpenseModelProps {
    refreshExpenses: () => void;
}