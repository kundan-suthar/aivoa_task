// store/interactionSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// interface MaterialItem {
//   id: string;
//   name: string;
// }

// interface SampleItem {
//   id: string;
//   name: string;
//   quantity: number;
// }

interface InteractionFormState {
  hcpName: string;
  interactionType: 'Meeting' | 'Call' | 'Email' | 'Event';
  date: string;
  time: string;
  attendees: string;
  topicsDiscussed: string;
//   materialsShared: MaterialItem[];
//   samplesDistributed: SampleItem[];
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  outcomes: string;
  followUpActions: string;
}

const initialState: InteractionFormState = {
  hcpName: 'kundan suthar',
  interactionType: 'Email',
  date: '2025-04-29',
  time: '20:46',
  attendees: 'Kundan, kumar, suthar',
  topicsDiscussed: 'kundan, kumar, suthar',
//   materialsShared: [],
//   samplesDistributed: [],
  sentiment: 'Negative',
  outcomes: 'kundan, kumar, suthar',
  followUpActions: 'kundan, kumar, suthar',
};

const interactionSlice = createSlice({
  name: 'interaction',
  initialState,
  reducers: {
    // Single field updater — handles all primitive fields
    setField<K extends keyof InteractionFormState>(
      state: InteractionFormState,
      action: PayloadAction<{ field: K; value: InteractionFormState[K] }>
    ) {
      state[action.payload.field] = action.payload.value;
    },
    bulkUpdate(state, action: PayloadAction<Partial<InteractionFormState>>) {
        return { ...state, ...action.payload };
    },

    // addMaterial(state, action: PayloadAction<MaterialItem>) {
    //   state.materialsShared.push(action.payload);
    // },
    // removeMaterial(state, action: PayloadAction<string>) {
    //   state.materialsShared = state.materialsShared.filter(m => m.id !== action.payload);
    // },

    // addSample(state, action: PayloadAction<SampleItem>) {
    //   state.samplesDistributed.push(action.payload);
    // },
    // removeSample(state, action: PayloadAction<string>) {
    //   state.samplesDistributed = state.samplesDistributed.filter(s => s.id !== action.payload);
    // },

    resetForm() {
      return initialState;
    },
  },
});

export const {
  setField,
//   addMaterial,
//   removeMaterial,
//   addSample,
//   removeSample,
  resetForm,
  bulkUpdate
} = interactionSlice.actions;

export default interactionSlice.reducer;