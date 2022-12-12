# 鲲鹏性能分析插件

## 2.5.0（2022-12-30）

- 新增 MPI 集群 Top N rank 图表
- 新增命令行数据采集与图形化分析结合模式
- 新增系统诊断-内存泄漏诊断
- 新增工作空间 2G 优化点和清理功能
- 新增 Java 性能-CMS GC 分析
- 扩展 Java 性能-支持 Java 锁、Cache Miss、内存分配维度的热点分析
- 支持 Java 性能-热点分析报告导出
- 支持 node-to-node MPI 通信热度分析
- 支持百 P 级 rank-to-rank 通信热力图
- 支持 MPI cluster checker 进行初始检查
- 支持 HPC 场景分析-MPI 集群下 RDMA/共享存储联合分析基本能力
- 调整 HPC 场景分析-结果查询与展示 UI
- 优化 MPI 低效消息通信模式图表
- 优化 OpenMP 时间线的显示

## 2.3.5（2022-06-30）

- 修复内存诊断功能在 openEuler 22.03 不兼容问题
- 修复 HPC 场景分析功能在部分场景下 cpu 使用率和实际不一致问题
- 优化 MPI timeline 卡顿问题

## 2.3.3（2021-12-30）

- 系统诊断新增存储 IO 功能，压测存储 IO，获得存储设备最大能力，为存储 IO 性能优化提供基础参考数据
- HPC 下支持 MPI 万核级并行分析，最多可支持到 101 个节点

## 2.3.2（2021-09-30）

- 新增调优助手，通过对常见系统性能基础数据进行分析，给出直观可视的调优步骤和方法
- 新增网络 IO 异常诊断，提供对网络 IO 异常、网络质量进行诊断的能力
- HPC 分析新增 OpenMP 指标、支持基本 MPI 分析能力
- 新增火焰图热点函数的联动分析，支持对大数据、数据库、分布式存储场景下的典型业务部进行联动分析
- 支持 ES 3600 NVMe SSD 的动态参数分析
- 支持基于 1822 智能网卡的采集和分析
- 支持 attach 在不重启 MySQL 进程的情况下诊断内存泄漏
- 新增 Java 性能分析的跨语言调用热点分析
- 优化容器内 Java 应用分析的易用性
- 新增支持 openEuler 20.03（LTS-SP1）、openEuler 20.03 （LTS-SP2）
- 新增用户建议反馈入口

## 2.3.1（2021-06-30）

- 支持 macOS 10.0 及以上的 Chrome 浏览器
- 支持申请并使用鲲鹏远程实验室
- 新增支持 BC-Linux 7.6、BC-Linux 7.7、UOS Server 20 Euler（1000）、普华（iSoft） 5.1
- 新增数据库场景下的性能分析功能，并支持基本 Tracing 信息采集与分析能力
- 支持全景分析场景的联动分析功能
- 新增 PCIe 全系统分析功能，支持部分网卡和 NVMe SSD
- 增强 HPC 场景的 OpenMP 细粒度分析能力
- 诊断调试新增内存异常使用诊断能力
- 新增 G1 GC 活动细化分析功能
- 新增 Thread/Heap Dump 导入分析功能
- 对部分功能的易用性和准确度进行优化
- 支持对更多同源 OS 版本的兼容能力

## 2.2.7（2021-04-30）

- 新增支持 CentOS 8.2，Ubuntu 20.04.1
- 支持 HPC 性能分析
- 增强系统全景分析能力
- 持续增强性能优化建议
- 安装时提供自带 JDK 版本供用户选择
- 优化用户登录输入
- 优化错误提示信息、菜单、UI 体验

## 2.2.6（2021-03-30）

- 增强插件数据安全
- 支持通过普通用户安装 Agent
- 优化软件安装过程
- 优化 Java 性能分析的目标（Guardian）环境配置过程

## 2.2.5（2020-12-30）

- 第二个非商用版本发布
- 补齐系统性能分析功能
  - 支持大数据及分布式存储场景下的性能分析
  - 支持系统资源调度分析
  - 支持 Java 混合模式分析
  - 补充 Top-Down 模型 L3/L4 层指标
  - 以 Function/Thread/Core/Call Stack 方式组织热点函数
  - 硬件拓扑图上叠加性能和状态数据
  - 对已有部分功能的易用性和准确度优化提升
- 补齐 Java 性能分析功能
  - 支持 Sampling 分析
  - 新增堆内存引用链分析功能
  - 新增堆内存泄露发现功能
  - 针对分析数据输出分析报告和优化建议
  - 对已有部分功能的易用性和准确度优化提升
- Tiny UI 由 2.0 升级到 3.0

## 2.2.3（2020-11-30）

- 针对 2.2.2 的补丁版本，修复已知问题

## 2.2.2（2020-10-30）

- 针对 2.2.1 的补丁版本，修复已知问题
- 插件工具更名

## 2.2.1（2020-09-30）

- 第一个非商用版本发布
- 完成鲲鹏性能分析插件主体功能

# Kunpeng Hyper Tuner Plugin

## 2.5.0（2022-12-30）

- Added the top N rank chart of the MPI cluster.
- Added the command line data collection and graphical analysis combination mode.
- Added memory leak diagnosis in system diagnosis.
- Added workspace cleanup function.
- Added CMS GC analysis in Java Profiler.
- Added hotspot analysis of Java lock, cache miss, and memory allocation samples in Java Profiler.
- Added export of hotspot analysis reports in Java Profiler.
- Added node-to-node MPI communication heat analysis.
- Added PB-scale rank-to-rank communication heatmaps.
- Added initial checks by MPI cluster checker.
- Added RDMA/shared storage joint analysis in MPI clusters for HPC scenario analysis.
- Modified the result query and display UI in HPC scenario analysis.
- Optimized MPI inefficient communication pattern chart.
- Optimized the OpenMP timeline display.

## 2.3.5（2022-06-30）

- Fixed the issue that the memory diagnosis function is incompatible with openEuler22.03.
- Fixed the issue that the CPU usage of the HPC scenario analysis function is inconsistent with the actual CPU usage in some scenarios.
- Fixed the MPI timeline frame freezing problem.

## 2.3.3 (2021-12-30)

- The system diagnosis can now diagnose storage I/O issues through pressure tests, which can obtain the maximum storage device capability and thus provide data reference for optimizing storage I/O performance.
- HPC analysis task supports MPI multi-core (up to 10,000 cores) parallel analysis and supports a maximum of 101 nodes.

## 2.3.2 (2021-09-30)

- Added the Tuning Assistant to analyze basic system performance data and provide visualized tuning procedures and methods.
- Added the network I/O exception diagnosis to diagnose network I/O exceptions and network quality.
- Added OpenMP metrics and basic MPI analysis capabilities for HPC analysis.
- Added the associated analysis of hotspot functions in the flame graph to support associated analysis of typical business departments in big data, database, and distributed storage scenarios.
- Supports dynamic parameter analysis of the ES 3600 NVMe SSDs.
- Supports collection and analysis based on the 1822 iNIC.
- Supports the attach function to diagnose memory leaks without restarting the MySQL process.
- Added cross-language calling hotspot analysis of Java Profiler.
- Optimized the usability of Java application analysis in the container.
- Added openEuler 20.03 (LTS-SP1) and openEuler 20.03 (LTS-SP2).
- Provided the portal for user suggestions and feedback.

## 2.3.1 (2021-06-30)

- Added the compatibility with Chrome on macOS 10.0 and later.
- The Kunpeng Remote Lab Trial is available.
- Added the support for BC-Linux 7.6, BC-Linux 7.7, UOS Server 20 Euler (1000), and iSoft 5.1.
- Added the performance analysis function in database scenarios, and supports basic tracing collection and analysis.
- Added the correlated analysis function in the overall analysis scenario.
- Added the PCIe system analysis function to support the analysis of some NICs and NVMe SSDs.
- Enhance the OpenMP fine-grained analysis capabilities in HPC scenarios.
- Added the diagnosis capability for abnormal access in memory diagnosis.
- Added the detailed analysis function for G1 GC activities.
- Added the functions of importing and analyzing thread/heap dumps.
- Optimized the usability and accuracy of some functions.
- Compatible with more OS versions of the same source.

## 2.2.7 (2021-04-30)

- Added the support for CentOS 8.2 and Ubuntu 20.04.1.
- Added the HPC performance analysis capability.
- Improved the overall system analysis capability.
- Optimized performance optimization suggestions.
- Provides the optional default JDK version during the installation.
- Optimized the user login input.
- Optimized error messages, menus, and UI experience.

## 2.2.6 (2021-03-30)

- Enhanced plugin data security.
- Supports the ability to install the Agent as a common user.
- Optimized the software installation process.
- Optimized the Guardian configuration process for the Java Profiler.

## 2.2.5 (2020-12-30)

- The second non-commercial version released.
- System Profiler
  - Supports performance analysis in big data and SDS scenarios.
  - Supports system resource scheduling analysis.
  - Supports Java mixed analysis.
  - Added L3/L4 metrics of the top-down model.
  - Displays hotspot functions by function, thread, core, or call stack.
  - Displays performance and status data on the hardware topology.
  - Optimized some functions for easier use and higher accuracy.
- Java Profiler
  - Supports sampling analysis.
  - Supports analysis of the heap memory reference chains.
  - Supports detection of heap memory leaks.
  - Provides analysis reports and optimization suggestions based on the analysis result.
  - Optimized some functions for easier use and higher accuracy.
- Tiny UI upgraded from 2.0 to 3.0.

## 2.2.3 (2020-11-30)

- Patch version of 2.2.2. Released with the associated plug-in version.

## 2.2.2 (2020-10-30)

- Patch version of 2.2.1. Released with the associated plug-in version.
- Plug-in Tool Rename.

## 2.2.1 (2020-09-30)

- The first non-commercial release.
- Complete the main functions of the Dependency Advisor and Porting Advisor.
