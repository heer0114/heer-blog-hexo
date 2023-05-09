---
title: FutureTask
tags:
  - Java
  - 并发编程
categories:
  - 并发编程
  - FutureTask
abbrlink: 9860061d
date: 2020-07-22 20:43:59
banner:
---

> 在Java中，FutureTask是一种基于线程的并发工具类，它可以用于异步计算。通过使用FutureTask，我们可以将一个长时间运行的计算任务提交给另一个线程，并继续执行其他任务。当需要结果时，可以调用get方法获取计算结果，如果计算尚未完成，则会阻塞等待。FutureTask还提供了cancel方法来取消计算任务。

## FutureTask的基本用法

下面是一个使用FutureTask的示例代码：

```java
public static void main(String[] args) throws Exception {
   FutureTask<Integer> task = new FutureTask<>(new Callable<Integer>() {
      @Override
      public Integer call() throws Exception {
         // 在这里编写需要计算的任务
         return 42;
      }
   });
   
   new Thread(task).start();
   
   // 在这里做一些其他事情
   
   Integer result = task.get();
   System.out.println("计算结果：" + result);
}
```

在这个示例代码中，我们创建了一个名为task的FutureTask对象，并传入一个Callable对象作为参数。在Callable的call方法中，我们编写实际的计算任务，并返回结果（这里简单地返回了数字42）。然后，我们创建一个新线程并启动任务。在任务执行期间，我们可以做一些其他事情，比如继续执行其他任务。最后，我们调用get方法来获取结果。如果计算尚未完成，则该方法会被阻塞，直到计算完成。

## FutureTask的高级用法

除了基础用法外，FutureTask还提供了许多高级用法，可以适应不同的需求：

### 设置超时时间

```java
Integer result = task.get(1, TimeUnit.SECONDS);
```

如果需要在一定时间内获取计算结果，可以调用get方法的另一个重载，并传入超时时间和时间单位。如果在指定时间内没有获取到结果，则会抛出TimeoutException异常。

### 中断计算任务

```java
task.cancel(true);
```

在某些情况下，可能需要取消计算任务。为此，可以使用cancel方法。该方法接受一个布尔值参数，指示是否中断任务执行。如果任务正在执行，则会向任务线程发送中断信号。

### 判断计算完成状态

```java
boolean isDone = task.isDone();
```

如果想要确定计算是否已经完成，可以调用isDone方法。它将返回一个布尔值，指示计算是否已经完成。

## 总结

FutureTask是Java中一种基于线程的并发工具类，它可以用于异步计算。通过学习和使用FutureTask，我们可以更好地掌握Java多线程编程的核心思想和实践原则，并为编写高质量、高效的Java程序奠定基础。
