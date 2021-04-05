import React, { Component } from "react";
import { Link } from "react-router-dom";
import withLayout from "../../lib/withLayout";
import Moment from "moment";
import Modal from "react-modal";
import {
  Input,
  FormControl,
  InputLabel,
  InputAdornment,
  NativeSelect,
  Slider,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  TextField,
  Checkbox,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import NumberFormat from "react-number-format";
const Axios = require("axios");

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: 0,
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#2680EB",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#2680EB",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

class MakeAnAdConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      globalState: this.props.getGlobalState(),
      openModal: false,
      useCredit: false,
      useMoneyEarn: false,
      cardImage: {
        Visa: "full-color-800x450.jpg",
        MasterCard: "mc_vrt_opt_pos_73_3x.png",
        JCB: "pic_logo_01.gif",
        UnionPay: "1920px-UnionPay_logo.svg.png",
        "American Express": "amex_82052.png",
      },
      //singleSharePrice: null,
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    //this.getPrice();
  }
  confirmMakeAnAd = async () => {
    await this.props.updateUser();
    let globalState = this.props.getGlobalState();

    const result = await Axios({
      method: "post",
      url: this.props._setting.serverUrl + "/make-an-ad",
      data: {
        email: globalState.user.email,
        password: globalState.user.password,
        adDetail: globalState.makeAnAd,
        useCredit: this.state.useCredit,
        useMoneyEarn: this.state.useMoneyEarn,
      },
    });
    if (result.status === 200 && result.data.type === "success") {
      delete globalState.makeAnAd;
      this.props.setGlobalState(globalState);
      await this.props.updateUser();
      this.props.history.push(`/confirm-share-ads-detail-result`);
    } else {
      alert("Failed.");
    }
  };

  checkMoney = async () => {
    await this.props.updateUser();
    let globalState = this.props.getGlobalState();
    const makeAnAd = globalState.makeAnAd;
    this.confirmMakeAnAd();
    /*if (globalState.user.money < makeAnAd.budget) {
      this.setState({ openModal: true });
    } else {
      this.confirmMakeAnAd({ useCredit: true });
    }*/
  };

  /*getPrice = async () => {
    let globalState = this.state.globalState;
    const result = await Axios({
      method: "post",
      url: this.props._setting.serverUrl + "/get-make-an-ad-impression",
      data: {
        email: globalState.user.email,
        password: globalState.user.password,
        adDetail: globalState.makeAnAd,
      },
    });
    if (result.status === 200 && result.data.type === "success") {
      //this.props.history.push(`/confirm-share-ads-detail-result`);
      //console.log(result.data.message);
      this.setState({ singleSharePrice: result.data.message });
    } else {
      //alert("Failed.");
    }
  };*/

  render() {
    const makeAnAd = this.state.globalState.makeAnAd;
    const user = this.state.globalState.user;
    const translation = this.state.globalState.translation;
    const trans = this.state.globalState.trans;
    return (
      <div style={{ padding: "0 10px" }}>
        <div style={{ height: "60px", padding: "10px 0" }}>
          <Link
            to={{
              pathname: "/make-an-ad",
              state: {
                loadPrevious: true,
              },
            }}
          >
            <img
              src="/static/images/svg/blueback.svg"
              style={{
                marginRight: "25px",
                marginLeft: "10px",
                width: "12px",
              }}
            />
          </Link>
          <span
            style={{
              fontSize: "25px",
              fontWeight: "700",
              verticalAlign: "middle",
            }}
          >
            {translation["Confirm"][trans]}
          </span>
        </div>
        <div
          style={{
            height: "calc(100vh - 130px)",
            boxShadow: "0 0 10px #e6e6e6",
            marginBottom: "10px",
            overflow: "scroll",
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
            <span className="info-1">{translation["Your budget"][trans]}</span>{" "}
            <span className="info-2">
              ${" "}
              <NumberFormat
                thousandSeparator={true}
                value={makeAnAd.budget}
                displayType={"text"}
              />
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
            <span className="info-1">{translation["Target Age"][trans]}</span>{" "}
            <span className="info-2">
              {makeAnAd.age[0]}-{makeAnAd.age[1]}
            </span>
          </div>
          {/*<div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 15px",
            }}
          >
            <span className="info-1">friends range</span>{" "}
            <span className="info-2">500-1000</span>
          </div>*/}
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
          {makeAnAd.singleSharePrice != 0 && (
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
                <NumberFormat
                  thousandSeparator={true}
                  value={Math.round(
                    (makeAnAd.budget * 10) / makeAnAd.singleSharePrice
                  )}
                  displayType={"text"}
                />
              </span>
            </div>
          )}

          {((user && user.stripeCustomer && user.stripeCustomer.id) ||
            user.money > makeAnAd.budget) && (
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
                    $
                  <NumberFormat
                      thousandSeparator={true}
                      value={
                        makeAnAd.oldBudget
                          ? parseInt(
                            (makeAnAd.budget - makeAnAd.oldBudget) * 100
                          ) / 100
                          : makeAnAd.budget
                      }
                      displayType={"text"}
                    />
                  </span>
                </div>
                <div style={{ padding: "0px 15px 15px 15px", fontSize: "10px" }}>
                  如您中途停止/取消廣告，剩下的金額將會撥入”廣告餘額”，可在下次推廣時使用。
              </div>
                {user.money > 0 && (
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
                      使用廣告餘額支付 $
                    <NumberFormat
                        thousandSeparator={true}
                        value={user.money}
                        displayType={"text"}
                      />
                    </span>
                    <span className="info-2">
                      <FormControlLabel
                        classes={{ root: "m-0" }}
                        control={
                          <IOSSwitch
                            checked={Boolean(this.state.useCredit)}
                            onChange={() => {
                              this.setState({
                                useCredit: !this.state.useCredit,
                              });
                            }}
                            name="checkedA"
                          />
                        }
                      />
                    </span>
                  </div>
                )}
                {user.moneyEarn > 0 && (
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
                      使用餘額支付 $
                    <NumberFormat
                        thousandSeparator={true}
                        value={user.moneyEarn}
                        displayType={"text"}
                      />
                    </span>
                    <span className="info-2">
                      <FormControlLabel
                        classes={{ root: "m-0" }}
                        control={
                          <IOSSwitch
                            checked={Boolean(this.state.useMoneyEarn)}
                            onChange={() => {
                              this.setState({
                                useMoneyEarn: !this.state.useMoneyEarn,
                              });
                            }}
                          />
                        }
                      />
                    </span>
                  </div>
                )}
              </div>
            )}
        </div>
        {((user && user.stripeCustomer && user.stripeCustomer.id) ||
          user.money > makeAnAd.budget) && (
            <div>
              <div
                style={{ width: "100%", padding: "0 20px", position: "relative" }}
              >
                <button
                  style={{ height: "50px", width: "100%" }}
                  className="btn big-blue-btn"
                  onClick={() => {
                    this.checkMoney();
                  }}
                >
                  {translation["Confirm"][trans]}
                </button>
                <span
                  style={{
                    position: "absolute",
                    right: "30px",
                    top: "11px",
                    color: "#fff",
                    fontSize: "18px",
                  }}
                >
                  {"$"}
                  {this.state.useCredit && !this.state.useMoneyEarn ? (
                    (makeAnAd.oldBudget ? (
                      <NumberFormat
                        thousandSeparator={true}
                        value={
                          parseInt((makeAnAd.budget - makeAnAd.oldBudget) * 100) /
                          100
                        }
                        displayType={"text"}
                      />
                    ) : (
                        makeAnAd.budget
                      )) -
                      user.money >
                      0 ? (
                        <NumberFormat
                          thousandSeparator={true}
                          value={
                            parseInt(
                              ((makeAnAd.oldBudget
                                ? parseInt(
                                  (makeAnAd.budget - makeAnAd.oldBudget) * 100
                                ) / 100
                                : makeAnAd.budget) -
                                user.money) *
                              100
                            ) / 100
                          }
                          displayType={"text"}
                        />
                      ) : (
                        0
                      )
                  ) : (
                      ""
                    )}
                  {!this.state.useCredit && this.state.useMoneyEarn ? (
                    (makeAnAd.oldBudget ? (
                      <NumberFormat
                        thousandSeparator={true}
                        value={
                          parseInt((makeAnAd.budget - makeAnAd.oldBudget) * 100) /
                          100
                        }
                        displayType={"text"}
                      />
                    ) : (
                        makeAnAd.budget
                      )) -
                      user.moneyEarn >
                      0 ? (
                        <NumberFormat
                          thousandSeparator={true}
                          value={
                            parseInt(
                              ((makeAnAd.oldBudget
                                ? parseInt(
                                  (makeAnAd.budget - makeAnAd.oldBudget) * 100
                                ) / 100
                                : makeAnAd.budget) -
                                user.moneyEarn) *
                              100
                            ) / 100
                          }
                          displayType={"text"}
                        />
                      ) : (
                        0
                      )
                  ) : (
                      ""
                    )}
                  {this.state.useCredit && this.state.useMoneyEarn ? (
                    (makeAnAd.oldBudget ? (
                      <NumberFormat
                        thousandSeparator={true}
                        value={
                          parseInt((makeAnAd.budget - makeAnAd.oldBudget) * 100) /
                          100
                        }
                        displayType={"text"}
                      />
                    ) : (
                        makeAnAd.budget
                      )) -
                      user.moneyEarn -
                      user.money >
                      0 ? (
                        <NumberFormat
                          thousandSeparator={true}
                          value={
                            parseInt(
                              ((makeAnAd.oldBudget
                                ? parseInt(
                                  (makeAnAd.budget - makeAnAd.oldBudget) * 100
                                ) / 100
                                : makeAnAd.budget) -
                                user.moneyEarn -
                                user.money) *
                              100
                            ) / 100
                          }
                          displayType={"text"}
                        />
                      ) : (
                        0
                      )
                  ) : (
                      ""
                    )}
                  {!this.state.useCredit && !this.state.useMoneyEarn ? (
                    makeAnAd.oldBudget ? (
                      <NumberFormat
                        thousandSeparator={true}
                        value={
                          parseInt((makeAnAd.budget - makeAnAd.oldBudget) * 100) /
                          100
                        }
                        displayType={"text"}
                      />
                    ) : (
                        <NumberFormat
                          thousandSeparator={true}
                          value={makeAnAd.budget}
                          displayType={"text"}
                        />
                      )
                  ) : (
                      ""
                    )}
                </span>
              </div>
            </div>
          )}
        {(!user.stripeCustomer || !user.stripeCustomer.id) && (
          <div style={{ width: "100%", padding: "0 20px" }}>
            <button
              style={{ height: "50px", width: "100%" }}
              className="btn big-blue-btn"
              onClick={() => {
                this.props.history.push({
                  pathname: `/credit-card-change`,
                  state: { back: "/make-an-ad-confirm" },
                });
              }}
            >
              {translation["Add new card number"][trans]}
            </button>
          </div>
        )}
        <Modal
          isOpen={this.state.openModal}
          onRequestClose={() => {
            this.setState({ openModal: false });
          }}
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
            },
          }}
          ariaHideApp={false}
        >
          <div style={{ textAlign: "center" }}>
            <h5>Not enough credit</h5>
            <br />
            <button
              className="btn big-blue-btn mr-2"
              onClick={() => {
                this.confirmMakeAnAd({ useCredit: true });
              }}
            >
              Use credit and pay remainder
            </button>
            <br />
            <br />
            <button
              className="btn big-blue-btn"
              onClick={() => {
                this.confirmMakeAnAd({ useCredit: false });
              }}
            >
              Pay remainder
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withLayout(MakeAnAdConfirm);
