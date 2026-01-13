import { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import api from '../services/api';
import TaskCard from '../components/TaskCard';
import { Plus, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const columns = {
  'pending': { title: 'To Do', color: 'bg-slate-100' },
  'in-progress': { title: 'In Progress', color: 'bg-blue-50' },
  'completed': { title: 'Done', color: 'bg-green-50' }
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data } = await api.get('/tasks/');
    setTasks(data);
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;

    if (source.droppableId !== destination.droppableId) {
      const updatedTasks = tasks.map(t =>
        t.id.toString() === draggableId ? { ...t, status: destination.droppableId } : t
      );
      setTasks(updatedTasks);
      try {
        await api.put(`/tasks/${draggableId}`, { status: destination.droppableId });
      } catch (err) {
        fetchTasks();
      }
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTask.title) return;
    await api.post('/tasks/', { ...newTask, status: 'pending' });
    setNewTask({ title: '', description: '' });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this task?')) {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  return (
    <div className="p-6 h-screen flex flex-col bg-slate-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Kanban Board</h1>
        <div className="flex items-center gap-4">
           <span className="text-sm text-slate-600">Hello, {user?.email}</span>
           <button onClick={logout} className="text-slate-500 hover:text-red-500"><LogOut size={20}/></button>
        </div>
      </div>

      <form onSubmit={handleCreate} className="mb-6 flex gap-2 bg-white p-4 rounded-lg shadow-sm border border-slate-200">
        <input type="text" placeholder="New Task Title" className="border p-2 rounded flex-1" value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})}/>
        <input type="text" placeholder="Description" className="border p-2 rounded flex-1" value={newTask.description} onChange={e => setNewTask({...newTask, description: e.target.value})}/>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"><Plus size={18} className="mr-1"/> Add</button>
      </form>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-6 h-full overflow-x-auto pb-4">
          {Object.entries(columns).map(([colId, col]) => (
            <div key={colId} className={`flex-1 min-w-[300px] rounded-xl p-4 ${col.color}`}>
              <h3 className="font-bold text-slate-700 mb-4 flex justify-between">{col.title} <span className="bg-white px-2 py-0.5 rounded-full text-xs shadow-sm">{tasks.filter(t => t.status === colId).length}</span></h3>
              <Droppable droppableId={colId}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-[200px]">
                    {tasks.filter(t => t.status === colId).map((task, index) => (
                        <TaskCard key={task.id} task={task} index={index} onDelete={handleDelete} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Dashboard;