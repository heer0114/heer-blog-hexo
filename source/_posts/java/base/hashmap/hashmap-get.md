---
title: HashMap - get()
tags:
  - Java
  - HashMap
categories:
  - Java
  - Java 基础
  - HashMap
abbrlink: e59e566
date: 2020-05-11 22:45:19
banner:
---

在Java编程中，HashMap是一个重要的数据结构，它可以方便地存储和访问键值对。其中，get()方法是HashMap实现中的关键部分之一。在本篇博文中，我们将对Java8中的HashMap get()方法进行详细解析，并探讨其实现原理。

## 实现原理

在Java8中，HashMap的核心代码位于java.util.HashMap类中，其中get()方法被定义为：

```java
public V get(Object key) {
    Node<K,V> e;
    // 计算键的哈希码，查找并返回与指定键关联的值。
    return (e = getNode(hash(key), key)) == null ? null : e.value;
}
```

从上面的代码可以看出，get()方法主要完成两个操作：

1. 计算键的哈希码（通过调用hash(key)方法）。
2. 查找并返回与指定键关联的值。

接下来，我们将逐个分析这些操作。

### 哈希码的计算

在Java中，Object类包含hashCode()方法，该方法返回对象的哈希码。因此，在HashMap中，我们可以轻松地使用key.hashCode()方法计算键的哈希码。[hash()](https://blog.heer.love/posts/c0f9b6a9/)方法点击跳转到隔壁。

```java
// 计算hash
final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
```

### 查找并返回值

在HashMap中，键值对存储在Node<K,V>类型的节点中。因此，查找指定键的值需要执行以下操作：

1. 根据键的哈希值找到对应的桶。
2. 遍历桶中的链表，查找具有相同键的节点。
3. 如果找到这样的节点，则返回其值。否则，返回null。

具体而言，getNode()方法完成了上述操作：

```java
final Node<K,V> getNode(int hash, Object key) {
    // 声明一个Node数组tab
    Node<K,V>[] tab;
    // 声明两个Node节点first和e
    Node<K,V> first, e; 
    // 声明一个int类型变量n，代表桶的数量
    int n; 
    // 声明一个泛型K类型变量k，代表key
    K k; 

    // 判断table不为空，n大于0，并且hash对应的桶不为空
    if ((tab = table) != null && (n = tab.length) > 0 &&
        (first = tab[(n - 1) & hash]) != null) { 
        if (first.hash == hash && // 判断第一个节点的hash值是否等于指定hash值
            ((k = first.key) == key || (key != null && key.equals(k)))) // 判断第一个节点的key是否等于指定key
            // 如果第一个节点就是要查找的节点，则直接返回该节点
            return first;

        if ((e = first.next) != null) { // 如果第一个节点的下一个节点不为空
            if (first instanceof TreeNode) // 判断该链表是否已经树化
                // 如果已经树化，则调用getTreeNode方法继续查找
                return ((TreeNode<K,V>)first).getTreeNode(hash, key); 
            do { // 否则遍历链表
                if (e.hash == hash &&
                    ((k = e.key) == key || (key != null && key.equals(k))))
                    // 如果找到了指定的节点，则直接返回
                    return e; 
            } while ((e = e.next) != null); // 遍历链表
        }
    }
    // 如果没有找到对应的节点，则返回null
    return null;
}

```

从上面的代码可以看出，getNode()方法首先通过哈希值找到对应的桶，然后遍历桶中的链表，查找与指定键关联的节点。如果找到了这样的节点，则返回其值；否则返回null。

## 性能分析

在HashMap中，get()方法是最常用的操作之一，它可以高效地访问键值对并提供快速的响应时间。具体而言，get()方法的时间复杂度为O(1)，即与HashMap中存储的元素数量无关。然而，在实际编程中，get()方法的性能可能会受到以下因素的影响：

### 哈希冲突

由于哈希表的大小是有限的，所以在不同的键上生成的哈希码可能会相同。这种情况称为哈希冲突（Hash Collision）。当发生哈希冲突时，HashMap将使用链表或红黑树等数据结构来存储具有相同哈希码的节点。因此，如果HashMap中存在大量哈希冲突，那么查找键值对的效率将会降低。

### 初始容量和加载因子

HashMap的初始容量和加载因子也会影响get()方法的性能。在创建HashMap对象时，我们需要指定其初始容量和加载因子。如果初始容量较小或加载因子较大，那么HashMap就需要频繁调整自身的大小，从而使get()方法的性能下降。

## 总结

get()方法是HashMap中最常用的方法之一。它通过计算键的哈希值和查找与指定键关联的节点来实现访问键值对。具体而言，get()方法首先调用hash(key)方法计算键的哈希码，然后使用getNode()方法在桶中查找相应的节点。如果找到了这样的节点，则返回其值；否则返回null。

在实际编程中，我们需要注意哈希冲突、初始容量和加载因子等因素，以提高get()方法的性能。同时，我们也可以考虑使用其他数据结构，例如TreeMap，来代替HashMap，从而满足不同的需求。
