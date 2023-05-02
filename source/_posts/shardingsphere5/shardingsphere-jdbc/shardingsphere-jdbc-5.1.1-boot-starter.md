---
title: Springboot2.7集成ShardingSphereJdbc5.1.1
tags:
  - ShardingSphere
  - Springboot
categories:
  - ShardingSphere
  - ShardingSphereJdbc
abbrlink: db89d0f7
date: 2022-06-02 20:19:15
banner:
---

ShardingSphere是一个开源的分布式数据库中间件，它支持多种关系型数据库，例如MySQL、Oracle、SQL Server等。在本篇博客中，将介绍如何使用Spring Boot 2.7集成ShardingSphere-jdbc5.1.1，并提供相应的配置文件和Java代码演示。

## 环境准备

- JDK 1.8+
- Maven
- MySQL数据库
- Springboot 2.7.4
- ShardingSphere-Jdbc-5.1.1

## 添加依赖

在pom.xml文件中添加以下依赖：

```xml
<dependency>
    <groupId>org.apache.shardingsphere</groupId>
    <artifactId>shardingsphere-jdbc-core-spring-boot-starter</artifactId>
    <version>5.1.1</version>
</dependency>
```

## 配置数据源和分片规则

在application.yml文件中添加以下配置：

```yaml
spring:
  shardingsphere:
    mode:
      # 内存模式
      type: Memory
    props:
      # 打印SQl
      sql-show: true
    datasource:
      names: ds0,ds1
      ds0:
        type: com.zaxxer.hikari.HikariDataSource
        driver-class-name: com.mysql.jdbc.Driver
        jdbc-url: jdbc:mysql://localhost:3306/ds0
        username: root
        password: root
      ds1:
        type: com.zaxxer.hikari.HikariDataSource
        driver-class-name: com.mysql.jdbc.Driver
        jdbc-url: jdbc:mysql://localhost:3306/ds1
        username: root
        password: root
    rules:
      sharding:
        tables:
          t_user:
            actual-data-nodes: ds$->{0..1}.t_user$->{0..1}
            # 主键生成策略
            key-generate-strategy:
              # 分布式序列列名称
              column: id
              # 分布式序列算法名称
              key-generator-name: alg_snowflake
            # 分库策略
            database-strategy:
              standard:
                # 分片算法名称
                sharding-algorithm-name: alg_inline_userid
                # 分片列名称
                sharding-column: id
            # 分表策略
            table-strategy:
              standard:
                # 分片算法名称
                sharding-algorithm-name: alg_hash_mod
                # 分片列名称
                sharding-column: id
        # 分片算法配置
        sharding-algorithms:
          # 行表达式分片算法
          alg_inline_userid:
            props:
              # 分片算法属性配置
              algorithm-expression: ds$->{id % 2}
            # 分片算法类型
            type: INLINE
          alg_mod:
            props:
              # 分片算法属性配置
              sharding-count: 2
            # 取模分片算法
            type: MOD
          alg_hash_mod:
            props:
              # 分片算法属性配置
              sharding-count: 2
            # 分片算法类型
            type: HASH_MOD
        key-generators:
          # 分布式序列算法配置
          alg_snowflake:
            # 分布式序列算法类型
            type: SNOWFLAKE
```

这里我们配置了两个数据源（ds0和ds1），并且对user表进行了分片，根据id字段对表进行水平分割。具体细节可以参考[官方文档](https://shardingsphere.apache.org/document/5.1.1/cn/user-manual/shardingsphere-jdbc/)。

## Java代码演示

在代码中注入ShardingSphere数据源，在使用的时候直接使用即可，和平常的数据源在使用上并无两样。例如 JdbcTemplate：

```java
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void addUser(User user) {
        String sql = "INSERT INTO user(name, age) VALUES(?, ?)";
        Object[] params = new Object[]{user.getName(), user.getAge()};
        jdbcTemplate.update(sql, params);
    }

    @Override
    public List<User> getAllUsers() {
        String sql = "SELECT id, name, age FROM user";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(User.class));
    }

    @Override
    public User getUserById(Long id) {
        String sql = "SELECT id, name, age FROM user WHERE id=?";
        Object[] params = new Object[]{id};
        try {
            return jdbcTemplate.queryForObject(sql, params, new BeanPropertyRowMapper<>(User.class));
        } catch (EmptyResultDataAccessException ex) {
            return null;
        }
    }

    @Override
    public void deleteUserById(Long id) {
        String sql = "DELETE FROM user WHERE id=?";
        Object[] params = new Object[]{id};
        jdbcTemplate.update(sql, params);
    }

}
```

{% notel yellow 在与`Springboot3+`整合时注意 %}

1. 我用Springboot3 在和 5.1.1版本整合时出现了数据源注入失败的问题，经过断点调试发现Springboot3在启动时没有加载shardingSphere5.1.1的自动装配类`ShardingSphereAutoConfiguration`，所以要在Springboot启动类上加上`ShardingSphereAutoConfiguration`的路径，以便Springboot3启动时加载。如：

```java
@SpringBootApplication(scanBasePackages = {
        "love.heer.example.shardingspherejdbc",
        "org.apache.shardingsphere"  // ShardingSphereAutoConfiguration 的源路径
})
public class ShardingSphereJdbcDemoApp {

    public static void main(String[] args) {
        SpringApplication.run(ShardingSphereJdbcDemoApp.class, args);
    }

}
```

2. Springboot 3+ 最佳整合方式，还是使用最新版本的ShardingSphere来进行整合，新版本的整合方法也进行了调整，详情可见[官方文档](https://shardingsphere.apache.org/document/current/cn/quick-start/shardingsphere-jdbc-quick-start/)。

{% endnotel %}

## 总结

在本篇博客中，介绍了如何使用Spring Boot 2.7集成ShardingSphere-jdbc5.1.1，并提供了相应的配置文件和Java代码演示，__配置文件比较重要，配置对应的属性时要细心点__。ShardingSphere是一个非常强大的分布式数据库中间件，可以帮助我们处理高并发的数据访问问题。