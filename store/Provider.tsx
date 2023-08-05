"use client";

import { Provider } from "react-redux";
import store from "../store/ReduxStore";

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
