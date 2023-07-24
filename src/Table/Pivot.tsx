/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Autocomplete, Box, Button, TextField } from "@mui/material"
import axios from "axios"
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table"

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

const requests = [
  { label: "GET" },
  { label: "POST" },
  { label: "PUT" },
  { label: "PATCH" },
  { label: "DELETE" },
  { label: "HEAD" },
  { label: "OPTIONS" },
]

export default function Pivot() {
  type Posts = {
    error: null
    success: boolean
    object_list: any[]
  }

  const [posts, setPosts] = useState<Posts>()
  const [error, setError] = useState<any>()

  const preData = posts?.object_list as any

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      url: "",
      method: "",
      xAuthToken: "",
    },
  })

  const handleRequest = () => {
    axios({
      method: `${watch("method")}`,
      url: `${watch("url")}`,
      headers: {
        withCredentials: false,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded",
        "x-auth-token": `${watch("xAuthToken")}`,
        "Access-Control-Allow-Headers": "x-auth-token",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    })
      .then((res) => {
        setPosts(res.data)
      })
      .catch((error) => {
        setError(error)
      })
    setError(false)
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          p: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
          gap: 1,
          mx: 14,
          my: 4,
        }}
      >
        <Autocomplete
          disablePortal
          id="requests"
          options={requests}
          sx={{ width: 150 }}
          renderInput={(params) => (
            <TextField
              {...register("method", { required: true, maxLength: 10 })}
              {...params}
              label="Вид запроса"
            />
          )}
        />
        <TextField
          {...register("url")}
          label="Тело запроса"
          sx={{ flexGrow: 1 }}
        />
        <Button onClick={() => handleRequest()}>Отправить</Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", px: 3 }}>
        <TextField
          {...register("xAuthToken")}
          label="x-auth-token"
          sx={{ flexGrow: 1 }}
        />
      </Box>
      {error ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            p: 3,
            typography: "subtitle2",
            color: "red",
          }}
        >
          {error?.message}
        </Box>
      ) : (
        <Box>
          {Boolean(posts) ? (
            <MaterialReactTable
              columns={columns}
              data={preData}
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
          ) : null}
        </Box>
      )}
    </>
  )
}
