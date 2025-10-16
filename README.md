feature-training-generator2

## Creating a Clean ZIP File

To create a ZIP file of this project without build artifacts and large files:

### Method 1: Using Git Archive (Recommended)
```bash
npm run zip
```

This creates a clean `project.zip` file containing only source files tracked by git.

### Method 2: Manual ZIP Creation
If you need to create a ZIP manually, exclude these directories:
- `dist/` - Build output
- `dev-dist/` - Development build output
- `node_modules/` - Dependencies (should be reinstalled)
- `.DS_Store` - macOS system files
- `*.log` - Log files

### What's Excluded
The `.gitignore` file ensures these are never committed:
- Build artifacts (dist, dev-dist)
- Dependencies (node_modules)
- Environment variables (.env)
- System files (.DS_Store, Thumbs.db)
- Editor configs (.vscode, .idea)
- Log files and caches

### Expected ZIP Size
A clean source-only ZIP should be under 1MB.
