import React, { Component } from "react";
import { Link } from "react-router-dom";
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
import withLayout from "../../lib/withLayout";
import Moment from "moment";
import Footer from "../../components/Footer";
import Modal from "react-modal";
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

class MakeAnAd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: [16, 65],
      step: 1,
      budget: 100,
      gender: "all",
      adsType: "",
      country: "Hong Kong",
      countries: [],
      keepAdvertising: true,
      scheduledTime: "later",
      days: 3,
      speed: "low",
      selectedPost: null,
      globalState: this.props.getGlobalState(),
      fbPageTokens: null,
      fbPagePosts: null,
      fbPageDetail: null,
      startNow: true,
      singleSharePrice: 0,
      startDate: Moment(),
      endDate: Moment().add(3, "days"),
      error1: false,
      error2: false,
      error3: false,
      selectedPage: null,
      scrolling: false,
      submitted: false,
      openModal: false,
    };
  }

  componentDidMount = async () => {
    const globalState = this.state.globalState;
    if (this.props.location.state && this.props.location.state.isNew) {
      //console.log(123);
      const user = globalState.user;
      if (user && user.fbPageTokens && user.fbPageTokens[0]) {
        await this.getPagePost({ tokenItem: user.fbPageTokens[0] });
      }
    } else if (
      this.props.location.state &&
      this.props.location.state.makeAnAd
    ) {
      let makeAnAd = this.props.location.state.makeAnAd;
      delete makeAnAd.globalState;
      if (this.props.location.state.isUpdate === false) {
        delete makeAnAd._id;
        delete makeAnAd.id;
      } else if (this.props.location.state.isUpdate === true) {
        makeAnAd.step = 3;
        this.setState({ oldBudget: makeAnAd.budget });
      }
      this.setState({ ...makeAnAd });
    } else if (this.state.globalState.makeAnAd) {
      this.state.globalState.makeAnAd.globalState = this.props.getGlobalState();
      this.setState({ ...this.state.globalState.makeAnAd });
    }
    console.log(globalState.user);
    this.setState({ countries: [globalState.user.currency.country] });
    this.getPrice();
    if (this.props.location.state && this.props.location.state.loadPrevious) {
      this.setState({ ...globalState.makeAnAd });
      //this.setState({ oldBudget: });
    }
    window.scrollTo(0, 0);
    setInterval(() => {
      const element = document.getElementById("page-div");
      if (element && this.state.scrolling) {
        element.scrollLeft += 5;
      }
    }, 10);
  };

  getPagePost = async ({ tokenItem }) => {
    this.setState({ selectedPage: tokenItem.id, fbPagePosts: null });
    const result = await Axios({
      method: "get",
      url: `https://graph.facebook.com/${tokenItem.id}/feed?fields=permalink_url,attachments,message,from&access_token=${tokenItem.access_token}`,
    });
    if (result.status === 200 && result.data && result.data.data) {
      this.setState({ fbPagePosts: result.data.data, selectedPost: null });
    } else {
      alert("Get fan page posts failed.");
    }
  };

  getPageDetail = async ({ tokenItem }) => {
    const result = await Axios({
      method: "get",
      url: `https://graph.facebook.com/${tokenItem.id}?fields=description,cover,name,link&access_token=${tokenItem.access_token}`,
    });
    if (result.status === 200 && result.data && result.data.name) {
      this.setState({ fbPageDetail: result.data, step: 2 });
    } else {
      alert("Get fan page failed.");
    }
  };
  getPrice = async () => {
    let globalState = this.state.globalState;
    const result = await Axios({
      method: "post",
      url: this.props._setting.serverUrl + "/get-make-an-ad-impression",
      data: {
        email: globalState.user.email,
        password: globalState.user.password,
        adDetail: { speed: this.state.speed },
      },
    });
    if (result.status === 200 && result.data.type === "success") {
      //this.props.history.push(`/confirm-share-ads-detail-result`);
      //console.log(result.data.message);
      this.setState({ singleSharePrice: result.data.message });
    } else {
      //alert("Failed.");
    }
  };

  checkExist = async ({ postId }) => {
    console.log(postId);
    const result = await Axios({
      method: "post",
      url: this.props._setting.serverUrl + "/check-ad-exist-post",
      data: {
        postId,
      },
    });
    if (result.status === 200 && result.data && result.data.type === "false") {
      return false;
    } else {
      return true;
    }
  };
  next = async () => {
    let globalState = this.state.globalState;
    this.setState({ submitted: false }, () => {
      if (this.state.budget >= 50) {
        globalState.makeAnAd = this.state;
        delete globalState.makeAnAd.globalState;
        this.props.setGlobalState(globalState);
        this.props.history.push(`/make-an-ad-confirm`);
      } else {
        this.setState({ submitted: true });
        //alert("budget at least 50");
      }
    });
  };

  FacebookLogin = async () => {
    this.props._ionic.facebook
      .login([
        "public_profile",
        "user_friends",
        "user_posts",
        "email",
        "user_birthday",
        "user_gender",
        "pages_show_list",
        "pages_read_engagement",
      ])
      .then(async (res) => {
        if (typeof res.status !== "undefined" && res.status === "connected") {
          let globalState = this.state.globalState;
          const result = await Axios({
            method: "post",
            url: this.props._setting.serverUrl + "/signin-facebook",
            data: {
              fbToken: res.authResponse,
              email: globalState.user.email,
              password: globalState.user.password,
            },
          });
          if (result.status === 200 && result.data.type === "success") {
            let user = result.data.message;
            globalState.user = user;
            this.props.setGlobalState(globalState);
            this.setState({
              globalState,
              fbPagePosts: null,
              selectedPage: null,
            });
          }
        } else {
          alert("Fail to add fan pages");
        }
        if (typeof res.status !== "undefined" && res.status === "connected") {
          alert("Successfully added fan pages");
        } else {
          alert("Fail to add fan pages");
        }
      })
      .catch((e) => alert("Fail to add fan pages"));
  };

  render() {
    const user = this.state.globalState.user;
    const translation = this.state.globalState.translation;
    const trans = this.state.globalState.trans;
    return (
      <div>
        <div style={{ padding: "0 10px" }}>
          <div
            style={{
              height: "60px",
              padding: "20px 10px",
              position: "fixed",
              width: "100%",
              left: 0,
              top: 0,
              backgroundColor: "#fbfbfb",
              zIndex: "2",
            }}
          >
            {this.state.step != 99 &&
              (this.props.location.state && !this.state._id) && (
                <img
                  src="/static/images/svg/blueback.svg"
                  style={{
                    marginRight: "25px",
                    marginLeft: "10px",
                    width: "12px",
                  }}
                  onClick={async () => {
                    if (this.state.step > 1)
                      this.setState({ step: this.state.step - 1 });
                    else {
                      this.props.history.push("/add-ads");
                    }
                  }}
                />
              )}
            {this.state.step != 99 &&
              (this.props.location.state && this.state._id) && (
                <img
                  src="/static/images/svg/blueback.svg"
                  style={{
                    marginRight: "25px",
                    marginLeft: "10px",
                    width: "12px",
                  }}
                  onClick={() => {
                    /*let ads_copy = JSON.parse(
                      JSON.stringify(this.props.location.state.makeAnAd)
                    );*/
                    //delete ads_copy.globalState;
                    this.props.history.push("/add-ads");
                  }}
                />
              )}
            <span
              style={{
                float: "right",
                marginRight: "10px",
                marginTop: "-8px",
                padding: "10px 7px",
                background: "#fff",
                borderRadius: "100px",
                border: "2px solid #55ca80",
              }}
            >
              <img
                src="/static/images/svg/GreenOK.svg"
                style={{ width: "20px" }}
                onClick={async () => {
                  if (this.state.step === 1) {
                    if (this.state.selectedPost) {
                      this.setState({ step: 2 });
                      window.scrollTo(0, 0);
                    } else {
                      alert("Please select a post");
                    }
                  } else if (this.state.step != 3 && this.state.step != 99) {
                    window.scrollTo(0, 0);
                    if (this.state.step === 2)
                      this.setState(
                        {
                          error1: false,
                          error2: false,
                          error3: false,
                        },
                        () => {
                          let haveError = false;
                          if (!this.state.gender) {
                            this.setState({ error1: true });
                            haveError = true;
                          }
                          if (!this.state.adsType) {
                            this.setState({ error2: true });
                            haveError = true;
                          }
                          if (this.state.countries.length === 0) {
                            this.setState({ error3: true });
                            haveError = true;
                          }
                          if (!haveError)
                            this.setState({ step: this.state.step + 1 });
                        }
                      );
                    else this.setState({ step: this.state.step + 1 });
                  } else if (this.state.step === 99) {
                    await this.getPrice();
                    this.setState({ step: 3 });
                  } else if (this.state.step === 3) {
                    this.next();
                  }
                }}
              />
            </span>
            {(this.state.step === 2 || this.state.step === 3) &&
              (this.props.location.state && !this.state._id) && (
                <div
                  style={{ marginTop: "15px", width: "90%", marginLeft: "5%" }}
                >
                  <div
                    style={{
                      width: "48%",
                      borderTopWidth: "3px",
                      borderTopStyle: "solid",
                      display: "inline-block",
                      borderTopColor:
                        this.state.step === 2 ? "2680eb" : "a8ccf8",
                      marginRight: "4%",
                    }}
                    onClick={() => {
                      this.setState({ step: 2 });
                    }}
                  ></div>
                  <div
                    style={{
                      width: "48%",
                      borderTopWidth: "3px",
                      borderTopStyle: "solid",
                      borderTopColor:
                        this.state.step === 3 ? "2680eb" : "a8ccf8",
                      display: "inline-block",
                    }}
                    onClick={() => {
                      this.setState({ step: 3 });
                    }}
                  ></div>
                </div>
              )}
          </div>
          <div
            style={{
              height:
                this.state.step === 1
                  ? "calc(100vh - 235px)"
                  : "calc(100vh - 135px)",
              marginBottom: "10px",
              marginTop: "80px",
            }}
            className="rb"
          >
            <div
              style={{
                width: "100%",
                padding: "0px 15px 30px 15px",
                marginBottom: "30px",
              }}
            >
              {this.state.step === 2 && (
                <div>
                  <p
                    style={{
                      fontSize: "25px",
                      fontWeight: "700",
                      marginBottom: "10px",
                    }}
                  >
                    Your target information
                  </p>
                  <p
                    style={{
                      color: "8a8a8a",
                      fontSize: "15px",
                      marginBottom: "40px",
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>

                  <div style={{ marginBottom: "30px" }}>
                    <FormControl classes={{ root: "w-100" }}>
                      <InputLabel
                        shrink
                        htmlFor="gender-native-label-placeholder"
                        error={this.state.error1}
                      >
                        {translation["Target Gender"][trans]}
                      </InputLabel>
                      <Select
                        inputProps={{
                          name: "gender",
                          id: "gender-native-label-placeholder",
                        }}
                        value={this.state.gender}
                        onChange={(e) => {
                          this.setState({ gender: e.target.value });
                        }}
                      >
                        <MenuItem value={"male"}>Male</MenuItem>
                        <MenuItem value={"female"}>Female</MenuItem>
                        <MenuItem value={"all"}>All</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div style={{ marginBottom: "30px", position: "relative" }}>
                    <FormControl classes={{ root: "w-100" }}>
                      <div style={{ marginBottom: "30px" }}>
                        <InputLabel
                          shrink
                          htmlFor="age-native-label-placeholder"
                        >
                          {translation["Target Age"][trans]}
                        </InputLabel>
                      </div>
                      <Slider
                        value={this.state.age}
                        onChange={(event, newValue) => {
                          this.setState({ age: newValue });
                        }}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        valueLabelDisplay="on"
                        min={16}
                        max={65}
                        valueLabelFormat={(value) => {
                          return value == 65 ? "65+" : value;
                        }}
                      />
                    </FormControl>
                  </div>
                  <div style={{ marginBottom: "30px" }}>
                    <FormControl classes={{ root: "w-100" }}>
                      <InputLabel
                        shrink
                        htmlFor="adstype-native-label-placeholder"
                        error={this.state.error2}
                      >
                        {translation["Advertisement Type"][trans]}
                      </InputLabel>
                      <div style={{ marginTop: "20px" }}>
                        <RadioGroup
                          value={this.state.adsType}
                          onChange={(e) => {
                            this.setState({ adsType: e.target.value });
                          }}
                        >
                          <FormControlLabel
                            value="Facebook Post"
                            control={<Radio />}
                            label={translation["Facebook Post"][trans]}
                          />
                          <FormControlLabel
                            value="Facebook Live"
                            control={<Radio />}
                            label={translation["Facebook Live"][trans]}
                          />
                        </RadioGroup>
                      </div>
                      {/*<Select
                      inputProps={{
                        name: "adsType",
                        id: "adstype-native-label-placeholder",
                      }}
                      value={this.state.adsType}
                      onChange={(e) => {
                        this.setState({ adsType: e.target.value });
                      }}
                    >
                      <MenuItem value={"Facebook Post"}>Facebook Post</MenuItem>
                      <MenuItem value={"Facebook Live"}>Facebook Live</MenuItem>
                      <MenuItem value={"Facebook Like"}>Facebook Like</MenuItem>
                    </Select>*/}
                    </FormControl>
                  </div>
                  <div style={{ marginBottom: "30px" }}>
                    <FormControl classes={{ root: "w-100" }}>
                      <InputLabel
                        shrink
                        htmlFor="country-native-label-placeholder"
                        error={this.state.error3}
                      >
                        {translation["Region"][trans]}
                      </InputLabel>
                      {/*<Select
                      inputProps={{
                        name: "country",
                        id: "country-native-label-placeholder",
                      }}
                      value={this.state.country}
                      onChange={(e) => {
                        this.setState({ country: e.target.value });
                      }}
                    >
                      <MenuItem value={"Hong Kong"}>Hong Kong</MenuItem>
                      <MenuItem value={"Taiwan"}>Taiwan</MenuItem>
                    </Select>*/}
                      <div style={{ marginTop: "20px" }}>
                        <FormControlLabel
                          value="end"
                          control={
                            <Checkbox
                              color="primary"
                              checked={
                                this.state.countries.indexOf("Hong Kong") === -1
                                  ? false
                                  : true
                              }
                              onChange={(e) => {
                                const country = "Hong Kong";
                                const countries = this.state.countries;
                                if (
                                  this.state.countries.indexOf(country) === -1
                                ) {
                                  countries.push(country);
                                } else {
                                  for (let i in countries) {
                                    if (countries[i] === country) {
                                      countries.splice(i, 1);
                                      break;
                                    }
                                  }
                                }
                                this.setState({ countries });
                              }}
                            />
                          }
                          label="Hong Kong"
                          labelPlacement="end"
                        />
                      </div>
                      <FormControlLabel
                        value="end"
                        control={
                          <Checkbox
                            color="primary"
                            checked={
                              this.state.countries.indexOf("Taiwan") === -1
                                ? false
                                : true
                            }
                            onChange={(e) => {
                              const country = "Taiwan";
                              const countries = this.state.countries;
                              if (this.state.countries.indexOf(country) === -1) {
                                countries.push(country);
                              } else {
                                for (let i in countries) {
                                  if (countries[i] === country) {
                                    countries.splice(i, 1);
                                    break;
                                  }
                                }
                              }
                              this.setState({ countries });
                            }}
                          />
                        }
                        label="Taiwan"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="end"
                        control={
                          <Checkbox
                            color="primary"
                            checked={
                              this.state.countries.indexOf("Macao") === -1
                                ? false
                                : true
                            }
                            onChange={(e) => {
                              const country = "Macao";
                              const countries = this.state.countries;
                              if (this.state.countries.indexOf(country) === -1) {
                                countries.push(country);
                              } else {
                                for (let i in countries) {
                                  if (countries[i] === country) {
                                    countries.splice(i, 1);
                                    break;
                                  }
                                }
                              }
                              this.setState({ countries });
                            }}
                          />
                        }
                        label="Macao"
                        labelPlacement="end"
                      />
                    </FormControl>
                  </div>
                </div>
              )}
              {this.state.step === 3 && (
                <div>
                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color:
                        this.state.budget < 50 && this.state.submitted
                          ? "#f44336"
                          : "#212529",
                    }}
                  >
                    {translation["Promotion Budget"][trans]}
                  </p>

                  <div>
                    {/*<span style={{ fontSize: "20px", color: "#707070" }}>
                    ${this.state.budget}
            </span>*/}
                    <span style={{ display: "inline-block", width: "200px" }}>
                      <FormControl fullWidth>
                        <Input
                          id="standard-adornment-amount"
                          startAdornment={
                            <InputAdornment position="start"></InputAdornment>
                          }
                          type="number"
                          value={this.state.budget}
                          inputProps={{
                            pattern: "[0-9]*",
                            inputMode: "numeric",
                          }}
                          onChange={(e) => {
                            this.setState({
                              budget: e.target.value,
                            });
                          }}
                        />
                      </FormControl>
                    </span>
                    <img
                      src="/static/images/add@3x.png"
                      style={{ float: "right", marginTop: "4px" }}
                      onClick={() => {
                        this.setState({
                          budget: parseInt(this.state.budget) + 50,
                        });
                      }}
                    />
                    <img
                      src="/static/images/Less@3x.png"
                      style={{
                        float: "right",
                        marginTop: "13px",
                        marginRight: "30px",
                      }}
                      onClick={() => {
                        if (this.state.budget >= 100)
                          this.setState({
                            budget: parseInt(this.state.budget) - 50,
                          });
                      }}
                    />
                  </div>
                  {this.state.submitted && this.state.budget < 50 && (
                    <p
                      style={{
                        color: "#f44336",
                        margin: 0,
                      }}
                    >
                      At least $50
                    </p>
                  )}
                  <p style={{ marginBottom: "0" }}>
                    {translation["Your maximum expense will be "][trans]}$
                    <NumberFormat
                      thousandSeparator={true}
                      value={this.state.budget}
                      displayType={"text"}
                    />{" "}
                    {this.state.globalState.user.currency.iso}.
                  </p>
                  {this.state.singleSharePrice != 0 && (
                    <p style={{ margin: 0 }}>
                      {
                        translation["The expected number of impressions is "][
                        trans
                        ]
                      }
                      <NumberFormat
                        thousandSeparator={true}
                        value={Math.round(
                          (this.state.budget * 10) / this.state.singleSharePrice
                        )}
                        displayType={"text"}
                      />
                      .
                    </p>
                  )}
                  <div style={{ marginTop: "40px" }}>
                    <span style={{ fontSize: "20px", color: "#2680EB" }}>
                      {translation["Continue to publish"][trans]}
                    </span>
                    <span style={{ float: "right" }}>
                      <FormControlLabel
                        classes={{ root: "m-0" }}
                        control={
                          <IOSSwitch
                            checked={Boolean(this.state.keepAdvertising)}
                            onChange={() => {
                              this.setState({
                                keepAdvertising: !this.state.keepAdvertising,
                              });
                            }}
                            name="checkedA"
                          />
                        }
                      />
                    </span>
                    {this.state.keepAdvertising && (
                      <p>
                        {
                          translation[
                          "Your ad will continue to publish until your balance runs out."
                          ][trans]
                        }
                      </p>
                    )}
                  </div>

                  <div style={{ marginTop: "40px" }}>
                    <p
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        marginBottom: "10px",
                      }}
                    >
                      {translation["Scheduled time"][trans]}
                    </p>
                    <div
                      style={{
                        border: "1px solid #2680EB",
                        textAlign: "center",
                        marginBottom: "20px",
                      }}
                      className="rb"
                    >
                      <div
                        style={
                          this.state.startNow
                            ? {
                              width: "50%",
                              display: "inline-block",
                              padding: "5px 0",
                              color: "fff",
                              fontSize: "16px",
                              backgroundColor: "#2680EB",
                            }
                            : {
                              width: "50%",
                              display: "inline-block",
                              padding: "5px 0",
                              color: "#2680EB",
                              fontSize: "16px",
                            }
                        }
                        className="rb"
                        onClick={() => {
                          this.setState({
                            startNow: true,
                            endDate: Moment().add(this.state.days, "days"),
                          });
                        }}
                      >
                        {translation["Start immediately"][trans]}
                      </div>
                      <div
                        style={
                          !this.state.startNow
                            ? {
                              width: "50%",
                              display: "inline-block",
                              padding: "5px 0",
                              color: "fff",
                              fontSize: "16px",
                              backgroundColor: "#2680EB",
                            }
                            : {
                              width: "50%",
                              display: "inline-block",
                              padding: "5px 0",
                              color: "#2680EB",
                              fontSize: "16px",
                            }
                        }
                        className="rb"
                        onClick={() => {
                          this.setState({ startNow: false });
                        }}
                      >
                        {translation["Start later"][trans]}
                      </div>
                    </div>
                    {this.state.keepAdvertising === false &&
                      this.state.startNow && (
                        <div>
                          <span style={{ fontSize: "20px", color: "#707070" }}>
                            {this.state.days} days
                          </span>
                          <img
                            src="/static/images/add@3x.png"
                            style={{ float: "right", marginTop: "4px" }}
                            onClick={() => {
                              this.setState({
                                days: this.state.days + 1,
                                endDate: Moment().add(
                                  this.state.days + 1,
                                  "days"
                                ),
                              });
                            }}
                          />
                          <img
                            src="/static/images/Less@3x.png"
                            style={{
                              float: "right",
                              marginTop: "13px",
                              marginRight: "30px",
                            }}
                            onClick={() => {
                              this.setState({
                                days: this.state.days - 1,
                                endDate: Moment().add(
                                  this.state.days - 1,
                                  "days"
                                ),
                              });
                            }}
                          />
                        </div>
                      )}
                    {this.state.keepAdvertising && this.state.startNow && (
                      <div>Your ad will start immediately.</div>
                    )}
                    {!this.state.startNow && (
                      <div>
                        <TextField
                          id="datetime-local"
                          label="Start"
                          type="datetime-local"
                          value={Moment(this.state.startDate).format(
                            "YYYY-MM-DD[T]HH:mm"
                          )}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => {
                            this.setState({
                              startDate: Moment(e.target.value),
                            });
                          }}
                        />
                      </div>
                    )}
                    {!this.state.keepAdvertising && !this.state.startNow && (
                      <div style={{ marginTop: "10px" }}>
                        <TextField
                          id="datetime-local"
                          label="End"
                          type="datetime-local"
                          value={Moment(this.state.endDate).format(
                            "YYYY-MM-DD[T]HH:mm"
                          )}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => {
                            this.setState({ endDate: Moment(e.target.value) });
                          }}
                        />
                      </div>
                    )}
                    {!this.state.keepAdvertising && (
                      <p>
                        {translation["Your ad will be published until "][trans]}
                        {Moment(this.state.endDate).format("DD/MM/YYYY")}.
                      </p>
                    )}
                  </div>

                  <div style={{ marginTop: "40px" }}>
                    <div
                      style={{
                        border: "1px solid #2680EB",
                        textAlign: "center",
                        marginBottom: "20px",
                      }}
                      className="rb"
                      onClick={() => this.setState({ step: 99 })}
                    >
                      <div
                        style={{
                          display: "inline-block",
                          padding: "5px 0",
                          color: "#2680EB",
                          fontSize: "20px",
                        }}
                        className="rb"
                      >
                        {translation["Advanced settings"][trans]}
                      </div>
                    </div>
                  </div>
                  <div>
                    <p>
                      Promotion speed is{" "}
                      <span style={{ textTransform: "capitalize" }}>
                        {this.state.speed}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p>
                      分享者必須設定為”公開分享”並保留貼文在社交媒體”最少七天”，否則該分享貼文的支出”不會被扣除”。
                    </p>
                  </div>
                </div>
              )}
              {this.state.step === 99 && (
                <div>
                  <div
                    style={{
                      display: "flex",
                      textAlign: "center",
                      marginBottom: "30px",
                      marginTop: "20px",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        border: "1px solid #2680EB",
                        backgroundColor:
                          this.state.speed === "low" ? "#2680EB" : "#fff",
                        color: this.state.speed === "low" ? "#fff" : "#2680EB",
                        padding: "6px 0 4px 0",
                        fontSize: "20px",
                      }}
                      onClick={() => {
                        this.setState({ speed: "low" });
                      }}
                    >
                      {translation["Low"][trans]}
                    </div>
                    <div
                      style={{
                        width: "100%",
                        borderStyle: "solid",
                        borderColor: "#2680EB",
                        borderWidth: "1px 1px 1px 0",
                        color:
                          this.state.speed === "normal" ? "#fff" : "#2680EB",
                        padding: "6px 0 4px 0",
                        fontSize: "20px",
                        backgroundColor:
                          this.state.speed === "normal" ? "#2680EB" : "#fff",
                      }}
                      onClick={() => {
                        this.setState({ speed: "normal" });
                      }}
                    >
                      {translation["Normal"][trans]}
                    </div>
                    <div
                      style={{
                        width: "100%",
                        borderStyle: "solid",
                        borderColor: "#2680EB",
                        borderWidth: "1px 1px 1px 0",
                        color: this.state.speed === "fast" ? "#fff" : "#2680EB",
                        padding: "6px 0 4px 0",
                        fontSize: "20px",
                        backgroundColor:
                          this.state.speed === "fast" ? "#2680EB" : "#fff",
                      }}
                      onClick={() => {
                        this.setState({ speed: "fast" });
                      }}
                    >
                      {translation["Fast"][trans]}
                    </div>
                  </div>
                  <p
                    style={{
                      fontSize: "25px",
                      fontWeight: "700",
                      marginBottom: "5px",
                    }}
                  >
                    {translation["Low"][trans]}
                  </p>
                  <p style={{ fontSize: "15px", color: "#8a8a8a" }}>
                    {
                      translation[
                      "Normal share – You will use a normal ad expense for sharers to share your ad. (Recommended)"
                      ][trans]
                    }
                  </p>
                  <p
                    style={{
                      fontSize: "25px",
                      fontWeight: "700",
                      marginBottom: "5px",
                    }}
                  >
                    {translation["Normal"][trans]}
                  </p>
                  <p style={{ fontSize: "15px", color: "#8a8a8a" }}>
                    {
                      translation[
                      "High-speed share – You will use a higher ad expense for sharers to share your ad, in order to attract sharers to share your ad faster."
                      ][trans]
                    }
                  </p>
                  <p
                    style={{
                      fontSize: "25px",
                      fontWeight: "700",
                      marginBottom: "5px",
                    }}
                  >
                    {translation["Fast"][trans]}
                  </p>
                  <p style={{ fontSize: "15px", color: "#8a8a8a" }}>
                    {
                      translation[
                      "Extreme-speed share – You will use the highest ad expense for sharers to share your ad, in order to attract sharers to share your ad with the utmost speed."
                      ][trans]
                    }
                  </p>
                </div>
              )}
              {this.state.step === 1 && (
                <div style={{ marginTop: "-20px", position: "relative" }}>
                  <div
                    style={{
                      position: "fixed",
                      width: "100%",
                      top: "60px",
                      backgroundColor: "#fbfbfb",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "25px",
                        fontWeight: "700",
                        marginBottom: "10px",
                      }}
                    >
                      {translation["Select your page"][trans]}
                    </p>
                    <div style={{ width: "100%", position: "relative" }}>
                      <div
                        style={{
                          display: "flex",
                          overflowX: "scroll",
                          position: "relative",
                          left: "-25px",
                          paddingLeft: "5px",
                          width: "calc(100% - 50px)",
                        }}
                        id="page-div"
                      >
                        {user &&
                          user.fbPageTokens &&
                          user.fbPageTokens.length > 0 &&
                          user.fbPageTokens.map((tokenItem, key) => (
                            <div
                              style={
                                this.state.selectedPage === tokenItem.id
                                  ? {
                                    padding: "5px 10px",
                                    whiteSpace: "nowrap",
                                    border: "1px solid #2680eb",
                                    marginRight: "5px",
                                    color: "#fff",
                                    backgroundColor: "#2680eb",
                                  }
                                  : {
                                    padding: "5px 10px",
                                    whiteSpace: "nowrap",
                                    border: "1px solid #dfdfdf",
                                    marginRight: "5px",
                                  }
                              }
                              className="rb"
                              key={key}
                              onClick={async () => {
                                if (this.state.adsType != "Facebook Like")
                                  this.getPagePost({ tokenItem });
                                else this.getPageDetail({ tokenItem });
                              }}
                            >
                              {tokenItem.name}
                            </div>
                          ))}
                      </div>
                      {user &&
                        user.fbPageTokens &&
                        user.fbPageTokens.length > 0 && (
                          <span
                            style={{
                              display: "inline-block",
                              position: "absolute",
                              right: "35px",
                              top: "3px",
                              width: "30px",
                              height: "30px",
                              lineHeight: "30px",
                              textAlign: "center",
                              backgroundColor: "#cacaca",
                              color: "#fff",
                              fontFamily: "monospace",
                              fontWeight: "bold",
                              fontSize: "20px",
                            }}
                            onTouchStart={() => {
                              this.setState({ scrolling: true });
                            }}
                            onTouchEnd={() => {
                              this.setState({ scrolling: false });
                            }}
                            className="rb"
                          >
                            {/* > */}
                          </span>
                        )}
                    </div>
                    <div
                      style={{
                        padding: "2px 5px 5px 5px",
                        whiteSpace: "nowrap",
                        border: "1px solid transparent",
                        marginRight: "5px",
                        color: "#007bff",
                        position: "relative",
                        left: "-20px",
                        display: "inline-block",
                        border: "1px solid #dfdfdf",
                        marginTop: "5px",
                      }}
                      onClick={() => {
                        this.setState({ openModal: true });
                      }}
                      className="rb"
                    >
                      + Fan Page
                    </div>
                    <p
                      style={{
                        fontSize: "25px",
                        fontWeight: "700",
                        marginBottom: "10px",
                        marginTop: "20px",
                      }}
                    >
                      {translation["Select your post"][trans]}
                    </p>
                  </div>
                  <div style={{ marginTop: "290px" }}>
                    <p style={{ color: "#8a8a8a" }}>
                      {/*Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.*/}
                    </p>
                    {this.state.fbPagePosts &&
                      this.state.fbPagePosts.length > 0 &&
                      this.state.fbPagePosts.map((post, key) => (
                        <div
                          key={key}
                          onClick={async () => {
                            /*this.setState({ selectedPost: post, step: 2 });*/
                            this.setState({ selectedPost: null });
                            const data = await this.checkExist({
                              postId: post.id,
                            });
                            if (!data) {
                              this.setState({ selectedPost: post });
                            } else {
                              alert("貼文已推廣，如須增加預算請前往加強推廣頁");
                            }
                          }}
                          style={{
                            padding: "5px",
                            marginBottom: "1rem",
                            border: "1px solid #dfdfdf",
                            backgroundColor:
                              this.state.selectedPost &&
                                this.state.selectedPost.id === post.id
                                ? "#2680eb"
                                : "#fff",
                            overflowWrap: "break-word",
                          }}
                          className="rb"
                        >
                          {post.attachments && (
                            /*<img
                            src={post.attachments.data[0].media.image.src}
                            style={{ width: "100%", marginTop: "10px" }}
                          />*/
                            <div
                              style={{
                                paddingBottom: "56%",
                                width: "100%",
                                backgroundPosition: "50%",
                                background: `url(${post.attachments.data[0].media.image.src}) 50% 50% / cover`,
                                backgroundSize: "cover",
                              }}
                              className="rb"
                            ></div>
                          )}
                          <p
                            style={{
                              marginBottom: "0",
                              color:
                                this.state.selectedPost &&
                                  this.state.selectedPost.id === post.id
                                  ? "#fff"
                                  : "#333",
                              textOverflow: "ellipsis",
                              wordWrap: "break-word",
                              overflow: "hidden",
                              maxHeight: "4.5em",
                              lineHeight: "1.5em",
                            }}
                          >
                            {post.message}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
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
            <p>請按"編輯設定"增加專頁</p>
            <button
              style={{ width: "100px", height: "50px" }}
              className="btn big-blue-btn mr-2"
              onClick={() => {
                this.FacebookLogin();
                this.setState({ openModal: false });
              }}
            >
              OK
            </button>
          </div>
        </Modal>
        <Footer {...this.state.globalState} {...this.props} />
      </div>
    );
  }
}

export default withLayout(MakeAnAd);
