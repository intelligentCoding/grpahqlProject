import { CSSReset, ThemeProvider } from "@chakra-ui/core";
import theme from "../theme";
import { Provider, createClient } from 'urql';


function MyApp({ Component, pageProps }: any) {
  const client = createClient({
    url: 'http://localhost:4000/graphql',
    fetchOptions: {
      credentials: "include",
      headers: { "X-Forwarded-Proto": "https" },
    },
  });

  return (
    <Provider value={client}>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;