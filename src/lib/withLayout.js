import React from "react";
//import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
//import Menu from "../components/Menu";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
//import { FileTransfer } from "@ionic-native/file-transfer/ngx";
//import { File } from "@ionic-native/file/ngx";
//import { Zip } from "@ionic-native/zip/ngx";
import { Facebook } from "@ionic-native/facebook/ngx";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { Plugins } from "@capacitor/core";
import { Kit } from "../models/Kit";

import Modal from "react-modal";
import trans from "./translation";
var _state = {
  user: null,
  registrationData: null,
  fbToken: null,
  fbTokenData: null,
  makeAnAd: null,
  translation: trans,
  trans: "eng",//"cht",
  visitor: null,
  currentViewPost: null,
};
const Axios = require("axios");

//red #f44336

function withLayout(BaseComponent) {
  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        openModal: false,
        alertMsg: "",
      };
    }

    _ionic = {
      facebook: new Facebook(),
      socialSharing: new SocialSharing(),
      keyboard: Plugins.Keyboard,
      kit: Kit,
      //barcodeScanner: new BarcodeScanner(),
      //file: new File(),
      //fileTransfer: new FileTransfer().create(),
      //zip: new Zip()
    };

    _setting = {
      // serverUrl: "http://18.163.68.188:8800/api/v1/aspf",
      // serverUrl: "http://195.201.41.195:8800/api/v1/aspf",
      serverUrl: "http://localhost:8800/api/v1/aspf",
    };
    //192.168.1.23
    //192.168.3.24
    //18.163.68.188

    componentDidMount = async () => {
      //this.resetRegistrationData();
      window.alert = (message) => {
        this.setState({ alertMsg: message, openModal: true });
      };
      console.log(_state);
      if (!_state.visitor) await this.setVisitorPriceList();

      /*const loginCredential = await Kit.findLogin();
      if (loginCredential && !_state.user) {
        await this.login(loginCredential);
      }*/
    };

    /*login = async (loginCredential) => {
      const result = await Axios({
        method: "post",
        url: this._setting.serverUrl + "/signin",
        data: loginCredential,
      });
      if (result.status === 200 && result.data.type === "success") {
        let user = result.data.message;
        _state.user = user;
        this.setGlobalState(_state);
        this.props.history.push(`/home`);
      } else {
        Kit.removeAll();
      }
    };*/

    setVisitorPriceList = async () => {
      const result = await Axios({
        method: "post",
        url: this._setting.serverUrl + "/get-visitor-price-list",
        data: { friend: 300, currency: "HKD" },
      });
      if (result.status === 200 && result.data.type === "success") {
        _state.visitor = result.data.message;
      }
    };

    resetRegistrationData = () => {
      _state.registrationData = {
        email: "",
        password: "",
        mobile: "",
        mobilePrefixCountry: "",
        fbId: "",
        smsId: "",
      };
    };

    setGlobalState = (state) => {
      _state = state;
    };

    getGlobalState = () => {
      return _state;
    };

    updateUser = async () => {
      const result = await Axios({
        method: "post",
        url: this._setting.serverUrl + "/signin",
        data: { email: _state.user.email, password: _state.user.password },
      });
      if (result.status === 200 && result.data.type === "success") {
        let user = result.data.message;
        _state.user = user;
      } else {
        alert(result.data.message);
      }
    };

    render() {
      const theme = createMuiTheme({
        typography: {
          fontFamily: [
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
            "Microsoft YaHei",
            "STHeiti",
          ].join(","),
        },
      });
      return (
        <div>
          <ThemeProvider theme={theme}>
            <div>
              {/*<Menu />*/}
              <div className="frs-hide-scroll">
                <BaseComponent
                  _ionic={this._ionic}
                  {...this.props}
                  _setting={this._setting}
                  setGlobalState={this.setGlobalState}
                  getGlobalState={this.getGlobalState}
                  updateUser={this.updateUser}
                  resetRegistrationData={this.resetRegistrationData}
                />
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
                  <p>{this.state.alertMsg}</p>
                  <button
                    style={{ width: "100px", height: "50px" }}
                    className="btn big-blue-btn"
                    onClick={() => {
                      this.setState({ openModal: false });
                    }}
                  >
                    OK
                  </button>
                </div>
              </Modal>
            </div>
          </ThemeProvider>
        </div>
      );
    }
  }

  return App;
}

export default withLayout;
