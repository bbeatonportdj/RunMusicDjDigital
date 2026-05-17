#!/bin/bash

echo "🚀 Starting Git optimization and pushing to GitHub..."

# 1. Initialize git if it's not already initialized
if [ ! -d ".git" ]; then
  echo "📦 Initializing Git repository..."
  git init
  git remote add origin https://github.com/bbeatonportdj/RunMusicDjDigital.git
  git branch -M main
fi

# 2. Set Case Sensitivity to false (standard for macOS to force case detection)
git config core.ignorecase false

# 3. Handle casing rename if any file got committed with capital letters previously
echo "🧹 Renaming folder/file casing to lowercase..."
git mv Src src 2>/dev/null || true
git mv src/Main.jsx src/main.jsx 2>/dev/null || true

# 4. Stage all changes
echo "➕ Staging files..."
git add -A

# 5. Commit changes
echo "💾 Committing changes..."
git commit -m "fix: resolve Vercel build path and casing issues"

# 6. Push to GitHub
echo "📤 Pushing to GitHub (bbeatonportdj/RunMusicDjDigital)..."
git push -u origin main --force

echo "--------------------------------------------------------"
echo "🎉 Pushed to GitHub successfully! Vercel is now rebuilding..."
echo "--------------------------------------------------------"
