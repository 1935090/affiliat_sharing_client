import React, { Component } from "react";
import { Link } from "react-router-dom";
import withLayout from "../../lib/withLayout";
import NumberFormat from "react-number-format";

class ConfirmShareAdsDetailResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      <div>
        <div
          style={{
            height: "calc(100vh - 70px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "10px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <img
              src="/static/images/Successful@3x.png"
              style={{ width: "60%" }}
            />
            <br />
            {/*<p
              style={{
                fontSize: "25px",
                color: "fdad44",
                marginTop: "20px",
                fontWeight: "700",
              }}
            >
              + HKD $25
            </p>*/}
            <p
              style={{
                marginTop: "50px",
                fontWeight: "700",
                fontSize: "25px",
              }}
            >
              {translation["Promotion is successful"][trans]}
            </p>
            {
              <div
                style={{
                  width: "60%",
                  display: "inline-block",
                  color: "8a8a8a",
                  fontSize: "15px",
                }}
              >
                {
                  translation[
                    "Your ad has been successfully promoted. You may re-view your promoted ad under “Create”."
                  ][trans]
                }
                !
              </div>
            }
          </div>
        </div>
        <div style={{ width: "100%", padding: "0 30px" }}>
          <Link to={`/home`}>
            <button
              style={{ height: "50px", width: "100%" }}
              className="btn big-blue-btn"
            >
              {translation["Back to home page"][trans]}
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default withLayout(ConfirmShareAdsDetailResult);
