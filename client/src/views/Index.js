import React, { useState, useSelector, useEffect } from 'react';
import axios from 'axios';
import store from '../redux/store'


export default function Index() {
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("todo");
    const [todo, setTodo] = useState([]);
    const [msg, setMsg] = useState("");
    //const user = useSelector(state => state.user.user.username);

    // useEffect(async() => {
    //   return await axios({
    //     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    //     method: 'get',
    //     url: `http://localhost:3001/get-posts/${store.getState().user.user.username}`
    //   })
    //   .then(response => {
    //     console.log("TODOS", response);
    //     if(response.data.ok){
    //         setTodo(response.data.row);
    //     }
    //   })
    //   .catch(err=>{
    //     console.log(err);
    //   })
    // });

    const handleCreateTodo = async() => {

      console.log(description, dueDate, status);
      setMsg("");
      if(!description || !dueDate || !status) return setMsg("Please Complete All Fields");
      

      return await axios({
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        method: 'post',
        url: `http://localhost:3001/create-post`,
        data: {
          description,
          dueDate,
          status,
          user: store.getState().user.user.username
          
        },
      }).catch(err=>{
        console.log(err);
      })

    }

    return (
          <div className="main">
            <div className="todos">
              <h1>My Todos</h1>
              <table className="table">
                <thead>
                  <tr>
                    <th className="w-50">Description</th>
                    <th className="w-25">Due</th>
                    <th className="w-25">Status</th>
                  </tr>
                </thead>
                <tbody>
                  { todos.forEach(todo =>{
                  return(  
                  <tr>
                    <td></td>
                    <td>2</td>
                    <td>3</td>
                  </tr>
                  </tr>
                  )
                  })
                  }
                  </tbody>
              </table>
            </div>
            <div className="create-todo">
              <h1>Create Todo</h1>
              <form>
                <input onChange={(e)=> setDescription(e.target.value)} className="input-group mb-2" placeholder="Description" />
                <input type="date" onChange={(e)=> setDueDate(e.target.value)} className="input-group mb-2" placeholder="Due Date" />
                <select className="input-group mb-2" onChange={(e)=> setStatus(e.target.value)}>
                  <option value="todo">todo</option>
                  <option value="in-progess">in-progess</option>
                  <option value="done">done</option>
                </select> 
                <button type="button" className="btn btn-secondary" onClick={handleCreateTodo}>Create Todo</button>
              </form>
              <p>{msg}</p>
            </div>
          </div>
  
      );
}
