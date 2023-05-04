---
title: Synchronized
tags:
  - Java
  - 并发编程
categories:
  - 并发编程
abbrlink: f5dbca44
date: 2020-07-09 19:49:17
banner:
---

在多线程并发编程中`synchronized`一直是元老级角色，很多人都会称呼它为重量级锁。但是，随着 Java SE 1.6 对 synchronized 进行了各种优化之后，有些情况下它就并不那么重了。

## 实现同步基础

`Synchronized` 是 Java 中的关键字，它用于实现线程同步，确保<span style="border-bottom: 2px solid green">多个线程在访问共享资源时不会产生冲突和数据不一致的问题。</span>

当一个线程进入某个对象或方法的 synchronized 块时，它就获得了这个对象的锁，其他线程不能再进入该对象的 synchronized 块，直到该线程释放锁。这样就能保证同一时间只有一个线程访问该对象的共享资源，从而达到线程安全的目的。

### Java 中的对象都可以作为锁

> Java中的每一个对象都可以作为锁。具体表现为以下3种形式。

- 普通同步方法，锁是当前实例对象。

```java
public class MyClass {
    private int count = 0;

    public synchronized void increment() {
        // 锁是当前实例对象
        count++;
    }
}
```

在上述示例中，`increment` 方法加了 `synchronized` 关键字，所以这个方法成为了一个同步方法。由于锁是当前实例对象，因此一旦某个线程进入该方法，就会锁定当前实例对象，其他线程将无法再进入该方法，直到该线程执行完毕并释放锁。

- 静态同步方法，锁是当前类的 Class 对象。

```java
public class MyClass {
    private static int count = 0;

    public static synchronized void increment() {
        // 锁是当前类的 Class 对象
        count++;
    }
}
```

在上述示例中，`increment` 方法同样加了 `synchronized` 关键字，但是由于它是一个静态方法，因此锁是当前类的 Class 对象。一旦某个线程进入该方法，就会锁定当前类的 Class 对象，其他线程将无法进入该方法，直到该线程执行完毕并释放锁。

- 同步方法块，锁是 `Synchronized` 括号里配置的对象。

```java
public class MyClass {
    private Object lock = new Object();
    private int count = 0;

    public void increment() {
        // 锁是 Synchronized 括号里配置的对象
        synchronized (lock) {
            count++;
        }
    }
}
```

在上述示例中，`increment` 方法没有加 `synchronized` 关键字，而是使用同步代码块。这个同步代码块使用了 `Synchronized` 关键字，并在括号里配置了一个对象 `lock`。因此，锁定的是 `lock` 这个对象。只有进入该方法的线程可以获取 `lock` 对象的锁，其他线程就无法获取该锁，直到该线程执行完同步代码块并释放锁。

### Monitor

从 JVM 规范中可以看到 Synchonized 在 JVM 里的实现原理，JVM 基于进入和退出 Monitor 对象来实现方法同步和代码块同步，但两者的实现细节不一样。<span style="border-bottom: 2px solid green">代码块同步是使用 monitorenter 和 monitorexit 指令实现的，而方法同步是使用另外一种方式实现的，细节在 JVM 规范里并没有详细说明。但是，方法的同步同样可以使用这两个指令来实现。</span>

<span style="border-bottom: 2px solid green">`monitorenter` 指令是在编译后插入到同步代码块的开始位置，而 `monitorexit` 是插入到方法结束处和异常处，JVM要保证每个monitorenter 必须有对应的 monitorexit 与之配对。</span>任何对象都有一个 monitor 与之关联，当且一个 monitor 被持有后，它将处于锁定状态。线程执行到 monitorenter 指令时，将会尝试获取对象所对应的 monitor 的所有权，即尝试获得对象的锁。

### 对象头

> 当一个线程试图访问同步代码块时，它首先必须得到锁，退出或抛出异常时必须释放锁。那么锁到底存在哪里呢？锁里面会存储什么信息呢？

`synchronized` 用的锁是存在 Java对象头里的。如果对象是数组类型，则虚拟机用3个字宽（Word）存储对象头，如果对象是非数组类型，则用2字宽存储对象头。在32位虚拟机中，1字宽等于4字节，即32bit，如表所示。

|   长度   |          内容          |               说明               |
| :------: | :--------------------: | :------------------------------: |
| 32/64bit |       Mark Word        |    存储对象的hashcode或锁信息    |
| 32/64bit | Class Metadata Address |     存储到对象类型数据的指针     |
| 32/64bit |      Array length      | 数组的长度（如果当前对象是数组） |

Java 对象头里的`Mark Word`里默认存储对象的 HashCode、分代年龄和锁标记位。在运行期间，Mark Word里存储的数据会随着锁标志位的变化而变化。Mark Word可能变化为存储以下4种数据，如表所示。

<table style="text-align: center;">
	<tr>
		<td rowspan=2>锁状态</td>
		<td colspan=2>25bit</td>
		<td rowspan=2>4bit</td>
		<td>1bit</td>
		<td>2bit</td>
	</tr>
	<tr>
		<td>23bit</td>
		<td>2bit</td>
		<td>是否是偏向锁</td>
		<td>锁标志位</td>
	</tr>
	<tr>
		<td>轻量级锁</td>
		<td colspan=4 >指向栈中锁记录的指针</td>
		<td>00</td>
	</tr>
	<tr>
		<td>重量级锁</td>
		<td colspan=4 >指向互斥量（重量级锁）的指针</td>
		<td>10</td>
	</tr>
	<tr>
		<td>GC 标记</td>
		<td colspan=4 >空</td>
		<td>11</td>
	</tr>
	<tr>
		<td>偏向锁</td>
		<td>线程 ID</td>
		<td>Epoch</td>
		<td>对象分代年龄</td>
		<td>1</td>
		<td>01</td>
	</tr>
</table>

### 锁的升级

> Java SE 1.6为了减少获得锁和释放锁带来的性能消耗，引入了“偏向锁”和“轻量级锁”，在 Java SE 1.6中，锁一共有4种状态，级别从低到高依次是：无锁状态、偏向锁状态、轻量级锁状态和重量级锁状态，这几个状态会随着竞争情况逐渐升级。

#### 偏向锁

HotSpot 的作者经过研究发现，大多数情况下，锁不仅不存在多线程竞争，而且总是由同一线程多次获得，为了让线程获得锁的代价更低而引入了偏向锁。当一个线程访问同步块并获取锁时，会在对象头和栈帧中的锁记录里存储锁偏向的线程 ID，以后该线程在进入和退出同步块时不需要进行 CAS 操作来加锁和解锁，只需简单地测试一下对象头的 Mark Word 里是否存储着指向当前线程的偏向锁。如果测试成功，表示线程已经获得了锁。如果测试失败，则需要再测试一下 Mark Word 中偏向锁的标识是否设置成1（表示当前是偏向锁）：如果没有设置，则使用 CAS 竞争锁；如果设置了，则尝试使用CAS将对象头的偏向锁指向当前线程。



## 总结

Synchronized关键字是Java中一种常用的多线程并发控制机制，它可以保证对共享资源的互斥访问，并且保证操作的原子性。然而，在实际应用中，需要注意锁的粒度问题和线程间的通信问题，以避免出现死锁、活锁等常见问题。

在JDK1.5之后，Java提供了更为灵活和高效的Lock机制，它可以替代Synchronized关键字，并且提供了更多的功能和特性。因此，在实际开发中，建议优先使用Lock机制来进行多线程并发控制。

同时，在编写多线程程序时，需要遵循一定的规范和约束，例如避免在同步代码块内调用外部方法、避免在锁内等待其他线程执行等待某个条件的操作等。只有在正确使用各种多线程并发控制机制的基础上，才能写出高效、健壮的多线程程序。
