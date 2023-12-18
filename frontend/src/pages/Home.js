import { useState } from "react";
import icons from "../components/icons";
import AddFields from "../components/AddFields";

const Home = () => {
  const [error, setError] = useState(null);
  const [score, setScore] = useState(75);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [fields, setFields] = useState([
    { input: "phone", title: "Phone Number", type: "tel", points: 15 },
    { input: "resume", title: "Resume", type: "url", points: 15 },
    { input: "linkedin", title: "LinkedIn", type: "url", points: 10 },
    { input: "github", title: "GitHub", type: "url", points: 10 },
    { input: "portfolio", title: "Portfolio", type: "url", points: 10 },
    { input: "photo", title: "Photo", type: "url", points: 10 },
    { input: "birthDate", title: "Birth Date", type: "date", points: 5 },
    { input: "address", title: "Address", type: "text", points: 5 },
    { input: "postalCode", title: "Postal Code", type: "text", points: 5 },
    { input: "city", title: "City", type: "text", points: 5 },
    { input: "country", title: "Country", type: "text", points: 5 },
    {
      input: "degree",
      title: "Degree",
      type: "select",
      options: ["Bachelor", "Master"],
      points: 5,
    },
    { input: "fieldOfStudy", title: "Field of Study", type: "text", points: 5 },
    { input: "university", title: "University", type: "text", points: 5 },
    {
      input: "possibleStartDate",
      title: "Possible Start Date",
      type: "date",
      points: 5,
    },
    {
      input: "coverLetter",
      title: "Cover Letter",
      type: "textarea",
      points: 10,
    },
  ]);
  const [selectedFields, setSelectedFields] = useState([]);

  const handleChange = (index, value, prop) => {
    setFields((prevFields) => [
      ...prevFields.slice(0, index),
      { ...prevFields[index], [prop]: value },
      ...prevFields.slice(index + 1),
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const participant = {};
    selectedFields.forEach((field) => {
      participant[field.input] = "";
    });

    const response = await fetch("/api/participants/", {
      method: "POST",
      body: JSON.stringify(participant),
    });
    const data = await response.json();

    if (response.ok) {
      setError(null);
    } else {
      setError(data.msg);
    }
  };

  return (
    <div className="home-container">
      <div className="general">
        <h1>Join us ({score} points)</h1>
        <AddFields
          fields={fields}
          score={score}
          setScore={setScore}
          selectedFields={selectedFields}
          setSelectedFields={setSelectedFields}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 d-flex">
          <div className="input-group">
            <span className="input-group-text">25</span>
            <input
              type="text"
              required
              title="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              className="form-control"
              placeholder="First Name"
            />
          </div>
          <div className="input-group ms-3">
            <span className="input-group-text">25</span>
            <input
              type="text"
              required
              title="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              className="form-control"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">25</span>
          <input
            type="email"
            required
            title="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="form-control"
            placeholder="Email"
            id="email"
          />
        </div>
        {selectedFields.map((field, index) => (
          <div key={field.input} className="input-group mb-3">
            <span className="input-group-text">{field.points}</span>
            {field.type === "textarea" ? (
              <textarea
                required
                title={field.title}
                onChange={(e) => handleChange(index, e.target.value, "input")}
                // value={field.input}
                className="form-control"
                placeholder={field.title}
                rows="3"
              />
            ) : field.type === "select" ? (
              <select
                className="form-select"
                title={field.title}
                required
                onChange={(e) => handleChange(index, e.target.value, "input")}
                // value={field.input}
              >
                <option disabled>Choose your {field.title}</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                required
                title={field.title}
                onChange={(e) => handleChange(index, e.target.value, "input")}
                // value={field.input}
                className="form-control"
                placeholder={field.title}
              />
            )}
          </div>
        ))}
        {error && (
          <p className="mb-2 text-danger">
            <span className="icon d-inline-block me-1">{icons.error}</span>
            {error}
          </p>
        )}
        <button type="submit" className="btn btn-primary w-100">
          Apply
        </button>
      </form>
    </div>
  );
};

export default Home;
