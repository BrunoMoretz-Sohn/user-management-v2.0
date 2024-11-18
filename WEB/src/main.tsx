import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserProvider } from './context/UserProvider';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme'; 
import GlobalStyles from './styles/GlobalStyles';
import Home from './pages/home';

const queryClient = new QueryClient();

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ThemeProvider theme={theme}> 
        <GlobalStyles /> 
          <Home />
        </ThemeProvider>
      </UserProvider>
    </QueryClientProvider>
  </StrictMode>
);

