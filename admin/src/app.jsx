import { useRoutes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { routes } from './routes';
import { createTheme } from './theme';
import 'simplebar-react/dist/simplebar.min.css';

export const App = () => {
  const element = useRoutes(routes);
  const theme = createTheme({
    colorPreset: 'green',
    contrast: 'high'
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {element}
    </ThemeProvider>
  );
};
