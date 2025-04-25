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
            id: 'ai-gallery',
            slotNumber: 2,
            width: '65%',
            headerComponent: {
                componentId: 'back-button',
                title: 'Back',
            },
            component: {
                componentId: 'aiAgentGallery',
                title: 'AI Agents',
            },
        },
    ],
}

export default aiGalleryLayout
