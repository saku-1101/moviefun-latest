export {};
// import { createSlice } from '@reduxjs/toolkit';
// import getAllKeywordsIds from '../../core/infrastructures/getKeyword';
// import type { RootState } from '../../app/store';

// interface InputState {
//   value: string;
//   keyNums: number[];
// }

// const initialState: InputState = {
//   value: '',
//   keyNums: [],
// };

// export const InputSlice = createSlice({
//   name: 'input',
//   initialState,
//   reducers: {
//     // {type: "input/getKey"}
//     getKeyIDs: (state) => {
//       state.keyNums = state;
//     },
//   },
// });

// // Thunk function
// export async function fetchKeyIDs(input: string, dispatch, getState) {
//   const response: Promise<void | number[]> = getAllKeywordsIds(input)
//     .then((res) => {
//       return res;
//     })
//     .catch((err) => console.log(err));
//   // dispatch an action containing that array as the payload
//   dispatch({ type: 'input/fetchKeyIDs', payload: response });
// }

// // Action creators are generated for each case reducer function
// export const { getKeyIDs } = InputSlice.actions;
// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.inputStore.value;
// export default InputSlice.reducer;

// // Sliceとは、アプリ内の1つの機能に対するReduxのreducerロジックとactionの集合体
// // import してこのオブジェクトを使う
