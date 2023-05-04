---
title: Spring 中的钩子接口
tags:
  - Spring
categories:
  - Spring
  - 基础知识
  - 钩子接口
abbrlink: 25e11da7
date: 2020-08-15 21:09:07
banner:
---

> 在Spring框架中，有许多钩子接口可以让我们在Spring容器的生命周期中添加自定义行为和逻辑。

## 有哪些接口？

{% notel green 常用的钩子接口 %}

1. `BeanFactoryPostProcessor`: 实现此接口的类可以修改容器中的BeanDefinition元数据，在Bean实例化之前对其进行修改或添加属性。例如，可以通过该接口将配置文件中的占位符解析为真实的值。
2. `BeanPostProcessor`: 实现此接口的类可以在每个Bean实例创建后和使用前在其上执行定制化处理。它们可以拦截Bean的创建过程，并返回一个代理对象，以便将其他行为织入到Bean的生命周期中。
3. `ApplicationContextAware`: 实现此接口的类可以获得正在运行的ApplicationContext实例的引用。这使它们可以与容器交互，例如，查找另一个bean并直接调用其方法。
4. `InitializingBean`: 实现此接口的类可以在Bean属性设置完毕后，执行任何初始化代码。例如，可以检查必需的属性是否已经配置。
5. `DisposableBean`: 实现此接口的bean可以在容器销毁时执行清理操作。例如，释放占用的资源或关闭数据库连接等操作。
6. `ApplicationListener`: 实现此接口的类可以监听应用程序内的事件，如ContextRefreshedEvent、ContextClosedEvent、RequestHandledEvent等。当相应事件发生时，容器将通知所有注册的ApplicationListener实例。

{% endnotel %}

这些钩子接口是Spring框架最常用和最有用的。它们可以让我们在应用程序生命周期中添加各种自定义行为和逻辑，从而使我们的应用程序更加灵活和可扩展。

## 举个栗子

### BeanFactoryPostProcessor

```java
@Component
public class CustomBeanFactoryPostProcessor implements BeanFactoryPostProcessor {
    
    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {
        // 在Bean实例化之前对其进行修改或添加属性
        BeanDefinition bd = beanFactory.getBeanDefinition("myBean");
        MutablePropertyValues mpv = bd.getPropertyValues();
        mpv.addPropertyValue("customAttribute", "customValue");
    }
}
```

在上面的示例中，我们实现了`BeanFactoryPostProcessor`接口，并重写了其中的`postProcessBeanFactory`方法。通过传入的`beanFactory`对象，我们可以修改或添加bean的元数据。例如，在这里我们获取名为"myBean"的bean定义，并向其添加一个自定义属性。

### BeanPostProcessor

```java
@Component
public class CustomBeanPostProcessor implements BeanPostProcessor {

    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        // 在Bean实例创建后和使用前在其上执行定制化处理
        if (bean instanceof MyBean) {
            ((MyBean) bean).setCustomAttribute("customValue");
        }
        return bean;
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        return bean;
    }
}
```

在这个示例中，我们实现了`BeanPostProcessor`接口，并重写了其中的`postProcessBeforeInitialization`和`postProcessAfterInitialization`方法。这个接口允许我们拦截bean的创建过程，并在其上执行自定义行为。例如，在这里，我们检查bean是否属于`MyBean`类型，如果是，则设置一个自定义属性。

### ApplicationContextAware

```java
@Component
public class CustomApplicationContextAware implements ApplicationContextAware {

    private ApplicationContext applicationContext;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        // 获取正在运行的ApplicationContext实例的引用
        this.applicationContext = applicationContext;
    }

    public void doSomething() {
        // 与容器交互，例如，查找另一个bean并直接调用其方法
        AnotherBean otherBean = applicationContext.getBean(AnotherBean.class);
        otherBean.doSomethingElse();
    }
}
```

在这个示例中，我们实现了`ApplicationContextAware`接口，并重写了其中的`setApplicationContext`方法。因此，当容器初始化时，Spring将自动调用该方法，传入对正在运行的`ApplicationContext`实例的引用。我们可以通过这个引用与容器交互，例如，查找另一个bean并调用其方法。

### InitializingBean

```java
@Component
public class CustomInitializingBean implements InitializingBean {

    private String requiredProperty;

    @Override
    public void afterPropertiesSet() throws Exception {
        // 在Bean属性设置完毕后，执行任何初始化代码
        if (requiredProperty == null) {
            throw new IllegalStateException("Required property is not set");
        }
    }

    public void setRequiredProperty(String requiredProperty) {
        this.requiredProperty = requiredProperty;
    }
}
```

在这个示例中，我们实现了`InitializingBean`接口，并重写了其中的`afterPropertiesSet`方法。当属性设置完毕后，Spring将自动调用该方法。在这里，我们检查必需的属性是否已经配置。

### DisposableBean

```
@Component
public class CustomDisposableBean implements DisposableBean {

    private Connection connection;

    @Override
    public void destroy() throws Exception {
        // 在容器销毁时执行清理操作
        if (connection != null) {
            connection.close();
        }
    }

    public void setConnection(Connection connection) {
        this.connection = connection;
    }
}
```

在这个示例中，我们实现了`DisposableBean`接口，并重写了其中的`destroy`方法。当容器销毁时，Spring将自动调用该方法。在这里，我们释放占用的资源或关闭数据库连接等操作。

### ApplicationListener

```java
@Component
public class CustomApplicationListener implements ApplicationListener<ContextRefreshedEvent> {

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
    		if (event.getApplicationContext().getParent() == null) {
            // 监听应用程序内的事件，当ContextRefreshedEvent发生时执行逻辑
        		System.out.println("Application context has been refreshed");
        }
    }
}
```

在这个示例中，我们实现了`ApplicationListener`接口，并重写了其中的`onApplicationEvent`方法。这里我们监听了`ContextRefreshedEvent`事件，在容器刷新时自动调用该方法。在这里，我们检查父容器是否为空，如果是，则输出一条日志消息。这可以防止逻辑重复执行，因为子容器也会触发该事件。

## 总结

总之，Spring框架提供了许多钩子接口，可以让我们在容器的生命周期中添加自定义行为和逻辑。每个接口都有不同的目的和用途，可以根据需要使用。
