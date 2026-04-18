import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import interactionReducer from '../features/interactionDetails/interactionDetailsSlice';
import taskModalReducer from '../features/taskModal/taskModalSlice';
import taskReducer from '../features/taskModal/taskSlice';

export const store = configureStore({
  reducer: { 
    counter: counterReducer, 
    interaction: interactionReducer,
    taskModal: taskModalReducer,
    tasks: taskReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch