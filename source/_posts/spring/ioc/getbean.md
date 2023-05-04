---
title: 获取 Bean
tags:
  - Spring
  - IOC
categories:
  - Spring
  - 基础知识
  - IOC
abbrlink: 34c58368
date: 2020-08-10 19:12:10
banner:
---

Spring是一款常用的Java开源框架，提供了强大的依赖注入功能。在Spring应用程序中，属性注入是最常见的特性之一。本篇博文将展示Spring5中五种常见的属性注入方式，包括`@Autowired`、`@Resource`、`@Inject`、`构造器注入`和`Setter方法注入`，并对其进行比较和介绍推荐的使用方式。

## @Autowired

`@Autowired`是Spring中最常用的自动装配注解。通过`@Autowired`注解，可以自动将一个bean注入到另一个bean中。它支持基于类型和名称两种自动装配方式。

### 基于类型的自动装配

当需要自动将一个bean注入到另一个bean时，Spring会自动扫描容器中所有注册的bean，并根据类型来匹配需要注入的bean。如果有且只有一个bean匹配，则将该bean注入到需要的位置。

```java
@Component
public class UserServiceImpl implements UserService {
    ...
}

@Component
public class UserController {
    @Autowired
    private UserService userService;
}
```

在上面的例子中，`UserController`中的`userService`字段会自动注入`UserServiceImpl`的实例。

### 基于名称的自动装配

当容器中存在多个符合条件的bean时，需要指定要注入的bean的名称。可以在`@Autowired`注解上使用`@Qualifier`注解指定需要注入的bean的名称。

```java
@Component
public class UserServiceImpl1 implements UserService {
    ...
}

@Component
public class UserServiceImpl2 implements UserService {
    ...
}

@Component
public class UserController {
    @Autowired
    @Qualifier("userServiceImpl1")
    private UserService userService;
}
```

在上面的例子中，`UserController`中的`userService`字段将会自动注入名称为"userServiceImpl1"的bean。

### 构造器注入

构造器注入是一种更加推荐的属性注入方式。通过构造器注入，可以保证依赖项在对象创建时就已经被注入进来了，并且使得对象不可变，从而提高代码的可测试性和可维护性。同时也避免了循环依赖问题。

```java
@Component
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
}
```

在上面的例子中，`userService`依赖项通过构造函数进行注入，确保了用户控制器实例创建时依赖项已经被注入成功。

### Setter方法注入

Setter方法注入是一种比较老旧的属性注入方式。虽然它提供了灵活的注入方式，但是Setter方法注入容易造成循环依赖问题，降低代码可测试性和可维护性。

```java
@Component
public class UserController {
    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }
}
```

在上面的例子中，`userService`依赖项通过Setter方法进行注入，这种方式可以使用`@Autowired`注解指定自动注入的bean。

## @Resource

`@Resource`是J2EE的一个标准注解，也可以用于属性注入。和`@Autowired`一样，它支持基于类型和名称两种自动装配方式。但是，它不支持`required`属性，所以无法指定是否必须注入。

```java
@Component
public class UserController {
    @Resource(name = "userServiceImpl1")
    private UserService userService;

    @Resource
    private UserDao userDao;
}
```

在上面的例子中，`userService`字段将会自动注入名称为"userServiceImpl1"的bean，`userDao`字段将会自动注入类型为`UserDao`的bean。

## @Inject

`@Inject`是JSR-330中定义的一种注解，也可以用于属性注入。它和`@Autowired`的使用方式类似，但在功能上略有不同。它不支持`required`属性，但可以使用`@Nullable`或`@NotNull`注解来指定是否允许注入null值。

```java
@Component
public class UserController {
    @Inject
    private UserService userService;

    @Inject
    @NotNull
    private UserDao userDao;
}
```

在上面的例子中，`userService`字段将会自动注入类型为`UserService`的bean，而`userDao`字段必须被注入，且不允许为null。

## 推荐的使用方式

从可读性、可维护性和可测试性的角度出发，推荐使用构造器注入的方式进行属性注入。通过构造器注入，可以确保依赖项在对象创建时就已经被注入进来了，并且使得对象不可变，从而提高代码的可测试性和可维护性。同时也避免了循环依赖问题。

```java
@Component
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
}
```

在上面的例子中，`userService`依赖项通过构造函数进行注入，确保了用户控制器实例创建时依赖项已经被注入成功。如果必须要使用Setter方法进行属性注入，可以将构造函数和Setter方法结合起来实现。

```java
@Component
public class UserController {
    private UserService userService;

    public UserController() {}

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }
}
```

## 结论

以上就是Spring5中常见的属性注入方式：`@Autowired`、`@Resource`、`@Inject`、构造器注入和Setter方法注入。它们都可以自动装配bean，并提供了不同的特性和功能，开发者可以根据自己的需求和偏好选择适合自己的方式来进行属性注入。从可读性、可维护性和可测试性的角度出发，推荐使用构造器注入的方式进行属性注入。
