---
title: CompletableFuture
tags:
  - Java
  - 并发编程
categories:
  - 并发编程
  - CompletableFuture
abbrlink: 227b7dd1
date: 2020-07-25 20:43:59
banner:
---

> 在Java 8中，引入了一种新的线程并发处理框架 - CompletableFuture，它可以用于执行异步计算，并处理计算结果。CompletableFuture类提供了许多方法来创建、组合和转换异步任务以及处理异常。

## 基本用法

下面是一个使用CompletableFuture的示例代码：

```java
public static void main(String[] args) throws Exception {
   CompletableFuture<Integer> future = CompletableFuture.supplyAsync(() -> {
      // 在这里编写需要计算的任务
      return 42;
   });
   
   Integer result = future.get();
   System.out.println("计算结果：" + result);
}
```

在这个示例代码中，我们创建了一个名为future的CompletableFuture对象，并使用supplyAsync方法传入一个Supplier对象作为参数来创建该对象。在Supplier的get方法中，我们编写实际的计算任务并返回结果（这里简单地返回了数字42）。然后，我们调用get方法来获取结果。如果计算尚未完成，则该方法会被阻塞，直到计算完成。

## 高级用法

除了基础用法外，CompletableFuture还提供了许多高级用法，可以适应不同的需求：

### 组合多个CompletableFuture对象

```java
CompletableFuture<Integer> future1 = CompletableFuture.supplyAsync(() -> 1);
CompletableFuture<Integer> future2 = CompletableFuture.supplyAsync(() -> 2);
CompletableFuture<Integer> future3 = CompletableFuture.supplyAsync(() -> 3);

CompletableFuture<Integer> combinedFuture = future1.thenCombine(future2, (result1, result2) -> result1 + result2)
                                                   .thenCombine(future3, (result12, result3) -> result12 + result3);

System.out.println(combinedFuture.get());
```

如果需要对多个CompletableFuture对象进行组合操作，可以使用thenCombine、thenAcceptBoth和runAfterBoth等方法。这些方法接受一个或多个CompletableFuture对象作为参数，并在计算完成后执行相应的操作。

### 处理任意一个任务完成

```java
CompletableFuture<Integer> future1 = CompletableFuture.supplyAsync(() -> {
    try {
        Thread.sleep(1000);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
    return 1;
});

CompletableFuture<Integer> future2 = CompletableFuture.supplyAsync(() -> {
    try {
        Thread.sleep(2000);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
    return 2;
});

CompletableFuture<Object> anyFuture = CompletableFuture.anyOf(future1, future2);

System.out.println(anyFuture.get());
```

如果有多个CompletableFuture对象，并且只需要处理其中任意一个任务完成的情况，可以使用anyOf方法。该方法接受一个CompletableFuture对象数组作为参数，并返回一个新的CompletableFuture对象，该对象在其中任意一个任务完成时就会完成。

### 当前任务执行完后执行

```java
CompletableFuture<Integer> future1 = CompletableFuture.supplyAsync(() -> 1);
future1.thenRun(() -> System.out.println("任务完成"));
```

如果需要在当前任务计算完成后执行操作，可以使用thenRun方法。该方法接受一个Runnable对象作为参数，并在当前任务完成后执行相应的操作。

### 处理异常情况

```java
CompletableFuture<Integer> future = CompletableFuture.supplyAsync(() -> {
    throw new RuntimeException("计算异常");
}).exceptionally(e -> -1);

System.out.println(future.get());
```

如果在异步计算中出现异常，可以使用exceptionally方法来捕获异常并返回默认结果。

### 串行执行多个任务

```java
CompletableFuture.supplyAsync(() -> "Hello")
.thenApply(s -> s + " World")
.thenApply(String::toUpperCase)
.thenAccept(System.out::println);
```

如果有多个任务需要按照顺序串行执行，可以使用thenApply、thenAccept和thenRun等方法。这些方法的返回值都是新的CompletableFuture对象，可以继续进行链式调用。

## 总结

CompletableFuture是Java 8中引入的一种新的线程并发处理框架，它可以用于执行异步计算，并处理计算结果。通过学习和使用CompletableFuture，我们可以更好地掌握Java多线程编程的核心思想和实践原则，并为编写高质量、高效的Java程序奠定基础。
