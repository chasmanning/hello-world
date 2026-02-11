const {
  Client: GraphClient,
} = require("@microsoft/microsoft-graph-client");
const {
  ClientSecretCredential,
} = require("@azure/identity");
const {
  TokenCredentialAuthenticationProvider,
} = require("@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials");

class PlannerClient {
  constructor({ clientId, clientSecret, tenantId }) {
    const credential = new ClientSecretCredential(
      tenantId,
      clientId,
      clientSecret
    );

    const authProvider = new TokenCredentialAuthenticationProvider(credential, {
      scopes: ["https://graph.microsoft.com/.default"],
    });

    this.client = GraphClient.initWithMiddleware({ authProvider });
  }

  async getPlans(groupId) {
    const result = await this.client
      .api(`/groups/${groupId}/planner/plans`)
      .get();
    return result.value;
  }

  async getPlanDetails(planId) {
    return this.client.api(`/planner/plans/${planId}/details`).get();
  }

  async getBuckets(planId) {
    const result = await this.client
      .api(`/planner/plans/${planId}/buckets`)
      .get();
    return result.value;
  }

  async getTasks(planId) {
    const result = await this.client
      .api(`/planner/plans/${planId}/tasks`)
      .get();
    return result.value;
  }

  async getTask(taskId) {
    return this.client.api(`/planner/tasks/${taskId}`).get();
  }

  async getTaskDetails(taskId) {
    return this.client.api(`/planner/tasks/${taskId}/details`).get();
  }

  async createTask(task) {
    return this.client.api("/planner/tasks").post({
      planId: task.planId,
      bucketId: task.bucketId,
      title: task.title,
      percentComplete: task.percentComplete || 0,
      dueDateTime: task.dueDate || null,
      assignments: task.assignments || {},
    });
  }

  async updateTask(taskId, updates, etag) {
    const headers = { "If-Match": etag };
    const payload = {};

    if (updates.title !== undefined) payload.title = updates.title;
    if (updates.percentComplete !== undefined)
      payload.percentComplete = updates.percentComplete;
    if (updates.dueDate !== undefined) payload.dueDateTime = updates.dueDate;
    if (updates.bucketId !== undefined) payload.bucketId = updates.bucketId;

    return this.client
      .api(`/planner/tasks/${taskId}`)
      .headers(headers)
      .patch(payload);
  }

  async updateTaskDetails(taskId, updates, etag) {
    const headers = { "If-Match": etag };
    const payload = {};

    if (updates.description !== undefined)
      payload.description = updates.description;

    return this.client
      .api(`/planner/tasks/${taskId}/details`)
      .headers(headers)
      .patch(payload);
  }

  async createBucket(planId, name) {
    return this.client.api("/planner/buckets").post({
      planId,
      name,
    });
  }
}

module.exports = PlannerClient;
