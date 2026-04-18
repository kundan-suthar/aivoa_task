import React from 'react';
import { X, Search, Calendar, Mail, ChevronRight, Users, Briefcase } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleListModal } from './taskSlice';

const TaskListModal = () => {
    const dispatch = useAppDispatch();
    const { tasks, isListModalOpen } = useAppSelector((state) => state.tasks);
    const [searchQuery, setSearchQuery] = React.useState('');

    if (!isListModalOpen) return null;

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'In Progress': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'Completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'Pending': return 'bg-slate-100 text-slate-500 border-slate-200';
            default: return 'bg-slate-50 text-slate-500 border-slate-100';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case 'email': return <Mail className="h-4 w-4" />;
            case 'meeting': return <Users className="h-4 w-4" />;
            case 'legal': return <Briefcase className="h-4 w-4" />;
            default: return <Calendar className="h-4 w-4" />;
        }
    };

    return (
        <div
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => dispatch(toggleListModal(false))}
        >
            <div
                className="bg-[#F8FAFC] w-full max-w-[480px] h-[85vh] rounded-[48px] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] flex flex-col animate-in zoom-in-95 slide-in-from-bottom-8 duration-500"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-8 pb-6 bg-white border-b border-slate-100">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-[32px] font-extrabold text-slate-900 tracking-tight leading-none">Tasks List</h1>
                            <p className="text-[15px] text-slate-500 font-semibold mt-2">{tasks.length} active requirements</p>
                        </div>
                        <button
                            onClick={() => dispatch(toggleListModal(false))}
                            className="p-3 hover:bg-slate-100 rounded-[20px] transition-all active:scale-90 text-slate-400"
                        >
                            <X className="h-7 w-7" />
                        </button>
                    </div>

                    <div className="relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-100 border-none rounded-[24px] py-4.5 pl-16 pr-6 text-slate-700 font-semibold placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                        />
                    </div>
                </div>

                {/* List Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide bg-slate-50/30">
                    {filteredTasks.map((task) => (
                        <div
                            key={task.id}
                            className="bg-white p-6 rounded-[36px] border border-slate-100 shadow-sm hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-500 cursor-pointer group hover:border-blue-100"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className="px-4 py-1.5 bg-slate-100 rounded-full text-[11px] font-bold text-slate-500 tracking-wider">
                                    #{task.id}
                                </span>
                                <span className={`px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] border ${getStatusStyle(task.status)}`}>
                                    {task.status}
                                </span>
                            </div>

                            <h3 className="text-[19px] font-extrabold text-slate-800 mb-1.5 group-hover:text-blue-600 transition-colors tracking-tight">
                                {task.title}
                            </h3>
                            <p className="text-[14px] text-slate-500 font-medium leading-relaxed line-clamp-2 mb-5">
                                {task.description}
                            </p>

                            <div className="flex items-center justify-between mt-auto">
                                <div className="flex items-center space-x-5">
                                    <div className="flex items-center space-x-2 text-slate-400 font-bold text-[11px]">
                                        <Calendar className="h-4 w-4" />
                                        <span>{task.dueDate}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-slate-400 font-bold text-[11px]">
                                        {getTypeIcon(task.type)}
                                        <span>{task.type}</span>
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-2.5 rounded-2xl group-hover:bg-blue-50 transition-all border border-transparent group-hover:border-blue-100 shadow-sm group-hover:shadow-blue-500/10">
                                    <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-blue-500" />
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredTasks.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-300">
                            <Search className="h-16 w-16 mb-6 opacity-20" />
                            <p className="font-extrabold text-xl">No tasks found</p>
                            <p className="text-sm font-medium mt-1">Try searching for something else</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskListModal;
