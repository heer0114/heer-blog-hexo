---
title: Fork / Join
tags:
  - Java
  - 并发编程
categories:
  - 并发编程
  - Fork / Join
abbrlink: 77d3638d
date: 2020-07-20 21:13:09
banner:
---

> 在Java 7中，引入了一种新的并行处理框架 - Fork/Join，它可以用于执行递归算法，并试图使用所有可用的处理器来提高性能。Fork/Join框架是一个基于工作窃取（work stealing）算法实现的线程池，其核心是将大任务分割成小任务进行并行处理，最终将结果合并。

## 工作窃取算法

工作窃取算法（work stealing algorithm）是一种负载均衡策略，它通过让某些线程从其他线程的队列里窃取任务来实现。具体而言，每个线程维护自己的双端队列，当一个线程完成自己的任务后，它会查找其他线程队列的末尾，然后从那里窃取一个任务并执行。这样，在某些情况下，可以避免某个线程一直处于繁忙状态，而其他线程却闲置的情况，从而提高整个系统的吞吐量。

## 基本原理

Fork/Join框架主要包含两个类：ForkJoinPool和ForkJoinTask。其中，ForkJoinPool是线程池的实现类，它继承自AbstractExecutorService类，因此可以使用execute、submit和invoke等方法来提交任务。ForkJoinTask则是一个抽象类，它表示可以使用Fork/Join框架进行并行处理的任务。

在Fork/Join框架中，任务分为两种类型：

- 普通任务（RecursiveTask）：具有返回值的任务。
- 动作任务（RecursiveAction）：不具有返回值的任务。

如果想要使用Fork/Join框架，需要遵循以下步骤：

1. 创建一个继承自RecursiveTask或RecursiveAction的任务类。
2. 在任务类中实现compute方法，该方法将任务分解成较小的子任务，并在递归基本情况下计算每个子任务。
3. 创建ForkJoinPool对象。
4. 将任务提交给ForkJoinPool执行。
5. 获取任务结果。

## 示例代码

下面是一个使用Fork/Join框架的示例代码，它演示了如何计算斐波那契数列的第n项：

```java
public class Fibonacci extends RecursiveTask<Integer> {
   final int n;
   Fibonacci(int n) { this.n = n; }

   protected Integer compute() {
      if (n <= 1)
         return n;
      Fibonacci f1 = new Fibonacci(n - 1);
      f1.fork();
      Fibonacci f2 = new Fibonacci(n - 2);
      return f2.compute() + f1.join();
   }

   public static void main(String[] args) {
      ForkJoinPool pool = new ForkJoinPool();
      Fibonacci f = new Fibonacci(10);
      int result = pool.invoke(f);
      System.out.println(result);
   }
}
```

在这个示例代码中，我们创建了一个名为 Fibonacci 的类，并继承了 RecursiveTask。在 compute 方法中，我们首先检查n是否小于等于1，如果是，则返回n。否则，我们将任务分解成两个子任务：计算n-1和n-2的斐波那契数列，并使用 fork() 方法异步执行第一个子任务。然后，我们同步执行第二个子任务，并等待第一个子任务完成。最后，我们返回结果。

在main方法中，我们创建了一个ForkJoinPool对象，并使用invoke()方法提交任务并获取结果。

## 高级用法

除了基础用法外，Fork/Join框架还提供了许多高级用法，可以适应不同的需求：

### 更改并行度

```java
ForkJoinPool pool = new ForkJoinPool(4);
```

在默认情况下，Fork/Join框架使用计算机的所有可用核心来执行任务。如果需要更改并行度，可以在创建ForkJoinPool对象时指定并行度。

### 使用invokeAll方法同时执行多个任务

```java
List<Fibonacci> tasks = new ArrayList<>();
for (int i = 0; i < 10; i++) {
   tasks.add(new Fibonacci(i));
}
pool.invokeAll(tasks);
```

如果有多个任务需要同时执行，可以使用invokeAll()方法来提交所有任务，并等待它们全部完成。该方法返回一个ForkJoinTask对象列表，其中每个对象对应一个任务。

### 子任务的取消

```java
public class MyTask extends RecursiveTask<Integer> {
   @Override
   protected Integer compute() {
      if (Thread.currentThread().isInterrupted()) {
         return null;
      }
      // 在这里编写需要同步处理的代码逻辑
   }
}
```

如果某些子任务已经无法被处理或不再需要处理，可以考虑取消它们。在Fork/Join框架中，可以使用Thread.interrupt()方法来中断正在执行的线程。在任务的compute方法中，我们可以通过检查当前线程是否被中断来判断是否应该取消任务。

## 总结

Fork/Join 框架是Java 7中引入的一种新的并行处理框架，它可以用于执行递归算法，并试图使用所有可用的处理器来提高性能。在使用Fork/Join框架时，我们需要继承RecursiveTask或RecursiveAction类，并在compute方法中实现任务分解和结果合并逻辑。通过学习和使用Fork/Join框架，我们可以更好地掌握Java多线程编程的核心思想和实践原则，并为编写高质量、高效的Java程序奠定基础。
