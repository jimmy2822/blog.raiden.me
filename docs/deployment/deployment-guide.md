# 部署指南

## GitHub Pages 部署

本專案使用 GitHub Pages 進行部署。

### 部署設定

在 `_config.yml` 中的部署設定：

```yaml
deploy:
  type: git
  repo: git@github.com:jimmy2822/blog.raiden.me.git
  branch: gh-pages
  message:
```

### 部署步驟

1. **建置網站**
   ```bash
   npm run build
   ```

2. **部署到 GitHub Pages**
   ```bash
   npm run deploy
   ```

3. **一鍵測試和部署**
   ```bash
   npm run predeploy  # 會自動執行測試和建置
   ```

### 自動化部署

專案設定了以下自動化流程：
- `predeploy` 腳本會在部署前自動執行測試
- 確保只有通過測試的版本才會被部署

### 網域設定

- **主網域**: https://blog.raiden.me
- **GitHub Pages URL**: https://jimmy2822.github.io/blog.raiden.me
- **CNAME 文件**: `source/CNAME`

### 注意事項

1. 確保 SSH 金鑰已正確設定
2. 部署前請先在本地測試
3. 檢查 `source/CNAME` 文件內容是否正確