---
title: CAS
tags:
  - Java
  - 并发编程
categories:
  - 并发编程
  - CAS
abbrlink: 969d9481
date: 2020-07-11 21:08:11
banner:
---

>  <span style="border-bottom:2px solid green">CAS 全称为Compare And Swap，中文名为比较与交换。CAS包含三个操作数：内存位置V、旧的预期值A和新值B。当且仅当预期值A和内存位置V的值相同时，才将内存位置V的值更新为B。</span>

在 Java 中，CAS 是通过 Unsafe 类中的 compareAndSwapXXX() 方法来实现的，其中 XXX 表示数据类型。例如，compareAndSwapInt() 用于比较和交换整型数据。

CAS 操作是一种乐观锁，它认为在多线程访问同一资源时，大部分情况下不会出现竞争，因此不采用传统的悲观锁机制（如synchronized关键字）进行加锁，从而避免了加锁和释放锁所带来的系统开销。

## 应用

CAS 在Java中被广泛用于实现原子操作，例如 AtomicInteger、AtomicBoolean 等类就是基于 CAS 实现的。此外，在多线程编程中也常常使用CAS来保证数据的一致性和并发性，例如实现无锁队列、非阻塞算法等。

以下是一个使用CAS实现的线程安全的计数器示例代码：

```java
public class Counter {
    private AtomicInteger count = new AtomicInteger(0);

    public int getCount() {
        return count.get();
    }

    public void increment() {
        int oldValue, newValue;
        do {
            oldValue = count.get();
            newValue = oldValue + 1;
        } while (!count.compareAndSet(oldValue, newValue));
    }
}
```

在 increment() 方法中，使用了 do-while 循环和 compareAndSet() 方法来实现对计数器的原子更新操作。如果当前值与预期值相同，则更新为新值；否则继续循环尝试更新，直到成功为止。

## 优缺点

CAS的优点包括：

- 不需要加锁，避免了锁的开销和可能带来的死锁等问题。
- 可以支持多个线程同时访问同一资源。
- 具有高性能和可伸缩性，适用于高并发场景。

CAS的缺点包括：

- 在高并发场景下，会出现 ABA 问题，即一个值被修改两次后又变回原值。为了解决这个问题，Java 中提供了 AtomicStampedReference 类，可以通过版本号的方式来避免 ABA 问题。
- 如果 CAS 操作失败，需要进行重试，也会带来额外的系统开销。
- CAS 不能保证公平性，容易导致饥饿等问题。因此，在某些情况下还是需要采用传统的锁机制。
- 只能保证一个共享变量的原子操作。当对一个共享变量执行操作时，我们可以使用循环CAS的方式来保证原子操作，但是对多个共享变量操作时，循环CAS就无法保证操作的原子性，这个时候就可以用锁。

## 总结

CAS是一种基于乐观锁的并发控制方式，具有高性能和可伸缩性，在Java中被广泛应用于实现原子操作和保证数据的一致性和并发性。但CAS也存在着一些缺点，需要根据具体情况进行权衡和选择。
