import { useState } from "react";
import icons from "../components/icons";
import AddFields from "../components/AddFields";

const Home = () => {
  const [error, setError] = useState(null);
  const [score, setScore] = useState(75);
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
      options: ["License", "Master"],
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

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  // const [resume, setResume] = useState("");
  // const [linkedin, setLinkedin] = useState("");
  // const [github, setGithub] = useState("");
  // const [portfolio, setPortfolio] = useState("");
  // const [coverLetter, setCoverLetter] = useState("");
  // const [photo, setPhoto] = useState("");
  // const [birthDate, setBirthDate] = useState("");
  // const [address, setAddress] = useState("");
  // const [postalCode, setPostalCode] = useState("");
  // const [city, setCity] = useState("");
  // const [country, setCountry] = useState("");
  // const [degree, setDegree] = useState("");
  // const [fieldOfStudy, setFieldOfStudy] = useState("");
  // const [university, setUniversity] = useState("");
  // const [possibleStartDate, setPossibleStartDate] = useState("");

  const handleAddField = () => {
    setFields((prevFields) => [
      ...prevFields,
      { input: "newField", title: "New Field", type: "text", points: 25 }, // Default values, adjust as needed
    ]);
  };

  const handleRemoveField = (index) => {
    setFields((prevFields) => [
      ...prevFields.slice(0, index),
      ...prevFields.slice(index + 1),
    ]);
  };

  const handleChange = (index, value, prop) => {
    setFields((prevFields) => [
      ...prevFields.slice(0, index),
      { ...prevFields[index], [prop]: value },
      ...prevFields.slice(index + 1),
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const participant = {
    //   firstName,
    //   lastName,
    //   email,
    //   phone,
    //   resume,
    //   linkedin,
    //   github,
    //   portfolio,
    //   coverLetter,
    //   photo,
    //   birthDate,
    //   address,
    //   postalCode,
    //   city,
    //   country,
    //   degree,
    //   fieldOfStudy,
    //   university,
    //   possibleStartDate,
    // };

    const participant = {};
    fields.forEach((field) => {
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
          setFields={setFields}
          score={score}
          setScore={setScore}
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
        {fields.map((field, index) => (
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
                onChange={(e) => handleChange(index, e.target.value, "input")}
                // value={field.input}
              >
                <option disabled>Pick your {field.title}</option>
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
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => handleRemoveField(index)}
            >
              Remove
            </button>
          </div>
        ))}
        {/* <div className="mb-3 d-flex">
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
        <div className="input-group mb-3">
          <span className="input-group-text">15</span>
          <input
            type="tel"
            title="Phone Number"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            className="form-control"
            placeholder="Phone Number"
          />
          <button class="btn btn-outline-secondary" type="button">
            Remove
          </button>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">15</span>
          <input
            type="url"
            title="Resume"
            onChange={(e) => setResume(e.target.value)}
            value={resume}
            className="form-control"
            placeholder="Resume"
          />
          <button class="btn btn-outline-secondary" type="button">
            Remove
          </button>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">10</span>
          <input
            type="url"
            title="LinkedIn"
            onChange={(e) => setLinkedin(e.target.value)}
            value={linkedin}
            className="form-control"
            placeholder="LinkedIn"
          />
          <button class="btn btn-outline-secondary" type="button">
            Remove
          </button>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">10</span>
          <input
            type="url"
            title="GitHub"
            onChange={(e) => setGithub(e.target.value)}
            value={github}
            className="form-control"
            placeholder="GitHub"
          />
          <button class="btn btn-outline-secondary" type="button">
            Remove
          </button>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">10</span>
          <input
            type="url"
            title="Portfolio"
            onChange={(e) => setPortfolio(e.target.value)}
            value={portfolio}
            className="form-control"
            placeholder="Portfolio"
          />
          <button class="btn btn-outline-secondary" type="button">
            Remove
          </button>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">10</span>
          <input
            type="url"
            title="Photo"
            onChange={(e) => setPhoto(e.target.value)}
            value={photo}
            className="form-control"
            placeholder="Photo"
          />
          <button class="btn btn-outline-secondary" type="button">
            Remove
          </button>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">5</span>
          <input
            type="date"
            title="Birth Date"
            onChange={(e) => setBirthDate(e.target.value)}
            value={birthDate}
            className="form-control"
          />
          <button class="btn btn-outline-secondary" type="button">
            Remove
          </button>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">5</span>
          <select
            class="form-select"
            title="Degree"
            onChange={(e) => setDegree(e.target.value)}
            value={degree}
          >
            <option selected disabled>
              Pick your Degree
            </option>
            <option value="License">License</option>
            <option value="Master">Master</option>
          </select>
          <button class="btn btn-outline-secondary" type="button">
            Remove
          </button>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">5</span>
          <input
            type="text"
            title="Field of Study"
            onChange={(e) => setFieldOfStudy(e.target.value)}
            value={fieldOfStudy}
            className="form-control"
            placeholder="Field of Study"
          />
          <button class="btn btn-outline-secondary" type="button">
            Remove
          </button>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">5</span>
          <input
            type="text"
            title="University"
            onChange={(e) => setUniversity(e.target.value)}
            value={university}
            className="form-control"
            placeholder="University"
          />
          <button class="btn btn-outline-secondary" type="button">
            Remove
          </button>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">5</span>
          <input
            type="text"
            title="Address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            className="form-control"
            placeholder="Address"
          />
          <button class="btn btn-outline-secondary" type="button">
            Remove
          </button>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">5</span>
          <input
            type="text"
            title="Postal Code"
            onChange={(e) => setPostalCode(e.target.value)}
            value={postalCode}
            className="form-control"
            placeholder="Postal Code"
          />
          <button class="btn btn-outline-secondary" type="button">
            Remove
          </button>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">5</span>
          <input
            type="text"
            title="City"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            className="form-control"
            placeholder="City"
          />
          <button class="btn btn-outline-secondary" type="button">
            Remove
          </button>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">5</span>
          <input
            type="text"
            title="Country"
            onChange={(e) => setCountry(e.target.value)}
            value={country}
            className="form-control"
            placeholder="Country"
          />
          <button class="btn btn-outline-secondary" type="button">
            Remove
          </button>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">5</span>
          <input
            type="date"
            title="Possible Start Date"
            onChange={(e) => setPossibleStartDate(e.target.value)}
            value={possibleStartDate}
            className="form-control"
          />
          <button class="btn btn-outline-secondary" type="button">
            Remove
          </button>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">10</span>
          <textarea
            placeholder="Cover Letter"
            onChange={(e) => setCoverLetter(e.target.value)}
            value={coverLetter}
            className="form-control"
            rows="3"
            title="Cover Letter"
          ></textarea>
          <button class="btn btn-outline-secondary" type="button">
            Remove
          </button>
        </div> */}
        {error && (
          <p className="mb-2 text-danger">
            <span className="icon d-inline-block me-1">{icons.error}</span>
            {"error"}
          </p>
        )}
        <button type="submit" class="btn btn-primary w-100">
          Apply
        </button>
      </form>
    </div>
  );
};

export default Home;
