/**
 * Version & Build Information
 *
 * Centralized version config for the app
 */

import packageJson from '../../package.json'

export const VERSION = packageJson.version
export const BUILD_DATE = new Date().toISOString().split('T')[0] // YYYY-MM-DD
export const APP_NAME = 'AWFA1 Text Adventure Engine'
export const REPO_URL = 'https://github.com/AndersenWebworks/awfa1'

/**
 * Log version info to console
 */
export function logVersionInfo() {
  console.log(
    `%c🎮 ${APP_NAME}%c\n` +
    `%c📦 Version: ${VERSION}%c\n` +
    `%c🕐 Build: ${BUILD_DATE}%c\n` +
    `%c🔗 ${REPO_URL}%c`,
    'color: #3b82f6; font-size: 16px; font-weight: bold;', '',
    'color: #10b981; font-weight: bold;', '',
    'color: #8b5cf6; font-weight: bold;', '',
    'color: #6366f1; font-weight: bold;', ''
  )
}

/**
 * Get formatted version string for UI
 */
export function getVersionString() {
  return `v${VERSION} · Build ${BUILD_DATE}`
}
