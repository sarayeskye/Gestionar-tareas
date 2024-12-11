import { useState, useEffect } from 'react';
import { Habit, HabitProgress } from '../types/habit';

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('habits');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = (title: string, description: string, frequency: 'daily' | 'weekly') => {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      title,
      description,
      frequency,
      createdAt: new Date(),
      completedDates: [],
    };
    setHabits((prev) => [...prev, newHabit]);
  };

  const updateHabit = (habitId: string, updates: Partial<Habit>) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === habitId
          ? { ...habit, ...updates }
          : habit
      )
    );
  };

  const deleteHabit = (habitId: string) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== habitId));
  };

  const toggleHabitCompletion = (habitId: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== habitId) return habit;

        const hasCompletedToday = habit.completedDates.some(
          (date) => new Date(date).toDateString() === today.toDateString()
        );

        return {
          ...habit,
          completedDates: hasCompletedToday
            ? habit.completedDates.filter(
                (date) => new Date(date).toDateString() !== today.toDateString()
              )
            : [...habit.completedDates, today],
        };
      })
    );
  };

  const getHabitProgress = (habit: Habit): HabitProgress => {
    const today = new Date();
    const startDate = new Date(habit.createdAt);
    const daysDiff = Math.floor(
      (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    const total = habit.frequency === 'daily' ? daysDiff + 1 : Math.ceil((daysDiff + 1) / 7);
    const completed = habit.completedDates.length;

    return {
      completed,
      total,
      percentage: Math.round((completed / total) * 100),
    };
  };

  return {
    habits,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabitCompletion,
    getHabitProgress,
  };
}