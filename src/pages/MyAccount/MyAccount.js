import React, { Component } from "react";
import { Drawer } from "@material-ui/core";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import withLayout from "../../lib/withLayout";
import { Kit } from "../../models/Kit";
import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon,
} from "react-share";

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      globalState: this.props.getGlobalState(),
      tab: true,
      openModal: false,
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  setLang = (lang) => {
    let globalState = this.state.globalState;
    globalState.trans = lang;
    this.props.setGlobalState(globalState);
    this.setState({
      globalState: this.props.getGlobalState(),
      openModal: false,
    });
  };
  render() {
    const user = this.state.globalState.user;
    const translation = this.state.globalState.translation;
    const trans = this.state.globalState.trans;
    return (
      <div>
        <div
          style={{
            textAlign: "center",
            height: "230px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            background:
              "url('/static/images/me blackground2@3x.png') center center no-repeat",
            backgroundSize: "cover",
          }}
        >
          <img
            src="/static/images/More 2@3x.png"
            style={{ position: "absolute", top: "20px", right: "20px" }}
            onClick={() => {
              this.setState({ drawerOpen: true });
            }}
          />
          <img
            src={
              this.state.globalState.user && this.state.globalState.user.image
                ? this.state.globalState.user.image
                : "/static/images/0.jpg"
            }
            style={{
              borderRadius: "150px",
              width: "100px",
              height: "100px",
              border: "4px solid #fff",
            }}
          />
          <br />
          <span style={{ fontSize: "20px", color: "#fff", fontWeight: "700" }}>
            {user.name}{" "}
            {/*<Link to={`/my-account-detail`}>
              <img src="/static/images/Pen@3x.png" />
          </Link>*/}
          </span>
        </div>
        <div
          style={{
            height: "calc(100% - 230px)",
            position: "relative",
            top: "-10px",
          }}
        >
          <div style={{ display: "flex", textAlign: "center" }}>
            <div
              style={{
                width: "100%",
                backgroundColor: "#1a79e8",
                color: "#fff",
                fontSize: "20px",
                fontWeight: "700",
                padding: "8px 0",
              }}
              className="rb1 rb2"
            >
              {translation["shares"][trans]}
            </div>
          </div>
          <div>
            <div style={{ padding: "5px 30px", fontSize: "20px" }}>
              <Link
                to={{
                  pathname: `/paypal-account`,
                  state: {
                    back: "/my-account",
                  },
                }}
              >
                <div style={{ padding: "15px 0" }}>
                  <img
                    src="/static/images/svg/money.svg"
                    style={{ marginRight: "20px", width: "27px" }}
                  />{" "}
                  <span style={{ color: "#000" }}>Earning</span>
                </div>
              </Link>
              <Link to={`/payout-history`}>
                <div style={{ padding: "15px 0" }}>
                  <img
                    src="/static/images/svg/Result.svg"
                    style={{ marginRight: "20px", width: "27px" }}
                  />{" "}
                  <span style={{ color: "#000" }}>Payout History</span>
                </div>
              </Link>
            </div>
            <div
              style={{
                width: "100%",
                backgroundColor: "#1a79e8",
                color: "#fff",
                fontSize: "20px",
                fontWeight: "700",
                padding: "8px 0",
                textAlign: "center",
              }}
              className="rb1 rb2"
            >
              Menu
            </div>
            <div style={{ padding: "5px 30px", fontSize: "20px" }}>
              <Link
                to={{
                  pathname: `/credit-card-account`,
                  state: {
                    back: "/my-account",
                  },
                }}
              >
                <div style={{ padding: "15px 0" }}>
                  <img
                    src="/static/images/svg/payin.svg"
                    style={{ marginRight: "18px", width: "27px" }}
                  />{" "}
                  <span style={{ color: "#000" }}>Spending</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <Drawer
          anchor="bottom"
          open={this.state.drawerOpen}
          onClose={() => {
            this.setState({ drawerOpen: false });
          }}
          classes={{ paper: "drawer-custom" }}
        >
          <div style={{ padding: "5px 20px" }} className="rb">
            <div
              style={{ padding: "15px 0" }}
              className="bottom-menu-block"
              onClick={() => {
                window.open("https://aspf.info/index/index/help");
                this.setState({ drawerOpen: false });
              }}
            >
              <img
                src="/static/images/svg/question.svg"
                style={{ marginRight: "15px", width: "29px" }}
              />{" "}
              {translation["Help center"][trans]}
            </div>
            {/*<div
              style={{ padding: "15px 0" }}
              className="bottom-menu-block"
              onClick={() => {
                this.setState({ openModalShare: true, drawerOpen: false });
              }}
            >
              <img
                src="/static/images/svg/gift.svg"
                style={{ marginRight: "17px", width: "27px" }}
              />{" "}
              {translation["Invite friends"][trans]}
            </div>*/}
            <div style={{ padding: "15px 0" }} className="bottom-menu-block">
              <img
                src="/static/images/Notice@3x.png"
                style={{
                  marginRight: "23px",
                  marginLeft: "5px",
                }}
              />{" "}
              {translation["Notice"][trans]}
            </div>
            <div
              style={{ padding: "15px 0" }}
              className="bottom-menu-block"
              onClick={() => {
                this.setState({ openModalAbout: true, drawerOpen: false });
              }}
            >
              <img
                src="/static/images/svg/info.svg"
                style={{ marginRight: "15px", width: "29px" }}
              />{" "}
              {translation["About"][trans]}
            </div>
            <div
              style={{ padding: "15px 0" }}
              className="bottom-menu-block"
              onClick={() => {
                this.setState({ openModal: true, drawerOpen: false });
              }}
            >
              <img
                src="/static/images/svg/world.svg"
                style={{
                  marginRight: "14px",
                  width: "29px",
                }}
              />{" "}
              {translation["Language"][trans]}
            </div>
            <div
              className="bottom-menu-block"
              onClick={async () => {
                await this.props._ionic.kit.removeAll();
                this.props.history.push(`/login`);
              }}
              style={{ padding: "15px 0" }}
            >
              <img
                src="/static/images/svg/Logout.svg"
                style={{
                  marginRight: "15px",
                  marginLeft: "5px",
                  width: "24px",
                }}
              />{" "}
              {this.state.globalState.user && this.state.globalState.user.email
                ? translation["Logout"][trans]
                : translation["Login"][trans]}
            </div>
          </div>
        </Drawer>
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
            <button
              style={{ width: "100px", height: "50px" }}
              className="btn big-blue-btn mr-2"
              onClick={() => {
                this.setLang("eng");
              }}
            >
              Eng
            </button>
            <button
              style={{ width: "100px", height: "50px" }}
              className="btn big-blue-btn mr-2"
              onClick={() => {
                this.setLang("cht");
              }}
            >
              繁中
            </button>
            <button
              style={{ width: "100px", height: "50px" }}
              className="btn big-blue-btn"
              onClick={() => {
                this.setLang("chi");
              }}
            >
              简中
            </button>
          </div>
        </Modal>
        <Modal
          isOpen={this.state.openModalAbout}
          onRequestClose={() => {
            this.setState({ openModalAbout: false });
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
            <a
              style={{ width: "200px" }}
              className="btn big-blue-btn-3"
              href={translation["post link policy"][trans]}
              target="_blank"
              onClick={() => {
                this.setState({ openModalAbout: false });
              }}
            >
              帖子刊登政策
            </a>
            <br />
            <br />
            <a
              style={{ width: "200px" }}
              className="btn big-blue-btn-3"
              href={translation["privacy link policy"][trans]}
              target="_blank"
              onClick={() => {
                this.setState({ openModalAbout: false });
              }}
            >
              私隱政策
            </a>
            <br />
            <br />
            <a
              style={{ width: "200px" }}
              className="btn big-blue-btn-3"
              href={translation["service link policy"][trans]}
              target="_blank"
              onClick={() => {
                this.setState({ openModalAbout: false });
              }}
            >
              服務條款
            </a>
            <br />
            <br />
            <a
              style={{ width: "200px" }}
              className="btn big-blue-btn-3"
              href={translation["trade link policy"][trans]}
              target="_blank"
              onClick={() => {
                this.setState({ openModalAbout: false });
              }}
            >
              交易條款
            </a>
          </div>
        </Modal>
        <Modal
          isOpen={this.state.openModalShare}
          onRequestClose={() => {
            this.setState({ openModalShare: false });
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
            <span style={{ marginRight: "10px" }}>
              <WhatsappShareButton
                onClick={() => {
                  this.setState({ openModalShare: false });
                }}
                url={translation["post link policy"][trans]}
              >
                <WhatsappIcon size={45} round={true} />
              </WhatsappShareButton>
            </span>
            <span style={{ marginRight: "10px" }}>
              <TelegramShareButton
                onClick={() => {
                  this.setState({ openModalShare: false });
                }}
                url={translation["post link policy"][trans]}
              >
                <TelegramIcon size={45} round={true} />
              </TelegramShareButton>
            </span>
          </div>
        </Modal>
        <Footer {...this.state.globalState} {...this.props} />
      </div>
    );
  }
}

export default withLayout(MyAccount);
