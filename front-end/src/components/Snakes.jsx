import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const Snakes = (props) => {
  const [redirect, setRedirect] = useState(false);

  return (
    <>
      {redirect && <Redirect to="" />}
      <Card bg="light" style={{ maxWidth: "100%", maxHeight: "100%" }}>
        <Card.Body>
          <Card.Title>{props.data.longName}</Card.Title>
          <Card.Img
            variant="top"
            src={props.data.image}
            style={{ marginBottom: "10px" }}
          />
          <Card.Subtitle>({props.data.sciName})</Card.Subtitle>
          <Card.Text style={{ textAlign: "left" }}>
            {props.data.description}
          </Card.Text>
          <div className="upload-btn-wrapper">
            {props.hasSlug !== undefined ? (
              <Button
                className="btn btn-primary"
                onClick={() => setRedirect(true)}
              >
                {" "}
                Back{" "}
              </Button>
            ) : (
              <></>
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default Snakes;
