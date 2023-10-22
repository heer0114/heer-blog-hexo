---
title: DDD 分层架构
tags:
  - DDD
categories:
  - DDD
  - 基础原理
abbrlink: 29d01c
date: 2021-04-06 22:01:15
banner:
---

DDD 分层架构是一种以领域驱动设计（DDD）为基础的软件架构设计方法，通过将系统按照职责进行分层，将业务逻辑从技术细节中解耦出来，实现了代码的易维护、易测试和易扩展。

## DDD 分层架构

`DDD 分层架构`是一种组织代码的方式，通过将代码分为不同的层次来实现解耦合。一般而言，分层架构包括以下几个层次：

![DDD 分层架构](ddd-ach.png)

{% notel green DDD分层架构 %}

- 表示层：负责与用户进行交互，并将请求转发给下一层
- 应用层：负责协调各个领域对象完成具体的业务功能
- 领域层：负责定义业务领域中的概念和规则，是整个应用程序的核心
- 基础设施层：提供访问外部资源（数据库、网络等）的能力，同时也负责存储领域对象

{% endnotel %}

## DDD 分层架构的优势

### 易于维护

DDD 分层架构将系统按照职责进行分层，每一层都有自己的职责，这样就使得系统易于维护。因为每一层都是独立的，所以修改其中一个层次不会对其他层次造成影响。

### 易于测试

由于每一层职责的清晰划分，测试也相对容易实现。例如，在领域层中实现业务逻辑，并编写单元测试来验证其正确性。

### 易于扩展

由于 DDD 分层架构的松耦合特性，增加新功能或者更改已有功能时，只需要修改相关的层次即可，而不会对整个系统造成影响。这也为系统未来的扩展提供了便利。

## DDD 分层架构的实现

### 一级代码目录

微服务一级目录是按照<span style="border-bottom: 2px solid green">DDD分层架构的分层职责</span>来定义的。 整体的目录结构如下：

```java
├── src
│   ├── main
│   │   ├── java
│   │   │   ├── love
│   │   │   │   ├── heer
│   │   │   │   │   ├── application // 应用层
│   │   │   │   │   ├── domain // 领域层
│   │   │   │   │   ├── infrastructure // 基础层
│   │   │   │   │   └── interfaces // 表现层
│   │   │   └── resources
│   │   ├── resources
│   │   └── webapp
│   └── test
│       ├── java
│       │   └── com
│       │       └── example
│       └── resources

```

在微服务代码模型里，我们分别定义了用户接口层、应用层、领域层和基础层四层，并分别为它们建立了interfaces、application、domain和infrastructure四个一级代码目录，如图所示。

![DDD 分层01](ddd-java-ach01.webp)

{% notel green 这些代码目录的职能 %}

- `interfaces（用户接口层）`：它主要存放用户接口层与前端应用交互、数据转换和交互相关的代码。前端应用通过这一层的接口，从应用服务获取前端展现所需的数据。处理前端用户发送的REStful请求，解析用户输入的配置文件，并将数据传递给application层。数据的组装、数据传输格式转换以及facade接口封装等代码都会放在这一层目录里。 
- `application（应用层）`：它主要存放与应用层服务组合和编排相关的代码。应用服务向下基于微服务内的领域服务或外部微服务的应用服务，完成服务的组合和编排，向上为用户接口层提供各种应用数据支持服务。应用服务和事件等代码会放在这一层目录里。 
- `domain（领域层）`：它主要存放与领域层核心业务逻辑相关的代码。领域层可以包含多个聚合代码包，它们共同实现领域模型的核心业务逻辑。聚合内的聚合根以及实体、方法、值对象、领域服务和事件等相关代码会放在这一层目录里。
- `infrastructure（基础层）`：它主要存放与基础资源服务相关的代码。为其他各层提供的通用技术能力、三方软件包、数据库服务、配置和基础资源服务的代码都会放在这一层目录里。

{% endnotel %}
### 各层代码目录

下面我们一起来看一下用户接口层、应用层、领域层以及基础层各自的二级代码目录结构。

#### 用户接口层

`interfaces` 目录下的代码目录结构有assembler、dto和facade三类，如图所示。

![interface](ddd-java-ach02.webp)

- `assembler`：实现DTO与DO领域对象之间的相互转换和数据交换。一般来说，assembler与dto总是同时出现。 
- `dto`：它是前端应用数据传输的载体，不实现任何业务逻辑。我们可以面向前端应用将应用层或领域层的DO对象转换为前端需要的DTO对象，从而隐藏领域模型内部领域对象DO；也可以将前端传入的DTO对象转换为应用服务或领域服务所需要的DO对象。 
- `facade`：封装应用服务，提供较粗粒度的调用接口，或者将用户请求委派给一个或多个应用服务进行处理。

#### 应用层

`application` 的代码目录结构有 event 和 service 以及 dto，如图所示。

![application](ddd-java-ach03.webp)

- `event（事件）`：这层目录主要存放事件相关的代码。它包括两个子目录：publish和subscribe。前者主要存放事件发布相关代码，后者主要存放事件订阅相关代码。事件处理相关的核心业务逻辑在领域层实现。 
   应用层和领域层都可以进行事件发布。为了实现事件订阅的统一管理，建议你将微服务内所有事件订阅的相关代码都统一放到应用层。事件处理相关的核心业务逻辑实现可以放在领域层。通过应用层调用领域层服务，来实现完整的事件订阅处理流程。 
- `service（应用服务）`：这层的服务是应用服务。应用服务会对多个领域服务或其他微服务的应用服务进行封装、编排和组合，对外提供粗粒度的服务。你可以为每个聚合的应用服务设计一个应用服务类。 
- 另外，在进行跨微服务调用时，部分 DO 对象需要转换成 DTO，所以应用层可能也会有用户接口层的 assembler 和 dto 对象。这时，你可以根据需要增加 assembler 和 dto 代码目录结构。

{% notel yellow 注意 %}

<i class="fa-duotone fa-triangle-exclamation"></i> 对于多表关联的复杂查询，由于这种复杂查询不需要有领域逻辑和业务规则约束，因此不建议将这类复杂查询放在领域层的领域模型中。你可以通过应用层的应用服务采用传统多表关联的SQL查询方式，也可以采用CQRS读写分离的方式完成数据查询操作。

{% endnotel %}

#### 领域层

`domain` 下的目录结构是由一个或多个独立的聚合目录构成，每一个聚合是一个独立的业务功能单元，多个聚合共同实现领域模型的核心业务逻辑。 

聚合内的代码模型是标准且统一的，它一般包括entity、event、repository和service四个子目录，如图所示。 

![domain](ddd-java-ach04.webp)

- `aggr（聚合）`：它是聚合目录的根目录，你可以根据实际项目的聚合名称来命名，比如将聚合命名为“Person”。 

  聚合内实现高内聚的核心领域逻辑，聚合可以独立拆分为微服务，也可以根据领域模型的演变，在不同的微服务之间进行聚合代码重组。 

  将聚合所有的代码放在一个目录里的主要目的，不仅是为了业务的高内聚，也是为了未来微服务之间聚合代码重组的便利性。有了清晰的聚合代码边界，你就可以轻松地实现以聚合为单位的微服务拆分和重组。 

  聚合之间的松耦合设计和清晰的代码边界，在微服务架构演进中具有非常重要的价值。 

  聚合内可以定义聚合根、实体和值对象以及领域服务等领域对象，一般包括以下目录结构。 

- `entity（实体）`：它存放聚合根、实体和值对象等相关代码。实体类中除了业务属性，还有业务行为，也就是实体类中的方法。如果聚合内部实体或值对象比较多，你还可以再增加一级子目录加以区分。

- `event（事件）`：它存放事件实体以及与事件活动相关的业务逻辑代码。

- `service（领域服务）`：它存放领域服务、工厂服务等相关代码。一个领域服务是由多个实体组合出来的一段业务逻辑。你可以将聚合内所有领域服务都放在一个领域服务类中。如果有些领域服务的业务逻辑相对复杂，你也可以将一个领域服务设计为一个领域服务类，避免将所有领域服务代码都放在一个领域服务类中而出现代码臃肿的问题。领域服务可以封装多个实体或方法供上层应用服务调用。

- `repository（仓储）`：它存放仓储服务相关的代码。仓储模式通常包括仓储接口和仓储实现服务。它们一起完成聚合内DO领域对象的持久化，或基于聚合根ID查询，完成聚合内实体和值对象等DO领域对象的数据初始化。另外，仓储目录还会有持久化对象PO，以及持久化实现逻辑相关代码，如DAO等。在仓储设计时有一个重要原则，就是一个聚合只能有一个仓储。

#### 基础层

`infrastructure` 的代码目录结构有config和util两个子目录，如图所示。

![infrastructure](ddd-java-ach05.webp)

- `config`：主要存放配置相关代码。 
-  `util`：主要存放平台、开发框架、消息、数据库、缓存、文件、总线、网关、第三方类库和通用算法等基础代码。 

{% notel green 说明 %}

可以为不同的资源类别建立不同的子目录。如 Redis、MySQL、MQ 等。

{% endnotel %}

## 总结

DDD 分层架构是一种以 DDD 为基础的软件架构设计，将系统按照职责进行分层，以实现易于维护、易于测试和易于扩展的特性。其实现需要对领域模型进行设计、编写应用服务、实现基础设施，并采用松散耦合的方式进行分层架构之间的通信。DDD 分层架构是一种优秀的软件架构设计方法，可以帮助开发者更好地处理业务逻辑，提高代码的可维护性和可扩展性。