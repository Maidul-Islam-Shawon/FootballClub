import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ButtonMUI from "@material-ui/core/Button";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import Axios from "axios";
import { AddedMessage, UpdateMessage } from "./TostifyMessage";

const AddMember = (props) => {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [club, setClub] = useState([]);
  const [state, setState] = useState({
    forename: "",
    surname: "",
    emailAddress: "",
    clubId: "",
  });

  const MemberId = parseInt(props.match.params.id);
  console.log("id:", MemberId);

  useEffect(() => {
    if (MemberId) {
      Axios.get("https://localhost:44375/api/clubmembers/" + MemberId).then(
        (result) => {
          setState(result.data);
        },
        (err) => {
          setError(err.message);
        }
      );
    }
  }, [MemberId]);

  useEffect(() => {
    Axios.get("https://localhost:44375/api/clubs").then((result) => {
      setClub(result.data);
    });
  }, []);

  //console.log("Club List", club);

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    if (name === "clubId") {
      value = parseInt(value);
    }
    setState({ ...state, [name]: value });
  };

  console.log(state);

  const handleSubmit = (event) => {
    try {
      event.preventDefault();
      validationChecking(event);

      if (checkbox) {
        if (MemberId && state.clubId !== null) {
          Axios.put(
            "https://localhost:44375/api/clubmembers/" + MemberId,
            state
          ).then(
            (result) => {
              setState(result.data);
              UpdateMessage();
              props.history.push("/members");
            },
            (err) => {
              setError(err.message);
            }
          );
        }
        Axios.post("https://localhost:44375/api/clubmembers", state).then(
          (result) => {
            setState(result.data);
            AddedMessage();
            props.history.push("/members");
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
    console.log("what:", form);
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
  if (MemberId) {
    ButtonName = <Button type="submit">Update</Button>;
  } else {
    ButtonName = <Button type="submit">Submit</Button>;
  }

  return (
    <div>
      <hr />
      <h2 style={{ textAlign: "center" }}>Members Page</h2>
      <hr />
      <Link to="/members" style={{ textDecoration: "none" }}>
        <ButtonMUI variant="contained" color="default" size="small">
          Back
        </ButtonMUI>
      </Link>
      <br />
      <br />

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="forename"
              placeholder="First Name"
              onChange={handleChange}
              value={state.forename || ""}
            />
            <Form.Control.Feedback type="invalid">
              Please provide First Name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="surname"
              placeholder="Last Name"
              onChange={handleChange}
              value={state.surname || ""}
            />
            <Form.Control.Feedback type="invalid">
              Please provide Last Name.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type="email"
              name="emailAddress"
              placeholder="Email Address"
              onChange={handleChange}
              value={state.emailAddress || ""}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Email Address.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="formGridState">
            <Form.Label>Selec a Club</Form.Label>
            <Form.Control
              as="select"
              name="clubId"
              defaultValue="Choose..."
              onChange={handleChange}
              placeholder="Choose..."
              required
              value={state.clubId || ""}
            >
              <option value="" hidden>
                Choose here
              </option>
              {club.map((c) => (
                <option key={c.clubId} value={c.clubId}>
                  {c.clubName}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please Select a Club.
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
        {ButtonName}
      </Form>
      {error}
    </div>
  );
};

export default AddMember;
