# CHGIS V6 数据手动下载详细步骤

## 第一步：访问 Harvard Dataverse

1. 打开浏览器，访问：
   ```
   https://dataverse.harvard.edu/
   ```

2. 点击页面右上角的 **"Sign Up"** 注册账号
   - 填写邮箱、用户名、密码
   - 验证邮箱（查收验证邮件并点击链接）
   - 登录账号

## 第二步：找到 CHGIS V6 数据集

### 方法 A：直接访问（推荐）
在浏览器地址栏输入：
```
https://dataverse.harvard.edu/dataverse/chgis_v6
```

### 方法 B：搜索查找
1. 在 Harvard Dataverse 首页的搜索框输入：
   ```
   CHGIS V6
   ```
2. 点击搜索按钮
3. 找到 "CHGIS V6" 数据集并点击进入

## 第三步：下载所需文件

### 需要下载的文件列表

#### 1. 时间序列数据（最重要）
这些数据包含从秦朝到清朝的所有年份数据，包括五代十国时期。

**文件名**：`v6_time_cnty_pts_utf_wgs84.zip`
- **说明**：县级聚落点时间序列数据（UTF-8编码，WGS84坐标系）
- **大小**：约 545 KB
- **包含**：221 BCE - 1911 CE 的所有县级数据

**下载步骤**：
1. 在 CHGIS V6 页面找到 "V6 Time Series County Points" 数据集
2. 点击进入该数据集详情页
3. 在文件列表中找到 `v6_time_cnty_pts_utf_wgs84.zip`
4. 点击文件名或右侧的下载按钮
5. 等待下载完成

#### 2. 府级行政区划数据（可选但推荐）
**文件名**：`v6_time_pref_polys_utf_wgs84.zip`
- **说明**：府级行政区划边界数据
- **大小**：约 15 MB
- **包含**：府级行政区的边界多边形

#### 3. 年层数据（可选）
如果你需要特定年份的详细数据，可以下载以下文件：

| 年份 | 文件名 | 说明 |
|------|--------|------|
| 907 | `v6_yr_907_utf_wgs84.zip` | 五代开始 - 后梁建立 |
| 923 | `v6_yr_923_utf_wgs84.zip` | 后唐建立 |
| 936 | `v6_yr_936_utf_wgs84.zip` | 后晋建立 |
| 947 | `v6_yr_947_utf_wgs84.zip` | 后汉建立 |
| 951 | `v6_yr_951_utf_wgs84.zip` | 后周建立 |
| 960 | `v6_yr_960_utf_wgs84.zip` | 北宋建立 - 五代结束 |

**注意**：这些年层数据可能不存在，CHGIS V6 主要提供时间序列数据。

## 第四步：保存文件到正确位置

### 创建目录结构
在你的项目文件夹中创建以下目录：
```
e:\Code\TRAE_Project\v2026-2-6\chgis-data\
├── raw\
│   └── time_series\
└── processed\
```

### 移动下载的文件
将下载的 zip 文件移动到：
```
e:\Code\TRAE_Project\v2026-2-6\chgis-data\raw\time_series\
```

## 第五步：解压数据文件

### Windows 方法
1. 打开 `e:\Code\TRAE_Project\v2026-2-6\chgis-data\raw\time_series\`
2. 右键点击 `v6_time_cnty_pts_utf_wgs84.zip`
3. 选择 "解压到当前文件夹" 或 "Extract All"
4. 等待解压完成

### 命令行方法
打开 PowerShell 或 CMD，执行：
```powershell
cd e:\Code\TRAE_Project\v2026-2-6\chgis-data\raw\time_series
Expand-Archive -Path "v6_time_cnty_pts_utf_wgs84.zip" -DestinationPath "."
```

## 第六步：验证文件

解压后应该看到以下文件：
```
time_series/
├── v6_time_cnty_pts_utf_wgs84.shp    (几何数据)
├── v6_time_cnty_pts_utf_wgs84.shx    (索引文件)
├── v6_time_cnty_pts_utf_wgs84.dbf    (属性表)
├── v6_time_cnty_pts_utf_wgs84.prj    (投影信息)
└── v6_time_cnty_pts_utf_wgs84.cpg    (编码信息)
```

## 第七步：转换数据格式

### 安装 GDAL（如果还没安装）

#### Windows
1. 访问 https://gdal.org/download.html
2. 下载 Windows 安装包
3. 运行安装程序
4. 添加 GDAL 到系统 PATH

或使用 OSGeo4W：
1. 下载 https://www.osgeo.org/projects/osgeo4w/
2. 安装时选择 GDAL 包

#### macOS
```bash
brew install gdal
```

#### Linux
```bash
sudo apt-get install gdal-bin
```

### 转换 Shapefile 到 GeoJSON

打开终端，执行以下命令：

```bash
cd e:\Code\TRAE_Project\v2026-2-6\chgis-data

# 创建输出目录
mkdir -p processed

# 转换时间序列数据（包含所有年份）
ogr2ogr -f GeoJSON processed/chgis_time_series.geojson raw/time_series/v6_time_cnty_pts_utf_wgs84.shp

# 如果有府级数据，也转换
ogr2ogr -f GeoJSON processed/chgis_prefectures.geojson raw/time_series/v6_time_pref_polys_utf_wgs84.shp
```

**注意**：转换可能需要几分钟，因为数据量较大。

## 第八步：按年份提取数据

由于时间序列数据包含所有年份，我们需要提取五代十国时期的数据（907-960年）。

运行我提供的 Node.js 脚本：

```bash
cd e:\Code\TRAE_Project\v2026-2-6\chgis-data
node extract-by-year.js
```

这个脚本会：
1. 读取时间序列数据
2. 按年份过滤（907-960）
3. 生成每年的 GeoJSON 文件
4. 保存到 `processed/` 目录

## 第九步：更新应用配置

编辑 `data.js` 文件：

```javascript
chgis: {
    enabled: true,  // 确保设置为 true
    baseUrl: './chgis-data/processed',
    availableYears: [907, 923, 936, 947, 951, 960],
    // ... 其他配置
}
```

## 第十步：测试

1. 刷新网页
2. 拖动时间轴
3. 查看地图是否正确显示 CHGIS 数据
4. 检查浏览器控制台是否有错误

## 常见问题

### Q1: 下载速度慢或失败？
- 使用 VPN 或代理
- 尝试在不同时间段下载
- 使用下载工具（如 IDM、迅雷）

### Q2: 找不到特定年份的数据？
- CHGIS V6 时间序列数据包含所有年份
- 不需要单独下载每年的数据
- 使用 extract-by-year.js 脚本提取

### Q3: 文件解压失败？
- 检查文件是否完整下载
- 尝试使用 7-Zip 解压
- 重新下载文件

### Q4: ogr2ogr 命令找不到？
- 确保 GDAL 已正确安装
- 检查环境变量 PATH 是否包含 GDAL 路径
- 重启终端或电脑

## 数据文件说明

### 属性字段
| 字段名 | 说明 |
|--------|------|
| NAME | 地名（中文） |
| TYPE | 类型（县、府、州等） |
| START_YR | 开始年份 |
| END_YR | 结束年份 |
| LAT | 纬度 |
| LON | 经度 |

### 坐标系
- **WGS84** - 全球通用坐标系
- 经纬度格式
- 无需额外转换

## 需要帮助？

- CHGIS 官网：https://chgis.fas.harvard.edu/
- Harvard Dataverse 帮助：https://dataverse.org/
- GDAL 文档：https://gdal.org/

---

**完成以上步骤后，你的网站将使用真实的 CHGIS 历史地理数据！**
