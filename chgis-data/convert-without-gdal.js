/**
 * 不使用 GDAL 直接读取 Shapefile 并转换为 GeoJSON
 * 使用 shapefile 库
 */

const fs = require('fs');
const path = require('path');

// 检查是否安装了 shapefile 库
try {
    require.resolve('shapefile');
} catch (e) {
    console.log('正在安装 shapefile 库...');
    const { execSync } = require('child_process');
    execSync('npm install shapefile', { stdio: 'inherit', cwd: __dirname });
    console.log('安装完成！');
}

const shapefile = require('shapefile');

const INPUT_FILE = path.join(__dirname, 'raw', 'time_series', 'v6_time_cnty_pts_utf_wgs84.shp');
const OUTPUT_FILE = path.join(__dirname, 'processed', 'chgis_time_series.geojson');

console.log('===================================');
console.log('Shapefile 转 GeoJSON 工具');
console.log('（无需 GDAL）');
console.log('===================================');
console.log('');

// 检查输入文件
if (!fs.existsSync(INPUT_FILE)) {
    console.error('错误：找不到 Shapefile 文件！');
    console.error(`路径: ${INPUT_FILE}`);
    process.exit(1);
}

console.log('读取 Shapefile...');

// 读取 Shapefile
shapefile.read(INPUT_FILE)
    .then(geojson => {
        console.log(`✓ 成功读取，共 ${geojson.features.length} 个要素`);
        
        // 添加元数据
        geojson.metadata = {
            source: 'CHGIS V6 Time Series',
            description: '中国历史行政区划时间序列数据',
            convertedAt: new Date().toISOString(),
            totalFeatures: geojson.features.length
        };
        
        // 确保输出目录存在
        const outputDir = path.dirname(OUTPUT_FILE);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        // 保存 GeoJSON
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(geojson, null, 2));
        
        console.log('');
        console.log('✓ 转换完成！');
        console.log(`输出文件: ${OUTPUT_FILE}`);
        console.log('');
        console.log('下一步：运行 extract-by-year.js 提取年份数据');
    })
    .catch(error => {
        console.error('转换失败:', error.message);
        process.exit(1);
    });
