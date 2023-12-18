import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import icons from "./icons";

const DeleteParticipant = ({
  setParticipantsList,
  dataId,
  firstName,
  lastName,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [error, setError] = useState(null);

  const handleDelete = async () => {
    const response = await fetch("/api/participants/" + dataId, {
      method: "DELETE",
    });
    const data = await response.json();

    if (response.ok) {
      handleClose();
      setError(null);
      setParticipantsList((prev) =>
        prev.filter((participant) => participant._id !== dataId)
      );
    } else {
      setError(data.msg);
    }
  };

  return (
    <section className="d-inline-block">
      <button className="btn text-danger" onClick={handleShow}>
        <span className="icon">{icons.delete}</span>
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete participant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Are you sure you want to delete <b>{firstName + " " + lastName}</b>{" "}
            ?
            <p className="text-warning">
              <small>
                <u>This action cannot be undone.</u>
              </small>
            </p>
          </div>
          {error && <div className="error-msg">{error}</div>}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-default" onClick={handleClose}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default DeleteParticipant;
