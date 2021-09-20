import { useHistory } from "react-router-dom";
import "../css/GoBack.css";

export function GoBack() {
  const back = useHistory();

  return (
    <div className="back">
      <p onClick={() => back.goBack()}>Back</p>
    </div>
  );
}
