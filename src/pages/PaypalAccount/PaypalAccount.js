import React, { Component } from "react";
import PaypalSharedBlock from "../../components/PaypalSharedBlock";
import { Drawer } from "@material-ui/core";
import { Link } from "react-router-dom";
import withLayout from "../../lib/withLayout";
import Moment from "moment";
import NumberFormat from "react-number-format";
const Axios = require("axios");

class PaypalAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
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
    const user = this.state.globalState.user;
    const sharedAds = this.state.sharedAds;
    const translation = this.state.globalState.translation;
    const trans = this.state.globalState.trans;
    return (
      <div>
        <div
          style={{
            position: "fixed",
            width: "100%",
            padding: "0 15px 15px 15px",
            backgroundColor: "#fff",
          }}
        >
          <div style={{ height: "60px", padding: "10px 0" }}>
            <span
              onClick={() => {
                if (
                  this.props.location.state &&
                  this.props.location.state.back
                ) {
                  this.props.history.push(this.props.location.state.back);
                } else {
                  this.props.history.push(`/home`);
                }
              }}
            >
              <img
                src="/static/images/svg/blueback.svg"
                style={{
                  marginRight: "10px",
                  marginLeft: "10px",
                  width: "12px",
                }}
              />
              <img
                src="/static/images/svg/Scroll Group 4.svg"
                style={{ width: "130px" }}
              />
            </span>
            {/*<img
              src="/static/images/More@3x.png"
              style={{ float: "right" }}
              onClick={() => {
                this.setState({ drawerOpen: true });
              }}
            />*/}
            {user.paypalEmail && (
              <span
                style={{
                  color: "#fff",
                  padding: "1px 10px",
                  backgroundColor: "#2680eb",
                  fontSize: "18px",
                  float: "right",
                  marginTop: "5px",
                  borderRadius: "100px",
                }}
                onClick={() => {
                  if (user.moneyEarn > 0) {
                    this.props.history.push("/paypal-payout");
                  } else {
                    alert("No money earned to payout.");
                  }
                  //this.props.history.push("/paypal-payout");
                }}
              >
                {/*<img
                    src="/static/images/Payout@3x.png"
                    style={{ marginRight: "20px" }}
                  />*/}
                {translation["Cash Out"][trans]}
              </span>
            )}
            {/*!user.paypalEmail && (
              <Link to={`/paypal-email`}>
                {<div className="bottom-menu-block">
                  <img
                    src="/static/images/Change Paypal@3x.png"
                    style={{ marginRight: "25px" }}
                  />{" "}
                  Connect with PayPal
            </div>}
                <span
                  style={{
                    color: "#000",
                    fontSize: "18px",
                    float: "right",
                    marginTop: "5px",
                  }}
                >
                  {translation["Connect PayPal"][trans]}
                </span>
              </Link>
            )*/}
          </div>
          <div
            style={{
              boxShadow: "0 0 10px #e6e6e6",
              padding: "15px 15px 5px 15px",
              position: "relative",
              background:
                "url('/static/images/background@3x.png') center center no-repeat",
              backgroundSize: "cover",
              color: "#fff",
            }}
            className="rb"
          >
            <img
              src="/static/images/Paypal-Logo.png"
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                width: "100px",
                backgroundColor: "#fff",
                borderRadius: "5px",
              }}
            />
            {user.paypalEmail && (
              <img
                src="/static/images/svg/payoutwhite.svg"
                style={{
                  position: "absolute",
                  bottom: "15px",
                  right: "15px",
                  width: "53px",
                }}
                onClick={() => {
                  if (user.moneyEarn > 0) {
                    this.props.history.push("/paypal-payout");
                  } else {
                    alert("No money earned to payout.");
                  }
                }}
              />
            )}
            <p style={{ fontSize: "20px", fontWeight: "700", margin: 0 }}>
              {translation["Your balance is"][trans]}
            </p>
            <p
              style={{
                fontSize: "25px",
                fontWeight: "700",
                margin: 0,
              }}
            >
              ${" "}
              <NumberFormat
                thousandSeparator={true}
                value={user.moneyEarn}
                displayType={"text"}
              />
            </p>
            {user.paypalEmail && (
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "400",
                  margin: "10px 0 20px 0",
                }}
              >
                {user.paypalEmail}
              </p>
            )}
            {!user.paypalEmail && (
              <Link
                to={{
                  pathname: "/paypal-email",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    color: "#fff",
                    backgroundColor: "#005dcb",
                    borderRadius: "10px",
                    textAlign: "center",
                    padding: "10px 0",
                    marginBottom: "15px",
                  }}
                >
                  {translation["Connect PayPal"][trans]}
                </div>
              </Link>
            )}
            <p
              style={{
                borderTop: "1px solid #fff",
                marginBottom: "0",
                fontSize: "8px",
                paddingTop: "5px",
                maxWidth: "95%",
              }}
            >
              {
                translation["You will receive pending funds upon request"][
                trans
                ]
              }
            </p>
          </div>
        </div>
        <div style={{ padding: "250px 15px 15px 15px" }}>
          <p
            style={{
              borderBottom: "1px solid #ececec",
              marginBottom: "5px",
              color: "#bababa",
            }}
          >
            {translation["Recently"][trans]}
          </p>
          {sharedAds &&
            sharedAds.length > 0 &&
            sharedAds.map((ads, key) => (
              <div style={{ padding: "5px 0" }} key={key}>
                {console.log(ads)}
                <PaypalSharedBlock
                  textA={Moment(ads.createDate).format("DD/MM/YYYY")}
                  textB={
                    ads.ad.adsType === "Facebook Post"
                      ? ads.ad.selectedPost.from.name
                      : ads.ad.adsType === "Facebook Like"
                        ? ads.ad.fbPageDetail.name
                        : ""
                  }
                  textC={
                    ads.ad.adsType === "Facebook Post"
                      ? ads.ad.selectedPost.message
                      : ""
                  }
                  textD={ads.status}
                  textE={ads.moneyEarn}
                />
              </div>
            ))}
        </div>
        {/*<div style={{ padding: "15px 15px 15px 15px" }}>
          <p
            style={{
              borderBottom: "1px solid #ececec",
              marginBottom: "5px",
              color: "#bababa",
            }}
          >
            Last week
          </p>
          </div>*/}
        <Drawer
          anchor="bottom"
          open={this.state.drawerOpen}
          onClose={() => {
            this.setState({ drawerOpen: false });
          }}
          classes={{ paper: "drawer-custom" }}
        >
          <div style={{ padding: "20px" }} className="rb">
            {user.paypalEmail && (
              <Link to={`/paypal-payout`}>
                <div className="bottom-menu-block">
                  <img
                    src="/static/images/Payout@3x.png"
                    style={{ marginRight: "20px" }}
                  />{" "}
                  {translation["Cash Out"][trans]}
                </div>
              </Link>
            )}
            {!user.paypalEmail && (
              <Link to={`/paypal-email`}>
                <div className="bottom-menu-block">
                  <img
                    src="/static/images/Change Paypal@3x.png"
                    style={{ marginRight: "25px" }}
                  />{" "}
                  {translation["Connect PayPal"][trans]}
                </div>
              </Link>
            )}
            {/*
              <div
                style={{ marginBottom: "10px" }}
                className="bottom-menu-block"
              >
                <img
                  src="/static/images/delete@3x.png"
                  style={{ marginRight: "28px" }}
                />{" "}
                Delete Paypal
              </div>
              */}
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withLayout(PaypalAccount);
