import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
  token: null,
});

export { setGlobalState, useGlobalState };
