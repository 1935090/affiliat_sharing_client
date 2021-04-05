import React, { Component } from "react";
import { Link } from "react-router-dom";
import withLayout from "../../lib/withLayout";

class ShareAdsResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      globalState: this.props.getGlobalState(),
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    const translation = this.state.globalState.translation;
    const trans = this.state.globalState.trans;
    return (
      <div>
        <div
          style={{
            height: "calc(100vh - 70px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "10px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <img src="/static/images/svg/OK.svg" style={{ width: "60%" }} />
            <br />
            {this.props.location.state.money && (
              <p
                style={{
                  fontSize: "25px",
                  color: "fdad44",
                  marginTop: "20px",
                  fontWeight: "700",
                }}
              >
                + HKD ${this.props.location.state.money}
              </p>
            )}
            <p
              style={{
                marginTop: "20px",
                fontWeight: "700",
                fontSize: "25px",
              }}
            >
              {translation["You've successfully shared a post!"][trans]}
            </p>
            <div
              style={{
                width: "60%",
                display: "inline-block",
                color: "8a8a8a",
                fontSize: "15px",
              }}
            >
              {
                translation[
                  "Please keep your post on Facebook for 7 days. If the post stays on Facebook for less than 7 days, you will NOT receive any reward."
                ][trans]
              }
            </div>
          </div>
        </div>
        <div style={{ width: "100%", padding: "0 30px" }}>
          <Link to={`/home`}>
            <button
              style={{ height: "50px", width: "100%" }}
              className="btn big-blue-btn"
            >
              {translation["Back to home page"][trans]}
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default withLayout(ShareAdsResult);
