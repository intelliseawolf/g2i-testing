import {
  configureStore,
  ThunkAction,
  Action,
  PreloadedState,
} from "@reduxjs/toolkit";
import quizSlice from "./modules/quizSlice";

export const store = configureStore({
  reducer: {
    quiz: quizSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// @ts-ignore
if (window.Cypress) {
  // @ts-ignore
  window.store = store;
}

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: {
      quiz: quizSlice,
    },
    preloadedState,
  });
}
