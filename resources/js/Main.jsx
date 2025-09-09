import ReactDOM from "react-dom/client";
import App from "./App.jsx";
function Main() {
    return <App />;
}

const container = document.getElementById("app");
const root = ReactDOM.createRoot(container);
root.render(<Main />);
