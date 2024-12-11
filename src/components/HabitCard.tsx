import React, { useState } from 'react';
import { CheckCircle, Circle, Pencil, Trash2, X, Check } from 'lucide-react';
import { Habit, HabitProgress } from '../types/habit';

interface HabitCardProps {
  habit: Habit;
  progress: HabitProgress;
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Habit>) => void;
  onDelete: (id: string) => void;
}

export function HabitCard({ habit, progress, onToggle, onUpdate, onDelete }: HabitCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedHabit, setEditedHabit] = useState(habit);
  const today = new Date();
  const isCompletedToday = habit.completedDates.some(
    (date) => new Date(date).toDateString() === today.toDateString()
  );

  const handleSave = () => {
    onUpdate(habit.id, editedHabit);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedHabit(habit);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editedHabit.title}
                onChange={(e) => setEditedHabit({ ...editedHabit, title: e.target.value })}
                className="w-full px-2 py-1 text-lg font-semibold border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <textarea
                value={editedHabit.description}
                onChange={(e) => setEditedHabit({ ...editedHabit, description: e.target.value })}
                className="w-full px-2 py-1 text-sm text-gray-600 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                rows={2}
              />
              <select
                value={editedHabit.frequency}
                onChange={(e) => setEditedHabit({ ...editedHabit, frequency: e.target.value as 'daily' | 'weekly' })}
                className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="daily">Diario</option>
                <option value="weekly">Semanal</option>
              </select>
            </div>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-gray-800">{habit.title}</h3>
              <p className="text-sm text-gray-600">{habit.description}</p>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="p-1 text-green-500 hover:text-green-600 transition-colors"
                title="Guardar"
              >
                <Check className="w-5 h-5" />
              </button>
              <button
                onClick={handleCancel}
                className="p-1 text-gray-400 hover:text-gray-500 transition-colors"
                title="Cancelar"
              >
                <X className="w-5 h-5" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                title="Editar"
              >
                <Pencil className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(habit.id)}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                title="Eliminar"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => onToggle(habit.id)}
                className="p-1 text-gray-400 hover:text-green-500 transition-colors"
                title="Marcar como completado"
              >
                {isCompletedToday ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>
            </>
          )}
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progreso</span>
          <span>{progress.completed} de {progress.total} días</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-blue-500 h-full transition-all duration-300 ease-in-out rounded-full"
            style={{ width: `${Math.min(progress.percentage, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}