---
title: DDD 重要概念
tags:
  - DDD
categories:
  - DDD
  - 基础原理
abbrlink: e22804d6
date: 2021-04-03 20:35:25
banner:
---

DDD（Domain Driven Design）是一种软件开发方法论，旨在将业务领域和实现方式相互融合。其核心思想是将复杂的业务领域划分成多个子域，并围绕这些子域进行系统设计和开发。采用DDD能够让开发者更好地理解业务需求，提高软件系统的可靠性和扩展性。

## DDD中的重要概念

### 领域（Domain）

领域是具有明确边界和稳定概念的业务领域，例如电商、金融、医疗等。领域定义了业务场景、业务流程和业务实体，是整个软件系统的核心。

### 子域（Subdomain）

子域是在领域内部更加细分的业务领域，每个子域都负责处理该领域内的特定问题或实体。子域应该遵循单一职责、明确边界和模块化的原则。

{% notel green 举个栗子 %}

假设我们正在开发一个电商网站，该网站包括商品管理、订单管理、用户管理等多个功能模块。为了更好地应用DDD，我们可以将系统划分成以下子域：

- 商品管理：负责处理商品的增、删、改、查等业务逻辑。该子域包括商品分类、商品属性、商品SKU等实体。
- 订单管理：负责处理订单的创建、支付、发货等业务逻辑。该子域包括订单、购物车、支付、配送等实体。
- 用户管理：负责处理用户的注册、登录、信息修改等业务逻辑。该子域包括用户、会员等实体。

每个子域都有自己的职责和边界，相互之间不产生影响。例如，商品管理子域只需要关注商品本身的业务逻辑，不需要了解订单或用户的相关信息。而订单管理子域也只需要关注订单本身的业务逻辑，不需要涉及商品或用户的处理。

通过这种方式，我们可以更好地理解电商网站中各个领域的关系和边界，从而更加有效地进行软件设计和开发。

{% endnotel %}

### 通用语言（Ubiquitous Language）

通用语言是指在整个领域和子域中使用的共同业务语言，它可以避免开发者和业务人员之间产生误解和沟通障碍，使得开发过程更加高效和准确。

{% notel green 举个栗子 %}

假设我们正在为一家电商网站设计一个订单系统。 在该系统中，有客户(Customer)、订单(Order)、商品(Product)等实体和相关业务过程。

在这个情景下，我们需要与技术团队以及业务专家讨论各种业务场景并制定正确的设计方案。 在这个过程中，我们需要确保大家都理解这些业务概念的含义，并且使用相同的术语来描述它们。

因此，我们可能会创建一个名为“订单领域”的共享文档，其中包含所有与订单相关的业务概念和术语的列表。 以下是一些例子：

- 客户（Customer）：指购买商品的人或公司。
- 订单（Order）：表示客户的购买请求。
- 商品（Product）：指在网站上出售的物品。
- 收货地址（Shipping Address）：指客户希望将商品送到哪里的地址。
- 运输方式（Shipping Method）：指用于交付商品的运输方式。
- 支付方式（Payment Method）：指客户用于支付订单的方式。

通过这种方式，我们可以确保所有团队成员对这些业务概念和术语有清晰的理解，并避免任何混淆或误解。这样，我们就可以更有效地协作，并更好地实现电商网站的业务目标。

{% endnotel %}

### 界限上下文（Bounded Context）

界限上下文是指一个子域内的一组相关概念和业务逻辑，这些概念和逻辑在该子域内具有特定含义和作用。不同的子域可以有不同的界限上下文，它们之间不会产生冲突。

{% notel green 和子域的联系 %}

可以认为，一个子域是属于一个界限上下文的一部分。在界限上下文内，我们需要考虑如何设计实体、聚合、值对象等元素，以便最好地支持该领域的业务需求。而在子域内，则需要更加专注于该子域内部的具体业务问题，例如该子域所涉及的实体和关系，以及如何将这些实体组织成一个完整的、符合业务需求的模型。

简单来说，子域是对一个业务领域进行更精细化划分的方式，而界限上下文则是将整个系统划分为不同的业务领域，并明确各个领域之间的关系的方式。两者之间密切相关，但是重点不同，因此在DDD设计中需要同时考虑两者的作用和关系。

{% endnotel %}

### 实体（Entity）

在领域驱动设计（DDD）中，实体是<span style="border-bottom:2px solid green">指具有唯一身份和生命周期的对象</span>。这些对象在业务中扮演着重要的角色，因为它们通常代表着业务中最重要的部分，并且与其他实体之间存在复杂的关系。

在DDD中，实体应该被视为业务的核心，因为它们代表了业务过程中最重要的概念。实体的属性和行为应该反映出业务中的特殊性质，并且在应用程序中应该得到恰当地表示。

与其他的设计模式类似，实体的定义可能会因为应用程序的需要而有所变化。但在大多数情况下，实体都应该具备以下特征：

- <span style="border-bottom:2px solid green">有一个唯一的标识符（ID）或者一个键（Key）。</span>
- <span style="border-bottom:2px solid green">有状态，并且这个状态可以随着时间发生改变。</span>
- <span style="border-bottom:2px solid green">具有相关联的属性和行为，这些属性和行为本身就是业务上的概念，而不是简单的getter/setter方法。</span>

总之，实体是DDD中非常重要的一个概念，对于理解业务过程和设计合适的应用程序都有着至关重要的作用。

{% notel green 举个栗子 %}

假设我们有一个电商平台的应用程序，其中有商品和订单两个概念。在这个应用程序中，商品和订单都可以被视为实体。

- 商品实体：每个商品在电商平台上都应该具备唯一的标识符（ID），例如商品编号、SKU等。商品的状态也可能随着时间而发生变化，例如库存量会因为购买而减少。除此之外，商品还具备相关联的属性和行为，例如名称、价格、描述、图片等属性以及添加到购物车、下单、发货等行为。
- 订单实体：每个订单在电商平台上也应该具备唯一的标识符（ID），例如订单编号。订单的状态也可能随着时间而发生变化，例如订单状态从待付款变成已付款、待发货、已发货等状态。除此之外，订单还具备相关联的属性和行为，例如购买的商品、总价、收货地址、支付方式等属性以及取消订单、查看物流等行为。

通过将商品和订单视为实体，我们可以更好地理解它们在业务过程中的重要性，并且能够更加清晰地设计我们的应用程序。例如，我们可以利用商品和订单的属性和行为来设计合适的数据库模型和API接口，以便于我们对它们进行增删改查和其他操作。同时，通过使用实体，我们也能够更好地理解它们之间的关系，例如订单中包含哪些商品、商品出现在了哪些订单中等等。

{% note green %}

Java 伪代码

{% endnote %}

```java
// 定义商品实体类
public class Product {
    private Long id; // 商品ID
    private String name; // 商品名称
    private BigDecimal price; // 商品价格
    private Integer stock; // 库存数量

    public Product(Long id, String name, BigDecimal price, Integer stock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    // getter和setter方法
    // ...
}

// 定义订单实体类
public class Order {
    private Long id; // 订单ID
    private BigDecimal totalAmount; // 总金额
    private String address; // 收货地址
    private String paymentMethod; // 支付方式
    private List<Product> products; // 购买的商品列表

    public Order(Long id, BigDecimal totalAmount, String address, String paymentMethod, List<Product> products) {
        this.id = id;
        this.totalAmount = totalAmount;
        this.address = address;
        this.paymentMethod = paymentMethod;
        this.products = products;
    }

    // getter和setter方法
    // ...
}

// 使用实体进行操作的示例代码
public class Main {
    public static void main(String[] args) {
        // 创建商品实体对象并初始化
        Product product = new Product(1L, "手机", new BigDecimal("1999.99"), 100);

        // 创建订单实体对象并初始化
        Order order = new Order(1L, new BigDecimal("1999.99"), "杭州市西湖区XXX街道XXX号楼XXX室", "微信支付", Arrays.asList(product));

        // 输出订单中包含哪些商品
        System.out.println("订单中包含的商品：");
        for (Product p : order.getProducts()) {
            System.out.println(p.getName());
        }

        // 减少商品库存数量
        int quantity = 1; // 购买数量为1
        product.setStock(product.getStock() - quantity);

        // 更新订单总金额
        order.setTotalAmount(order.getTotalAmount().subtract(product.getPrice())); // 商品价格为减数

        // 输出更新后的订单信息
        System.out.println("更新后的订单信息：");
        System.out.println("订单ID：" + order.getId());
        System.out.println("总金额：" + order.getTotalAmount());
        System.out.println("收货地址：" + order.getAddress());
        System.out.println("支付方式：" + order.getPaymentMethod());
    }
}
```

{% endnotel %}



### 值对象（Value Object）

在DDD中，值对象是<span style="border-bottom: 2px solid green">指没有身份标识的对象，其主要特征是它们的属性（值）定义了它们的身份。每个值对象都具有唯一的特性，并且可以通过它们的属性进行比较和相等性检查。</span>

值对象通常用于表示概念上的事物，例如日期、时间、货币金额、颜色、邮政编码等。与实体对象不同，值对象没有单独的生命周期，它们始终依附于另一个实体或聚合根对象。

在DDD中，值对象有以下特点：

1. <span style="border-bottom: 2px solid green">无法修改</span>：值对象的属性值是不可变的，因为它们的状态定义了它们的身份。如果更改了任何属性，则将创建一个新的值对象。
2. <span style="border-bottom: 2px solid green">可以共享</span>：由于值对象是不可变的，所以它们可以在多个实体或聚合根对象之间共享。这可以提高系统的性能和可扩展性。
3. <span style="border-bottom: 2px solid green">不具有全局唯一标识符</span>：与实体对象不同，值对象没有单独的标识符，因为它们的身份由它们的属性定义。
4. <span style="border-bottom: 2px solid green">可以嵌入到实体对象或其他聚合根对象中</span>：值对象通常被嵌入到实体对象或其他聚合根对象中作为属性，从而形成复杂的对象关系。

总的来说，值对象是一个非常有用的DDD概念，它在建模复杂领域模型时可以帮助实现更好的可维护性、可测试性和可扩展性。

{% notel green 举个栗子 %}

1. 日期/时间对象：日期和时间通常被建模成值对象，因为它们的身份由它们的属性（年、月、日、小时、分钟等）定义。例如，Java中的LocalDate和LocalTime类都是值对象。

```java
LocalDate date = LocalDate.of(2022, 8, 1);
LocalTime time = LocalTime.of(12, 30);
```

2. 颜色对象：颜色也可以被建模成值对象，因为它们的身份由它们的属性（红、绿、蓝分量等）定义。例如，在CSS中，颜色可以用RGB值表示：

```css
color: rgb(255, 0, 0); /* 红色 */
```

3. 地址对象：地址通常被建模成值对象，因为它们的身份由它们的属性（街道、城市、州、邮政编码等）定义。例如，在Java中，可以创建一个Address值对象：

```java
public class Address {
    private String street;
    private String city;
    private String state;
    private String zipCode;

    // 构造函数、访问器等省略
}
```

1. 货币金额对象：货币金额也可以被建模成值对象，因为它们的身份由它们的数值和货币类型定义。例如，在Java中，可以创建一个Money值对象：

```java
public class Money {
    private BigDecimal amount;
    private Currency currency;

    // 构造函数、访问器等省略
}
```

这些值对象都有一个共同的特点，即它们没有单独的身份标识符，而是通过它们的属性来定义它们的身份。可以在实体对象或聚合根对象中使用这些值对象作为属性，从而形成复杂的对象关系。

{% endnotel %}

### 聚合（Aggregate）

聚合是一组相关实体和值对象的集合，它们共同构成一个有意义的整体。聚合定义了实体之间的关系和交互，同时也限制了对实体的访问方式。它旨在使设计更加灵活和可扩展，同时确保数据完整性。

聚合通常由一个根实体和其他实体组成。根实体是聚合的核心，它承担了维护聚合内一致性的责任。其他实体则依赖于根实体，不能独立存在。

聚合的重要特征是边界。聚合定义了一些规则和约束，用于限制实体之间的交互和访问。这有助于减少复杂性，并确保系统的行为符合预期。聚合还可以帮助明确业务规则和业务过程，促进团队理解和协作。

{% notel green 举个栗子 %}

```java
public class Order {
    private int orderId;
    private Customer customer;
    private List<Product> products;

    // 构造函数等定义

    // 聚合规则方法，确保订单只能对应一个客户
    public void setCustomer(Customer customer) {
        if (this.customer != null && !this.customer.equals(customer)) {
            throw new IllegalArgumentException("Order cannot belong to multiple customers.");
        }
        this.customer = customer;
    }

    // 聚合规则方法，确保订单只包含特定类型的产品
    public void addProduct(Product product) {
        if (!product.getType().equals(ProductType.BOOK)) {
            throw new IllegalArgumentException("Only books can be added to an order.");
        }
        this.products.add(product);
    }

    // 聚合规则方法，确保每个产品都有有效的库存
    public boolean checkInventory() {
        for (Product product : this.products) {
            if (product.getStock() < 1) {
                return false;
            }
        }
        return true;
    }
}
```

在上述的示例中，我们定义了一个名为 `Order` 的聚合类。它由订单和产品实体组成，其中订单实体是根实体，而产品实体是子实体。

在 `Order` 类中，我们还定义了多个聚合规则方法。例如，`setCustomer` 方法确保每个订单只能对应一个客户；`addProduct` 方法确保每个订单只能包含特定类型的产品，比如书；`checkInventory` 方法确保每个产品都有有效的库存。

通过使用聚合模式，我们可以将逻辑上相关的实体组织到一个单独的单元中，并定义了一些规则和约束，以确保数据完整性和业务一致性。这有助于提高代码的可维护性和可扩展性，同时还可以避免复杂性和混乱。

{% endnotel %}

### 聚合根（Aggregate Root）

在领域驱动设计（DDD）中，聚合根（Aggregate Root）是<span style="border-bottom: 2px solid green">指一个聚合内的根实体，它是整个聚合的入口和出口。</span>聚合指一组具有内在联系、共同变化的关联对象的集合。在设计中，聚合根是不可分割的整体，其负责保证聚合内的一致性和完整性。

在 DDD 中，每个聚合都必须拥有一个唯一标识符，而聚合根是该聚合的唯一公开接口。这意味着所有对聚合内对象的访问必须通过聚合根来进行，聚合内的其他对象不应该暴露给外部。聚合根还应该封装聚合内的业务规则，确保聚合内的对象不会被直接修改或删除，只能通过聚合根提供的方法来进行操作。

一个好的聚合根设计可以带来多方面的好处。首先，它能够简化系统架构和设计，降低复杂度，使得代码更易于维护和扩展。其次，通过聚合根的封装，我们可以很好地控制聚合内对象的生命周期和状态，在保证数据一致性的前提下提高了并发处理的效率。最后，聚合根还可以帮助我们更好地理解和定义业务概念，提高系统的可理解性和可维护性。

{% notel green 举个栗子 %}

```java
public class Order implements Serializable {
    private Long id;
    private List<OrderItem> items;

    // 构造函数，必须传入 ID，并且初始化 items 列表
    public Order(Long id) {
        this.id = id;
        this.items = new ArrayList<>();
    }

    // 添加订单项
    public void addItem(OrderItem item) {
        this.items.add(item);
    }

    // 获取订单总价
    public BigDecimal getTotalPrice() {
        BigDecimal totalPrice = BigDecimal.ZERO;

        for (OrderItem item : this.items) {
            totalPrice = totalPrice.add(item.getPrice());
        }

        return totalPrice;
    }

    // 获取订单中指定商品的数量
    public int getItemQuantity(String productId) {
        int quantity = 0;

        for (OrderItem item : this.items) {
            if (item.getProductId().equals(productId)) {
                quantity += item.getQuantity();
            }
        }

        return quantity;
    }

    // 修改订单中指定商品的数量
    public void setItemQuantity(String productId, int quantity) {
        for (OrderItem item : this.items) {
            if (item.getProductId().equals(productId)) {
                item.setQuantity(quantity);
                break;
            }
        }
    }
}

```

在这个例子中，`Order` 是一个聚合根，表示一个订单。它包含了多个 `OrderItem` 对象，表示订单中的每一项商品。`Order` 类提供了添加、获取、修改订单项的方法，以及获取订单总价的方法。注意到这里的 `Order` 类<span style="border-bottom: 2px solid green">不仅封装了聚合内的实体对象，还包含了这些对象之间的业务规则，确保了聚合的一致性和完整性。</span>

{% endnotel %}

### 领域事件（Domain Event）

领域事件（Domain Events）是<span style="border-bottom: 2px solid green">对领域中发生的某些状态变化进行的记录，它们通常会被发送到其他子域或模块中。领域事件可以帮助我们更好地处理系统中复杂的业务逻辑和数据流转。</span>

领域事件通常表示一个关键的业务场景，它能够跨越多个领域实体和聚合根（Aggregate Root），并且可以被其他领域对象所使用。通过捕获领域事件，可以帮助我们更好地理解业务流程和规则，并为系统的开发提供指导方向。

在DDD中，领域事件需要满足以下几个特点：

- 事件必须是业务领域内的概念，而不仅仅是技术上的东西；
- 事件必须是离散化的、可观察的、可重现的；
- 事件必须是幂等的，即同样的事件只会被处理一次；
- 事件应该被保存下来以备日后使用或回溯。

{% notel green 举个栗子 %}

{% notel green 领域事件的实现方式 %}

单体应用内可以使用 Spring 事件机制、或者使用第三方的事件驱动类、或者自己实现一个事件总线......

在分布的系统中可以使用 MQ、Redis等作为事件的实现方式，完成领域事件的发布和监听

{% endnotel %}

{% note green %} 

我这里写个简单的栗子，就使用 Spring 事件机制实现领域事件：

{% endnote %}

1. 定义领域事件

   ```java
   public class OrderCreatedEvent {
       private String orderId;
   
       public OrderCreatedEvent(String orderId) {
           this.orderId = orderId;
       }
   
       public String getOrderId() {
           return orderId;
       }
   }
   ```

2. 发布领域事件

   ```java
   @Service
   public class OrderService {
       @Autowired
       private ApplicationEventPublisher eventPublisher; // Spring事件发布器
   
       public void createOrder(Order order) {
           // TODO: 创建订单逻辑
           // ...
   
           // 发布领域事件
           eventPublisher.publishEvent(new OrderCreatedEvent(order.getId()));
       }
   }
   ```

3. 监听领域事件

   ```java
   @Component
   public class OrderEventListener {
       @EventListener // 声明为事件监听器
       public void handleOrderCreatedEvent(OrderCreatedEvent event) {
           // TODO: 处理订单创建事件
           String orderId = event.getOrderId();
           System.out.println("Order " + orderId + " created successfully.");
       }
   }
   ```

这里的`@EventListener`注解表示这是一个Spring事件监听器，它会自动订阅事件并在事件触发时执行`handleOrderCreatedEvent`方法。

通过以上步骤，我们就成功地使用Spring事件机制实现了领域事件的发布和监听。

{% endnotel %}

## DDD的优势

{% note green %}

采用DDD的软件开发方法可以带来以下优势：

{% endnote %}

### 更好地理解业务需求

使用DDD能够让开发者更深入地了解业务需求，从而更好地进行系统设计和开发。通过对领域和子域的划分，我们可以更清晰地描述业务场景、业务流程和业务实体，从而减少开发中的误解和风险。

### 更高的可靠性和扩展性

在DDD中，每个子域都有自己的边界和职责，相互独立且松散耦合。这种设计方式使得系统更容易维护和扩展，不会因为一个子域的变化而影响其他子域的稳定性。同时，通过领域事件的引入，我们可以更好地处理系统中复杂的业务逻辑，提高系统的可靠性和健壮性。

### 更高的代码质量和可读性

在DDD中，我们通常采用面向对象的编程思想，将领域模型映射到代码中。这种方式可以更好地表达业务语言和业务逻辑，使得代码更加贴近业务需求。同时，通过采用DDD中的聚合根、值对象等概念，我们可以更好地组织代码结构，使得代码更加清晰和易于理解。

## 总结

DDD是一种非常实用的软件开发方法，可以帮助我们更好地理解业务需求、提高系统的可靠性和扩展性，同时也能够提高代码质量和可读性。在应用DDD时，我们需要深入了解业务领域、精确划分子域、采用合适的设计模式和编程思想，并不断优化和迭代。相信通过使用DDD，我们可以更好地完成软件开发项目，提供更优秀的用户体验和商业价值。
