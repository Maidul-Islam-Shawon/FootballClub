import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from "@material-ui/core";

const ___TestReduxAddClub = () => {
  const [state, setState] = useState({
    clubName: "",
    addressLine1: "",
    town: "",
    postcode: "",
  });

  const [error, setError] = useState("");
  const [validated, setValidated] = useState(false);

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setState({ ...state, [name]: value });
  };

  console.log(state);

  const handleSubmit = (event) => {
    event.preventDefault();
    validationChecking(event);
    console.log(state);
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

  return (
    <div>
      <hr />
      <h2 style={{ textAlign: "center" }}>Redux Club Page</h2>
      <hr />
      <Link to="/reduxclub" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="default" size="small">
          Back
        </Button>
      </Link>
      <br /> <br />
      <form
        noValidate
        autoComplete="off"
        validated={validated}
        onSubmit={handleSubmit}
      >
        <FormControl>
          <InputLabel htmlFor="my-input">Email address</InputLabel>
          <Input
            type="text"
            id="clubName"
            name="clubName"
            required
            fullWidth
            variant="outlined"
            aria-describedby="my-helper-text"
            onChange={handleChange}
            value={state.clubName || ""}
          />
          <FormHelperText id="my-helper-text">
            We'll never share your email.
          </FormHelperText>
        </FormControl>
        {/* <TextField
          id="clubName"
          label="Club Name"
          name="clubName"
          required
          fullWidth
          type="text"
          variant="outlined"
          style={{ padding: "10px" }}
          onChange={handleChange}
          value={state.clubName || ""}
          error={false}
        />

        <TextField
          id="addressLine1"
          label="Address Line 1"
          name="addressLine1"
          required
          fullWidth
          type="text"
          variant="outlined"
          style={{ padding: "10px" }}
          onChange={handleChange}
        />

        <TextField
          id="town"
          label="Town"
          name="town"
          required
          fullWidth
          type="text"
          variant="outlined"
          style={{ padding: "10px" }}
          onChange={handleChange}
        />

        <TextField
          id="postcode"
          label="Post Code"
          name="postcode"
          required
          fullWidth
          type="text"
          variant="outlined"
          style={{ padding: "10px" }}
          onChange={handleChange}
        /> */}
        {/* <Button
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
          style={{ marginLeft: "10px" }}
        >
          Submit
        </Button> */}
      </form>
    </div>
  );
};

export default ___TestReduxAddClub;
