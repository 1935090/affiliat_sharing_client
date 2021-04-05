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

class PaypalEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      globalState: this.props.getGlobalState(),
      email: "",
      emailRe: "",
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  submitEmail = async () => {
    if (this.state.email === this.state.emailRe) {
      let globalState = this.state.globalState;
      const result = await Axios({
        method: "post",
        url: this.props._setting.serverUrl + "/update-paypal-email",
        data: {
          email: globalState.user.email,
          password: globalState.user.password,
          paypalEmail: this.state.email,
        },
      });
      if (result.status === 200 && result.data.type === "success") {
        await this.props.updateUser();
        this.props.history.push(`/paypal-account`);
      } else {
        alert("failed to update PayPal email.");
      }
    } else {
      alert("PayPal email and email retype does not match.");
    }
  };

  render() {
    const translation = this.state.globalState.translation;
    const trans = this.state.globalState.trans;
    return (
      <div style={{ padding: "0 10px" }}>
        {this.state.step === 1 && (
          <div>
            <div
              style={{
                height: "60px",
                padding: "10px 0",
              }}
            >
              <Link to={`/paypal-account`}>
                <img
                  src="/static/images/svg/blueback.svg"
                  style={{
                    marginRight: "25px",
                    marginLeft: "10px",
                    width: "12px",
                  }}
                />
              </Link>
              <span
                style={{
                  fontSize: "25px",
                  fontWeight: "700",
                  verticalAlign: "middle",
                }}
              >
                PayPal Email
              </span>
            </div>
            <div
              style={{
                boxShadow: "0 0 10px #e6e6e6",
                marginBottom: "10px",
                padding: "30px 20px 10px 20px",
              }}
              className="rb"
            >
              <form>
                <div
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel htmlFor="standard-adornment-amount">
                      Enter your PayPal email
                    </InputLabel>
                    <Input
                      id="standard-adornment-amount"
                      startAdornment={
                        <InputAdornment position="start"></InputAdornment>
                      }
                      type="email"
                      value={this.state.email}
                      onChange={(e) => {
                        this.setState({ email: e.target.value });
                      }}
                    />
                  </FormControl>
                </div>
                <div>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="standard-adornment-amount">
                      Enter your PayPal email again
                    </InputLabel>
                    <Input
                      id="standard-adornment-amount"
                      startAdornment={
                        <InputAdornment position="start"></InputAdornment>
                      }
                      type="email"
                      value={this.state.emailRe}
                      onChange={(e) => {
                        this.setState({ emailRe: e.target.value });
                      }}
                      onKeyUp={(e) => {
                        if (e.keyCode === 13) {
                          this.submitEmail();
                          this.props._ionic.keyboard.hide();
                          window.blur();
                        }
                      }}
                    />
                  </FormControl>
                </div>
              </form>
              <div
                style={{
                  borderTop: "1px solid #dfdfdf",
                  margin: "20px -10px 0 -10px",
                }}
              ></div>
              <p
                style={{
                  marginBottom: "0",
                  marginTop: "10px",
                  color: "#bababa",
                  fontSize: "15px",
                }}
              >
                Please input your PayPal email carefully as it can NOT be
                changed afterwards.
                <br />
                If you don't have a PayPal account yet, please{" "}
                <a href="https://paypal.com/signup" target="_blank">
                  sign up
                </a>{" "}
                for FREE.
              </p>
            </div>
            <div
              style={{
                width: "100%",
                padding: "0 30px",
                position: "absolute",
                bottom: "10px",
                left: "0",
              }}
            >
              <button
                style={{ height: "50px", width: "100%" }}
                className="btn big-blue-btn"
                onClick={() => {
                  this.submitEmail();
                }}
              >
                {translation["Confirm"][trans]}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withLayout(PaypalEmail);
