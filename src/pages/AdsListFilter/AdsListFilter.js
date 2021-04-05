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
import NumberFormat from "react-number-format";

class AdsListFilter extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
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
                pathname: "/ads-list",
                state: {
                  type: "popular",
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
              Filters
            </span>
          </div>
          <div>
            <span style={{ color: "2680EB", fontSize: "15px" }}>Clear All</span>
          </div>
        </div>
        <div
          style={{
            height: "calc(100vh - 130px)",
            marginBottom: "10px",
          }}
          className="rb"
        >
          {/*<div
            style={{
              width: "100%",
              padding: "20px 15px",
            }}
          >
            <FormControl classes={{ root: "w-100" }}>
              <InputLabel shrink htmlFor="age-native-label-placeholder">
                Price
              </InputLabel>
              <Select
                inputProps={{
                  name: "age",
                  id: "age-native-label-placeholder",
                }}
                value={""}
              >
                <MenuItem value="" disabled={true}>
                  Any Price
                </MenuItem>
                <MenuItem value={10}>50</MenuItem>
                <MenuItem value={10}>100</MenuItem>
              </Select>
            </FormControl>
              </div>*/}
          <div
            style={{
              width: "100%",
              padding: "20px 15px",
            }}
          >
            <FormControl classes={{ root: "w-100" }}>
              <InputLabel shrink htmlFor="age-native-label-placeholder">
                Advertisement Type
              </InputLabel>
              <Select
                inputProps={{
                  name: "age",
                  id: "age-native-label-placeholder",
                }}
                value={""}
              >
                <MenuItem value="" disabled={true}></MenuItem>
                <MenuItem value={10}>Facebook Post Share</MenuItem>
                <MenuItem value={10}>Live Share</MenuItem>
                <MenuItem value={10}>Facebook Like</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/*<div
            style={{
              width: "100%",
              padding: "20px 15px",
            }}
          >
            <FormControl classes={{ root: "w-100" }}>
              <InputLabel shrink htmlFor="age-native-label-placeholder">
                Business
              </InputLabel>
              <Select
                inputProps={{
                  name: "age",
                  id: "age-native-label-placeholder",
                }}
                value={""}
              >
                <MenuItem value="" disabled={true}>
                  Any Business
                </MenuItem>
                <MenuItem value={10}>Food</MenuItem>
                <MenuItem value={10}>Drink</MenuItem>
                <MenuItem value={10}>Car</MenuItem>
              </Select>
            </FormControl>
          </div>*/}
        </div>
        <div style={{ width: "100%", padding: "0 20px" }}>
          <Link
            to={{
              pathname: "/ads-list",
              state: {
                type: "popular",
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

export default AdsListFilter;
