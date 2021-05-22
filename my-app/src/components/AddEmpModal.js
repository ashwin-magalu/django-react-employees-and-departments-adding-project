import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Form, Image } from "react-bootstrap";

const AddEmpModal = ({ show, onHide }) => {
  const [deps, setDeps] = useState([]);
  const [photofilename, setPhotofilename] = useState("anonymous.png");
  const [imagesrc, setImageSrc] = useState(
    process.env.REACT_APP_PHOTOPATH + photofilename
  );

  useEffect(() => {
    fetch(process.env.REACT_APP_API + "department")
      .then((response) => response.json())
      .then((data) => {
        setDeps(data);
      });
    return () => {
      //
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(process.env.REACT_APP_API + "employee", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        EmployeeId: null,
        EmployeeName: event.target.EmployeeName.value,
        DepartmentName: event.target.Department.value,
        DateOfJoining: event.target.DateOfJoining.value,
        PhotoFileName: photofilename,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
        },
        (error) => {
          alert("Failed");
        }
      );
  };

  const handleFileSelected = (event) => {
    event.preventDefault();
    setPhotofilename(event.target.files[0].name);
    const formData = new FormData();
    formData.append(
      "myFile",
      event.target.files[0],
      event.target.files[0].name
    );

    fetch(process.env.REACT_APP_API + "Employee/SaveFile", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setImageSrc(process.env.REACT_APP_PHOTOPATH + result);
        },
        (error) => {
          alert("Failed");
        }
      );
  };

  return (
    <div className="container">
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={6}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="EmployeeName">
                  <Form.Label>EmployeeName</Form.Label>
                  <Form.Control
                    type="text"
                    name="EmployeeName"
                    required
                    placeholder="EmployeeName"
                  />
                </Form.Group>

                <Form.Group controlId="Department">
                  <Form.Label>Department</Form.Label>
                  <Form.Control as="select">
                    {deps.map((dep) => (
                      <option key={dep.DepartmentId}>
                        {dep.DepartmentName}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="DateOfJoining">
                  <Form.Label>DateOfJoining</Form.Label>
                  <Form.Control
                    type="date"
                    name="DateOfJoining"
                    required
                    placeholder="DateOfJoining"
                  />
                </Form.Group>

                <Form.Group>
                  <Button variant="primary" type="submit">
                    Add Employee
                  </Button>
                </Form.Group>
              </Form>
            </Col>

            <Col sm={6}>
              <Image width="200px" height="200px" src={imagesrc} />
              <input onChange={handleFileSelected} type="File" />
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddEmpModal;
