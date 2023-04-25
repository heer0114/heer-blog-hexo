---
title: Java17环境配置- MacOS
tags:
   - Java
   - Java 环境配置
categories:
   - Java
   - Java 基础
   - Java 环境
abbrlink: '21377094'
date: 2021-04-20 19:32:10
banner: 'java17-env-macos.svg'
---

[^_^]: #('我是注释')

`Java 17`是一种新版本的Java开发环境，使用`Java 17`进行程序开发时需要在计算机上安装`Java 17`环境。本文将介绍如何在`MacOS`中配置`Java 17`环境。

## MacOS系统中配置Java 17环境：

### 1. 下载Java 17安装包。

在[Oracle官网](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)上下载`Java 17`
的安装包，选择与MacOS系统相应的版本。

### 2. 安装`Java 17`。

双击下载好的`Java 17`安装包，按照步骤进行安装即可。

### 3. 配置环境变量。

{% tabs First unique 01 %}

<!-- tab macOS 10.15+（zsh） -->

1. 打开<i class="fa-solid fa-rectangle-terminal"></i>`Terminal`（中文叫`终端`）应用程序。

2. 在命令行输入以下命令，编辑`~/.zshrc`文件：

   ```shell
   nano ~/.zshrc 
   ```

3. 在文件的最后，加入如下信息

   ```shell
   export PATH="/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home/bin:$PATH"
   ```

4. 按下“Ctrl+X”键，选择“Y”保存文件并按“Enter”键退出编辑。

5. 执行以下命令让修改后的环境变量生效：

   ```shell
   source ~/.zshrc
   ```

6. 验证Java 17是否配置成功。

   ```shell
   java -version
   
   java version "17.0.1" 2021-01-17 LTS
   Java(TM) SE Runtime Environment (build 17.0.1+9-LTS-190)
   Java HotSpot(TM) 64-Bit Server VM (build 17.0.1+9-LTS-190, mixed mode, sharing)
   ```

<!-- endtab -->

<!-- tab macOS 10.15之前（bash） -->

1. 打开<i class="fa-solid fa-rectangle-terminal"></i>`Terminal`（中文叫`终端`）应用程序。

2. 在命令行输入以下命令，编辑`~/.bash_profile`文件：

   ```shell
   nano ~/.bash_profile
   ```

3. 在文件的最后，加入如下信息

   ```shell
   export PATH="/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home/bin:$PATH"
   ```

4. 按下“Ctrl+X”键，选择“Y”保存文件并按“Enter”键退出编辑。

5. 执行以下命令让修改后的环境变量生效：

   ```shell
   source ~/.bash_profile
   ```

6. 验证Java 17是否配置成功。

   ```shell
   java -version
   
   java version "17.0.1" 2021-01-17 LTS
   Java(TM) SE Runtime Environment (build 17.0.1+9-LTS-190)
   Java HotSpot(TM) 64-Bit Server VM (build 17.0.1+9-LTS-190, mixed mode, sharing)
   ```

<!-- endtab -->


{% endtabs %}

### 4. 配置完成

经过上诉步骤操作完成后，我们就可以子啊本地计算机进行Java程序的开发了。
