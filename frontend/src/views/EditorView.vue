<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 safe-area">
    <div class="container-mobile">
      <header class="flex justify-between items-center mb-8">
        <router-link to="/" class="btn-secondary">
          ← Home
        </router-link>

        <div class="flex gap-2">
          <button @click="handleExport" class="btn-secondary text-sm">
            📥 Export
          </button>
          <label class="btn-secondary text-sm cursor-pointer">
            📤 Import
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
        <h2 class="text-2xl font-bold mb-4">Story Editor</h2>
        <p class="mb-6 text-gray-600 dark:text-gray-400">
          Create a new campaign or import an existing one
        </p>

        <div class="flex flex-col gap-3 max-w-md mx-auto">
          <button @click="createNewCampaign()" class="btn-primary">
            ✨ Create New Campaign
          </button>

          <label class="btn-secondary cursor-pointer">
            📁 Import Campaign JSON
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
          <h1 class="text-3xl font-bold">{{ campaign.title }}</h1>
          <p class="text-gray-600 dark:text-gray-400">{{ campaign.nodes.length }} nodes</p>
        </div>

        <!-- Node List (Simple for now, we'll enhance later) -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-bold">Story Nodes</h3>
            <button @click="createNode()" class="btn-primary">
              + Add Node
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
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
              ]"
            >
              <div class="flex justify-between items-start gap-4">
                <div class="flex-1 min-w-0">
                  <p class="font-mono text-sm text-gray-500 mb-1">{{ node.id }}</p>
                  <p class="truncate">{{ node.content.text || '(empty)' }}</p>
                  <p class="text-sm text-gray-500 mt-2">
                    {{ node.choices?.length || 0 }} choice(s)
                  </p>
                </div>
                <button
                  @click.stop="deleteNode(node.id)"
                  class="btn-secondary text-sm"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Node Editor Panel (when node is selected) -->
        <div v-if="selectedNode" class="mt-6 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 class="text-lg font-bold mb-4">Edit Node: {{ selectedNode.id }}</h3>

          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Node Text</label>
            <textarea
              :value="selectedNode.content.text"
              @input="updateNodeText(selectedNode.id, $event.target.value)"
              class="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     min-h-[120px] focus:border-blue-500 focus:outline-none"
              placeholder="Write your story text here..."
            />
          </div>

          <div class="mb-4">
            <div class="flex justify-between items-center mb-2">
              <label class="block text-sm font-medium">Choices</label>
              <button
                @click="addChoice(selectedNode.id, 'New Choice')"
                class="btn-secondary text-sm"
              >
                + Add Choice
              </button>
            </div>

            <div v-if="selectedNode.choices && selectedNode.choices.length > 0" class="space-y-2">
              <div
                v-for="(choice, index) in selectedNode.choices"
                :key="index"
                class="flex gap-2 items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <input
                  :value="choice.text"
                  @input="updateChoice(selectedNode.id, index, { text: $event.target.value })"
                  class="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Choice text"
                />
                <select
                  :value="choice.targetNode"
                  @change="updateChoice(selectedNode.id, index, { targetNode: $event.target.value })"
                  class="p-2 border border-gray-300 dark:border-gray-600 rounded
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="">→ Target</option>
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
                  class="btn-secondary text-sm"
                >
                  🗑️
                </button>
              </div>
            </div>
            <p v-else class="text-sm text-gray-500">No choices yet</p>
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
} = editorStore

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
      alert('Campaign imported successfully!')
    } else {
      alert('Failed to import campaign')
    }
  }
  reader.readAsText(file)
}
</script>
