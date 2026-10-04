import { useState } from 'react';
import HomeScreen from './components/HomeScreen.jsx';
import AllTasksScreen from './components/AllTasksScreen.jsx';
import SearchScreen from './components/SearchScreen.jsx';
import BottomNav from './components/BottomNav.jsx';
import TaskModal from './components/TaskModal.jsx';
import { useTasks } from './hooks/useTasks.js';

export default function App() {
  const [tab, setTab] = useState('home');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const { tasks, loading, error, create, update, remove } = useTasks();

  function openAdd() {
    setEditing(null);
    setModalOpen(true);
  }
  function openEdit(task) {
    setEditing(task);
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
    setEditing(null);
  }
  async function handleSave(payload) {
    if (editing) {
      await update(editing._id, payload);
    } else {
      await create(payload);
    }
  }
  async function handleToggleStatus(task) {
    const next = task.status === 'Completed' ? 'Open' : 'Completed';
    await update(task._id, { status: next });
  }
  async function handleDelete(id) {
    await remove(id);
  }

  return (
    <div className="app-shell flex flex-col">
      {tab === 'home' && (
        <HomeScreen
          tasks={tasks}
          loading={loading}
          error={error}
          onAdd={openAdd}
          onEdit={openEdit}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
          onSearchClick={() => setTab('search')}
        />
      )}
      {tab === 'all' && (
        <AllTasksScreen
          tasks={tasks}
          onAdd={openAdd}
          onEdit={openEdit}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
        />
      )}
      {tab === 'search' && (
        <SearchScreen
          onEdit={openEdit}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
        />
      )}

      <BottomNav tab={tab} onChange={setTab} />

      <TaskModal
        open={modalOpen}
        onClose={closeModal}
        onSave={handleSave}
        initial={editing}
      />
    </div>
  );
}