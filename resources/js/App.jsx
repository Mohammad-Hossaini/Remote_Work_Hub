import ReactDOM from "react-dom/client";
function App() {
    return <h1>Hello React!</h1>;
}

const container = document.getElementById("app");
const root = ReactDOM.createRoot(container);
root.render(<App />);
