const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      selectedSong: null,
    },
    actions: {
      setSelectedSong: (song) => {
        const { store } = getStore();
        setStore({ selectedSong: song });
      },
      clearSelectedSong: () => {
        setStore({ selectedSong: null });
      },
    },
  };
};

export default getState;
