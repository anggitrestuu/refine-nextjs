const mainPageLayout: FlexboxLayoutDefinition = {
  slots: [
    {
      id: "agent-container",
      slotNumber: 0,
      width: "25%",
      component: {
        componentId: "agent-container",
        title: "Agent",
      },
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
      id: "canvas-container",
      slotNumber: 2,
      width: "25%",
      component: {
        componentId: "canvas-container",
        title: "Buttons",
      },
    },
  ],
};

export default mainPageLayout;
