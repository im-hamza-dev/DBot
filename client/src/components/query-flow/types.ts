export type Employee = {
  EmployeeId: number;
  FirstName: string;
  LastName: string;
  Title: string;
  Address: string;
  ReportsTo?: number;
  Country: string;
  Phone: string;
};

export type QueryResponse = {
  query: string;
  result: any;
  employees: string; // JSON string
  usage?: number;
};
