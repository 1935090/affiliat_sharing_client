import withLayout from "../../lib/withLayout";
import React, { Component } from "react";
import PaypalSharedBlock from "../../components/PaypalSharedBlock";
import { Drawer } from "@material-ui/core";
import { Link } from "react-router-dom";
import moment from "moment";
import NumberFormat from "react-number-format";
const Axios = require("axios");

class CreditCardAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      globalState: this.props.getGlobalState(),
      paymentData: null,
      cardImage: {
        Visa: "full-color-800x450.jpg",
        MasterCard: "mc_vrt_opt_pos_73_3x.png",
        JCB: "pic_logo_01.gif",
        UnionPay: "1920px-UnionPay_logo.svg.png",
        "American Express": "amex_82052.png",
      },
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getPaymentDetail();
  }

  deleteCard = async () => {
    let globalState = this.state.globalState;
    const result = await Axios({
      method: "post",
      url: this.props._setting.serverUrl + "/delete-card",
      data: {
        email: globalState.user.email,
        password: globalState.user.password,
      },
    });
    await this.props.updateUser();
    this.setState({ drawerOpen: false });
    //this.setState({ globalState: this.props.getGlobalState() });
  };

  getPaymentDetail = async () => {
    let globalState = this.state.globalState;
    if (
      globalState.user &&
      globalState.user.email &&
      globalState.user.password
    ) {
      const result = await Axios({
        method: "post",
        url: this.props._setting.serverUrl + "/get-order",
        data: {
          email: globalState.user.email,
          password: globalState.user.password,
        },
      });
      if (result.status === 200 && result.data.type === "success") {
        let today = [];
        let todayBefore = [];
        for (let i = 0; i < result.data.message.length; i++) {
          const order = result.data.message[i];
          if (
            moment(moment(order.createDate).format("YYYY-MM-DD")).diff(
              moment(moment().format("YYYY-MM-DD")),
              "days"
            ) === 0
          ) {
            today.push(result.data.message[i]);
          } else {
            todayBefore.push(result.data.message[i]);
          }
        }
        console.log({ today, todayBefore });
        this.setState({
          paymentData: {
            today,
            todayBefore,
          },
        });
      }
    }
  };

  render() {
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
            zIndex: "2",
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
                  this.props.history.push(`/add-ads`);
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
            <img
              src="/static/images/svg/moreblue.svg"
              style={{ float: "right", width: "36px" }}
              onClick={() => {
                this.setState({ drawerOpen: true });
              }}
            />
          </div>
          <div
            style={{
              boxShadow: "0 0 10px #e6e6e6",
              padding: "15px 15px 5px 15px",
              position: "relative",
              background:
                "url('/static/images/background@3x.png') center center no-repeat",
              backgroundSize: "cover",
              height: "180px",
              display: "flex",
              alignItems: "flex-end",
              marginTop: "10px",
              color: "#fff",
            }}
            className="rb"
            onClick={() => {
              if (
                !this.state.globalState.user ||
                !this.state.globalState.user.stripeCustomer
              ) {
                this.props.history.push(`/credit-card-change`);
              }
            }}
          >
            <img
              src="/static/images/Powered by Stripe - blurple.png"
              style={{
                width: "160px",
                background: "#fff",
                position: "absolute",
                top: "15px",
                borderRadius: "6px",
              }}
            />

            {this.state.globalState.user &&
              this.state.globalState.user.stripeCustomer &&
              this.state.globalState.user.stripeCustomer.brand ? (
                <div
                  style={{
                    position: "absolute",
                    top: "15px",
                    right: "15px",
                    padding: "5px",
                    backgroundColor: "#fff",
                    borderRadius: "6px",
                  }}
                >
                  <img
                    src={`/static/images/${this.state.cardImage[
                      this.state.globalState.user.stripeCustomer.brand
                      ]
                      }`}
                    style={{
                      height: "20px",
                    }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    position: "absolute",
                    top: "60px",
                    padding: "5px",
                    backgroundColor: "#fff",
                    borderRadius: "6px",
                  }}
                >
                  <img
                    src="/static/images/full-color-800x450.jpg"
                    style={{
                      height: "20px",
                      background: "#fff",
                    }}
                  />
                  <img
                    src="/static/images/mc_vrt_opt_pos_73_3x.png"
                    style={{
                      height: "20px",
                      background: "#fff",
                      marginLeft: "5px",
                    }}
                  />
                  <img
                    src="/static/images/pic_logo_01.gif"
                    style={{
                      height: "20px",
                      background: "#fff",
                      marginLeft: "5px",
                    }}
                  />
                  <img
                    src="/static/images/1920px-UnionPay_logo.svg.png"
                    style={{
                      height: "20px",
                      background: "#fff",
                      marginLeft: "5px",
                    }}
                  />
                  <img
                    src="/static/images/amex_82052.png"
                    style={{
                      height: "20px",
                      background: "#fff",
                      marginLeft: "5px",
                    }}
                  />
                </div>
              )}
            {this.state.globalState.user &&
              this.state.globalState.user.stripeCustomer && (
                <div>
                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: "300",
                      letterSpacing: "0.5px",
                      margin: 0,
                    }}
                  >
                    {this.state.globalState.user.email}
                  </p>
                  <p style={{ marginBottom: "10px" }}>
                    <span
                      style={{
                        fontSize: "22px",
                        fontWeight: "300",
                        wordSpacing: "5px",
                        marginRight: "5px",
                        position: "relative",
                        top: "3px",
                      }}
                    >
                      **** **** ****
                    </span>{" "}
                    <span style={{ fontSize: "22px", fontWeight: "300" }}>
                      {this.state.globalState.user.stripeCustomer.last4}
                    </span>
                  </p>
                </div>
              )}
            {(!this.state.globalState.user ||
              !this.state.globalState.user.stripeCustomer) && (
                <button
                  style={{
                    height: "50px",
                    width: "100%",
                    marginBottom: "10px",
                  }}
                  className="btn big-blue-btn-2"
                >
                  {translation["Add new card number"][trans]}
                </button>
              )}
            {/*this.state.globalState.user &&
              this.state.globalState.user.stripeCustomer && (
                <Link to={`/credit-card-payin`}>
                  <div
                    style={{
                      display: "inline-block",
                      position: "absolute",
                      bottom: "15px",
                      right: "15px",
                      backgroundColor: "#fff",
                      borderRadius: "100px",
                      padding: "15px 15px 15px 11px",
                    }}
                  >
                    <img src="/static/images/BUY@3x.png" />
                  </div>
                </Link>
                  )*/}
          </div>
        </div>
        <div
          style={{
            paddingTop: "270px",
            position: "fixed",
            width: "100%",
            backgroundColor: "#fff",
          }}
        >
          {this.state.globalState && this.state.globalState.user && (
            <div style={{ padding: "0px 15px 0 15px", fontWeight: "bold" }}>
              <p style={{ marginBottom: "0", fontSize: "24px" }}>
                廣告餘額
                <span
                  style={{
                    color: "#fff",
                    backgroundColor: "#2680eb",
                    borderRadius: "100px",
                    fontSize: "16px",
                    padding: "3px 12px",
                    position: "relative",
                    top: "-4px",
                    left: "2px",
                  }}
                >
                  $
                  <NumberFormat
                    thousandSeparator={true}
                    value={this.state.globalState.user.money}
                    displayType={"text"}
                  />
                </span>
              </p>
              <p>廣告餘額只可用於推廣，不能提取或退款。</p>
            </div>
          )}
        </div>
        <div style={{ paddingTop: "340px" }}></div>
        {this.state.paymentData && this.state.paymentData.today.length > 0 && (
          <div style={{ padding: "15px 15px 15px 15px" }}>
            <p
              style={{ borderBottom: "1px solid #ececec", marginBottom: "5px" }}
            >
              Today
            </p>
            {this.state.paymentData.today.map((order, key) => (
              <div style={{ padding: "5px 0" }} key={key}>
                <Link
                  to={{
                    pathname: "/receipt",
                    state: {
                      orderId: order._id,
                    },
                  }}
                >
                  <PaypalSharedBlock
                    textA={moment(order.createDate).format("DD/MM/YYYY")}
                    textB={
                      order.stripeCharge.source.brand +
                      "...." +
                      order.stripeCharge.source.last4
                    }
                    textD={order.status}
                    textE={order.totalAmount}
                  />
                </Link>
              </div>
            ))}
          </div>
        )}
        {this.state.paymentData &&
          this.state.paymentData.todayBefore.length > 0 && (
            <div
              style={
                this.state.paymentData &&
                  this.state.paymentData.today.length > 0
                  ? { padding: "15px 15px 15px 15px" }
                  : { padding: "15px 15px 15px 15px" }
              }
            >
              <p
                style={{
                  borderBottom: "1px solid #ececec",
                  marginBottom: "5px",
                }}
              >
                Before today
              </p>
              {this.state.paymentData.todayBefore.map((order, key) => (
                <div style={{ padding: "5px 0" }} key={key}>
                  <Link
                    to={{
                      pathname: "/receipt",
                      state: {
                        orderId: order._id,
                      },
                    }}
                  >
                    <PaypalSharedBlock
                      textA={moment(order.createDate).format("DD/MM/YYYY")}
                      textB={
                        order.stripeCharge.source.brand +
                        "...." +
                        order.stripeCharge.source.last4
                      }
                      textD={order.status}
                      textE={order.totalAmount}
                    />
                  </Link>
                </div>
              ))}
            </div>
          )}
        {((this.state.paymentData &&
          this.state.paymentData.todayBefore.length === 0 &&
          this.state.paymentData.today.length === 0) ||
          !this.state.paymentData) && (
            <div style={{ padding: "15px 15px 15px 15px" }}>
              <p
                style={{
                  borderBottom: "1px solid #ececec",
                  marginBottom: "5px",
                }}
              >
                No payin history
            </p>
            </div>
          )}
        <Drawer
          anchor="bottom"
          open={this.state.drawerOpen}
          onClose={() => {
            this.setState({ drawerOpen: false });
          }}
          classes={{ paper: "drawer-custom" }}
        >
          <div style={{ padding: "20px" }} className="rb">
            {/*this.state.globalState.user &&
              this.state.globalState.user.stripeCustomer && (
                <Link to={`/credit-card-payin`}>
                  <div
                    style={{ marginBottom: "30px" }}
                    className="bottom-menu-block"
                  >
                    <img
                      src="/static/images/Money @3x.png"
                      style={{ marginRight: "17px" }}
                    />{" "}
                    Pay-In
                  </div>
                </Link>
              )*/}
            <Link to={`/credit-card-change`}>
              <div
                style={{
                  marginBottom:
                    this.state.globalState.user &&
                      this.state.globalState.user.stripeCustomer
                      ? "30px"
                      : "0px",
                }}
                className="bottom-menu-block"
              >
                <img
                  src="/static/images/svg/reload.svg"
                  style={{ marginRight: "20px", width: "23px" }}
                />{" "}
                {this.state.globalState.user &&
                  this.state.globalState.user.stripeCustomer
                  ? translation["Change card number"][trans]
                  : translation["Add new card number"][trans]}
              </div>
            </Link>
            {this.state.globalState.user &&
              this.state.globalState.user.stripeCustomer && (
                <div
                  style={{ marginBottom: "10px" }}
                  className="bottom-menu-block"
                  onClick={() => {
                    this.deleteCard();
                  }}
                >
                  <img
                    src="/static/images/svg/wrong.svg"
                    style={{ marginRight: "20px", width: "23px" }}
                  />{" "}
                  {translation["Delete card number"][trans]}
                </div>
              )}
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withLayout(CreditCardAccount);
