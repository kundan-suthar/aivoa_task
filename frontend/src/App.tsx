import InteractionDetails from './features/interactionDetails/InteractionDetails'
import AIChatSidebar from './components/AIChatSidebar'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-white px-8 py-2 sticky top-0 z-10 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Log HCP Interaction</h1>
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
    </div>
  )
}

export default App
