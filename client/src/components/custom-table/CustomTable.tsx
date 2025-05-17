import React from "react";
import styles from "./CustomTable.module.scss";

interface CustomTableProps {
  columns: any[];
  data: any[];
}

export const CustomTable: React.FC<CustomTableProps> = ({ columns, data }) => {
  return (
    <div className={styles.customTable}>
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
