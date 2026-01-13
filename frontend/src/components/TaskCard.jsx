import { useState } from 'react';
import { Calendar, Clock, MoreVertical, CheckCircle, Circle, ArrowRightCircle } from 'lucide-react';

export default function TaskCard({ task, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [showMenu, setShowMenu] = useState(false);

  // Status visual configurations
  const statusConfig = {
    pending: { icon: Circle, color: 'text-yellow-500', bg: 'bg-yellow-500/10', label: 'To Do' },
    'in-progress': { icon: ArrowRightCircle, color: 'text-blue-500', bg: 'bg-blue-500/10', label: 'In Progress' },
    completed: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10', label: 'Done' },
  };

  const currentStatus = statusConfig[task.status] || statusConfig.pending;
  const StatusIcon = currentStatus.icon;

  const handleUpdate = async (e) => {
    e.preventDefault();
    const changes = {};
    // Only send changed fields
    if (editedTask.title !== task.title) changes.title = editedTask.title;
    if (editedTask.description !== task.description) changes.description = editedTask.description;
    if (editedTask.status !== task.status) changes.status = editedTask.status;
    if (editedTask.due_date !== task.due_date) changes.due_date = editedTask.due_date;

    if (Object.keys(changes).length > 0) {
      await onUpdate(task.id, changes);
    }
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="group relative bg-slate-800 border border-slate-700/50 rounded-lg p-4 hover:border-slate-600 hover:shadow-lg hover:shadow-black/20 transition-all duration-200">

      {!isEditing ? (
        <>
          {/* Card Header */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-slate-100 font-medium text-sm leading-tight flex-1 pr-4">
              {task.title}
            </h3>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-slate-500 hover:text-slate-300 transition-colors p-1 rounded-md hover:bg-slate-700"
            >
              <MoreVertical size={16} />
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute right-2 top-8 z-10 w-32 bg-slate-800 border border-slate-700 rounded-lg shadow-xl py-1 animate-in fade-in zoom-in-95 duration-100">
                <button
                  onClick={() => { setIsEditing(true); setShowMenu(false); }}
                  className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => { onDelete(task.id); setShowMenu(false); }}
                  className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-red-900/20"
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          {/* Description Preview */}
          {task.description && (
            <p className="text-slate-400 text-xs mb-4 line-clamp-2 leading-relaxed">
              {task.description}
            </p>
          )}

          {/* Card Footer: Meta Info */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-700/50">
            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md ${currentStatus.bg} ${currentStatus.color}`}>
              <StatusIcon size={12} />
              <span className="text-[10px] font-semibold uppercase tracking-wider">{currentStatus.label}</span>
            </div>

            <div className="flex items-center gap-3 text-slate-500 text-xs">
              {task.due_date && (
                <div className="flex items-center gap-1 hover:text-slate-300 transition-colors">
                  <Calendar size={12} />
                  <span>{formatDate(task.due_date)}</span>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        /* Edit Mode Form */
        <form onSubmit={handleUpdate} className="space-y-3">
          <div>
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none"
              placeholder="Task Title"
              autoFocus
            />
          </div>
          <div>
            <textarea
              value={editedTask.description || ''}
              onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs text-slate-300 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
              rows="3"
              placeholder="Description..."
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <select
              value={editedTask.status}
              onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
              className="bg-slate-900 border border-slate-700 rounded p-2 text-xs text-slate-300 outline-none"
            >
              <option value="pending">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Done</option>
            </select>
            <input
              type="date"
              value={editedTask.due_date ? editedTask.due_date.split('T')[0] : ''}
              onChange={(e) => setEditedTask({...editedTask, due_date: e.target.value})}
              className="bg-slate-900 border border-slate-700 rounded p-2 text-xs text-slate-300 outline-none"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-500 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}

      {/* Invisible overlay to close menu when clicking outside */}
      {showMenu && (
        <div
          className="fixed inset-0 z-0 cursor-default"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
}