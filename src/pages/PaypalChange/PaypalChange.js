import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  FormControl,
  InputLabel,
  InputAdornment,
} from "@material-ui/core";

class PaypalChange extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div style={{ padding: "0 10px" }}>
        <div style={{ height: "60px", padding: "10px 0" }}>
          <img
            src="/static/images/svg/blueback.svg"
            style={{
              marginRight: "25px",
              marginLeft: "10px",
              width: "12px",
            }}
          />
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
              padding: "20px 15px",
            }}
          >
            <p
              style={{
                fontSize: "25px",
                fontWeight: "700",
                marginBottom: "40px",
              }}
            >
              Fill your PayPal Email
            </p>
            <div style={{ marginBottom: "40px" }}>
              <FormControl fullWidth>
                <InputLabel htmlFor="standard-adornment-amount">
                  Enter your email
                </InputLabel>
                <Input
                  id="standard-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start"></InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div>
              <FormControl fullWidth>
                <InputLabel htmlFor="standard-adornment-amount">
                  Confirm your email
                </InputLabel>
                <Input
                  id="standard-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start"></InputAdornment>
                  }
                />
              </FormControl>
            </div>
          </div>
        </div>
        <div style={{ width: "100%", padding: "0 20px" }}>
          <Link to={`/paypal-account`}>
            <button
              style={{ height: "50px", width: "100%" }}
              className="btn big-blue-btn"
            >
              Confirm
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default PaypalChange;
