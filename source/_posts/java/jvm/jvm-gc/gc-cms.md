---
title: CMS 垃圾回收器
tags:
  - Java
  - JVM
  - GC
categories:
  - JVM
  - GC
abbrlink: d20aa128
date: 2020-06-08 22:15:05
banner:
---

CMS 的全称为 Concurrent Mark Sweep（并发标记清除），是 `JDK1.5` 版本之后内置的一种垃圾回收器。与其他垃圾回收器不同，CMS 的目标是实现最短的GC停顿时间，即使在大型堆内存的情况下也能保证应用的响应速度和性能。

{% notel yellow 注意 %}

随着JDK版本的不断升级，从JDK 9开始，CMS收集器已经被标记为“即将被弃用”（Deprecated），而在JDK 14中彻底被删除。原因是CMS收集器存在以下问题：

1. 空间碎片：由于CMS收集器只能对老年代进行回收，所以会产生大量的空间碎片。这会导致后续的内存分配操作变得困难，甚至可能出现 OutOfMemoryError 错误。
2. CPU占用：由于CMS收集器需要与应用程序线程并发工作，所以会占用一些CPU资源，影响应用程序的性能。
3. 内存泄漏：如果CMS收集器无法回收所有的垃圾，就会导致内存泄漏。

因此，[`G1收集器`](/posts/bc8ac7bc/)逐渐成为了JDK的默认垃圾收集器。G1收集器采用分代回收的思想，可以更好地处理大量对象的分配和释放，避免了CMS收集器的一些缺点。

{% endnotel %}

## 区域划分

在进行垃圾回收时，它将<span style="border-bottom:2px solid yellow">堆内存</span>划分为多个区域，在不影响应用程序执行的情况下进行垃圾回收。

![cms memory](cmsmemory.webp)

{% notel green 堆内存的区域划分 %}

- `新生代`：包括Eden区和两个Survivor区（From Space和To Space）。当新对象被创建时，它们会首先被分配到Eden区。当Eden区满时，会触发Minor GC。在Minor GC过程中，Eden区和Survivor区中的存活对象会被复制到另一个Survivor区中，并经过一系列复制和清理操作后，存活的对象会被复制到另一个Survivor区中。每次Minor GC后，From Space和To Space会互换角色。（Eden 区 和 两个 Survivor区的大小比例：8:1:1，可以使用 `-XX:SurvivorRatio` 惊醒调整，默认值为 8）
- `老年代`：存放长时间存活的对象。当Old区满时，会触发Full GC。Full GC会暂停整个JVM，对全局进行垃圾回收。由于Full GC需要暂停整个JVM，因此CMS垃圾回收器总是尽可能地减少Full GC的发生次数。

{% endnotel %}

## 工作原理

CMS垃圾回收器采用了“标记-清除”算法，其主要过程如下：

![cms](https://icefrozen.github.io/article/java-cms-gc/1552636737931java-cms-gc_.png)

1. `初始标记`：暂停所有应用线程，必须短暂暂停以达到[安全点](/posts/5a9ba959/)；标记出所有根对象以及直接与其相关的对象；
2. `并发标记`：恢复所有应用线程，同时并发地遍历老年代中的所有对象进行标记；
3. `重新标记`：暂停所有应用线程，必须短暂暂停以达到[安全点](/posts/5a9ba959/)；处理并发标记期间因用户程序继续执行而被遗漏的新生代对象；
4. `并发清除`：同时清除标记完成的所有不再使用的对象。

## 优缺点

{% notel green 优点 %}

1. 垃圾回收期间最大程度上减少了应用程序的停顿时间；
2. 适用于大型堆内存的JVM，CMS在回收大对象时非常高效；
3. 消耗的CPU资源较少；

{% endnotel %}

{% notel red 缺点 %}

1. 运作过程中需要占用一定的内存空间以记录清除信息；
2. 在进行并发标记和清除的过程中，由于用户线程和垃圾回收线程交错执行，所以会对CPU产生一定压力；
3. 整个运作过程相对复杂，实现难度较大。

{% endnotel %}

## 使用建议

1. 应用程序必须运行在64位的JVM上；
2. 不推荐将老年代的内存分配过小，否则可能频繁触发Full GC；
3. 避免在快照时间段内生成大量的对象，否则可能导致CMS无法顺利完成垃圾回收操作。