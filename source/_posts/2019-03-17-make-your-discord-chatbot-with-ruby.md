---
title: 使用 Ruby 製作屬於你的 Discord 聊天機器人
author:
  nick: 居米
  link: 'https://github.com/jimmy2822'
date: 2019-03-16 15:52:05
cover: /2019/03/16/make-your-discord-chatbot-with-ruby/cover.jpg
categories: 怪奇專案集散地
tags: [Ruby, Chatbot]
---
最近很火紅的第一人稱射擊吃雞類型遊戲「Apex Legends」上市8小時內同時在線玩家人數突破100萬人（筆者也是其中之一），這款遊戲和 Ruby 能擦出什麼樣的火花呢？在本文中我們將嘗試使用 Ruby 搭配玩家間熱門的語音通訊社群軟體 Discord 製作聊天機器人再透過 API 獲取玩家於遊戲中的相關戰績資訊。該透過哪些步驟快速製作我們的聊天機器人呢？讓我們接下去看看吧！

## 前置作業
---
假設你已經安裝好了程式語言 `Ruby`(如果沒有安裝的請到[官方網站](https://www.ruby-lang.org/zh_tw/downloads/)根據自己所使用的 `OS` 安裝 `Ruby`)

然後我們需要建立一個 `Ruby` 檔案，在本文中我們建立一個名為  `chatbot.rb` 的檔案在資料夾 `discord` 下，其中副檔名為 `.rb` 代表這是一個 `Ruby` 的檔案。

接下來透過[終端機](https://gitbook.tw/chapters/command-line/command-line.html)(何謂終端機可以參考連接文章的前面部份)進入 `chatbot.rb` 所在的資料夾中並輸入 `gem install bundler` 透過 `Ruby` 的套件管理工具 `Gem` 來安裝相依性套件版本管理工具 [Bundler](https://bundler.io/) 後再輸入指令 `bundle init` 來初始化 `Bundler` 的相關資料。完成後會自動建立一個檔名為 `Gemfile` 的檔案，這個檔案是用來指定 `Ruby` 專案所使用 `Gem` 相關套件的設定檔。我們在 `Gemfile` 檔案中的最下方添加一行設定：

```ruby
# 你的 Ruby 專案資料夾下/Gemfile
# (其他 gem...)
gem "discordrb"
```

然後透過終端機輸入命令 `bundle install` 就會自動幫我們安裝別人打包好的 `Discord` 機器人函式庫 [discordrb](https://github.com/meew0/discordrb)。

### 獲得 Discord Bot Token

要製作 `Discord Bot` 需要先獲得機器人的 `Token`，需要在 [Discord Developer Portal](https://discordapp.com/developers/applications/) 申請一組帳號和在帳號下新增一個應用程式，並在 Bot 頁面生成一組 Token。如下圖範例位置：

![chatbot_token](https://imgur.com/UE6JRfo.png)

## 製作測試聊天機器人
---
成功註冊帳號並獲得 `Token` 後我們要開始撰寫聊天機器人的程式碼囉，利用文字編輯器編輯前面所建立的 `.rb` 檔案並新增下列程式碼：

``` ruby
# 調用在 Gemfile 設定並安裝的 disocrd API 函式庫
require 'discordrb'

# 將你在 Discord 申請的機器人 Token 帶入並實例化機器人
# 記得替換 Bot Token 為你自己的 Bot Token
bot = Discordrb::Bot.new token: '你的 Bot Token'

# 在 Discord 頻道中對機器人說話後機器人會回應的行為設定
# 下方程式碼中 content: 'Ping' 就是代表聊天室收到信息內容為 Ping! 時
# 會觸發事件並產生回覆內容 Pong!
bot.message(content: 'Ping!') do |event|
  event.respond 'Pong!'
end

# 運行機器人
bot.run
```

將檔案編輯完成後透過終端機輸入指令 ``ruby discord.rb`` 執行剛剛撰寫的機器人測試 `Ruby` 檔案。接下來根據官方的文件說明我們要邀請聊天機器人到你所屬的 `Discord` 聊天頻道中，可以透過一組網址為： ``https://discordapp.com/oauth2/authorize?&client_id=你的機器人_Client_ID&scope=bot&permissions=0``

其中 ``你的_Client_ID`` 的部分請替換成 Discord Application 中的 Client ID 如下圖範例所在位置：

![chatbot_client_id](https://imgur.com/1AEoD3q.png)

在瀏覽器輸入網址後我們會被導引到一個 `Discord` App 授權的畫面，當授權成功後我們就可以將機器人加入自己的 Discord Server 後在聊天頻道中輸入信息 ``Ping!`` 後如果有收到機器人回覆 ``Pong!`` 恭喜你機器人到目前為止算是成功設置了！

## 將機器人串接 Apex Legends API
---
確認機器人可以正常建立並執行後，下一步我們要來串接 Apex Legends API 將現在只會簡單回應的機器人升級為可以透過關鍵字查詢遊戲戰績的機器人喔！

### 註冊 TRN Apex Legends API 帳號
本文中使用第三方服務 TRN Apex Legends Tracker API 來獲取角色戰績，所以需要先前往 [TRN 官網](https://apex.tracker.gg/site-api) 頁面註冊帳號並申請 API KEY 並在附在 request header 透過 `Ruby` 發送 API request 時獲得授權才能取得我們想要的資料。

### 調整機器人程式碼
在剛剛測試機器人的檔案 ``discord.rb`` 中我們實做了簡單的關鍵字回答功能，現在我們要利用註冊後取得的 API Key 對 TRN Apex Legends API 端點發送請求。請把檔案中的程式碼調整為以下範例。並替換 其中的 chatbot token 和 api key 為官網中註冊後所取得的 key。

```ruby
# 調用 Discord API 函式庫
require 'discordrb'
# 宣告一個時間變數儲存呼叫 API 的時間
@call_time_last = Time.new

# 創建 Discord Bot 並帶入 Token 並將機器人命令附加前綴詞'!'
bot = Discordrb::Commands::CommandBot.new token: '你的_chatbot_token', prefix: '!'

# 為機器人定義指令 myhero 並處理 Apex Legends API 資料接收與解析
bot.command :myhero do |event, player|
  # 建立 Api 觸發時間，防止 call rate 超過 API 伺服器限制會有被禁止連線的問題
  @call_time_now = Time.now

  # 當機器人收到指令 !myhero 玩家_ID 時將 ID 存入變數 player_name 中
  @player_name = player

  # 將我們要對 API 發送請求的網址存入變數中，並帶入玩家的 ID
  uri = URI("https://public-api.tracker.gg/apex/v1/standard/profile/5/#{@player_name}")

  # 如果這次呼叫 API 的時間距離上一次呼叫的時間經過兩秒半，正常呼叫 API。
  if @call_time_now - @call_time_last > 2.5
    # 紀錄成功呼叫 API 的時間
    @call_time_last = Time.now

    # 使用 Ruby 的 Net::HTTP 模組處理對 API 發出的 request
    Net::HTTP.start(uri.host, uri.port, use_ssl: true) do |http|
      req = Net::HTTP::Get.new(uri)
      # 將 TRN 申請的 Api Key 帶入 request header 中提供給 API 端點驗證
      req['TRN-Api-Key'] = '在 TRN 取得的 api key'

      # 將發送 request 後得到的資料解析成 Json 格式
      response = http.request(req)
      @data = JSON.parse(response.body)
    end

    # 從 API 拿到的資料解析完後使用 event.respond 方法讓機器人在聊天室回應信息
    event.respond "
    #{@data['data']['children'].first['metadata']['icon']}
    等級 (Level)：#{@data['data']['stats'].first['displayValue']}
    使用英雄 (Legend Name)：#{@data['data']['children'].first['metadata']['legend_name']}
    擊殺數 (#{@data['data']['children'].first['stats'].first['metadata']['name']})：#{@data['data']['children'].first['stats'].first['displayValue']}
    "
  else
    # 如果距離上次呼叫 API 所經過時間小於三秒，則顯示忙碌信息。
    event.respond "目前忙碌中，請稍待片刻再呼喚我..."
  end
end

# 使用 run 方法讓機器人運行
bot.run
```

### 測試機器人是否正常回應
調整程式碼後透過終端機再次輸入 ``ruby discord.rb`` 讓 ``Ruby`` 執行我們撰寫好的機器人檔案，接著到聊天機器人所在的 ``Discord`` 伺服器中輸入 ``!myhero 遊戲ID`` 會發現機器人自動回覆該玩家在遊戲中使用的角色圖片、帳號等級、擊殺數。如下圖範例：

![discord_chatbot_demo](https://i.imgur.com/GTWGJkE.gif)

## 小結
---
在本文中我們透過 `Ruby` 內建強大的套件工具 `Gem` 來安裝 `Discord` 機器人函式庫並撰寫程式碼製作簡易的聊天機器人。接下來串接第三方 API 讓機器人可以接收到 `Discord` 信息的關鍵字後透過呼叫第三方 API 端點獲取遊戲的相關資料並在聊天室中產生回應。這樣的流程下我們動手製作了屬於自己的聊天機器人，讓聊天室的戰友們可以快速獲得遊戲資訊，是不是一種 `Ruby` 很有趣又實用的應用呢？
