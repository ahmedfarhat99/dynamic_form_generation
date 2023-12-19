import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Loader from "../components/Loader";
import images from "../components/images";
import icons from "../components/icons";
import DeleteParticipant from "../components/DeleteParticipant";

const Participants = ({ loading, setLoading }) => {
  const [participantsList, setParticipantsList] = useState([]);

  useEffect(() => {
    setLoading(true);

    const fetchParticipants = async () => {
      try {
        const response = await fetch("/api/participants");
        const data = await response.json();

        if (response.status === 200) {
          setParticipantsList(data);
        } else {
          console.log(data.msg);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [setLoading]);

  const Participant = ({ participantItem }) => {
    return (
      <tr>
        <td className="actions-content">
          <Link
            to={`/participants/${participantItem._id}`}
            target="_blank"
            className="btn text-primary"
          >
            <span className="icon">{icons.openExternal}</span>
          </Link>
          <DeleteParticipant
            setParticipantsList={setParticipantsList}
            dataId={participantItem._id}
            firstName={participantItem.firstName}
            lastName={participantItem.lastName}
          />
        </td>
        <td className="photo-content">
          {participantItem.photo ? (
            <img src={participantItem.photo} alt="Participant" />
          ) : (
            <span className="icon">{icons.defaultUser}</span>
          )}
        </td>
        <td>{participantItem.firstName ? participantItem.firstName : "-"}</td>
        <td>{participantItem.lastName ? participantItem.lastName : "-"}</td>
        <td>{participantItem.email ? participantItem.email : "-"}</td>
        <td>{participantItem.phone ? participantItem.phone : "-"}</td>
        <td>
          {participantItem.resume ? (
            <Link
              to={participantItem.resume}
              target="_blank"
              className="text-primary"
            >
              <span className="short-action">Download</span>
            </Link>
          ) : (
            "-"
          )}
        </td>
        <td>
          {participantItem.linkedin ? (
            <Link
              to={participantItem.linkedin}
              target="_blank"
              className="text-primary"
            >
              <span className="short-action">Open</span>
            </Link>
          ) : (
            "-"
          )}
        </td>
        <td>
          {participantItem.github ? (
            <Link
              to={participantItem.github}
              target="_blank"
              className="text-primary"
            >
              <span className="short-action">Open</span>
            </Link>
          ) : (
            "-"
          )}
        </td>
        <td>
          {participantItem.portfolio ? (
            <Link
              to={participantItem.portfolio}
              target="_blank"
              className="text-primary"
            >
              <span className="short-action">Open</span>
            </Link>
          ) : (
            "-"
          )}
        </td>
        <td>
          {participantItem.possibleStartDate
            ? moment(participantItem.possibleStartDate).format("MMMM Do, YYYY")
            : "-"}
        </td>
        <td>{participantItem.score ? participantItem.score : 0}</td>
      </tr>
    );
  };

  return (
    <div className="participants-container">
      <h1>Participants{!loading && " (" + participantsList?.length + ")"}</h1>
      <div className="table-container">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Actions</th>
              <th>Photo</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Resume</th>
              <th>LinkedIn</th>
              <th>GitHub</th>
              <th>Portfolio</th>
              <th>Possible Start Date</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className="loader-container">
                <td colSpan={21}>
                  <div>
                    <Loader />
                    <span>Loading...</span>
                  </div>
                </td>
              </tr>
            ) : participantsList?.length > 0 ? (
              participantsList?.map((participantItem) => (
                <Participant
                  key={participantItem._id}
                  participantItem={participantItem}
                />
              ))
            ) : (
              <tr className="noData-container">
                <td colSpan={21}>
                  <div>
                    <img src={images.noParticipantsImage} alt="Participant" />
                    <span>No participants found!</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Participants;
