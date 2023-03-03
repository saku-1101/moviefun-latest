import { configureStore } from '@reduxjs/toolkit';
import InputSliceReducer from '../features/InputStore/InputSlice';

export default configureStore({
  reducer: {
    inputStore: InputSliceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
