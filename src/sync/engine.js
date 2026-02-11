const { clickUpTaskToPlanner, plannerTaskToClickUp, hasTaskChanged } = require("./mapper");
const { loadState, saveState } = require("./state");

class SyncEngine {
  constructor(clickUpClient, plannerClient, config) {
    this.clickUp = clickUpClient;
    this.planner = plannerClient;
    this.config = config;
  }

  async sync(direction) {
    const state = loadState();
    const results = { created: 0, updated: 0, errors: [] };

    console.log(`Starting sync (direction: ${direction})...`);

    try {
      if (direction === "clickup-to-planner" || direction === "bidirectional") {
        const r = await this.syncClickUpToPlanner(state);
        results.created += r.created;
        results.updated += r.updated;
        results.errors.push(...r.errors);
      }

      if (direction === "planner-to-clickup" || direction === "bidirectional") {
        const r = await this.syncPlannerToClickUp(state);
        results.created += r.created;
        results.updated += r.updated;
        results.errors.push(...r.errors);
      }

      saveState(state);
    } catch (err) {
      results.errors.push(`Sync failed: ${err.message}`);
    }

    console.log(
      `Sync complete — created: ${results.created}, updated: ${results.updated}, errors: ${results.errors.length}`
    );
    return results;
  }

  async syncClickUpToPlanner(state) {
    const results = { created: 0, updated: 0, errors: [] };

    const clickUpTasks = await this.clickUp.getTasks(this.config.clickUpListId);
    console.log(`Fetched ${clickUpTasks.length} tasks from ClickUp`);

    // Ensure a default bucket exists in Planner
    let bucketId = this.config.plannerBucketId;
    if (!bucketId) {
      const buckets = await this.planner.getBuckets(this.config.plannerPlanId);
      if (buckets.length > 0) {
        bucketId = buckets[0].id;
      } else {
        const bucket = await this.planner.createBucket(
          this.config.plannerPlanId,
          "ClickUp Tasks"
        );
        bucketId = bucket.id;
      }
    }

    for (const cuTask of clickUpTasks) {
      try {
        const plannerData = clickUpTaskToPlanner(
          cuTask,
          this.config.plannerPlanId,
          bucketId
        );

        const existingPlannerId = state.clickupToPlanner[cuTask.id];

        if (existingPlannerId) {
          // Task already synced — check for updates
          const existingTask = await this.planner.getTask(existingPlannerId);
          if (hasTaskChanged(existingTask, plannerData, "planner")) {
            await this.planner.updateTask(
              existingPlannerId,
              plannerData,
              existingTask["@odata.etag"]
            );
            console.log(`Updated Planner task: ${plannerData.title}`);
            results.updated++;
          }
        } else {
          // New task — create in Planner
          const created = await this.planner.createTask(plannerData);

          // Set description via task details
          if (plannerData.description) {
            const details = await this.planner.getTaskDetails(created.id);
            await this.planner.updateTaskDetails(
              created.id,
              { description: plannerData.description },
              details["@odata.etag"]
            );
          }

          state.clickupToPlanner[cuTask.id] = created.id;
          state.plannerToClickup[created.id] = cuTask.id;
          console.log(`Created Planner task: ${plannerData.title}`);
          results.created++;
        }
      } catch (err) {
        const msg = `Failed to sync ClickUp task "${cuTask.name}": ${err.message}`;
        console.error(msg);
        results.errors.push(msg);
      }
    }

    return results;
  }

  async syncPlannerToClickUp(state) {
    const results = { created: 0, updated: 0, errors: [] };

    const plannerTasks = await this.planner.getTasks(this.config.plannerPlanId);
    console.log(`Fetched ${plannerTasks.length} tasks from Planner`);

    for (const pTask of plannerTasks) {
      try {
        // Fetch description from task details
        let description = "";
        try {
          const details = await this.planner.getTaskDetails(pTask.id);
          description = details.description || "";
        } catch {
          // Details may not exist yet
        }

        const clickUpData = plannerTaskToClickUp(pTask, description);
        const existingClickUpId = state.plannerToClickup[pTask.id];

        if (existingClickUpId) {
          // Task already synced — check for updates
          const existingTask = await this.clickUp.getTask(existingClickUpId);
          if (hasTaskChanged(existingTask, clickUpData, "clickup")) {
            await this.clickUp.updateTask(existingClickUpId, clickUpData);
            console.log(`Updated ClickUp task: ${clickUpData.name}`);
            results.updated++;
          }
        } else {
          // New task — create in ClickUp
          const created = await this.clickUp.createTask(
            this.config.clickUpListId,
            clickUpData
          );

          state.plannerToClickup[pTask.id] = created.id;
          state.clickupToPlanner[created.id] = pTask.id;
          console.log(`Created ClickUp task: ${clickUpData.name}`);
          results.created++;
        }
      } catch (err) {
        const msg = `Failed to sync Planner task "${pTask.title}": ${err.message}`;
        console.error(msg);
        results.errors.push(msg);
      }
    }

    return results;
  }
}

module.exports = SyncEngine;
