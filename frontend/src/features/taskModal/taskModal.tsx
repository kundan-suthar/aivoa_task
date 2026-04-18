import React from 'react';
import { X, Calendar, ChevronDown } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { closeModal, updateTaskData } from './taskModalSlice';
import { addTask } from './taskSlice';

const TaskModal = () => {
    const dispatch = useAppDispatch();
    const { isOpen, taskData } = useAppSelector((state) => state.taskModal);

    if (!isOpen || !taskData) return null;

    const handleClose = () => {
        dispatch(closeModal());
    };

    const handleSave = () => {
        dispatch(addTask(taskData));
        dispatch(closeModal());
    };

    const handleFieldChange = (field: keyof typeof taskData, value: string) => {
        dispatch(updateTaskData({ [field]: value }));
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={handleClose}
        >
            <div
                className="bg-white w-full max-w-[440px] rounded-[40px] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Section */}
                <div className="px-8 pt-8 pb-4 flex justify-between items-start">
                    <div className="px-4 py-1.5 bg-slate-100/80 rounded-full text-[11px] font-bold text-slate-500 tracking-wider">
                        {taskData.id || '#TASK-NEW'}
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-slate-100 rounded-2xl transition-all text-slate-400 hover:text-slate-600 active:scale-90"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Content Section */}
                <div className="px-8 pb-8 space-y-8">
                    <div>
                        <h2 className="text-[32px] font-extrabold text-slate-800 leading-tight tracking-tight">
                            {taskData.title}
                        </h2>

                    </div>

                    <div className="space-y-6">
                        {/* Title Field */}
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] ml-1">Title</label>
                            <input
                                type="text"
                                value={taskData.title}
                                onChange={(e) => handleFieldChange("title", e.target.value)}
                                className="w-full px-6 py-4 bg-[#E9F0F4] border-none rounded-2xl text-slate-700 font-semibold focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400 outline-none"
                            />
                        </div>

                        {/* Date & Type Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] ml-1">Due Date</label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        value={taskData.dueDate}
                                        onChange={(e) => handleFieldChange("dueDate", e.target.value)}
                                        className="w-full px-6 py-4 bg-[#E9F0F4] border-none rounded-2xl text-slate-700 font-semibold focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer outline-none"
                                    />
                                    <Calendar className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-hover:text-blue-500 transition-colors pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] ml-1">Type</label>
                                <div className="relative group">
                                    <select
                                        className="w-full px-6 py-4 bg-[#E9F0F4] border-none rounded-2xl text-slate-700 font-semibold appearance-none focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer outline-none"
                                        value={taskData.type}
                                        onChange={(e) => handleFieldChange("type", e.target.value)}
                                    >
                                        <option>Email</option>
                                        <option>Call</option>
                                        <option>Meeting</option>
                                        <option>Visit</option>
                                    </select>
                                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-hover:text-blue-500 transition-colors pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Status Selection */}
                        <div className="space-y-3">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] ml-1">Status</label>
                            <div className="flex bg-[#E9F0F4] p-1.5 rounded-[24px] gap-1.5">
                                {(['Pending', 'In Progress', 'Completed'] as const).map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => handleFieldChange("status", s)}
                                        className={`flex-1 py-3 rounded-[18px] text-[13px] font-bold transition-all duration-300 ${taskData.status === s
                                            ? 'bg-[#DDE4FF] text-[#4F6BE7] shadow-sm scale-[1.02]'
                                            : 'text-slate-400 hover:text-slate-500 hover:bg-white/40'
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 bg-[#F8FAFC] flex items-center gap-4">
                    <button
                        onClick={handleClose}
                        className="flex-1 py-4.5 text-[15px] font-bold text-slate-500 hover:text-slate-700 transition-all hover:-translate-y-0.5 active:translate-y-0"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-[1.8] py-4.5 bg-[#2E55A5] hover:bg-[#254689] text-white rounded-[22px] text-[15px] font-bold shadow-[0_12px_24px_-8px_rgba(46,85,165,0.4)] hover:shadow-[0_16px_32px_-8px_rgba(46,85,165,0.5)] transition-all hover:-translate-y-1 active:scale-[0.98] active:translate-y-0"
                    >
                        Save Task
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
