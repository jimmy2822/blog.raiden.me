# 硬底居米的部落格 | Indie Jimmy's Blog

使用 Hexo 建置的個人部落格，託管於 GitHub Pages。

## 🌐 網站資訊

- **網站地址**: [blog.raiden.me](https://blog.raiden.me)
- **主題**: hexo-theme-skapp
- **框架**: Hexo 7.3.0
- **內容**: Ruby、Ruby on Rails、遊戲開發、音樂、生活分享

## 🚀 快速開始

### 安裝依賴
```bash
npm install
```

### 開發模式
```bash
npm run dev
# 或
hexo server
```

### 建置網站
```bash
npm run build
# 或
hexo generate
```

### 部署
```bash
npm run deploy
```

## 📁 專案結構

```
├── docs/                    # 📚 專案文件
│   ├── development/         # 🔧 開發相關文件
│   ├── deployment/          # 🚀 部署相關文件
│   └── troubleshooting/     # 🔍 問題排除文件
├── source/                  # 📝 網站內容
│   ├── _posts/             # 文章
│   └── _data/              # 資料文件
├── themes/                  # 🎨 主題文件
├── scaffolds/              # 📋 文章模板
└── _config.yml             # ⚙️ 網站設定
```

## 📚 文件索引

詳細的專案文件請參考 [docs/README.md](docs/README.md)

### 重要文件
- [Hexo 升級記錄](docs/development/hexo-upgrade-summary.md)
- [部署指南](docs/deployment/deployment-guide.md)
- [問題排除](docs/troubleshooting/hexo-server-status.md)

## 🛠️ 可用指令

| 指令 | 說明 |
|------|------|
| `npm run dev` | 啟動開發服務器 |
| `npm run build` | 建置靜態網站 |
| `npm run clean` | 清理緩存 |
| `npm run deploy` | 部署到 GitHub Pages |
| `npm run test` | 執行測試 |

## 🔧 技術規格

- **Node.js**: v24.1.0
- **Hexo**: 7.3.0
- **主題**: hexo-theme-skapp
- **部署**: GitHub Pages
- **網域**: blog.raiden.me

## 📝 內容管理

### 新增文章
```bash
hexo new "文章標題"
```

### 新增頁面
```bash
hexo new page "頁面名稱"
```

### 發布草稿
```bash
hexo publish "草稿標題"
```
