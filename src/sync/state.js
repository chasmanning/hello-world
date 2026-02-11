const fs = require("fs");
const path = require("path");

const STATE_FILE = path.resolve(process.cwd(), ".sync-state.json");

/**
 * Persists a mapping of synced task IDs between ClickUp and Planner
 * so that updates can be applied to the correct counterpart.
 *
 * State shape:
 * {
 *   "clickupToPlanner": { "<clickup_id>": "<planner_id>" },
 *   "plannerToClickup": { "<planner_id>": "<clickup_id>" },
 *   "lastSync": "<ISO timestamp>"
 * }
 */

function loadState() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      const raw = fs.readFileSync(STATE_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch {
    // Corrupted state file — start fresh
  }
  return { clickupToPlanner: {}, plannerToClickup: {}, lastSync: null };
}

function saveState(state) {
  state.lastSync = new Date().toISOString();
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), "utf-8");
}

module.exports = { loadState, saveState };
