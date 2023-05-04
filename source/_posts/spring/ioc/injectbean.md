---
title: 注入 Bean
tags:
  - Spring
  - IOC
categories:
  - Spring
  - 基础知识
  - IOC
abbrlink: fb9820ae
date: 2020-08-09 22:45:40
banner:
---

在Spring框架中，Bean是指Spring容器中的一个对象。而IOC是控制反转，是Spring框架的核心；它通过将对象之间的依赖关系交给容器来管理，从而实现了对象之间的解耦。

而在Spring框架中，Bean的注入方式主要有三种：

1. XML 文件方式
2. Java 配置类方式
3. 注解方式

下面我们分别来详细介绍这三种注入方式。

### 1. XML 文件方式

在XML文件中使用 `bean` 标签定义一个Bean，并且通过 `property` 标签来设置Bean属性。如下所示：

```xml
<bean id="user" class="com.example.User">
    <property name="username" value="Tom"/>
    <property name="password" value="123456"/>
</bean>
```

上述XML配置表示将一个名为 `user` 的Bean注入到容器中，并且该Bean的类型为 `com.example.User`，同时设置了该Bean的两个属性 `username` 和 `password`。

在代码中获取该Bean时，只需要通过 `getBean` 方法即可：

```java
ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
User user = (User)context.getBean("user");
```

### 2. Java 配置类方式

{% note info%}

Springboot 主要使用的方式

{% endnote %}

在Java配置类中，使用 `@Configuration` 注解声明当前类为配置类，然后使用 `@Bean` 注解定义一个Bean，并且通过 `@Autowired` 注解来注入依赖。如下所示：

```java
@Configuration
public class AppConfig {
    @Bean
    public User user() {
        User user = new User();
        user.setUsername("Tom");
        user.setPassword("123456");
        return user;
    }
}

@Service
public class UserService {
    @Autowired
    private User user;
}
```

上述Java配置类中，定义了一个名为 `user` 的Bean，并且通过 `@Autowired` 注解将其注入到 `UserService` 中。

在代码中获取该Bean时，只需要通过 `@Autowired` 或者 `@Resource` 注解即可：

```java
@Autowired
private User user;
```

### 3. 注解方式

在Spring框架中，提供了很多注解来实现依赖注入。比如常见的 `@Autowired`、`@Resource`、`@Inject` 等注解。其中 `@Autowired` 注解是最常用的一种注解，它可以自动注入某个类型的Bean。如下所示：

```java
@Service
public class UserService {
    @Autowired
    private User user;
}
```

上述代码中，我们使用 `@Autowired` 注解来注入 `User` 类型的Bean。

除了 `@Autowired` 注解外，还有其他注解可以用来实现依赖注入，例如：`@Resource`、`@Inject` 等注解。这些注解都能够自动注入某个类型的Bean。

## 总结

以上就是Spring5 IOC Bean 注入的三种方式：XML 文件方式、Java 配置类方式以及注解方式。开发人员可以根据自己的需求来选择最合适的注入方式。
