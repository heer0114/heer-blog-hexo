---
title: Java环境配置（JDK1.8）
tags:
  - Java
  - Java 环境配置
categories:
  - Java
  - Java 基础
  - Java 环境配置
#excerpt: Java 开发环境在主流操作系统上的配置。
abbrlink: 4c8e8e1b
date: 2019-01-20 19:30:10
thumbnail:
banner:
---

Java是一种广泛使用的编程语言，在进行 Java 程序编写之前，需要在本地计算机上安装 Java 环境。不同的操作系统下 Java的安装与配置方法略有不同。本篇博客将介绍 Java 环境在 Windows、Linux、MacOS 中的配置方法。

## 1. Windows中的 Java 配置方法

### 1.1 下载 Java 开发包

在 Windows 中配置 Java 开发环境，首先需要从 Oracle 官方网站下载 Java 开发包。根据个人需求选择合适的版本，并下载安装。

### 1.2 配置环境变量

配置环境变量是为了方便直接使用 Java 命令行工具。以下是 Windows 中配置环境变量的步骤：

1. 在 Windows 工具栏中，右键“计算机”，选择“属性”；
2. 点击“高级系统设置” > “环境变量”；
3. 在“系统变量”中新增Java变量，包括JAVA_HOME，及将Java\bin的绝对路径添加到PATH变量中。

### 1.3 验证环境变量设置是否生效

在命令行输入 java –version，若显示安装版本，则说明环境变量设置成功。

## 2. Linux 中的 Java 配置方法

在 Linux 系统中配置 Java，可以通过包管理器安装，或者从 Oracle 官网下载安装包进行安装。

### 2.1 下载安装

以下是从 Oracle 官网下载安装的步骤：

1. 从 Oracle 官网下载合适的 Java 开发包，例如 jdk-8u191-linux-x64.tar.gz；
2. 解压下载的压缩包：tar -zxvf jdk-8u191-linux-x64.tar.gz；
3. 移动解压文件至指定目录，例如 /usr/local/java/jdk1.8.0_191。

### 2.2 配置环境变量

在 Linux 中配置 Java 环境变量的步骤如下：

1. 修改 /etc/profile 配置文件，并将下述配置文件加入文件末尾：
    ```
   JAVA_HOME=/usr/local/java/jdk1.8.0_191
   CLASSPATH=$JAVA_HOME/lib/
   PATH=$PATH:$JAVA_HOME/bin
   export JAVA_HOME CLASSPATH PATH
   ```
2. 让配置文件立即生效，运行 source /etc/profile 命令。

### 2.3 验证环境变量设置是否生效

在命令行输入 java -version，若输出相应的版本号，则说明环境变量设置成功。

## 3. MacOS 中的 Java 配置方法

在 MacOS 中安装 Java 开发环境，可以通过 Oracle 官网下载 dmg 安装包进行安装。

### 3.1 下载安装

从 Oracle 官网下载 dmg 安装包，双击 dmg 文件，并按照提示安装即可。

### 3.2 配置环境变量

在 MacOS 中配置环境变量的方法与 Linux 系统类似，可以通过编辑 .bash_profile 文件来设置 JAVA_HOME，CLASSPATH，PATH 等环境变量。具体步骤如下：

1. 打开一个终端窗口，输入以下命令，新建 .bash_profile 文件：

   ```shell
   vi ~/.bash_profile
   ```

2. 编辑 .bash_profile 文件，添加以下环境变量配置：

   ```
   export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_191.jdk/Contents/Home
   export PATH=$JAVA_HOME/bin:$PATH
   ```

3. 保存文件，退出终端。

### 3.3 验证环境变量设置是否生效

在命令行输入 java -version，若输出相应的版本号，则说明环境变量设置成功。

## 结论

本篇博客介绍了 Windows、Linux、MacOS 系统下 Java 环境的配置方法。通过这些配置，我们可以在本地计算机上开始进行 Java 程序的开发工作。
