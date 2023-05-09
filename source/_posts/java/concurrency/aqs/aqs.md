---
title: AQS
tags:
  - Java
  - 并发编程
categories:
  - 并发编程
  - AQS
abbrlink: dfdb52be
date: 2020-07-12 22:10:15
banner:
---

> 队列同步器 `AbstractQueuedSynchronizer`（以下简称同步器），是用来构建锁或者其他同步组件的基础框架，<span style="border-bottom: 2px solid green">它使用了一个int成员变量表示同步状态，通过内置的 FIFO队列 来完成资源获取线程的排队工作，</span>并发包的作者（`Doug Lea`）期望它能够成为实现大部分同步需求的基础。

同步器的主要使用方式是__继承__，子类通过继承同步器并实现它的抽象方法来管理同步状态，在抽象方法的实现过程中免不了要对同步状态进行更改，这时就需要使用同步器提供的3个方法（getState()、setState(int newState)和compareAndSetState(int expect,int update)）来进行操作，因为它们能够保证状态的改变是安全的。子类推荐被定义为自定义同步组件的静态内部类，同步器自身没有实现任何同步接口，它仅仅是定义了若干同步状态获取和释放的方法来供自定义同步组件使用，同步器既可以支持独占式地获取同步状态，也可以支持共享式地获取同步状态，这样就可以方便实现不同类型的同步组件（ReentrantLock、ReentrantReadWriteLock和CountDownLatch等）。

## AQS 接口与示例

同步器的设计是基于模板方法模式的，也就是说，使用者需要继承同步器并重写指定的方法，随后将同步器组合在自定义同步组件的实现中，并调用同步器提供的模板方法，而这些模板方法将会调用使用者重写的方法。

重写同步器指定的方法时，需要使用同步器提供的如下3个方法来访问或修改同步状态。

- `getState()`：获取当前同步状态。
- `setState(int newState)`：设置当前同步状态。
- `compareAndSetState(int expect,int update)`：使用CAS设置当前状态，该方法能够保证状态设置的原子性。

__同步器可重写的方法与描述__

| 方法名称                                    | 描述                                                         |
| ------------------------------------------- | ------------------------------------------------------------ |
| protected boolean tryAcquire(int arg)       | 独占式回去同步状态，实现该方法需要查询当前状态并判断同步状态是否符合预期，然后再进行CAS设置同步状态 |
| protected boolean tryRelease(int arg)       | 独占式释放同步状态，等待获取同步状态的线程将有机会获取同步状态 |
| protected int tryAcquireShared(int arg)     | 共享式获取同步状态，反悔哦大于等于0的值，标识获取成功，反之，获取失败 |
| protected boolean tryReleaseShared(int arg) | 共享式释放同步状态                                           |
| protected boolean isHeldExclusive()         | 当前同步器是否在独占模式下被线程占用，一般该方法表示是否被当前线程所独占 |

实现自定义同步组件时，将会调用同步器提供的模板方法。同步器提供的模板方法基本上分为3类：独占式获取与释放同步状态、共享式获取与释放同步状态和查询同步队列中的等待线程情况。自定义同步组件将使用同步器提供的模板方法来实现自己的同步语义。

__使用示例__

```java
class Mutex implements Lock {
    // 静态内部类，自定义同步器
    private static class Sync extends AbstractQueuedSynchronizer {
            // 是否处于占用状态
            protected boolean isHeldExclusively() {
                    return getState() == 1;
            }
            // 当状态为0的时候获取锁
            public boolean tryAcquire(int acquires) {
                    if (compareAndSetState(0, 1)) {
    setExclusiveOwnerThread(Thread.currentThread());
                            return true;
                    }
                    return false;
            }
            // 释放锁，将状态设置为0
            protected boolean tryRelease(int releases) {
                    if (getState() == 0) throw new 
                    IllegalMonitorStateException();
                    setExclusiveOwnerThread(null);
                    setState(0);
                    return true;
            }
            // 返回一个Condition，每个condition都包含了一个condition队列
            Condition newCondition() { return new ConditionObject(); }
    }
    // 仅需要将操作代理到Sync上即可
    private final Sync sync = new Sync();
    public void lock() { sync.acquire(1); }
    public boolean tryLock() { return sync.tryAcquire(1); }
    public void unlock() { sync.release(1); }
    public Condition newCondition() { return sync.newCondition(); }
    public boolean isLocked() { return sync.isHeldExclusively(); }
    public boolean hasQueuedThreads() { return sync.hasQueuedThreads(); }
    public void lockInterruptibly() throws InterruptedException {
            sync.acquireInterruptibly(1);
    }
    public boolean tryLock(long timeout, TimeUnit unit) throws InterruptedException {
            return sync.tryAcquireNanos(1, unit.toNanos(timeout));
    }
}
```

上述示例中，独占锁Mutex是一个自定义同步组件，它在同一时刻只允许一个线程占有锁。Mutex中定义了一个静态内部类，该内部类继承了同步器并实现了独占式获取和释放同步状态。在tryAcquire(int acquires)方法中，如果经过CAS设置成功（同步状态设置为1），则代表获取了同步状态，而在tryRelease(int releases)方法中只是将同步状态重置为0。用户使用Mutex时并不会直接和内部同步器的实现打交道，而是调用Mutex提供的方法，在Mutex的实现中，以获取锁的lock()方法为例，只需要在方法实现中调用同步器的模板方法acquire(int args)即可，当前线程调用该方法获取同步状态失败后会被加入到同步队列中等待，这样就大大降低了实现一个可靠自定义同步组件的门槛。

## 总结

AQS是Java并发包中提供的一种基础框架，可以帮助我们实现自定义的同步器。内部采用双向阻塞队列的方式，可以避免大量线程同时竞争锁所带来的性能问题。AQS支持可重入锁机制，可以避免死锁等问题。通过掌握AQS的设计思想和使用方法，我们可以更好地理解Java并发编程的核心概念和实践原则。
