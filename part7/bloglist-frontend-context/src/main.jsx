import ReactDOM from 'react-dom/client'
import App from './App'
import { UserContextProvider } from './UserContext'
import { NotificationContextProvider } from './NotificationContext'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { BrowserRouter as Router } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider client={queryClient}>
        <NotificationContextProvider>
          <App />
        </NotificationContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </Router>
)
