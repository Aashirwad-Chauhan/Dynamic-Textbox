// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   textBoxes: [],
//   selectedBox: null
// };

// const textBoxSlice = createSlice({
//   name: 'textBox',
//   initialState,
//   reducers: {
//     addTextBox: (state) => {
//       const newBox = {
//         id: Date.now(),
//         text: 'Text Sample',
//         x: 362,
//         y: -572,
//         width: 200,
//         height: 125,
//         fontSize: 16,
//         fontFamily: 'Arial',
//         fontWeight: 'normal',
//         color: '#FF0000',
//         stroke: '#000000',
//         strokeWidth: 1
//       };
//       state.textBoxes.push(newBox);
//       state.selectedBox = newBox;
//     },
//     updateTextBox: (state, action) => {
//         const { id, updates } = action.payload;
//         console.log('Updating text box:', id, updates); // Log the updates being applied
//         const index = state.textBoxes.findIndex((box) => box.id === id);
//         if (index !== -1) {
//           const textBox = state.textBoxes[index];
//           const updatedTextBox = {
//             ...textBox,
//             ...updates
//           };
//           state.textBoxes[index] = updatedTextBox;
      
//           if (state.selectedBox && state.selectedBox.id === id) {
//             state.selectedBox = updatedTextBox;
//           }
//         }
//       },
//     deleteTextBox: (state, action) => {
//       state.textBoxes = state.textBoxes.filter((box) => box.id !== action.payload);
//       if (state.selectedBox && state.selectedBox.id === action.payload) {
//         state.selectedBox = null;
//       }
//     },
//     selectTextBox: (state, action) => {
//       state.selectedBox = state.textBoxes.find((box) => box.id === action.payload);
//     }
//   }
// });

// export const { addTextBox, updateTextBox, deleteTextBox, selectTextBox } = textBoxSlice.actions;
// export default textBoxSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  textBoxes: [],
  selectedBox: null,
};

const textBoxSlice = createSlice({
  name: 'textBox',
  initialState,
  reducers: {
    addTextBox: (state) => {
      const newBox = {
        id: Date.now(),
        text: 'Text Sample',
        x: 362,
        y: -572,
        width: 200,
        height: 125,
        fontSize: 26,
        fontFamily: 'Arial',
        fontWeight: 'normal',
        color: '#FF0000',
        stroke: '#000000',
        strokeWidth: 1,
        textStyle: {
          textAlign: 'left',
          fontWeight: 'normal',
          fontStyle: 'normal',
          textDecoration: 'none',
        },
      };
      state.textBoxes.push(newBox);
      state.selectedBox = newBox;
    },
    updateTextBox: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.textBoxes.findIndex((box) => box.id === id);
      if (index !== -1) {
        const textBox = state.textBoxes[index];
        const updatedTextBox = { ...textBox, ...updates };
        state.textBoxes[index] = updatedTextBox;
        if (state.selectedBox && state.selectedBox.id === id) {
          state.selectedBox = updatedTextBox;
        }
      }
    },
    deleteTextBox: (state, action) => {
      state.textBoxes = state.textBoxes.filter((box) => box.id !== action.payload);
      if (state.selectedBox && state.selectedBox.id === action.payload) {
        state.selectedBox = null;
      }
    },
    selectTextBox: (state, action) => {
      state.selectedBox = state.textBoxes.find((box) => box.id === action.payload);
    },
  },
});

export const { addTextBox, updateTextBox, deleteTextBox, selectTextBox } = textBoxSlice.actions;
export default textBoxSlice.reducer;