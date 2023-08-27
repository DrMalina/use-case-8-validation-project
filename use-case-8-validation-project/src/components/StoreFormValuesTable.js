import { useFormSelector } from "../hooks/useFormSelector";
import { reverseString } from "../utils/reverseString";

const tableRowStyleOptions = { padding: "5px", border: "1px solid black" };

export function StoreFormValuesTable() {
  const formValues = useFormSelector();

  const formValuesEntries = Object.entries(formValues);
  const tableHeaders = Object.keys(formValues);

  return (
    <table>
      <caption>Form values in store</caption>
      <thead>
        <tr>
          {tableHeaders.map((header) => (
            <TableHeader key={header} name={header} />
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {formValuesEntries.map(([header, value]) => (
            <TableDataCell key={reverseString(header)} value={value} />
          ))}
        </tr>
      </tbody>
    </table>
  );
}

function TableHeader({ name }) {
  return <th style={tableRowStyleOptions}>{name}</th>;
}

function TableDataCell({ value }) {
  return <td style={tableRowStyleOptions}>{value}</td>;
}
