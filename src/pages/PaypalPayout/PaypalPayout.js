import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  FormControl,
  InputLabel,
  InputAdornment,
} from "@material-ui/core";
import withLayout from "../../lib/withLayout";
import Moment from "moment";
import NumberFormat from "react-number-format";
const Axios = require("axios");

class PaypalPayout extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    if (
      !this.state.globalState.user ||
      this.state.globalState.user.moneyEarn <= 0
    ) {
      this.props.history.push("/paypal-account");
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      globalState: this.props.getGlobalState(),
      payoutValue: "",
    };
  }

  submitPayout = async () => {
    let globalState = this.state.globalState;
    const result = await Axios({
      method: "post",
      url: this.props._setting.serverUrl + "/submit-payout",
      data: {
        email: globalState.user.email,
        password: globalState.user.password,
        payoutValue: this.state.payoutValue,
      },
    });
    if (result.status === 200 && result.data.type === "success") {
      await this.props.updateUser();
      this.props.history.push(`/sms-code`);
    } else {
      alert("failed to submit payout.");
    }
  };

  render() {
    const user = this.state.globalState.user;
    const translation = this.state.globalState.translation;
    const trans = this.state.globalState.trans;
    return (
      <div style={{ padding: "0 10px" }}>
        {this.state.step === 1 && (
          <div>
            <div style={{ height: "60px", padding: "10px 0" }}>
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
                {translation["Cash Out"][trans]}
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
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ marginRight: "30px" }}>
                  <img
                    src="/static/images/0.jpg"
                    style={{ borderRadius: "100px", width: "60px" }}
                  />
                </div>
                <div>
                  <span style={{ fontSize: "18px" }}>{user.paypalEmail}</span>
                  <br />
                  <span>
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        position: "relative",
                        top: "-5px",
                      }}
                    >
                      ${" "}
                    </span>
                    <span style={{ fontSize: "30px", fontWeight: "700" }}>
                      {user.moneyEarn}
                    </span>
                  </span>
                </div>
              </div>
              <div style={{ marginTop: "40px" }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="standard-adornment-amount">
                    {translation["Enter amount"][trans]}
                  </InputLabel>
                  <Input
                    id="standard-adornment-amount"
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    value={this.state.payoutValue}
                    onChange={(e) => {
                      if (e.target.value <= user.moneyEarn)
                        this.setState({ payoutValue: e.target.value });
                      else this.setState({ payoutValue: user.moneyEarn });
                    }}
                    onKeyUp={(e) => {
                      if (e.keyCode === 13) {
                        this.submitPayout();
                        this.props._ionic.keyboard.hide();
                        window.blur();
                      }
                    }}
                    inputProps={{
                      pattern: "[0-9]*",
                      inputMode: "numeric",
                    }}
                  />
                </FormControl>
              </div>
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
                {translation["Receive payment from ASPF"][trans]}
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
                  this.setState({ step: 2 });
                }}
              >
                {translation["Cash Out"][trans]}
              </button>
            </div>
          </div>
        )}
        {this.state.step === 2 && (
          <div>
            <div style={{ height: "60px", padding: "10px 0" }}>
              <img
                src="/static/images/svg/blueback.svg"
                style={{
                  marginRight: "25px",
                  marginLeft: "10px",
                  width: "12px",
                }}
                onClick={() => {
                  this.setState({ step: 1 });
                }}
              />
              <span
                style={{
                  fontSize: "25px",
                  fontWeight: "700",
                  verticalAlign: "middle",
                }}
              >
                {translation["Cash Out"][trans]}
              </span>
            </div>
            <div
              style={{
                height: "calc(100vh - 130px)",
                boxShadow: "0 0 10px #e6e6e6",
                marginBottom: "10px",
              }}
              className="rb"
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "30px 15px",
                }}
              >
                <span className="info-1">{translation["Amount"][trans]}</span>{" "}
                <span className="info-2">${this.state.payoutValue}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "30px 15px",
                }}
              >
                <span className="info-1">{translation["Date"][trans]}</span>{" "}
                <span className="info-2">{Moment().format("DD/MM/YYYY")}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "30px 15px",
                }}
              >
                <span className="info-1">PayPal</span>{" "}
                <span className="info-2">{user.paypalEmail}</span>
              </div>
            </div>
            <div style={{ width: "100%", padding: "0 20px" }}>
              <button
                style={{ height: "50px", width: "100%" }}
                className="btn big-blue-btn"
                onClick={() => {
                  this.submitPayout();
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

export default withLayout(PaypalPayout);
