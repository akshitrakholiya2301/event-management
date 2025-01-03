import React from "react";
import "./Loader.scss";
import loader from "../assets/images/loader.gif"
/**
 * Loader component
 * @param {Object} props - Props for Loader component
 * @param {boolean} props.loading - Flag indicating whether to display the loader or not
 */
function Loader({ loading }: any) {
  return (
    <>
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
          {/* <img src={loader} alt="loader" /> */}
        </div>
      )}
    </>
  );
}

export default Loader;

Loader.defaultProps = {
  loading: false,
};
