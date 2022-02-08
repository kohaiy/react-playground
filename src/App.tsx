import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import '@/App.scss'

const routeMap = import.meta.globEager('./routes/*.tsx');
const routes = Object.keys(routeMap).map(key => routeMap[key].default as RouteOptions);
console.log(routes);


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <p>Welcome to <b>React Playground</b>!</p>
        </header>
        <Routes>
          <Route path="/" element={<main>
            <ul>{
              routes.map(({ name, path }) => <li key={name}><Link to={path}>{name}</Link></li>)
            }</ul>
          </main>} />
          {
            routes.map(({ path, component }) => <Route key={path} path={path} element={component} />)
          }
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
