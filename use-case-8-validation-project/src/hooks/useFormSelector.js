import { useSelector } from "react-redux";

export const useFormSelector = () => {
  return useSelector((state) => state.form);
};
