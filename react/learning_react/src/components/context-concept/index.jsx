import { useContext } from "react";
import { GlobalContext } from "../../context";

function ContexConcept() {
  const { setTheme, theme } = useContext(GlobalContext);
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Theme change
    </button>
  );
}

export default ContexConcept;
