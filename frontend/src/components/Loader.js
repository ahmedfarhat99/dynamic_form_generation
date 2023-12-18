import { MagnifyingGlass } from "react-loader-spinner";

const Loader = ({ size }) => {
  const loading = (
    <MagnifyingGlass
      visible={true}
      height={size === undefined ? "40" : size}
      width={size === undefined ? "40" : size}
      ariaLabel="MagnifyingGlass-loading"
      wrapperStyle={{}}
      wrapperClass="MagnifyingGlass-wrapper"
      glassColor="#c0efff"
      color="#d0bdf4"
    />
  );

  return <div className="loading-container">{loading}</div>;
};

export default Loader;
