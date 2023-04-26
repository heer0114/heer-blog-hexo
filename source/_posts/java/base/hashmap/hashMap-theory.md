---
title: HashMap - 基本原理
tags:
  - Java
  - HashMap
categories:
  - Java
  - Java 基础
  - HashMap
banner: java8-hashmap-title.svg
abbrlink: fcb831a5
date: 2020-05-10 20:32:10
---

HashMap是Java中最常用的数据结构之一，它将键映射到值，允许我们通过Key来快速检索和获取Value。在Java 8中，HashMap进行了一些优化和改进，以提高性能和减少冲突。本文将介绍Java8 HashMap的基本原理和实现方式。

{% note yellow %}

本文将介绍Java8 HashMap的基本原理，不会对 HashMap 中的方法进行解读，对于其核心的方法解读会单开炉灶

{% endnote %}

## 基本原理

在Java8中，HashMap使用数组和链表（或红黑树）实现。当一个元素被添加到HashMap中时，它首先根据Key的hashcode计算出一个桶号，并将其放入相应的桶中。如果该桶中已经存在其他元素，则需要比较它们的Key是否相等。如果Key相等，则直接替换Value；否则，将该元素添加到链表（或红黑树）的末尾。

当HashMap的大小超过某个阈值（load factor）时，它会自动扩容。扩容涉及将所有的元素重新散列到一个新的、更大的桶中。这个操作代价很高，因此应该尽可能地避免频繁地扩容HashMap。

## 实现方式

在Java8中，HashMap的内部实现有以下重要组件：

- 数组：HashMap使用一个Node类型的数组来存储元素。
- 链表：当多个元素映射到同一个桶时，它们将被链接成一个链表。链表上的节点类型是Node。
- 红黑树：当一个桶中的元素数量超过8个时，HashMap会将链表转换为红黑树，以提高性能。此时链表上的节点类型是TreeNode。

下面我们来看一下Java8 HashMap的核心代码：

```java
public class HashMap<K,V> extends AbstractMap<K,V>
    implements Map<K,V>, Cloneable, Serializable {

    // 初始大小 16
    static final int DEFAULT_INITIAL_CAPACITY = 1 << 4; // aka 16
    // 扩容的加载因子 0.75
    static final float DEFAULT_LOAD_FACTOR = 0.75f;
    // 转化为红黑树的阈值 8
    static final int TREEIFY_THRESHOLD = 8;
    // 退化为链表的阈值 6
    static final int UNTREEIFY_THRESHOLD = 6;
    // 转化为红黑树的另一个条件，Hash表的大小阈值 64
    static final int MIN_TREEIFY_CAPACITY = 64;

    transient Node<K,V>[] table;

    transient Set<Map.Entry<K,V>> entrySet;

    transient int size;

    int threshold;

    final float loadFactor;

    public HashMap(int initialCapacity, float loadFactor) {
        //...
    }

    public V put(K key, V value) {
        //...
    }

    //...
}
```

在上面的代码中，我们可以看到几个重要的组件，包括数组 `table`、阈值 `threshold`、负载因子 `loadFactor`、链表和红黑树转换的阈值等。此外，还有一些常见的方法，例如put()、get()和resize()等方法。

## 总结

Java8的HashMap是一种高效的数据结构，它使用数组和链表（或红黑树）实现，并具有自动扩容和哈希冲突解决等功能。HashMap的内部实现涉及到许多细节和优化，需要理解其基本原理和实现方式才能更好地使用它。掌握Java8 HashMap的基本原理和使用方法，可以使我们更加高效和便捷地处理键值对数据。
