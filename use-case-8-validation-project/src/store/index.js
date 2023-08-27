import { combineReducers, createStore } from "redux";

const Actions = {
  SET_FORM_VALUES: "SET_FORM_VALUES",
};

export const initialFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
};

const formReducer = (state = initialFormValues, action) => {
  switch (action.type) {
    case Actions.SET_FORM_VALUES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({ form: formReducer });

export const store = createStore(rootReducer);
