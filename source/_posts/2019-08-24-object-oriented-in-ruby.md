---
title: 想找到脫離新手村的方向？ 讓 Ruby 中的物件導向基礎為你引路！
author:
  nick: 居米
  link: https://github.com/jimmy2822
date: 2019-08-24
cover: /2019/08/24/object-oriented-in-ruby/cover.jpg
categories: Ruby On Rails 菜鳥的逆襲
tags: [Ruby, Object-Oriented, 物件導向]
---

還記得一開始自學程式語言時，大家一定或多或少都聽過一個名詞 `物件導向`。然後身為程式新手和非程式相關科系畢業的你也許會開始 Google 它到底是什麼意思，然後你會在 [維基百科](https://zh.wikipedia.org/wiki/%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1) 上查到諸如此類的解釋：

> 物件導向程式設計（英語：Object-oriented programming，縮寫：OOP）是種具有物件概念的程式編程典範，同時也是一種程式開發的抽象方針。它可能包含資料、屬性、程式碼與方法。物件則指的是類別的實體。它將物件作為程式的基本單元，將程式和資料封裝其中，以提高軟體的重用性、靈活性和擴充性，物件裡的程式可以存取及經常修改物件相關連的資料。在物件導向程式編程裡，電腦程式會被設計成彼此相關的物件。

當下看完名詞解釋，如果你和筆者一樣只是個普通人的話應該根據名詞解釋還是無法了解一個抽象的概念，然後可能因為你強盛的好奇心，會繼續在網路上搜尋更多的文章來理解這樣抽象的概念，但有可能你會發現閱讀更多文章後仍然似懂非懂，不要擔心這是屬於正常的現象。

## 找到方向
---

上述所描寫的正是筆者個人學習上的經歷，看了些許文章後，仍然覺得少了點什麼才能對整體抽象的理論有更進一步的理解。直到閱讀了 `Practical Object-Oriented Design: An Agile Primer Using Ruby` 才發現作者 [Sandi Metz](https://www.sandimetz.com/) 很懂得如何引導新手走入物件導向的大門。例如談論到物件導向時一定會提到的幾個重要原則：`SOLID`（`單一功能`、`開閉原則`、`李氏替換`、`介面隔離`、`依賴反轉`）當你看過這些原則後對於實際開發上該怎麼應用上，根據筆者個人的學習經驗似乎只會產生更多的疑問。但作者似乎知道與其講那些理論，不如透過探討實際的程式碼由淺入深的方式一步一步告訴你如果同樣的程式碼，採用物件導向的方式撰寫程式碼會有什麼優缺點？如果不使用物件導向的方式去寫可能會造成後續維護程式碼上困難？筆者看完那本書後終於對物件導向有了更深一層的概念，它也提供了思考程式碼「為什麼要這樣寫會更好？」的方向，而不僅僅是停在「把程式碼寫出來會動就好⋯⋯」的層面上。

接下來將分享書中部分的概念，去探討如何運用技巧去撰寫出容易維護的程式碼。

## 管理相依性 Manage Dependencies
---

在物件導向的程式世界中，物件會有所謂 `相依性` 的問題，什麼是相依性呢？我們舉現實生活中的車子來理解這個抽象概念。車子是一種交通工具對吧？在 `Ruby` 中車子將可能會是車子這個類別中的一個實體物件，它的行為是進行移動。那車子為什麼可以移動的呢？車子是需要靠輪子來移動的，我們也可以說車子依賴輪子來進行移動，沒有輪子的車子可能哪也去不了，所以車子對輪子產生了很高的相依性。

在物件導向的世界中，我們對程式類別和物件相互依賴的程度高低稱為 [耦合性](https://zh.wikipedia.org/wiki/%E8%80%A6%E5%90%88%E6%80%A7_(%E8%A8%88%E7%AE%97%E6%A9%9F%E7%A7%91%E5%AD%B8)。耦合性愈高的程式理論上來講會愈難維護，這點可以想像我們先前舉例的車子。假設有一款特殊類別的車子，輪子的構造和一般輪子的構造不一樣，是所謂一體成型的構造。也就是說它的輪子不容易替換，那這輛特殊的車子對於這種特別設計的輪子就會有較高的依賴性。就算真的壞了也沒辦法像其他一般車子一樣快速找到同規格的零件進行替換，當我們這樣設計一台車子的時候就像在設計程式中的類別與方法。我們有沒有遵循物件導向的思維去設計程式，在未來專案的開發與維護時就會產生成本上顯著的差異。

接下來我們將透過程式碼的範例介紹 `Ruby` 程式語言特性所衍生出來降低程式碼之間的耦合度與管理相依性的技巧。

## 移除參數順序的相依性 Remove Argument-Order Dependencies
---

在 `Ruby` 中，當我們要定義一個方法時通常會像接下來的例子一樣定義它：

```ruby
class Car
  def initialize(color, type, wheels)
    @color = color
    @type = type
    @wheels = wheels
  end

  def info
    puts "這輛車子是#{@color}色的，類型為#{@type}，輪子有#{@wheels}個。"
  end
end

sport_car = Car.new('黃', '跑車', 4)
sport_car.info # => 這輛車子是黃色的，類型為跑車，輪子有4個。
```

在這段範例中，我們定義了 `Car` 這個類別(Class)，然後我們在類別中透過定義初始化方法(Initialize)規定了方法需要傳入三個參數(Parameter)，並且在 `Car.new` 實例化類別時需要`依序`將參數傳入。最後再定義了一個方法 `info` 去顯示這輛車子的資訊(`color`, `type`, `wheels`)。

當我們定義好 `Car` 這個類別並且有一天我們的同事需要使用這個車子類別去做一些事情的時候，你可能會需要寫一份文件就像 [Ruby Doc](https://ruby-doc.org/core-2.6.3/) 一樣解釋這個車子類別在實例化時需要依照順序傳入哪些參數。在這個簡單的例子中你可能會覺得，才三個參數會是有多難記？但是你有一天可能會面臨需要建立一個方法擁有七個參數以上要傳呢？你能確保每一個參數的順序你都記得嗎？萬一傳錯順序了程式可能會產生不可預期的錯誤。這時候我們就可以運用 `Ruby` 的一個特性來解決問題，它就是[雜湊](https://ruby-doc.org/core-2.6.3/Hash.html)(Hash)！

在 `Ruby` 的世界中，雜湊是沒有順序性的，它關注的只有一對成雙 `Key` 和 `Value` 的組合，只要對 `Hash` 提供正確的 `Key` 就能取出那把 `Key` 所對應的值。所以在知名的網頁框架 [Ruby On Rails](https://rails.ruby.tw/getting_started.html) 的方法中可以大量發現使用 `Hash` 的存在。現在就讓我們利用 `Hash` 來把剛剛的範例改寫如下：

```ruby
class Car
  def initialize(info)
    @color = info[:color]
    @type = info[:type]
    @wheels = info[:wheels] || 4
  end

  def info
    puts "這輛車子是#{@color}色的，類型為#{@type}，輪子有#{@wheels}個。"
  end
end

sport_car = Car.new(type: '跑車', color: '橘', wheels: 4)
sport_car.info      # => 這輛車子是橘色的，類型為跑車，輪子有4個。

compact_car = Car.new(color: '黑', type: '房車')
compact_car.info    # => 這輛車子是黑色的，類型為房車，輪子有4個。
```

還記得我們在前一個例子中，實例化方法需要依照順序傳入的三個參數嗎？利用 `Hash` 改寫後，現在我們的 `initialize` 的參數部分只規定了一個 `info`，實際上這個 `info` 代表是一個 `Hash`。我們現在從 `info` 取出三個 `Key` 分別是 `:color`, `:type`, `:wheels` 所對應得值，並將它們存入實體變數 `@color`, `@type`, `@wheels` 當中給 `info` 方法顯示資訊用。

這樣一來當我們將參數改為傳入一個 `Hash` 後，我們已經移除提供參數時會產生參數傳入對順序相依的問題，這樣就可以降低因為順序錯誤導致程式出錯的機率。再者因為當我們對 `Hash` 提供 `Key` 要取出對應的值為 `nil` 時，我們可以再利用一個小技巧讓值為 `nil` 時自動帶入預設的數值。也就是這個範例中的這段程式碼：

```ruby
@wheels = info[:wheels] || 4
```

當我們對 `info` 取出輪子數量為 `nil` 時（也就是使用者沒有傳入 `wheels: 輪子數量`)，這時因為 `info[:wheels] || 4` 前者為 `nil` 時會回傳後者的特性，我們實作了當使用者沒有提供該參數時自動帶入 `4` 的預設值。所以範例中的 `compact_car` 在實例化過程中如下：

```ruby
compact_car = Car.new(color: '黑', type: '房車')
compact_car.info    # => 這輛車子是黑色的，類型為房車，輪子有4個。
```

我並沒有傳入 `wheels` 的值，但在執行 `compact_car.info` 時仍然能自動帶入輪子數量的預設值並印出 `這輛車子是黑色的，類型為房車，輪子有4個。`

## 孤立相依性 Isolate Dependencies
---

當我們在開發專案時，你終究會遇到需在自身類別中使用其它類別所實例化的物件來做一些事情。但每當你在自身類別中引用其它類別時，實際上也是在對其它類別產生了相依性，並且提高了這個類別對其他程式碼的耦合度，這樣的情況並不是我們所樂見的。當我們必須對其它類別產生相依性且無可避免的時候呢？我們該怎麼處理類似的情況呢？這時候我們可以選擇孤立其它類別在自身類別中。接下來我們將使用實例來探討該如何處理類似的情況。

繼續我們先前的車子範例，如果我們要繼續打造這台車子，但是輪子需要乘載更多的資訊量呢？是時候考慮將輪子獨立出來自成一類來處理相關的資訊了。我們先將程式範例改寫為如下：

```ruby
class Car
  attr_reader :name, :color, :wheels, :type

  def initialize(info = {})
    @name = info[:name] || '未命名'
    @color  = info[:color]  || '藍'
    @type   = info[:type]   || '房車'
    @wheels = info[:wheels] || Wheels.new
  end

  def info
    puts "#{name}，這輛車子是#{@color}色的，類型為#{@type}，輪子有#{@wheels.quantity}個。"
  end
end

class Wheels
  attr_reader :color, :quantity, :type

  def initialize(info = {})
    @color = info[:color] || '黑'
    @quantity = info[:quantity] || 4
    @type = info[:type] || '道路'
  end

  def info
    puts "這台車的輪胎規格為#{@type}胎，顏色為#{@color}色，共有#{@quantity}個輪胎。"
  end
end

compact_car = Car.new(name: '發財車', type: '貨車')
compact_car.info          # => 發財車，這輛車子是藍色的，類型為貨車，輪子有4個。
compact_car.wheels.info   # => 這台車的輪胎規格為道路胎，顏色為黑色，共有4個輪胎。

super_car = Car.new(name: '佛拉利', color: '紅', type: '跑車',
wheels: Wheels.new(color: '銀', type: '賽道'))
super_car.info            # => 佛拉利，這輛車子是紅色的，類型為跑車，輪子有4個。
super_car.wheels.info     # => 這台車的輪胎規格為賽道胎，顏色為銀色，共有4個輪胎。
```

當我們決定把 `Wheels` 獨立拆出來成為一個類別時，我們的 `Car` 類別很自然的會期待在初始化物件時接收一個 `Wheels` 類別的實體並存入一個實體變數當中，以待需要時取得 `Wheels` 的實體並使用它。我們所講述的正是這行程式碼：

```ruby
@wheels = info[:wheels] || Wheels.new
```
還記得先前所講的嗎？當我們在自身類別中引用外部類別時，我們就對它產生了依賴性與提高了耦合度。我們現在對 `Wheels` 這個類別產生了依賴。現在來說你可能會想一切都在我的掌控之中因為 `Wheels` 這個類別是我所寫的，我很清楚它會如何運作。但是稍等一下⋯⋯假設今天的專案是多人協作的呢？`Wheels`這個類別是同事所寫的呢？你能確保在接下來的專案開時間下，`Wheels` 對這個類別呼叫 `Wheels.new` 所需要傳入的參數以及他所提供的 [API](https://zh.wikipedia.org/wiki/%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E6%8E%A5%E5%8F%A3) `info` 不會有所變動嗎？它仍然是可靠的嗎？（謎之聲：那個誰誰誰？你幹嘛沒事去改動傳入的參數啦！？這樣害我程式整組壞光光惹 Q_Q，說好的可靠性呢？）

是的，我們的車子確實需要輪子來進行移動，這點無法分割的一部分我承認，但是總會有更好的方式來管理這種情況。那就是`孤立相依性`！既然我們沒辦法把它切割乾淨，那反其道而行，要依賴就要把關係處理好（更好維護的方式）所以因為前人的智慧，我們可以將這段程式碼修改為下列範例：

```ruby
class Car
  attr_reader :name, :color, :wheels, :type

  def initialize(info = {})
    @name = info[:name] || '未命名'
    @color  = info[:color]  || '藍'
    @type   = info[:type]   || '房車'
    external_wheels(wheels)
  end

  def external_wheels(external_wheels)
    @wheels = external_wheels || Wheels.new
  end

  def info
    puts "#{name}，這輛車子是#{@color}色的，類型為#{@type}，輪子有#{@wheels.quantity}個。"
  end
end

class Wheels
  attr_reader :color, :quantity, :type

  def initialize(info = {})
    @color = info[:color] || '黑'
    @quantity = info[:quantity] || 4
    @type = info[:type] || '道路'
  end

  def info
    puts "這台車的輪胎規格為#{@type}胎，顏色為#{@color}色，共有#{@quantity}個輪胎。"
  end
end

compact_car = Car.new(name: '發財車', type: '貨車')
compact_car.info            # => 發財車，這輛車子是藍色的，類型為貨車，輪子有4個。
compact_car.wheels.info     # => 這台車的輪胎規格為道路胎，顏色為黑色，共有4個輪胎。

super_car = Car.new(name: '佛拉利', color: '紅', type: '跑車',
                    wheels: Wheels.new(color: '銀', type: '賽道'))
super_car.info              # => 佛拉利，這輛車子是紅色的，類型為跑車，輪子有4個。
super_car.wheels.info       # => 這台車的輪胎規格為道路胎，顏色為黑色，共有4個輪胎。
```

有發現差異了嗎？我們把在 `Car` 類別中的 `initialize` 方法中，我們把先前的：

```ruby
@wheels = info[:wheels] || Wheels.new
```

改寫為：

```ruby
external_wheels(wheels)
```

然後在 `Car` 類別中新增一個方法：

```ruby
def external_wheels(external_wheels)
  @wheels = external_wheels || Wheels.new
end
```

為什麼要這樣寫呢？因為如剛剛我說，我們目的是要把引用外部類別 `Wheels` 抽離出來成一個獨立的方法。這樣對我們來說有什麼好處嗎？根據古人的智慧把外部類別隔離成一個方法有以下好處：

1. 當我們引用外部類別，獨立出來可以很明確的知道它是來自外部，是較為不可靠的。
2. 當這個外部類別發生變動導致程式錯誤時，你可以很快找到是在某個隔離出來的方法之中，而不是從一堆程式碼中大海撈針。

## 小結 || 小傑（奇犽？)
---

在有限的篇幅當中，我們嘗試去探討一個大方向的主題，物件導向在 `Ruby` 的世界中可能會是以怎樣的形式實作。這是一個可以用數千字到上萬字可能都還講不完的主題。但是筆者為什麼要選這樣的主題來分享呢？因為身為非本科生亂入變成每天和 `Ruby` & `Rails` 打交道謀生的工作者，有一天因為工作上的需求去閱讀人生第一本原文書並把它看完了。從閱讀的過程中發現物件導向的觀念在同事幾年前所寫的龐大專案中無所不在。為什麼有經驗的 Coder 會用這種方式去寫程式呢？為什麼在 Code Review 的過程中會引導我嘗試去用物件導向的方式產出程式碼呢？這一切的一切都是從閱讀先前所推薦的物件導向書中慢慢理解。如果你和筆者一樣剛進入程式的世界還沒有很久，也許是時候擠出一點點的時間去閱讀一本關於物件導向的書籍。你也許會發現程式設計的美好世界（充滿 Bug 的世界？）最後請容許我引用一句講者在 [RubyConf Taiwan 2019](https://2019.rubyconf.tw/) 閉幕演講的話做為結尾。

> Energy Saving => Environent Friendly

多利用物件導向，少複製貼上程式碼是可以節約能約拯救地球的！

> Let's have this in mind and Build a Better World.

讓我們謹記心，打造更棒的世界！

[演講投影片](https://speakerdeck.com/c9s/virtual-machines)
