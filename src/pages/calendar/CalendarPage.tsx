import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
}

const initialEvents: Event[] = [
  // ... (Your initial event data here)
];

export function CalendarPage() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({});

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) return;

    const newEventToAdd: Event = {
      id: Math.max(...events.map((e) => e.id)) + 1,
      title: newEvent.title,
      date: newEvent.date,
      description: newEvent.description || '',
    };
    setEvents([...events, newEventToAdd]);
    setNewEvent({});
    setShowAddEventForm(false);
  };

  const handleDeleteEvent = (id: number) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Calendar</h1>
        <button
          onClick={() => setShowAddEventForm(true)}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="ml-2 h-5 w-5" />
          Add Event
        </button>
      </div>

      {showAddEventForm && (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Add Event</h2>
          {/* ... (Your form fields for adding events here) */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={() => setShowAddEventForm(false)}
              className="px-4 py-2 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddEvent}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      )}

      {/* Calendar Display (Simulate with a list for now) */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        {events.map((event) => (
          <div key={event.id} className="p-6 hover:bg-slate-50 transition-colors">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{event.title}</h3>
                <p className="text-sm text-slate-500">{event.date}</p>
                <p className="text-sm text-slate-600">{event.description}</p>
              </div>
              <button onClick={() => handleDeleteEvent(event.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
