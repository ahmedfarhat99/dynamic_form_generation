import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

const Participant = ({ loading, setLoading }) => {
  const { id } = useParams();
  const [participantItem, setParticipantItem] = useState(null);

  useEffect(() => {
    setLoading(true);

    const fetchParticipant = async () => {
      try {
        const response = await fetch("/api/participants/" + id);
        const data = await response.json();

        if (response.status === 200) {
          setParticipantItem(data);
        } else {
          console.log(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipant();
  }, [id, setLoading]);

  return (
    <div className="participant-container">
      {loading ? (
        <div className="loader-container">
          <Loader size={50} />
          <span>Loading...</span>
        </div>
      ) : participantItem ? (
        <div className="content">
          <h1>{participantItem.firstName + " " + participantItem.lastName}</h1>
        </div>
      ) : (
        <div className="noData-container">
          <h1>Participant not found!</h1>
        </div>
      )}
    </div>
  );
};

export default Participant;
