export type Category = {
  id: string;
  name: string;
  description: string | null;
  icon: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
};
