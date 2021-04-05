import React, { Component } from "react";
import Footer from "../../components/Footer";
import AdBlock from "../../components/AdBlock";
import AdsFilter from "../../components/AdsFilter";
import withLayout from "../../lib/withLayout";
import { Link } from "react-router-dom";
import Balance from "../../components/Balance";
import NumberFormat from "react-number-format";
const Axios = require("axios");

class AdsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      globalState: this.props.getGlobalState(),
      adsList: null,
      adSharedList: {},
      loading: true,
      searchWord: "",
    };
  }
  componentDidMount = async () => {
    window.scrollTo(0, 0);
    await this.getList();
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
  getList = async () => {
    const type = this.props.location.state.type;
    if (type) {
      const result = await Axios({
        method: "post",
        url: this.props._setting.serverUrl + "/get-ads-by-type",
        data: {
          type,
          searchWord: this.state.searchWord,
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
        this.setState({
          adsList: result.data.message,
          loading: false,
          adSharedList: result.data.adSharedList,
        });
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
          <div
            style={{
              width: "100%",
              padding: "13px 20px 10px 20px",
              backgroundColor: "#fff",
              boxShadow: "0 0 10px #e6e6e6",
              zIndex: "999",
            }}
            className="rb3 rb4"
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: "2px",
                position: "relative",
              }}
            >
              <div style={{ width: "calc(100%)", position: "relative" }}>
                <img
                  src="/static/images/svg/Question-1.svg"
                  style={{
                    position: "absolute",
                    left: "5px",
                    top: "7px",
                    width: "21px",
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
                  onKeyUp={(e) => {
                    if (e.keyCode === 13) {
                      this.setState(
                        { searchWord: e.target.value, searchClick: true },
                        () => {
                          this.getList();
                          this.props._ionic.keyboard.hide();
                          window.blur();
                        }
                      );
                    }
                  }}
                  placeholder="Search"
                  className="input-cus-1 rb"
                />
              </div>
              {this.state.searchClick && (
                <span
                  style={{
                    fontFamily: "monospace",
                    background: "#8c8c8c",
                    color: "#fff",
                    width: "20px",
                    height: "20px",
                    lineHeight: "20px",
                    textAlign: "center",
                    borderRadius: "100px",
                    position: "absolute",
                    right: "5px",
                  }}
                  onClick={() => {
                    this.setState(
                      { searchWord: "", searchClick: false },
                      () => {
                        this.getList();
                      }
                    );
                  }}
                >
                  X
                </span>
              )}
            </div>
          </div>
          <div
            style={{
              padding: "10px 5px",
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {this.state.adsList &&
              this.state.adsList.length > 0 &&
              this.state.adsList.map((ads, key) => (
                <div
                  className="col-6"
                  style={{ padding: "0 5px", marginTop: "10px" }}
                  id={ads._id}
                >
                  <AdBlock
                    ads={ads}
                    user={this.state.globalState.user}
                    visitor={this.state.globalState.visitor}
                    shared={this.state.adSharedList}
                  />
                </div>
              ))}
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
        <Footer {...this.state.globalState} {...this.props} />
      </div>
    );
  }
}

export default withLayout(AdsList);
