---
name: gog-google-drive-docs
description: 'Use gogcli (`gog`) to authenticate, inspect Google Drive files, upload/download content, and create/read/update/export Google Docs. Use when working from VS Code or the terminal with Google Drive, Google Docs, doc IDs, Drive file IDs, JSON output, or repeatable gog scripts.'
argument-hint: 'What Drive or Docs task do you want to perform with gog?'
user-invocable: true
disable-model-invocation: false
---

# gog Google Drive and Docs

Use this skill when the task is to interact with Google Drive or Google Docs through `gog` rather than the browser UI.

## When to Use

- Need to authenticate `gog` for Drive or Docs access
- Need to list, search, inspect, upload, or download Drive files
- Need to create, read, export, or update Google Docs
- Need script-friendly output with `--json`, `--plain`, `--results-only`, or `--select`
- Need to decide between interactive auth, read-only access, and write-capable access

## Inputs to Collect First

Before running commands, collect the minimum missing context:

- Google account email for `--account` or `gog auth add`
- Whether the task is read-only or will modify Drive or Docs content
- Whether the task targets My Drive only or should include shared drives
- Known identifiers: Drive file ID, Docs ID, folder ID, or search terms
- Desired output mode: human-readable terminal output, `--plain`, or `--json`

If the task is ambiguous, ask for the target file or doc, the intended operation, and whether scripting output is required.

## Decision Points

### 1. Choose Auth Scope

- Use `--readonly` when the task only needs inspection, listing, search, or export
- Use default write-capable scopes when the task creates, uploads, edits, shares, or deletes
- Use `--drive-scope file` only when the user explicitly wants narrower Drive access and understands the limitation

### 2. Choose Output Mode

- Use default output for quick manual inspection
- Use `--plain` for stable terminal parsing without JSON envelopes
- Use `--json --results-only` by default for scripts or when the next step needs machine-readable IDs
- Add `--select` when only a few JSON fields are needed

### 3. Choose Query Strategy

- Use `gog drive ls` when the parent folder is known
- Use `gog drive search <terms>` when only names or content are known
- Use `gog drive search --raw-query` when the user already has a Drive query expression

## Procedure

### 1. Verify CLI and Auth Status

Start by confirming the CLI is available and checking existing auth state.

```bash
gog --help
gog auth status
gog auth list
```

If the needed account is not configured, authorize it.

Read-only example:

```bash
gog auth add you@example.com --services drive,docs --readonly
```

Write-capable example:

```bash
gog auth add you@example.com --services drive,docs
```

Remote or browserless example:

```bash
gog auth add you@example.com --services drive,docs --remote --step 1
```

Use `--manual` or the remote two-step flow when a browser callback is not practical.

### 2. Identify the Target File or Doc

If the user does not already have an ID, resolve it before attempting edits or downloads.

List root files:

```bash
gog drive ls --account you@example.com
```

List a specific folder:

```bash
gog drive ls --account you@example.com --parent FOLDER_ID
```

Search by name or content terms:

```bash
gog drive search project brief --account you@example.com
```

Script-friendly search:

```bash
gog drive search project brief --account you@example.com --json --results-only
```

Prefer the JSON form when the result will be consumed by another command, script, or agent step.

If shared drives should be excluded, add `--no-all-drives`.

### 3. Work with Drive Files

Inspect metadata when you have a file ID:

```bash
gog drive get FILE_ID --account you@example.com
```

Upload a local file:

```bash
gog drive upload ./report.pdf --account you@example.com --parent FOLDER_ID
```

Upload and convert into a native Google Doc:

```bash
gog drive upload ./notes.md --account you@example.com --convert-to doc --parent FOLDER_ID
```

Replace the content of an existing Drive file while keeping the same file ID:

```bash
gog drive upload ./updated.pdf --account you@example.com --replace FILE_ID
```

Download a file:

```bash
gog drive download FILE_ID --account you@example.com --out ./downloads/file.bin
```

Download a Google-native file in a specific export format:

```bash
gog drive download FILE_ID --account you@example.com --format md --out ./downloads/file.md
```

### 4. Work with Google Docs

Create an empty doc:

```bash
gog docs create "Weekly Notes" --account you@example.com
```

Create a doc from Markdown:

```bash
gog docs create "Weekly Notes" --account you@example.com --file ./notes.md
```

Read the doc as plain text:

```bash
gog docs cat DOC_ID --account you@example.com
```

Read with numbered paragraphs to prepare targeted edits:

```bash
gog docs cat DOC_ID --account you@example.com --numbered
```

Export the doc:

```bash
gog docs export DOC_ID --account you@example.com --format md --out ./exports/doc.md
```

Replace the document body from a file. Prefer replacement as the default update mode for reproducible document workflows:

```bash
gog docs write DOC_ID --account you@example.com --file ./content.txt
```

Use append only when the task is explicitly incremental:

```bash
gog docs write DOC_ID --account you@example.com --text "\nFollow-up note" --append
```

Insert text at a specific character index:

```bash
gog docs insert DOC_ID "Agenda item" --account you@example.com --index 1
```

### 5. Validate the Result

After any write operation:

- Re-read the doc with `gog docs cat`
- Re-export if the downstream consumer expects a file artifact
- If the workflow is scripted, rerun the command with `--json --results-only` and confirm the expected IDs or paths

For risky changes, consider `--dry-run` first when supported.

## Common Patterns

### Resolve a doc ID, then export markdown

```bash
gog drive search "team handbook" --account you@example.com --json --results-only
gog docs export DOC_ID --account you@example.com --format md --out ./team-handbook.md
```

### Search, upload a revision, then confirm metadata

```bash
gog drive search "Q2 report" --account you@example.com
gog drive upload ./Q2-report.pdf --account you@example.com --replace FILE_ID
gog drive get FILE_ID --account you@example.com
```

### Create a doc from markdown and verify content

```bash
gog docs create "Launch Notes" --account you@example.com --file ./launch-notes.md
gog docs cat DOC_ID --account you@example.com
```

## Guardrails

- Prefer `--json --results-only` when another tool or script will consume the output
- Do not assume a search result is unique; confirm the ID before modifying anything
- Use read-only auth when editing is not required
- Treat `write`, `insert`, `delete`, `clear`, and permanent deletion as destructive operations and confirm intent first
- Use `--no-input` for automation so failures surface immediately instead of blocking on prompts
- Keep sharing and permission management out of scope for this version of the skill

## Completion Criteria

The task is complete when:

- The correct account is authenticated
- The target file or doc ID is verified
- The requested Drive or Docs action has succeeded
- The result is validated through a follow-up read, metadata check, or exported artifact
- Any script-oriented output is returned in the format the caller requested

## Default Operating Assumptions

- Use `--json --results-only` for automation-oriented examples
- Prefer whole-body replacement with `gog docs write` unless the task is explicitly append-only
- Keep scope limited to auth, Drive file operations, and Docs work
