import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      current: 0,
    };
  }
  componentDidMount = () => {
    console.log(this.props.location);
    if (this.props.location) {
      const path1 = ["/", "/home"];
      const path2 = ["/ads", "/ads-list"];
      const path3 = ["/add-ads"];
      const path4 = ["/my-account"];
      if (path1.includes(this.props.location.pathname)) {
        this.setState({ current: 1 });
      } else if (path2.includes(this.props.location.pathname)) {
        this.setState({ current: 2 });
      } else if (path3.includes(this.props.location.pathname)) {
        this.setState({ current: 3 });
      } else if (path4.includes(this.props.location.pathname)) {
        this.setState({ current: 4 });
      }
    }
  };
  render() {
    const translation = this.props.translation;
    const trans = this.props.trans;
    return (
      <div
        style={{
          position: "fixed",
          bottom: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          fontSize: "10px",
          width: "100%",
          padding: "10px 10px 5px 10px",
          backgroundColor: "#fff",
          boxShadow: "0 0 10px rgba(141,141,141,0.16)",
          fontWeight: "400",
        }}
        className="rb1 rb2"
      >
        <span style={{ width: "50px", textAlign: "center" }}>
          <Link to={`/home`}>
            <img
              src={
                this.state.current != 1
                  ? "/static/images/svg/homeblack.svg"
                  : "static/images/svg/homeblue.svg"
              }
              style={{ height: "18px" }}
            />
            <br />
            <span
              style={{
                color: this.state.current != 1 ? "#707070" : "#2680eb",
                transform: "scale(0.85)",
                display: "inline-block",
              }}
            >
              {translation["Home"][trans]}
            </span>
          </Link>
        </span>
        <span style={{ width: "50px", textAlign: "center" }}>
          <Link to={`/ads`}>
            <img
              src={
                this.state.current != 2
                  ? "/static/images/svg/adsblack.svg"
                  : "static/images/svg/adsblue.svg"
              }
              style={{ height: "20px" }}
            />
            <br />
            <span
              style={{
                color: this.state.current != 2 ? "#707070" : "#2680eb",
                transform: "scale(0.85)",
                display: "inline-block",
              }}
            >
              {translation["Ads"][trans]}
            </span>
          </Link>
        </span>
        <span style={{ width: "50px", textAlign: "center" }}>
          <Link to={`/add-ads`}>
            <img
              src={
                this.state.current != 3
                  ? "/static/images/svg/addblack.svg"
                  : "/static/images/svg/addblue.svg"
              }
              style={{ height: "18px" }}
            />
            <br />
            <span
              style={{
                color: this.state.current != 3 ? "#707070" : "#2680eb",
                transform: "scale(0.85)",
                display: "inline-block",
              }}
            >
              {translation["Add Ads"][trans]}
            </span>
          </Link>
        </span>
        <span
          style={{ width: "50px", textAlign: "center" }}
          onClick={() => {
            if (this.props.user) {
              this.props.history.push(`/my-account`);
            } else {
              this.setState({ openModal: true });
            }
          }}
        >
          <img
            src={
              this.state.current != 4
                ? "/static/images/svg/meblack.svg"
                : "/static/images/svg/meblue.svg"
            }
            style={{ height: "18px" }}
          />
          <br />
          <span
            style={{
              color: this.state.current != 4 ? "#707070" : "#2680eb",
              transform: "scale(0.85)",
              display: "inline-block",
            }}
          >
            {translation["Me"][trans]}
          </span>
        </span>

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
            <h5>{translation["Please login / register first."][trans]}</h5>
            <br />
            <Link to={`/login`}>
              <button
                style={{ width: "100px", height: "50px" }}
                className="btn big-blue-btn mr-2"
              >
                {translation["Login"][trans]}
              </button>
            </Link>
            <Link to={`/login`}>
              <button
                style={{ width: "100px", height: "50px" }}
                className="btn big-blue-btn"
              >
                {translation["Register"][trans]}
              </button>
            </Link>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Footer;
