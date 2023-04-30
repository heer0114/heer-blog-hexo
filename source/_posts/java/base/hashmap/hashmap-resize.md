---
title: HashMap - resize()
tags:
  - Java
  - HashMap
categories:
  - Java
  - Java 基础
  - HashMap
abbrlink: 80dd519a
date: 2020-05-11 21:00:46
banner: java8-hashmap-resize.svg
---

在 Java 中，HashMap 是一个非常重要的集合类，它采用哈希表来存储键值对。当数据量变大时，需要调整哈希表的大小，以保证更好的性能和空间使用。resize() 方法就是 HashMap 进行扩容或缩减容量的方法。

## 什么情况下需要 resize() 方法

当 HashMap 存储的数据超过了负载因子乘以当前容量时（即元素个数 > 负载因子 * 容量），就需要进行 resize 操作。负载因子通常为 0.75，在之前的 JDK 版本中是默认值为 0.75，JDK 1.8 开始可以自定义负载因子。

resize 操作的目的是为了让 HashMap 在扩容或缩减容量后仍然能保持较低的查找和插入成本。如果 HashMap 中的键值对数量过多，则会导致哈希冲突概率增加，从而影响 HashMap 的性能。如果数量太少，则会造成空间浪费。

## 实现原理

HashMap 的 resize() 方法的实现原理涉及到两个主要步骤：

1. 创建新的数组并重新分配元素：首先根据新的容量创建一个新的数组，然后遍历原来的数组，并将所有元素重新分配到新数组中。
2. 调整哈希值：重新分配元素时，需要调整每个键值对的哈希值。这是因为在 Java 中，哈希值是由对象的 hashCode() 方法计算出来的。而当数组大小改变时，hashCode() 值需要重新计算。

具体实现过程可以通过以下源码逐行解释：

```java
final Node<K,V>[] resize() {
    Node<K,V>[] oldTab = table; // 保存原数组

    int oldCap = (oldTab == null) ? 0 : oldTab.length; // 计算原数组长度
    int oldThr = threshold; // 计算原阈值
    int newCap, newThr = 0;

    if (oldCap > 0) { // 如果原数组不为空，则进行扩容操作
        if (oldCap >= MAXIMUM_CAPACITY) { // 判断原数组是否达到最大容量
            threshold = Integer.MAX_VALUE;
            return oldTab;
        }
        else if ((newCap = oldCap << 1) < MAXIMUM_CAPACITY && oldCap >= DEFAULT_INITIAL_CAPACITY)
            newThr = oldThr << 1; // 扩容后新的阈值
    }
    else if (oldThr > 0) // 如果原阈值大于0，则使用该值作为初始容量
        newCap = oldThr;
    else { // 如果没有指定初始容量或阈值，默认使用默认值
        newCap = DEFAULT_INITIAL_CAPACITY;
        newThr = (int)(DEFAULT_LOAD_FACTOR * DEFAULT_INITIAL_CAPACITY);
    }

    if (newThr == 0) { // 如果 newThr 没有被初始化，则根据新的容量和负载因子计算新的阈值
        float ft = (float)newCap * loadFactor;
        newThr = (newCap < MAXIMUM_CAPACITY && ft < (float)MAXIMUM_CAPACITY ?
                  (int)ft : Integer.MAX_VALUE);
    }

    threshold = newThr; // 更新 HashMap 的阈值

    @SuppressWarnings({"rawtypes","unchecked"})
        Node<K,V>[] newTab = (Node<K,V>[])new Node[newCap]; // 创建新数组
    table = newTab; // 将 table 指向新数组

    if (oldTab != null) { // 如果原数组不为空，则遍历原数组并将所有元素重新分配到新数组中
        for (int j = 0; j < oldCap; ++j) {
            Node<K,V> e;
            if ((e = oldTab[j]) != null) {
                oldTab[j] = null; // 释放原有元素的引用
                if (e.next == null) // 处理链表节点
                    newTab[e.hash & (newCap - 1)] = e;
                else if (e instanceof TreeNode) // 处理红黑树节点
                    ((TreeNode<K,V>)e).split(this, newTab, j, oldCap);
                else { // 处理链表节点
                    Node<K,V> loHead = null, loTail = null;
                    Node<K,V> hiHead = null, hiTail = null;
                    Node<K,V> next;
                    do {
                        next = e.next;
                        if ((e.hash & oldCap) == 0) { // 判断元素是否需要放置到新数组的低位
                            if (loTail == null)
                                loHead = e;
                            else
                                loTail.next = e;
                            loTail = e;
                        }
                        else { // 放置到新数组的高位
                            if (hiTail == null)
                                hiHead = e;
                            else
                                hiTail.next = e;
                            hiTail = e;
                        }
                    } while ((e = next) != null);

                    if (loTail != null) { // 将低位链表放到对应位置
                        loTail.next = null;
                        newTab[j] = loHead;
                    }
                    if (hiTail != null) { // 将高位链表放到对应位置
                        hiTail.next = null;
                        newTab[j + oldCap] = hiHead;
                    }
                }
            }
        }
    }
    return newTab; // 返回新数组
}
```

## resize() 方法的时间复杂度

resize 操作需要遍历整个数组，并将元素重新分配到新数组中。因此，时间复杂度为 O(n)，其中 n 是 HashMap 中键值对的数量。

## 总结

HashMap 的 resize() 方法是用来扩容或者缩减 HashMap 容量的方法。它通过重新分配元素和调整哈希值来实现。当 HashMap 中的键值对数量超过负载因子乘以当前容量时，就需要进行 resize 操作。为了保证 HashMap 的性能和空间利用率，我们可以通过调整负载因子和初始容量来优化 HashMap 的 resize 操作。
