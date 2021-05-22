import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import AddEmpModal from "./AddEmpModal";
import EditEmpModal from "./EditEmpModal";

const Employee = () => {
  const [emps, setEmps] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [empid, setEmpid] = useState();
  const [empname, setEmpname] = useState("");
  const [depmt, setDepmt] = useState("");
  const [photofilename, setPhotofilename] = useState("");
  const [doj, setDoj] = useState("");

  const refreshList = () => {
    fetch(process.env.REACT_APP_API + "employee")
      .then((response) => response.json())
      .then((data) => {
        setEmps(data);
      });
  };

  const deleteEmp = (empid) => {
    if (window.confirm("Are you sure?")) {
      fetch(process.env.REACT_APP_API + "employee/" + empid, {
        method: "DELETE",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    }
  };

  useEffect(() => {
    refreshList();
    return () => {
      //
    };
  }, [addModalShow, editModalShow]);

  let addModalClose = () => setAddModalShow(false);
  let editModalClose = () => setEditModalShow(false);

  const editClick = (emp) => {
    setEditModalShow(true);
    setEmpid(emp.EmployeeId);
    setEmpname(emp.EmployeeName);
    setDepmt(emp.Department);
    setPhotofilename(emp.PhotoFileName);
    setDoj(emp.DateOfJoining);
  };

  return (
    <div>
      <Table className="mt-4" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>EmployeeId</th>
            <th>EmployeeName</th>
            <th>Department</th>
            <th>DOJ</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {emps.map((emp) => (
            <tr key={emp.EmployeeId}>
              <td>{emp.EmployeeId}</td>
              <td>{emp.EmployeeName}</td>
              <td>{emp.Department}</td>
              <td>{emp.DateOfJoining}</td>
              <td>
                <ButtonToolbar>
                  <Button
                    className="mr-2"
                    variant="info"
                    onClick={() => editClick(emp)}
                  >
                    Edit
                  </Button>

                  <Button
                    className="mr-2"
                    variant="danger"
                    onClick={() => deleteEmp(emp.EmployeeId)}
                  >
                    Delete
                  </Button>

                  <EditEmpModal
                    show={editModalShow}
                    onHide={editModalClose}
                    empid={empid}
                    empname={empname}
                    depmt={depmt}
                    photofilename={photofilename}
                    doj={doj}
                  />
                </ButtonToolbar>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ButtonToolbar>
        <Button variant="primary" onClick={() => setAddModalShow(true)}>
          Add Employee
        </Button>

        <AddEmpModal show={addModalShow} onHide={addModalClose} />
      </ButtonToolbar>
    </div>
  );
};

export default Employee;
