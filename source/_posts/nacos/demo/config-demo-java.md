---
title: Nacos 作为配置中心 - Java
tags:
  - Nacos
categories:
  - Nacos
  - 使用示例
abbrlink: 7ce5f9de
date: 2021-11-05 22:16:05
banner:
---

本文将介绍如何在Java项目中使用Nacos作为配置中心，进行动态配置管理。在此前提下，我们需要先安装Nacos Server，可参考官方文档 [Quick Start](https://nacos.io/zh-cn/docs/quick-start.html)。

## 依赖导入

{% note info %}

参考[官方文档 Java SDK](https://nacos.io/zh-cn/docs/v2/guide/user/sdk.html)

{% endnote %}

首先，我们需要引入Nacos的Java SDK库，这里以Maven为例：

```xml
<dependency>
    <groupId>com.alibaba.nacos</groupId>
    <artifactId>nacos-client</artifactId>
    <version>${nacos.sdk.version}</version>
</dependency>
```

其中，`${nacos.sdk.version}`代表版本号，可以根据实际情况进行配置。

## 连接到Nacos

使用Nacos作为配置中心，需要先连接到Nacos Server，我们可以通过以下代码来连接：

```java
public class NacosConnectDemo {
    
    public static void main(String[] args) throws NacosException {
        // Nacos Server地址
        String serverAddr = "localhost:8848"
        // 创建配置服务客户端对象
        NacosConfigService configService = new NacosConfigService(serverAddr);
    }
}
```

上述代码中，我们创建了一个`NacosConfigService`对象，用于连接到指定的Nacos Server地址。

## 获取配置信息

在连接到Nacos Server后，我们就可以获取配置信息。对于Java来说，我们可以使用以下代码来获取配置信息：

```java
public class NacosConfigDemo {

    public static void main(String[] args) throws NacosException {
        // Nacos Server地址
        String serverAddr = "localhost:8848";
        // 配置命名空间
        String namespace = "test_namespace";
        // 配置分组
        String group = "test_group";
        // 配置项名称
        String dataId = "test_config";
        
        // 创建配置服务客户端对象
        ConfigService configService = new NacosConfigService(serverAddr);
        // 获取配置信息
        String content = configService.getConfig(dataId, group, 5000);
        
        System.out.println(content);
    }
}
```

上述代码中，我们创建了一个`ConfigService`对象，用于获取指定的配置信息。其中，我们需要指定配置命名空间、配置分组以及配置项名称等信息。

## 监听配置变更

在获取到配置信息后，我们可以通过以下代码来监听配置变更：

```java
public class NacosConfigListenerDemo {

    public static void main(String[] args) throws NacosException {
        // Nacos Server地址
        String serverAddr = "localhost:8848";
        // 配置命名空间
        String namespace = "test_namespace";
        // 配置分组
        String group = "test_group";
        // 配置项名称
        String dataId = "test_config";
        
        // 创建配置服务客户端对象
        ConfigService configService = new NacosConfigService(serverAddr);
        // 添加监听器
        configService.addListener(dataId, group, new Listener() {
            @Override
            public void receiveConfigInfo(String configInfo) {
                System.out.println(configInfo);
            }

            @Override
            public Executor getExecutor() {
                return null;
            }
        });
    }
}
```

上述代码中，我们添加了一个配置信息变更的监听器，当Nacos Server中的对应配置发生变更时，会自动触发该监听器。

## 更新配置信息

在获取到配置信息后，我们可以通过以下代码来更新配置信息：

```java
public class NacosUpdateConfigDemo {

    public static void main(String[] args) throws NacosException {
        // Nacos Server地址
        String serverAddr = "localhost:8848";
        // 配置命名空间
        String namespace = "test_namespace";
        // 配置分组
        String group = "test_group";
        // 配置项名称
        String dataId = "test_config";
        // 新的配置内容
        String content = "new config content";
        
        // 创建配置服务客户端对象
        ConfigService configService = new NacosConfigService(serverAddr);
        // 更新配置
        boolean isPublished = configService.publishConfig(dataId, group, content);
        
        System.out.println(isPublished ? "更新配置成功" : "更新配置失败");
    }
}
```

上述代码中，我们使用`publishConfig`方法来更新指定的配置信息。

## 删除配置信息

在获取到配置信息后，我们也可以通过以下代码来删除配置信息：

```java
public class NacosDeleteConfigDemo {

    public static void main(String[] args) throws NacosException {
        // Nacos Server地址
        String serverAddr = "localhost:8848";
        // 配置命名空间
        String namespace = "test_namespace";
        // 配置分组
        String group = "test_group";
        // 配置项名称
        String dataId = "test_config";
        
        // 创建配置服务客户端对象
        ConfigService configService = new NacosConfigService(serverAddr);
        // 删除配置
        boolean isDeleted = configService.removeConfig(dataId, group);
        
        System.out.println(isDeleted ? "删除配置成功" : "删除配置失败");
    }
}
```

上述代码中，我们使用`removeConfig`方法来删除指定的配置信息。

## 总结

Nacos 作为配置中心具有诸多优势，能够帮助开发者实现动态配置管理，在分布式环境中提供高可用性和容错性，并且支持多种数据格式和服务注册与发现。
