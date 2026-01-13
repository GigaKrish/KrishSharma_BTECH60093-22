import { useState, useEffect } from 'react';
import { taskAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';
import { Loader, Plus, LogOut, Layout, Search, Filter } from 'lucide-react';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { logout, user } = useAuth();

  // 1. Fetch Tasks
  const fetchTasks = async () => {
    try {
      const response = await taskAPI.getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 2. Add Task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const response = await taskAPI.createTask({ title: newTaskTitle });
      setTasks([...tasks, response.data]);
      setNewTaskTitle('');
    } catch (error) {
      console.error("Failed to create task", error);
    }
  };

  // 3. Delete Task
  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await taskAPI.deleteTask(taskId);
      setTasks(tasks.filter(t => t.id !== taskId));
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  // 4. Update Task
  const handleUpdate = async (taskId, updates) => {
    const originalTasks = [...tasks];
    setTasks(tasks.map(t => (t.id === taskId ? { ...t, ...updates } : t)));

    try {
      await taskAPI.updateTask(taskId, updates);
    } catch (error) {
      console.error("Failed to update task", error);
      setTasks(originalTasks);
    }
  };

  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-400 gap-4">
        <Loader className="w-10 h-10 animate-spin text-blue-500" />
        <p className="text-sm font-medium tracking-wide">LOADING WORKSPACE...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30">

      {/* Top Navigation Bar */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20">
              <Layout className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-100">TaskFlow</span>
            <div className="h-4 w-px bg-slate-800 mx-2" />
            <span className="text-sm text-slate-500 hidden sm:block">Workspace</span>
          </div>

          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-full">
                <Search className="w-4 h-4 text-slate-500 mr-2" />
                <input
                  type="text"
                  placeholder="Filter tasks..."
                  className="bg-transparent border-none outline-none text-sm text-slate-300 placeholder-slate-600 w-48"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
             </div>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-slate-200">{user?.full_name || 'User'}</p>
                <p className="text-xs text-slate-500">Admin</p>
              </div>
              <button
                onClick={logout}
                className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-[1600px] mx-auto p-6">

        {/* Action Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
           <div>
             <h1 className="text-2xl font-bold text-slate-100">Board</h1>
             <p className="text-slate-500 text-sm mt-1">Manage your team's tasks and projects.</p>
           </div>

           <form onSubmit={handleAddTask} className="w-full md:w-auto relative group">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Add a new task..."
                className="w-full md:w-80 pl-4 pr-12 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm group-hover:border-slate-700"
              />
              <button
                type="submit"
                disabled={!newTaskTitle.trim()}
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors disabled:opacity-0 disabled:pointer-events-none"
              >
                <Plus className="w-4 h-4" />
              </button>
           </form>
        </div>

        {/* Kanban Board Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-220px)]">

          <Column
            title="To Do"
            count={filteredTasks.filter(t => t.status === 'pending').length}
            tasks={filteredTasks.filter(t => t.status === 'pending')}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            indicatorColor="bg-yellow-500"
          />

          <Column
            title="In Progress"
            count={filteredTasks.filter(t => t.status === 'in-progress').length}
            tasks={filteredTasks.filter(t => t.status === 'in-progress')}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            indicatorColor="bg-blue-500"
          />

          <Column
            title="Completed"
            count={filteredTasks.filter(t => t.status === 'completed').length}
            tasks={filteredTasks.filter(t => t.status === 'completed')}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            indicatorColor="bg-green-500"
          />

        </div>
      </main>
    </div>
  );
}

// Sub-component for Columns
function Column({ title, count, tasks, indicatorColor, onDelete, onUpdate }) {
  return (
    <div className="flex flex-col bg-slate-900/30 rounded-xl border border-slate-800/60 overflow-hidden h-full">
      {/* Column Header */}
      <div className="p-4 flex items-center justify-between border-b border-slate-800/60 bg-slate-900/40 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${indicatorColor} shadow-[0_0_8px_rgba(255,255,255,0.3)]`}></div>
          <h2 className="font-semibold text-slate-200 text-sm tracking-wide">{title}</h2>
        </div>
        <span className="text-xs font-medium text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full">
          {count}
        </span>
      </div>

      {/* Scrollable Task List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}

        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-slate-800 rounded-lg opacity-50">
            <p className="text-xs text-slate-600 font-medium">No tasks yet</p>
          </div>
        )}
      </div>
    </div>
  );
}