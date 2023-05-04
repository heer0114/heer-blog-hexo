---
title: Stream API
tags:
  - Java
  - Java 8
  - Stream
categories:
  - Java
  - StreamAPI
abbrlink: edc6b1e1
date: 2021-06-22 19:55:45
banner:
---

在Java 8中，引入了一组全新的API，称为Stream API，用于操作集合。这个功能非常强大，而且相当容易学习和使用。

## 什么是Stream？

Stream可以将一个数据源（如List、Set等）转换成一个流，然后通过一系列的中间操作（如filter、map等）来进行处理，最终获取想要的结果。还可以对结果进行聚合操作（如sum、average等）。

与传统的集合处理方式不同，Stream API提供了延迟计算的特性。它会尽可能地推迟计算，直到我们需要结果为止。这种方法让我们能够更加灵活地处理大规模的数据集合，避免了不必要的内存占用和计算时间。

## Stream的优点

Stream API有以下几个优点：

- 简化代码：Stream API采用链式调用方式，使得代码更加简洁易懂，降低了代码的复杂度。
- 延迟计算：Stream API支持延迟计算，只有在需要结果时才会执行真正的计算，避免了不必要的内存占用和计算时间。
- 并行处理：Stream API内部支持并行处理，可以充分利用多核CPU的优势，提高程序的运行效率。

## Stream的基本操作

Stream API主要有三个基本操作：

- 创建流：可以通过集合、数组、文件等来创建一个流。
- 中间操作：可以对流进行一系列的操作，如过滤、映射、排序等。
- 终止操作：最终获取想要的结果，如收集到List、Set、Map等中。

### 创建流

创建一个Stream对象最常见的方法就是使用集合的stream()方法。例如：

```java
List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);
Stream<Integer> stream = list.stream();
```

还可以使用of()方法来创建流：

```java
Stream<String> stream = Stream.of("Hello", "World");
```

### 中间操作

Stream API中间操作可以实现链式调用，常用的中间操作如下：

- filter：根据指定条件过滤出符合条件的元素。
- map：将原始类型的元素转换成其他类型。
- sorted：对元素进行排序。
- distinct：去除重复的元素。
- limit：限制返回元素的数量。
- skip：跳过前n个元素。
- peek：在处理每个元素时执行一些操作。

例如，使用filter和map操作对数字列表进行处理：

```java
List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);
list.stream()
        .filter(i -> i > 2)
        .map(i -> i * i)
        .forEach(System.out::println);
```

### 终止操作

Stream API中的终止操作会执行一些操作，返回一个结果。常用的终止操作如下：

- count：返回元素的数量。
- collect：将流转换成集合、Map等。
- reduce：根据指定规则对元素进行计算。

例如，使用collect对数字列表进行处理：

```java
List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);
List<Integer> result = list.stream()
        .filter(i -> i > 2)
        .map(i -> i * i)
        .collect(Collectors.toList());
```

这段代码会返回一个新的List对象，其中包含所有大于2的数字的平方值。

## Stream并行处理

由于Stream API内部支持并行处理，因此可以通过parallel()方法将串行流转换为并行流，让程序充分利用多核CPU的优势。例如：

```java
List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);
int sum = list.parallelStream()
    .filter(i -> i > 2)
    .mapToInt(i -> i * i)
    .sum();
```

这段代码会对数字列表进行并行处理，返回大于2的数字的平方和。

## 总结

Java 8 Stream API提供了一种简单、易用、高效的方式来操作集合，利用它可以更加轻松地处理大规模数据集。Stream API的优势在于代码简洁易懂、支持延迟计算和并行处理。开发者可以根据自己的需求选择适合自己的中间操作和终止操作，从而达到快速实现功能的目的。
