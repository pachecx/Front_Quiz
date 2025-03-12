import "./App.css";
import htmlSvg from "./assets/html.svg"

function App() {
  return (
    <div>
      <div>
        <h1>Welcome to the FrontEnd quiz!</h1>
        <p>Pick a subject to get started.</p>
      </div>

      <div>
        <div className="flex items-center">
          <img className="w-10 h-10" src={htmlSvg} alt="img html"/> <p>HTML</p>
        </div>
      </div>
    </div>
  );
}

export default App;
