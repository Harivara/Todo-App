import React, { useState, useEffect } from 'react';
import {Button, Modal } from 'antd';
import { Select } from 'antd';

const { Option } = Select;



const Task = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [text, setText] = useState("");
  const [priority, setPriority] = useState(undefined);
  const [isedit, setIsedit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [edittext,setedittext]=useState(text);
  const [editpriority,seteditpriority]=useState(priority)
  const [editid,seteditid]=useState("")


  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text && priority) {
      createtask(text, priority);
      setText("");
      setPriority(undefined);
    } else if (text.trim() === "") {
      alert("Please enter the task name");
    } else if (priority === undefined) {
      alert("Please select the priority");
    }
  };

  const createtask = (text, priority) => {
    const newTask = {
      id: Date.now(),
      text,
      priority,
      status: "incomplete",
    };
    setTasks([...tasks, newTask]);
  };

  const handleEdit = (id, newText, newPriority) => {
    // if (isedit) {
      setTasks(tasks.map(t =>
        t.id === id
          ? { ...t, text: newText, priority: newPriority }
          : t
      ));
    // }
    // setIsedit(false);
    setIsModalOpen(false)
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleStatus = (id, newStatus) => {
    setTasks(tasks.map(t =>
      t.id === id
        ? { ...t, status: newStatus }
        : t
    ));
  };

  return (
    <>
      <h3>Todo App</h3>
      <form onSubmit={handleSubmit}>
        <input
          className='input m-3'
          type='text'
          placeholder='Enter the task'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Select
          className='priority'
          placeholder="Task Priority"
          value={priority}
          onChange={(value) => setPriority(value)}
        >
          <Option value="low">low</Option>
          <Option value="medium">medium</Option>
          <Option value="high">high</Option>
        </Select>
        <button className='btn btn-primary m-3'>Add Task</button>
      </form>

      {tasks.length > 0 ? (
        <div style={{maxHeight:"40vh", maxWidth:"80vh", overflow:"auto"}}>
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task.id}>
                  <td>{index + 1}</td>
                  <td>{task.text}</td>
                  <td>{task.priority}</td>
                  <td>{task.status}</td>
                  <td>
                    <button className='btn btn-success m-1' onClick={() => {setIsModalOpen(true); setedittext(task.text) ; seteditpriority(task.priority);seteditid(task.id)}}>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button className='btn btn-warning m-1' onClick={() => handleStatus(task.id, 'completed')}>
                      Update Status
                    </button>
                  </td>
                  <td>
                    <button className='btn btn-danger m-1' onClick={() => handleDelete(task.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Modal onCancel={()=>setIsModalOpen(false) } footer={null} visible={isModalOpen}>
            <h3>Update the task</h3>
          <input
          className='input m-3'
          type='text'
          placeholder='Enter the task'
          value={edittext}
          onChange={(e) => setedittext(e.target.value)}
        />
        <Select
          className='priority'
          placeholder="Task Priority"
          value={editpriority}
          onChange={(value) => seteditpriority(value)}
        >
          <Option value="low">low</Option>
          <Option value="medium">medium</Option>
          <Option value="high">high</Option>
        </Select>
        <button className='btn btn-success m-3 p-1' onClick={()=>{handleEdit(editid,edittext,editpriority)}}>Update</button>
          </Modal>
        </div>
      ) : (
        <h6>No tasks available</h6>
      )}
    </>
  );
};

export default Task;
