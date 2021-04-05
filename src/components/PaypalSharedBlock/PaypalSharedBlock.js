import React, { Component } from "react";

class PaypalSharedBlock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          whiteSpace: "nowrap",
        }}
      >
        <div style={{ width: "calc(100% - 100px)" }}>
          <span
            style={{
              fontSize: "13px",
              fontWeight: "700",
              color: "#585858",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "block",
            }}
          >
            {this.props.textA || ""}
          </span>
          <span
            style={{
              fontSize: "20px",
              fontWeight: "700",
              color: "#000",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "block",
            }}
          >
            {this.props.textB || ""}
          </span>
          <span
            style={{
              fontSize: "15px",
              fontWeight: "400",
              color: "#bababa",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "block",
            }}
          >
            {this.props.textC || ""}
          </span>
        </div>
        <div style={{ textAlign: "right", width: "100px" }}>
          <span
            style={{
              fontSize: "15px",
              fontWeight: "700",
              color: this.props.textD === "OnGoing" ? "#26bb5d" : "#f13131",
            }}
          >
            {this.props.textD || ""}
          </span>
          <br />
          <span>
            <span
              style={{
                fontSize: "15px",
                fontWeight: "700",
                color: "#000",
                position: "relative",
                top: "-5px",
                zIndex: "-1",
              }}
            >
              ${" "}
            </span>
            <span
              style={{ fontSize: "25px", fontWeight: "700", color: "#000" }}
            >
              {this.props.textE || ""}
            </span>
          </span>
        </div>
      </div>
    );
  }
}

export default PaypalSharedBlock;
