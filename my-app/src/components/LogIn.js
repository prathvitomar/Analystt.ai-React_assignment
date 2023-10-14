import React, { useCallback, useState } from "react";
import "./styles.css";
import { styled, makeStyles } from "@material-ui/styles";
import { Form, Field } from "react-final-form";
import { TextField } from "final-form-material-ui";
import FacebookLogin from "react-facebook-login";
import TwitterLogin from "react-twitter-login";
import GoogleLogin from "react-google-login";
import {
  Button as _Button,
  Checkbox,
  FormControlLabel,
  Grid
} from "@material-ui/core";

import { postLogin } from "./epic/actions";
import pattern from "./pattern";

const Button = styled(_Button)({
  backgroundColor: "#d2dec6",
  width: 135,
  height: 50,
  textAlign: "center",
  margin: 10,
  "&:hover": {
    backgroundColor: "#303e43"
  }
});
const useStyles = makeStyles({
  title: {
    color: "#303e43",
    fontSize: 35
  }
});

export default function LogIn() {
  const classes = useStyles();
  const [isRemember, setIsRemember] = useState(
    localStorage.getItem("isRemember") === "true" ? true : false
  );
  const componentClicked = () => {
    console.log("clicked");
  };
  const responseFacebook = response => {
    console.log(response);
  };
  const authHandler = (err, data) => {
    console.log(err, data);
  };
  const responseGoogle = response => {
    console.log(response);
  };

  const setDefaultEmail = useCallback(email => {
    return localStorage.getItem("isRemember") === "true"
      ? localStorage.setItem("email", email)
      : localStorage.removeItem("email");
  }, []);
  const onSubmit = useCallback(
    values => {
      const { email: emailPattern, password: passwordPattern } = pattern;
      const EMAIL_REGEXP = new RegExp(emailPattern);
      const PASSWORD_REGEXP = new RegExp(passwordPattern);
      const { email, password } = values;
      if (email && !email.match(EMAIL_REGEXP)) {
        return { email: "EmailPatternError" };
      } else if (password && !password.match(PASSWORD_REGEXP)) {
        return { password: "PasswordError" };
      }
      if (email && password) {
        setDefaultEmail(email);
        postLogin(email, password);
      }
    },
    [postLogin, setDefaultEmail]
  );
  return (
    <div className="App">
      <div className={classes.title}>Login</div>
      <Form
        onSubmit={onSubmit}
        render={({ submitError, handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Grid>
              <Grid>
                <Field
                  required
                  name="email"
                  component={TextField}
                  type="text"
                  label={"Email"}
                  defaultValue={localStorage.getItem("email")}
                />
              </Grid>
              <Grid>
                <Field
                  required
                  name="password"
                  component={TextField}
                  type="password"
                  label={"Password"}
                />
                {submitError && <div className="error">{submitError}</div>}
              </Grid>
              <FormControlLabel
                label={"Remember Me"}
                control={
                  <Checkbox
                    checked={isRemember}
                    onChange={() => setIsRemember(!isRemember)}
                  />
                }
              />
            </Grid>
            <Button type="submit" disabled={submitting}>
              Login
            </Button>
          </form>
        )}
      />
      <Grid style={{ margin: 10 }}>
        <FacebookLogin
          appId="1206715649505081"
          fields="name,email,picture"
          onClick={componentClicked}
          callback={responseFacebook}
          icon="fa-facebook"
        />
      </Grid>
      <Grid style={{ margin: 10 }}>
        <TwitterLogin
          authCallback={authHandler}
          consumerKey={"PyHxgJuyORZqhDiuKAne8LcxT"}
          consumerSecret={"RBqOgWJfflgk2GLGmKtHFnHituqvf3vROPfAqzOPpfKficIrI9"}
          callbackUrl={"https://alexandrtovmach.github.io/react-twitter-login/"}
          buttonTheme={"dark"}
        />
      </Grid>
      <Grid>
        <GoogleLogin
          clientId="85a03867-dccf-4882-adde-1a79aeec50df.apps.googleusercontent.com"
          buttonText="Login with Google"
          isSignedIn={true}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </Grid>
    </div>
  );
}

