import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * Story Store - Manages the current story/campaign being played
 *
 * This store handles:
 * - Loading a campaign JSON
 * - Current node navigation
 * - Player state (progress, history)
 * - LocalStorage persistence
 */
export const useStoryStore = defineStore('story', () => {
  // Campaign data
  const campaign = ref(null)
  const currentNodeId = ref(null)

  // Player state
  const history = ref([]) // Array of visited node IDs
  const startedAt = ref(null)
  const lastPlayedAt = ref(null)

  // Computed: Get current node object
  const currentNode = computed(() => {
    if (!campaign.value || !currentNodeId.value) return null
    return campaign.value.nodes.find(node => node.id === currentNodeId.value)
  })

  // Computed: Check if story is loaded
  const isStoryLoaded = computed(() => {
    return campaign.value !== null && currentNodeId.value !== null
  })

  // Load a campaign
  function loadCampaign(campaignData) {
    campaign.value = campaignData
    currentNodeId.value = campaignData.startNodeId || campaignData.nodes[0]?.id
    startedAt.value = new Date().toISOString()
    lastPlayedAt.value = new Date().toISOString()
    history.value = [currentNodeId.value]

    // Save to localStorage
    saveProgress()
  }

  // Navigate to a node
  function navigateToNode(nodeId) {
    if (!campaign.value) return

    const node = campaign.value.nodes.find(n => n.id === nodeId)
    if (!node) {
      console.error(`Node with ID ${nodeId} not found`)
      return
    }

    currentNodeId.value = nodeId
    history.value.push(nodeId)
    lastPlayedAt.value = new Date().toISOString()

    // Save progress
    saveProgress()
  }

  // Navigate to a choice target
  function chooseOption(choiceIndex) {
    if (!currentNode.value || !currentNode.value.choices) return

    const choice = currentNode.value.choices[choiceIndex]
    if (!choice || !choice.targetNode) {
      console.error('Invalid choice or missing target node')
      return
    }

    navigateToNode(choice.targetNode)
  }

  // Save progress to localStorage
  function saveProgress() {
    if (!campaign.value) return

    const saveData = {
      campaignId: campaign.value.id,
      currentNodeId: currentNodeId.value,
      history: history.value,
      startedAt: startedAt.value,
      lastPlayedAt: lastPlayedAt.value,
    }

    localStorage.setItem('awfa_story_progress', JSON.stringify(saveData))
  }

  // Load progress from localStorage
  function loadProgress() {
    const saved = localStorage.getItem('awfa_story_progress')
    if (!saved) return false

    try {
      const saveData = JSON.parse(saved)
      // Note: We still need the campaign data loaded separately
      // This just restores the progress state
      currentNodeId.value = saveData.currentNodeId
      history.value = saveData.history
      startedAt.value = saveData.startedAt
      lastPlayedAt.value = saveData.lastPlayedAt
      return true
    } catch (error) {
      console.error('Failed to load progress:', error)
      return false
    }
  }

  // Reset/clear story
  function resetStory() {
    campaign.value = null
    currentNodeId.value = null
    history.value = []
    startedAt.value = null
    lastPlayedAt.value = null
    localStorage.removeItem('awfa_story_progress')
  }

  return {
    // State
    campaign,
    currentNodeId,
    currentNode,
    history,
    isStoryLoaded,

    // Actions
    loadCampaign,
    navigateToNode,
    chooseOption,
    saveProgress,
    loadProgress,
    resetStory,
  }
})
