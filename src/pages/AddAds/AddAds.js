import withLayout from "../../lib/withLayout";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import PromoAdsBlock from "../../components/PromoAdsBlock";
import Balance from "../../components/Balance";
import Modal from "react-modal";
import NumberFormat from "react-number-format";
const Axios = require("axios");

class AddAds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      globalState: this.props.getGlobalState(),
      openModal: false,
      adsList: null,
      filter: this.props.location.state ? this.props.location.state : {},
      searchWord:
        this.props.location.state && this.props.location.state.searchWord
          ? this.props.location.state.searchWord
          : "",
    };
  }
  componentDidMount = async () => {
    console.log(this.props.location);
    window.scrollTo(0, 0);
    await this.searchAds();
    if (this.state.globalState.currentViewPost) {
      let globalState = this.state.globalState;
      let elmnt = document.getElementById(
        this.state.globalState.currentViewPost
      );
      if (elmnt) {
        elmnt.scrollIntoView();
        delete globalState.currentViewPost;
        this.props.setGlobalState(globalState);
      }
    }
  };
  searchAds = async () => {
    let globalState = this.state.globalState;
    if (globalState.user) {
      const result = await Axios({
        method: "post",
        url: this.props._setting.serverUrl + "/get-merchant-ads",
        data: {
          email: globalState.user.email,
          password: globalState.user.password,
          filter: this.state.filter,
          searchWord: this.state.searchWord,
        },
      });
      if (result.status === 200 && result.data.type === "success") {
        this.setState({ adsList: result.data.message });
      }
    }
  };
  render() {
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
                this.props.history.push({
                  pathname: `/paypal-account`,
                  state: {
                    back: "/add-ads",
                  },
                });
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
        <div
          style={{ padding: "20px", marginTop: "66px", marginBottom: "66px" }}
        >
          <div style={{}}>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: "10px",
              }}
            >
              <div style={{ width: "calc(100% - 45px)", position: "relative" }}>
                <img
                  src="/static/images/svg/Question-1.svg"
                  style={{
                    position: "absolute",
                    left: "5px",
                    top: "7px",
                    width: "21px",
                  }}
                  onClick={() => {
                    this.searchAds();
                  }}
                />
                <input
                  style={{
                    height: "35px",
                    width: "100%",
                    backgroundColor: "#eeeeee",
                    border: "0",
                    paddingLeft: "40px",
                  }}
                  value={this.state.searchWord}
                  onChange={(e) => {
                    this.setState({ searchWord: e.target.value });
                  }}
                  placeholder="Search"
                  className="input-cus-1 rb"
                  onKeyUp={(e) => {
                    if (e.keyCode === 13) {
                      this.setState(
                        { searchWord: e.target.value, searchClick: true },
                        () => {
                          this.searchAds();
                          this.props._ionic.keyboard.hide();
                          window.blur();
                        }
                      );
                    }
                  }}
                />
              </div>
              <div>
                <Link
                  to={{
                    pathname: "/add-ads-list-filter",
                    state: {
                      ...this.state.filter,
                      searchWord: this.state.searchWord,
                    },
                  }}
                >
                  <img
                    style={{ maxWidth: "35px" }}
                    src="/static/images/svg/filter.svg"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: "#fff", padding: "10px" }}>
            <div style={{ textAlign: "center" }}>
              <img
                style={{ maxWidth: "100px", margin: "10px 0 20px 0" }}
                src="/static/images/svg/make an advertisement.svg"
              />
            </div>
            <button
              style={{ height: "50px", width: "100%" }}
              className="btn big-blue-btn"
              onClick={() => {
                if (this.state.globalState.user) {
                  this.props.history.push({
                    pathname: `/make-an-ad`,
                    state: { isNew: true },
                  });
                } else {
                  this.setState({ openModal: true });
                }
              }}
            >
              Make an advertisement
            </button>
          </div>
          <div style={{ marginTop: "30px" }}>
            <p className="title-3">{translation["Your Ad"][trans]}</p>
            {this.state.adsList &&
              this.state.adsList.length > 0 &&
              this.state.adsList.map((ads, key) => (
                <div style={{ marginTop: "20px" }} key={key} id={ads._id}>
                  <PromoAdsBlock
                    ads={ads}
                    {...this.state.globalState}
                    _setting={this.props._setting}
                  />
                </div>
              ))}
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

export default withLayout(AddAds);
