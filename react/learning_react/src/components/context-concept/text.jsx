import { useContext } from "react";
import { GlobalContext } from "../../context";

function TextConcept() {

    const theme = useContext(GlobalContext)

    console.log(theme);
    
  return <h1 style={{backgroundColor: theme === 'light' ? '#fff' : '#000'}}>Text change</h1>;
}

export default TextConcept;
