import ReactDOM from "react-dom/client";
function HelloReact() {
    return <h1>Hello world!</h1>;
}

const container = document.getElementById("app");
const root = ReactDOM.createRoot(container);
root.render(<HelloReact />);
   