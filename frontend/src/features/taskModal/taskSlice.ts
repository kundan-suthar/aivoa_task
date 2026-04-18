import { createSlice,type PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  type: string;
  status: 'Pending' | 'In Progress' | 'Completed';
}

interface TaskState {
  tasks: Task[];
  isListModalOpen: boolean;
}

const initialState: TaskState = {
  tasks: [],
  isListModalOpen: false,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      // Avoid duplicates
      if (!state.tasks.find(t => t.id === action.payload.id)) {
        state.tasks.unshift(action.payload);
      }
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    toggleListModal: (state, action: PayloadAction<boolean>) => {
      state.isListModalOpen = action.payload;
    }
  },
});

export const { addTask, updateTask, toggleListModal } = taskSlice.actions;
export default taskSlice.reducer;
