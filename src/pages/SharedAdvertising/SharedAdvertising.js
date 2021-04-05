import React, { Component } from "react";
import { Link } from "react-router-dom";
import withLayout from "../../lib/withLayout";
import Moment from "moment";
import NumberFormat from "react-number-format";
const Axios = require("axios");

class SharedAdvertising extends Component {
  constructor(props) {
    super(props);
    this.state = {
      globalState: this.props.getGlobalState(),
      sharedAds: null,
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.getSharedAds();
  }
  getSharedAds = async () => {
    let globalState = this.state.globalState;
    const result = await Axios({
      method: "post",
      url: this.props._setting.serverUrl + "/get-my-shared-ads",
      data: {
        email: globalState.user.email,
        password: globalState.user.password,
      },
    });
    if (result.status === 200 && result.data.type === "success") {
      console.log(result.data.message);
      this.setState({ sharedAds: result.data.message });
    }
  };
  render() {
    const sharedAds = this.state.sharedAds;
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
            onClick={() => {
              this.props.history.push("/my-account");
            }}
          />
          <span
            style={{
              fontSize: "25px",
              fontWeight: "700",
              verticalAlign: "middle",
            }}
          >
            Shared Advertising
          </span>
        </div>
        {sharedAds &&
          sharedAds.length > 0 &&
          sharedAds.map((ads, key) => (
            <div
              style={{
                marginBottom: "10px",
                padding: "10px 15px",
                backgroundColor: "#fff",
              }}
              className="rb"
              key={key}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ maxWidth: "70%" }}>
                  <span
                    style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: "#000",
                    }}
                  >
                    {ads.ad.adsType === "Facebook Post" &&
                      ads.ad.selectedPost.from.name}
                    {ads.ad.adsType === "Facebook Like" &&
                      ads.ad.fbPageDetail.name}
                  </span>
                  <br />
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: "400",
                      color: "#bababa",
                    }}
                  >
                    {ads.ad.adsType === "Facebook Post" &&
                      ads.ad.selectedPost.message}
                  </span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span>
                    <span
                      style={{
                        fontSize: "15px",
                        fontWeight: "700",
                        color: "#000",
                        position: "relative",
                        top: "-5px",
                      }}
                    >
                      ${" "}
                    </span>
                    <span
                      style={{
                        fontSize: "25px",
                        fontWeight: "700",
                        color: "#000",
                      }}
                    >
                      {ads.moneyEarn}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default withLayout(SharedAdvertising);
