import { usePagination, useTable } from "react-table"

// данные
import { data } from "../../data"
// берем колонки из предыдущего примера
import { columns } from "../Filterable"

import Pagination from "./Pagination"

export default function Paginated() {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    // новые штуки
    state: { pageIndex, pageSize },
    page,
    // возможно, здесь стоило использовать `...otherProps` :)
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      // начальный размер страницы
      initialState: {
        pageSize: 10,
      },
    },
    usePagination,
  )

  return (
    <>
      <h1>Таблица с пагинацией</h1>
      <div className="table-wrapper">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((hG, index) => (
              <tr {...hG.getHeaderGroupProps()} key={index}>
                {hG.headers.map((col, index) => (
                  <th {...col.getHeaderProps()} key={index}>
                    {col.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
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
      <br />
      <div>
        {/* пагинация */}
        <Pagination
          canNextPage={canNextPage}
          canPreviousPage={canPreviousPage}
          gotoPage={gotoPage}
          nextPage={nextPage}
          pageCount={pageCount}
          pageIndex={pageIndex}
          pageSize={pageSize}
          previousPage={previousPage}
          setPageSize={setPageSize}
        />
        {/* информация о пагинации */}
        <pre>
          <code>
            {JSON.stringify(
              {
                pageIndex,
                pageSize,
                pageCount,
                canNextPage,
                canPreviousPage,
              },
              null,
              2,
            )}
          </code>
        </pre>
      </div>
    </>
  )
}
