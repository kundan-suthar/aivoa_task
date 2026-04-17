import React from 'react';
import { Bot, Send } from 'lucide-react';
import axios from 'axios';

const AIChatSidebar: React.FC = () => {
  const [message, setMessage] = React.useState('');
  const handleLogInteraction = () => {
    axios.post('http://localhost:8000/interact', { user_message: message })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }
  return (
    <div className="fixed top-16 flex flex-col h-[550px] w-[300px] bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden my-2 mx-auto">
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
        <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 text-sm text-slate-600 leading-relaxed">
          <p>
            Log interaction details here (e.g., "Met Dr. Smith, discussed Product X efficacy, positive sentiment, shared brochure") or ask for help.
          </p>
        </div>


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
    </div>
  );
};

export default AIChatSidebar;
