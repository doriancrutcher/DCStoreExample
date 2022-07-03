import React from "react";
import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";
import { Nav } from "react-bootstrap";

const AltHome = (props) => {
  return (
    <div style={{ marginTop: "5vh" }}>
      <Alert>There are no items for sale... Store owner </Alert>
    </div>
  );
};

AltHome.propTypes = {};

export default AltHome;
