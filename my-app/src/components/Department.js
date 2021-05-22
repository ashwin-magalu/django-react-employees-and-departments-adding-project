import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import AddDepModal from "./AddDepModal";
import EditDepModal from "./EditDepModal";

const Department = () => {
  const [deps, setDeps] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [depId, setDepId] = useState();
  const [depName, setDepName] = useState("");

  const refreshList = () => {
    fetch(process.env.REACT_APP_API + "department")
      .then((response) => response.json())
      .then((data) => {
        setDeps(data);
      });
  };

  const deleteDep = (depid) => {
    if (window.confirm("Are you sure?")) {
      fetch(process.env.REACT_APP_API + "department/" + depid, {
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
  }, [addModalShow, editModalShow, deleteDep]);

  let addModalClose = () => setAddModalShow(false);
  let editModalClose = () => setEditModalShow(false);

  const editClick = (dep) => {
    setEditModalShow(true);
    setDepId(dep.DepartmentId);
    setDepName(dep.DepartmentName);
  };

  return (
    <div>
      <Table className="mt-4" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>DepartmentId</th>
            <th>DepartmentName</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {deps.map((dep) => (
            <tr key={dep.DepartmentId}>
              <td>{dep.DepartmentId}</td>
              <td>{dep.DepartmentName}</td>
              <td>
                <ButtonToolbar>
                  <Button
                    className="mr-2"
                    variant="info"
                    onClick={() => editClick(dep)}
                  >
                    Edit
                  </Button>

                  <Button
                    className="mr-2"
                    variant="danger"
                    onClick={() => deleteDep(dep.DepartmentId)}
                  >
                    Delete
                  </Button>

                  <EditDepModal
                    show={editModalShow}
                    onHide={editModalClose}
                    depid={depId}
                    depname={depName}
                  />
                </ButtonToolbar>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ButtonToolbar>
        <Button variant="primary" onClick={() => setAddModalShow(true)}>
          Add Department
        </Button>

        <AddDepModal show={addModalShow} onHide={addModalClose} />
      </ButtonToolbar>
    </div>
  );
};

export default Department;
