---
title: 方法引用
tags:
  - Java
  - Java 8
  - 函数编程
categories:
  - Java
  - Java 基础
  - 函数编程
abbrlink: 4b34576e
date: 2021-06-21 21:15:45
banner:
---

在Java 8中，方法引用（method reference）是一种方便的语法，可以将现有的方法作为Lambda表达式传递。这样做可以简化代码，并且使得代码更加易于理解和修改。本文将介绍Java方法引用的基本概念、语法和使用方法。

{% note yellow %}

阅读本篇内容默认认为你已经掌握了[函数接口](/posts/a65f2ab8/)、[Lambda 表达式](/posts/9fa75fc1/)

{% endnote %}

## 什么是方法引用？

方法引用是一种语法，用于将现有的方法作为Lambda表达式传递。通常情况下，我们需要定义一个Lambda表达式来表示一个匿名函数，然后把它传递给另一个函数。但是，如果这个Lambda表达式只是调用了一个已经存在的方法，那么就可以使用方法引用来代替Lambda表达式。方法引用的基本思想是：如果存在一个现有方法，它正好满足Lambda表达式的参数和返回类型，那么就可以使用方法引用来代替Lambda表达式。

## 方法引用的语法

方法引用使用`::`符号来表示。它的语法有以下几种形式：

- 静态方法引用：`ClassName::methodName`
- 实例方法引用：`objectName::methodName`
- 特定类的任意对象方法引用：`ClassName::methodName`
- 构造方法引用：`ClassName::new`

其中，静态方法引用和实例方法引用是最常用的两种形式。其他两种形式通常用于特殊情况。

### 静态方法引用

静态方法引用使用`ClassName::methodName`的形式。例如，如果存在一个静态方法`Integer.parseInt(String)`，我们可以使用如下的代码来引用它：

```java
Function<String, Integer> parser = Integer::parseInt;
```

上面的代码将`Integer.parseInt()`方法作为一个函数对象赋值给了`parser`变量。这样，在程序中就可以像使用其他函数一样使用这个函数对象了。

### 实例方法引用

实例方法引用使用`objectName::methodName`的形式。例如，如果存在一个实例方法`String.toUpperCase()`，我们可以使用如下的代码来引用它：

```java
UnaryOperator<String> converter = String::toUpperCase;
```

上面的代码将`String.toUpperCase()`方法作为一个函数对象赋值给了`converter`变量。这样，在程序中就可以像使用其他函数一样使用这个函数对象了。注意：在这个例子中，`String::toUpperCase`是一个无参方法，因此返回值类型必须与函数接口的返回值类型相同（即`UnaryOperator<String>`）。

## 总结

Java方法引用是一种方便的语法，用于简化Lambda表达式并使代码更加易于理解和修改。方法引用通常可以用于函数式接口的参数或者返回值，以便将现有方法转换成函数式接口的实例。掌握方法引用的基本语法和相关技巧，可以让我们更加高效地编写Java代码。
