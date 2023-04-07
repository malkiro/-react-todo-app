import React from 'react';
import Header from '../../components/header/Header';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
// import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import './Main.css';

function Main() {
  const [taskContent, setTaskContent] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [isUpdating, setIsUpdating] = useState('');
  const [updatetaskContent, setUpdatetaskContent] = useState('');
  const [line, setLine] = useState(false);


  //add new todo task to database
  const addTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/tasks', { description: taskContent })
      setTaskList(prev => [...prev, res.data]);
      setTaskContent('');
    } catch (error) {
      console.log(error);
    }
  }

  //create function to fetch all todo tasks from data base
  useEffect(() => {
    const getTasksList = async (id) => {
      try {
        const res = await axios.get(`http://localhost:3000/tasks/${id}`)
        setTaskList(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getTasksList()
  }, []);


  //delete task when click the delete button
  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/tasks/${id}`)
      const newTaskList = taskList.filter(task => task._id !== id);
      setTaskList(newTaskList);
    } catch (error) {
      console.log(error);
    }
  }

  //update task
  const updateTask = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.put(`http://localhost:3000/tasks/${isUpdating}`, {description: updatetaskContent})
      console.log(res.data)
      const updatedTaskIndex= taskList.findIndex(task => task._id === isUpdating);
      const updatedTask = taskList[updatedTaskIndex].task = updatetaskContent;
      setUpdatetaskContent('');
      setIsUpdating('');
    } catch (error) {
      console.log(error);
    }
  }

  const renderUpdateForm = () => {
    <form className='updateForm' onSubmit={(e)=>{updateTask(e)}}>
      <input className="updateInput" type="text" placeholder="New Item" onChange={e=>{setUpdatetaskContent(e.target.value)}} value={updatetaskContent}/>
      <button className="btnUpdateNew" type="submit">Update</button>
    </form>
  }


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  


  return (
    <div>
        <Header />
        <div className="main">
      <h1>My Todo List</h1>
      <form onSubmit={e => addTask(e)}>
      
        <input type="text" placeholder="Add Todo Item" onChange={e => { setTaskContent(e.target.value) }} value={taskContent} />
        <button type="submit">Add New Task</button>
      </form>
      <div className="toDoItemList">
        {
          taskList.map(task => (
            <div className="toDoItem">
              {
                isUpdating === task._id
                ? renderUpdateForm()
                : <>
             
             <FontAwesomeIcon icon={faCircleCheck}/>
              <p style={{textDecoration:line?"line-throught":"none"}} className="taskName" key="{task}">{task.description}</p>
             {/* <FontAwesomeIcon icon={faCalendar}/> */}
             <FontAwesomeIcon icon={faPenToSquare} onClick={handleShow}  />
        <FontAwesomeIcon icon={faTrash} onClick={() => { deleteTask(task._id) }}/>
        

        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className='modelHeader' closeButton>
          <Modal.Title>Update Task Name</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modelBody'>
        <Form onSubmit={(e)=>{updateTask(e)}}>
        <Form.Control type="email" placeholder="Enter New Task Name Here" />
    </Form>
        <div className="updateFormButtons">
        <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => { deleteTask(task._id) }}>Delete</Button>
          <Button variant="success" type="submit" onChange={e=>{setUpdatetaskContent(e.target.value)}} value={updatetaskContent}>Update</Button>
        </div>
        </Modal.Body>
      </Modal>
              </>
              }
            </div>
          ))
        }

      </div>

     
    </div>
    </div>
  )
}

export default Main