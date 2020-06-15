import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ButtonMUI from "@material-ui/core/Button";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import Axios from "axios";
import { AddedMessage, UpdateMessage } from "./TostifyMessage";

const AddClub = (props) => {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [state, setState] = useState({
    clubName: "",
    addressLine1: "",
    town: "",
    postcode: "",
  });

  const ClubId = parseInt(props.match.params.id);
  console.log("id:", ClubId);

  useEffect(() => {
    if (ClubId) {
      Axios.get("https://localhost:44375/api/clubs/" + ClubId).then(
        (result) => {
          setState(result.data);
        },
        (err) => {
          setError(err.message);
        }
      );
    }
  }, [ClubId]);

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setState({ ...state, [name]: value });
  };

  //console.log(state);

  const handleSubmit = (event) => {
    try {
      event.preventDefault();
      validationChecking(event);

      if (checkbox) {
        if (ClubId) {
          Axios.put("https://localhost:44375/api/clubs/" + ClubId, state).then(
            (result) => {
              setState(result.data);
              UpdateMessage();
              props.history.push("/club");
            },
            (err) => {
              setError(err.message);
            }
          );
        }
        Axios.post("https://localhost:44375/api/clubs", state).then(
          (result) => {
            setState(result.data);
            AddedMessage();
            props.history.push("/club");
          },
          (err) => {
            setError(err.message);
          }
        );
      }
    } catch (ex) {
      setError(ex.message);
    }
  };

  function validationChecking(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  }

  const handleCheck = (event) => {
    setCheckbox(!checkbox);
  };

  let ButtonName;
  if (ClubId) {
    ButtonName = <Button type="submit">Update</Button>;
  } else {
    ButtonName = <Button type="submit">Submit</Button>;
  }

  return (
    <div>
      <hr />
      <h2 style={{ textAlign: "center" }}>Club Page</h2>
      <hr />
      <Link to="/club" style={{ textDecoration: "none" }}>
        <ButtonMUI variant="contained" color="default" size="small">
          Back
        </ButtonMUI>
      </Link>
      <br />
      <br />

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Club Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="clubName"
              placeholder="Club Name"
              onChange={handleChange}
              value={state.clubName || ""}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a Club Name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Address Line 1</Form.Label>
            <Form.Control
              required
              type="text"
              name="addressLine1"
              placeholder="Address Line 1"
              onChange={handleChange}
              value={state.addressLine1 || ""}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a Address Line 1.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Town</Form.Label>
            <Form.Control
              required
              type="text"
              name="town"
              placeholder="Town"
              onChange={handleChange}
              value={state.town || ""}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Town.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom04">
            <Form.Label>Postcode</Form.Label>
            <Form.Control
              required
              type="text"
              name="postcode"
              placeholder="Postcode"
              onChange={handleChange}
              value={state.postcode || ""}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Postcode.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Group>
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before Submit."
            onChange={handleCheck}
          />
        </Form.Group>
        <Button type="submit">{ButtonName}</Button>
      </Form>
    </div>
  );
};

export default AddClub;
