export interface Habit {
  id: string;
  title: string;
  description: string;
  frequency: 'daily' | 'weekly';
  timeOfDay?: string;
  createdAt: Date;
  completedDates: Date[];
}

export interface HabitProgress {
  completed: number;
  total: number;
  percentage: number;
}