# Image Storage Solution

## Current Issue
Images for installation and user guide sometimes fail to save or get lost.

## Why NOT Store Images in Database?

### ❌ Database Storage Problems:
- **Large database size** - Images bloat your database
- **Slow queries** - Binary data slows down all database operations
- **Expensive backups** - Database backups become huge
- **Memory issues** - Loading images consumes database memory
- **Scaling costs** - Database storage is 10x more expensive than file storage

### ✅ Current Solution (Improved):
**Store URLs in JSON + Images in filesystem**

**What I Fixed:**
1. ✅ Added file validation (type, size)
2. ✅ Better error handling and logging
3. ✅ File verification after upload
4. ✅ Proper permissions (0o755 for dirs, 0o644 for files)
5. ✅ Created backup script

**How to Use:**
```bash
# Backup images manually
./scripts/backup-images.sh

# Restore from backup
tar -xzf backups/images/guides_backup_TIMESTAMP.tar.gz -C public/images/guides/
```

## Recommended: Migrate to Cloud Storage

For production, use **AWS S3** or **Cloudflare R2**:

### Benefits:
- ✅ **Never lose images** - Automatic redundancy
- ✅ **Fast delivery** - CDN caching worldwide
- ✅ **Cheap** - $0.023/GB on S3, $0.015/GB on R2
- ✅ **Scalable** - Handle millions of images
- ✅ **No deployment issues** - Images persist across deployments

### Quick Migration (5 minutes):

1. **Install AWS SDK:**
```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

2. **Add to .env.local:**
```env
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=solarautopilot-images
```

3. **Update upload API** - Use lib/storage/s3.ts (already exists!)

4. **Migrate existing images:**
```bash
aws s3 sync public/images/guides/ s3://your-bucket/guides/
```

## Cost Comparison

**Current (Filesystem):**
- Storage: Free (but risky)
- Bandwidth: Expensive on VPS
- Reliability: ⚠️ Can lose files

**Database:**
- Storage: $0.10-0.25/GB/month
- Performance: ❌ Slow
- Reliability: ✅ Good

**S3/R2:**
- Storage: $0.015-0.023/GB/month
- Bandwidth: $0.01/GB (R2 free egress!)
- Reliability: ✅ Excellent
- Speed: ✅ CDN cached

## Conclusion

**Don't use database for images.** Your current JSON + filesystem approach is correct, I just made it more reliable. For production, migrate to S3/R2.
