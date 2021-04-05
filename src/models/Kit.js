const Storage = require("@capacitor/core").Plugins.Storage;

const Kit = {
  /*async findAll() {
    const keyObject = await Storage.keys();
    let kitList = [];
    for (let i = 0; i < keyObject.keys.length; i++) {
      let kitJson = await this.findById({ kitId: keyObject.keys[i] });
      if (kitJson.stageContainer) {
        kitJson.stageContainer = {};
      }
      if (kitJson.programContainer) {
        kitJson.programContainer = {};
      }
      kitList.push(kitJson);
    }
    return kitList;
  },*/
  /*async upsert({ kitJson }) {
    try {
      const kitJsonString = JSON.stringify(kitJson);
      const key = kitJson.id;
      await Storage.set({
        key,
        value: kitJsonString
      });
      return true;
    } catch (e) {
      return;
    }
  },*/
  async addLogin({ kitJson }) {
    try {
      const kitJsonString = JSON.stringify(kitJson);
      const key = "login";
      await Storage.set({
        key,
        value: kitJsonString,
      });
      return true;
    } catch (e) {
      return;
    }
  },
  async findLogin() {
    const kitJsonString = await Storage.get({ key: "login" });
    if (kitJsonString.value) {
      const kitJson = JSON.parse(kitJsonString.value);
      return kitJson;
    } else {
      return;
    }
  },
  /*async findById({ kitId }) {
    const kitJsonString = await Storage.get({ key: kitId });
    if (kitJsonString.value) {
      const kitJson = JSON.parse(kitJsonString.value);
      return kitJson;
    } else {
      return;
    }
  },*/
  async removeAll() {
    await Storage.clear();
    return;
  },
};

/*const refJson = {
  id: "0000_00001",
  title: "Moon Car",
  image: "image.png",
  version: "1.00",
  download: {
    size: "14.5 MB",
  },
  stageContainer: {
    background: "bg.png",
    stage: [
      {
        title: {
          small: "Stage 01",
          big: "Guitars",
        },
        activity: [
          {
            title: {
              small: "Invention 01",
              big: "Keytar",
            },
            type: 0,
            slides: [
              {
                type: 0,
                detail: {
                  text: {
                    small: "small text",
                    big: "big text",
                    desc: "description text",
                    top: "top text",
                  },
                  image: {
                    background: "stagebg.png",
                    cartoon: "image.png",
                  },
                  video: "video.mp4",
                },
              },
            ],
          },
        ],
      },
    ],
  },
};*/

export { Kit };
