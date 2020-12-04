import firebase from "firebase/app";
require("firebase/auth");
require("firebase/database");
require("firebase/storage");

export default {
  state: {
    loadedMeetups: [
      {
        id: "0",
        imageUrl:
          "https://i.pinimg.com/originals/94/a3/a4/94a3a4b98096b8c94923204637b22e04.jpg",
        title: "Meetup in Sumgait",
        date: new Date(),
        location: "Sumgait",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      },
      {
        id: "1",
        imageUrl:
          "https://turkishairlines.ssl.cdn.sdlmedia.com/637123840960884410TM.jpg",
        title: "Meetup in Baku",
        date: new Date(),
        location: "Baku",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      },
    ],
  },
  mutations: {
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload;
    },
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    updateMeetup(state, payload) {
      const meetup = state.loadedMeetups.find((meetup) => {
        return meetup.id === payload.id;
      });
      if (payload.title) {
        meetup.title = payload.title;
      }
      if (payload.description) {
        meetup.description = payload.description;
      }
      if (payload.date) {
        meetup.date = payload.date;
      }
    },
  },
  actions: {
    loadMeetups({ commit }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("meetups")
        .once("value")
        .then((data) => {
          const meetups = [];
          const obj = data.val();
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              location: obj[key].location,
              creatorId: obj[key].creatorId,
            });
          }
          commit("setLoading", false);
          commit("setLoadedMeetups", meetups);
        })
        .catch((error) => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    createMeetup({ commit, getters }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id,
      };
      let imageUrl;
      let key;
      firebase
        .database()
        .ref("meetups")
        .push(meetup)
        .then((data) => {
          key = data.key;
          return key;
        })
        .then((key) => {
          const filename = payload.image.name;
          const ext = filename.slice(filename.lastIndexOf("."));
          return firebase
            .storage()
            .ref()
            .child(`meetups/${key}.${ext}`)
            .put(payload.image);
        })
        .then((fileData) => {
          return fileData.ref.getDownloadURL().then((downloadUrl) => {
            imageUrl = downloadUrl;
            return firebase
              .database()
              .ref("meetups")
              .child(key)
              .update({ imageUrl: downloadUrl });
          });
        })
        .then(() => {
          commit("createMeetup", {
            ...meetup,
            imageUrl: imageUrl,
            id: key,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //Short code
    // createMeetup({ commit, getters }, payload) {
    //   // image is passed as file, need to upload it and then store the imageUrl
    //   const dbRef = firebase
    //     .database()
    //     .ref("meetups")
    //     .push();
    //   const key = dbRef.key;
    //   const filename = payload.image.name;
    //   const ext = filename.slice(filename.lastIndexOf("."));
    //   const storageRef = firebase
    //     .storage()
    //     .ref("meetups")
    //     .child(key + "." + ext);

    //   storageRef
    //     .put(payload.image)
    //     .then(() => {
    //       // file uploaded
    //       return storageRef.getDownloadURL();
    //     })
    //     .then((downloadUrl) => {
    //       const meetup = {
    //         title: payload.title,
    //         location: payload.location,
    //         description: payload.description,
    //         date: payload.date.toISOString(),
    //         id: key,
    //         creatorId: getters.user.id,
    //         imageUrl: downloadUrl,
    //       };
    //       commit("createMeetup", meetup);
    //       return dbRef.set(meetup);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // },

    updateMeetupData({ commit }, payload) {
      commit("setLoading", true);
      const updateObj = {};
      if (payload.title) {
        updateObj.title = payload.title;
      }
      if (payload.description) {
        updateObj.description = payload.description;
      }
      if (payload.date) {
        updateObj.date = payload.date;
      }
      firebase
        .database()
        .ref("meetups")
        .child(payload.id)
        .update(updateObj)
        .then(() => {
          commit("setLoading", false);
          commit("updateMeetup", payload);
        })
        .catch((error) => {
          console.log(error);
          commit("setLoading", false);
        });
    },
  },

  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date;
      });
    },
    loadedMeetup(state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id == meetupId;
        });
      };
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },
  },
};
