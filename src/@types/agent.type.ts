interface IAgent {
    /** Unique identifier for the agent */
    id: string

    /** Agent name */
    name: string

    /** Optional agent description */
    description?: string

    /** System prompt that defines the agent's behavior */
    systemPrompt: string

    /** User ID of the agent owner (null for system/organization agents) */
    ownerId: string | null

    /** User ID of the agent creator */
    creatorId: string | null

    /** Organization ID if the agent belongs to an organization (null for personal/system agents) */
    organizationId: string | null

    /** Visibility level of the agent */
    visibility: 'private' | 'public' | 'organization'

    /** When the agent was created */
    createdAt: string | Date

    /** When the agent was last updated */
    updatedAt: string | Date
}