---
title: JVM 安全点
tags:
  - Java
  - JVM
  - GC
categories:
  - JVM
  - GC
abbrlink: 5a9ba959
date: 2020-06-08 23:45:39
banner:
---

JVM的安全点（Safepoint）是JVM执行垃圾回收时的一个重要概念。<span style="border-bottom:2px solid green;">在JVM进行垃圾回收操作时，需要保证堆的一致性，因此需要挂起所有运行Java代码的线程并记录它们的状态。这些特定位置就被称为 ***`安全点`***。</span>>

## 安全点的作用

当一个线程处于安全点时，JVM可以确保该线程不会同时访问堆内存中的对象。如果不挂起所有线程，那么这些线程可能正在访问堆内存中的对象。如果同时执行垃圾回收，则这些线程可能同时修改这些对象，导致数据错误或不一致。因此，在进行垃圾回收操作时，必须等待所有线程到达安全点，并将它们挂起，然后才能继续执行垃圾回收操作。

## 安全点的触发条件

{%notel yellow 当一个线程处于安全点时，它必须满足以下条件之一 %}

1. 执行Java方法的字节码指令结束或异常抛出；
2. 执行JNI（Java Native Interface）方法的字节码指令结束或异常抛出；
3. 执行VM操作（如Thread.sleep）的字节码指令结束或异常抛出。

{% endnotel %}

这意味着当一个线程处于安全点时，它一定是上述情况之一。只有在这些情况下，线程才被挂起进行垃圾回收操作。

## 安全点的影响

当JVM进行垃圾回收操作时，必须等待所有线程到达安全点，并将它们挂起，然后才能继续执行垃圾回收操作。这种等待时间可能会导致一些线程长时间等待，从而导致应用程序响应时间变慢。

为了减少这种情况的发生，JVM提供了多种垃圾回收算法和垃圾回收器，以便在特定的场景中选择最佳的垃圾回收策略。例如CMS（Concurrent Mark Sweep）垃圾回收器就是在并发标记阶段尽可能减少安全点的数量的一种垃圾回收器。

此外，我们也可以通过调整线程数、线程优先级、堆内存大小等措施来减少安全点的影响。

## 总结

安全点是一个重要的概念，在JVM进行垃圾回收操作时扮演着至关重要的角色。了解安全点的作用、触发条件和影响，对于Java开发者来说是非常重要的。在实际开发中，我们需要根据应用场景选择合适的垃圾回收算法和垃圾回收器，并采取相应的措施来减少安全点的影响，以使应用程序能够达到更好的性能和响应速度。