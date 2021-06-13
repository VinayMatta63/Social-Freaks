import { Provider as StoreProvider } from "react-redux";
import { store } from "../helpers/store";
import { Provider } from "next-auth/client";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <StoreProvider store={store}>
        <Component {...pageProps} />
      </StoreProvider>
    </Provider>
  );
}

export default MyApp;
