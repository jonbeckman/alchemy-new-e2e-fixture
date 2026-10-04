import { writeFileSync } from "node:fs"

const stage = process.env.ALCHEMY_STAGE
if (!stage || !/^e2e-[a-z0-9-]+$/.test(stage)) throw new Error("Unsafe fixture stage")
if (process.env.E2E_FAIL === "true") {
  console.error("E2E fixture intentional failure")
  process.exit(23)
}
writeFileSync(
  "deployment-marker.json",
  JSON.stringify({ stage, generatedPasswordPresent: Boolean(process.env.E2E_ADMIN_PASSWORD) }) +
    "\n",
)
console.log("E2E fixture marker created")
