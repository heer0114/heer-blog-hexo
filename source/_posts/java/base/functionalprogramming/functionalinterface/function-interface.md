---
title: 函数接口
tags:
  - Java
  - Java 8
  - 函数编程
categories:
  - Java
  - Java 基础
  - 函数编程
abbrlink: a65f2ab8
date: 2021-06-20 19:10:13
banner:
---

Java 8 中引入了函数式编程的概念，其中函数接口是重要的一部分。函数接口是指只有一个抽象方法的接口，可以使用 lambda 表达式或方法引用来实现该抽象方法。在函数式编程中，函数接口通常用于表示某个操作，例如转换、过滤或消费数据等。通过将函数接口作为参数传递到方法中，可以轻松地实现这些操作。

## 函数接口是什么？

### 定义

{% note success  %}

只有一个抽象方法的接口。

{% endnote %}

### 典例

Java 中的 Runnable 接口，就是一个典型的函数接口，请看Code：

```java
@FunctionalInterface // 声明该接口是函数接口
public interface Runnable {
  // 该接口中只有一个抽象方法
  public abstract void run();
}
```

### @FunctionalInterface

@FunctionalInterface：标识一个接口为函数接口，必须满足函数接口的定义：只有一个抽象方法的接口，否则编译时会报错。

三个接口为例说明，如下：

```java
// Hello
@FunctionalInterface
public interface Hello {
  void hello();
}
// NiHao 
// ！！！错误
@FunctionalInterface 
public interface Nihao {
  void nihao();
  void shijie();
}
// Hi
@FunctionalInterface
public interface Hi {
  void hi();
  default void shijie() {} 
}
```

{% note success %}

Hello 接口和 Hi 接口都是函数接口，添加 @FunctionalInterface 注解不会报错。

{% endnote %} 

{% note danger %}

Nihao 接口不是函数接口，添加 @FunctionalInterface 注解会报错。

{% endnote %}

### 自定义函数接口

根据函数接口的定义（`只有一个抽象方法的接口`）来自定义一个函数接口 Me ：

```java
// 几行 Code 定义了一个函数接口，是不是很简单。
@FunctionalInterface
public interface Me {
  // Me 接口只有一个抽象方法 i()
  void i();
}
```

### Java 内置的函数接口

Java 8 中引入了函数式编程的概念，其中函数接口是重要的一部分。Java 8 也内置了一些函数接口，主要常用的有 `Function<T, R>`、`Predicate<T>`、`Consumer<T>`、`Supplier<T>` 这四个函数对象，此外还有一些相对用的少一点的，比如：`BiFunction<T, U, R>`、`BiPredicate<T, U>`、`BiConsumer<T, U>`、`UnaryOperator<T>`、`BinaryOperator<T>`。这些函数接口的使用，我会单独写一篇博文进行介绍的，这篇主要是了解到什么是函数接口就OK了。

## 函数接口的应用

### Lambda 表达式

`Lambda 表达式`提供了一种简洁的方式来创建函数接口的实例（实现函数接口）。Lambda 表达式可以使用函数接口来描述其参数和返回类型，并且可以通过将Lambda表达式分配给函数接口类型的变量来使用它。因此，Lambda表达式和函数接口密切相关，它们通常一起使用，以实现简洁、灵活的代码。

伪代码如下：

```java
// 函数接口 Hello
@FunctionalInterface
public interface Hello {
  void hello();
}

Hello h = () -> {};
// Lambda 表达式角度：
//   使用 Lambda 表达式来实现 Hello 接口，并创建了一个 Hello 类型的实例

// 函数接口角度：
//   使用 Hello 函数接口，描述了 Lambda 表达式
//   返回值为 void，没有入参（其实就是 hello() 方法）
```

### 方法引用

`方法引用`提供了一种更为简洁的方式来创建函数接口的实例，通过引用现有方法而不是编写 `Lambda 表达式`的方式；直接使用现有方法的名称，从而简化代码并提高可读性。

伪代码如下：

```java
// 内置函数接口 Consumer
@FunctionalInterface
public interface Consumer<T> {
  public abstract accept(T t);
}

// 使用 Lambda 表达式创建一个 Consumer 类型的实例
Consumer<String> consumer = s -> System.out.println(s);

// 使用方法引用创建一个 Consumer 类型的实例
Consumer<String> consumer = System.out::println;
```

## 总结

函数接口是 Java 8 中引入函数式编程基础中的基础，它和 Lambda 表达式和方法引用有着密不可分的关系，把这三者的关系理清并掌握后，Java的函数编程那不是小菜一碟，Stream Api 也不是什么大问题 <i class="fa-duotone fa-face-party"></i>。

