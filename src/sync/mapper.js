/**
 * Maps task data between ClickUp and MS Planner formats.
 *
 * ClickUp priorities: 1 (urgent), 2 (high), 3 (normal), 4 (low)
 * Planner priorities: 0 (no priority), 1 (urgent), 3 (important), 5 (medium), 9 (low/best effort)
 *
 * ClickUp statuses are custom per list; Planner uses percentComplete (0, 50, 100).
 */

const CLICKUP_TO_PLANNER_PRIORITY = {
  1: 1, // urgent -> urgent
  2: 3, // high -> important
  3: 5, // normal -> medium
  4: 9, // low -> best effort
};

const PLANNER_TO_CLICKUP_PRIORITY = {
  0: 3, // no priority -> normal
  1: 1, // urgent -> urgent
  3: 2, // important -> high
  5: 3, // medium -> normal
  9: 4, // best effort -> low
};

function clickUpTaskToPlanner(clickUpTask, planId, bucketId) {
  const percentComplete = mapClickUpStatusToPercent(clickUpTask.status);

  return {
    planId,
    bucketId,
    title: clickUpTask.name,
    description: clickUpTask.description || "",
    percentComplete,
    dueDate: clickUpTask.due_date
      ? new Date(parseInt(clickUpTask.due_date)).toISOString()
      : null,
    priority: CLICKUP_TO_PLANNER_PRIORITY[clickUpTask.priority?.id] || 5,
  };
}

function plannerTaskToClickUp(plannerTask, description) {
  return {
    name: plannerTask.title,
    description: description || "",
    status: mapPercentToClickUpStatus(plannerTask.percentComplete),
    priority: PLANNER_TO_CLICKUP_PRIORITY[plannerTask.priority] || 3,
    dueDate: plannerTask.dueDateTime || null,
  };
}

function mapClickUpStatusToPercent(status) {
  if (!status) return 0;
  const statusName = (status.status || status).toLowerCase();
  if (statusName === "complete" || statusName === "closed" || statusName === "done") {
    return 100;
  }
  if (statusName === "in progress" || statusName === "in review") {
    return 50;
  }
  return 0;
}

function mapPercentToClickUpStatus(percentComplete) {
  if (percentComplete === 100) return "complete";
  if (percentComplete >= 50) return "in progress";
  return "to do";
}

function hasTaskChanged(existingTask, incomingData, platform) {
  if (platform === "planner") {
    return (
      existingTask.title !== incomingData.title ||
      existingTask.percentComplete !== incomingData.percentComplete ||
      existingTask.dueDateTime !== incomingData.dueDate
    );
  }
  // clickup
  return (
    existingTask.name !== incomingData.name ||
    (existingTask.status?.status || "").toLowerCase() !==
      (incomingData.status || "").toLowerCase() ||
    existingTask.due_date !== incomingData.dueDate
  );
}

module.exports = {
  clickUpTaskToPlanner,
  plannerTaskToClickUp,
  hasTaskChanged,
  mapClickUpStatusToPercent,
  mapPercentToClickUpStatus,
  CLICKUP_TO_PLANNER_PRIORITY,
  PLANNER_TO_CLICKUP_PRIORITY,
};
