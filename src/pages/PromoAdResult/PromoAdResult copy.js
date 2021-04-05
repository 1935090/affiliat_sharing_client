import React, { Component } from "react";
import { Link } from "react-router-dom";
import withLayout from "../../lib/withLayout";
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
  }
  constructor(props) {
    super(props);
    this.state = {
      globalState: this.props.getGlobalState(),
      keepAdvertising: true,
    };
  }
  render() {
    return (
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
            Confirm
          </span>
        </div>

        <div>
          <span style={{ fontSize: "20px", color: "#2680EB" }}>On Going</span>
          <span style={{ float: "right" }}>
            <FormControlLabel
              classes={{ root: "m-0" }}
              control={
                <IOSSwitch
                  checked={this.state.keepAdvertising}
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
        </div>
        <div
          style={{
            display: "flex",
            overflowX: "scroll",
            position: "absolute",
            left: 0,
            width: "100%",
            textAlign: "center",
            overflowX: "scroll",
          }}
        >
          <div style={{ padding: "0 5px" }}>
            <div
              style={{
                whiteSpace: "nowrap",
                color: "#2680EB",
                borderBottom: "2px solid #2680EB",
                fontWeight: "700",
                lineHeight: "2",
                fontSize: "15px",
                width: "65px",
              }}
            >
              Summary
            </div>
          </div>
          <div style={{ padding: "0 5px" }}>
            <div
              style={{
                whiteSpace: "nowrap",
                color: "#a8ccf8",
                borderBottom: "2px solid #a8ccf8",
                fontWeight: "700",
                lineHeight: "2",
                fontSize: "15px",
                width: "65px",
              }}
            >
              Gender
            </div>
          </div>
          <div style={{ padding: "0 5px" }}>
            <div
              style={{
                whiteSpace: "nowrap",
                color: "#a8ccf8",
                borderBottom: "2px solid #a8ccf8",
                fontWeight: "700",
                lineHeight: "2",
                fontSize: "15px",
                width: "65px",
              }}
            >
              Age
            </div>
          </div>
          <div style={{ padding: "0 5px" }}>
            <div
              style={{
                whiteSpace: "nowrap",
                color: "#a8ccf8",
                borderBottom: "2px solid #a8ccf8",
                fontWeight: "700",
                lineHeight: "2",
                fontSize: "15px",
                width: "65px",
              }}
            >
              Location
            </div>
          </div>
          <div style={{ padding: "0 5px" }}>
            <div
              style={{
                whiteSpace: "nowrap",
                color: "#a8ccf8",
                borderBottom: "2px solid #a8ccf8",
                fontWeight: "700",
                lineHeight: "2",
                fontSize: "15px",
                width: "65px",
              }}
            >
              Total
            </div>
          </div>
        </div>
        <div style={{ marginTop: "50px", marginBottom: "100px" }}>
          <p
            style={{
              fontSize: "20px",
              fontWeight: "700",
              margin: "0",
              color: "#000",
            }}
          >
            Your budget
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
          <p style={{ fontSize: "18px", color: "#000", marginBottom: "20px" }}>
            3000
          </p>

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
            Area
          </p>
          <p style={{ fontSize: "18px", color: "#000", marginBottom: "10px" }}>
            Hong Kong
          </p>

          <p
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "#585858",
              margin: "0",
            }}
          >
            Gender
          </p>
          <p style={{ fontSize: "18px", color: "#000", marginBottom: "10px" }}>
            Male
          </p>

          <p
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "#585858",
              margin: "0",
            }}
          >
            Age range
          </p>
          <p style={{ fontSize: "18px", color: "#000", marginBottom: "10px" }}>
            20-25
          </p>

          <p
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "#585858",
              margin: "0",
            }}
          >
            friends range
          </p>
          <p style={{ fontSize: "18px", color: "#000", marginBottom: "20px" }}>
            500-1000
          </p>

          <p
            style={{
              fontSize: "20px",
              fontWeight: "700",
              margin: "0",
              color: "#000",
            }}
          >
            Date
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
          <p style={{ fontSize: "18px", color: "#000", marginBottom: "10px" }}>
            25 May 2020
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
          <p style={{ fontSize: "18px", color: "#000", marginBottom: "20px" }}>
            28 May 2020
          </p>
        </div>
        <div
          style={{
            width: "100%",
            padding: "0 20px",
            position: "fixed",
            bottom: "20px",
            left: 0,
          }}
        >
          <Link to={`/make-an-ad`}>
            <button
              style={{ height: "50px", width: "100%" }}
              className="btn big-blue-btn"
            >
              Promote again
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default withLayout(PromoAdResult);
