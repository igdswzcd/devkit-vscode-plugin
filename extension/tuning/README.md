# 鲲鹏性能分析插件

支持系统性能分析和 Java 性能分析，提供系统全景及常见应用场景下的性能采集和分析能力，同时基于调优系统给出优化建议。

- 一键式部署

  支持从 Visual Studio Marketplace 下载并在线安装插件，同时支持一键部署服务端环境。

- 调优助手

  通过系统化组织和分析性能指标、热点函数、系统配置等信息，形成系统资源消耗链条，引导用户根据优化路径分析性能瓶颈，并针对每条优化路径给出优化建议和操作指导，以此实现快速调优。

- 系统性能分析

  软件运行状态下，通过采集服务器系统数据，分析系统配置及性能指标，精准定位到性能瓶颈点及热点函数，提供一站式分析报告、多维度数据关联及优化建议。

- Java 性能分析

  针对服务器上运行的 Java 程序，图形化显示 Java 程序的堆、线程、锁、垃圾回收等信息，收集热点函数，定位性能瓶颈点，帮助用户采取针对性优化。

- 系统诊断

  通过分析系统运行指标，识别异常点，例如：内存泄漏、内存越界、网络丢包等，并给出优化建议。工具还支持压测系统，如：网络 IO，评估系统最大性能。

## 版本配套关系

该插件需配套后台服务运行，后台服务需安装在基于鲲鹏的服务器上。两者的配套关系如下：

<table cellpadding="0" cellspacing="0" style="border:1px solid gray; border-bottom: none; border-right: none;">
        <tr>
            <th style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">插件版本</th>
            <th style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">后台版本</th>
        </tr>
        <tr>
            <td style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">2.5.0</td>
            <td style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">2.5.0</td>
        </tr>
        <tr>
            <td style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">2.3.5</td>
            <td style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">2.5.RC1.1</td>
        </tr>
        <tr>
            <td style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">2.3.3</td>
            <td style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">2.3.0</td>
        </tr>
        <tr>
            <td style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">2.3.2</td>
            <td style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">2.3.T20</td>
        </tr>
        <tr>
            <td style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">2.3.1</td>
            <td style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">2.3.T10</td>
        </tr>
        <tr>
            <td style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">2.2.8</td>
            <td style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">2.2.T4</td>
        </tr>
        <tr>
            <td style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">2.2.7</td>
            <td style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">2.2.T4</td>
        </tr>
        <tr>
            <td style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">2.2.6</td>
            <td style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">2.2.1</td>
        </tr>
        <tr>
            <td style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">2.2.5</td>
            <td style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">2.2.T3</td>
        </tr>
</table>

后台版本获取方式：

1. 通过插件的“一键式部署”功能自动安装
2. 前往<a href="https://www.hikunpeng.com/developer/devkit/hyper-tuner?data=web">鲲鹏社区</a>获取后台服务安装包及安装方式

## 调优助手简介

调优分析通过系统化组织和分析性能指标、热点函数、系统配置等信息，形成系统资源消耗链条，引导用户根据优化路径分析性能瓶颈，并针对每条优化路径给出优化建议和操作指导，以此实现快速调优。

- 调优分析

  - 采集和分析与性能强相关的系统配置信息，引导用户根据优化路径分析与此相关的性能瓶颈。
  - 采集和分析热点函数信息，引导用户根据优化路径分析与此相关的性能瓶颈。
  - 系统化组织和分析系统性能指标，形成系统资源消耗链条，引导用户根据优化路径分析与此相关的性能瓶颈。
  - 系统化组织和分析进程/线程性能指标，形成系统资源消耗链条，引导用户根据优化路径分析与此相关的性能瓶颈。

- 对比报告

  对比报告通过对调优分析任务的分析结果进行对比，为用户提供节点不同任务的详细对比报告，包括：系统配置分析结果对比、热点函数分析结果对比、系统性能分析结果对比、进程/线程性能分析结果对比，以此判断调优目标是否达到预期目的。

## 系统性能分析简介

针对基于鲲鹏的服务器的性能分析工具，能收集服务器的处理器硬件、操作系统、进程/线程、函数等各层次的性能数据，分析出系统性能指标，定位到系统瓶颈点及热点函数，给出优化建议。该工具可以辅助用户快速定位和处理软件性能问题。

系统性能分析支持的功能特性如下：

- 全景分析

  通过采集系统软硬件配置信息，以及系统 CPU、内存、存储 IO、网络 IO 资源的运行情况，获得对应的使用率、饱和度、错误等指标，以此识别系统性能瓶颈。针对部分系统指标项，根据当前已有的基准值和优化经验提供优化建议。针对大数据和分布式存储场景的硬件配置、系统配置和组件配置进行检查并显示不是最优的配置项，同时分析给出典型硬件配置及软件版本信息。

- 资源调度分析

  基于 CPU 调度事件分析系统资源调度情况，主要包括：

  - 分析 CPU 核在各个时间点的运行状态，如：Idle、Running。如果是 Running 状态，能关联在 CPU 核上运行的进程/线程信息，以及各种状态的时长比例。
  - 分析进程/线程在各个时间点的运行状态，如：Wait、Schedule 和 Running，以及各种状态的时长比例。
  - 分析进程/线程切换情况，包括：切换次数、平均调度延迟时间、最小调度延迟时间和最大延迟时间点。
  - 分析各个进程/线程在不同 NUMA 节点之间的切换次数。如果切换次数大于基准值，能给出绑核优化建议。

- 微架构分析

  基于 ARM PMU（Performance Monitor Unit）事件，获得指令在 CPU 流水线上的运行情况，可以帮助用户快速定位当前应用在 CPU 上的性能瓶颈，因此用户便可以有针对性地修改自己的程序，以充分利用当前的硬件资源。

- 访存分析

  基于 CPU 访问缓存和内存的事件，分析访存过程中可能的性能瓶颈，给出造成这些性能问题的可能原因及优化建议。

  - 访存统计分析：基于处理器访问缓存和内存的 PMU 事件，分析存储的访问次数、命中率、带宽等情况。
  - Miss 事件分析：基于 ARM SPE（Statistical Profiling Extension）能力实现。SPE 针对指令进行采样，同时记录一些触发事件的信息，包括精确的 PC 指针信息。利用 SPE 能力可以用于业务进行 LLC Miss，TLB Miss，Remote Access，Long Latency Load 等 Miss 类事件分析，并精确的关联到造成该事件的代码。基于这些信息，用户便可以有针对性地修改自己的程序，降低发生对应事件发生的几率，提高程序处理性能。
  - 伪共享分析：基于 ARM SPE（Statistical Profiling Extension）能力实现。SPE 针对指令进行采样，同时记录一些触发事件的信息，包括精确的 PC 指针信息。利用 SPE 能力可以用于业务进行伪共享分析，得到发生伪共享的次数和比例、指令地址和代码行号、NUMA 节点等信息。基于这些信息，用户便可以有针对性地修改自己的程序，降低发生伪共享的几率，提高程序处理性能。

- 进程/线程性能分析

  采集进程/线程对 CPU、内存、存储 IO 等资源的消耗情况，获得对应的使用率、饱和度、错误等指标，以此识别进程/线程性能瓶颈。针对部分指标项，根据当前已有的基准值和优化经验提供优化建议。针对单个进程，还支持分析它的系统调用情况。

- 锁与等待分析

  分析 glibc 和开源软件（如 MySQL、Open MP）的锁与等待函数（包括 sleep、usleep、mutex、cond、spinlock、rwlock、semaphore 等），关联到其归属的进程和调用点，并根据当前已有的优化经验给出优化建议。

- 热点函数分析

  分析 C/C++程序代码，找出性能瓶颈点，获得对应的热点函数及其源码和汇编指令；支持通过火焰图展示函数的调用关系，给出优化路径。

- I/O 分析

  分析存储 IO 性能。以存储块设备为分析对象，分析得出块设备的 I/O 操作次数、I/O 数据大小、I/O 队列深度、I/O 操作时延等性能数据，并关联到造成这些 I/O 性能数据的具体 I/O 操作事件、进程/线程、调用栈、应用层 I/O APIs 等信息。根据 I/O 性能数据分析给出进一步优化建议。

- 联动分析

  支持对同一种类型分析任务的结果，选择同一节点或者不同节点间进行比较，从而快速获得不同分析结构之间的差别，定位性能指标的变化，快速识别优化手段的效果。

- HPC 分析

  HPC 分析通过采集系统的 PMU 事件并配合采集面向 OpenMP 和 MPI 应用的关键指标，帮助用户精准获得 Parallel region 及 Barrier-to-Barrier 的串行及并行时间、校准的 2 层微架构指标、指令分布及 L3 的利用率和内存带宽等信息。

## Java 性能分析简介

针对基于鲲鹏的服务器上运行的 Java 程序的性能分析和优化工具，能图形化显示 Java 程序的堆、线程、锁、垃圾回收等信息，收集热点函数、定位程序瓶颈点，帮助用户采取针对性优化。

Java 性能分析支持的功能特性如下：

- 在线分析

  在线分析包含对于目标 JVM 和 Java 程序的双重分析。包括 Java 虚拟机的内部状态如 Heap，GC 活动，线程状态及上层 Java 程序的性能分析，如调用链分析，热点函数，锁分析，程序线程状态及对象生成分布等。通过 Agent 的方式在线获取 JVM 运行数据，进行精确分析。主要功能包含：

  - 在线显示 Java 虚拟机系统状态。
  - 在线显示 JVM 的 Heap 大小，GC 活动，Thread 数量，Class 加载数量和 CPU 使用率。
  - 通过抓取堆快照，分析应用在某时刻堆的直方图分布，支配调用关系以及追溯堆内存中各 Java 存活对象到 GC root 的引用关系链，帮助定位潜在的内存问题；对比分析不同时刻堆快照，给出堆使用与分配变化，辅助用户发现堆内存在分配、使用过程中的异常情况。
  - I/O 分析，在线分析应用中文件 IO、Socket IO 时延、消耗带宽，找出热点 IO 操作。
  - Java 进程/线程性能分析。
  - 上层应用 Workload 相关分析。
  - 支持在堆、IO、Workload 在线分析过程中生成快照，对快照进行比对，辅助用户发现资源、业务相关指标变化趋势，定位潜在的资源泄露问题或性能指标恶化问题。

- 采样分析

  通过采样的方式，收集 JVM 的内部活动/性能事件，通过录制及回放的方式来进行离线分析。这种方式对系统的额外开销很小，对业务影响不大，适用于大型的 Java 程序。主要功能包括：

  - 显示 Java 虚拟机系统状态。
  - 通过录制及回放的方式显示 JVM 的 Heap 使用情况，GC 活动、IO 消耗和 CPU 使用。
  - 通过对存留周期长的对象进行采样，分析 Java 应用中潜在的堆内存泄漏，并辅助用户定位潜在原因。
  - 系统根据 Sampling 分析记录出具关于启动参数、GC 方面的报告和优化建议。
  - I/O 分析，通过采样，分析应用中文件 IO、Socket IO 时延、消耗带宽，找出热点 IO 操作。
  - Java 进程/线程性能分析。
  - 函数性能分析。

## 系统诊断简介

系统诊断工具通过分析系统运行指标，识别异常点，例如：内存泄漏、内存越界、网络丢包等，并给出优化建议。工具还支持压测系统，如：网络 IO，评估系统最大性能。

系统诊断工具支持的功能如下：

- 内存诊断

  提供内存诊断能力，帮助用户识别应用程序中存在的内存使用的问题点，提升程序的可靠性，具体包括：内存泄漏诊断、内存越界诊断。

  - 内存泄漏诊断

    - 分析应用程序中存在的内存泄漏点（包括内存未释放和异常释放），得到具体的泄漏信息，并支持关联出调用栈信息和源码。
    - 实时跟踪应用程序运行期间系统层、应用层（调用内存申请函数）、分配器层的内存消耗情况。
    - 分析发生 OOM 时的进程内存状态、系统内存状态和调用栈信息。

  - 内存越界诊断

    分析应用程序中存在的内存异常访问点，给出异常访问类型和内存访问信息，并支持关联出调用栈和源码。

- 网络 IO 诊断

  压测网络，获得网络最大能力，为网络 IO 性能优化提供基础参考数据；诊断网络，定位网络疑难问题，解决因网络配置和异常而导致的网络 IO 性能问题。具体功能如下：

  - 网络拨测：获得网络运行情况和最大能力，包括：连通情况、带宽、重传、丢包率、时延、抖动等，评估网络质量。
  - 丢包诊断：获取网络丢包点，定位网络丢包根因，给出修复建议。
  - 网络抓包：辅助网络拨测和丢包诊断，根据抓取的网络消息包定位网络异常根因。
  - 系统负载监控：用于诊断期间监控系统负载，包括：CPU、内存、网络 IO、软硬件中断等，以此了解在网络拨测或发生网络丢包时，是否存在系统资源不足。

- 存储 IO 诊断

  压测存储 IO，获得存储设备最大能力，包括：吞吐量、IOPS、时延等，并以此评估存储能力，为存储 IO 性能优化提供基础参考数据。

## 免责声明

1. 本插件服务对象为企业用户，使用者为企业用户有工作需要的员工。您在遵守国家法律、法规、政策的前提下，可出于工作目的使用本插件。
2. 未经所有者授权，任何个人或组织均不得私自传播该插件。您不得删除本插件中的版权声明及其它信息，不得对本插件进行反向工程、反向汇编、反向编译等。
3. 除非法律法规或双方合同另有规定，本插件以“现状”提供且不带有任何明示或暗示保证，包括但不限于针对某一特定用途的适用性及不侵权的保证。
4. 本插件为测试版本，仅用于开发测试环境和公测。您使用本插件过程中得到的反馈仅供参考，不以任何方式或形式构成特定指引和建议。
5. 您使用本插件过程中所采取的任何行为均由您自行承担风险，华为公司在任何情况下均不对任何性质的损害或损失负责。
6. 如您使用本插件过程中违反前述免责声明，华为公司不对由此造成的一切后果负责，亦不承担任何法律责任。必要时，还将追究责任方的法律责任。

# Kunpeng Hyper Tuner Plugin

Supports system profiling and Java profiling on the Kunpeng platform, performs system-level and scenario-specific performance data sampling and analysis, and provides tuning suggestions.

- One-click deployment

  You can download the plugin from the Visual Studio Marketplace, install it online, and deploy the server environment by simply clicking the mouse.

- Tuning Assistant

  The Tuning Assistant systematically organizes and analyzes performance metrics, hotspot functions, and system configurations to form a system resource consumption chain. It provides guidance for analyzing performance bottlenecks based on tuning paths and gives tuning suggestions and operation guides for each tuning path to implement fast tuning.

- System Profiler

  The tool collects system data of Kunpeng-powered servers, analyzes system configuration and performance metrics, accurately locates performance bottlenecks and hotspot functions, and provides one-stop analysis reports, multi-dimensional data association, and tuning suggestions.

- Java Profiler

  The tool graphically displays the heap, thread, lock, and garbage collection information about Java programs running on Kunpeng-powered servers, collects hotspot functions, and locates performance bottlenecks to help users take proper tuning measures.

- System Diagnosis

  The tool analyzes system operating metrics to identify exceptions, such as memory leakage, memory overwriting, and network packet loss, and provides tuning suggestions. The tool also supports pressure test systems, such as network I/O, to evaluate the maximum performance of the system.

## Version Mapping

This plug-in needs to run with the background service, which must be installed on Kunpeng-powered servers. The version mapping is as follows:

<table cellpadding="0" cellspacing="0" style="border:1px solid gray; border-bottom: none; border-right: none;">
        <tr>
            <th style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">Plug-in Version</th>
            <th style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">Background Version</th>
        </tr>
        <tr>
            <td style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">2.5.0</td>
            <td style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">2.5.0</td>
        </tr>
        <tr>
            <td style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">2.3.5</td>
            <td style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">2.5.RC1.1</td>
        </tr>
        <tr>
            <td style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">2.3.3</td>
            <td style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">2.3.0</td>
        </tr>
        <tr>
            <td style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">2.3.2</td>
            <td style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">2.3.T20</td>
        </tr>
        <tr>
            <td style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">2.3.1</td>
            <td style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">2.3.T10</td>
        </tr>
        <tr>
            <td style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">2.2.8</td>
            <td style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">2.2.T4</td>
        </tr>
        <tr>
            <td style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">2.2.7</td>
            <td style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">2.2.T4</td>
        </tr>
        <tr>
            <td style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">2.2.6</td>
            <td style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">2.2.1</td>
        </tr>
        <tr>
            <td style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">2.2.5</td>
            <td style="height:32px; border: 1px solid gray; border-top: none; border-left: none;padding: 8px;">2.2.T3</td>
        </tr>
  </table>

You can use either of the following method to obtain the background version:

1. Use the one-click deployment function of the plug-in to automatically install it.
2. Go to the <a href="https://www.hikunpeng.com/developer/devkit/hyper-tuner?data=web">Kunpeng Community</a> to obtain the background service installation package and installation method.

## Introduction to the Tuning Assistant

The Tuning Assistant systematically organizes and analyzes performance metrics, hotspot functions, and system configurations to form a system resource consumption chain. It provides guidance for analyzing performance bottlenecks based on tuning paths and gives tuning suggestions and operation guides for each tuning path to implement fast tuning.

- Tuning Analysis

  - collects and analyzes performance-related system configurations to help analyze performance bottlenecks based on tuning paths.
  - collects and analyzes hotspot function information to help analyze performance bottlenecks based on tuning paths.
  - The tool systematically organizes and analyzes system performance metrics to form a system resource consumption chain. It provides guidance for analyzing performance bottlenecks based on tuning paths.
  - The tool systematically organizes and analyzes process/thread performance metrics to form a system resource consumption chain. It provides guidance for analyzing performance bottlenecks based on tuning paths.

- Comparison Report

  Compares the results of tuning analysis tasks and provides users with detailed comparison reports for different tasks on a node, including results of analysis on system configurations, hotspot functions, system performance, and process/thread performance.

## Introduction to the System Profiler

The System Profiler is a system performance analysis tool for Kunpeng-powered servers. It collects performance data of processor hardware, operating system, processes or threads, and functions, analyzes system performance metrics, locates system bottlenecks and hotspot functions, and provides tuning suggestions. This tool helps you quickly locate and handle software performance problems.

The System Profiler provides the following functions:

- Overall analysis

  The tool collects the software and hardware configuration information of the entire system and the running status of system resources, such as CPU, memory, storage I/O, and network I/O, to obtain the performance metrics such as resource usage, saturation, and errors. The performance metrics help users identify system bottlenecks. Based on the existing reference values and tuning experience, the tool provides tuning suggestions for certain system metrics. In addition, the tool checks the hardware configuration, system configuration, and component configuration in big data and software-defined storage scenarios, displays the configuration items that are not optimal, and analyzes and provides typical hardware configuration and software version information.

- Resource scheduling analysis

  The tool analyzes system resource scheduling based on CPU scheduling events. In detail, it analyzes:

  - The running status, such as Idle or Running, of the CPU core at each time point. If a CPU core is in the Running state, information about processes or threads running on the CPU core and the duration proportion of each status can be associated.
  - The running status of processes or threads at each time point, which can be Wait, Schedule, and Running, and the duration proportion of each status.
  - Process/thread switching information, including the number of switches, average scheduling delay, minimum scheduling delay, and maximum delay time.
  - The number of times that each process or thread switches between different non-uniform memory access (NUMA) nodes. If the number of switches is greater than the reference value, core binding suggestions will be provided.

- Microarchitecture analysis

  The tool obtains the running status of instructions on the CPU pipeline based on the ARM Performance Monitor Unit (PMU) event. It helps users quickly locate the performance bottleneck of the current application on the CPU and modify the program to maximize the utilization of hardware resources.

- Memory access analysis

  By analyzing the events related to the CPU's access to the cache and memory, the tool identifies potential performance bottlenecks on memory access, locates the possible causes, and provides the corresponding tuning suggestions.

  - Memory access statistics analysis: The tool accesses the PMU events of the cache and memory and analyzes the number of storage access times, hit rate, and bandwidth.
  - Miss event analysis: This function is implemented based on the ARM Statistical Profiling Extension (SPE) capability. SPE samples instructions and records event triggering information, including accurate PC pointer information. By using SPE, the tool analyzes miss events, such as LLC Miss, TLB Miss, Remote Access, and Long Latency Load, and accurately identifies the code that causes the events. Based on the analysis information, users can modify their programs to reduce the probability of certain events and improve the performance of their programs.
  - Pseudo sharing analysis: This function is implemented based on the ARM SPE capability. SPE samples instructions and records event triggering information, including accurate PC pointer information. By using SPE for false sharing analysis on services, the tool obtains information about the number and proportion of false sharing times, instruction addresses, code line numbers, and NUMA nodes. Based on the information, users can modify their programs to reduce the probability of false sharing and improve the performance of their programs.

- Process/Thread performance analysis

  The tool collects information about the resources (such as CPU, memory, and storage I/O) consumed by processes or threads to obtain the performance metrics such as the utilization, saturation, and errors. The performance metrics help users identify process or thread bottlenecks. Based on the existing reference values and tuning experience, the tool provides tuning suggestions for certain system metrics. The tool also analyzes the system calling information for a single process.

- Locks and waits

  The tool analyzes the lock and wait functions (including sleep, usleep, mutex, cond, spinlock, rwlock, and semaphore) of glibc and open-source software such as MySQL and Open MP, associates the processes and call sites to which the lock and wait functions belong, and provides tuning suggestions based on the existing tuning experience.

- Hotspot Function Analysis

  The tool analyzes C/C++ program code, identifies performance bottlenecks, and displays hotspot functions, source code, and assembly instructions. The function call relationship can be displayed in flame graphs, and the tuning path is provided.

- I/O analysis

  The tool analyzes block storage devices to obtain performance data such as the number of I/O operations, I/O data size, I/O queue depth, and I/O operation delay, and associates the data with specific I/O operations, processes, threads, call stacks, and I/O APIs of the application layer. Based on the I/O performance data, the tool provides tuning suggestions.

- Associated Analysis

  For the same type of analysis tasks, you can select the same node or different nodes to compare the analysis results. In this way, you can quickly learn the differences between different analysis structures, locate the changes of performance metrics, and identify the effect of optimization methods.

- HPC Analysis

  HPC analysis collects PMU events of the system and the key metrics of OpenMP and MPI applications to help users accurately obtain the serial and parallel time of the Parallel region and Barrier-to-Barrier, calibrated 2-layer micro-architecture metrics, instruction distribution, L3 usage, and memory bandwidth.

## Introduction to the Java Profiler

The Java Profiler is a Java performance analysis and tuning tool for Kunpeng-powered servers. It graphically displays the heap, thread, lock, and garbage collection (GC) information about Java programs running on the servers, collects hotspot functions, and locates performance bottlenecks to help users take proper tuning measures.

The Java Profiler provides the following functions:

- Profiling analysis

  Online profiling is to analyze the target Java virtual machine (JVM) and Java programs. The JVM performance analysis includes data about the internal JVM status, such as the heap, GC activities, and thread status. The Java program performance analysis includes analysis of called chains, hotspot functions, lock analysis, program thread status, and object distribution. JVM running data is obtained in an online manner using the agent for precise analysis. The major functions are as follows:

  - Real-time display of the JVM system status.
  - Real-time display of JVM information, including the heap size, GC activities, number of threads, number of loaded classes, and CPU usage.
  - By capturing heap snapshots, the tool analyzes the heap histogram distribution and dominator tree of an application at a certain time point and traces the reference relationship chain from each Java object in the heap memory to the GC root, helping locate potential memory problems; compares and analyzes heap snapshots at different time points and analyzes the changes of heap usage and allocation, helping users detect exceptions.
  - I/O analysis. The tool analyzes the file I/O, socket I/O latency, and consumed bandwidth in an online manner to identify hotspot I/O operations.
  - Java process/thread performance analysis
  - Workload-related analysis for upper-layer applications
  - Snapshots can be generated during online analysis of heap, I/O, and workload data. By comparing snapshots, the tool helps users detect the change trends of resources and service indicators and identify potential risks on resource leakage or performance indicator deterioration.

- Sampling analysis

  The tool samples data of internal activities and performance events of the JVM and performs offline analysis through data recording and playback. This analysis features little overhead and has little impact on services. It applies to large Java programs. The major functions are as follows:

  - Display of the JVM system status.
  - Playback of recorded JVM information, including the heap size, GC activities, I/O consumption, and CPU usage.
  - By sampling objects with a long retention period, the tool enables users to analyze potential heap memory leakage in Java applications and locate possible causes.
  - The system provides reports and tuning suggestions on startup parameters and GC based on the sampling analysis records.
  - I/O analysis. The tool analyzes the file I/O, socket I/O latency, and consumed bandwidth in an online manner to identify hotspot I/O operations.
  - Java process/thread performance analysis
  - Function performance analysis

## Introduction to the System Diagnosis

The tool analyzes system operating metrics to identify exceptions, such as memory leakage, memory overwriting, and network packet loss, and provides tuning suggestions. The tool also supports pressure test systems, such as network I/O, to evaluate the maximum performance of the system.

The System Diagnosis tool provides the following functions:

- Memory diagnosis

  The tool provides the memory diagnosis capability (including memory leak diagnosis and memory overwriting diagnosis) to help identify memory usage issues in applications and improve application reliability.

  - Memory leak diagnosis

    - The tool analyzes the memory leak points (including memory release failures and abnormal memory releases) of the application to obtain the specific leakage and associate the call stack and source code.
    - The tool traces the memory usage of the system layer, application layer (calling the memory application function), and allocator layer in real time when the application is running.
    - The tool analyzes the process memory status, system memory status, and call stack information when OOM occurs.

  - Memory overwriting diagnosis:

    The tool analyzes abnormal memory access points of the application, provides abnormal access types and memory access information, and associates the call stack and source code.

- Network I/O diagnosis

  The tool performs pressure tests on the network to obtain the maximum network capability and provide basic reference data for network I/O performance tuning. It diagnoses the network, locates network problems, and resolve network I/O performance problems caused by network configurations and exceptions. Specific functions are as follows:

  - Network dialing test: The tool obtains statistics about the network status and maximum capability, including the connection status, bandwidth, retransmission, packet loss rate, delay, and packet delay variation, to evaluate the network quality.
  - Packet loss diagnosis: The tool obtains packet loss points on the network, determines the root cause of packet loss, and provides rectification suggestions.
  - Network packet capture: The tool assists in network dialing tests and packet loss diagnosis, and determines the root cause of network exceptions based on the captured network packets.
  - System load monitoring: The tool monitors the system load during diagnosis, including the CPU, memory, network I/O, and software and hardware interrupts, to check whether system resources are insufficient during network dialing tests or when network packet loss occurs.

- Storage I/O diagnosis

  Performs pressure tests on the storage I/O to obtain the maximum capability of the storage device, including the throughput, IOPS, and latency. Based on the obtained information, evaluate the storage capability and provide basic reference data for storage I/O performance tuning.

## Disclaimer

1. This plugin is intended for enterprise users who need to use the plugin for work. You can use this plugin for work in compliance with laws, regulations, and government policies.
2. No individual or organization shall spread the plugin without the authorization of the plugin owner. You shall not delete the license information or other information in this plugin, or perform reverse engineering, disassembly, or decompilation on this plugin.
3. Unless otherwise specified in laws, regulations, or contracts, this plugin is provided "AS IS" without warranties, guarantees or representations of any kind, either expressed or implied.
4. This plugin is a beta version and is used only for the development and testing environment and open beta test (OBT). The feedback you obtain when you use this plugin is for reference only and does not constitute specific guidance or suggestions in any way or form.
5. You shall bear all risks arising from your use of this plugin. Huawei is not liable for any damage or loss of any nature in any case.
6. If you violate this disclaimer when using this plugin, Huawei is not liable for any consequences and does not assume any legal liabilities. If necessary, the responsible party will be held legally liable.
