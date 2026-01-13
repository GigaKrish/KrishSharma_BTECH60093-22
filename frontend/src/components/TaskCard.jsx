import { Draggable } from '@hello-pangea/dnd';
import { Calendar, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

const TaskCard = ({ task, index, onDelete }) => {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-4 mb-3 bg-white rounded-lg shadow-sm border border-slate-200 group hover:shadow-md transition-all ${
            snapshot.isDragging ? "shadow-lg ring-2 ring-blue-400 rotate-2" : ""
          }`}
        >
          <div className="flex justify-between items-start">
            <h4 className="font-semibold text-slate-800">{task.title}</h4>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}
              className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={16} />
            </button>
          </div>
          <p className="text-sm text-slate-600 mt-1 mb-3">{task.description}</p>
          {task.due_date && (
            <div className="flex items-center text-xs text-slate-400">
              <Calendar size={12} className="mr-1" />
              {format(new Date(task.due_date), 'MMM d, yyyy')}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;