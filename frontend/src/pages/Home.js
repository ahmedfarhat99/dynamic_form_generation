import icons from "../components/icons";

const Home = () => {
  return (
    <div className="home-container">
      <div className="general">
        <h1>Home</h1>
        <button className="btn text-success border-success">
          <span className="icon">{icons.add}</span>
        </button>
      </div>
      <form></form>
    </div>
  );
};

export default Home;
