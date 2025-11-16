import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * Editor Store - Manages campaign creation and editing
 *
 * This store handles:
 * - Creating new campaigns
 * - Adding/editing/deleting nodes
 * - Managing choices
 * - Export/Import JSON
 */
export const useEditorStore = defineStore('editor', () => {
  // Campaign being edited
  const campaign = ref(null)
  const selectedNodeId = ref(null)

  // Computed: Get selected node
  const selectedNode = computed(() => {
    if (!campaign.value || !selectedNodeId.value) return null
    return campaign.value.nodes.find(node => node.id === selectedNodeId.value)
  })

  // Computed: Check if campaign is loaded
  const isCampaignLoaded = computed(() => {
    return campaign.value !== null
  })

  // Create new campaign
  function createNewCampaign(title = 'Untitled Campaign') {
    campaign.value = {
      id: generateId(),
      title,
      author: 'Anonymous', // TODO: User system later
      version: '1.0.0',
      metadata: {
        description: '',
        genre: ['fantasy'],
        tags: [],
      },
      nodes: [],
      startNodeId: null,
    }

    // Create first node automatically
    const firstNode = createNode('start', 'Your story begins here...')
    campaign.value.startNodeId = firstNode.id
  }

  // Load existing campaign
  function loadCampaign(campaignData) {
    campaign.value = campaignData
    selectedNodeId.value = campaignData.nodes[0]?.id || null
  }

  // Create a new node
  function createNode(id = null, text = '') {
    if (!campaign.value) return null

    const nodeId = id || generateId()
    const newNode = {
      id: nodeId,
      type: 'story',
      content: {
        text,
      },
      choices: [],
    }

    campaign.value.nodes.push(newNode)
    selectedNodeId.value = nodeId

    return newNode
  }

  // Update node text
  function updateNodeText(nodeId, text) {
    const node = campaign.value.nodes.find(n => n.id === nodeId)
    if (!node) return

    node.content.text = text
  }

  // Delete node
  function deleteNode(nodeId) {
    if (!campaign.value) return

    // Can't delete if it's the only node
    if (campaign.value.nodes.length === 1) {
      console.warn('Cannot delete the last node')
      return
    }

    // Remove node
    const index = campaign.value.nodes.findIndex(n => n.id === nodeId)
    if (index === -1) return

    campaign.value.nodes.splice(index, 1)

    // Update startNodeId if we deleted the start node
    if (campaign.value.startNodeId === nodeId) {
      campaign.value.startNodeId = campaign.value.nodes[0].id
    }

    // Clear selection if we deleted the selected node
    if (selectedNodeId.value === nodeId) {
      selectedNodeId.value = campaign.value.nodes[0]?.id || null
    }

    // Remove references to this node from all choices
    campaign.value.nodes.forEach(node => {
      if (node.choices) {
        node.choices = node.choices.filter(choice => choice.targetNode !== nodeId)
      }
    })
  }

  // Add choice to node
  function addChoice(nodeId, choiceText = 'New Choice', targetNodeId = null) {
    const node = campaign.value.nodes.find(n => n.id === nodeId)
    if (!node) return

    if (!node.choices) {
      node.choices = []
    }

    const newChoice = {
      id: generateId(),
      text: choiceText,
      targetNode: targetNodeId,
    }

    node.choices.push(newChoice)
    return newChoice
  }

  // Update choice
  function updateChoice(nodeId, choiceIndex, updates) {
    const node = campaign.value.nodes.find(n => n.id === nodeId)
    if (!node || !node.choices || !node.choices[choiceIndex]) return

    Object.assign(node.choices[choiceIndex], updates)
  }

  // Delete choice
  function deleteChoice(nodeId, choiceIndex) {
    const node = campaign.value.nodes.find(n => n.id === nodeId)
    if (!node || !node.choices) return

    node.choices.splice(choiceIndex, 1)
  }

  // Export campaign as JSON
  function exportCampaign() {
    if (!campaign.value) return null

    return JSON.stringify(campaign.value, null, 2)
  }

  // Import campaign from JSON
  function importCampaign(jsonString) {
    try {
      const data = JSON.parse(jsonString)

      // Basic validation
      if (!data.nodes || !Array.isArray(data.nodes)) {
        throw new Error('Invalid campaign format: missing nodes array')
      }

      loadCampaign(data)
      return true
    } catch (error) {
      console.error('Failed to import campaign:', error)
      return false
    }
  }

  // Save campaign to Personal Stories
  function saveCampaign() {
    if (!campaign.value) {
      throw new Error('No campaign loaded to save')
    }

    // Import Personal Stories Store
    const { usePersonalStoriesStore } = require('./personalStories')
    const personalStoriesStore = usePersonalStoriesStore()

    // Prepare story metadata for storage
    const storyMetadata = {
      id: campaign.value.id,
      title: campaign.value.title,
      author: campaign.value.author || 'You',
      description: campaign.value.metadata?.description || '',
      genre: campaign.value.metadata?.genre || ['Fantasy'],
      tags: campaign.value.metadata?.tags || [],
      difficulty: campaign.value.metadata?.difficulty || 'Unbekannt',
      estimatedPlaytime: campaign.value.metadata?.estimatedPlaytime || 'Unbekannt',
      endings: countEndings(campaign.value),
      coverImage: null,
      data: campaign.value,
      stats: {
        nodes: campaign.value.nodes?.length || 0,
        choices: countChoices(campaign.value),
        endings: countEndings(campaign.value),
      },
      isPersonal: true,
    }

    // Save to Personal Stories Store
    personalStoriesStore.addPersonalStory(storyMetadata)

    return true
  }

  // Helper: Count endings in campaign
  function countEndings(campaignData) {
    if (!campaignData.nodes) return 0
    return campaignData.nodes.filter(node =>
      !node.choices || node.choices.length === 0
    ).length
  }

  // Helper: Count total choices in campaign
  function countChoices(campaignData) {
    if (!campaignData.nodes) return 0
    return campaignData.nodes.reduce((total, node) =>
      total + (node.choices?.length || 0), 0
    )
  }

  // Helper: Generate unique ID
  function generateId() {
    return 'node_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  return {
    // State
    campaign,
    selectedNodeId,
    selectedNode,
    isCampaignLoaded,

    // Actions
    createNewCampaign,
    loadCampaign,
    createNode,
    updateNodeText,
    deleteNode,
    addChoice,
    updateChoice,
    deleteChoice,
    exportCampaign,
    importCampaign,
    saveCampaign,
  }
})
