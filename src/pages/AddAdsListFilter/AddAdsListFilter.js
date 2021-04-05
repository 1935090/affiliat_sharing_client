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
} from "@material-ui/core";
import withLayout from "../../lib/withLayout";

class AddAdsListFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adsType: this.props.location.state.adsType || "all",
      status: this.props.location.state.status || "all",
      searchWord: this.props.location.state.searchWord || "",
      globalState: this.props.getGlobalState(),
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    const translation = this.state.globalState.translation;
    const trans = this.state.globalState.trans;
    return (
      <div style={{ padding: "0 10px" }}>
        <div
          style={{
            height: "60px",
            padding: "10px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Link
              to={{
                pathname: "/add-ads",
                state: {
                  ...this.state,
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
              {translation["Filters"][trans]}
            </span>
          </div>
          <div>
            <span
              style={{ color: "2680EB", fontSize: "15px" }}
              onClick={() => {
                this.setState({ adsType: "", status: "" });
              }}
            >
              {translation["Clear all"][trans]}
            </span>
          </div>
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
              padding: "20px 15px",
            }}
          >
            <FormControl classes={{ root: "w-100" }}>
              <InputLabel shrink htmlFor="age-native-label-placeholder">
                {translation["Advertisement Type"][trans]}
              </InputLabel>
              <Select
                inputProps={{
                  name: "age",
                  id: "age-native-label-placeholder",
                }}
                value={this.state.adsType}
                onChange={(e) => {
                  this.setState({ adsType: e.target.value });
                }}
              >
                <MenuItem value={"all"}>ALL</MenuItem>
                <MenuItem value={"Facebook Post"}>
                  {translation["Facebook Post Share"][trans]}
                </MenuItem>
                <MenuItem value={"Facebook Live"}>
                  {translation["Facebook Live Share"][trans]}
                </MenuItem>
              </Select>
            </FormControl>
            <div style={{ marginTop: "30px" }}>
              <FormControl classes={{ root: "w-100" }}>
                <InputLabel shrink htmlFor="age-native-label-placeholder">
                  {translation["Ad Status"][trans]}
                </InputLabel>
                <Select
                  inputProps={{
                    name: "age",
                    id: "age-native-label-placeholder",
                  }}
                  value={this.state.status}
                  onChange={(e) => {
                    this.setState({ status: e.target.value });
                  }}
                >
                  <MenuItem value={"all"}>ALL</MenuItem>
                  <MenuItem value={"onGoing"}>
                    {translation["On Going"][trans]}
                  </MenuItem>
                  <MenuItem value={"stopped"}>
                    {translation["Stopped"][trans]}
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        <div style={{ width: "100%", padding: "0 20px" }}>
          <Link
            to={{
              pathname: "/add-ads",
              state: {
                ...this.state,
              },
            }}
          >
            <button
              style={{ height: "50px", width: "100%" }}
              className="btn big-blue-btn"
            >
              Apply
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default withLayout(AddAdsListFilter);
