import { BiSortAlt2, BiSortDown, BiSortUp } from "react-icons/bi"
import {
  Row,
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table"

// данные
import { data } from "../data"

// кастомная функция фильтрации, типы фильтрации и компоненты фильтров
import {
  filterGreaterThanOrEqual,
  filterTypes,
  GlobalFilter,
  NumberRangeColumnFilter,
  SliderColumnFilter,
} from "./Filterable/filters"
// компонент пагинации
import Pagination from "./Paginated/Pagination"
// дефолтные настройки колонки
import { defaultColumn } from "./Filterable"
// компонент чекбокса
import { IndeterminateCheckbox } from "./Selectable"
// типы сортировки
import { sortTypes } from "./Sortable"
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

export default function Complex() {
  const {
    // обязательные штуки
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    // состояние
    state: { globalFilter, pageIndex, pageSize, filters },
    // фильтрация
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    // пагинация
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // выбор строк
    selectedFlatRows,
  } = useTable(
    // настройки
    {
      columns,
      data,
      sortTypes,
      defaultColumn,
      filterTypes,
      initialState: {
        pageSize: 10,
      },
    },
    // плагины
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    // встроенные хуки
    ({ visibleColumns }) => {
      visibleColumns.push((cols) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }: { row: Row<any> }) => (
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          ),
        },
        ...cols,
      ])
    },
  )

  return (
    <>
      <h1>Комплексная таблица</h1>
      <div className="table-wrapper">
        <table {...getTableProps()}>
          <thead>
            {headerGroups?.map((hG, index) => (
              <tr {...hG.getHeaderGroupProps()} key={index}>
                {hG?.headers.map((col, index) => (
                  <th
                    {...col.getHeaderProps(col.getSortByToggleProps())}
                    key={index}
                  >
                    {col.render("Header")}
                    {/* иконка сортировки */}
                    {col.canSort && (
                      <span>
                        {col.isSorted ? (
                          col.isSortedDesc ? (
                            <BiSortUp />
                          ) : (
                            <BiSortDown />
                          )
                        ) : (
                          <BiSortAlt2 />
                        )}
                      </span>
                    )}
                    {/* UI фильтра */}
                    {col.canFilter ? <div>{col.render("Filter")}</div> : null}
                  </th>
                ))}
              </tr>
            ))}
            <tr>
              <th colSpan={visibleColumns.length}>
                {/* глобальный фильтр */}
                <GlobalFilter
                  globalFilter={globalFilter}
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  setGlobalFilter={setGlobalFilter}
                />
              </th>
            </tr>
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
      {/* информация */}
      <div>
        {/* выбранные фильтры */}
        <p>Выбранные фильтры</p>
        <pre>
          <code>{JSON.stringify(filters, null, 2)}</code>
        </pre>
        {/* состояние пагинации */}
        {/* <p>Pagination state</p>
        <pre>
          <code>
            {JSON.stringify(
              {
                pageIndex,
                pageSize,
                pageCount,
                canNextPage,
                canPreviousPage
              },
              null,
              2
            )}
          </code>
        </pre> */}
        {/* выбранные строки */}
        <p>Выбранные строки</p>
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
