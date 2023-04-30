---
title: HashMap - hash()
tags:
  - Java
  - HashMap
categories:
  - Java
  - Java 基础
  - HashMap
abbrlink: c0f9b6a9
date: 2020-05-11 20:10:08
banner: java8-hashmap-hash.svg
---

在Java编程中，HashMap是一个重要的数据结构，它可以方便地存储和访问键值对。其中，hash()方法是HashMap实现中的关键部分之一。在本篇博文中，我们将对Java8中的HashMap hash()方法进行解析。

## Hash()方法概述

在Java8中，HashMap的核心代码位于java.util.HashMap类中，其中hash()方法被定义为：

```java
final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
```

从上面的代码可以看出，hash()方法主要完成两个操作：

1. 计算键的哈希码（通过调用key.hashCode()方法）。
2. 对哈希码进行微调，以保证分布均匀。

接下来，我们将逐个分析这些操作。

### 计算键的哈希码

在Java中，Object类包含hashCode()方法，该方法返回对象的哈希码。因此，在HashMap中，我们可以轻松地使用key.hashCode()方法计算键的哈希码。

然而，如果键是null，则需要特殊处理。在这种情况下，HashMap会将哈希码设置为0。

```java
(key == null) ? 0 : (h = key.hashCode())
```

### 微调哈希码

第二个操作是对哈希码进行微调。 虽然key.hashCode()方法产生的哈希值很好，但它可能不适合HashMap中的所有情况。例如，在哈希表中使用的桶数为2的幂时，最低位可能会被过于频繁地使用，这可能会导致性能问题。

因此，HashMap使用了以下技巧对哈希码进行微调：

```java
(h = key.hashCode()) ^ (h >>> 16);
```

其中，"^"运算符表示按位异或操作。这个操作将哈希码的高16位与低16位混合在一起。这有助于减少哈希码中的碰撞，并增加桶的数量。

{% notel green ”^“相较于”&“、”|“计算Hash值的优点 %}

1. 高效性：异或操作比位与或位或操作更快，因为它不需要检查每个位的值。
2. 混淆性：通过将哈希码的高位和低位进行异或，可以使得哈希码的各个部分都对最终的哈希值产生影响。这有助于减少哈希冲突，提高HashMap的性能。
3. 均匀性：异或操作可以保持哈希码的均匀性，这是在HashMap中实现高效散列的关键。

{% endnotel %}

## 总结

HashMap是Java编程中重要的数据结构之一。其核心代码包括hash()方法，它通过计算键的哈希码并对其进行微调来保证分布均匀。具体而言，hash()方法首先调用key.hashCode()方法计算哈希码，然后使用异或运算符对其进行微调。使用这些技术，HashMap可以高效地存储和快速访问键值对。
