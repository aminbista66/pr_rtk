import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </div>
  );
}
