import '@/App.scss'

const linkMap = import.meta.globEager('./urls/*.ts');
const links = Object.keys(linkMap).map(key => linkMap[key].default);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome to <b>React Playground</b>!</p>
      </header>
      <main>
        <ul>{
          links.map(({ name, url }) => <li key={name}><a href={url}>{name}</a></li>)
        }</ul>
      </main>
    </div>
  )
}

export default App
