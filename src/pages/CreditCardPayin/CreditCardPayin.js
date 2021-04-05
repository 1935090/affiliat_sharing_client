import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  FormControl,
  InputLabel,
  InputAdornment,
} from "@material-ui/core";
import withLayout from "../../lib/withLayout";
import moment from "moment";
import NumberFormat from "react-number-format";
const Axios = require("axios");

class CreditCardPayin extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      totalAmount: "",
      globalState: this.props.getGlobalState(),
    };
  }

  next = async () => {
    if (this.state.totalAmount) {
      let globalState = this.state.globalState;
      const result = await Axios({
        method: "post",
        url: this.props._setting.serverUrl + "/submit-payment",
        data: {
          totalAmount: this.state.totalAmount,
          payment_type: "storedCreditCard",
          stripe_charge: true,
          email: globalState.user.email,
          password: globalState.user.password,
        },
      });
      if (result.status === 200 && result.data.type === "success") {
        this.props.updateUser();
        this.props.history.push(`/confirm-share-ads-detail-result`);
      } else {
        alert(result.data.message);
      }
    } else {
      alert("Please input all required fields");
    }
  };

  render() {
    const translation = this.state.globalState.translation;
    const trans = this.state.globalState.trans;
    return (
      <div style={{ padding: "0 10px" }}>
        {this.state.step === 1 && (
          <div>
            <div style={{ height: "60px", padding: "10px 0" }}>
              <Link to={`/credit-card-account`}>
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
                Payin
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
              <div style={{ marginTop: "10px" }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="standard-adornment-amount">
                    Enter your money
                  </InputLabel>
                  <Input
                    id="standard-adornment-amount"
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    onChange={(e) => {
                      this.setState({ totalAmount: e.target.value });
                    }}
                    value={this.state.totalAmount}
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
                Pay to ASPF
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
                Payin Detail
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
                Payin
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
                <span className="info-2">${this.state.totalAmount}</span>
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
                <span className="info-2">{moment().format("DD/MM/YYYY")}</span>
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
                <span className="info-1">Payment Type</span>{" "}
                <span className="info-2">Credit Card</span>
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
                <span className="info-1">Card</span>{" "}
                <span className="info-2">
                  {this.state.globalState.user.stripeCustomer.brand} ...
                  {this.state.globalState.user.stripeCustomer.last4}
                </span>
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
                {translation["Confirm"][trans]}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withLayout(CreditCardPayin);
