import { useState } from 'react'

import Pagination from 'react-js-pagination';

import './App.css'

function App() {
  const [nome, setNome] = useState('');
  const [todo, setTodo] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 5;
  const totalItemsCount = todo.length;
  const pageRangeDisplayed = 5;

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };
  
  const handleClick = (id) => {
    const result = todo.filter((item) => item.id !== id);
    setTodo(result);
  };
  const handleChange = () => {
    if(nome.length > 0){
      const numero = Math.floor(Date.now() * Math.random()).toString(36);
      setTodo([...todo, {
        id: numero,
        tared: nome,
        check: false,
      }]);
    }
    setNome('');
  };

  const handleCheck = (id, e) => {
    const data = todo.map((item) => {
      if (item.id === id){
          item.check = e.target.checked;
      } 
      return item;
    });
    setTodo(data);
  }

  const result = (todo.length > 0 ? todo.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage).map((item, index) => (
    <div key={index} className='todo-list'>
      <li className={item.check ? 'li-todo-riscado' : 'li-todo' }>{item.tared}</li>
      <input type='checkbox' checked={item.check} onClick={(e) => handleCheck(item.id, e)}/>
      <button type='button' onClick={() => handleClick(item.id)}>Exit</button>
    </div>
  )): null);
  return (
    <>
      <div>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <input type='text' placeholder='add-todo-list' value={nome} onChange={(e) => setNome(e.target.value)}/>
        <button onClick={handleChange}>
          add-tarefa 
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
          <ol className='result'>
          {result}
          </ol>
        </p>
        <Pagination
          className='pagination'
          activePage={activePage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={pageRangeDisplayed}
          onChange={handlePageChange}
        />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
