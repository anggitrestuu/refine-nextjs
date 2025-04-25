const aiGalleryLayout: FlexboxLayoutDefinition = {
    slots: [
        {
            id: 'chat-container',
            slotNumber: 1,
            width: '35%',
            component: {
                componentId: 'chat-container',
                title: 'Chat',
            },
        },
        {
            id: 'agent-gallery',
            slotNumber: 2,
            width: '65%',
            component: {
                componentId: 'agent-gallery',
                title: 'AI Agents',
            },
        },
    ],
}

export default aiGalleryLayout
