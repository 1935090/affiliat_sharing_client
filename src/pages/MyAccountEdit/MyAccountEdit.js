import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  FormControl,
  InputLabel,
  InputAdornment,
} from "@material-ui/core";

class MyAccountEdit extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div style={{ padding: "0 10px" }}>
        <div style={{ height: "60px", padding: "10px 0" }}>
          <Link to={`/my-account-detail`}>
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
              visibility: "hidden",
            }}
          >
            P
          </span>
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
                marginBottom: "40px",
              }}
            >
              Fill your infomation
            </p>
            <div>
              <FormControl fullWidth>
                <InputLabel htmlFor="standard-adornment-amount">
                  Enter your name
                </InputLabel>
                <Input
                  id="standard-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start"></InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div style={{ marginTop: "40px" }}>
              <FormControl fullWidth>
                <InputLabel htmlFor="standard-adornment-amount">
                  Enter your facebook ID
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
          <Link to={`/confirm-share-ads-detail-result`}>
            <button
              style={{ height: "50px", width: "100%" }}
              className="btn big-blue-btn"
            >
              Submit
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default MyAccountEdit;
