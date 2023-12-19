import { useState } from "react";
import icons from "../components/icons";
import PickFields from "../components/PickFields";

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
    // Update the selectedFields state when the value of a selected field changes
    setFields((prevFields) => [
      ...prevFields.slice(0, index),
      { ...prevFields[index], [prop]: value },
      ...prevFields.slice(index + 1),
    ]);
    // Update the fields state as usual
    setSelectedFields((prevSelected) => [
      ...prevSelected.slice(0, index),
      { ...prevSelected[index], inputValue: value },
      ...prevSelected.slice(index + 1),
    ]);
  };

  const handleRemove = (field) => {
    setScore(score - field.points);
    setSelectedFields((prevSelected) =>
      prevSelected.filter((selected) => selected.input !== field.input)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const participant = { firstName, lastName, email };
    selectedFields.forEach((field) => {
      participant[field.input] = field.inputValue;
    });

    const response = await fetch("/api/participants/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(participant),
    });
    const data = await response.json();

    if (response.ok) {
      setError(null);
      // Reset form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setSelectedFields([]);
      setScore(75);
    } else {
      setError(data.msg);
    }
  };

  return (
    <div className="home-container">
      <div className="general">
        <h1>Join us ({score} points)</h1>
        <PickFields
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
              autoComplete="firstName"
              id="firstName"
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
              autoComplete="lastName"
              id="lastName"
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
            autoComplete="email"
            id="email"
            title="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="form-control"
            placeholder="Email"
          />
        </div>
        {selectedFields.map((field, index) => (
          <div key={field.input} className="input-group mb-3">
            <span className="input-group-text">{field.points}</span>
            {field.type === "textarea" ? (
              <textarea
                required
                autoComplete={field.input}
                id={field.input}
                title={field.title}
                onChange={(e) =>
                  handleChange(index, e.target.value, "inputValue")
                }
                value={field.inputValue}
                className="form-control"
                placeholder={field.title}
                rows="5"
              />
            ) : field.type === "select" ? (
              <select
                className="form-select"
                title={field.title}
                required
                autoComplete={field.input}
                id={field.input}
                onChange={(e) =>
                  handleChange(index, e.target.value, "inputValue")
                }
                value={field.inputValue}
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
                autoComplete={field.input}
                id={field.input}
                title={field.title}
                onChange={(e) =>
                  handleChange(index, e.target.value, "inputValue")
                }
                value={field.inputValue}
                className="form-control"
                placeholder={field.title}
              />
            )}
            <button
              className="btn btn-outline-secondary remove"
              type="button"
              onClick={() => handleRemove(field)}
            >
              <span className="icon">{icons.close}</span>
            </button>
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
