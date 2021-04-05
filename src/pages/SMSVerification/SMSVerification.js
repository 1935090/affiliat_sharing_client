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

class SMSVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smscode: "",
      globalState: this.props.getGlobalState(),
      intevalId: null,
      second: 59,
      isEmpty: false,
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.setTimmer();
  }
  setTimmer = () => {
    const intevalId = setInterval(() => {
      if (this.state.second > 0) {
        this.setState({ second: this.state.second - 1 });
      }
    }, 1000);
  };
  next = async () => {
    const translation = this.state.globalState.translation;
    const trans = this.state.globalState.trans;
    if (!this.state.smscode) {
      this.setState({ isEmpty: true });
    }
    if (this.state.smscode) {
      const result = await this.confirmSMS();

      if (result) {
        this.props.history.push(`/registration-detail`);
      }
      else {
        alert(translation["Verification code incorrect."][trans]);
      }
    } else {
      alert(translation["Verification code incorrect."][trans]);
    }
  };

  confirmSMS = async () => {
    const result = await Axios({
      method: "post",
      url: this.props._setting.serverUrl + "/check-sms-code",
      data: {
        smsId: this.props.getGlobalState().registrationData.smsId,
        code: this.state.smscode,
      },
    });
    if (result.status === 200 && result.data.type === "success") {
      return true;
    }
    return false;
  };

  getSMS = async () => {
    this.setState({ second: 59 });
    let globalState = this.props.getGlobalState();
    const result = await Axios({
      method: "post",
      url: this.props._setting.serverUrl + "/send-sms-code",
      data: {
        mobilePrefixCountry: globalState.registrationData.mobilePrefixCountry,
        mobile: globalState.registrationData.mobile,
      },
    });
    if (result.status === 200 && result.data.type === "success") {
      globalState.registrationData.smsId = result.data.message;
      this.props.setGlobalState(globalState);
      return result.data.message;
    } else {
      alert("Send SMS failed.");
    }
    return null;
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
              {translation["Verify"][trans]}
            </p>
            <p style={{ color: "8a8a8a", fontSize: "15px" }}>
              {translation["Verify your phone number"][trans]}
            </p>
            <FormControl fullWidth>
              <InputLabel htmlFor="standard-adornment-amount">
                <span
                  style={{
                    color: this.state.isEmpty ? "#f44336" : "rgba(0,0,0,.54)",
                  }}
                >
                  {translation["Enter 4-digit verification code"][trans]}
                </span>
              </InputLabel>
              <Input
                id="standard-adornment-amount"
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
                onChange={(e) => {
                  let value = e.target.value;
                  this.setState({ smscode: value }, () => {
                    if (value.length === 4) this.next();
                  });
                }}
                value={this.state.smscode}
                inputProps={{
                  maxLength: "4",
                  pattern: "[0-9]*",
                  inputMode: "numeric",
                }}
                onKeyUp={(e) => {
                  if (e.keyCode === 13) {
                    this.next();
                    this.props._ionic.keyboard.hide();
                    window.blur();
                  }
                }}
              />
            </FormControl>
            {this.state.second > 0 && (
              <p
                style={{
                  textAlign: "right",
                  color: "8a8a8a",
                  marginTop: "10px",
                  fontSize: "15px",
                }}
              >
                {translation["Re-send verification code"][trans]} 00:
                {this.state.second < 10
                  ? "0" + this.state.second
                  : this.state.second}
              </p>
            )}
            {this.state.second === 0 && (
              <button
                className="btn sm-blue-btn"
                style={{ float: "right", marginTop: "10px" }}
                onClick={() => {
                  this.getSMS();
                }}
              >
                {translation["Re-send verification code"][trans]}
              </button>
            )}
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

export default withLayout(SMSVerification);
