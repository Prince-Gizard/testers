import React from "react"
import { TableInstance } from "react-table"

type Props = Pick<
  TableInstance<any>,
  | "canNextPage"
  | "canPreviousPage"
  | "gotoPage"
  | "nextPage"
  | "pageCount"
  | "pageIndex"
  | "pageSize"
  | "previousPage"
  | "setPageSize"
>

export default function Pagination(props: Props) {
  // метод перехода к первой странице
  const gotoFirstPage = () => props.gotoPage(0)
  // метод перехода к последней странице
  const gotoLastPage = () => props.gotoPage(props.pageCount - 1)
  // метод перехода к указанной странице
  const gotoPage: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    // индекс массива
    const page = e.target.value ? Number(e.target.value) - 1 : 0
    props.gotoPage(page)
  }
  // метод установки размера страницы
  const setPageSize: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const size = Number(e.target.value)
    props.setPageSize(size)
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0 1rem",
      }}
    >
      <span>
        <button disabled={!props.canPreviousPage} onClick={gotoFirstPage}>
          {"<<"}
        </button>
        <button disabled={!props.canPreviousPage} onClick={props.previousPage}>
          {"<"}
        </button>
        <button disabled={!props.canNextPage} onClick={props.nextPage}>
          {">"}
        </button>
        <button disabled={!props.canNextPage} onClick={gotoLastPage}>
          {">>"}
        </button>
      </span>
      <span>
        Page {props.pageIndex + 1} of {props.pageCount}
      </span>
      <label>
        Go to page:{" "}
        <input
          defaultValue={props.pageIndex + 1}
          style={{ width: "8ch" }}
          type="number"
          onChange={gotoPage}
        />
      </label>
      <select value={props.pageSize} onChange={setPageSize}>
        {[10, 20, 30].map((size) => (
          <option key={size} value={size}>
            Show {size}
          </option>
        ))}
      </select>
    </div>
  )
}
