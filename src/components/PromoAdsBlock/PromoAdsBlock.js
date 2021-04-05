import React, { Component } from "react";
import { Drawer } from "@material-ui/core";
import { Link } from "react-router-dom";
import Moment from "moment";
import NumberFormat from "react-number-format";
const Axios = require("axios");

class PromoAdsBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      globalState: this.props,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.ads) {
      let ads = this.props.ads;
      delete ads.globalState;
      this.setState({ ...ads });
    }
  }

  stopAds = async () => {
    console.log(this.state);
    let globalState = this.state.globalState;
    const result = await Axios({
      method: "post",
      url: this.props._setting.serverUrl + "/stop-an-ad",
      data: {
        email: globalState.user.email,
        password: globalState.user.password,
        adId: this.state._id,
      },
    });
    if (result.status === 200 && result.data.type === "success") {
      this.setState({ status: result.data.message, drawerOpen: false });
    } else {
      alert("Change state failed");
    }
    return null;
  };

  render() {
    let ads = this.state;
    if (ads.globalState.makeAnAd && ads.globalState.makeAnAd.globalState)
      delete ads.globalState.makeAnAd.globalState;
    let ads_copy = JSON.parse(JSON.stringify(this.state));
    console.log({ copy: ads_copy });
    //delete ads_copy.globalState;
    const translation = this.props.translation;
    const trans = this.props.trans;

    return (
      <div>
        {ads && ads.budget && (
          <div>
            <Link
              to={{
                pathname: "/promo-ad-result",
                state: {
                  ads: ads_copy,
                },
              }}
            >
              <div
                style={{
                  position: "relative",
                  backgroundImage: `url('${ads.adsType === "Facebook Like"
                      ? ads.fbPageDetail.cover.source
                      : ads.selectedPost.attachments.data[0].media.image.src
                    }')`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  color: "#fff",
                }}
                className="rb"
              >
                <div
                  style={{
                    backgroundColor: "rgba(0,0,0,.5)",
                    padding: "20px",
                  }}
                  className="rb"
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "20px",
                      right: "20px",
                      padding: "5px 10px",
                      borderRadius: "100px",
                      backgroundColor: "#fff",
                      fontSize: "15px",
                      color: ads.status === "onGoing" ? "#31BF65" : "#e41111",
                    }}
                  >
                    {ads.status === "onGoing"
                      ? translation["On Going"][trans]
                      : translation["Stopped"][trans]}
                  </div>
                  <p style={{ fontSize: "20px", fontWeight: "700", margin: 0 }}>
                    {ads.adsType === "Facebook Like"
                      ? ads.fbPageDetail.name
                      : ads.selectedPost.from.name}
                  </p>
                  {/*<p style={{ fontSize: "20px", margin: 0 }}>Post Name Here</p>*/}
                  <p
                    style={{
                      marginTop: "40px",
                      fontSize: "15px",
                      borderBottom: "1px solid #fff",
                      paddingBottom: "5px",
                      marginBottom: "5px",
                    }}
                  >
                    {ads.adsType}
                  </p>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "40%" }}>
                      <p style={{ fontSize: "13px", marginBottom: "5px" }}>
                        {translation["Your sharers"][trans]}
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "15px",
                          fontWeight: "700",
                        }}
                      >
                        {ads.totalShare}
                      </p>
                    </div>
                    <div style={{ width: "40%" }}>
                      <p style={{ fontSize: "13px", marginBottom: "5px" }}>
                        {translation["Time"][trans]}
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "15px",
                          fontWeight: "700",
                        }}
                      >
                        {Moment(ads.createDate).format("DD/MM/YYYY")}
                      </p>
                    </div>
                    <div style={{ width: "20%" }}>
                      <p style={{ fontSize: "13px", marginBottom: "5px" }}>
                        {translation["Your budget"][trans]}
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "15px",
                          fontWeight: "700",
                        }}
                      >
                        $ {ads.budgetRemain}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <Drawer
              anchor="bottom"
              open={this.state.drawerOpen}
              onClose={() => {
                this.setState({ drawerOpen: false });
              }}
              classes={{ paper: "drawer-custom" }}
            >
              <div style={{ padding: "20px" }} className="rb">
                <Link
                  to={{
                    pathname: "/make-an-ad",
                    state: {
                      makeAnAd: ads,
                      isUpdate: false,
                    },
                  }}
                >
                  <div
                    style={{ marginBottom: "30px" }}
                    className="bottom-menu-block"
                  >
                    <img
                      src="/static/images/Ads black@3x.png"
                      style={{ marginRight: "10px" }}
                    />{" "}
                    {translation["Promote again"][trans]}
                  </div>
                </Link>
                <Link
                  to={{
                    pathname: "/promo-ad-result",
                    state: {
                      ads,
                    },
                  }}
                >
                  <div
                    style={{ marginBottom: "30px" }}
                    className="bottom-menu-block"
                  >
                    <img
                      src="/static/images/Payout history@3x.png"
                      style={{ marginRight: "14px" }}
                    />{" "}
                    {translation["Result"][trans]}
                  </div>
                </Link>
                <div
                  style={{ marginBottom: "30px" }}
                  className="bottom-menu-block"
                >
                  <img
                    src="/static/images/edit@3x.png"
                    style={{ marginRight: "11px" }}
                  />{" "}
                  Edit
                </div>
                <div
                  style={{ marginBottom: "10px" }}
                  className="bottom-menu-block"
                  onClick={() => {
                    this.stopAds();
                  }}
                >
                  <img
                    src={
                      this.state.status === "onGoing"
                        ? "/static/images/Stop@3x.png"
                        : "/static/images/svg/share.svg"
                    }
                    style={{ marginRight: "18px", width: "21px" }}
                  />{" "}
                  {this.state.status === "onGoing"
                    ? translation["Stop Ad"][trans]
                    : translation["Start Ad"][trans]}
                </div>
              </div>
            </Drawer>
          </div>
        )}
      </div>
    );
  }
}

export default PromoAdsBlock;
