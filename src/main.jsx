import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css'
import AuthContextProvider from './context/auth.context.jsx'
import ModeContextProvider from './context/theme.context.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'
const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus:false
    }
  }
})
createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <ReactQueryDevtools initialIsOpen={false} />
  <ModeContextProvider>
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
  </ModeContextProvider>
  </QueryClientProvider>
)
