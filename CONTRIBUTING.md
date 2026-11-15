# Contributing & Git Workflow Guide

Welcome to the project! This document outlines our standard workflow for making changes, writing commits, and contributing.

---

## 🌿 Branching Strategy

For new features, bug fixes, or experimental work, avoid committing directly to `main`:

1. **Feature branches**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. **Bug fixes**:
   ```bash
   git checkout -b fix/bug-description
   ```
3. **Open a Pull Request**:
   Push your branch and open a PR into `main`:
   ```bash
   git push -u origin feature/your-feature-name
   ```

---

## 💬 Conventional Commit Guidelines

We follow the Conventional Commits specification:

- `feat:` A new feature or capability
- `fix:` A bug fix
- `style:` Visual or style adjustments (CSS, spacing, UI tweaks)
- `refactor:` Code refactoring that neither fixes a bug nor adds a feature
- `docs:` Documentation updates (README, guides)
- `chore:` Maintenance tasks, dependency updates, configs

### Example:
```bash
git commit -m "feat: add interactive checklist to notes widget"
```

---

## ⚡ Routine Commit & Push Workflow

Whenever you want to commit and push changes:

1. **Check your status**:
   ```bash
   git status
   git diff --stat
   ```
2. **Verify builds**:
   Ensure `npm run build` succeeds without errors.
3. **Stage and commit**:
   ```bash
   git add .
   git commit -m "feat/fix/style: concise description"
   ```
4. **Push to GitHub**:
   ```bash
   git push
   ```

