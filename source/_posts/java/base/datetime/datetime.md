---
title: Java8 - 日期时间API
tags:
  - Java
  - 日期时间API
categories:
  - Java
  - Date Time API
abbrlink: de0f09f0
date: 2020-05-14 19:56:02
banner:
---

`Java 8`新增了一套全新的时间API，这些API让我们能够更方便地进行日期和时间的处理。在Java 8之前，日期和时间的操作大多是基于`java.util.Date`和`java.util.Calendar`类，但这些类存在很多问题，比如线程不安全、可变性等，同时也缺乏一些常见的操作。

## 优势

Java 8时间操作类的设计理念是围绕着不可变性、线程安全性和清晰易用性来展开的。Java 8时间操作类的主要优势如下：

1. `不可变性`：Java 8时间操作类中的所有类都是不可变的，即它们的方法都不会改变原实例的状态，而是返回一个新的实例。这种不可变性使得Java 8时间操作类线程安全，可以在多线程环境下使用。
2. `线程安全性`：Java 8时间操作类的所有类都是线程安全的，因为它们是不可变的。在多线程环境下，多个线程可以同时读取同一个实例，而不需要担心数据竞争等线程安全问题。
3. `清晰易用性`：Java 8时间操作类提供了丰富的API，可以完成各种常见的日期和时间操作。它们的方法名和参数都非常易懂，使得编写代码更加简洁易读。

## 主要类

Java 8时间操作类中主要包括如下几个类：

1. `LocalDate`：表示一个日期，例如2020-05-14。它提供了各种方法来操作日期，比如加减天数、月份和年份等。
2. `LocalTime`：表示一个时间，例如23:59:59.999。它提供了各种方法来操作时间，比如加减小时、分钟和秒等。
3. `LocalDateTime`：表示一个日期和时间，例如2019-11-03T23:59:59.999。它同时包含了日期和时间的信息，提供了各种方法来操作日期和时间。
4. `Instant`：表示一个时间戳，即从1970年1月1日开始经过的秒数。它可以用来计算两个时间点之间的时间差，或者将时间戳转换为日期和时间格式。
5. `Duration`：表示一个时间段，例如2小时30分钟。它提供了各种方法来操作时间段，比如加减时间、获取时间段的总秒数等。
6. `Period`：表示一个日期段，例如3年2个月1天。它提供了各种方法来操作日期段，比如加减日期、获取日期段的总天数等。

## 使用示例

### LocalDate

{% note info %}

日期操作

{% endnote %}

```java
public class LocalDateDemo {
    public static void main(String[] args) {
        // 使用now()方法创建当前日期实例
        LocalDate today = LocalDate.now();
        // 当前日期是: 2020-05-14
        System.out.println("当前日期是: " + today); 

        // 使用of()方法创建指定日期实例
        LocalDate date1 = LocalDate.of(2019, 10, 1);
        // 指定日期是: 2019-10-01
        System.out.println("指定日期是: " + date1); 

        // 获取年份、月份和天数
        int year = today.getYear();
        int month = today.getMonthValue();
        int day = today.getDayOfMonth();
        System.out.printf("今天是%d年%d月%d日%n", year, month, day);  // 今天是2020年5月14日

        // 加减天数
        LocalDate tomorrow = today.plusDays(1);
        LocalDate yesterday = today.minusDays(1);
        System.out.println("明天是：" + tomorrow);  // 明天是：2020-05-15
        System.out.println("昨天是：" + yesterday);  // 昨天是：2020-05-13

        // 判断是否为闰年
        boolean isLeapYear = today.isLeapYear();
        // 今年是否是闰年：true
        System.out.println("今年是否是闰年：" + isLeapYear);  
    }
}
```

### LocalTime

{% note info %}

时间操作

{% endnote %}

```java
public class LocalTimeDemo {
    public static void main(String[] args) {
        // 使用now()方法创建当前时间实例
        LocalTime now = LocalTime.now();
        System.out.println("现在是: " + now);  // 现在是: 20:07:25.797

        // 使用of()方法创建指定时间实例
        LocalTime time1 = LocalTime.of(8, 30);
        System.out.println("指定时间是: " + time1);  // 指定时间是: 08:30

        // 获取小时、分钟、秒以及毫秒数
        int hour = now.getHour();
        int minute = now.getMinute();
        int second = now.getSecond();
        int nano = now.getNano();
        // 现在是20时07分25秒797纳秒
        System.out.printf("现在是%d时%d分%d秒%d纳秒%n", hour, minute, second, nano);

        // 加减小时、分钟、秒以及毫秒数
        LocalTime newTime1 = now.plusHours(2);
        LocalTime newTime2 = now.minusMinutes(30);
        // 两个小时后的时间是：22:07:25.797
        System.out.println("两个小时后的时间是：" + newTime1);
        // 30分钟前的时间是：19:37:25.797
        System.out.println("30分钟前的时间是：" + newTime2);

        // 使用parse()方法解析字符串为时间
        LocalTime time2 = LocalTime.parse("20:15:30");
        System.out.println("解析后的时间是：" + time2);  // 解析后的时间是：20:15:30
    }
}
```

### LocalDateTime

{% note info %}

日期时间操作

{% endnote %}

```java
public class LocalDateTimeDemo {
    public static void main(String[] args) {
        // 使用now()方法创建当前日期时间实例
        LocalDateTime now = LocalDateTime.now();
        // 现在是: 2020-05-14T20:40:49.458
        System.out.println("现在是: " + now);

        // 使用of()方法创建指定日期时间实例
        LocalDateTime dateTime1 = LocalDateTime.of(2020, 10, 1, 8, 30);
        // 指定日期时间是: 2020-10-01T08:30
        System.out.println("指定日期时间是: " + dateTime1);

        // 获取年份、月份、日、小时、分钟和秒
        int year = now.getYear();
        int month = now.getMonthValue();
        int day = now.getDayOfMonth();
        int hour = now.getHour();
        int minute = now.getMinute();
        int second = now.getSecond();
        // 现在是2020年5月14日20时40分49秒
        System.out.printf("现在是%d年%d月%d日%d时%d分%d秒%n", year, month, day, hour, minute, second);

        // 加减日期和时间
        LocalDateTime newDateTime1 = now.plusDays(1).minusHours(2);
       // 1天后减2小时的日期时间是：2020-05-15T18:40:49.458
        System.out.println("1天后减2小时的日期时间是：" + newDateTime1);

        // 使用parse()方法解析字符串为日期时间
        LocalDateTime dateTime2 = LocalDateTime.parse("2020-05-10T20:15:30");
        // 解析后的日期时间是：2020-05-10T20:15:30
        System.out.println("解析后的日期时间是：" + dateTime2);  
    }
}
```

### Instant

{% note info %}

时间戳操作

{% endnote %}

```java
public class InstantDemo {
    public static void main(String[] args) {
        // 创建一个Instant实例
        Instant now = Instant.now();
        // 当前时间戳是：当前时间戳是：2020-05-14T20:32:00Z
        System.out.println("当前时间戳是：" + now);

        // 获取时间戳的值
        long epochSecond = now.getEpochSecond();
        int nano = now.getNano();
        // 时间戳的值为1589488320秒0纳秒
        System.out.printf("时间戳的值为%d秒%d纳秒%n", epochSecond, nano);

        // 使用ofEpochSecond()方法创建Instant实例
        Instant instant1 = Instant.ofEpochSecond(1601510400);
        // 指定时间戳是：2020-10-01T00:00:00Z
        System.out.println("指定时间戳是：" + instant1);

        // 计算两个时间戳之间的时间差
        Instant instant2 = Instant.ofEpochSecond(1651456800);
        long seconds = Duration.between(instant1, instant2).getSeconds();
        // 两个时间戳之间相差49946400秒
        System.out.printf("两个时间戳之间相差%d秒%n", seconds);
      
        //// 转换
        / 创建一个 Instant 对象
        Instant instant = Instant.now();

        // 将 Instant 转换为 LocalDateTime
        LocalDateTime localDateTime = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
        System.out.println("LocalDateTime: " + localDateTime);

        // 将 Instant 转换为 ZonedDateTime
        ZonedDateTime zonedDateTime = instant.atZone(ZoneId.systemDefault());
        System.out.println("ZonedDateTime: " + zonedDateTime);

        // 将 Instant 转换为 LocalDate
        LocalDate localDate = instant.atZone(ZoneId.systemDefault()).toLocalDate();
        System.out.println("LocalDate: " + localDate);

        // 将 Instant 转换为 LocalTime
        LocalTime localTime = instant.atZone(ZoneId.systemDefault()).toLocalTime();
        System.out.println("LocalTime: " + localTime);
    }
}
```

### Period

{% note info %}

日期段操作

{% endnote %}

```java
public class PeriodDemo {
    public static void main(String[] args) {
        // 创建一个Period实例
        Period period1 = Period.of(3, 2, 1);
        System.out.println("指定日期段是：" + period1);  // 指定日期段是：P3Y2M1D

        // 获取年份、月份和天数
        int year = period1.getYears();
        int month = period1.getMonths();
        int day = period1.getDays();
        System.out.printf("指定日期段为%d年%d个月%d天%n", year, month, day);  // 指定日期段为3年2个月1天

        // 使用between()方法计算两个日期之间的日期段
        LocalDate date1 = LocalDate.of(2021, 10, 1);
        LocalDate date2 = LocalDate.of(2022, 8, 25);
        Period period2 = Period.between(date1, date2);
        System.out.println("两个日期之间的日期段是：" + period2);  // 两个日期之间的日期段是：P10M24D

        // 计算总天数
        int days = period2.getDays() + period2.getMonths() * 30 + period2.getYears() * 365;
        System.out.printf("两个日期之间相差%d天%n", days);  // 两个日期之间相差328天
    }
}
```

### Duration

{% note info %}

时间段操作

{% endnote %}

```java
public class DurationDemo {
    public static void main(String[] args) {
        // 创建一个Duration实例
        LocalDateTime dateTime1 = LocalDateTime.of(2019, 10, 1, 8, 30);
        LocalDateTime dateTime2 = LocalDateTime.of(2020, 8, 25, 14, 0);
        Duration duration1 = Duration.between(dateTime1, dateTime2);
        // 两个日期时间之间的时间段是：PT7901H30M
        System.out.println("两个日期时间之间的时间段是：" + duration1);

        // 获取时、分、秒和毫秒数
        long hours = duration1.toHours();
        long minutes = duration1.toMinutes() % 60;
        long seconds = duration1.getSeconds() % 60;
        long millis = duration1.toMillis() % 1000;
        System.out.printf("两个日期时间之间相差%d小时%d分钟%d秒%d毫秒%n", hours, minutes, seconds, millis);  // 两个日期时间之间相差7901小时30分钟0秒0毫秒

        // 使用ofXXX()方法创建Duration实例
        Duration duration2 = Duration.ofDays(3).plusHours(5).plusMinutes(20).plusSeconds(10);
        System.out.println("指定时间段是：" + duration2);  // 指定时间段是：PT77H20M10S
    }
}
```

### DateTimeFormatter

{% note info %}

格式化

{% endnote %}

```java
public class DateTimeFormatterDemo {
    public static void main(String[] args) {
        // 创建一个DateTimeFormatter实例，并使用format()方法格式化日期时间
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter1 = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime1 = now.format(formatter1);
        // 格式化后的日期时间是：2020-05-14 20:40:01
        System.out.println("格式化后的日期时间是：" + formattedDateTime1);

        // 使用parse()方法解析字符串为日期时间
        DateTimeFormatter formatter2 = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        LocalDateTime dateTime2 = LocalDateTime.parse("20200828092915", formatter2);
        // 解析后的日期时间是：2020-08-28T09:29:15
        System.out.println("解析后的日期时间是：" + dateTime2);
    }
}
```

## 总结

Java 8时间操作类的设计理念是围绕着不可变性、线程安全性和清晰易用性来展开的。它们提供了丰富的API，可以完成各种常见的日期和时间操作，并且具有很好的性能和稳定性。使用Java 8时间操作类可以让我们更加便捷地进行日期和时间的处理，避免了之前旧版API中存在的一些问题。
