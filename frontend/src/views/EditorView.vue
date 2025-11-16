<template>
  <div class="min-h-screen bg-paper dark:bg-paper-dark safe-area">
    <div class="container-mobile pt-4">
      <header class="flex justify-end items-center mb-8">
        <div class="flex gap-2">
          <button
            v-if="isCampaignLoaded"
            @click="handleSave"
            class="btn-primary text-sm"
          >
            Speichern
          </button>
          <button @click="handleExport" class="btn-secondary text-sm">
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

      <!-- No Campaign State -->
      <div v-if="!isCampaignLoaded" class="text-center py-16">
        <h2 class="text-2xl font-serif mb-4 text-ink dark:text-ink-dark">Geschichten-Editor</h2>
        <p class="mb-6 text-ink-light dark:text-ink-dark/70">
          Erstellen Sie eine neue Geschichte oder laden Sie eine vorhandene
        </p>

        <div class="flex flex-col gap-3 max-w-md mx-auto">
          <button @click="createNewCampaign()" class="btn-primary">
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
      <div v-else>
        <div class="mb-6">
          <h1 class="text-3xl font-serif text-ink dark:text-ink-dark">{{ campaign.title }}</h1>
          <p class="text-ink-light dark:text-ink-dark/70">{{ campaign.nodes.length }} Abschnitte</p>
        </div>

        <!-- Node List (Simple for now, we'll enhance later) -->
        <div class="bg-paper dark:bg-paper-dark rounded-lg p-6 shadow-sm border border-divider">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-serif text-ink dark:text-ink-dark">Abschnitte</h3>
            <button @click="createNode()" class="btn-primary">
              + Abschnitt hinzufügen
            </button>
          </div>

          <div class="space-y-3">
            <div
              v-for="node in campaign.nodes"
              :key="node.id"
              @click="selectedNodeId = node.id"
              :class="[
                'p-4 border-2 rounded-lg cursor-pointer transition-all',
                selectedNodeId === node.id
                  ? 'border-sepia bg-shadow/30 dark:bg-sepia/10'
                  : 'border-divider hover:border-sepia/50'
              ]"
            >
              <div class="flex justify-between items-start gap-4">
                <div class="flex-1 min-w-0">
                  <p class="font-mono text-sm text-ink-light dark:text-ink-dark/70 mb-1">{{ node.id }}</p>
                  <p class="truncate text-ink dark:text-ink-dark">{{ node.content.text || '(leer)' }}</p>
                  <p class="text-sm text-ink-light dark:text-ink-dark/70 mt-2">
                    {{ node.choices?.length || 0 }} Entscheidung(en)
                  </p>
                </div>
                <button
                  @click.stop="deleteNode(node.id)"
                  class="btn-secondary text-sm px-3"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Node Editor Panel (when node is selected) -->
        <div v-if="selectedNode" class="mt-6 bg-paper dark:bg-paper-dark rounded-lg p-6 shadow-sm border border-divider">
          <h3 class="text-lg font-serif text-ink dark:text-ink-dark mb-4">Abschnitt bearbeiten: {{ selectedNode.id }}</h3>

          <div class="mb-4">
            <label class="block text-sm font-medium text-ink dark:text-ink-dark mb-2">Text</label>
            <textarea
              :value="selectedNode.content.text"
              @input="updateNodeText(selectedNode.id, $event.target.value)"
              class="w-full p-3 border-2 border-divider rounded-lg
                     bg-paper dark:bg-paper-dark text-ink dark:text-ink-dark
                     min-h-[120px] focus:border-sepia focus:outline-none font-serif"
              placeholder="Schreiben Sie hier Ihren Geschichtentext..."
            />
          </div>

          <div class="mb-4">
            <div class="flex justify-between items-center mb-2">
              <label class="block text-sm font-medium text-ink dark:text-ink-dark">Entscheidungen</label>
              <button
                @click="addChoice(selectedNode.id, 'Neue Entscheidung')"
                class="btn-secondary text-sm"
              >
                + Entscheidung hinzufügen
              </button>
            </div>

            <div v-if="selectedNode.choices && selectedNode.choices.length > 0" class="space-y-2">
              <div
                v-for="(choice, index) in selectedNode.choices"
                :key="index"
                class="flex gap-2 items-center p-3 bg-shadow/20 dark:bg-paper-dark rounded-lg border border-divider"
              >
                <input
                  :value="choice.text"
                  @input="updateChoice(selectedNode.id, index, { text: $event.target.value })"
                  class="flex-1 p-2 border border-divider rounded
                         bg-paper dark:bg-paper-dark text-ink dark:text-ink-dark"
                  placeholder="Entscheidungstext"
                />
                <select
                  :value="choice.targetNode"
                  @change="updateChoice(selectedNode.id, index, { targetNode: $event.target.value })"
                  class="p-2 border border-divider rounded
                         bg-paper dark:bg-paper-dark text-ink dark:text-ink-dark"
                >
                  <option value="">→ Ziel</option>
                  <option
                    v-for="node in campaign.nodes"
                    :key="node.id"
                    :value="node.id"
                  >
                    {{ node.id }}
                  </option>
                </select>
                <button
                  @click="deleteChoice(selectedNode.id, index)"
                  class="btn-secondary text-sm px-3"
                >
                  ×
                </button>
              </div>
            </div>
            <p v-else class="text-sm text-ink-light dark:text-ink-dark/70">Noch keine Entscheidungen</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useEditorStore } from '../stores/editor'

const editorStore = useEditorStore()
const { campaign, selectedNodeId, selectedNode, isCampaignLoaded } = storeToRefs(editorStore)
const {
  createNewCampaign,
  createNode,
  updateNodeText,
  deleteNode,
  addChoice,
  updateChoice,
  deleteChoice,
  exportCampaign,
  importCampaign,
  saveCampaign,
} = editorStore

// Handle save
function handleSave() {
  try {
    saveCampaign()
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
    const success = importCampaign(e.target.result)
    if (success) {
      alert('Geschichte importiert!')
    } else {
      alert('Fehler beim Importieren')
    }
  }
  reader.readAsText(file)
}
</script>
