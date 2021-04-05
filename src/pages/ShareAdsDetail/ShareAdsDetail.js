import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import withLayout from "../../lib/withLayout";
import Moment from "moment";
import Tooltip from "@material-ui/core/Tooltip";
import NumberFormat from "react-number-format";
const Axios = require("axios");

class ShareAdsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      globalState: this.props.getGlobalState(),
      openModal: false,
      showCheckBtn: false,
      posted: false,
      openModalShare: false,
      openTooltip: true,
      disabled: false,
      show: false,
      overShare: null,
    };
  }
  componentDidMount = async () => {
    window.scrollTo(0, 0);
    let globalState = this.state.globalState;
    globalState.currentViewPost = this.props.location.state.ads._id;
    this.props.setGlobalState(globalState);
    if (globalState.user) {
      const result = await Axios({
        method: "post",
        url: this.props._setting.serverUrl + "/check-posted-this-ad",
        data: {
          email: globalState.user.email,
          password: globalState.user.password,
          adId: this.props.location.state.ads._id,
        },
      });
      if (result.status === 200 && result.data.type === "success") {
        if (result.data.message === false) {
          this.setState({ posted: false });
        } else {
          this.setState({ posted: true });
        }
      }
    } else {
      this.setState({ posted: false });
    }
    this.setState({ show: true });
    const setIntervalLog = setInterval(() => {
      if (
        this.state.overShare &&
        this.state.overShare.sharedSecondAgo &&
        this.state.overShare.sharedSecondAgo > 0
      ) {
        let overShare = JSON.parse(JSON.stringify(this.state.overShare));
        overShare.sharedSecondAgo = this.state.overShare.sharedSecondAgo - 1;
        this.setState({
          overShare,
        });
      }
    }, 1000);
  };
  checkShared = async () => {
    this.setState({ disabled: true });
    await this.sleep(1000);
    const ads = this.props.location.state.ads;
    let globalState = this.state.globalState;
    const result = await Axios({
      method: "post",
      url: this.props._setting.serverUrl + "/check-shared-ad",
      data: {
        email: globalState.user.email,
        password: globalState.user.password,
        adId: this.props.location.state.ads._id,
      },
    });
    if (result.status === 200 && result.data.type === "success") {
      this.props.history.push({
        pathname: `/shared-ads-result`,
        state: {
          money:
            this.state.globalState.user && this.state.globalState.user.priceList
              ? this.state.globalState.user.priceList[ads.speed]
              : this.state.globalState.visitor &&
                this.state.globalState.visitor.priceList
                ? this.state.globalState.visitor.priceList[ads.speed]
                : "x",
        },
      });
    } else {
      if (result.data.message) {
        this.props.history.push(`/shared-ads-result-fail`);
      } else {
        //alert("Checking unsuccessful");
        this.setState({ showCheckBtn: false });
      }
    }
    this.setState({ openModalShare: false, disabled: false });
  };

  checkSharedPre = async () => {
    const ads = this.props.location.state.ads;
    let globalState = this.state.globalState;
    this.setState({ disabled: false, overShare: null });
    const result = await Axios({
      method: "post",
      url: this.props._setting.serverUrl + "/check-shared-ad",
      data: {
        email: globalState.user.email,
        password: globalState.user.password,
        adId: this.props.location.state.ads._id,
        checkSharedPre: true,
      },
    });
    if (result.status === 200 && result.data)
      if (!result.data.overShared) {
        this.props._ionic.socialSharing
          .shareViaFacebook(
            "",
            "",
            this.props.location.state.ads.selectedPost.permalink_url
          )
          .then(() => {
            //this.checkShared();
            //this.setState({ showCheckBtn: true });
            setTimeout(() => {
              this.setState({ openModalShare: true });
            }, 1000);
          })
          .catch(() => {
            alert(
              this.state.globalState.translation[
              "Please install facebook app."
              ][this.state.globalState.trans]
            );
          });
        this.setState({
          disabled: false,
        });
      } else {
        console.log(result.data);
        this.setState({
          overShare: result.data,
          openModalSharePre: true,
          disabled: false,
        });
      }
    //this.setState({ openModalSharePre: false, disabled: false });
  };

  sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  FacebookLogin = async () => {
    const translation = this.state.globalState.translation;
    const trans = this.state.globalState.trans;
    this.props._ionic.facebook
      .login([
        "public_profile",
        "user_friends",
        "user_posts",
        "email",
        "user_birthday",
        "user_gender",
        "pages_show_list",
        "pages_read_engagement",
      ])
      .then(async (res) => {
        if (typeof res.status !== "undefined" && res.status === "connected") {
          let globalState = this.state.globalState;
          const result = await Axios({
            method: "post",
            url: this.props._setting.serverUrl + "/signin-facebook",
            data: {
              fbToken: res.authResponse,
              email: globalState.user.email,
              password: globalState.user.password,
            },
          });
          if (result.status === 200 && result.data.type === "success") {
            let user = result.data.message;
            globalState.user = user;
            this.props.setGlobalState(globalState);
            this.setState({ globalState });
          }
        } else {
          alert(translation["Fail to add fan pages"][trans]);
        }
        if (typeof res.status !== "undefined" && res.status === "connected") {
          //alert("Successfully added fan pages");
        } else {
          alert(translation["Fail to add fan pages"][trans]);
        }
      })
      .catch((e) => alert(translation["Fail to add fan pages"][trans]));
  };
  render() {
    const ads = this.props.location.state.ads;
    const translation = this.state.globalState.translation;
    const trans = this.state.globalState.trans;
    return (
      <div>
        {this.state.show && (
          <div>
            <span
              onClick={() => {
                window.history.back();
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: "20px",
                  top: "20px",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  borderRadius: "100px",
                }}
              >
                <img
                  style={{
                    width: "10px",
                  }}
                  src="/static/images/svg/blueback.svg"
                />
              </span>
            </span>

            <div
              style={{
                paddingBottom: "100%",
                width: "100%",
                background: `url(${ads.adsType === "Facebook Like"
                    ? ads.fbPageDetail.cover.source
                    : ads.selectedPost.attachments.data[0].media.image.src
                  }) 50% 50% / cover`,
              }}
              onClick={() => {
                this.setState({ openTooltip: false });
              }}
            >
              {/*<img
            style={{ width: "100%" }}
            src={
              ads.adsType === "Facebook Like"
                ? ads.fbPageDetail.cover.source
                : ads.selectedPost.attachments.data[0].media.image.src
            }
          />*/}
            </div>
            <div
              style={{
                position: "fixed",
                bottom: "0",
                padding: "40px 20px 10px 20px",
                backgroundColor: "#fff",
                boxShadow: "0 0 10px #e6e6e6",
                width: "100%",
                height: "calc(100vh - 100vw + 15px)",
                minHeight: "450px",
              }}
              className="rb1 rb2"
            >
              <div
                style={{
                  position: "absolute",
                  right: "20px",
                  top: 0,
                }}
              >
                {this.state.posted && (
                  <span
                    className="text-center"
                    style={{
                      marginRight: "10px",
                      fontWeight: "bold",
                      color: "#ffa836",
                    }}
                  >
                    已分享
                  </span>
                )}
                <img
                  style={{
                    width: "27px",
                  }}
                  src="/static/images/svg/tips.svg"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                }}
                onClick={() => {
                  this.setState({ openTooltip: false });
                }}
              >
                <div style={{ width: "calc(100% - 120px)" }}>
                  <p
                    style={{
                      color: "#2680eb",
                      fontSize: "18px",
                      fontWeight: "700",
                      margin: "0",
                    }}
                  >
                    EVENT
                  </p>
                  <p
                    style={{
                      color: "#000",
                      fontSize: "35px",
                      fontWeight: "500",
                      margin: "0",
                      whiteSpace: "nowrap",
                      overflow: "scroll",
                    }}
                  >
                    {ads.adsType === "Facebook Like"
                      ? ads.fbPageDetail.name
                      : ads.selectedPost.from.name}
                  </p>
                  <p
                    style={{
                      color: "#585858",
                      fontSize: "15px",
                      fontWeight: "700",
                      margin: "0",
                    }}
                  >
                    {ads.totalShare}+ {translation["shares"][trans]}
                  </p>
                  <p
                    style={{
                      color: "#ffa836",
                      fontSize: "15px",
                      fontWeight: "700",
                      marginTop: "3px",
                    }}
                  >
                    <img
                      style={{
                        marginRight: "10px",
                        verticalAlign: "top",
                        width: "19px",
                      }}
                      src="/static/images/svg/Recent.svg"
                    />
                    {translation["Recently"][trans]}
                  </p>
                </div>
                <div style={{ width: "120px" }}>
                  <p style={{ margin: 0, textAlign: "right" }}>
                    <span>
                      <span
                        style={{
                          fontSize: "20px",
                          fontWeight: "700",
                          color: "#1e56f1",
                        }}
                      >
                        ${" "}
                      </span>
                      <span
                        style={{
                          fontSize: "45px",
                          fontWeight: "700",
                          color: "#000",
                        }}
                      >
                        {this.state.globalState.user &&
                          this.state.globalState.user.priceList
                          ? this.state.globalState.user.priceList[ads.speed]
                          : this.state.globalState.visitor &&
                            this.state.globalState.visitor.priceList
                            ? this.state.globalState.visitor.priceList[ads.speed]
                            : "x"}
                      </span>
                    </span>
                  </p>
                  <p
                    style={{
                      color: "#ffa836",
                      fontSize: "15px",
                      fontWeight: "700",
                    }}
                  >
                    {Moment(ads.createDate).format("DD/MM/YYYY")}
                  </p>
                </div>
              </div>
              {ads.adsType != "Facebook Like" && (
                <div
                  style={{ height: "190px", overflowY: "scroll" }}
                  onClick={() => {
                    this.setState({ openTooltip: false });
                  }}
                >
                  {ads.adsType != "Facebook Like" && (
                    <p
                      style={{
                        fontSize: "25px",
                        fontWeight: "700",
                        color: "#000",
                        marginBottom: "0px",
                      }}
                    >
                      {translation["Description"][trans]}
                    </p>
                  )}
                  <ul
                    style={{
                      paddingLeft: "20px",
                      fontSize: "15px",
                      color: "#585858",
                      lineHeight: "2",
                      fontWeight: "700",
                    }}
                  >
                    <li style={{ whiteSpace: "pre" }}>
                      {ads.adsType === "Facebook Like"
                        ? ads.fbPageDetail.description
                        : ads.selectedPost.message}
                    </li>
                  </ul>
                </div>
              )}
              {ads.adsType != "Facebook Like" && (
                <div style={{ padding: "0 10px", marginTop: "10px" }}>
                  {!this.state.showCheckBtn && !this.state.posted && (
                    <div style={{ position: "relative" }}>
                      {this.state.openTooltip && (
                        <div
                          style={{
                            position: "absolute",
                            zIndex: 10,
                            top: "-90px",
                            width: "100%",
                            left: "0",
                            textAlign: "center",
                          }}
                          onClick={() => {
                            this.setState({ openTooltip: false });
                          }}
                        >
                          <span
                            style={{
                              fontSize: "14px",
                              backgroundColor: "#ececec",
                              color: "#000",
                              padding: "5px",
                              borderRadius: "5px",
                              display: "inline-block",
                            }}
                          >
                            請按以下設定分享廣告：
                            <br />
                            - 分享設定為公開
                            <br />- 留言部份不用填寫
                          </span>
                          <br />
                          <span
                            style={{
                              position: "relative",
                              top: "3px",
                              width: 0,
                              height: 0,
                              borderStyle: "solid",
                              borderWidth: "10px 5px 0 5px",
                              borderColor:
                                "#ececec transparent transparent transparent",
                            }}
                          ></span>
                        </div>
                      )}
                      <button
                        style={{ width: "100%", height: "50px" }}
                        className="btn big-blue-btn"
                        onClick={async (e) => {
                          if (
                            this.state.globalState.user &&
                            this.state.globalState.user.fbLongToken
                          ) {
                            await this.checkSharedPre();
                          } else if (this.state.globalState.user) {
                            this.FacebookLogin();
                          } else {
                            this.setState({ openModal: true });
                          }
                        }}
                      >
                        {translation["Share on Facebook"][trans]}
                      </button>
                    </div>
                  )}
                  {this.state.showCheckBtn && !this.state.posted && (
                    <button
                      style={{ width: "100%", height: "50px" }}
                      className="btn big-purple-btn"
                      onClick={() => {
                        //this.checkShared();
                        setTimeout(() => {
                          this.setState({ openModalShare: true });
                        }, 1000);
                      }}
                    >
                      check shared
                    </button>
                  )}
                  {this.state.posted && (
                    <div
                      style={{
                        width: "100%",
                        position: "absolute",
                        left: "0",
                        bottom: "0",
                        padding: "10px 20px",
                        backgroundColor: "#2680eb",
                        color: "#fff",
                        fontWeight: "bold",
                      }}
                      className="text-center"
                    >
                      {
                        translation[
                        "Please keep your post on Facebook for 7 days. If the post stays on Facebook for less than 7 days, you will NOT receive any reward."
                        ][trans]
                      }
                    </div>
                  )}
                </div>
              )}
              {ads.adsType === "Facebook Like" && !this.state.posted && (
                <div style={{ textAlign: "center" }}>
                  <iframe
                    src={`https://www.facebook.com/plugins/like.php?href=${ads.fbPageDetail.link}&width=68&layout=button&action=like&size=large&share=false&height=65&appId=594912067348188`}
                    width="68"
                    height="65"
                    scrolling="no"
                    frameborder="0"
                    allowTransparency="true"
                    allow="encrypted-media"
                  ></iframe>
                </div>
              )}
              {ads.adsType === "Facebook Like" && !this.state.posted && (
                <button
                  style={{ width: "100%", height: "50px" }}
                  className="btn big-purple-btn"
                  onClick={() => {
                    //this.checkShared();
                    setTimeout(() => {
                      this.setState({ openModalShare: true });
                    }, 1000);
                  }}
                >
                  check liked
                </button>
              )}
              {ads.adsType === "Facebook Like" && this.state.posted && (
                <div
                  style={{ width: "100%", height: "50px" }}
                  className="text-center"
                >
                  Liked Successfully. Please don't unlike in 7 days.
                </div>
              )}
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

            <Modal
              isOpen={this.state.openModalShare}
              onRequestClose={() => {
                this.setState({ openModalShare: false });
              }}
              shouldCloseOnOverlayClick={false}
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
                <p>{translation["Back to ASPF"][trans]}</p>
                <button
                  style={{ width: "100px", height: "50px" }}
                  className="btn big-blue-btn"
                  onClick={() => {
                    this.checkShared();
                    //this.setState({ openModalShare: false });
                  }}
                  disabled={this.state.disabled}
                >
                  OK
                </button>
              </div>
            </Modal>

            <Modal
              isOpen={this.state.openModalSharePre}
              onRequestClose={() => {
                this.setState({ openModalSharePre: false });
              }}
              shouldCloseOnOverlayClick={false}
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
                <p>
                  距離下次分享時間:
                  {this.state.overShare && this.state.overShare.sharedSecondAgo
                    ? Moment.duration(
                      this.state.overShare.sharedSecondAgo,
                      "seconds"
                    ).minutes() +
                    ":" +
                    Moment.duration(
                      this.state.overShare.sharedSecondAgo,
                      "seconds"
                    ).seconds()
                    : 0}
                </p>
                <p>
                  剩餘可分享帖文:
                  {this.state.overShare &&
                    this.state.overShare.fbPostShareCount}
                </p>
                <p>
                  剩餘可分享直播:
                  {this.state.overShare &&
                    this.state.overShare.fbLiveShareCount}
                </p>
                <button
                  style={{ width: "100px", height: "50px" }}
                  className="btn big-blue-btn"
                  onClick={() => {
                    this.setState({ openModalSharePre: false });
                  }}
                >
                  OK
                </button>
              </div>
            </Modal>
          </div>
        )}
      </div>
    );
  }
}

export default withLayout(ShareAdsDetail);
