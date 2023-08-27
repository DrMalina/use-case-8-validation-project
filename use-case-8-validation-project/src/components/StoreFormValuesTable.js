import { useFormSelector } from "../hooks/useFormSelector";

const tableRowStyleOptions = { padding: "5px", border: "1px solid black" };

export function StoreFormValuesTable() {
  const formValues = useFormSelector();

  const tableHeaders = Object.keys(formValues);
  const tableValues = Object.values(formValues);

  return (
    <table>
      <caption>Form values in store</caption>
      <thead>
        <tr>
          {tableHeaders.map((header, index) => (
            <TableHeader key={`${index}-${header}`} name={header} />
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {tableValues.map((value, index) => (
            <TableDataCell key={`${index}-${value}`} value={value} />
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
