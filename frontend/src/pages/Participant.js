import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import Loader from "../components/Loader";
import icons from "../components/icons";

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

  const DetailItem = ({ label, value }) => (
    <div className="detail-item mb-3">
      <span className="detail-label me-1 fw-bold">{label}:</span>
      <span className="detail-value">{value}</span>
    </div>
  );

  const LinkItem = ({ icon, value }) => (
    <Link className="detail-item" to={value} target="_blank" rel="noreferrer">
      <span className="icon">{icons[icon]}</span>
    </Link>
  );

  const getAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  return (
    <div className="participant-container">
      {loading ? (
        <div className="loader-container">
          <Loader size={50} />
          <span>Loading...</span>
        </div>
      ) : participantItem ? (
        <div className="content row">
          <div className="col-7">
            <h1>
              {participantItem.firstName + " " + participantItem.lastName}
            </h1>
            <DetailItem label="Email" value={participantItem.email} />
            {participantItem.phone && (
              <DetailItem label="Phone Number" value={participantItem.phone} />
            )}
            {participantItem.birthDate && (
              <DetailItem
                label="Age"
                value={getAge(participantItem.birthDate)}
              />
            )}
            {participantItem.address && (
              <DetailItem label="Address" value={participantItem.address} />
            )}
            {participantItem.postalCode && (
              <DetailItem
                label="Postal Code"
                value={participantItem.postalCode}
              />
            )}
            {participantItem.city && (
              <DetailItem label="City" value={participantItem.city} />
            )}
            {participantItem.country && (
              <DetailItem label="Country" value={participantItem.country} />
            )}
            {participantItem.degree && (
              <DetailItem label="Degree" value={participantItem.degree} />
            )}
            {participantItem.fieldOfStudy && (
              <DetailItem
                label="Field of Study"
                value={participantItem.fieldOfStudy}
              />
            )}
            {participantItem.university && (
              <DetailItem
                label="University"
                value={participantItem.university}
              />
            )}
            {participantItem.possibleStartDate && (
              <DetailItem
                label="Possible Start Date"
                value={moment(participantItem.possibleStartDate).format(
                  "MMMM Do, YYYY"
                )}
              />
            )}
            {(participantItem.linkedin ||
              participantItem.github ||
              participantItem.portfolio) && (
              <div className="links d-flex align-items-center">
                {participantItem.linkedin && (
                  <LinkItem icon="linkedin" value={participantItem.linkedin} />
                )}
                {participantItem.github && (
                  <LinkItem icon="github" value={participantItem.github} />
                )}
                {participantItem.portfolio && (
                  <LinkItem
                    icon="portfolio"
                    value={participantItem.portfolio}
                  />
                )}
              </div>
            )}
          </div>
          <div className="col-5">
            <div className="picture mb-3">
              {participantItem.photo ? (
                <img src={participantItem.photo} alt="Participant" />
              ) : (
                <span className="icon">{icons.defaultUser}</span>
              )}
            </div>
            {participantItem.resume && (
              <a
                className="resume btn d-flex align-items-center justify-content-center"
                href={participantItem.resume}
                target="_blank"
                rel="noreferrer"
              >
                <span className="icon">{icons.download}</span> Download
              </a>
            )}
          </div>
          {participantItem.coverLetter && (
            <div className="cover-letter">
              <h4>Cover Letter</h4>
              <p>{participantItem.coverLetter}</p>
            </div>
          )}
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
