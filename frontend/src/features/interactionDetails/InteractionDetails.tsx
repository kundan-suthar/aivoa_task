import React from 'react';
import { Calendar, Clock, Search, Mic, Plus, Info, FileText, Package } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setField } from './interactionDetailsSlice';

const InteractionDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const form = useAppSelector(state => state.interaction);


  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-slate-800 mb-6">Interaction Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* HCP Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 block">HCP Name</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search or select HCP..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={form.hcpName}
                onChange={e => dispatch(setField({ field: 'hcpName', value: e.target.value }))}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            </div>
          </div>

          {/* Interaction Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 block">Interaction Type</label>
            <select
              value={form.interactionType}
              onChange={e => dispatch(setField({ field: 'interactionType', value: e.target.value as any }))}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer">
              <option>Meeting</option>
              <option>Call</option>
              <option>Email</option>
              <option>Event</option>
            </select>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 block">Date</label>
            <div className="relative">
              <input
                type="date"
                value={form.date}
                onChange={e => dispatch(setField({ field: 'date', value: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            </div>
          </div>

          {/* Time */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 block">Time</label>
            <div className="relative">
              <input
                type="time"
                value={form.time}
                onChange={e => dispatch(setField({ field: 'time', value: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <Clock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Attendees */}
        <div className="mt-6 space-y-2">
          <label className="text-sm font-medium text-slate-600 block">Attendees</label>
          <div className="relative">
            <input
              type="text"
              value={form.attendees}
              onChange={e => dispatch(setField({ field: 'attendees', value: e.target.value }))}
              placeholder="Enter names or search..."
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Topics Discussed */}
        <div className="mt-6 space-y-2">
          <label className="text-sm font-medium text-slate-600 block">Topics Discussed</label>
          <div className="relative">
            <textarea
              rows={3}
              value={form.topicsDiscussed}
              onChange={e => dispatch(setField({ field: 'topicsDiscussed', value: e.target.value }))}
              placeholder="Enter key discussion points..."
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            ></textarea>
            <Mic className="absolute right-3 bottom-3 h-4 w-4 text-slate-400 cursor-pointer hover:text-blue-500 transition-colors" />
          </div>
        </div>

        {/* Voice Note Summary Button */}
        <button className="mt-4 flex items-center space-x-2 text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors">
          <Mic className="h-4 w-4" />
          <span>Summarize from Voice Note (Requires Consent)</span>
        </button>

        <div className="mt-8 pt-8 border-t border-slate-100">
          <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">Materials Shared / Samples Distributed</h3>

          {/* <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-lg border border-dashed border-slate-300">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                  <FileText className="h-4 w-4 text-slate-400" />
                  <span>Materials Shared</span>
                </div>
                <button className="flex items-center space-x-1 text-xs bg-white px-2 py-1 border border-slate-200 rounded shadow-sm hover:bg-slate-50 transition-all font-medium">
                  <Search className="h-3 w-3" />
                  <span>Search/Add</span>
                </button>
              </div>
              <p className="text-sm text-slate-400 italic">No materials added.</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-dashed border-slate-300">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                  <Package className="h-4 w-4 text-slate-400" />
                  <span>Samples Distributed</span>
                </div>
                <button className="flex items-center space-x-1 text-xs bg-white px-2 py-1 border border-slate-200 rounded shadow-sm hover:bg-slate-50 transition-all font-medium">
                  <Plus className="h-3 w-3" />
                  <span>Add Sample</span>
                </button>
              </div>
              <p className="text-sm text-slate-400 italic">No samples added.</p>
            </div>
          </div> */}
        </div>

        {/* Sentiment */}
        <div className="mt-8">
          <label className="text-sm font-medium text-slate-600 block mb-3">Observed/Inferred HCP Sentiment</label>
          <div className="flex items-center space-x-8">
            {['Positive', 'Neutral', 'Negative'].map((sentiment) => (
              <label key={sentiment} className="flex items-center space-x-2 cursor-pointer group">
                <input
                  checked={form.sentiment === sentiment}
                  onChange={() => dispatch(setField({ field: 'sentiment', value: sentiment }))}
                  type="radio" name="sentiment" className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500" />
                <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">{sentiment}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Outcomes */}
        <div className="mt-8 space-y-2">
          <label className="text-sm font-medium text-slate-600 block">Outcomes</label>
          <textarea
            rows={2}
            placeholder="Key outcomes or agreements..."
            value={form.outcomes}
            onChange={e => dispatch(setField({ field: 'outcomes', value: e.target.value }))}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
          ></textarea>
        </div>

        {/* Follow-up Actions */}
        <div className="mt-6 space-y-2">
          <label className="text-sm font-medium text-slate-600 block">Follow-up Actions</label>
          <textarea
            rows={2}
            placeholder="Enter next steps or tasks..."
            value={form.followUpActions}
            onChange={e => dispatch(setField({ field: 'followUpActions', value: e.target.value }))}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
          ></textarea>
        </div>

        {/* AI Suggested Follow-ups */}
        <div className="mt-8">
          <div className="flex items-center space-x-2 mb-3">
            <Info className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-semibold text-slate-700">AI Suggested Follow-ups:</span>
          </div>
          <ul className="space-y-2">
            {[
              "Schedule follow-up meeting in 2 weeks",
              "Send Oncoliazzd Phase III PDF",
              "Add Dr. Sharma to advisory board invite list"
            ].map((item, i) => (
              <li key={i} className="flex items-start space-x-2 text-sm text-blue-600 hover:underline cursor-pointer">
                <span>+</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InteractionDetails;
