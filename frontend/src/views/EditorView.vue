<template>
  <div class="min-h-screen bg-paper dark:bg-paper-dark safe-area">
    <!-- Auto-save indicator -->
    <transition name="fade">
      <div
        v-if="showAutoSaveIndicator"
        class="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium"
      >
        ✓ Automatisch gespeichert
      </div>
    </transition>

    <div class="container-mobile pt-4 pb-8">
      <!-- Header with actions -->
      <header class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-serif text-ink dark:text-ink-dark">Editor</h1>
        <div class="flex gap-2">
          <!-- Undo/Redo -->
          <button
            v-if="isCampaignLoaded"
            @click="undo"
            :disabled="!canUndo"
            class="btn-secondary text-sm"
            :class="{ 'opacity-50 cursor-not-allowed': !canUndo }"
            title="Rückgängig (Ctrl+Z)"
          >
            ↶
          </button>
          <button
            v-if="isCampaignLoaded"
            @click="redo"
            :disabled="!canRedo"
            class="btn-secondary text-sm"
            :class="{ 'opacity-50 cursor-not-allowed': !canRedo }"
            title="Wiederholen (Ctrl+Y)"
          >
            ↷
          </button>

          <!-- JSON Preview -->
          <button
            v-if="isCampaignLoaded"
            @click="showJsonPreview = true"
            class="btn-secondary text-sm"
            title="JSON Vorschau"
          >
            { }
          </button>

          <!-- Save/Export/Import -->
          <button
            v-if="isCampaignLoaded"
            @click="handleSave"
            class="btn-primary text-sm"
          >
            Speichern
          </button>
          <button
            v-if="isCampaignLoaded"
            @click="handleExport"
            class="btn-secondary text-sm"
          >
            Export
          </button>
          <label class="btn-secondary text-sm cursor-pointer">
            Import
            <input
              type="file"
              @change="handleImport"
              accept=".json"
              class="hidden"
            />
          </label>
        </div>
      </header>

      <!-- JSON Preview Modal -->
      <div
        v-if="showJsonPreview"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        @click.self="showJsonPreview = false"
      >
        <div class="bg-paper dark:bg-paper-dark rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] flex flex-col">
          <div class="flex justify-between items-center p-4 border-b border-divider">
            <h3 class="text-lg font-serif text-ink dark:text-ink-dark">Campaign JSON Preview</h3>
            <button
              @click="showJsonPreview = false"
              class="text-ink-light hover:text-ink dark:hover:text-ink-dark text-2xl leading-none"
            >
              ×
            </button>
          </div>
          <div class="flex-1 overflow-auto p-4">
            <pre class="text-xs sm:text-sm font-mono text-ink dark:text-ink-dark bg-shadow/20 dark:bg-paper-dark p-4 rounded border border-divider overflow-x-auto">{{ jsonPreview }}</pre>
          </div>
          <div class="flex justify-end gap-2 p-4 border-t border-divider">
            <button @click="copyJsonToClipboard" class="btn-secondary text-sm">
              In Zwischenablage kopieren
            </button>
            <button @click="showJsonPreview = false" class="btn-primary text-sm">
              Schließen
            </button>
          </div>
        </div>
      </div>

      <!-- No Campaign State -->
      <div v-if="!isCampaignLoaded" class="text-center py-16">
        <h2 class="text-2xl font-serif mb-4 text-ink dark:text-ink-dark">Geschichten-Editor</h2>
        <p class="mb-6 text-ink-light dark:text-ink-dark/70">
          Erstellen Sie eine neue Geschichte oder laden Sie eine vorhandene
        </p>

        <div class="flex flex-col gap-3 max-w-md mx-auto">
          <button @click="createNewCampaign('Neue Geschichte')" class="btn-primary">
            Neue Geschichte erstellen
          </button>

          <label class="btn-secondary cursor-pointer">
            Geschichte importieren
            <input
              type="file"
              @change="handleImport"
              accept=".json"
              class="hidden"
            />
          </label>
        </div>
      </div>

      <!-- Campaign Loaded - Editor Interface -->
      <div v-else class="editor-layout">
        <!-- Campaign Metadata -->
        <div class="campaign-meta mb-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-ink dark:text-ink-dark mb-2">Titel</label>
              <input
                v-model="campaign.title"
                type="text"
                class="w-full p-3 border-2 border-divider rounded-lg
                       bg-paper dark:bg-paper-dark text-ink dark:text-ink-dark
                       focus:border-sepia focus:outline-none font-serif text-lg"
                placeholder="Titel Ihrer Geschichte"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-ink dark:text-ink-dark mb-2">Autor</label>
              <input
                v-model="campaign.author"
                type="text"
                class="w-full p-3 border-2 border-divider rounded-lg
                       bg-paper dark:bg-paper-dark text-ink dark:text-ink-dark
                       focus:border-sepia focus:outline-none"
                placeholder="Ihr Name"
              />
            </div>
          </div>
          <p class="text-sm text-ink-light dark:text-ink-dark/70 mt-2">
            {{ campaign.nodes.length }} Abschnitte •
            {{ countChoices() }} Entscheidungen •
            {{ countEndings() }} Enden
          </p>
        </div>

        <!-- Two-Column Layout: Node List + Editor Panel -->
        <div class="editor-grid">
          <!-- Left: Node List -->
          <div class="node-list-panel">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-serif text-ink dark:text-ink-dark">Abschnitte</h3>
              <button @click="createNode()" class="btn-primary text-sm">
                + Neu
              </button>
            </div>

            <div class="space-y-2 max-h-[70vh] overflow-y-auto pr-2">
              <div
                v-for="node in campaign.nodes"
                :key="node.id"
                @click="selectedNodeId = node.id"
                :class="[
                  'p-3 border-2 rounded-lg cursor-pointer transition-all',
                  selectedNodeId === node.id
                    ? 'border-sepia bg-shadow/30 dark:bg-sepia/10'
                    : 'border-divider hover:border-sepia/50'
                ]"
              >
                <div class="flex justify-between items-start gap-2">
                  <div class="flex-1 min-w-0">
                    <p class="font-mono text-xs text-sepia mb-1">{{ node.id }}</p>
                    <p class="truncate text-sm text-ink dark:text-ink-dark">
                      {{ node.content.text || '(leer)' }}
                    </p>
                    <p class="text-xs text-ink-light dark:text-ink-dark/70 mt-1">
                      {{ node.choices?.length || 0 }} →
                    </p>
                  </div>
                  <button
                    @click.stop="handleDeleteNode(node.id)"
                    class="text-ink-light hover:text-red-600 transition-colors text-lg leading-none"
                    title="Löschen"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Node Editor Panel -->
          <div class="node-editor-panel">
            <div v-if="selectedNode" class="space-y-6">
              <div>
                <h3 class="text-lg font-serif text-ink dark:text-ink-dark mb-4">Abschnitt bearbeiten</h3>

                <!-- Node ID (editable) -->
                <div class="mb-4">
                  <label class="block text-sm font-medium text-ink dark:text-ink-dark mb-2">Abschnitt-ID</label>
                  <input
                    :value="selectedNode.id"
                    @blur="handleNodeIdChange($event, selectedNode.id)"
                    @keydown.enter="$event.target.blur()"
                    type="text"
                    class="w-full p-2 border-2 border-divider rounded-lg
                           bg-paper dark:bg-paper-dark text-ink dark:text-ink-dark font-mono text-sm
                           focus:border-sepia focus:outline-none"
                    placeholder="z.B. wald-anfang, drache-1"
                  />
                  <p class="text-xs text-ink-light dark:text-ink-dark/70 mt-1">
                    Verwenden Sie sprechende Namen (z.B. 'wald-start' statt 'node-1')
                  </p>
                </div>

                <!-- Node Text -->
                <div class="mb-4">
                  <label class="block text-sm font-medium text-ink dark:text-ink-dark mb-2">Text</label>
                  <textarea
                    :value="selectedNode.content.text"
                    @input="updateNodeText(selectedNode.id, $event.target.value)"
                    class="w-full p-3 border-2 border-divider rounded-lg
                           bg-paper dark:bg-paper-dark text-ink dark:text-ink-dark
                           min-h-[200px] focus:border-sepia focus:outline-none font-serif leading-relaxed"
                    placeholder="Schreiben Sie hier Ihren Geschichtentext..."
                  />
                </div>

                <!-- Choices -->
                <div>
                  <div class="flex justify-between items-center mb-3">
                    <label class="block text-sm font-medium text-ink dark:text-ink-dark">Entscheidungen</label>
                    <button
                      @click="addChoice(selectedNode.id, 'Neue Entscheidung')"
                      class="btn-secondary text-sm"
                    >
                      + Entscheidung
                    </button>
                  </div>

                  <div v-if="selectedNode.choices && selectedNode.choices.length > 0" class="space-y-3">
                    <div
                      v-for="(choice, index) in selectedNode.choices"
                      :key="choice.id"
                      class="flex flex-col gap-2 p-3 bg-shadow/20 dark:bg-paper-dark rounded-lg border border-divider"
                    >
                      <div class="flex gap-2 items-start">
                        <span class="text-sepia font-mono text-sm mt-2">{{index + 1}}.</span>
                        <input
                          :value="choice.text"
                          @input="updateChoice(selectedNode.id, index, { text: $event.target.value })"
                          class="flex-1 p-2 border border-divider rounded
                                 bg-paper dark:bg-paper-dark text-ink dark:text-ink-dark"
                          placeholder="Entscheidungstext"
                        />
                        <button
                          @click="deleteChoice(selectedNode.id, index)"
                          class="text-ink-light hover:text-red-600 transition-colors text-xl leading-none px-2"
                          title="Löschen"
                        >
                          ×
                        </button>
                      </div>
                      <div class="flex items-center gap-2 ml-6">
                        <span class="text-sm text-ink-light dark:text-ink-dark/70">→ Ziel:</span>
                        <select
                          :value="choice.targetNode"
                          @change="updateChoice(selectedNode.id, index, { targetNode: $event.target.value })"
                          class="flex-1 p-2 border border-divider rounded
                                 bg-paper dark:bg-paper-dark text-ink dark:text-ink-dark text-sm font-mono"
                        >
                          <option value="">-- Kein Ziel (Ende) --</option>
                          <option
                            v-for="node in campaign.nodes"
                            :key="node.id"
                            :value="node.id"
                          >
                            {{ node.id }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <p v-else class="text-sm text-ink-light dark:text-ink-dark/70 italic">
                    Keine Entscheidungen = Ende der Geschichte
                  </p>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-16 text-ink-light dark:text-ink-dark/70">
              <p>← Wählen Sie einen Abschnitt zum Bearbeiten</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useEditorStore } from '../stores/editor'

const editorStore = useEditorStore()
const { campaign, selectedNodeId, selectedNode, isCampaignLoaded, canUndo, canRedo } = storeToRefs(editorStore)
const {
  createNewCampaign,
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
  restoreAutoSave,
  clearAutoSave,
  setAutoSaveCallback,
  undo,
  redo,
} = editorStore

// JSON Preview state
const showJsonPreview = ref(false)
const jsonPreview = computed(() => {
  return campaign.value ? JSON.stringify(campaign.value, null, 2) : ''
})

// Auto-save indicator state
const showAutoSaveIndicator = ref(false)
let autoSaveIndicatorTimer = null

// Show auto-save indicator (called from store)
function showAutoSaveNotification() {
  showAutoSaveIndicator.value = true

  // Clear existing timer
  if (autoSaveIndicatorTimer) {
    clearTimeout(autoSaveIndicatorTimer)
  }

  // Hide after 2 seconds
  autoSaveIndicatorTimer = setTimeout(() => {
    showAutoSaveIndicator.value = false
  }, 2000)
}

// Keyboard shortcuts handler
function handleKeyDown(event) {
  // Only handle shortcuts when campaign is loaded
  if (!isCampaignLoaded.value) return

  // Undo: Ctrl+Z (Windows/Linux) or Cmd+Z (Mac)
  if ((event.ctrlKey || event.metaKey) && event.key === 'z' && !event.shiftKey) {
    if (canUndo.value) {
      event.preventDefault()
      undo()
    }
  }

  // Redo: Ctrl+Y (Windows/Linux) or Cmd+Shift+Z (Mac)
  if (
    ((event.ctrlKey && event.key === 'y') || (event.metaKey && event.shiftKey && event.key === 'z'))
  ) {
    if (canRedo.value) {
      event.preventDefault()
      redo()
    }
  }
}

// Check for auto-save on mount + add keyboard listener
onMounted(() => {
  if (!isCampaignLoaded.value) {
    const autoSaved = restoreAutoSave()
    if (autoSaved) {
      if (confirm('Es wurde eine automatisch gespeicherte Version gefunden.\n\nMöchten Sie diese wiederherstellen?')) {
        editorStore.loadCampaign(autoSaved)
      } else {
        clearAutoSave()
      }
    }
  }

  // Add keyboard shortcut listener
  window.addEventListener('keydown', handleKeyDown)

  // Set auto-save callback for UI notification
  setAutoSaveCallback(showAutoSaveNotification)
})

// Remove keyboard listener on unmount
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

// Handle node ID change
function handleNodeIdChange(event, oldId) {
  const newId = event.target.value.trim()
  if (!newId || newId === oldId) {
    event.target.value = oldId // Reset if empty or unchanged
    return
  }

  const success = updateNodeId(oldId, newId)
  if (!success) {
    alert(`ID "${newId}" existiert bereits oder ist ungültig. Bitte wählen Sie einen anderen Namen.`)
    event.target.value = oldId // Reset on failure
  }
}

// Handle node deletion with confirmation
function handleDeleteNode(nodeId) {
  if (campaign.value.nodes.length === 1) {
    alert('Sie können den letzten Abschnitt nicht löschen.')
    return
  }

  if (confirm('Diesen Abschnitt wirklich löschen?')) {
    deleteNode(nodeId)
  }
}

// Count total choices
function countChoices() {
  if (!campaign.value) return 0
  return campaign.value.nodes.reduce((total, node) =>
    total + (node.choices?.length || 0), 0
  )
}

// Count endings (nodes with no choices)
function countEndings() {
  if (!campaign.value) return 0
  return campaign.value.nodes.filter(node =>
    !node.choices || node.choices.length === 0
  ).length
}

// Handle save
function handleSave() {
  try {
    saveCampaign()
    clearAutoSave() // Clear auto-save after manual save
    alert('Geschichte gespeichert!\n\nSie finden Ihre Geschichte nun unter "Meine Geschichten" im Reader.')
  } catch (error) {
    alert('Fehler beim Speichern: ' + error.message)
  }
}

// Handle export
function handleExport() {
  const json = exportCampaign()
  if (!json) return

  // Create download
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${campaign.value.title.replace(/\s+/g, '_')}_${Date.now()}.json`
  a.click()
  URL.revokeObjectURL(url)
}

// Handle import
function handleImport(event) {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    const result = importCampaign(e.target.result)
    if (result.success) {
      alert('Geschichte erfolgreich importiert!')
    } else {
      alert(`Fehler beim Importieren:\n\n${result.error}`)
    }
  }
  reader.readAsText(file)

  // Reset input
  event.target.value = ''
}

// Copy JSON to clipboard
function copyJsonToClipboard() {
  if (!jsonPreview.value) return

  navigator.clipboard.writeText(jsonPreview.value)
    .then(() => {
      alert('JSON in Zwischenablage kopiert!')
    })
    .catch(() => {
      alert('Fehler beim Kopieren')
    })
}
</script>

<style scoped>
/* Editor Grid Layout - Desktop: Side-by-Side, Mobile: Stacked */
.editor-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 1024px) {
  .editor-grid {
    grid-template-columns: 350px 1fr;
  }
}

/* Fade transition for auto-save indicator */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@media (min-width: 1280px) {
  .editor-grid {
    grid-template-columns: 400px 1fr;
  }
}

/* Node List Panel */
.node-list-panel {
  @apply bg-paper dark:bg-paper-dark rounded-lg p-4 shadow-sm border border-divider;
}

/* Node Editor Panel */
.node-editor-panel {
  @apply bg-paper dark:bg-paper-dark rounded-lg p-6 shadow-sm border border-divider;
  min-height: 400px;
}

/* Custom scrollbar for node list */
.node-list-panel .space-y-2::-webkit-scrollbar {
  width: 8px;
}

.node-list-panel .space-y-2::-webkit-scrollbar-track {
  background: transparent;
}

.node-list-panel .space-y-2::-webkit-scrollbar-thumb {
  @apply bg-divider rounded;
}

.node-list-panel .space-y-2::-webkit-scrollbar-thumb:hover {
  @apply bg-sepia/50;
}
</style>
