---
title: JVM - 自定义类加载器
tags:
  - JVM
  - 类加载器
categories:
  - JVM
  - 类加载
abbrlink: f5831f17
date: 2020-06-13 18:56:29
banner:
---

在Java中，每个类都被分配一个唯一的类加载器来加载它们。默认情况下，Java使用三个类加载器：引导类加载器、扩展类加载器和系统类加载器。这些类加载器可以处理大多数情况，但有时需要自定义类加载器来加载某些特定的类或资源。本文将介绍如何使用自定义类加载器在运行时加载类。

## 获取Class对象

首先，我们需要获取要加载的类的Class对象。这可以通过调用ClassLoader的`defineClass`方法来完成。以下是一个简单的获取Class对象的示例代码：

```java
public class MyClassLoader extends ClassLoader {
    public Class<?> getClass(String name, byte[] bytes) {
        return defineClass(name, bytes, 0, bytes.length);
    }
}
```

上述代码中的`getClass`方法接收两个参数：要加载的类的名称和类字节码数组。然后，该方法调用`defineClass`方法来创建并返回与给定字节数组相关联的Class对象。

## 自定义类加载器

### 实现自己的类加载器

接下来，我们需要实现自定义类加载器。以下是一个简单的自定义类加载器的实现：

```java
public class MyClassLoader extends ClassLoader {
    private String path;

    public MyClassLoader(String path) {
        this.path = path;
    }

    @Override
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        try {
            byte[] bytes = loadClassData(name);
            return defineClass(name, bytes, 0, bytes.length);
        } catch (IOException e) {
            throw new ClassNotFoundException("Class " + name + " not found.", e);
        }
    }

    private byte[] loadClassData(String name) throws IOException {
        InputStream stream = getClass().getClassLoader().getResourceAsStream(path + name.replace(".", "/") + ".class");
        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        int data = stream.read();

        while (data != -1) {
            buffer.write(data);
            data = stream.read();
        }

        stream.close();
        return buffer.toByteArray();
    }
}
```

上述代码中的自定义类加载器使用了一个路径来指定要加载的类的位置。在`findClass`方法中，它首先调用`loadClassData`方法来从文件系统中读取类字节码。然后，它将该字节数组传递给`defineClass`方法来创建并返回与给定字节数组相关联的Class对象。

### 使用自定义的类加载器

以下是使用我们自定义的类加载器的示例代码：

```java
public class Main {
    public static void main(String[] args) throws Exception {
        MyClassLoader loader = new MyClassLoader("/path/to/classes/");
        Class<?> clazz = loader.loadClass("com.example.MyClass");
        Object object = clazz.getDeclaredConstructor().newInstance();
        Method method = clazz.getMethod("hello");
        method.invoke(object);
    }
}

public class MyClass {
    public void hello() {
        System.out.println("Hello, world!");
    }
}
```

上述代码中的`Main`类演示了如何使用自定义类加载器在运行时加载类。首先，它创建一个MyClassLoader对象，并使用该对象来加载名为`com.example.MyClass`的类。然后，它使用反射机制调用`hello`方法，从而在控制台上输出一条消息。

## 总结

通过自定义类加载器，我们可以在运行时加载特定的类或资源。在这个过程中，自定义类加载器会从指定的位置加载字节码，并使用`defineClass`方法创建Class对象。这种能力可以被用于实现动态加载、模块化和插件系统等高级功能。但是，需要注意的是，自定义类加载器可能会对Java程序的安全性和稳定性产生影响，因此需要谨慎使用。
