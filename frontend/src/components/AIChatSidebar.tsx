import React from 'react';
import { Bot, Send } from 'lucide-react';
import axios from 'axios';
import { useAppDispatch } from '../app/hooks';
import { bulkUpdate } from '../features/interactionDetails/interactionDetailsSlice';
import { openModal } from '../features/taskModal/taskModalSlice';
const AIChatSidebar: React.FC = () => {
  const [message, setMessage] = React.useState('');
  const [allMessages, setAllMessages] = React.useState<any[]>([]);
  const dispatch = useAppDispatch();

  const handleLogInteraction = async () => {
    const userMesage = { id: Date.now(), message: message, role: "user" }
    setAllMessages((prevMessages) => [...prevMessages, userMesage]);
    let res = await axios.post('http://localhost:8000/interact', { user_message: message })
    if (res.data.action == "log") {
      dispatch(bulkUpdate(res.data.data));
    } else if (res.data.action == "edit") {
      dispatch(bulkUpdate(res.data.updated_data));
    } else if (res.data.action == "add_follow_up") {
      dispatch(openModal(res.data.taskData));
    }
    console.log(res.data);
    let aiMessage = { id: Date.now(), message: res.data.message, role: "assistant", suggestions: res.data.suggestions }

    setAllMessages((prevMessages) => [...prevMessages, aiMessage]);
    setMessage("");


  }
  return (
    <div className="fixed top-16 flex flex-col h-[550px] w-[550px] bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden my-2 mx-auto">
      <div className="p-4 border-b border-slate-200 bg-white shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Bot className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800">AI Assistant</h2>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Log interaction via chat</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Welcome Message */}
        {allMessages.map((msg) => (
          <div
            key={msg.id}
            className={`bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-sm text-slate-600 leading-relaxed border-l-4 transition-all hover:shadow-md ${msg.role === "user"
              ? "rounded-tl-none border-l-amber-400 shadow-[0_2px_12px_-3px_rgba(251,191,36,0.2)]"
              : "rounded-tl-none border-l-blue-500 shadow-[0_2px_12px_-3px_rgba(59,130,246,0.2)]"
              }`}
          >
            <p className="whitespace-pre-wrap">
              {msg.message}
            </p>
          </div>
        ))}


      </div>

      <div className="p-4 bg-white border-t border-slate-200 mt-auto">
        <div className="flex flex-col space-y-2">
          <textarea
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe interaction..."
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-sm placeholder:text-slate-400"
          ></textarea>
          <div className="flex justify-end">
            <button onClick={handleLogInteraction} className="p-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center space-x-2 px-4 group">
              <span className="text-xs font-bold uppercase">Log Interaction</span>
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
      </div>
    </div >
  );
};

export default AIChatSidebar;
