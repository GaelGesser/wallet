export type Account = {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'cash';
  color: string;
  icon: string;
  description: string | null;
  isActive: boolean;
  isDefault: boolean;
  balanceInCents: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};
