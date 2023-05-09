---
title: ReentrantLock
tags:
  - Java
  - 并发编程
categories:
  - 并发编程
  - ReentrantLock
abbrlink: '6e505175'
date: 2020-07-13 19:55:19
banner:
---

> 在Java中，线程同步是非常重要的。它可以避免多个线程同时访问共享资源时导致的数据竞争和一致性问题。Java提供了很多种线程同步机制，其中之一就是ReentrantLock。

## 什么是ReentrantLock

`ReentrantLock`是 Java 中的一个锁对象，它可以协调多个线程对共享资源的访问。与内部锁 synchronized 不同的是，ReentrantLock 具有可重入性，即同一个线程可以多次获得这个锁，而不会被自己所阻塞。

ReentrantLock 还支持公平锁和非公平锁，默认情况下为非公平锁。公平锁会按照线程请求的顺序分配锁，而非公平锁则不保证这点。

## 如何使用ReentrantLock

使用ReentrantLock可以分为三个步骤：创建锁对象、获取锁和释放锁。

### 创建锁对象

```java
ReentrantLock lock = new ReentrantLock();
```

### 获取锁

```java
lock.lock();
try {
    // 在这里编写需要同步处理的代码逻辑
} finally {
    lock.unlock();
}
```

### 释放锁

当获得锁后，我们需要在finally块中释放锁。这样可以确保锁总是会被释放，即使在同步代码块中抛出了异常。

## 示例代码

下面是一个使用ReentrantLock的示例代码，它演示了如何使用ReentrantLock来同步访问共享资源：

```java
public class Example {
   private static final ReentrantLock lock = new ReentrantLock();

   public static void main(String[] args) {
      Thread t1 = new Thread(new Worker(), "Thread 1");
      Thread t2 = new Thread(new Worker(), "Thread 2");

      t1.start();
      t2.start();
   }

   private static class Worker implements Runnable {
      @Override
      public void run() {
         lock.lock();
         try {
            System.out.println(Thread.currentThread().getName() + " acquired the lock.");
            // 执行需要同步处理的操作
         } finally {
            System.out.println(Thread.currentThread().getName() + " released the lock.");
            lock.unlock();
         }
      }
   }
}
```

在这个示例代码中，我们创建了一个名为Example的类，并定义了一个ReentrantLock对象。然后，我们创建两个线程（Thread 1和Thread 2），每个线程都会执行Worker类的run方法。在Worker类的run方法中，我们通过lock.lock()获取锁，并在try语句块中执行需要同步处理的操作。在finally块中，我们使用lock.unlock()释放锁。最后，在控制台上输出哪个线程获得了锁并成功释放了锁。

## ReentrantLock的高级用法

除了基础用法外，ReentrantLock还提供了许多高级用法，可以适应不同的需求：

### 使用tryLock方法尝试获取锁

```java
if (lock.tryLock()) {
   try {
      // 在这里编写需要同步处理的代码逻辑
   } finally {
      lock.unlock();
   }
} else {
   // 如果无法获取锁，则执行其他操作
}
```

在某些情况下，我们不想一直等待获取锁。此时，可以使用tryLock()方法尝试获取锁。如果在指定时间内没有获取到锁，则返回false。

### 使用lockInterruptibly方法获取可中断锁

```java
public void run() {
   try {
      lock.lockInterruptibly();
      try {
         // 在这里编写需要同步处理的代码逻辑
      } finally {
         lock.unlock();
      }
   } catch (InterruptedException e) {
      Thread.currentThread().interrupt();
   }
}
```

在某些情况下，我们希望在等待获取锁时能够相应中断请求。此时，可以使用lockInterruptibly()方法来获取可中断锁。

### 使用Condition实现线程间通信

```java
private static Lock lock = new ReentrantLock();
private static Condition condition = lock.newCondition();

public static void main(String[] args) {
   Thread t1 = new Thread(new Task(), "Thread 1");
   t1.start();
}

private static class Task implements Runnable {
   @Override
   public void run() {
      lock.lock();
      try {
         condition.await();
         // 在这里编写需要同步处理的代码逻辑
      } catch (InterruptedException e) {
         Thread.currentThread().interrupt();
      } finally {
         lock.unlock();
      }
   }
}
```

除了基本的锁机制，ReentrantLock还提供了Condition接口来实现线程间通信。可以使用lock.newCondition()方法创建一个Condition对象。在等待某个条件时，可以调用condition.await()方法。当条件满足时，可以调用condition.signal()方法来唤醒等待的线程。

## 总结

在 Java 中，线程同步是非常重要的。ReentrantLock 是 Java 中一个可重入的锁对象，它提供了高级的使用方式，如尝试获取锁、可中断锁和线程间通信等。通过学习和使用 ReentrantLock，我们可以更好地掌握Java多线程编程的核心思想和实践原则，并为编写高质量、高效的Java程序奠定基础。

