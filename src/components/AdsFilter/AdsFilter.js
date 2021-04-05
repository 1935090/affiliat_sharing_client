import React, { Component } from "react";
import { Link } from "react-router-dom";

class AdsFilter extends Component {
  render() {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: "10px",
        }}
      >
        <div style={{ width: "calc(100% - 45px)", position: "relative" }}>
          <img
            src="/static/images/Search@3x.png"
            style={{ position: "absolute", left: "5px", top: "7px" }}
          />
          <input
            style={{
              height: "35px",
              width: "100%",
              backgroundColor: "#eeeeee",
              border: "0",
              paddingLeft: "40px",
            }}
            placeholder="Search"
            className="input-cus-1 rb"
          />
        </div>
        <div>
          <Link to={`/ads-list-filter`}>
            <img
              style={{ maxWidth: "35px" }}
              src="/static/images/filter@3x.png"
            />
          </Link>
        </div>
      </div>
    );
  }
}

export default AdsFilter;
