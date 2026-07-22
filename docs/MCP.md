# Playwright MCP for OrangeHRM

This project includes the official Playwright MCP server so Cursor can inspect pages, propose locators, generate POM methods, and help debug failures.

## Configuration

File: [`.cursor/mcp.json`](../.cursor/mcp.json)

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest", "--headless"]
    }
  }
}
```

Remove `--headless` if you want a visible browser while MCP navigates.

## Enable in Cursor

1. Open Cursor Settings → MCP
2. Confirm the `playwright` server from this project's `.cursor/mcp.json` is listed
3. Restart Cursor / reload MCP if needed
4. Ask the agent to open `https://opensource-demo.orangehrmlive.com/` and inspect elements

## Useful prompts

- "Open the OrangeHRM login page and list stable role/label locators for username, password, and Login."
- "Navigate to Admin → System Users and generate a locator file + AdminPage methods for search and add user."
- "A test failed with this trace/screenshot — suggest a more resilient selector."
- "Compare my `login.locators.js` against the live page and flag brittle CSS."

## Best practices with MCP

- Prefer `getByRole`, `getByLabel`, `getByPlaceholder`, `getByText`, `getByTestId`
- Keep selectors in `locators/`; keep actions in `pages/`
- Do not hardcode waits; rely on Playwright auto-waiting and `expect`
- Re-validate generated locators with a short smoke test before committing
