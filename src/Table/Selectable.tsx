import { forwardRef, useEffect, useRef } from "react"
import {
  Row,
  TableToggleAllRowsSelectedProps,
  useRowSelect,
  useTable,
} from "react-table"

//данные
import { data } from "../data"

// импортируем колонки из компонента сортируемой таблицы
import { columns } from "./Sortable"

// компонент чекбокса
export const IndeterminateCheckbox = forwardRef(
  (
    { indeterminate, ...rest }: Partial<TableToggleAllRowsSelectedProps>,
    ref,
  ) => {
    const defaultRef = useRef<HTMLInputElement | null>(null)
    const resolvedRef =
      (ref as React.MutableRefObject<HTMLInputElement | null>) || defaultRef

    useEffect(() => {
      if (resolvedRef.current) {
        resolvedRef.current.indeterminate = indeterminate as boolean
      }
    }, [resolvedRef, indeterminate])

    return <input ref={resolvedRef} type="checkbox" {...rest} />
  },
)

export default function Selectable() {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // новые штуки
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable({ columns, data }, useRowSelect, ({ visibleColumns }) => {
    visibleColumns.push((cols) => [
      // добавляем колонку для выбора строки
      {
        id: "selection",
        // компонент заголовка
        // принимает экземпляр таблицы и модель колонки
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
        ),
        // компонент ячейки
        // принимает экземпляр таблицы и модель ячейки
        Cell: ({ row }: { row: Row<any> }) => (
          <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
        ),
      },
      ...cols,
    ])
  })

  return (
    <>
      <h1>Таблица с возможностью выбора строк</h1>
      <div className="table-wrapper">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((hG, index) => (
              <tr {...hG.getHeaderGroupProps()} key={index}>
                {hG.headers.map((col, index) => (
                  <th {...col.getHeaderProps()} key={index}>
                    {col.render("Header")}{" "}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row)

              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => (
                    <td {...cell.getCellProps()} key={index}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div>
        {/* количество выбранных строк */}
        <p>Selected rows count: {Object.keys(selectedRowIds).length}</p>
        {/* выбранные строки */}
        <pre>
          <code>
            {JSON.stringify(
              selectedFlatRows.map((d) => d.original),
              null,
              2,
            )}
          </code>
        </pre>
      </div>
    </>
  )
}
