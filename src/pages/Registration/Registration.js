import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  FormControl,
  InputLabel,
  InputAdornment,
  NativeSelect,
  Select,
  MenuItem,
} from "@material-ui/core";
import withLayout from "../../lib/withLayout";
const Axios = require("axios");

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      mobilePrefixCountry: "hk",
      globalState: this.props.getGlobalState(),
      smsId: null,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  getSMS = async () => {
    const translation = this.state.globalState.translation;
    const trans = this.state.globalState.trans;
    console.log(this.state.mobilePrefixCountry + this.state.mobile);
    const result = await Axios({
      method: "post",
      url: this.props._setting.serverUrl + "/send-sms-code",
      data: {
        mobilePrefixCountry: this.state.mobilePrefixCountry,
        mobile: this.state.mobile,
      },
    });

    if (result.status == 200 && result.data.type == "success") {
      return result.data.message;
    } else {
      console.log(result.data.error);
      return null;
    }
  };

  next = async () => {
    const translation = this.state.globalState.translation;
    const trans = this.state.globalState.trans;
    if (this.state.mobile && this.state.mobilePrefixCountry) {
      const smsId = await this.getSMS();
      console.log("send sms result:::::", smsId);
      if (smsId) {
        let globalState = this.state.globalState;
        globalState.registrationData = {
          mobile: this.state.mobile,
          mobilePrefixCountry: this.state.mobilePrefixCountry,
          smsId,
        };
        await this.props.setGlobalState(globalState);
        this.props.history.push(`/sms-verification`);
      } else {
        alert(
          translation["Phone has been registered or Send SMS failed."][trans]
        );
      }
    } else {
      alert(translation["Please fill in required fields"][trans]);
    }
  };

  render() {
    const translation = this.state.globalState.translation;
    const trans = this.state.globalState.trans;
    return (
      <div style={{ padding: "0 10px" }}>
        <div style={{ height: "60px", padding: "10px 0" }}>
          <Link to={`/login`}>
            <img
              src="/static/images/svg/blueback.svg"
              style={{
                marginRight: "25px",
                marginLeft: "10px",
                width: "12px",
              }}
            />
          </Link>
        </div>
        <div
          style={{
            height: "calc(100vh - 130px)",
            marginBottom: "10px",
          }}
          className="rb"
        >
          <div
            style={{
              width: "100%",
              padding: "30px 15px",
            }}
          >
            <p
              style={{
                fontSize: "25px",
                fontWeight: "700",
                marginBottom: "10px",
              }}
            >
              {translation["Registration"][trans]}
            </p>
            <p style={{ color: "8a8a8a", fontSize: "15px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div>
              <div
                style={{
                  display: "inline-block",
                  width: "70px",
                  marginRight: "20px",
                }}
              >
                <FormControl classes={{ root: "w-100" }}>
                  <InputLabel shrink htmlFor="age-native-label-placeholder">
                    {translation["Region"][trans]}
                  </InputLabel>
                  <Select
                    inputProps={{
                      name: "age",
                      id: "age-native-label-placeholder",
                    }}
                    value={this.state.mobilePrefixCountry}
                    onChange={(e) => {
                      this.setState({ mobilePrefixCountry: e.target.value });
                    }}
                  >
                    <MenuItem value={"hk"}>+852</MenuItem>
                    <MenuItem value={"tw"}>+886</MenuItem>
                    <MenuItem value={"macao"}>+853</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div
                style={{ display: "inline-block", width: "calc(100% - 90px)" }}
              >
                <FormControl fullWidth>
                  <InputLabel htmlFor="standard-adornment-amount">
                    {translation["Your phone number"][trans]}
                  </InputLabel>
                  <Input
                    id="standard-adornment-amount"
                    startAdornment={
                      <InputAdornment position="start"></InputAdornment>
                    }
                    onChange={(e) => {
                      this.setState({ mobile: e.target.value });
                    }}
                    value={this.state.mobile}
                    inputProps={{
                      pattern: "[0-9]*",
                      inputMode: "numeric",
                    }}
                    onKeyUp={(e) => {
                      if (e.keyCode == 13) {
                        this.next();
                        this.props._ionic.keyboard.hide();
                        window.blur();
                      }
                    }}
                  />
                </FormControl>
              </div>
            </div>
          </div>
        </div>
        <div style={{ width: "100%", padding: "0 20px" }}>
          <button
            style={{ height: "50px", width: "100%" }}
            className="btn big-blue-btn"
            onClick={() => {
              this.next();
            }}
          >
            {translation["Submit"][trans]}
          </button>
        </div>
      </div>
    );
  }
}

export default withLayout(Registration);
