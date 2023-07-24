import {
  FilterProps,
  UseGlobalFiltersInstanceProps,
  UseGlobalFiltersOptions,
} from "react-table"

export type GlobalFilterT<T extends object> = (
  props: Partial<UseGlobalFiltersInstanceProps<T> & UseGlobalFiltersOptions<T>>,
) => JSX.Element

export type ColumnFilterT<T extends object> = (
  props: FilterProps<T>,
) => JSX.Element
