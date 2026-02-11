# ClickUp ↔ Microsoft Planner Integration

Bi-directional sync between ClickUp tasks and Microsoft Planner tasks.

## Features

- **ClickUp → Planner**: Sync tasks from a ClickUp list into a Planner plan
- **Planner → ClickUp**: Sync tasks from a Planner plan into a ClickUp list
- **Bi-directional**: Run both directions in a single sync
- **Incremental sync**: Tracks previously synced tasks to avoid duplicates and apply updates
- **Status mapping**: Automatically maps ClickUp statuses to Planner percentComplete (and vice versa)
- **Priority mapping**: Maps priority levels between both platforms
- **Scheduled sync**: Optionally run on an interval for continuous synchronization

## Prerequisites

- **Node.js** 18+
- A **ClickUp** account with an API token ([generate one here](https://app.clickup.com/settings/apps))
- A **Microsoft Azure AD / Entra ID** app registration with the following **application** permissions:
  - `Tasks.ReadWrite.All`
  - `Group.Read.All`

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the example environment file and fill in your credentials:

   ```bash
   cp .env.example .env
   ```

3. Configure `.env` with your values:

   | Variable | Description |
   |---|---|
   | `CLICKUP_API_TOKEN` | Your ClickUp personal API token |
   | `CLICKUP_LIST_ID` | The ClickUp list to sync |
   | `MS_CLIENT_ID` | Azure AD app client ID |
   | `MS_CLIENT_SECRET` | Azure AD app client secret |
   | `MS_TENANT_ID` | Azure AD tenant ID |
   | `MS_PLANNER_GROUP_ID` | Microsoft 365 group that owns the plan |
   | `MS_PLANNER_PLAN_ID` | The Planner plan to sync |

## Usage

Run a one-time bi-directional sync:

```bash
npm start
```

Sync in one direction only:

```bash
npm run sync:clickup-to-planner
npm run sync:planner-to-clickup
```

Run with a custom direction and continuous interval (e.g. every 5 minutes):

```bash
node src/index.js sync --direction bidirectional --interval 300000
```

## Architecture

```
src/
├── index.js              # CLI entry point
├── clients/
│   ├── clickup.js        # ClickUp REST API client
│   └── planner.js        # MS Graph Planner API client
└── sync/
    ├── engine.js         # Sync orchestration logic
    ├── mapper.js         # Task field mapping between platforms
    └── state.js          # Persistent sync state (ID mapping)
```

## How Mapping Works

| ClickUp | MS Planner |
|---|---|
| Task name | Task title |
| Description | Task details description |
| Due date | Due date/time |
| Status: "to do" | percentComplete: 0 |
| Status: "in progress" | percentComplete: 50 |
| Status: "complete" | percentComplete: 100 |
| Priority 1 (urgent) | Priority 1 (urgent) |
| Priority 2 (high) | Priority 3 (important) |
| Priority 3 (normal) | Priority 5 (medium) |
| Priority 4 (low) | Priority 9 (best effort) |
