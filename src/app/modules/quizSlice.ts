import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import { fetchQuizList } from "../../services/quiz.service";

export interface Quiz {
  category: string;
  type?: string;
  difficulty?: string;
  question: string;
  correct_answer: string;
  incorrect_answers?: [];
}

interface Answer {
  id: number;
  answer: string;
}

interface QuizState {
  result: Answer[];
  quizList: Quiz[];
  status: "idle" | "loading" | "failed";
}

const initialState: QuizState = {
  result: [],
  quizList: [],
  status: "idle",
};

export const getQuizList = createAsyncThunk("quiz/getQuizList", async () => {
  const response: AxiosResponse = await fetchQuizList();

  return response.data;
});

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    addAnswer: (state, action: PayloadAction<Answer>) => {
      const index = state.result.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index !== -1) {
        state.result.splice(index, 1, action.payload);
      } else {
        state.result.push(action.payload);
      }
    },
    clearAnswer: (state) => {
      state.result = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuizList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getQuizList.fulfilled, (state, action) => {
        state.status = "idle";
        state.quizList = action.payload.results;
      })
      .addCase(getQuizList.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addAnswer, clearAnswer } = quizSlice.actions;

export default quizSlice.reducer;
