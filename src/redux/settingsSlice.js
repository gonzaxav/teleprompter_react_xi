import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inputText: `
  <p>Welcome to the teleprompter app!</p>
  <p>This is a sample tutorial text you may use to get a feel for how the app functions.</p>
  <p>The app breaks down the text based on a variety of factors including commas, periods, exclamation marks, line breaks, etc. to make it easier and more natural-sounding for a voice actor to read.</p>
  <p>The app respects <strong>bold</strong>, <em>italics</em>, and even <u>underlined</u> text.</p>
  <p>On the sides are two hover areas to move to the next or previous line. You can also find settings to help customize your experience in the top right. We hope you enjoy using the teleprompter application. If it’s useful to you, you can send a donation to our PayPal below.</p>`,
  bgColor: "#808080",
  textColor: "#ffffff",
  textBorderColor: "#000000",
  nextTextColor: "#454545",
  displayHoverBtns: true,
  displayActions: true,
  enableHotkeys: true,
  hoverRadioValue: "split",
  fontSize: 64,
  textStroke: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setInputText(state, action) {
      state.inputText = action.payload;
    },
    setString(state, action) {
      const { name, value } = action.payload;
      if (state.hasOwnProperty(name)) {
        state[name] = value;
      }
    },
    setDisplayHoverBtns(state, action) {
      state.displayHoverBtns = action.payload;
    },
    setDisplayActions(state, action) {
      state.displayActions = action.payload;
    },
    setEnableHotkeys(state, action) {
      state.enableHotkeys = action.payload;
    },
    setHoverRadioValue(state, action) {
      state.hoverRadioValue = action.payload;
    },
    setFontSize(state, action) {
      state.fontSize = action.payload;
    },
    setTextStroke(state, action) {
      state.textStroke = action.payload;
    },
    resetState(state) {
      Object.keys(initialState).forEach(key => {
        if (key !== 'inputText') {
          state[key] = initialState[key];
        }
      });
    },
  },
});

const { actions, reducer } = settingsSlice;
export const {
  setInputText,
  setString,
  setDisplayHoverBtns,
  setDisplayActions,
  setEnableHotkeys,
  setHoverRadioValue,
  setFontSize,
  setTextStroke,
  resetState,
} = actions;
export default reducer;
