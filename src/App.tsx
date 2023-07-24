import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { createQueryClient } from "./api/axios"
import Pivot from "./Table/Pivot"

export default function App() {
  const queryClient = createQueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Pivot />
      {/* <Sortable /> */}
      {/* <Filterable /> */}
      {/* <Paginated /> */}
      {/* <Selectable /> */}
      {/* <Complex /> */}
      {/* <Example /> */}
      {/* <Material /> */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
