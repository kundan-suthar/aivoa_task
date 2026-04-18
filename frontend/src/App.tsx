import InteractionDetails from './features/interactionDetails/InteractionDetails'
import TaskModal from './features/taskModal/taskModal'
import TaskListModal from './features/taskModal/taskListModal'
import { useDispatch } from 'react-redux'
import { openModal } from './features/taskModal/taskModalSlice'
import { toggleListModal } from './features/taskModal/taskSlice'
import AIChatSidebar from './components/AIChatSidebar'

function App() {
  const dispatch = useDispatch()
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-white px-8 py-3 sticky top-0 z-10 shadow-sm border-b border-slate-100 flex justify-between items-center">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Log HCP Interaction</h1>
        <div className="flex gap-4">
          <button 
            onClick={() => dispatch(toggleListModal(true))}
            className="px-6 py-2.5 bg-slate-100 text-slate-600 rounded-2xl text-[13px] font-bold hover:bg-slate-200 transition-all active:scale-95"
          >
            View Tasks
          </button>
          <button 
            onClick={() => dispatch(openModal({ id: `TASK-${Math.floor(Math.random() * 9000) + 1000}`, title: 'Follow-up Task', description: "Discuss medical reports", dueDate: '11/28/2026', type: 'Visit', status: 'Pending' }))}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-2xl text-[13px] font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95"
          >
            Create Task
          </button>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden ">
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-slate-200">
          <div className="max-w-4xl mx-auto">
            <InteractionDetails />
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="w-[600px] h-full hidden lg:block bg-slate-50 pr-4">
          <AIChatSidebar />
        </aside>
      </main>
      <TaskModal />
      <TaskListModal />
    </div>
  )
}

export default App
