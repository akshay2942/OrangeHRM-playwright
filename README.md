# Playwright OrangeHRM Framework

Enterprise Playwright + TypeScript automation framework for [OrangeHRM](https://opensource-demo.orangehrmlive.com/) using Page Object Model, fixtures, Allure/HTML reporting, multi-env dotenv, ESLint/Prettier, and official Playwright MCP.

## Quick start

```bash
cd playwright-orangehrm
npm install
npx playwright install
npx playwright test --project=chromium --grep @smoke
```

Demo credentials (also in `.env.qa`):

| Field | Value |
| --- | --- |
| URL | https://opensource-demo.orangehrmlive.com/ |
| Username | Admin |
| Password | admin123 |

## Project structure

```
playwright-orangehrm/
├── api/                 # REST API clients (Playwright APIRequestContext)
├── components/          # Shared UI components (menu, toast, table, dialogs)
├── config/              # Env loader
├── constants/           # URLs, timeouts, messages, endpoints
├── data/                # JSON fixtures + auth storage state (gitignored)
├── fixtures/            # Playwright fixtures (pages, auth, API)
├── locators/            # Selectors only
├── pages/               # Actions only (extend BasePage)
├── tests/               # Specs by module + API
├── utils/               # Logger, Faker, CSV/Excel/JSON, retry, wait
├── docs/MCP.md          # Playwright MCP usage
└── .github/workflows/   # CI pipeline
```

**POM rule:** locators stay in `locators/`, actions in `pages/`, assertions in specs (`expect`) or thin assertion helpers — never mixed into action methods.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm test` | Run all projects |
| `npm run test:smoke` | `@smoke` tagged tests |
| `npm run test:regression` | `@regression` tagged tests |
| `npm run test:headed` | Headed mode |
| `npm run test:chrome` / `firefox` / `webkit` / `edge` | Single browser |
| `npm run test:ui` | Playwright UI mode |
| `npm run report` | Open HTML report |
| `npm run report:allure` | Generate + open Allure |
| `npm run lint` / `format` / `typecheck` | ESLint / Prettier / `tsc --noEmit` |
| `npm run auth:setup` | Regenerate storage state |

## Environments

Set `TEST_ENV` to load `.env.qa`, `.env.stage`, or `.env.prod`:

```bash
TEST_ENV=qa npx playwright test --project=chromium
```

Key variables: `BASE_URL`, `USERNAME`, `PASSWORD`, `ENV_NAME`, timeouts, `HEADLESS`, `WORKERS`, `RETRIES`.

Do not commit secrets beyond the documented demo credentials.

## Auth / storage state

- Setup project `tests/auth.setup.ts` logs in once and writes `data/auth/storageState.json` (gitignored).
- Chromium/Firefox/WebKit/Edge projects reuse that state.
- Login specs run on `chromium-login` without storage state.

## Tags

Use title tags for filtering:

- `@smoke` — critical path / navigation / auth
- `@regression` — broader CRUD flows
- `@admin` `@pim` `@leave` `@time` `@recruitment` `@api` — module filters

```bash
npx playwright test --grep @admin
```

## Reports & artifacts

| Artifact | Location |
| --- | --- |
| HTML report | `reports/html` |
| Allure results | `allure-results` → `npm run report:allure` |
| Screenshots | `screenshots/` (on failure) |
| Videos / traces | `test-results/` (retain on failure) |
| Logs | `logs/` |

## Playwright MCP (Cursor)

See [docs/MCP.md](docs/MCP.md). Config lives in `.cursor/mcp.json` (`npx @playwright/mcp@latest`).

Use MCP to inspect live pages, propose stable locators, draft POM methods, and triage failures with screenshots/traces.

## CI

GitHub Actions workflow: `.github/workflows/playwright.yml`

Pipeline: install → lint → browsers → `@smoke` on Chromium → upload HTML/Allure/traces.

## Best practices

- ES modules + `async/await` + JSDoc on public methods
- Prefer role/label/placeholder locators over brittle CSS
- No hard sleeps; use Playwright auto-wait and `expect`
- Unique Faker data per run; clean up created entities when the demo allows
- Keep pages thin: orchestrate components + locators only

## Known demo limitations

- Public OrangeHRM demo data resets and rate-limits; concurrent runs can collide
- Leave types / balances / vacancies may be empty or change without notice
- Some REST v2 endpoints return 401/404 without a full API session — API tests skip when unavailable
- Edge project requires Microsoft Edge installed locally (CI focuses on Chromium/Firefox/WebKit)

## Troubleshooting

| Issue | Fix |
| --- | --- |
| Auth / redirected to login | Re-run `npm run auth:setup` or delete `data/auth/storageState.json` |
| Flaky autocomplete | Ensure option is selected from dropdown before Search |
| Toast assertion fails | OrangeHRM title is often `Success`; message body holds the detail |
| Delete dialog not found | Confirm `.oxd-dialog-sheet` (not hidden `role=dialog` overlays) |
| Browsers missing | `npx playwright install` |

## License

MIT
