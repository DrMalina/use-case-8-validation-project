import { Fragment } from "react";
import { useStoreForm } from "../hooks/useStoreForm";
import { camelCaseToTitleCase } from "../utils/camelCaseToTitleCase";

export function StoreForm() {
  const {
    inputValues,
    validationErrors,
    isFormValid,
    handleInputChange,
    updateInputValuesInStore,
  } = useStoreForm();

  const onSubmit = (event) => {
    event.preventDefault();
    updateInputValuesInStore();
    console.log("Information was recorded and could be further sent.");
    console.log({ inputValues });
    alert("Successfully updated values in store");
  };

  const inputs = Object.keys(inputValues).map((name) => ({
    name,
    displayName: camelCaseToTitleCase(name),
    value: inputValues[name],
    inputType: name === "email" ? "email" : "text",
    error: validationErrors[name],
    onChange: handleInputChange,
    onBlur: handleInputChange,
  }));

  return (
    <form onSubmit={onSubmit}>
      {inputs.map((input) => (
        <Fragment key={input.name}>
          <Input {...input} />
          <br />
        </Fragment>
      ))}
      <SubmitButton isDisabled={!isFormValid} />
    </form>
  );
}

export function Input({
  name,
  displayName,
  value,
  inputType,
  error,
  onChange,
  onBlur,
}) {
  return (
    <label>
      {displayName + " "}
      <input
        name={name}
        value={value}
        type={inputType}
        onChange={onChange}
        onBlur={onBlur}
      />
      {!!error && <InputErrorMessage message={error} />}
    </label>
  );
}

export function InputErrorMessage({ message }) {
  return <span style={{ color: "red" }}>{message}</span>;
}

export function SubmitButton({ isDisabled }) {
  return <input type="submit" disabled={isDisabled} />;
}
