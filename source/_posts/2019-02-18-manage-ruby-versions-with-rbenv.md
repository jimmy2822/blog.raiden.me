---
title: 使用 rbenv 管理 Ruby 版本
author:
  nick: 居米
  link: https://github.com/jimmy2822
date: 2019-02-18 15:37:07
cover: /2019/02/18/manage-ruby-versions-with-rbenv/cover.jpg
categories: Ruby On Rails 菜鳥的逆襲
tags: [Ruby On Rails, Developer Tools]
---
# 關於菜鳥的逆襲
---
想撰寫此系列文章的動機在於筆者剛開始學習 `Ruby On Rails` 的過程中，由於對程式背景相關知識的不足，導致產生大量撞牆時間。在頭破血流的過程中，將盡量紀錄對於新手時期可能會遇到的問題與解法，期望能幫助到有緣人在學習 `Ruby On Rails` 路上避開可能會踩到的各種坑。

# 為什麼需要 rbenv ?
---
`rbenv` 是一種版本控管工具，被用來安裝與管理你所使用的 `Ruby` 版本。為什麼需要管理 `Ruby` 版本呢？

由於一般在使用 `Ruby On Rails` 開發專案的過程中，你將有很高的機率面臨需要切換不同版本 `Ruby` 的情境，因為每個專案可能使用的 `Ruby` 版本都不盡相同，且專案中所使用的 `Gem` 也是基於某個 `Ruby` 版本下去寫的，這導致了有些你想用的 `Gem` 可能只支援某個版本以前或以後的 `Ruby`，而你想用這些 `Gem` 就必須搭配支援的 `Ruby` 版本。所以學會使 `Ruby` 版本控管工具來切換不同的 `Ruby` 版本就顯得很重要。

# 安裝 rbenv
---
由於筆者所使用的作業系統是 `macOS`，所以我們將介紹如何在 `Mac` 的環境下透過 `Homebrew` 安裝 `rbenv`。如果你所使用的作業系統是 `Windows` 可以參考 [這裡](https://docs.brew.sh/Homebrew-on-Linux)。

## 安裝 Homebrew
在[官方文件](https://github.com/rbenv/rbenv)中推薦使用 Homebrew 安裝 rbenv。Homebrew 也是一種軟體版本控管的工具，只要在命令列下簡單的指令就可以透過 Homebrew 安裝軟體到電腦上並管理，所以我們就開始安裝 Homebrew 吧。

首先到 Homebrew 的[官方網站](https://brew.sh/index_zh-tw)可以看到安裝的指令非常簡單只需要在終端機輸入以下指令：

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

待安裝指令跑完後便會在路徑 ``/usr/local/bin`` 中安裝好 Homebrew。

## 透過 Homebrew 安裝 rbenv
我們可以透過以下指令來安裝 `rbenv`：

```bash
brew install rbenv
```

指令跑完後我們可以同樣在路徑 `/usr/local/bin` 中發現多了檔案 `rbenv` 就可以知道目前為止 `rvenv` 已經在我們電腦中了，接下來還要做一些設定來完成安裝。

## 為 rbenv 設定環境變數
為麼要設定環境變數呢？當我們在終端機上輸入指令 `rbrnv` 時，電腦會需要透過一些路徑上的設定來搜索需要被執行的程式，簡單來說我們在終端機呼叫某個程式的時候要告訴終端機程式住在哪裡才能找到並且執行它的意思。

如果你使用的是 Mac 內建的終端機(bash)請在終端機中輸入下列指令：
```bash
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bash_profile
```
如果你使用的是 `zsh` 那麼請改成：
```bash
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.zshrc
```
上面這些指令的作用是在根目錄中的隱藏檔案 `.bash_profile` 或 `.zshrc` 中插入一行設定來使得我們安裝的 `rbenv` 路徑加入環境變數 `$PATH` 後再回傳整個環境變數設定。那個 `.bash_profile` 檔案是做什麼用的？這個檔案就是每當你開器終端機時都會去讀取的一個設定檔，所以當我們把 `rbenv` 設定檔加入之後每次開起終端機後都會幫我們把執行 `rbenv` 指令要搜索 `rbenv` 程式本體所在的目錄路徑加到環境變數 `$PATH` 中，這樣就可以確保我們執行的指令會正確的找到程式並執行。

在這邊屬於 Linux 作業系統的基礎知識，所以對於初學程式的人來說可能會一頭霧水，在還沒開始正式寫程式前就會先面臨到一堆開發環境設置的問題呢。

完成上述設定後還要輸入下列設定來進行 `rbenv` 安裝完成後的初始化工作：
```bash
~/.rbenv/bin/rbenv init
```
指令執行完畢後你可以選擇關閉現在的終端機視窗，再開啟一個全新的終端機視窗，此時你應開會發現在終端機中輸入 `rbenv` 可以正常作用了。

# 基本的 rbenv 指令
---
## 透過 rbenv 安裝 Ruby
```bash
rbenv install -l
```
上列指令可以列出目前可以安裝的 Ruby 版本，確認想要安裝的 Ruby 版本後再透過指令
```bash
rbenv install 你想要的版本
```
就可以安裝你選擇的 Ruby 版本了。

## 切換使用的 Ruby 版本
要切換使用的 Ruby 版本我們可以透過輸入兩個指令來切換使用的 Ruby 版本，分別是
```bash
rbenv global 版本號碼
```
或者
```bash
rbenv local 版本號碼
```
這兩個指令的差別在於帶有 `local` 的指令通常在專案的目錄底下執行，因為指令執行後會在該專案的目錄下留下一個隱藏檔案來記錄當我們在這個目錄中所使用的 Ruby 版號，且僅在這個目錄下有效。如果你是在其他的地方使用 Ruby 那我們所使用的版本就會是帶有 `global` 指令所設定的 Ruby 版本。

# 小結
---
在進行撰寫程式碼之前的課題就是建置環境，當時因為對 Linux 連最基礎的知識都沒有所以在這邊卡了非常久，希望這篇文章的分享有機會幫助到和我一樣缺乏 Linux 基礎背景知識又卡關的苦主，希望大家日後都可以順利的完成開發環境建置工作喔！
