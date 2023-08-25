const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      selectedSong: null,
      countdownStarted: false,
      countdownFinished: false,
    },
    actions: {
      setSelectedSong: (song) => {
        setStore({ selectedSong: song });
      },
      clearSelectedSong: () => {
        setStore({ selectedSong: null });
      },
      setCountdownStarted: (value) => {
        setStore({ countdownStarted: value });
      },
      setCountdownFinished: (value) => {
        setStore({ countdownFinished: value });
      },
    },
  };
};

export default getState;
