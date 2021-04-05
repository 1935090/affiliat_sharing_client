import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import ShareAdsDetail from "./pages/ShareAdsDetail";
import ConfirmShareAdsDetail from "./pages/ConfirmShareAdsDetail";
import ConfirmShareAdsDetailResult from "./pages/ConfirmShareAdsDetailResult";
import AdsList from "./pages/AdsList";
import AdsListFilter from "./pages/AdsListFilter";
import Ads from "./pages/Ads";
import PaypalAccount from "./pages/PaypalAccount";
import PaypalChange from "./pages/PaypalChange";
import PaypalPayout from "./pages/PaypalPayout";
import SmsCode from "./pages/SmsCode";
import AddAds from "./pages/AddAds";
import CreditCardAccount from "./pages/CreditCardAccount";
import CreditCardChange from "./pages/CreditCardChange";
import CreditCardChangeResult from "./pages/CreditCardChangeResult";
import CreditCardConfirm from "./pages/CreditCardConfirm";
import AddAdsListFilter from "./pages/AddAdsListFilter";
import MakeAnAd from "./pages/MakeAnAd";
import MakeAnAdConfirm from "./pages/MakeAnAdConfirm";
import PromoAdResult from "./pages/PromoAdResult";
import MyAccount from "./pages/MyAccount";
import MyAccountDetail from "./pages/MyAccountDetail";
import MyAccountEdit from "./pages/MyAccountEdit";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import RegistrationDetail from "./pages/RegistrationDetail";
import SMSVerification from "./pages/SMSVerification";
import RegistrationResult from "./pages/RegistrationResult";
import CreditCardPayin from "./pages/CreditCardPayin";
import SharedAdvertising from "./pages/SharedAdvertising";
import PaypalEmail from "./pages/PaypalEmail";
import ShareAdsResult from "./pages/ShareAdsResult";
import ShareAdsResultFail from "./pages/ShareAdsResultFail";
import Receipt from "./pages/Receipt";
import PayoutHistory from "./pages/PayoutHistory";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/share-ads-detail" component={ShareAdsDetail} />
      <Route
        exact
        path="/confirm-share-ads-detail"
        component={ConfirmShareAdsDetail}
      />
      <Route
        exact
        path="/confirm-share-ads-detail-result"
        component={ConfirmShareAdsDetailResult}
      />
      <Route exact path="/ads-list" component={AdsList} />
      <Route exact path="/ads-list-filter" component={AdsListFilter} />
      <Route exact path="/ads" component={Ads} />
      <Route exact path="/paypal-account" component={PaypalAccount} />
      <Route exact path="/paypal-change" component={PaypalChange} />
      <Route exact path="/paypal-payout" component={PaypalPayout} />
      <Route exact path="/paypal-email" component={PaypalEmail} />
      <Route exact path="/sms-code" component={SmsCode} />
      <Route exact path="/add-ads" component={AddAds} />
      <Route exact path="/credit-card-account" component={CreditCardAccount} />
      <Route exact path="/credit-card-change" component={CreditCardChange} />
      <Route
        exact
        path="/credit-card-change-result"
        component={CreditCardChangeResult}
      />
      <Route exact path="/credit-card-Confirm" component={CreditCardConfirm} />
      <Route exact path="/add-ads-list-filter" component={AddAdsListFilter} />
      <Route exact path="/make-an-ad" component={MakeAnAd} />
      <Route exact path="/make-an-ad-confirm" component={MakeAnAdConfirm} />
      <Route exact path="/promo-ad-result" component={PromoAdResult} />
      <Route exact path="/my-account" component={MyAccount} />
      <Route exact path="/my-account-detail" component={MyAccountDetail} />
      <Route exact path="/my-account-edit" component={MyAccountEdit} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/registration" component={Registration} />
      <Route exact path="/registration-detail" component={RegistrationDetail} />
      <Route exact path="/sms-verification" component={SMSVerification} />
      <Route exact path="/registration-result" component={RegistrationResult} />
      <Route exact path="/credit-card-payin" component={CreditCardPayin} />
      <Route exact path="/shared-advertising" component={SharedAdvertising} />
      <Route exact path="/shared-ads-result" component={ShareAdsResult} />
      <Route exact path="/receipt" component={Receipt} />
      <Route exact path="/payout-history" component={PayoutHistory} />
      <Route
        exact
        path="/shared-ads-result-fail"
        component={ShareAdsResultFail}
      />
    </Switch>
  );
}

export default App;
