# CHGIS 数据集成完整指南

## 当前状态

由于 Harvard Dataverse 需要注册认证，自动下载受阻。已创建目录结构，等待手动下载数据。

## 方案一：手动下载 CHGIS 数据（推荐）

### 步骤 1：注册 Harvard Dataverse
1. 访问 https://dataverse.harvard.edu/
2. 点击右上角 "Sign Up" 注册账号
3. 验证邮箱并登录

### 步骤 2：下载数据文件

CHGIS V6 数据分为多个数据集，你需要下载以下数据集：

#### 数据集 1：时间序列县级聚落点（推荐）
**访问链接**: https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/Q9VOF5

**下载文件**:
- `v6_time_cnty_pts_utf_wgs84.zip` (UTF-8 编码，WGS84 坐标系) ⭐ 推荐
- 或 `v6_time_cnty_pts_gbk_wgs84.zip` (GBK 编码)

**包含内容**: 从秦朝到清朝的县级聚落点时间序列数据（221 BCE - 1911 CE）

#### 数据集 2：时间序列府级行政区划
**访问链接**: 在 CHGIS V6 数据仓库中搜索 "Time Series Prefecture"

**下载文件**:
- `v6_time_pref_polys_utf_wgs84.zip` (府级行政区划边界)
- `v6_time_pref_pts_utf_wgs84.zip` (府级聚落点)

#### 数据集 3：年层数据（Year Layers）
**访问链接**: https://dataverse.harvard.edu/dataverse/chgis_v6

**搜索并下载以下年份数据**:
| 年份 | 文件名 | 说明 |
|------|--------|------|
| 907 | `v6_yr_907_utf_wgs84.zip` | 五代开始 - 后梁建立 |
| 923 | `v6_yr_923_utf_wgs84.zip` | 后唐建立 |
| 936 | `v6_yr_936_utf_wgs84.zip` | 后晋建立 |
| 947 | `v6_yr_947_utf_wgs84.zip` | 后汉建立 |
| 951 | `v6_yr_951_utf_wgs84.zip` | 后周建立 |
| 960 | `v6_yr_960_utf_wgs84.zip` | 北宋建立 - 五代结束 |

**注意**: 如果找不到单独的年份文件，可以使用**时间序列数据**，它包含了所有年份的数据。

3. 下载后保存到对应目录：
   ```
   chgis-data/
   ├── raw/
   │   ├── time_series/
   │   │   ├── v6_time_cnty_pts_utf_wgs84.zip
   │   │   └── v6_time_pref_polys_utf_wgs84.zip
   │   └── year_layers/
   │       ├── v6_yr_907_utf_wgs84.zip
   │       ├── v6_yr_923_utf_wgs84.zip
   │       └── ...
   ```

### 步骤 3：解压数据
```bash
cd chgis-data/raw
unzip 907/v6_yr_907.zip -d 907/
unzip 923/v6_yr_923.zip -d 923/
# ... 其他年份
```

### 步骤 4：安装 GDAL

#### Windows
1. 下载 GDAL 安装包：https://gdal.org/download.html
2. 或使用 OSGeo4W 安装器
3. 添加环境变量

#### macOS
```bash
brew install gdal
```

#### Linux
```bash
sudo apt-get install gdal-bin
```

### 步骤 5：转换数据格式
```bash
cd chgis-data

# 转换 907 年数据
ogr2ogr -f GeoJSON processed/907_pref.geojson raw/907/v6_yr_907_pref_polys_utf_wgs84.shp
ogr2ogr -f GeoJSON processed/907_cnty.geojson raw/907/v6_yr_907_cnty_pts_utf_wgs84.shp

# 转换其他年份...
```

### 步骤 6：简化数据（可选）
```bash
# 安装 mapshaper
npm install -g mapshaper

# 简化几何数据
mapshaper processed/907_pref.geojson -simplify 10% -o processed/907_pref_simple.geojson
```

### 步骤 7：启用 CHGIS 数据
修改 `data.js`：
```javascript
chgis: {
    enabled: true,  // 改为 true
    // ...
}
```

## 方案二：使用替代数据源

### 替代 1：中国历史地图集（谭其骧）
- **优点**：最权威的中国历史地图
- **缺点**：需要购买纸质版或扫描件
- **获取**：图书馆、书店或在线资源

### 替代 2：维基媒体地图（已集成）
- **优点**：免费、易获取、已集成
- **缺点**：精度不如 CHGIS
- **状态**：✅ 当前正在使用

### 替代 3：地图书平台
- **网址**：https://www.ditushu.com/
- **优点**：已整合 CHGIS 部分数据
- **获取**：直接下载 GeoJSON 格式

## 方案三：使用模拟 CHGIS 数据

如果暂时无法获取真实 CHGIS 数据，可以：

1. 使用现有的维基媒体地图
2. 手动创建简化的 GeoJSON 数据
3. 后续替换为真实 CHGIS 数据

## 数据文件说明

### Shapefile 文件组成
每个年份的数据包含：
- `.shp` - 几何数据
- `.shx` - 索引文件
- `.dbf` - 属性表
- `.prj` - 投影信息
- `.cpg` - 编码信息

### 主要数据表

#### 府级行政区划 (pref_polys)
- `NAME` - 府名
- `TYPE` - 类型（府、州、军等）
- `START_YR` - 开始年份
- `END_YR` - 结束年份
- `geometry` - 边界多边形

#### 县级聚落点 (cnty_pts)
- `NAME` - 县名
- `TYPE` - 类型（县、镇等）
- `LAT` - 纬度
- `LON` - 经度
- `START_YR` - 开始年份
- `END_YR` - 结束年份

## 技术实现

### 前端渲染
使用 D3.js 或 Leaflet 渲染 GeoJSON 数据：

```javascript
// 加载 GeoJSON
d3.json('chgis-data/processed/907_pref.geojson')
  .then(data => {
    // 渲染地图
    svg.selectAll('path')
      .data(data.features)
      .enter()
      .append('path')
      .attr('d', pathGenerator)
      .attr('fill', d => getColor(d.properties.TYPE));
  });
```

### 坐标系转换
CHGIS 使用 WGS84 坐标系，直接使用即可。

## 注意事项

1. **数据版权**：CHGIS 数据采用 CC0 协议，可自由使用
2. **引用规范**：使用时请注明 "CHGIS, Version 6, Harvard University & Fudan University"
3. **数据精度**：五代十国时期数据可能不如唐宋完整
4. **文件大小**：原始 Shapefile 较大，建议简化后使用

## 已完成的工作

✅ 创建目录结构
✅ 编写数据处理脚本
✅ 集成 CHGIS 配置到 data.js
✅ 提供完整文档

## 下一步

1. 手动下载 CHGIS 数据（推荐）
2. 或使用替代方案
3. 运行数据处理脚本
4. 测试地图显示

---

**需要帮助？**
- CHGIS 官网：https://chgis.fas.harvard.edu/
- Dataverse 帮助：https://dataverse.org/
- GDAL 文档：https://gdal.org/
