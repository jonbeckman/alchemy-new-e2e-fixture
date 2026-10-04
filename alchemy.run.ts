import * as Alchemy from "alchemy"
import * as Command from "alchemy/Command"
import * as Effect from "effect/Effect"

export default Alchemy.Stack(
  "AlchemyNewDisposableE2E",
  { providers: Command.providers(), state: Alchemy.localState() },
  Effect.gen(function* () {
    const stage = yield* Alchemy.Stage
    if (!/^e2e-[a-z0-9-]+$/.test(stage)) throw new Error("Fixture requires an isolated e2e- stage")
    yield* Command.Exec("disposable-marker", {
      command: "node write-marker.mjs",
      memo: false,
      timeout: "30 seconds",
    })
    return { stage }
  }),
)
