---
title: Java环境配置（JDK17+）
tags:
  - Java
  - Java 环境配置
categories:
  - Java
  - Java 基础
  - Java 环境配置
abbrlink: 4027a16b
date: 2021-04-20 19:32:10
thumbnail:
banner:
---

`Java 17`是一种新版本的Java开发环境，使用`Java 17`进行程序开发时需要在计算机上安装`Java 17`环境。本文将介绍如何在`Windows、Linux、MacOS`中配置`Java 17`环境。

## 安装配置

{% tabs First unique name %}
<!-- tab Windows -->

在Windows系统中配置Java 17环境的步骤如下：

1. 下载`Java 17安装包`。

   在[Oracle官网](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)上下载Java 17的安装包，选择与Windows系统相应的版本。

2. 安装Java 17。

   双击下载好的`Java 17安装包`，按照步骤进行安装即可（下一步...）。

3. 配置环境变量。

   (1) 右键单击“`计算机`”，选择“`属性`”，进入“`高级系统设置`”。

   (2) 点击“`环境变量`”，在“`系统变量`”一栏中选择“`Path`”，然后点击“`编辑`”。

   (3) 在弹出的窗口中，添加Java 17的`安装路径`，例如“`C:\Program Files\Java\jdk-17`”。

4. 验证Java 17是否配置成功。

   打开<i class="fa-solid fa-rectangle-terminal"></i>`命令提示符`，输入“`java -version`”命令，如果显示Java 17的版本信息，则说明配置成功。

   ```shell
   $ java -version
   
   java version "17.0.1" 2021-01-17 LTS
   Java(TM) SE Runtime Environment (build 17.0.1+9-LTS-190)
   Java HotSpot(TM) 64-Bit Server VM (build 17.0.1+9-LTS-190, mixed mode, sharing)
   ```

<!-- endtab -->

<!-- tab Linux -->

在Linux系统中配置Java 17环境的步骤如下：



1. 下载Java 17安装包。

   在[Oracle官网](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)上下载Java 17的安装包，选择与Linux系统相应的版本。

2. 安装Java 17。

   通过<i class="fa-solid fa-rectangle-terminal"></i>`终端`，进入下载好的Java 17安装包所在的目录，执行以下命令进行安装：

   ```
   tar -zxvf jdk-17_linux-x64_bin.tar.gz
   ```

3. 配置环境变量。

   (1) 在终端中编辑`/etc/profile`文件，添加如下内容：

   ```
   export JAVA_HOME=/usr/local/jdk-17
   export PATH=$PATH:$JAVA_HOME/bin
   ```

   (2) 然后执行以下命令使修改后的环境变量生效：

   ```
   source /etc/profile
   ```

4. 验证Java 17是否配置成功。

   在终端中输入“java -version”命令，如果显示Java 17的版本信息，则说明配置成功。

   ```shell
   $ java -version
   
   java version "17.0.1" 2021-01-17 LTS
   Java(TM) SE Runtime Environment (build 17.0.1+9-LTS-190)
   Java HotSpot(TM) 64-Bit Server VM (build 17.0.1+9-LTS-190, mixed mode, sharing)
   ```

<!-- endtab -->

<!-- tab Macos-->

在MacOS系统中配置Java 17环境的步骤如下：

1. 下载Java 17安装包。

   在[Oracle官网](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)上下载Java 17的安装包，选择与MacOS系统相应的版本。

2. 安装Java 17。

   双击下载好的Java 17安装包，按照步骤进行安装即可。

3. 配置环境变量。

   (1) 打开<i class="fa-solid fa-rectangle-terminal"></i>`Terminal`（中文叫`终端`）应用程序。

   (2) 在命令行输入以下命令，编辑`~/.bash_profile` | `~/.zshrc`文件：
   <i class="fa-solid fa-triangle-exclamation" style="color: #ffcf24;"></i> 自 macOS Catalina 10.15开始，默认的终端 shell 从` bash` 改为了 `zsh`。你没有修改过默认的设置，在用户目录下是没有`.bash_profile`文件的，环境配置文件为`.zshrc`，具体配置如下：

   `macOS Catalina 10.15`之前的版本（`bash`）

     ```shell
     nano ~/.bash_profile
     ```

   `macOS Catalina 10.15`以及之后的版本（`zsh`）

     ```shell
     nano ~/.zshrc
     ```

   (3) 在根据`(2)`步骤中打开的文件中，加入如下信息：

   ```
   export PATH="/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home/bin:$PATH"
   ```

   (4) 按下“Ctrl+X”键，选择“Y”保存文件并按“Enter”键退出编辑。

   (5) 执行以下命令让修改后的环境变量生效：

   `macOS Catalina 10.15`之前的版本（`bash`）

   ```shell
   source ~/.bash_profile
   ```

   `macOS Catalina 10.15`以及之后的版本（`zsh`）

   ```shell
   source ~/.zshrc
   ```

4. 验证Java 17是否配置成功。

   在终端中输入“`java -version`”命令，如果显示`Java 17的版本信息`，则说明配置成功。

   ```shell
   $ java -version
   
   java version "17.0.1" 2021-01-17 LTS
   Java(TM) SE Runtime Environment (build 17.0.1+9-LTS-190)
   Java HotSpot(TM) 64-Bit Server VM (build 17.0.1+9-LTS-190, mixed mode, sharing)
   ```
   

<!-- endtab -->
{% endtabs %}

## 结论

在Windows、Linux、MacOS系统中都可以配置Java 17环境，只需按照上述步骤，在对应的系统中进行操作即可。配置成功后，就可以使用Java 17进行程序开发了。
