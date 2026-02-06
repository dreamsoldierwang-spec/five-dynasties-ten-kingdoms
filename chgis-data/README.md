# CHGIS 数据集成指南

## 数据来源
CHGIS (China Historical Geographic Information System)
- 官方网站: https://chgis.fas.harvard.edu/
- 数据下载: https://dataverse.harvard.edu/dataverse/chgis_v6

## 五代十国时期数据

### 1. 需要下载的数据文件
从 Harvard Dataverse 下载以下文件：

#### 时间序列数据 (Time Series Data)
- `v6_time_cnty_pts_utf_wgs84.zip` - 县级聚落点时间序列数据
- `v6_time_pref_pts_utf_wgs84.zip` - 府级聚落点时间序列数据
- `v6_time_pref_polys_utf_wgs84.zip` - 府级行政区划边界数据

#### 年层数据 (Year Layer Data)
- `v6_yr_907.zip` - 907年数据（五代开始）
- `v6_yr_923.zip` - 923年数据（后唐建立）
- `v6_yr_936.zip` - 936年数据（后晋建立）
- `v6_yr_947.zip` - 947年数据（后汉建立）
- `v6_yr_951.zip` - 951年数据（后周建立）
- `v6_yr_960.zip` - 960年数据（北宋建立，五代结束）

### 2. 数据处理步骤

#### 步骤1: 下载并解压数据
```bash
# 下载后解压到 chgis-raw/ 目录
unzip v6_yr_907.zip -d chgis-raw/907/
unzip v6_yr_923.zip -d chgis-raw/923/
# ... 其他年份
```

#### 步骤2: 转换为 GeoJSON (使用 QGIS 或 GDAL)
```bash
# 使用 ogr2ogr 转换 Shapefile 到 GeoJSON
ogr2ogr -f GeoJSON 907_cnty.geojson chgis-raw/907/v6_yr_907_cnty_pts_utf_wgs84.shp
ogr2ogr -f GeoJSON 907_pref.geojson chgis-raw/907/v6_yr_907_pref_polys_utf_wgs84.shp
```

#### 步骤3: 简化数据 (用于 Web 展示)
```bash
# 使用 mapshaper 简化几何数据
npm install -g mapshaper
mapshaper 907_pref.geojson -simplify 10% -o 907_pref_simplified.geojson
```

#### 步骤4: 转换为 TopoJSON (更小的文件)
```bash
# 使用 topojson 工具
npm install -g topojson
geo2topo -o 907.topojson 907_pref_simplified.geojson
```

### 3. 数据字段说明

#### 聚落点数据 (Points)
- `NAME` - 地名
- `TYPE` - 类型（县、府、州等）
- `START_YR` - 开始年份
- `END_YR` - 结束年份
- `LAT` - 纬度
- `LON` - 经度

#### 行政区划数据 (Polygons)
- `NAME` - 行政区名称
- `TYPE` - 类型（府、州、军等）
- `START_YR` - 开始年份
- `END_YR` - 结束年份
- `geometry` - 边界几何数据

### 4. 五代十国时期特殊说明

CHGIS 数据主要覆盖：
- 唐朝末年（907年前）
- 五代时期（907-960年）
- 北宋初期（960年后）

注意：CHGIS 对五代十国时期的覆盖可能不如唐、宋完整，因为：
1. 五代更迭频繁，行政区划变化快
2. 十国割据，部分地区数据不完整
3. 历史文献记载有限

### 5. 替代方案

如果 CHGIS 数据不完整，可以结合：
1. **谭其骧《中国历史地图集》** - 第五册（隋唐五代）
2. **维基媒体地图** - 已集成到当前项目
3. **手动数字化** - 从纸质地图数字化边界

### 6. 自动化脚本

提供了 `process-chgis.js` 脚本来自动处理数据：

```bash
node process-chgis.js --input ./chgis-raw --output ./maps
```

### 7. 数据引用规范

使用 CHGIS 数据时请注明：
```
数据来源：CHGIS, Version 6, Harvard University & Fudan University, 2021.
```

## 当前项目状态

由于 CHGIS 数据下载和处理需要较长时间，当前项目使用维基媒体 Commons 的历史地图作为临时方案。

要切换到 CHGIS 数据，需要：
1. 下载 CHGIS V6 数据
2. 运行处理脚本
3. 更新地图显示逻辑
