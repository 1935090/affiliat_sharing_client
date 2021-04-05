import React, { Component } from "react";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";

class ConfirmShareAdsDetail extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div style={{ padding: "0 10px" }}>
        <div style={{ height: "60px", padding: "10px 0" }}>
          <Link to={`/share-ads-detail`}>
            <img
              src="/static/images/svg/blueback.svg"
              style={{ marginRight: "25px", marginLeft: "10px", width: "12px" }}
            />
          </Link>
          <span
            style={{
              fontSize: "25px",
              fontWeight: "700",
              verticalAlign: "middle",
            }}
          >
            Confirm
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
            <span className="info-1">Price</span>{" "}
            <span className="info-2">$30</span>
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
            <span className="info-1">Duration</span>{" "}
            <span className="info-2">7 Days</span>
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
            <span className="info-1">Types</span>{" "}
            <span className="info-2">Facebook</span>
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
            <span className="info-1">Location</span>{" "}
            <span className="info-2">Hong Kong</span>
          </div>
        </div>
        <div style={{ width: "100%", padding: "0 20px" }}>
          <Link to={`/confirm-share-ads-detail-result`}>
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

export default ConfirmShareAdsDetail;
