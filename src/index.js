require("dotenv").config();

const ClickUpClient = require("./clients/clickup");
const PlannerClient = require("./clients/planner");
const SyncEngine = require("./sync/engine");

const REQUIRED_ENV = [
  "CLICKUP_API_TOKEN",
  "CLICKUP_LIST_ID",
  "MS_CLIENT_ID",
  "MS_CLIENT_SECRET",
  "MS_TENANT_ID",
  "MS_PLANNER_PLAN_ID",
];

function validateEnv() {
  const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    console.error(
      `Missing required environment variables:\n  ${missing.join("\n  ")}`
    );
    console.error("\nCopy .env.example to .env and fill in your values.");
    process.exit(1);
  }
}

function parseArgs() {
  const args = process.argv.slice(2);
  const command = args[0] || "sync";
  const directionFlag = args.indexOf("--direction");
  const direction =
    directionFlag !== -1
      ? args[directionFlag + 1]
      : process.env.SYNC_DIRECTION || "bidirectional";

  const intervalFlag = args.indexOf("--interval");
  const interval =
    intervalFlag !== -1
      ? parseInt(args[intervalFlag + 1], 10)
      : null;

  return { command, direction, interval };
}

async function main() {
  validateEnv();

  const { command, direction, interval } = parseArgs();

  const clickUp = new ClickUpClient(process.env.CLICKUP_API_TOKEN);
  const planner = new PlannerClient({
    clientId: process.env.MS_CLIENT_ID,
    clientSecret: process.env.MS_CLIENT_SECRET,
    tenantId: process.env.MS_TENANT_ID,
  });

  const config = {
    clickUpListId: process.env.CLICKUP_LIST_ID,
    plannerPlanId: process.env.MS_PLANNER_PLAN_ID,
    plannerGroupId: process.env.MS_PLANNER_GROUP_ID,
    plannerBucketId: process.env.MS_PLANNER_BUCKET_ID || null,
  };

  const engine = new SyncEngine(clickUp, planner, config);

  if (command === "sync") {
    const results = await engine.sync(direction);

    if (interval) {
      console.log(`\nScheduling next sync in ${interval}ms...`);
      setInterval(async () => {
        console.log(`\n--- Scheduled sync at ${new Date().toISOString()} ---`);
        await engine.sync(direction);
      }, interval);
    } else {
      if (results.errors.length > 0) {
        process.exit(1);
      }
    }
  } else {
    console.error(`Unknown command: ${command}`);
    console.error("Usage: node src/index.js sync [--direction <direction>] [--interval <ms>]");
    console.error("Directions: bidirectional, clickup-to-planner, planner-to-clickup");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err.message);
  process.exit(1);
});
