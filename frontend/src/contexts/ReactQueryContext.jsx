import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
const queryClient= new QueryClient()//It'll not be re-rendered whenever this component re-renders becuase it is outside the function body definition
function ReactQueryContextProvider({children}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default ReactQueryContextProvider