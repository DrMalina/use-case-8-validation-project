import { useEffect, useState } from "react";
import { useFormSelector } from "./useFormSelector";
import { useDispatch } from "react-redux";
import { Actions } from "../store/index";

import validator from "validator";

export const useStoreForm = () => {
  const { firstName, lastName, email, message } = useFormSelector();
  const dispatch = useDispatch();
  const [inputValues, setInputValues] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const formValues = { firstName, lastName, email, message };

    setInputValues((values) => ({ ...values, ...formValues }));

    const initValidationErrors = Object.keys(formValues).reduce(
      (obj, key) => ({ ...obj, [key]: "" }),
      {}
    );

    setValidationErrors((errors) => ({ ...errors, ...initValidationErrors }));
  }, [firstName, lastName, email, message]);

  const isSomeValidationError = Object.values(validationErrors).some(
    (err) => err
  );
  const isFormFilled = Object.values(inputValues).every((val) => val);
  const isFormValid = isFormFilled && !isSomeValidationError;

  const validate = (name, value) => {
    let errMsg = "";

    switch (name) {
      case "firstName":
      case "lastName":
        if (validator.isEmpty(value)) errMsg = "Value must be present";
        break;
      case "email":
        if (!validator.isEmail(value)) errMsg = "Value must be a valid email";
        break;
      case "message":
        if (!validator.isLength(value, { min: 10 }))
          errMsg = "Message must be minimum 10 characters long";
        break;
      default:
        break;
    }

    setValidationErrors((errors) => ({ ...errors, [name]: errMsg }));
    return value;
  };

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputValues((values) => ({ ...values, [name]: validate(name, value) }));
  };

  const updateInputValuesInStore = () => {
    dispatch({ type: Actions.SET_FORM_VALUES, payload: inputValues });
  };

  return {
    inputValues,
    validationErrors,
    isSomeValidationError,
    isFormEmpty: isFormFilled,
    isFormValid,
    dispatch,
    setInputValues,
    setValidationErrors,
    handleInputChange,
    updateInputValuesInStore,
  };
};
