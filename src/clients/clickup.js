const axios = require("axios");

const BASE_URL = "https://api.clickup.com/api/v2";

class ClickUpClient {
  constructor(apiToken) {
    this.client = axios.create({
      baseURL: BASE_URL,
      headers: {
        Authorization: apiToken,
        "Content-Type": "application/json",
      },
    });
  }

  async getTasks(listId, options = {}) {
    const params = {
      archived: false,
      include_closed: options.includeClosed || false,
      subtasks: options.includeSubtasks || false,
      ...options.params,
    };
    const response = await this.client.get(`/list/${listId}/task`, { params });
    return response.data.tasks;
  }

  async getTask(taskId) {
    const response = await this.client.get(`/task/${taskId}`);
    return response.data;
  }

  async createTask(listId, task) {
    const response = await this.client.post(`/list/${listId}/task`, {
      name: task.name,
      description: task.description || "",
      status: task.status,
      priority: task.priority,
      due_date: task.dueDate ? new Date(task.dueDate).getTime() : undefined,
      assignees: task.assignees || [],
      tags: task.tags || [],
    });
    return response.data;
  }

  async updateTask(taskId, updates) {
    const payload = {};
    if (updates.name !== undefined) payload.name = updates.name;
    if (updates.description !== undefined)
      payload.description = updates.description;
    if (updates.status !== undefined) payload.status = updates.status;
    if (updates.priority !== undefined) payload.priority = updates.priority;
    if (updates.dueDate !== undefined)
      payload.due_date = updates.dueDate
        ? new Date(updates.dueDate).getTime()
        : null;

    const response = await this.client.put(`/task/${taskId}`, payload);
    return response.data;
  }

  async getStatuses(listId) {
    const response = await this.client.get(`/list/${listId}`);
    return response.data.statuses;
  }

  async getTeams() {
    const response = await this.client.get("/team");
    return response.data.teams;
  }

  async getSpaces(teamId) {
    const response = await this.client.get(`/team/${teamId}/space`);
    return response.data.spaces;
  }

  async getLists(folderId) {
    const response = await this.client.get(`/folder/${folderId}/list`);
    return response.data.lists;
  }

  async getFolderlessLists(spaceId) {
    const response = await this.client.get(`/space/${spaceId}/list`);
    return response.data.lists;
  }
}

module.exports = ClickUpClient;
