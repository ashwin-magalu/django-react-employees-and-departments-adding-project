import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Form, Image } from "react-bootstrap";

const EditEmpModal = ({
  show,
  onHide,
  empid,
  empname,
  depmt,
  photofilename,
  doj,
}) => {
  const [deps, setDeps] = useState([]);
  const [photoFilename, setPhotoFilename] = useState("anonymous.png");
  const [imagesrc, setImageSrc] = useState(
    process.env.REACT_APP_PHOTOPATH + photoFilename
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
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        EmployeeId: event.target.EmployeeId.value,
        EmployeeName: event.target.EmployeeName.value,
        DepartmentName: event.target.Department.value,
        DateOfJoining: event.target.DateOfJoining.value,
        PhotoFileName: photoFilename,
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
    setPhotoFilename(event.target.files[0].name);
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
            Edit Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={6}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="EmployeeId">
                  <Form.Label>EmployeeId</Form.Label>
                  <Form.Control
                    type="text"
                    name="EmployeeId"
                    required
                    placeholder="EmployeeId"
                    disabled
                    defaultValue={empid}
                  />
                </Form.Group>

                <Form.Group controlId="EmployeeName">
                  <Form.Label>EmployeeName</Form.Label>
                  <Form.Control
                    type="text"
                    name="EmployeeName"
                    required
                    defaultValue={empname}
                    placeholder="EmployeeName"
                  />
                </Form.Group>

                <Form.Group controlId="Department">
                  <Form.Label>Department</Form.Label>
                  <Form.Control as="select" defaultValue={depmt}>
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
                    defaultValue={doj}
                  />
                </Form.Group>

                <Form.Group>
                  <Button variant="primary" type="submit">
                    Update Employee
                  </Button>
                </Form.Group>
              </Form>
            </Col>

            <Col sm={6}>
              <Image
                width="200px"
                height="200px"
                src={process.env.REACT_APP_PHOTOPATH + photofilename}
              />
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

export default EditEmpModal;
