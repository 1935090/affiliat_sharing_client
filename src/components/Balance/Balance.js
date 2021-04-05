import React, { Component } from "react";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";

class Balance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      globalState: null,
    };
  }

  render() {
    const translation = this.props.translation;
    const trans = this.props.trans;
    return (
      <div>
        {this.props.user ? (
          <p
            style={{
              color: "#fff",
              margin: "0",
              fontSize: "20px",
              fontWeight: "400",
              lineHeight: "1.2",
              textAlign: "right",
            }}
          >
            <span style={{ fontWeight: "700" }}>
              {" "}
              {translation["BALANCE"][trans]}
            </span>
            <br />
            <span
              style={{
                padding: "1px 10px 1px 15px",
                backgroundColor: "#fff",
                display: "inline-block",
                color: "#2680eb",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "10px",
                position: "relative",
                right: "-5px",
              }}
            >
              ${" "}
              <NumberFormat
                thousandSeparator={true}
                value={this.props.money}
                displayType={"text"}
              />{" "}
              <span
                style={{
                  fontFamily: "monospace",
                  position: "relative",
                  top: "-2px",
                  fontSize: "10px",
                }}
              >
                >
              </span>
            </span>
          </p>
        ) : (
          <div>
            <Link to={`/login`}>
              <span style={{ color: "#fff" }}>
                {" "}
                {translation["Login"][trans]}
              </span>
            </Link>{" "}
            <span style={{ color: "#fff" }}>/</span>{" "}
            <Link to={`/login`}>
              <span style={{ color: "#fff" }}>
                {" "}
                {translation["Register"][trans]}
              </span>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default Balance;
