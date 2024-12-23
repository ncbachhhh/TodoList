import { useState } from "react";
import "./App.css";

function App() {
  const [currentPage, setCurrent] = useState(1);
  const [inputValue, setInput] = useState("");

  const [listTodo, setList] = useState(JSON.parse(localStorage.getItem("todo")));
  if (!localStorage.getItem("todo")) {
    localStorage.setItem("todo", JSON.stringify([]));
  }

  const addTodo = (e) => {
    e.preventDefault();
    const newTodo = {
      id: new Date(),
      value: inputValue,
      status: false,
      checked: false,
    };
    setList([...listTodo, newTodo]);
    localStorage.setItem("todo", JSON.stringify([...listTodo, newTodo]));
    setInput("");
  };

  const deleteTodo = (id) => {
    const newList = listTodo.filter((item) => item.id !== id);
    setList(newList);
    localStorage.setItem("todo", JSON.stringify([...newList]));
  };

  const changeStatus = (e, id) => {
    for (let i = 0; i < listTodo.length; i++) {
      if (listTodo[i].id === id) {
        listTodo[i].status = !listTodo[i].status;
      }
    }
    setList([...listTodo]);
    localStorage.setItem("todo", JSON.stringify([...listTodo]));
  };

  const deleteAllTodo = (e) => {
    const newList = listTodo.filter((item) => item.status !== true);
    setList(newList);
    localStorage.setItem("todo", JSON.stringify([...newList]));
  };

  return (
    <div className="todoContainer">
      <div className="title">
        <h1>#todo</h1>
      </div>
      <div className="header">
        <div>
          <p onClick={() => setCurrent(1)} className={currentPage === 1 ? "active" : null}>
            All
          </p>
        </div>
        <div>
          <p onClick={() => setCurrent(2)} className={currentPage === 2 ? "active" : null}>
            Active
          </p>
        </div>
        <div>
          <p onClick={() => setCurrent(3)} className={currentPage === 3 ? "active" : null}>
            Complete
          </p>
        </div>
      </div>
      <hr />
      <div className="main-container">
        {(currentPage === 1 || currentPage === 2) && (
          <div className="input-value">
            <form onSubmit={(e) => addTodo(e)}>
              <input type="text" placeholder="add details" value={inputValue} onChange={(e) => setInput(e.target.value)} />
              <button type="submit">Add</button>
            </form>
          </div>
        )}

        <div className="list-container">
          <ul className="list-item">
            {listTodo.map((item) => {
              return (
                currentPage === 1 && (
                  <li key={item.id} className="item-todo">
                    <div>
                      <input type="checkbox" checked={item.status} onClick={(e) => changeStatus(e, item.id)} />
                      <p style={{ textDecoration: item.status ? "line-through" : "none" }}>{item.value}</p>
                    </div>
                  </li>
                )
              );
            })}
            {listTodo.map((item) => {
              if (item.status === false) {
                return (
                  currentPage === 2 && (
                    <li key={item.id} className="item-todo">
                      <div>
                        <input type="checkbox" checked={item.status} onClick={(e) => changeStatus(e, item.id)} />
                        <p style={{ textDecoration: item.status ? "line-through" : "none" }}>{item.value}</p>
                      </div>
                    </li>
                  )
                );
              }
            })}
            {listTodo.map((item) => {
              if (item.status === true) {
                return (
                  currentPage === 3 && (
                    <li key={item.id} className="item-todo">
                      <div>
                        <input type="checkbox" checked={item.status} onClick={(e) => changeStatus(e, item.id)} />
                        <p style={{ textDecoration: item.status ? "line-through" : "none" }}>{item.value}</p>
                      </div>
                      <i className="fa-solid fa-trash" style={{ color: "gray" }} onClick={() => deleteTodo(item.id)}></i>
                    </li>
                  )
                );
              }
            })}
          </ul>
          <div className="btn-delete-all-container" style={{ display: currentPage === 3 ? "flex" : "none" }}>
            <button className="btn-delete-all" onClick={(e) => deleteAllTodo(e)}>
              <i className="fa-solid fa-trash"></i>delete all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
