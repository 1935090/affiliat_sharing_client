import React, { Component } from "react";
import { Link } from "react-router-dom";
import withLayout from "../../lib/withLayout";
import Moment from "moment";
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
import { LineChart } from "react-chartkick";
import NumberFormat from "react-number-format";
import "chart.js";

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

class PromoAdResult extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.location.state.ads) {
      let ads = this.props.location.state.ads;
      ads.step = 3;
      this.setState({ ...ads }, () => {
        this.getMerchantAdDetail();
      });

      let globalState = this.state.globalState;
      globalState.currentViewPost = this.props.location.state.ads._id;
      this.props.setGlobalState(globalState);
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      globalState: this.props.getGlobalState(),
      keepAdvertising: true,
      showTab: null,
      data: null,
      toggle: false,
    };
  }
  stopAds = async () => {
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
      await this.props.updateUser();
    } else {
      alert("Change state failed");
    }
    return null;
  };
  getMerchantAdDetail = async () => {
    let globalState = this.state.globalState;
    const result = await Axios({
      method: "post",
      url: this.props._setting.serverUrl + "/get-merchant-ads-detail",
      data: {
        email: globalState.user.email,
        password: globalState.user.password,
        adId: this.state._id,
      },
    });
    if (result.status === 200 && result.data.type === "success") {
      this.setState({ showTab: 1, data: result.data.message });
    } else {
    }
  };
  render() {
    const makeAnAd = this.state || null;
    //let makeAnAdCopy = this.state;
    //delete makeAnAdCopy.globalState;
    const translation = this.state.globalState
      ? this.state.globalState.translation
      : null;
    const trans = this.state.globalState ? this.state.globalState.trans : null;
    return (
      <div>
        {makeAnAd && makeAnAd.budget && translation && trans && (
          <div style={{ padding: "0 10px" }}>
            <div style={{ height: "60px", padding: "10px 0" }}>
              <Link to={`/add-ads`}>
                <img
                  src="/static/images/svg/blueback.svg"
                  style={{
                    marginRight: "25px",
                    marginLeft: "10px",
                    width: "12px",
                  }}
                  onClick={() => {
                    this.setState({ step: 1 });
                  }}
                />
              </Link>
              <span
                style={{
                  fontSize: "25px",
                  fontWeight: "700",
                  verticalAlign: "middle",
                  visibility: "hidden",
                }}
              >
                {translation["Confirm"][trans]}
              </span>
            </div>

            <div>
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: makeAnAd.status === "onGoing" ? "#a0d423" : "#d42333",
                }}
              >
                {makeAnAd.status === "onGoing" ? "On Going" : "Stopped"}{" "}
                {makeAnAd.stopForever ? "Permanently" : ""}
              </span>
              <span style={{ float: "right" }}>
                <FormControlLabel
                  classes={{ root: "m-0" }}
                  control={
                    <IOSSwitch
                      checked={makeAnAd.status === "onGoing" ? true : false}
                      onChange={() => {
                        this.stopAds();
                      }}
                      disabled={makeAnAd.stopForever}
                    />
                  }
                />
              </span>
            </div>
            <div style={{ marginTop: "20px" }}>
              <span
                style={{
                  fontSize: "20px",
                  color: "#2680EB",
                  fontWeight: "bold",
                }}
              >
                Summary
              </span>
              {/*<span
                style={{
                  fontSize: "16px",
                  color: "#2680EB",
                  float: "right",
                }}
              >
                Edit
              </span>*/}
            </div>

            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  margin: "0",
                  color: "#000",
                }}
              >
                {translation["Promotion Budget"][trans]}
              </p>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#585858",
                  margin: "0",
                }}
              >
                Total budget
              </p>
              <p
                style={{
                  fontSize: "18px",
                  color: "#000",
                  marginBottom: "20px",
                }}
              >
                <NumberFormat
                  thousandSeparator={true}
                  value={makeAnAd.budget}
                  displayType={"text"}
                />
              </p>
              {this.state.toggle && (
                <div>
                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      margin: "0",
                      color: "#000",
                    }}
                  >
                    Your target
                  </p>
                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "#585858",
                      margin: "0",
                    }}
                  >
                    {translation["Region"][trans]}
                  </p>
                  <p
                    style={{
                      fontSize: "18px",
                      color: "#000",
                      marginBottom: "10px",
                    }}
                  >
                    {makeAnAd.countries.join(", ")}
                  </p>

                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "#585858",
                      margin: "0",
                    }}
                  >
                    {translation["Target Gender"][trans]}
                  </p>
                  <p
                    style={{
                      fontSize: "18px",
                      color: "#000",
                      marginBottom: "10px",
                    }}
                  >
                    {makeAnAd.gender}
                  </p>

                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "#585858",
                      margin: "0",
                    }}
                  >
                    {translation["Target Age"][trans]}
                  </p>
                  <p
                    style={{
                      fontSize: "18px",
                      color: "#000",
                      marginBottom: "10px",
                    }}
                  >
                    {makeAnAd.age[0]}-{makeAnAd.age[1]}
                  </p>

                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      margin: "0",
                      color: "#000",
                    }}
                  >
                    {translation["Date"][trans]}
                  </p>
                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "#585858",
                      margin: "0",
                    }}
                  >
                    Start day
                  </p>
                  <p
                    style={{
                      fontSize: "18px",
                      color: "#000",
                      marginBottom: "10px",
                    }}
                  >
                    {Moment(makeAnAd.startDate).format("DD/MM/YYYY")}
                  </p>
                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "#585858",
                      margin: "0",
                    }}
                  >
                    End day
                  </p>
                  <p
                    style={{
                      fontSize: "18px",
                      color: "#000",
                      marginBottom: "20px",
                    }}
                  >
                    {Moment(makeAnAd.endDate).format("DD/MM/YYYY")}
                  </p>
                </div>
              )}
            </div>
            <div
              style={{
                textAlign: "center",
                border: "1px solid #333",
                borderLeft: "0",
                borderRight: "0",
                padding: "2px 0 2px 0",
                marginBottom: "10px",
              }}
              onClick={() => {
                this.setState({ toggle: !this.state.toggle });
              }}
            >
              {this.state.toggle ? (
                <span>
                  Hide details{" "}
                  <span
                    style={{
                      marginLeft: "3px",
                      transform: "rotate(90deg)",
                      display: "inline-block",
                    }}
                  >
                    <img
                      src="/static/images/svg/blueback.svg"
                      style={{ width: "6px" }}
                    />
                  </span>
                </span>
              ) : (
                  <span>
                    Show details{" "}
                    <span
                      style={{
                        marginLeft: "3px",
                        transform: "rotate(270deg)",
                        display: "inline-block",
                      }}
                    >
                      <img
                        src="/static/images/svg/blueback.svg"
                        style={{ width: "6px" }}
                      />
                    </span>
                  </span>
                )}
            </div>

            {this.state.data && this.state.data.graph && (
              <div style={{ marginBottom: "20px" }}>
                <LineChart data={this.state.data.graph} height="150px" />
              </div>
            )}
            <div>
              <div
                style={{
                  display: "flex",
                  overflowX: "scroll",
                  width: "100%",
                  textAlign: "center",
                  overflowX: "scroll",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ padding: "0 5px" }}>
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      color: this.state.showTab === 1 ? "#2680eb" : "#a8ccf8",
                      borderBottom: "2px solid #a8ccf8",
                      fontWeight: "700",
                      lineHeight: "2",
                      fontSize: "13px",
                      width: "55px",
                    }}
                    onClick={() => {
                      this.setState({ showTab: 1 });
                    }}
                  >
                    Total
                  </div>
                </div>
                <div style={{ padding: "0 5px" }}>
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      color: this.state.showTab === 2 ? "#2680eb" : "#a8ccf8",
                      borderBottom: "2px solid #a8ccf8",
                      fontWeight: "700",
                      lineHeight: "2",
                      fontSize: "13px",
                      width: "55px",
                    }}
                    onClick={() => {
                      this.setState({ showTab: 2 });
                    }}
                  >
                    Gender
                  </div>
                </div>
                <div style={{ padding: "0 5px" }}>
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      color: this.state.showTab === 3 ? "#2680eb" : "#a8ccf8",
                      borderBottom: "2px solid #a8ccf8",
                      fontWeight: "700",
                      lineHeight: "2",
                      fontSize: "13px",
                      width: "55px",
                    }}
                    onClick={() => {
                      this.setState({ showTab: 3 });
                    }}
                  >
                    Age
                  </div>
                </div>
                <div style={{ padding: "0 5px" }}>
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      color: this.state.showTab === 4 ? "#2680eb" : "#a8ccf8",
                      borderBottom: "2px solid #a8ccf8",
                      fontWeight: "700",
                      lineHeight: "2",
                      fontSize: "13px",
                      width: "55px",
                    }}
                    onClick={() => {
                      this.setState({ showTab: 4 });
                    }}
                  >
                    Location
                  </div>
                </div>
              </div>
            </div>
            {this.state.showTab === 2 && this.state.data && (
              <div>
                {Object.keys(this.state.data.genderGraph).map(
                  (keyName, key) => (
                    <div key={key}>
                      <p
                        style={{
                          fontSize: "18px",
                          fontWeight: "700",
                          color: "#585858",
                          margin: "10px 0 0 0",
                        }}
                      >
                        {keyName}
                      </p>
                      {Object.keys(this.state.data.genderGraph[keyName]).map(
                        (keyName2, key2) => (
                          <p
                            style={{
                              fontSize: "18px",
                              color: "#000",
                              marginBottom: "0px",
                            }}
                            key={key2}
                          >
                            {keyName2}
                            <span style={{ float: "right" }}>
                              <NumberFormat
                                thousandSeparator={true}
                                value={
                                  this.state.data.genderGraph[keyName][keyName2]
                                }
                                displayType={"text"}
                              />
                            </span>
                          </p>
                        )
                      )}
                    </div>
                  )
                )}
              </div>
            )}
            {this.state.showTab === 3 && this.state.data && (
              <div>
                {Object.keys(this.state.data.ageGraph).map((keyName, key) => (
                  <div key={key}>
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: "700",
                        color: "#585858",
                        margin: "10px 0 0 0",
                      }}
                    >
                      {keyName}
                    </p>
                    {Object.keys(this.state.data.ageGraph[keyName]).map(
                      (keyName2, key2) => (
                        <p
                          style={{
                            fontSize: "18px",
                            color: "#000",
                            marginBottom: "0px",
                          }}
                          key={key2}
                        >
                          {keyName2}
                          <span style={{ float: "right" }}>
                            <NumberFormat
                              thousandSeparator={true}
                              value={
                                this.state.data.ageGraph[keyName][keyName2]
                              }
                              displayType={"text"}
                            />
                          </span>
                        </p>
                      )
                    )}
                  </div>
                ))}
              </div>
            )}
            {this.state.showTab === 4 && this.state.data && (
              <div>
                {Object.keys(this.state.data.locationGraph).map(
                  (keyName, key) => (
                    <div key={key}>
                      {makeAnAd.countries &&
                        makeAnAd.countries.includes(keyName) && (
                          <div>
                            <p
                              style={{
                                fontSize: "18px",
                                fontWeight: "700",
                                color: "#585858",
                                margin: "10px 0 0 0",
                              }}
                            >
                              {keyName}
                            </p>
                            {Object.keys(
                              this.state.data.locationGraph[keyName]
                            ).map((keyName2, key2) => (
                              <p
                                style={{
                                  fontSize: "18px",
                                  color: "#000",
                                  marginBottom: "0px",
                                }}
                                key={key2}
                              >
                                {keyName2}
                                <span style={{ float: "right" }}>
                                  <NumberFormat
                                    thousandSeparator={true}
                                    value={
                                      this.state.data.locationGraph[keyName][
                                      keyName2
                                      ]
                                    }
                                    displayType={"text"}
                                  />
                                </span>
                              </p>
                            ))}
                          </div>
                        )}
                    </div>
                  )
                )}
              </div>
            )}
            {this.state.showTab === 1 && this.state.data && (
              <div>
                {Object.keys(this.state.data.totalGraph).map((keyName, key) => (
                  <div key={key}>
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: "700",
                        color: "#585858",
                        margin: "10px 0 0 0",
                      }}
                    >
                      {keyName}
                    </p>
                    {Object.keys(this.state.data.totalGraph[keyName]).map(
                      (keyName2, key2) => (
                        <p
                          style={{
                            fontSize: "18px",
                            color: "#000",
                            marginBottom: "0px",
                          }}
                          key={key2}
                        >
                          {keyName2}
                          <span style={{ float: "right" }}>
                            <NumberFormat
                              thousandSeparator={true}
                              value={
                                this.state.data.totalGraph[keyName][keyName2]
                              }
                              displayType={"text"}
                            />
                          </span>
                        </p>
                      )
                    )}
                  </div>
                ))}
              </div>
            )}

            <div
              style={{
                width: "100%",
                padding: "0 20px",
                marginBottom: "20px",
                marginTop: "20px",
              }}
            >
              {!makeAnAd.stopForever && (
                <Link
                  to={{
                    pathname: "/make-an-ad",
                    state: {
                      makeAnAd,
                      isUpdate: true,
                    },
                  }}
                >
                  <button
                    style={{ height: "50px", width: "100%" }}
                    className="btn big-blue-btn"
                  >
                    {translation["Promote again"][trans]}
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withLayout(PromoAdResult);
