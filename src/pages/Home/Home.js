import withLayout from "../../lib/withLayout";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Footer from "../../components/Footer";
import AdBlock from "../../components/AdBlock";
import Balance from "../../components/Balance";
import Modal from "react-modal";
const Axios = require("axios");

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      globalState: this.props.getGlobalState(),
      openModal: false,
      adsList: null,
      loading: true,
    };
  }

  componentDidMount = async () => {
    window.scrollTo(0, 0);
    const loginCredential = await this.props._ionic.kit.findLogin();
    if (loginCredential && !this.state.globalState.user) {
      await this.login(loginCredential);
    } else {
      await this.getAds();
    }
  };

  getAds = async () => {
    const result = await Axios({
      method: "post",
      url: this.props._setting.serverUrl + "/get-ads-home",
      data: {
        email:
          this.state.globalState && this.state.globalState.user
            ? this.state.globalState.user.email
            : null,
        password:
          this.state.globalState && this.state.globalState.user
            ? this.state.globalState.user.password
            : null,
      },
    });
    if (result.status === 200 && result.data.type === "success") {
      this.setState({ adsList: result.data.message, loading: false });
    }
  };

  login = async (loginCredential) => {
    let globalState = this.state.globalState;
    globalState.user = null;
    const result = await Axios({
      method: "post",
      url: this.props._setting.serverUrl + "/signin",
      data: loginCredential,
    });
    if (result.status === 200 && result.data.type === "success") {
      let user = result.data.message;
      globalState.user = user;
      this.props.setGlobalState(globalState);
      await this.getAds();
    } else {
      this.props._ionic.kit.removeAll();
    }
  };

  render() {
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
    };
    const translation = this.state.globalState.translation;
    const trans = this.state.globalState.trans;
    return (
      <div>
        <div
          style={{
            display: "flex",
            position: "fixed",
            alignItems: "center",
            justifyContent: "space-between",
            top: 0,
            width: "100%",
            padding: "10px 20px",
            backgroundColor: "#2680eb",
            borderRadius: "0 0 5px 5px",
            zIndex: "999",
            height: "68px",
          }}
        >
          {/*<div
            style={{
              backgroundColor: "#fff",
              padding: "2px 4px 3px 4px",
              borderRadius: "4px",
            }}
            onClick={() => {
              if (this.state.globalState.user) {
                this.props.history.push(`/paypal-account`);
              } else {
                this.setState({ openModal: true });
              }
            }}
          >
            <img
              style={{ maxWidth: "25px" }}
              src="/static/images/svg/payin-1.svg"
            />
          </div>*/}
          <div>
            <img
              style={{ width: "100px" }}
              src="/static/images/svg/ASPD_Logo_white.svg"
            />
          </div>
          <div
            onClick={() => {
              if (this.state.globalState.user) {
                this.props.history.push(`/paypal-account`);
              } else {
                this.setState({ openModal: true });
              }
            }}
          >
            <Balance
              money={
                this.state.globalState.user &&
                  this.state.globalState.user.moneyEarn
                  ? this.state.globalState.user.moneyEarn
                  : 0
              }
              {...this.state.globalState}
            />
          </div>
        </div>
        <div style={{ marginTop: "68px", marginBottom: "56px" }}>
          <div style={{ padding: "10px 3px 20px 3px" }}>
            <Slider {...settings}>
              <div>
                <div style={{ position: "relative" }}>
                  <div style={{ padding: "15px" }}>
                    <img
                      style={{ width: "100%", borderRadius: "5px" }}
                      src="/static/images/svg/Background.svg"
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: "30px",
                      top: "30px",
                      color: "#fff",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "900",
                        fontSize: "40px",
                        margin: "0",
                      }}
                    >
                      Let's
                    </p>
                    <p style={{ fontWeight: "700", fontSize: "21px" }}>
                      Get Started
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div style={{ position: "relative" }}>
                  <div style={{ padding: "15px" }}>
                    <img
                      style={{ width: "100%", borderRadius: "5px" }}
                      src="/static/images/svg/Background.svg"
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: "30px",
                      top: "30px",
                      color: "#fff",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "900",
                        fontSize: "40px",
                        margin: "0",
                      }}
                    >
                      Let's
                    </p>
                    <p style={{ fontWeight: "700", fontSize: "21px" }}>
                      Get Started
                    </p>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                padding: "15px 15px 0 15px",
              }}
            >
              <div>
                <span className="title-3">
                  {translation["Most popular"][trans]}
                </span>
              </div>
              <div>
                <Link
                  to={{
                    pathname: "/ads-list",
                    state: {
                      type: "popular",
                    },
                  }}
                >
                  <span className="see-all">
                    {translation["See all"][trans]}
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div
            style={{
              margin: 0,
              width: "100%",
              overflowX: "scroll",
            }}
          >
            <div style={{ width: "100%", display: "flex" }}>
              {this.state.adsList &&
                this.state.adsList.popular &&
                this.state.adsList.popular.length > 0 &&
                this.state.adsList.popular.map((ads, key) => (
                  <div className="col-7" style={{ padding: "15px" }} key={key}>
                    <AdBlock
                      ads={ads}
                      shared={this.state.adsList.adSharedList}
                      user={this.state.globalState.user}
                      visitor={this.state.globalState.visitor}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                padding: "15px 15px 0 15px",
              }}
            >
              <div>
                <span className="title-3">
                  {translation["Recommended"][trans]}
                </span>
              </div>
              <div>
                <Link
                  to={{
                    pathname: "/ads-list",
                    state: {
                      type: "recommand",
                    },
                  }}
                >
                  <span className="see-all">
                    {translation["See all"][trans]}
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div
            style={{
              margin: 0,
              width: "100%",
              overflowX: "scroll",
            }}
          >
            <div style={{ width: "100%", display: "flex" }}>
              {this.state.adsList &&
                this.state.adsList.recommanded &&
                this.state.adsList.recommanded.length > 0 &&
                this.state.adsList.recommanded.map((ads, key) => (
                  <div className="col-7" style={{ padding: "15px" }} key={key}>
                    <AdBlock
                      ads={ads}
                      shared={this.state.adsList.adSharedList}
                      user={this.state.globalState.user}
                      visitor={this.state.globalState.visitor}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                padding: "15px 15px 0 15px",
              }}
            >
              <div>
                <span className="title-3">
                  {translation["Recently"][trans]}
                </span>
              </div>
              <div>
                <Link
                  to={{
                    pathname: "/ads-list",
                    state: {
                      type: "recently",
                    },
                  }}
                >
                  <span className="see-all">
                    {translation["See all"][trans]}
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div
            style={{
              margin: 0,
              width: "100%",
              overflowX: "scroll",
              paddingBottom: "20px",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <div style={{ width: "100%", display: "flex" }}>
              {this.state.adsList &&
                this.state.adsList.recently &&
                this.state.adsList.recently.length > 0 &&
                this.state.adsList.recently.map((ads, key) => (
                  <div className="col-7" style={{ padding: "15px" }} key={key}>
                    <AdBlock
                      ads={ads}
                      shared={this.state.adsList.adSharedList}
                      user={this.state.globalState.user}
                      visitor={this.state.globalState.visitor}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "#fff",
              display: this.state.loading ? "block" : "none",
            }}
          ></div>
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
        <Footer {...this.state.globalState} {...this.props} />
      </div>
    );
  }
}

export default withLayout(Home);
