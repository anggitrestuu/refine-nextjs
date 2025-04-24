const mainPageLayout: FlexboxLayoutDefinition = {
  slots: [
    {
      id: "empty-left",
      slotNumber: 0,
      width: "25%",
    },
    {
      id: "chat-container",
      slotNumber: 1,
      width: "50%",
      component: {
        componentId: "chat-container",
        title: "Chat",
      },
    },
    {
      id: "quick-options",
      slotNumber: 2,
      width: "25%",
      component: {
        componentId: "quick-options",
        title: "Quick Options",
      },
    },
  ],
};

export default mainPageLayout;
