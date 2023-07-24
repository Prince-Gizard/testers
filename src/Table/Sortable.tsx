import { BiSortAlt2, BiSortDown, BiSortUp } from "react-icons/bi"
import { SortByFn, useSortBy, useTable } from "react-table"

// данные
import { data } from "../data"

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
  },
]

// типы сортировок
export const sortTypes: Record<string, SortByFn<any>> = {
  // перезаписывает встроенный тип `string`
  string: (rowA, rowB, columnId, desc) => {
    const [a, b] = [rowA.values[columnId], rowB.values[columnId]] as [
      string,
      string,
    ]

    return a.localeCompare(b, "en")
  },
}

export default function Sortable() {
  // создаем экземпляр таблицы
  const {
    // обязательные поля
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data, sortTypes }, useSortBy)

  return (
    <>
      <h1>Таблица сортировки</h1>
      <div className="table-wrapper">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((hG, index) => (
              <tr {...hG.getHeaderGroupProps()} key={index}>
                {hG.headers.map((col, index) => (
                  <th
                    {...col.getHeaderProps(col.getSortByToggleProps())}
                    key={index}
                  >
                    {col.render("Header")}{" "}
                    {/* если колонка является сортируемой, рендерим рядом с заголовком соответствующую иконку в зависимости от того, включена ли сортировка, а также от порядка сортировки */}
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
    </>
  )
}
