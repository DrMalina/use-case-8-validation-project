import { createStore } from "redux";
import { rootReducer } from "../store/index.js";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

export const getStoreWithState = (preloadedState = {}) => {
  return createStore(rootReducer, preloadedState);
};

export const renderWithProviders = (element, state = {}) => {
  const store = getStoreWithState(state);
  const utils = render(<Provider store={store}>{element}</Provider>);
  return { store, ...utils };
};
