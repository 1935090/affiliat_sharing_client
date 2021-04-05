import React, { Component } from "react";
import { Link } from "react-router-dom";
import withLayout from "../../lib/withLayout";
import Moment from "moment";
const Axios = require("axios");

class Receipt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      globalState: this.props.getGlobalState(),
      openModal: false,
      useCredit: false,
      cardImage: {
        Visa: "full-color-800x450.jpg",
        MasterCard: "mc_vrt_opt_pos_73_3x.png",
        JCB: "pic_logo_01.gif",
        UnionPay: "1920px-UnionPay_logo.svg.png",
        "American Express": "amex_82052.png",
      },
      makeAnAd: null,
      receipt: null,
      //singleSharePrice: null,
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.location.state.orderId) this.getOrder();
  }
  getOrder = async () => {
    let globalState = this.props.getGlobalState();

    const result = await Axios({
      method: "post",
      url: this.props._setting.serverUrl + "/get-order-by-id",
      data: {
        email: globalState.user.email,
        password: globalState.user.password,
        orderId: this.props.location.state.orderId,
      },
    });
    if (result.status === 200 && result.data.type === "success") {
      this.setState({
        makeAnAd: result.data.message.adDetail,
        receipt: result.data.message,
      });
      /*delete globalState.makeAnAd;
      this.props.setGlobalState(globalState);
      await this.props.updateUser();
      this.props.history.push(`/confirm-share-ads-detail-result`);*/
    } else {
      alert("Failed.");
    }
  };

  render() {
    const makeAnAd = this.state.makeAnAd;
    const user = this.state.globalState.user;
    const translation = this.state.globalState.translation;
    const trans = this.state.globalState.trans;
    return (
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            top: 0,
            width: "100%",
            padding: "10px 20px",
            backgroundColor: "#2680eb",
            borderRadius: "0 0 5px 5px",
            zIndex: "999",
            height: "68px",
          }}
        >
          <div>
            <img
              style={{ width: "100px" }}
              src="/static/images/svg/ASPD_Logo_white.svg"
            />
          </div>
          <div style={{ color: "#fff", fontWeight: "bold", fontSize: "20px" }}>
            收據
          </div>
        </div>
        {makeAnAd && (
          <div style={{ padding: "0 10px" }}>
            <div
              style={{
                height: "calc(100vh - 150px)",
                boxShadow: "0 0 10px #e6e6e6",
                marginBottom: "10px",
                overflow: "scroll",
                marginTop: "10px",
              }}
              className="rb"
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "15px 15px",
                }}
              >
                <span className="info-1">你的支出</span>{" "}
                <span className="info-2">
                  $ {this.state.receipt.totalAmount}
                </span>
              </div>
              {makeAnAd.selectedPost && makeAnAd.selectedPost.attachments && (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "15px 15px",
                  }}
                >
                  <span className="info-1">Your Ad</span>{" "}
                  <span className="info-2">
                    <div
                      style={{
                        paddingBottom: "56%",
                        width: "80px",
                        backgroundPosition: "50%",
                        background: `url(${makeAnAd.selectedPost.attachments.data[0].media.image.src}) 50% 50% / cover`,
                        backgroundSize: "cover",
                        display: "inline-block",
                      }}
                    ></div>
                  </span>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "15px 15px",
                }}
              >
                <span className="info-1">{translation["Region"][trans]}</span>{" "}
                <span
                  className="info-2"
                  style={{ paddingLeft: "10px", textAlign: "right" }}
                >
                  {makeAnAd.countries.join(", ")}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "15px 15px",
                }}
              >
                <span className="info-1">
                  {translation["Target Gender"][trans]}
                </span>{" "}
                <span className="info-2">{makeAnAd.gender}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "15px 15px",
                }}
              >
                <span className="info-1">
                  {translation["Target Age"][trans]}
                </span>{" "}
                <span className="info-2">
                  {makeAnAd.age[0]}-{makeAnAd.age[1]}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "15px 15px",
                }}
              >
                <span className="info-1">Start day</span>{" "}
                <span className="info-2">
                  {Moment(makeAnAd.startDate).format("DD/MM/YYYY")}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "15px 15px",
                }}
              >
                <span className="info-1">End day</span>{" "}
                <span className="info-2">
                  {Moment(makeAnAd.endDate).format("DD/MM/YYYY")}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "15px 15px",
                }}
              >
                <span className="info-1">Expected impressions</span>{" "}
                <span className="info-2">
                  {Math.round(
                    (makeAnAd.budget * 10) / makeAnAd.singleSharePrice
                  )}
                </span>
              </div>

              <div style={{ borderTop: "1px solid #dfdfdf" }}>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "15px 15px",
                  }}
                >
                  <span className="info-1" style={{ fontSize: "16px" }}>
                    Payment method
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0px 15px 15px 15px",
                  }}
                >
                  <span className="info-1">
                    <img
                      src={`/static/images/${this.state.cardImage[user.stripeCustomer.brand]
                        }`}
                      style={{
                        height: "20px",
                      }}
                    />
                    **** {user.stripeCustomer.last4}
                  </span>
                  <span className="info-2">
                    ${this.state.receipt.totalAmount}
                  </span>
                </div>
              </div>
            </div>
            <div
              style={{ width: "100%", padding: "0 20px", position: "relative" }}
            >
              <button
                style={{ height: "50px", width: "100%" }}
                className="btn big-blue-btn"
                onClick={() => {
                  this.props.history.push(`/credit-card-account`);
                }}
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withLayout(Receipt);
