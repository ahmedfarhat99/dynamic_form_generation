import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import icons from "./icons";

const AddFields = ({
  fields,
  score,
  setScore,
  selectedFields,
  setSelectedFields,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

//   const handleSubmit = async (e) => {
//     setFields((prevFields) => [
//       ...prevFields,
//       ...selectedFields.map((field) => ({
//         ...field,
//         input: `newField${prevFields.length + 1}`,
//       })),
//     ]);

//     // Calculate the sum of points
//     const totalPoints = selectedFields.reduce(
//       (total, field) => total + field.points,
//       0
//     );

//     // Update the score state
//     setScore(score + totalPoints);

//     // Close the modal
//     handleClose();
//   };

  const handleFieldToggle = (field) => {
    setSelectedFields((prevSelected) => {
      const isFieldSelected = prevSelected.some(
        (selected) => selected.input === field.input
      );

      if (isFieldSelected) {
        // If the field is already selected, remove it
        return prevSelected.filter(
          (selected) => selected.input !== field.input
        );
      } else {
        // If the field is not selected, add it
        return [...prevSelected, field];
      }
    });

    // Calculate the sum of points
    const totalPoints = selectedFields.reduce(
      (total, field) => total + field.points,
      0
    );

    // Update the score state
    setScore(score + totalPoints);
  };

  return (
    <section className="d-inline-block">
      <button className="btn text-success border-success" onClick={handleShow}>
        <span className="icon">{icons.add}</span>
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
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
            />
            <label className="form-check-label" htmlFor="firstName">
              First Name (25 points)
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="lastName"
              checked
              disabled
            />
            <label className="form-check-label" htmlFor="lastName">
              Last Name (25 points)
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="email"
              checked
              disabled
            />
            <label className="form-check-label" htmlFor="email">
              Email (25 points)
            </label>
          </div>
          {fields.map((field) => (
            <div key={field.input} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={field.input}
                checked={selectedFields.some(
                  (selected) => selected.input === field.input
                )}
                onChange={() => handleFieldToggle(field)}
              />
              <label className="form-check-label" htmlFor={field.input}>
                {field.title} ({field.points} points)
              </label>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default AddFields;
