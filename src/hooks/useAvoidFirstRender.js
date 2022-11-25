import { useRef } from "react";

function useAvoidFirstRender() {
  const render = useRef(true);

  if (render.current === true) {
    render.current = false;
    return true;
  }
  return false;
}

export default useAvoidFirstRender;
