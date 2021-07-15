import { useHistory } from "react-router-dom";

export function GoBack() {
  const back = useHistory();

  return (
    <div className="back">
      <p onClick={() => back.goBack()}>Back</p>
    </div>
  );
}
