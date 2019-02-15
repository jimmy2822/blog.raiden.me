---
title: centOS 7 ｜從零部署 Ruby On Rails
author:
  nick: 居米
  link: github.com/jimmy2822
date: 2019-02-15 10:53:51
cover: /img/installing_rails_in_centos_7.jpg
subtitle:
categories: DevOps
tags: [DevOps,Ruby On Rails,Deploy]
---

# Step.0 SSH 遠端連線問題
  1. 建立 SSH keygen
  2. 設定公鑰授權
  ```bash
  # 產生 SSH 公私鑰
  $ ssh-keygen -t rsa
  # ssh 連線指令
  $ ssh 帳號@ip位置
  ```
---
# Step.1 處理使用者權限問題
  1. 創建使用者
  2. 把使用者加入群組
  3. 讓該群組使用者不用輸入密碼就可 sudo
    a. 透過指令 ``sudo visudo`` 進入設定檔並加入下列設定
      `` %wheel  ALL=(ALL)       ALL``
  ```bash
  # 創建使用者並指定群組 (wheel)
  $ useradd 使用者 -G wheel
  # 修改已存在使用者群組
  $ sudo usermod -a -G wheel 使用者
  ```
---
# Step.2 安裝編譯 Ruby 相關套件
  1. 透過指令安裝編譯所需套件
  ```bash
  $ sudo yum install -y gcc bzip2 openssl-devel libyaml-devel libffi-devel readline-devel zlib-devel gdbm-devel ncurses-devel
  ```
  2. 到官網下載 Ruby 檔
  ```bash
  # 使用 wget (wwwget)指令下載檔案, 如果沒裝 wget 可以用 yum install wget 安裝.
  $ wget https://cache.ruby-lang.org/pub/ruby/2.6/ruby-2.6.1.tar.gz
  ```
  3. 解壓縮檔案
  ```
  # tar 是解壓縮指令, -z(使用 Gzip 壓縮格式), -x(解壓縮), -v(顯示檔案內容 ), -f(指定檔案)
  $ tar -zxvf ruby-2.6.1.tar.gz
  ```
  4. 編譯 Ruby
  Ruby 預設會安裝到 ``/usr/local`` 的位置, 執行 ``configure`` 這個檔案來對 Ruby 編譯時的行為做設定。
  ```bash
  $ ./configure --prefix=/usr/local/ruby-2.6.1pro.d
  ```
  進入 Ruby 資料夾下後,使用指令 `` $ make `` 編譯 Ruby, 再使用 ``$ make install`` 把 Ruby 順利安裝。
  5. 手動執行確認 Ruby 版本
  ```bash
  $ /usr/local/ruby-2.6.1/bin/ruby -v
  ```
  6. 透過環境設定簡化操作檔案
  ```bash
  $ export PATH=/usr/local/ruby-2.6.1/bin:$PATH
  ```
  7. 新增新增 shell script 設定檔讓系統自動優先尋找指定版本 Ruby
  ```bash
  $ sudo vi /etc/profile.d/ruby.sh
  # 新增下列設定
  export PATH=/usr/local/ruby-2.6.1/bin:$PATH
```
---
# Step.3 安裝 Passenger-Nginx
  1. 至官方下載 Passenger tarball 然後解壓縮至 ``usr/local/passenger`` 底下
  2. 進入 Passenger 目錄底下後，導出目錄路徑並執行 Pasenger-Nginx 安裝
  ``` bash
  $ export PATH=/usr/local/passenger/passenger-6.0.1/bin:$PATH (當前最新版本為 6.0.1)
  $ passenger-install-nginx-module
  ```
  3. 跟隨安裝引導接續安裝缺失套件 rake, C++ ...
---
# Step.4 啟動 Nginx
  1. 使用指令 ``systemctl`` 觀看狀態和重新啟動服務。
  2. 撰寫設定檔來啟動或關閉 Nginx [官方範例檔](https://www.nginx.com/resources/wiki/start/topics/examples/systemd/)
  3. 參考範例進行設定
  ```bash
  $ vi /lib/systemd/system/nginx.service
  ```
  4. 透過指令開機時自動啟動服務 (enable)
  ```bash
  systemctl enable nginx
  ```
