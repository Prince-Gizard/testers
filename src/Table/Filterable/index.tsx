import { useFilters, useGlobalFilter, useTable } from "react-table"

import { data } from "../../data"

import {
  DefaultColumnFilter,
  filterGreaterThanOrEqual,
  filterTypes,
  GlobalFilter,
  NumberRangeColumnFilter,
  SliderColumnFilter,
} from "./filters"

// определения колонок
export const columns: any = [
  {
    Header: "Id объекта",
    accessor: "id",
  },
  {
    Header: "Название объекта",
    accessor: "title",
    sortType: "string",
    // кастомный тип фильтрации
    filter: "fuzzyText",
  },
  {
    Header: "Id родительского типа объекта",
    accessor: "type_id",
  },
  {
    Header: "Родительский тип объекта",
    accessor: "type",
  },
  {
    Header: "Id муниципального образования",
    accessor: "municipality_id",
  },
  {
    Header: "Муниципальное образование",
    accessor: "municipality",
  },
  {
    Header: "Id стадии",
    accessor: "stage_id",
  },
  {
    Header: "Стадия",
    accessor: "stage",
  },
  {
    Header: "Id исполнителя СМР",
    accessor: "builder_id",
  },
  {
    Header: "Исполнитель СМР",
    accessor: "builder_name",
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    Header: "Стройготовность (%) согласно последнему отчету",
    accessor: "construction_ready",
    // кастомный UI фильтра
    Filter: SliderColumnFilter,
    // встроенный тип фильтрации
    filter: "equals",
  },
  {
    Header: "Дата ввода в эксплуатацию по ГП",
    accessor: "expluatation",
  },
  {
    Header: "Id типа заказчика",
    accessor: "zk_type_id",
  },
  {
    Header: "Тип заказчика",
    accessor: "zk_type",
  },
  {
    Header:
      "Наличие камеры у объекта. Всегда равен 1, если объект не на стадии СМР",
    accessor: "is_camers",
  },
  {
    Header:
      "Наличие ГПР у объекта. Всегда равен 1, если объект не на стадии СМР",
    accessor: "is_dgpr",
  },
  {
    Header: "Дата последнего отчета по объекту",
    accessor: "dgprDateLastReport",
  },
  {
    Header: "Дата начала первой операции по ГПР",
    accessor: "startAt",
  },
  {
    Header:
      "Отсутствие отчетов более недели. Проставляется только для объектов на стадии СМР и если прошла неделя от startAt",
    accessor: "dgprDateLastReportOverdueWeek",
  },
  {
    Header:
      "Разница строительной готовности между планом и фактом более 1%. Проставляется только для объектов на стадии СМР и после startAt",
    accessor: "isDeviationsSG",
  },
  {
    Header:
      "Отклонения по строительной готовности между планом и фактом более 10%. Проставляется только для объектов на стадии СМР и после startAt",
    accessor: "isTotalConstructionReadyFactDeviation",
  },
  {
    Header: "Стадия",
    accessor: "isTotalCountPeopleFactDeviation",
  },
  {
    Header: "Прямая ссылка на объект в системе МБР или КР",
    accessor: "url",
  },
  {
    Header: "Количество рабочих по факту согласно последнему отчету",
    accessor: "totalCountPeopleFact",
    Filter: NumberRangeColumnFilter,
    filter: "between",
  },
  {
    Header: "Количество рабочих по плану согласно таблице СГ",
    accessor: "totalCountPeoplePlan",
  },
  {
    Header: "Строительная готовность (%) по плану согласно таблице СГ",
    accessor: "totalConstructionReadyPlan",
  },
  {
    Header: "Строительная готовность (%) по факту согласно последнему отчету",
    accessor: "totalConstructionReadyFact",
    Filter: SliderColumnFilter,
    // кастомная функция фильтрации
    filter: filterGreaterThanOrEqual,
  },
]

// настройки колонки по умолчанию
export const defaultColumn = {
  Filter: DefaultColumnFilter,
  // https://github.com/TanStack/table/issues/2293
  filter: "text",
}

export default function Filterable() {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // новые штуки
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    { columns, data, defaultColumn, filterTypes },
    useGlobalFilter,
    useFilters,
  )

  return (
    <>
      <h1>Таблица с фильтрацией</h1>
      <div className="table-wrapper">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((hG, index) => (
              <tr {...hG.getHeaderGroupProps()} key={index}>
                {hG.headers.map((col, index) => (
                  <th {...col.getHeaderProps()} key={index}>
                    {col.render("Header")}
                    {/* рендерим компонент фильтра колонки в случае, если колонка является фильтруемой */}
                    {col.canFilter ? <div>{col.render("Filter")}</div> : null}
                  </th>
                ))}
              </tr>
            ))}
            <tr>
              <th colSpan={visibleColumns.length}>
                {/* компонент глобального фильтра */}
                <GlobalFilter
                  globalFilter={state.globalFilter}
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  setGlobalFilter={setGlobalFilter}
                />
              </th>
            </tr>
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
        {/* количество отфильтрованных строк */}
        <p>Filtered rows count: {rows.length}</p>
        {/* выбранные фильтры */}
        <pre>
          <code>{JSON.stringify(state.filters, null, 2)}</code>
        </pre>
      </div>
    </>
  )
}
