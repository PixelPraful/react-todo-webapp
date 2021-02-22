import React from 'react';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: '',
      date: '',
      details: '',
      status: 'Done',
      allTasks: [],
    };

    this.taskUpdateHandler = this.taskUpdateHandler.bind(this);
    this.removeTaskHandler = this.removeTaskHandler.bind(this);
    this.addTaskHandler = this.addTaskHandler.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  taskUpdateHandler = (val, name) => {
    this.setState({
      [name]: val,
    });
  }

  addTaskHandler = (e) => {
    e.preventDefault();
    const { taskName, date, details, status } = this.state;
    const task = {
      taskName,
      date,
      details,
      status
    };
    const tasks = [...this.state.allTasks];
    tasks.push(task);
    this.setState({
      allTasks: tasks,
      taskName: '',
      date: '',
      details: '',
      status: 'Done',
    });
  }

  removeTaskHandler = (id) => {
    const tasks = [...this.state.allTasks];
    tasks.splice(id, 1);
    this.setState({
      allTasks: tasks,
    });
  }

  handleFilter = (val) => {
    const tasks = [...this.state.allTasks];
    if (val === 'Descending') {
      tasks.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    } else {
      tasks.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
    }
    this.setState({
      allTasks: tasks,
    });
  }

  render() {
    const { taskName, date, details, status, allTasks } = this.state;
    return (
      <>
        <div>
          <Form onSubmit={(e) => this.addTaskHandler(e)}>
            <Row>
              <Col md={3}>
                <Form.Group controlId="taskName">
                  <Form.Label>Task Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter task name"
                    value={taskName}
                    onChange={(e) => this.taskUpdateHandler(e.target.value, 'taskName')}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={date}
                    onChange={(e) => this.taskUpdateHandler(e.target.value, 'date')}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="taskDetails">
                  <Form.Label>Details</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter task details"
                    value={details}
                    onChange={(e) => this.taskUpdateHandler(e.target.value, 'details')}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="taskStatus">
                  <Form.Label>Status</Form.Label>
                  <Form.Control required as="select" onChange={(e) => this.taskUpdateHandler(e.target.value, 'status')} value={status}>
                    <option>Done</option>
                    <option>Pending</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Button className="mt-4" type="submit" variant="primary">
                  Add
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
        <Row>
          <Col md={3} className="ml-auto" >
            <Form.Group controlId="filter">
              <Form.Label>Sort By Date</Form.Label>
              <Form.Control as="select" onChange={(e) => this.handleFilter(e.target.value)} defaultValue="">
                <option>Ascending</option>
                <option>Descending</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <div>
          <Table className="mt-2" bordered hover variant="dark">
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Date</th>
                <th>Details</th>
                <th>Status</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              {
                allTasks.length ? allTasks.map((item, id) => (
                  <tr key={id}>
                    <td>{item.taskName}</td>
                    <td>{item.date}</td>
                    <td>{item.details}</td>
                    <td>{item.status}</td>
                    <td style={{ cursor: 'pointer' }} onClick={() => this.removeTaskHandler(id)}>Delete</td>
                  </tr>
                )) :
                  <tr>
                    <td colSpan="5">No Tasks</td>
                  </tr>
              }
            </tbody>
          </Table>
        </div>
      </>
    );
  }
}

export default HomeScreen;