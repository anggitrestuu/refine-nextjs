const workroomGalleryLayout: FlexboxLayoutDefinition = {
  slots: [
    {
      id: "chat-container",
      slotNumber: 1,
      width: "35%",
      component: {
        componentId: "chat-container",
        title: "Chat",
      },
    },
    {
      id: "workroom-gallery",
      slotNumber: 2,
      width: "65%",
      component: {
        componentId: "workroom-gallery",
        title: "Workrooms",
      },
    },
  ],
};

export default workroomGalleryLayout;
