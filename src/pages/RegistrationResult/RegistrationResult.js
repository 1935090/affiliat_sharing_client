import React, { Component } from "react";
import { Link } from "react-router-dom";
import withLayout from "../../lib/withLayout";
const Axios = require("axios");

class RegistrationResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      globalState: this.props.getGlobalState(),
    };
  }
  componentDidMount = async () => {
    window.scrollTo(0, 0);
    await this.props.resetRegistrationData();
  };
  login = async () => {
    /*let globalState = this.state.globalState;
    globalState.user = null;
    const result = await Axios({
      method: "post",
      url: this.props._setting.serverUrl + "/signin",
      data: {
        email: this.props.location.state.email,
        password: this.props.location.state.password,
      },
    });
    if (result.status === 200 && result.data.type === "success") {
      let user = result.data.message;
      globalState.user = user;
      this.props.setGlobalState(globalState);
      this.props.history.push(`/home`);
    } else {
      alert("Wrong email/password.");
    }*/

    let globalState = this.state.globalState;
    globalState.user = null;
    const result = await Axios({
      method: "post",
      url: this.props._setting.serverUrl + "/signin",
      data: {
        email: this.props.location.state.email,
        password: this.props.location.state.password,
      },
    });
    if (result.status === 200 && result.data.type === "success") {
      this.props._ionic.kit.addLogin({
        kitJson: {
          email: this.props.location.state.email,
          password: this.props.location.state.password,
        },
      });
      let user = result.data.message;
      globalState.user = user;
      await this.props.setGlobalState(globalState);
      this.props.history.push(`/home`);
    } else {
      alert("Wrong email/password.");
    }
  };
  render() {
    const translation = this.state.globalState.translation;
    const trans = this.state.globalState.trans;
    return (
      <div>
        <div
          style={{
            height: "calc(100vh - 70px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "10px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <img
              src="/static/images/Successful@3x.png"
              style={{ width: "60%" }}
            />
            <p
              style={{
                marginTop: "50px",
                fontWeight: "700",
                fontSize: "25px",
              }}
            >
              {translation["Success"][trans]}!
            </p>
            <div
              style={{
                width: "60%",
                display: "inline-block",
                color: "8a8a8a",
                fontSize: "15px",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </div>
        </div>
        <div style={{ width: "100%", padding: "0 30px" }}>
          <button
            style={{ height: "50px", width: "100%" }}
            className="btn big-blue-btn"
            onClick={() => {
              this.login();
            }}
          >
            {translation["Login"][trans]}
          </button>
        </div>
      </div>
    );
  }
}

export default withLayout(RegistrationResult);
