import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface TaskModalState {
  isOpen: boolean;
  taskData: {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    type: string;
    status: 'Pending' | 'In Progress' | 'Completed';
  } | null;
}


const initialState: TaskModalState = {
  isOpen: false,
  taskData: {
    id: 'TASK-123',
    title: 'Sollow-up Task',
    description: 'Refine the architectural details for the next sprint.',
    dueDate: '11/28/2026',
    type: 'Call',
    status: 'In Progress',
  },
};

const taskModalSlice = createSlice({
  name: 'taskModal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<TaskModalState['taskData']>) => {
      state.isOpen = true;
      state.taskData = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.taskData = null;
    },
    updateTaskData: (state, action: PayloadAction<Partial<NonNullable<TaskModalState['taskData']>>>) => {
      if (state.taskData) {
        state.taskData = { ...state.taskData, ...action.payload };
      }
    },
  },
});

export const { openModal, closeModal, updateTaskData } = taskModalSlice.actions;
export default taskModalSlice.reducer;
