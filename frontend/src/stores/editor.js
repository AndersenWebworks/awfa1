import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { usePersonalStoriesStore } from './personalStories'

/**
 * Editor Store - Manages campaign creation and editing
 *
 * This store handles:
 * - Creating new campaigns
 * - Adding/editing/deleting nodes
 * - Managing choices
 * - Export/Import JSON
 * - Auto-save to localStorage
 * - Undo/Redo functionality
 */

const AUTO_SAVE_KEY = 'awfa1_editor_autosave'
const AUTO_SAVE_DEBOUNCE = 3000 // 3 seconds

// Check if localStorage is available
function isLocalStorageAvailable() {
  try {
    const test = '__localStorage_test__'
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (e) {
    return false
  }
}

export const useEditorStore = defineStore('editor', () => {
  // Campaign being edited
  const campaign = ref(null)
  const selectedNodeId = ref(null)

  // Undo/Redo history
  const history = ref([])
  const historyIndex = ref(-1)
  const maxHistorySize = 50

  // Auto-save timer
  let autoSaveTimer = null

  // Auto-save callback (for UI notification)
  let autoSaveCallback = null

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

    const nodeId = id || generateNodeId()
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

  // Update node ID (rename)
  function updateNodeId(oldId, newId) {
    if (!campaign.value) return false

    // Check if new ID already exists
    if (campaign.value.nodes.some(n => n.id === newId && n.id !== oldId)) {
      return false // ID already taken
    }

    // Find node
    const node = campaign.value.nodes.find(n => n.id === oldId)
    if (!node) return false

    // Update node ID
    node.id = newId

    // Update startNodeId if needed
    if (campaign.value.startNodeId === oldId) {
      campaign.value.startNodeId = newId
    }

    // Update all choice references
    campaign.value.nodes.forEach(n => {
      if (n.choices) {
        n.choices.forEach(choice => {
          if (choice.targetNode === oldId) {
            choice.targetNode = newId
          }
        })
      }
    })

    // Update selection if needed
    if (selectedNodeId.value === oldId) {
      selectedNodeId.value = newId
    }

    return true
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

      // Enhanced validation
      if (!data.nodes || !Array.isArray(data.nodes)) {
        throw new Error('Ungültiges Format: Keine Abschnitte (nodes) gefunden')
      }

      if (data.nodes.length === 0) {
        throw new Error('Geschichte muss mindestens einen Abschnitt haben')
      }

      if (!data.title) {
        throw new Error('Ungültiges Format: Kein Titel gefunden')
      }

      // Validate startNodeId exists
      if (data.startNodeId && !data.nodes.find(n => n.id === data.startNodeId)) {
        console.warn('startNodeId nicht gefunden, nutze ersten Node')
        data.startNodeId = data.nodes[0].id
      }

      loadCampaign(data)
      return { success: true }
    } catch (error) {
      console.error('Failed to import campaign:', error)
      return {
        success: false,
        error: error.message || 'Ungültiges JSON-Format'
      }
    }
  }

  // Save campaign to Personal Stories
  function saveCampaign() {
    if (!campaign.value) {
      throw new Error('No campaign loaded to save')
    }

    // Basic validation
    if (!campaign.value.nodes || campaign.value.nodes.length === 0) {
      throw new Error('Geschichte muss mindestens einen Abschnitt haben')
    }

    if (!campaign.value.title || campaign.value.title.trim() === '') {
      throw new Error('Geschichte braucht einen Titel')
    }

    // Get Personal Stories Store
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

  // Helper: Generate unique ID for choices
  function generateId() {
    return 'choice_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  // Helper: Generate readable node ID
  function generateNodeId() {
    if (!campaign.value || !campaign.value.nodes) return 'node-1'

    // Find highest node number
    let maxNum = 0
    campaign.value.nodes.forEach(node => {
      const match = node.id.match(/^node-(\d+)$/)
      if (match) {
        const num = parseInt(match[1], 10)
        if (num > maxNum) maxNum = num
      }
    })

    return `node-${maxNum + 1}`
  }

  // Auto-save to localStorage
  function triggerAutoSave() {
    if (!campaign.value) return

    // Check localStorage availability
    if (!isLocalStorageAvailable()) {
      console.warn('localStorage not available - auto-save disabled')
      return
    }

    // Clear existing timer
    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer)
    }

    // Set new timer
    autoSaveTimer = setTimeout(() => {
      try {
        const saveData = {
          campaign: campaign.value,
          history: history.value,
          historyIndex: historyIndex.value,
          timestamp: Date.now()
        }
        localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(saveData))
        console.log('Auto-saved to localStorage (with history)')

        // Trigger UI notification if callback is set
        if (autoSaveCallback) {
          autoSaveCallback()
        }
      } catch (error) {
        console.error('Auto-save failed:', error)
        // Could be quota exceeded - warn user
        if (error.name === 'QuotaExceededError') {
          console.error('localStorage quota exceeded - auto-save disabled')
        }
      }
    }, AUTO_SAVE_DEBOUNCE)
  }

  // Set auto-save callback
  function setAutoSaveCallback(callback) {
    autoSaveCallback = callback
  }

  // Restore from auto-save
  function restoreAutoSave() {
    // Check localStorage availability
    if (!isLocalStorageAvailable()) {
      console.warn('localStorage not available - cannot restore auto-save')
      return null
    }

    try {
      const saved = localStorage.getItem(AUTO_SAVE_KEY)
      if (saved) {
        const data = JSON.parse(saved)

        // Validate data structure
        if (!data) {
          console.warn('Invalid auto-save data - ignoring')
          return null
        }

        // Support old format (just campaign) and new format (with history)
        if (data.campaign) {
          // New format with history
          history.value = data.history || []
          historyIndex.value = data.historyIndex ?? -1
          return data.campaign
        } else {
          // Old format (backward compatibility)
          return data
        }
      }
    } catch (error) {
      console.error('Failed to restore auto-save:', error)
      // Clear corrupted data
      try {
        localStorage.removeItem(AUTO_SAVE_KEY)
      } catch (e) {
        // Ignore cleanup errors
      }
    }
    return null
  }

  // Clear auto-save
  function clearAutoSave() {
    if (!isLocalStorageAvailable()) return

    try {
      localStorage.removeItem(AUTO_SAVE_KEY)
    } catch (error) {
      console.error('Failed to clear auto-save:', error)
    }
  }

  // Watch campaign for changes → trigger auto-save
  watch(campaign, () => {
    if (campaign.value) {
      triggerAutoSave()
      saveToHistory()
    }
  }, { deep: true })

  // Undo/Redo functionality
  function saveToHistory() {
    if (!campaign.value) return

    // Create snapshot
    const snapshot = JSON.parse(JSON.stringify(campaign.value))

    // Remove future history if we're not at the end
    if (historyIndex.value < history.value.length - 1) {
      history.value = history.value.slice(0, historyIndex.value + 1)
    }

    // Add to history
    history.value.push(snapshot)

    // Limit history size
    if (history.value.length > maxHistorySize) {
      history.value.shift()
    } else {
      historyIndex.value++
    }
  }

  function undo() {
    if (historyIndex.value > 0) {
      historyIndex.value--
      campaign.value = JSON.parse(JSON.stringify(history.value[historyIndex.value]))
      return true
    }
    return false
  }

  function redo() {
    if (historyIndex.value < history.value.length - 1) {
      historyIndex.value++
      campaign.value = JSON.parse(JSON.stringify(history.value[historyIndex.value]))
      return true
    }
    return false
  }

  const canUndo = computed(() => historyIndex.value > 0)
  const canRedo = computed(() => historyIndex.value < history.value.length - 1)

  return {
    // State
    campaign,
    selectedNodeId,
    selectedNode,
    isCampaignLoaded,
    canUndo,
    canRedo,

    // Actions
    createNewCampaign,
    loadCampaign,
    createNode,
    updateNodeId,
    updateNodeText,
    deleteNode,
    addChoice,
    updateChoice,
    deleteChoice,
    exportCampaign,
    importCampaign,
    saveCampaign,

    // Auto-save
    restoreAutoSave,
    clearAutoSave,
    setAutoSaveCallback,

    // Undo/Redo
    undo,
    redo,
  }
})
