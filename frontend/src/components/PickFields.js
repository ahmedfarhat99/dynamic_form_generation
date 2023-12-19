import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import icons from "./icons";

const PickFields = ({
  fields,
  score,
  setScore,
  selectedFields,
  setSelectedFields,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFieldToggle = (field) => {
    setSelectedFields((prevSelected) => {
      const isFieldSelected = prevSelected.some(
        (selected) => selected.input === field.input
      );

      if (isFieldSelected) {
        setScore(score - field.points);
        // If the field is already selected, remove it
        return prevSelected.filter(
          (selected) => selected.input !== field.input
        );
      } else {
        setScore(score + field.points);
        // If the field is not selected, add it
        return [...prevSelected, field];
      }
    });
  };

  return (
    <section className="d-inline-block">
      <button className="btn text-success border-success" onClick={handleShow}>
        <span className="icon">{icons.pick}</span>
      </button>

      <Modal show={show} onHide={handleClose} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Pick fields</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="firstName"
              checked
              disabled
              readOnly
              autoComplete="off"
            />
            <label className="form-check-label opacity-100" htmlFor="firstName">
              <b>First Name</b> (25 points)
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="lastName"
              checked
              disabled
              readOnly
              autoComplete="off"
            />
            <label className="form-check-label opacity-100" htmlFor="lastName">
              <b>Last Name</b> (25 points)
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="email"
              checked
              disabled
              readOnly
              autoComplete="off"
            />
            <label className="form-check-label opacity-100" htmlFor="email">
              <b>Email</b> (25 points)
            </label>
          </div>
          {fields.map((field) => (
            <div key={field.input} className="form-check">
              <label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={field.input}
                  checked={selectedFields.some(
                    (selected) => selected.input === field.input
                  )}
                  onChange={() => handleFieldToggle(field)}
                  autoComplete="off"
                />
                <span className="form-check-label" htmlFor={field.input}>
                  <b>{field.title}</b> ({field.points} points)
                </span>
              </label>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default PickFields;
