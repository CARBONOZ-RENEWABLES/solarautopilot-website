#!/bin/bash

# Backup script for guide images
BACKUP_DIR="./backups/images"
SOURCE_DIR="./public/images/guides"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

mkdir -p "$BACKUP_DIR"

if [ -d "$SOURCE_DIR" ]; then
  tar -czf "$BACKUP_DIR/guides_backup_$TIMESTAMP.tar.gz" -C "$SOURCE_DIR" .
  echo "✅ Backup created: $BACKUP_DIR/guides_backup_$TIMESTAMP.tar.gz"
  
  # Keep only last 10 backups
  ls -t "$BACKUP_DIR"/guides_backup_*.tar.gz | tail -n +11 | xargs -r rm
  echo "✅ Old backups cleaned"
else
  echo "❌ Source directory not found: $SOURCE_DIR"
  exit 1
fi
