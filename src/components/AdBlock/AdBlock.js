import React, { Component } from "react";
import { Link } from "react-router-dom";

class AdBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const ads = this.props.ads;
    const user = this.props.user;
    const visitor = this.props.visitor;
    const shared = this.props.shared || null;
    return (
      <Link
        to={{
          pathname: "/share-ads-detail",
          state: {
            ads: ads,
          },
        }}
      >
        <div
          style={{
            overflow: "hidden",
            boxShadow: "0 0 10px rgba(141,141,141,0.16)",
          }}
          className="rb"
        >
          {/*<img
            style={{
              width: "100%",
              overflow: "hidden",
            }}
            className="rb"
            src={
              ads.adsType === "Facebook Like"
                ? ads.fbPageDetail.cover.source
                : ads.selectedPost.attachments.data[0].media.image.src
            }
          />*/}
          <div
            style={{
              paddingBottom: "56%",
              width: "100%",
              backgroundPosition: "50%",
              background: `url(${ads.adsType === "Facebook Like"
                  ? ads.fbPageDetail.cover.source
                  : ads.selectedPost.attachments.data[0].media.image.src
                }) 50% 50% / cover`,
              backgroundSize: "cover",
            }}
          ></div>
          <p
            style={{
              margin: "0",
              color: "#000",
              fontWeight: "500",
              fontSize: "20px",
              padding: "0 10px 0 15px",
              position: "relative",
              bottom: "-5px",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {ads.adsType === "Facebook Like"
              ? ads.fbPageDetail.name
              : ads.selectedPost.from.name}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              width: "100%",
              padding: "0 15px 5px 15px",
            }}
          >
            <div>
              {user && shared && (
                <p
                  style={{
                    margin: "0",
                    color: shared[ads._id] ? "#f44336" : "#00b131",
                    fontWeight: "bold",
                    fontSize: "10px",
                    position: "relative",
                    bottom: "-3px",
                  }}
                >
                  {shared[ads._id] ? "已分享" : "可分享"}
                </p>
              )}
              <p
                style={{
                  margin: "0",
                  color: "#585858",
                  fontWeight: "bold",
                  fontSize: "10px",
                }}
              >
                {ads.totalShare}+{" "}
                {ads.adsType === "Facebook Like" ? "likes" : "shares"}
              </p>
            </div>
            <div style={{ marginTop: "3px" }}>
              <span
                style={{
                  margin: "0 2px 0 0",
                  color: "#1e56f1",
                  fontWeight: "bold",
                  fontSize: "15px",
                  position: "relative",
                  top: "-1px",
                }}
              >
                $
              </span>
              <span
                style={{
                  margin: "0",
                  color: "#000",
                  fontWeight: "bold",
                  fontSize: "26px",
                  lineHeight: "1",
                  letterSpacing: "0",
                }}
              >
                {user && user.priceList
                  ? user.priceList[ads.speed]
                  : visitor && visitor.priceList
                    ? visitor.priceList[ads.speed]
                    : "x"}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default AdBlock;
