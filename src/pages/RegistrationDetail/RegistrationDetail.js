import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  FormControl,
  InputLabel,
  InputAdornment,
} from "@material-ui/core";
import withLayout from "../../lib/withLayout";
const Axios = require("axios");

class RegistrationDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordcfm: "",
      globalState: this.props.getGlobalState(),
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.state.email === "") {
      if (
        this.state.globalState.fbTokenData &&
        this.state.globalState.fbTokenData.email
      ) {
        const pw = Math.random()
          .toString(36)
          .slice(-8);
        this.setState({
          email: this.state.globalState.fbTokenData.email,
          password: pw,
          passwordcfm: pw,
        });
      }
    }
  }
  validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  next = async () => {
    let globalState = this.state.globalState;
    if (!globalState.registrationData) {
      alert("Something wrong, redirect to login");
      this.props.history.push(`/login`);
    }
    if (this.state.email && this.state.password && this.state.passwordcfm) {
      if (!this.validateEmail(this.state.email)) {
        alert("Email format incorrect.");
        return;
      }
      if (this.state.password != this.state.passwordcfm) {
        alert("Password and confirm password not match.");
        return;
      }
      globalState.registrationData.email = this.state.email;
      globalState.registrationData.password = this.state.password;
      //this.props.setGlobalState(globalState);
      globalState.registrationData.fbToken = globalState.fbToken;
      //register to server
      const result = await Axios({
        method: "post",
        url: this.props._setting.serverUrl + "/registration",
        data: globalState.registrationData,
      });
      if (result.status === 200 && result.data.type === "success") {
        //let user = result.data.message;
        //globalState.registrationData = null;
        //globalState.fbToken = null;
        //globalState.fbTokenData = null;
        //this.props.setGlobalState(globalState);
        this.props.history.push({
          pathname: `/registration-result`,
          state: result.data.message,
        });
      } else {
        alert("FAIL: " + result.data.message);
      }
    } else {
      alert("Please fill in all required fields");
    }
  };
  render() {
    const translation = this.state.globalState.translation;
    const trans = this.state.globalState.trans;
    return (
      <div style={{ padding: "0 10px" }}>
        <div style={{ height: "60px", padding: "10px 0" }}>
          <Link to={`/login`}>
            <img
              src="/static/images/svg/blueback.svg"
              style={{
                marginRight: "25px",
                marginLeft: "10px",
                width: "12px",
              }}
            />
          </Link>
        </div>
        <div
          style={{
            height: "calc(100vh - 130px)",
            marginBottom: "10px",
          }}
          className="rb"
        >
          <div
            style={{
              width: "100%",
              padding: "30px 15px",
            }}
          >
            <p
              style={{
                fontSize: "25px",
                fontWeight: "700",
                marginBottom: "10px",
              }}
            >
              Fill your infomation
            </p>
            <div>
              <form>
                <div style={{ marginTop: "40px" }}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="standard-adornment-amount">
                      {translation["Enter your e-mail"][trans]}
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
                      onKeyUp={(e) => {
                        if (
                          (this.state.globalState.fbTokenData &&
                            !this.state.globalState.fbTokenData.email) ||
                          !this.state.globalState.fbTokenData
                        ) {
                        } else if (e.keyCode === 13) {
                          this.next();
                          this.props._ionic.keyboard.hide();
                          window.blur();
                        }
                      }}
                    />
                  </FormControl>
                </div>
                {((this.state.globalState.fbTokenData &&
                  !this.state.globalState.fbTokenData.email) ||
                  !this.state.globalState.fbTokenData) && (
                    <div style={{ marginTop: "20px" }}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="standard-adornment-amount">
                          {translation["Set your password"][trans]}
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
                        />
                      </FormControl>
                    </div>
                  )}
                {((this.state.globalState.fbTokenData &&
                  !this.state.globalState.fbTokenData.email) ||
                  !this.state.globalState.fbTokenData) && (
                    <div style={{ marginTop: "20px" }}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="standard-adornment-amount">
                          {translation["Confirm your password"][trans]}
                        </InputLabel>
                        <Input
                          id="standard-adornment-amount"
                          startAdornment={
                            <InputAdornment position="start"></InputAdornment>
                          }
                          type="password"
                          onChange={(e) => {
                            this.setState({ passwordcfm: e.target.value });
                          }}
                          value={this.state.passwordcfm}
                          onKeyUp={(e) => {
                            if (e.keyCode === 13) {
                              this.next();
                              this.props._ionic.keyboard.hide();
                              window.blur();
                            }
                          }}
                        />
                      </FormControl>
                    </div>
                  )}
              </form>
            </div>
          </div>
        </div>
        <div style={{ width: "100%", padding: "0 20px" }}>
          <button
            style={{ height: "50px", width: "100%" }}
            className="btn big-blue-btn"
            onClick={() => {
              this.next();
            }}
          >
            {translation["Submit"][trans]}
          </button>
        </div>
      </div>
    );
  }
}

export default withLayout(RegistrationDetail);
