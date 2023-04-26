---
title: HashMap - put()
tags:
  - Java
  - HashMap
categories:
  - Java
  - Java 基础
  - HashMap
abbrlink: 80dd519a
date: 2020-05-11 21:38:19
banner:
---

在 Java 8 中，HashMap 是一种常见的数据结构，用于存储键值对。put() 方法是其中最常用且最重要的方法之一。本文将详细介绍 Java 8 HashMap 的 put() 方法。

## HashMap 概述

HashMap 是一种基于哈希表实现的 Map 接口，使用键值对（key-value）的方式进行存储。HashMap 的 key 和 value 都可以为 null，但是同一个 key 只能映射到一个 value 上。HashMap 是非线程安全的，不支持并发访问，需要进行同步处理。

## put() 方法

put() 方法用于将指定的键值对添加到 HashMap 中。语法如下：

```java
V put(K key, V value)
```

其中，K 表示 key 的类型，V 表示 value 的类型。

### 实现原理

Java 8 中的 HashMap 底层实现采用数组 + 链表/红黑树的方式实现。当向 HashMap 中添加元素时，会首先根据 key 的 hash 值确定该元素在数组中的位置，并将其添加到对应位置上。如果该位置已经有元素了，则会以链表或红黑树的形式将其连接起来。

在 HashMap 中，每个位置上存储的是一个 Node 对象，包含 key、value 和指向下一个 Node 对象的指针。如果某个位置上的元素过多，就会将其转化成红黑树，以提高查询效率。

### put() 方法的实现

下面是 HashMap 中 put() 方法的源代码：

```java
final V putVal(int hash, K key, V value, boolean onlyIfAbsent, boolean evict) {
    Node<K,V>[] tab;          // 定义 Node 数组
    Node<K,V> p;              // 定义 Node 变量
    int n, i;                 // 定义 table 长度变量及索引变量
    // 如果 table 数组为空，则调用 resize() 方法进行数组初始化
    if ((tab = table) == null || (n = tab.length) == 0)
        n = (tab = resize()).length;
    // 计算当前键值对的哈希值在 table 数组中的索引位置
    if ((p = tab[i = (n - 1) & hash]) == null)
        // 如果计算得到的索引位置为 null，则新建节点并插入该位置
        tab[i] = newNode(hash, key, value, null);
    else {
        Node<K,V> e; K k;
        // 如果当前索引位置存在元素，则判断元素类型是否为树节点类型
        if (p.hash == hash &&
            ((k = p.key) == key || (key != null && key.equals(k))))
            e = p;
        else if (p instanceof TreeNode)
            // 如果当前节点类型为树节点，则在树节点上执行插入操作
            e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
        else {
            // 否则按链表方式进行插入操作
            for (int binCount = 0; ; ++binCount) {
                if ((e = p.next) == null) {
                    // 如果当前节点的下一个节点为 null，则新建节点并插入到链表尾部
                    p.next = newNode(hash, key, value, null);
                    // 如果链表长度大于等于树化阈值，则执行树化操作
                    if (binCount >= TREEIFY_THRESHOLD - 1)
                        treeifyBin(tab, hash);
                    break;
                }
                // 否则继续遍历链表查找是否存在相同键的节点
                if (e.hash == hash &&
                    ((k = e.key) == key || (key != null && key.equals(k))))
                    break;
                p = e;
            }
        }
        // 如果找到了相同键的节点，则更新该节点的值
        if (e != null) { 
            V oldValue = e.value;
            if (!onlyIfAbsent || oldValue == null)
                e.value = value;
            afterNodeAccess(e);
            return oldValue;
        }
    }
    // 更新 modCount 并检查是否需要扩容
    ++modCount;
    if (++size > threshold)
        resize();
    afterNodeInsertion(evict);
    return null;
}
```

该方法的实现非常复杂，但是可以大致分为三个步骤：

1. 首先根据 key 的 hash 值确定该元素在数组中的位置。
2. 如果该位置为空，则直接将其添加到对应位置上；如果该位置已经有元素了，则需要进行链表或红黑树的操作。
3. 最后更新 HashMap 的 size 和 modCount 属性，并调用 afterNodeInsertion() 方法完成插入操作。

## 总结

总体来说，Java 8 中 HashMap 的 `put()` 方法依然采用了 拉链法 解决哈希冲突的问题，但是通过提高阈值和优化树化过程，它有着更好的性能表现。
