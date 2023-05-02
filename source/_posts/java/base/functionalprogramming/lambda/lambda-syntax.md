---
title: Lambda 表达式
tags:
  - Java
  - Java 8
  - 函数编程
categories:
  - Java
  - 函数编程
abbrlink: 9fa75fc1
date: 2021-06-18 19:10:13
banner:
---

Lambda表达式是Java 8中新增的一种编程语法，它允许我们将一个函数作为参数传给另一个函数。Lambda表达式可以简化代码，使其更加易读和简洁。本文将介绍Java Lambda表达式的语法。

## 基本语法

Lambda表达式的基本语法如下：

```java
(parameter list) -> { lambda body }
```

其中，`parameter list`是参数列表，可以是空的，也可以包含一个或多个参数；`lambda body`是Lambda表达式的执行体，可以是一个表达式或代码块。

例如，以下Lambda表达式没有任何参数，执行体只有一个输出语句：

```java
() -> System.out.println("Hello, Lambda!");
```

以下Lambda表达式有一个参数，执行体是一个表达式：

```java
x -> x * x
```

以下Lambda表达式有两个参数，执行体是一个代码块：

```java
(x, y) -> {
    int sum = x + y;
    return sum;
}
```

## 类型推断

在Java 8之前，需要显式地指定Lambda表达式的函数接口类型。但是，在Java 8中引入了类型推断机制，可以根据上下文自动推断Lambda表达式的函数接口类型。例如：

```java
List<String> list = Arrays.asList("foo", "bar");
list.forEach((String s) -> System.out.println(s));
```

由于`list`是一个`List<String>`类型的集合，因此Lambda表达式`(String s) -> System.out.println(s)`的函数接口类型也可以自动推断出来。因此，我们可以省略函数接口类型的显式声明：

```java
list.forEach(s -> System.out.println(s));
```

## 总结

Java Lambda表达式是一种简洁、易读且功能强大的编程语法。它可以使代码更加简单、清晰，并可用于各种场合。掌握Lambda表达式的基本语法和相关技巧，可以让我们更加高效地编写Java代码。
