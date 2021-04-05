import React, { Component } from "react";
import withLayout from "../../lib/withLayout";
import { Link } from "react-router-dom";
import {
  Input,
  FormControl,
  InputLabel,
  InputAdornment,
} from "@material-ui/core";
import "@codetrix-studio/capacitor-google-auth";
import { Plugins } from "@capacitor/core";

const Axios = require("axios");

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      globalState: this.props.getGlobalState(),
    };
  }

  componentDidMount() {
    this.props.resetRegistrationData();
    window.scrollTo(0, 0);
  }

  login = async () => {
    let globalState = this.state.globalState;
    globalState.user = null;
    const result = await Axios({
      method: "post",
      url: this.props._setting.serverUrl + "/signin",
      data: { email: this.state.email, password: this.state.password },
    });
    if (result.status === 200 && result.data.type === "success") {
      this.props._ionic.kit.addLogin({
        kitJson: {
          email: this.state.email,
          password: this.state.password,
        },
      });
      let user = result.data.message;
      globalState.user = user;
      this.props.setGlobalState(globalState);
      this.props.history.push(`/home`);
    } else {
      alert("Wrong email/password.");
    }
  };

  FacebookLogin = async () => {
    this.props._ionic.facebook
      .login([
        "public_profile",
        "user_friends",
        "user_posts",
        "email",
        "user_birthday",
        "user_gender",
        "pages_show_list",
        "pages_read_engagement",
      ])
      .then(async (res) => {
        if (typeof res.status !== "undefined" && res.status === "connected") {
          let globalState = this.state.globalState;
          globalState.user = null;
          const result = await Axios({
            method: "post",
            url: this.props._setting.serverUrl + "/signin-facebook",
            data: { fbToken: res.authResponse },
          });
          if (result.status === 200 && result.data.type == "success") {
            let user = result.data.message;

            this.props._ionic.kit.addLogin({
              kitJson: {
                email: user.email,
                password: user.password,
              },
            });
            globalState.user = user;
            this.props.setGlobalState(globalState);
            this.props.history.push(`/home`);
          } else {
            globalState.fbToken = res.authResponse;
            globalState.fbTokenData = await this.getFBData({
              fbToken: res.authResponse,
            });
            this.props.setGlobalState(globalState);
            this.props.history.push(`/registration`);
          }
        } else {
          alert("Fail logging into Facebook");
        }
        if (typeof res.status !== "undefined" && res.status === "connected") {
          //alert("Facebook Login Success");
        } else {
          alert("Fail logging into Facebook");
        }
      })
      .catch((e) => alert("Fail logging into Facebook"));
  };

  getFBData = async ({ fbToken }) => {
    const APIresult = await Axios({
      method: "get",
      url: `https://graph.facebook.com/${fbToken.userID}?fields=id,name,email,picture,birthday,friends&access_token=${fbToken.accessToken}`,
    });
    console.log(
      `https://graph.facebook.com/${fbToken.userID}?fields=id,name,email,picture,birthday,friends&access_token=${fbToken.accessToken}`
    );
    if (APIresult.data && APIresult.data.id) {
      return APIresult.data;
    }
    return null;
  };

  googleLogin = async () => {
    const googleUser = await Plugins.GoogleAuth.signIn();
    console.log(googleUser);

    let globalState = this.state.globalState;
    globalState.user = null;
    const result = await Axios({
      method: "post",
      url: this.props._setting.serverUrl + "/signin-google",
      data: { googleToken: googleUser },
    });
    if (result.status === 200 && result.data.type === "success") {
      let user = result.data.message;

      this.props._ionic.kit.addLogin({
        kitJson: {
          email: user.email,
          password: user.password,
        },
      });
      globalState.user = user;
      this.props.setGlobalState(globalState);
      this.props.history.push(`/home`);
    } else {
      globalState.googleToken = googleUser.authentication.idToken;
      this.props.setGlobalState(globalState);
      this.props.history.push(`/registration`);
    }
  };

  render() {
    const translation = this.state.globalState.translation;
    const trans = this.state.globalState.trans;
    return (
      <div>
        <div
          style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
        >
          <img
            style={{ width: "100%", position: "relative", top: "-40%" }}
            src="/static/images/svg/Background2.svg"
          />
        </div>
        <div
          style={{
            display: "flex",
            height: "calc(100% - 540px)",
            position: "relative",
            zIndex: "99",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <img style={{ width: "200px" }} src="/static/images/svg/Logo.svg" />
        </div>
        <div
          style={{
            position: "fixed",
            bottom: "0",
            padding: "40px 40px 10px 40px",
            backgroundColor: "#fff",
            boxShadow: "0 0 10px #e6e6e6",
            width: "100%",
            height: "540px",
          }}
          className="rb1 rb2"
        >
          <div>
            <div>
              <p
                style={{
                  color: "#000",
                  fontSize: "35px",
                  fontWeight: "700",
                  margin: "0",
                }}
              >
                {translation["Welcome"][trans]}
              </p>
            </div>
            <form>
              <div style={{ marginTop: "20px" }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="standard-adornment-amount">
                    {translation["E-mail"][trans]}
                  </InputLabel>
                  <Input
                    id="standard-adornment-amount"
                    startAdornment={
                      <InputAdornment position="start"></InputAdornment>
                    }
                    onChange={(e) => {
                      this.setState({ email: e.target.value });
                    }}
                    value={this.state.email}
                  />
                </FormControl>
              </div>
              <div style={{ marginTop: "20px" }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="standard-adornment-amount">
                    {translation["Password"][trans]}
                  </InputLabel>
                  <Input
                    id="standard-adornment-amount"
                    startAdornment={
                      <InputAdornment position="start"></InputAdornment>
                    }
                    type="password"
                    onChange={(e) => {
                      this.setState({ password: e.target.value });
                    }}
                    value={this.state.password}
                    onKeyUp={(e) => {
                      if (e.keyCode === 13) {
                        this.login();
                        this.props._ionic.keyboard.hide();
                        window.blur();
                      }
                    }}
                  />
                </FormControl>
              </div>
            </form>
            <div>
              <p
                style={{
                  textAlign: "right",
                  color: "8a8a8a",
                  marginTop: "10px",
                  fontSize: "15px",
                }}
              >
                {translation["Forgot your password?"][trans]}
              </p>
            </div>
          </div>

          <div style={{ marginTop: "40px" }}>
            <button
              style={{ width: "100%", height: "50px" }}
              className="btn big-blue-btn"
              onClick={() => {
                this.login();
              }}
            >
              {translation["Sign in"][trans]}
            </button>
          </div>
          <div
            style={{
              textAlign: "center",
              position: "relative",
              marginTop: "20px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "5px 10px",
                backgroundColor: "#fff",
                position: "relative",
                zIndex: "2",
              }}
            >
              {translation["OR"][trans]}
            </span>
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#000",
                position: "absolute",
                top: "50%",
              }}
            ></div>
          </div>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <img
              src="/static/images/f_logo_RGB-Hex-Blue_512.png"
              style={{ marginRight: "0px", width: "40px" }}
              onClick={() => {
                this.FacebookLogin();
              }}
            />
            {/* <img
              src="/static/images/g-logo.png"
              style={{ width: "40px" }}
              onClick={() => {
                this.googleLogin();
              }}
            /> */}
          </div>
          <div style={{ marginTop: "20px" }}>
            <p style={{ textAlign: "center" }}>
              {translation["Don't have an account?"][trans]}{" "}
              <Link to={`/registration`}>{translation["Sign up"][trans]}</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withLayout(Login);
