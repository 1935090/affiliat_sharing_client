import React, { Component } from "react";
import { Link } from "react-router-dom";
import withLayout from "../../lib/withLayout";

class ShareAdsResultFail extends Component {
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
            <img src="/static/images/failed.png" style={{ width: "60%" }} />
            <br />
            <p
              style={{
                marginTop: "20px",
                fontWeight: "700",
                fontSize: "25px",
              }}
            >
              {
                translation[
                  "Sorry! Your sharing is not successful, please check the items and share again!"
                ][trans]
              }
            </p>
            <div
              style={{
                width: "60%",
                display: "inline-block",
                color: "8a8a8a",
                fontSize: "15px",
              }}
            >
              {translation["- Post share must be public"][trans]}
              <br />
              {translation["- Do not add messages"][trans]}
              <br />
              - Facebook總朋友數量需100或以上
              <br />- Post & Live廣告每天只可分享10個(10分鐘一個)(共20個每日)
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

export default withLayout(ShareAdsResultFail);
