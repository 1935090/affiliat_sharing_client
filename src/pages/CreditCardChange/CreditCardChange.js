import React, { Component } from "react";
import { Link } from "react-router-dom";
import withLayout from "../../lib/withLayout";
import {
  Input,
  FormControl,
  InputLabel,
  InputAdornment,
  NativeSelect,
  Select,
  MenuItem,
} from "@material-ui/core";
import NumberFormat from "react-number-format";
const Axios = require("axios");

class CreditCardChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: "",
      name: "",
      exp_month: "",
      exp_year: "",
      cvc: "",
      globalState: this.props.getGlobalState(),
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  next = async () => {
    if (
      this.state.number &&
      this.state.exp_month &&
      this.state.exp_year &&
      this.state.cvc
    ) {
      let globalState = this.state.globalState;
      const result = await Axios({
        method: "post",
        url: this.props._setting.serverUrl + "/submit-payment",
        data: {
          number: this.state.number,
          exp_month: this.state.exp_month,
          exp_year: this.state.exp_year,
          cvc: this.state.cvc,
          payment_type: "creditCard",
          stripe_charge: false,
          email: globalState.user.email,
          password: globalState.user.password,
        },
      });
      if (result.status === 200 && result.data.type === "success") {
        await this.props.updateUser();
        if (this.props.location.state && this.props.location.state.back) {
          this.props.history.push(this.props.location.state.back);
        } else {
          this.props.history.push(`/credit-card-change-result`);
        }
      } else {
        alert(result.data.message);
      }
    } else {
      alert("Please input all required fields");
    }
  };

  render() {
    const translation = this.state.globalState.translation;
    const trans = this.state.globalState.trans;
    return (
      <div style={{ padding: "0 10px" }}>
        <div style={{ height: "60px", padding: "10px 0" }}>
          <Link
            to={
              this.props.location.state && this.props.location.state.back
                ? this.props.location.state.back
                : `/credit-card-account`
            }
          >
            <img
              src="/static/images/svg/blueback.svg"
              style={{ marginRight: "25px", marginLeft: "10px", width: "12px" }}
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
            Payout
          </span>
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
                marginBottom: "40px",
              }}
            >
              Fill your Credit Card
            </p>
            <form>
              <div style={{ marginBottom: "40px" }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="standard-adornment-amount">
                    {translation["Credit card number"][trans]}
                  </InputLabel>
                  <Input
                    id="standard-adornment-amount"
                    startAdornment={
                      <InputAdornment position="start"></InputAdornment>
                    }
                    onChange={(e) => {
                      this.setState({ number: e.target.value });
                    }}
                    value={this.state.number}
                    inputProps={{
                      maxLength: "20",
                      pattern: "[0-9]*",
                      inputMode: "numeric",
                      type: "number",
                    }}
                  />
                </FormControl>
              </div>
              {/*<div style={{ marginBottom: "40px" }}>
              <FormControl fullWidth>
                <InputLabel htmlFor="standard-adornment-amount">
                  Name
                </InputLabel>
                <Input
                  id="standard-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start"></InputAdornment>
                  }
                  onChange={(e) => {
                    this.setState({ name: e.target.value });
                  }}
                  value={this.state.name}
                />
              </FormControl>
                </div>*/}
              <div style={{ marginBottom: "40px" }}>
                <div
                  style={{
                    width: "45%",
                    display: "inline-block",
                    marginRight: "10px",
                  }}
                >
                  <FormControl classes={{ root: "w-100" }}>
                    <InputLabel shrink htmlFor="age-native-label-placeholder">
                      {translation["Expiration month"][trans]}
                    </InputLabel>
                    <Select
                      inputProps={{
                        name: "age",
                        id: "age-native-label-placeholder",
                      }}
                      onChange={(e) => {
                        this.setState({ exp_month: e.target.value });
                      }}
                      value={this.state.exp_month}
                    >
                      <MenuItem value={"01"}>01</MenuItem>
                      <MenuItem value={"02"}>02</MenuItem>
                      <MenuItem value={"03"}>03</MenuItem>
                      <MenuItem value={"04"}>04</MenuItem>
                      <MenuItem value={"05"}>05</MenuItem>
                      <MenuItem value={"06"}>06</MenuItem>
                      <MenuItem value={"07"}>07</MenuItem>
                      <MenuItem value={"08"}>08</MenuItem>
                      <MenuItem value={"09"}>09</MenuItem>
                      <MenuItem value={"10"}>10</MenuItem>
                      <MenuItem value={"11"}>11</MenuItem>
                      <MenuItem value={"12"}>12</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div style={{ width: "45%", display: "inline-block" }}>
                  <FormControl classes={{ root: "w-100" }}>
                    <InputLabel shrink htmlFor="age-native-label-placeholder">
                      {translation["Expiration year"][trans]}
                    </InputLabel>
                    <Select
                      inputProps={{
                        name: "age",
                        id: "age-native-label-placeholder",
                      }}
                      onChange={(e) => {
                        this.setState({ exp_year: e.target.value });
                      }}
                      value={this.state.exp_year}
                    >
                      <MenuItem value={"20"}>20</MenuItem>
                      <MenuItem value={"21"}>21</MenuItem>
                      <MenuItem value={"22"}>22</MenuItem>
                      <MenuItem value={"23"}>23</MenuItem>
                      <MenuItem value={"24"}>24</MenuItem>
                      <MenuItem value={"25"}>25</MenuItem>
                      <MenuItem value={"26"}>26</MenuItem>
                      <MenuItem value={"27"}>27</MenuItem>
                      <MenuItem value={"28"}>28</MenuItem>
                      <MenuItem value={"29"}>29</MenuItem>
                      <MenuItem value={"30"}>30</MenuItem>
                      <MenuItem value={"31"}>31</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div style={{ marginBottom: "40px" }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="standard-adornment-amount">
                    {translation["Security code"][trans]}
                  </InputLabel>
                  <Input
                    id="standard-adornment-amount"
                    startAdornment={
                      <InputAdornment position="start"></InputAdornment>
                    }
                    type="password"
                    onChange={(e) => {
                      this.setState({ cvc: e.target.value });
                    }}
                    value={this.state.cvc}
                    inputProps={{
                      maxLength: "4",
                      pattern: "[0-9]*",
                      inputMode: "numeric",
                    }}
                    onKeyUp={(e) => {
                      if (e.keyCode === 13) {
                        this.next();
                        this.props._ionic.keyboard.hide();
                        window.blur();
                      }
                    }}
                  />
                </FormControl>
              </div>
            </form>
            <img
              src="/static/images/Powered by Stripe - blurple.png"
              style={{
                width: "160px",
                background: "#fff",
              }}
            />
            <div
              style={{
                top: "60px",
                marginTop: "15px",
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
            {translation["Confirm"][trans]}
          </button>
        </div>
      </div>
    );
  }
}

export default withLayout(CreditCardChange);
