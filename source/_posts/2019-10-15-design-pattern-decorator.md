---
title: Ruby 中的設計模式－裝飾模式 Decorator
author:
  nick: 居米
  link: 'https://github.com/jimmy2822'
date: 2019-10-15
cover: /2019/10/15/design-pattern-decorator/cover.jpg
categories: Ruby Design Pattern 設計模式
tags: [Ruby, Object-Oriented, Design-Pattern]
---

## Introduction
---

* 裝飾模式允許我們在沒有影響同類的物件下對物件改變其行為
* 裝飾模式是替代創建子類別的好方法

## 情境探討
---

假設我們有一台車的商品，售價為一百。

```ruby
class Car
  def price
    100
  end
end

car = Car.new

puts car.price
```

我們現在需要為車子新增零件。

```ruby
class CarWithLight < Car
  def price
    120
  end
end
```

現在有一台跑車掛滿零件，很貴。

```ruby
class SportCar < Car
  def price
    250
  end
end
```

現在我們因為車子多加零件所以要變更價格，但是我們花了許多 class 去做這件事情。如果還有更多種類的車子，我們會遇上更多麻煩。

如果我們考慮用動態的 module 去延伸呢？

## Extending dynamically with modules
---

為了簡化我們的程式碼，我們使用模組動態新增行為到車子上。讓我們把新的車子零件改寫為模組。

```ruby
module CarWithLight
  def price
    super + 20
  end
end

module SportCar
  def price
    super + 150
  end
end
```

現在我們用 Ruby 的方法 `extend` 將原本的 `Car` 做延伸。

```ruby
car = Car.new               => # price = 100
car.extend(CarWithLight)    => # price = 120
car.extend(SportCar)        => # price = 270
```

在使用 module 的方式下，我們不必再新增多餘的子類別去繼承 `Car`，寫法上又比繼承的方式簡潔不少。

但是隨著 module 化後，如先前舉例我們使用 `extend` 來獲得不同車種零件的價格加乘。但是接著我們會發現我們想要對同一個物件的價格加乘兩次時，`module` 不允許我們這麼做。

```ruby
car = Car.new               => # price = 100
car.extend(CarWithLight)    => # price = 120
car.extend(CarWithLight)    => # price = 120
```

如上範例程式碼，當我們對同一個物件 `extend` 兩次，會發現第二次的執行不會對車子價格產生影響。這是因為 `extend` 在 Ruby 中實作機制不允許我們這樣使用。是時候尋找新的方法了。

## 使用 Decorator Pattern
---

如果我們想要對車子添加更多零件，我們可以把車子的零件以 `Decorator Object` 的形式實作它。

```ruby
class Car
  def price
    100
  end
end

class AddCarPart
  def initialize(car)
    @car = car
  end

  def price
    @car.price + 25
  end
end

car =  Car.new
normal_car = AddCarPart.new(car)
sport_car = AddCarPart.new(normal_car)

puts car.price          # => 100
puts normal_car.price   # => 125
puts sport_car.price    # => 150
```

當我們使用 Decorator Object 時，我們期待這個 Object 會傳入 `Car` 類別進來，並且對該類別的實體進行價格的增減。這樣的使用情境下就會符合我們預期中的行為，也可以解決 `Module` 被多次 `extend` 導致無法正常作用的窘境。

## Delegate 委派
---

當我們的裝飾物件類別的實體需要新增一個實例方法時，我們會遇上一些麻煩。例如先前範例中的 `Car` 類別，如果 `Car` 新增一個 `#turbo` 方法呢？已經透過裝飾物件 `AddCarPart` 變更行為的實體便不會擁有新的方法 `#turbo` 了。像這樣的情境我們可以使用委派（Delegate）的方式來解決像這樣的問題。範例如下：

```ruby
class Car
  def price
    100
  end
end

class CarDelegator
  def info
    puts price
  end
end

class AddCarPart < CarDelegator
  def initialize(car)
    @car = car
  end

  def price
    @car.price + 25
  end
end

car =  Car.new
normal_car = AddCarPart.new(car)
sport_car = AddCarPart.new(normal_car)

normal_car.info   # => 125
sport_car.info    # => 150
```

我們在這段範例中為 `Car` 類別實作了一個 `Delegator`，並且將 `AddCarPart` 繼承它。如此一來，我們在委派的類別中成功為所有需要通過裝飾類別的物件統一加入某個方法。假設在該裝飾物件中，同樣的方法想要有不同的行為，我們也可以覆寫它並保有彈性。

## 關於學習設計模式
---

所謂的設計模式（Design Pattern）是一種經驗法則的產物。在各種程式語言中幾乎都可以利用語言的特性去實作設計模式。為什麼我們要學習設計模式呢？因為前人所累積的智慧，在應對特定的情境上找出常用的解法。這樣一來新進的工程師在面臨結構相似的問題時，就可以參考各種設計模式並瞭解其中的優劣，進而幫助自己釐清問題的本質。

這是部落格第一篇描寫關於設計模式的文章，聽說設計模式一共有二十來種呢⋯⋯期待在接下來的文章分享中，我們能繼續探索並分享設計模式的學習心得。一起邁向偉大的航道吧！（充滿臭蟲的海域？
