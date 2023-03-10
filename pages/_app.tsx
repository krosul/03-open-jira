import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme, darkTheme } from '../themes';
import { UIProVider } from '../context/ui';
import { EntriesProVider } from '../context/entries';
import { SnackbarProvider } from 'notistack';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={1}>
      <EntriesProVider>
        <UIProVider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProVider>
      </EntriesProVider>
    </SnackbarProvider>
  );
}
