import React, { useState } from 'react';
import { PlusCircle, Leaf } from 'lucide-react';
import { useHabits } from './hooks/useHabits';
import { HabitCard } from './components/HabitCard';

function App() {
  const { habits, addHabit, updateHabit, deleteHabit, toggleHabitCompletion, getHabitProgress } = useHabits();
  const [showForm, setShowForm] = useState(false);
  const [newHabit, setNewHabit] = useState({
    title: '',
    description: '',
    frequency: 'daily' as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addHabit(newHabit.title, newHabit.description, newHabit.frequency);
    setNewHabit({ title: '', description: '', frequency: 'daily' });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-green-500" />
            <h1 className="text-3xl font-bold text-gray-800">VidaSana</h1>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Nuevo Hábito</span>
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Título
                </label>
                <input
                  type="text"
                  id="title"
                  value={newHabit.title}
                  onChange={(e) => setNewHabit({ ...newHabit, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  id="description"
                  value={newHabit.description}
                  onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={3}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
                  Frecuencia
                </label>
                <select
                  id="frequency"
                  value={newHabit.frequency}
                  onChange={(e) =>
                    setNewHabit({
                      ...newHabit,
                      frequency: e.target.value as 'daily' | 'weekly',
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="daily">Diario</option>
                  <option value="weekly">Semanal</option>
                </select>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              progress={getHabitProgress(habit)}
              onToggle={toggleHabitCompletion}
              onUpdate={updateHabit}
              onDelete={deleteHabit}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;