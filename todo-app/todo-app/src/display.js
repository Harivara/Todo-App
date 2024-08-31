import React, { useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;

const Display = () => {
  const [disstatus, setDisstatus] = useState(undefined);
  const [dispri, setDispri] = useState(undefined);
  const [distask, setdistask] = useState([]);

  const handleSubmit = () => {
    if (disstatus && dispri) {
      const savedTasks = JSON.parse(localStorage.getItem("tasks"));

      if (savedTasks) {
        const filteredTasks = savedTasks.filter(task =>
          task.status === disstatus && task.priority === dispri
        );

        console.log("Filtered Tasks:", filteredTasks);
        console.log(" Tasks:", savedTasks);
        console.log(dispri,disstatus)
        setdistask(filteredTasks);
      } else {
        setdistask([]);
      }
    } else {
      alert("Please select both status and priority");
    }
  };

  return (
    <div className='display'>
      <h3>Display tasks</h3>
      <h6>Select the type of task</h6>
      <Select
        className='m-1'
        placeholder="priority"
        value={dispri}
        onChange={(value) => setDispri(value)}
      >
        <Option value="low">Low</Option>
        <Option value="medium">Medium</Option>
        <Option value="high">High</Option>
      </Select>
      <Select
        placeholder="status"
        value={disstatus}
        onChange={(value) => setDisstatus(value)}
      >
        <Option value="completed">Completed</Option>
        <Option value="incomplete">Incomplete</Option>
      </Select>
      <button className='btn btn-success p-1 m-1' onClick={handleSubmit}>Submit</button>

      {distask.length > 0 ? (
        <div className='tab'>
             <table>
            <tr>
                <th>Name</th>
                <th>Priority</th>
                <th>Status</th>
            </tr>
          {distask.map(task => (
          
            <tbody>
                <tr key={task.id}>
                    <td>{task.text}</td>
                    <td>{task.priority}</td>
                    <td>{task.status}</td>
                </tr>
            </tbody>
          ))}
          </table>
          </div>
    
      ) : (
        <p>No tasks found</p>
      )}
    </div>
  );
};

export default Display;
