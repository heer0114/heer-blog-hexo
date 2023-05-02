---
title: Nacos 服务注册中心-Springcloud
tags:
  - Nacos
categories:
  - Nacos
  - 使用示例
abbrlink: e4410d9d
date: 2021-11-07 22:07:18
banner:
---

[Nacos](https://nacos.io/) 是一个开源的动态服务发现、配置管理和服务管理平台。在这篇博文中，使用 Nacos 作为 Spring Boot 的注册中心，并通过 Java 示例来演示。

## 准备工作

在开始之前，需要完成以下准备工作：

1. 安装并启动 Nacos Server。
2. 创建一个 Spring Boot 项目。
3. 添加必要的依赖：`spring-cloud-starter-alibaba-nacos-discovery`。

## 添加依赖

在 `pom.xml` 中添加以下依赖：

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
    <version>${nacos.version}</version>
</dependency>
```

## 配置服务

在 `application.yml` 中添加以下配置：

```yaml
server:
  port: 8080 # 应用程序端口

spring:
  application:
    name: demo # 应用名称

  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848 # Nacos Server 地址
```

这段代码配置了应用程序的端口和名称，并将 Nacos Server 的地址设置为服务发现的地址。

## 注册服务

创建一个 `DemoApplication`，并添加以下代码：

```java
@SpringBootApplication
@EnableDiscoveryClient // 开启服务注册和发现功能
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

}
```

这段代码使用 `@EnableDiscoveryClient` 注解开启服务注册和发现功能。

## 发布服务

创建一个 `DemoController`，并添加以下代码：

```java
@RestController
public class DemoController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello, world!";
    }
    
}
```

这段代码创建了一个 `/hello` 端点，并返回 "Hello, world!"。

## 运行应用程序

现在，我们可以运行 Spring Boot 应用程序，并访问 `/hello` 端点。如果一切顺利，您将看到以下输出：

```html
Hello, world!
```

## 查看注册中心

在 `Nacos 控制台`的服务列表中，您应该会看到一个名为 `demo` 的服务已经成功注册。

## 总结

在本文中，我们学习了如何使用 Nacos 作为 Spring Boot 的注册中心，并通过 Java 示例来演示。希望这篇文章对您有所帮助！
