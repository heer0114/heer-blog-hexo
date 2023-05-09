---
title: CountDownLatch
tags:
  - Java
  - 并发编程
categories:
  - 并发编程
  - CountDownLatch
abbrlink: de7c53fe
date: 2020-07-11 22:10:15
banner:
---

## 什么是CountdownLatch？

> `CountdownLatch` 是Java并发包中提供的一种同步工具，用于协调多个线程之间的同步操作。`CountdownLatch `<span style="border-bottom: 2px solid green">内部维护了一个计数器，初始值为指定的数量，当计数器减为0时，所有等待的线程都会被释放，继续向下执行。</span>

## CountdownLatch的使用方法

CountdownLatch有两个主要的方法：

- countDown()：将计数器减1。
- await()：等待计数器变为0。

以下是一个使用CountdownLatch的示例代码：

```java
public class Worker implements Runnable {
    private final CountDownLatch startLatch;
    private final CountDownLatch endLatch;

    public Worker(CountDownLatch startLatch, CountDownLatch endLatch) {
        this.startLatch = startLatch;
        this.endLatch = endLatch;
    }

    @Override
    public void run() {
        try {
            startLatch.await(); // 等待开始信号
            // 执行任务...
            endLatch.countDown(); // 发送结束信号
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}

public class Main {
    public static void main(String[] args) throws InterruptedException {
        int nThreads = 10;
        CountDownLatch startLatch = new CountDownLatch(1);
        CountDownLatch endLatch = new CountDownLatch(nThreads);
        ExecutorService executorService = Executors.newFixedThreadPool(nThreads);

        for (int i = 0; i < nThreads; i++) {
            executorService.execute(new Worker(startLatch, endLatch));
        }
        // 发送开始信号
        startLatch.countDown();
        // 等待所有线程完成任务
        endLatch.await();
        executorService.shutdown();
    }
}
```

在上述示例代码中，启动了10个Worker线程，并通过CountdownLatch实现了对它们的同步控制。首先创建了两个CountdownLatch实例：startLatch和endLatch，分别用于发送开始信号和结束信号。然后创建了一个ExecutorService线程池，并向其中提交了10个Worker任务。在每个Worker任务中，首先调用startLatch.await()方法等待开始信号，然后执行具体的任务，最后调用endLatch.countDown()方法发送结束信号。在主线程中，首先发送开始信号，然后调用endLatch.await()方法等待所有线程完成任务。

## 优势和应用场景

### 优势

- 可以让多个线程等待某个事件的发生。
- 可以让某个线程在其他一些线程完成某件事情后再继续执行。

### 应用场景

- 为多个线程协调初始化工作。
- 实现并发读取大量数据时的同步控制。
- 实现多个线程间的同步等待。

## 总结

CountdownLatch 是 Java 并发包提供的一种同步工具，用于协调多个线程之间的同步操作。它可以帮助多个线程等待某个事件的发生，并可以让某个线程在其他一些线程完成某件事情后再继续执行。CountdownLatch 是实现多线程协作的重要工具之一，对于需要实现多个线程间的同步等待的场景非常有用。
