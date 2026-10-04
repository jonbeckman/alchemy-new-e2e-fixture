# Disposable deployment fixture

Publish this directory unchanged as the root of the public repository
`jonbeckman/alchemy-new-e2e-fixture`, then create an immutable GitHub release
`v1.0.0-e2e.1`. The service intentionally accepts versioned public sources, so a local
path or an unpublished tag cannot replace that release. No npm publication is
needed for GitHub deployment coverage.

The stack runs a genuine Alchemy `Command.Exec` resource in the genuine
Cloudflare Sandbox. It writes a stage marker and records whether a generated
password reached the process. It never writes the password to disk or logs and
never creates cloud resources outside the Sandbox. `E2E_FAIL=true` exercises a
real failing apply. Only `e2e-` stages are permitted. Alchemy local state and the
marker are preserved by the deployment service, and the Sandbox is destroyed by
its normal cleanup path. Claims expire after 30 days in the development R2/D1
bindings; the tests revoke their disposable user sessions.

Validate before publishing with a frozen Nub install, then:

```sh
ALCHEMY_STAGE=e2e-local E2E_ADMIN_PASSWORD=disposable-local-only CI=1 nub exec alchemy deploy alchemy.run.ts --stage e2e-local --yes
CI=1 nub exec alchemy destroy alchemy.run.ts --stage e2e-local --yes
```

This is a source fixture, not another test runner.
