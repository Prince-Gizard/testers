import MaterialReactTable, { MRT_ColumnDef } from "material-react-table"

import { useMbs } from "src/api/axios"

import { data } from "../data"

// сигнатура определения колонки немного отличается от React Table
export const columns: MRT_ColumnDef<any>[] = [
  {
    header: "Id объекта",
    accessorKey: "id",
    // отключаем сортировку и фильтрацию
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    header: "Название объекта",
    accessorKey: "title",
  },
  {
    header: "Id родительского типа объекта",
    accessorKey: "type_id",
  },
  {
    header: "Родительский тип объекта",
    accessorKey: "type",
  },
  {
    header: "Id муниципального образования",
    accessorKey: "municipality_id",
  },
  {
    header: "Муниципальное образование",
    accessorKey: "municipality",
  },
  {
    header: "Id стадии",
    accessorKey: "stage_id",
  },
  {
    header: "Стадия",
    accessorKey: "stage",
  },
  {
    header: "Id исполнителя СМР",
    accessorKey: "builder_id",
  },
  {
    header: "Исполнитель СМР",
    accessorKey: "builder_name",
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    header: "Стройготовность (%) согласно последнему отчету",
    accessorKey: "construction_ready",
  },
  {
    header: "Дата ввода в эксплуатацию по ГП",
    accessorKey: "expluatation",
  },
  {
    header: "Id типа заказчика",
    accessorKey: "zk_type_id",
  },
  {
    header: "Тип заказчика",
    accessorKey: "zk_type",
  },
  {
    header:
      "Наличие камеры у объекта. Всегда равен 1, если объект не на стадии СМР",
    accessorKey: "is_camers",
  },
  {
    header:
      "Наличие ГПР у объекта. Всегда равен 1, если объект не на стадии СМР",
    accessorKey: "is_dgpr",
  },
  {
    header: "Дата последнего отчета по объекту",
    accessorKey: "dgprDateLastReport",
  },
  {
    header: "Дата начала первой операции по ГПР",
    accessorKey: "startAt",
  },
  {
    header:
      "Отсутствие отчетов более недели. Проставляется только для объектов на стадии СМР и если прошла неделя от startAt",
    accessorKey: "dgprDateLastReportOverdueWeek",
  },
  {
    header:
      "Разница строительной готовности между планом и фактом более 1%. Проставляется только для объектов на стадии СМР и после startAt",
    accessorKey: "isDeviationsSG",
  },
  {
    header:
      "Отклонения по строительной готовности между планом и фактом более 10%. Проставляется только для объектов на стадии СМР и после startAt",
    accessorKey: "isTotalConstructionReadyFactDeviation",
  },
  {
    header:
      "Отклонения по рабочим между планом и фактом более 10%. Проставляется только для объектов на стадии СМР и после startAt",
    accessorKey: "isTotalCountPeopleFactDeviation",
  },
  {
    header: "Id стадии",
    accessorKey: "isTotalConstructionReadyFactDeviation",
  },
  {
    header: "Стадия",
    accessorKey: "isTotalCountPeopleFactDeviation",
  },
  {
    header: "Прямая ссылка на объект в системе МБР или КР",
    accessorKey: "url",
  },
  {
    header: "Количество рабочих по факту согласно последнему отчету",
    accessorKey: "totalCountPeopleFact",
  },
  {
    header: "Количество рабочих по плану согласно таблице СГ",
    accessorKey: "totalCountPeoplePlan",
  },
  {
    header: "Строительная готовность (%) по плану согласно таблице СГ",
    accessorKey: "totalConstructionReadyPlan",
  },
  {
    header: "Строительная готовность (%) по факту согласно последнему отчету",
    accessorKey: "totalConstructionReadyFact",
  },
]

export const Material: any = () => {
  const { data: prep } = useMbs({})
  console.log(prep)
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      muiTableBodyCellProps={{
        sx: {
          border: "1px solid rgba(81, 81, 81, 1)",
        },
      }}
      muiTableHeadCellProps={{
        sx: {
          border: "1px solid rgba(81, 81, 81, 1)",
        },
      }}
      muiTableProps={{
        sx: {
          border: "1px solid rgba(81, 81, 81, 1)",
          margin: "24px",
        },
      }}
    />
  )
}
