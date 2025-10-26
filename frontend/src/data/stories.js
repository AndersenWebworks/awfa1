/**
 * Story Library - Available stories for players
 *
 * Each story can be:
 * - Embedded (included in build)
 * - External (loaded from URL)
 * - User-imported (from JSON file)
 */

// Import the demo story
import demoStory from '../../public/demo-story.json'

export const AVAILABLE_STORIES = [
  {
    id: 'demo_001',
    title: 'Die verborgene Kammer',
    author: 'Team Syntax, Serif & Dice',
    description: 'Du stehst vor einer alten, verwitterten Tür tief im Keller des vergessenen Turms. Eine kurze Demo-Geschichte um die Engine zu testen.',
    genre: ['Fantasy', 'Adventure'],
    tags: ['demo', 'tutorial', 'kurz'],
    difficulty: 'Einfach',
    estimatedPlaytime: '10-15 Min',
    endings: 3,
    coverImage: null, // TODO: Add cover images later

    // Embedded story data
    data: demoStory,

    // Stats for display
    stats: {
      nodes: 10,
      choices: 15,
      endings: 3,
    }
  },

  // Future stories will be added here
  // {
  //   id: 'story_002',
  //   title: 'Der verfluchte Wald',
  //   ...
  // }
]

/**
 * Get all available stories
 */
export function getAllStories() {
  return AVAILABLE_STORIES
}

/**
 * Get story by ID
 */
export function getStoryById(id) {
  return AVAILABLE_STORIES.find(story => story.id === id)
}

/**
 * Get featured stories (for home page)
 */
export function getFeaturedStories() {
  // For now, return all stories
  // Later: add featured flag
  return AVAILABLE_STORIES
}
