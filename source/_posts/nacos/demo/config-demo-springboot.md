---
title: Nacos 作为配置中心 - springboot
tags:
  - Nacos
categories:
  - Nacos
  - 使用示例
abbrlink: 8625c51c
date: 2021-11-07 20:48:01
banner:
---

本文将介绍如何在 Springboot 项目中使用Nacos作为配置中心，进行动态配置管理。在此前提下，我们需要先安装Nacos Server，可参考官方文档 [Quick Start](https://nacos.io/zh-cn/docs/quick-start.html)。

## 准备工作

在开始之前，需要完成以下准备工作：

1. 安装并启动 Nacos Server。
2. 创建一个 Spring Boot 项目。
3. 添加必要的依赖：`spring-cloud-starter-alibaba-nacos-config`。

## 添加依赖

在 `pom.xml` 中添加以下依赖：

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
    <version>${nacos.version}</version>
</dependency>
```

## 配置文件

在 `bootstrap.yml` 中添加以下配置：

```yaml
spring:
  profiles:
    active: dev # 激活的 profile
  cloud:
    nacos:
      config:
        server-addr: localhost:8848 # Nacos Server 地址
        namespace: # 命名空间，可选
        group: DEFAULT_GROUP # 分组，默认为 DEFAULT_GROUP
        prefix: demo-config # 配置文件前缀
        file-extension: yml # 配置文件扩展名，可选

# 使用 optional 属性配置不同类型和环境的配置文件
  config:
    import:
    - optional:nacos:${spring.cloud.nacos.config.prefix}.${spring.profiles.active}.${spring.cloud.nacos.config.file-extension}
    - optional:nacos:${spring.cloud.nacos.config.prefix}.${spring.cloud.nacos.config.file-extension}
```

在这个示例中，使用 `spring.config.import` 属性的 `optional` 属性来加载不同类型和环境的配置文件（指定 nacos 的 DataId）。`${spring.cloud.nacos.config.prefix}` 表示从 Nacos 中加载的配置文件的前缀，`${spring.profiles.active}` 表示当前激活的 profile，`${spring.cloud.nacos.config.file-extension}` 表示配置文件的扩展名。

首先，它会尝试加载 `demo-config.dev.yml`，如果找不到，则尝试加载 `demo-config.yml`。

## 配置中心

在 Nacos 控制台中创建一个名为 `demo-config.yml` 和 `demo-config.dev.yml` 的配置文件，并添加以下内容：

**demo-config.yml**

```yaml
name: LoveHeer
```

**demo-config.dev.yml**

```yaml
name: dev-LoveHeer
```

## 编写代码

创建一个 `DemoController`，并添加以下代码：

```java
@RestController
public class DemoController {

    @Value("${name}")
    private String name;

    @GetMapping("/hello")
    public String hello() {
        return "Hello, " + name + "!";
    }

}
```

这段代码读取了一个名为 `name` 的配置，并将其注入到 `DemoController` 中。

{% note warning %}

如要实现动态刷新，需要在`DemoController`上添加 `@RefreshScope` 注解

{% endnote %}

## 运行应用程序

现在，我们可以运行 Spring Boot 应用程序并访问 `/hello` 端点。如果一切顺利，您将看到以下输出：

```html
Hello, dev-LoveHeer!
```

## 总结
