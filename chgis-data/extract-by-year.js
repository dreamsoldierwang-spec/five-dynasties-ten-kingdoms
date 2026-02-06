/**
 * 从 CHGIS 时间序列数据中提取指定年份的数据
 * 生成每年的 GeoJSON 文件
 */

const fs = require('fs');
const path = require('path');

// 配置
const INPUT_FILE = path.join(__dirname, 'processed', 'chgis_time_series.geojson');
const OUTPUT_DIR = path.join(__dirname, 'processed');
const START_YEAR = 907;
const END_YEAR = 960;

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log('===================================');
console.log('CHGIS 数据年份提取工具');
console.log('===================================');
console.log('');

// 检查输入文件是否存在
if (!fs.existsSync(INPUT_FILE)) {
    console.error('错误：找不到输入文件！');
    console.error(`路径: ${INPUT_FILE}`);
    console.log('');
    console.log('请先运行 GDAL 转换命令：');
    console.log('  ogr2ogr -f GeoJSON processed/chgis_time_series.geojson raw/time_series/v6_time_cnty_pts_utf_wgs84.shp');
    process.exit(1);
}

console.log('读取时间序列数据...');

// 读取 GeoJSON 文件
let geojson;
try {
    const data = fs.readFileSync(INPUT_FILE, 'utf8');
    geojson = JSON.parse(data);
    console.log(`✓ 成功读取，共 ${geojson.features.length} 个要素`);
} catch (error) {
    console.error('读取文件失败:', error.message);
    process.exit(1);
}

console.log('');
console.log(`提取 ${START_YEAR}-${END_YEAR} 年的数据...`);
console.log('');

// 为每个年份提取数据
for (let year = START_YEAR; year <= END_YEAR; year++) {
    // 过滤该年份存在的要素
    const yearFeatures = geojson.features.filter(feature => {
        const startYear = feature.properties.START_YR || feature.properties.start_yr;
        const endYear = feature.properties.END_YR || feature.properties.end_yr;
        
        // 检查年份是否在要素的有效期内
        return year >= startYear && year <= endYear;
    });
    
    // 创建该年份的 GeoJSON
    const yearGeoJSON = {
        type: 'FeatureCollection',
        features: yearFeatures,
        metadata: {
            year: year,
            source: 'CHGIS V6 Time Series',
            description: `${year}年中国历史行政区划数据`,
            totalFeatures: yearFeatures.length,
            extractedAt: new Date().toISOString()
        }
    };
    
    // 保存文件
    const outputFile = path.join(OUTPUT_DIR, `${year}.geojson`);
    fs.writeFileSync(outputFile, JSON.stringify(yearGeoJSON, null, 2));
    
    console.log(`${year}年: ${yearFeatures.length.toString().padStart(3)} 个要素 → ${path.basename(outputFile)}`);
}

console.log('');
console.log('===================================');
console.log('提取完成！');
console.log('===================================');
console.log('');
console.log(`输出目录: ${OUTPUT_DIR}`);
console.log(`年份范围: ${START_YEAR}-${END_YEAR}`);
console.log('');
console.log('提示:');
console.log('- 这些文件将替换之前的示例数据');
console.log('- 刷新网页即可看到真实的 CHGIS 数据');
console.log('- 数据包含县级聚落点，可用于精确的历史地理分析');
