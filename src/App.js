import './App.css';
import {useState} from "react";
import {Header} from './components/Header';
import {MainContent} from './components/MainContent';



const App = () => {
    const [page, setPage] = useState('Main');

    return (
    <div className="App">
        <Header setPage={setPage} page={page} className="header"/>
        <MainContent page={page}/>
    </div>
  );
}

export default App;
