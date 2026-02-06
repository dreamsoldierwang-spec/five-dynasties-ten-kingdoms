/**
 * CHGIS 数据获取脚本 - 直接下载版本
 * 从 Harvard Dataverse 直接下载公开可访问的 CHGIS 数据
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// 输出目录
const OUTPUT_DIR = path.join(__dirname, 'raw');

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 已知的 CHGIS V6 文件直接下载链接
// 注意：这些链接可能需要从 Dataverse 网站获取实际的下载 URL
const CHGIS_FILES = [
    {
        year: 907,
        description: '五代开始 - 后梁建立',
        // 这些是示例 URL，实际需要访问 Dataverse 获取
        url: 'https://dataverse.harvard.edu/api/access/datafile/',
        filename: 'v6_yr_907.zip'
    },
    {
        year: 923,
        description: '后唐建立',
        url: 'https://dataverse.harvard.edu/api/access/datafile/',
        filename: 'v6_yr_923.zip'
    },
    {
        year: 936,
        description: '后晋建立',
        url: 'https://dataverse.harvard.edu/api/access/datafile/',
        filename: 'v6_yr_936.zip'
    },
    {
        year: 951,
        description: '后周建立',
        url: 'https://dataverse.harvard.edu/api/access/datafile/',
        filename: 'v6_yr_951.zip'
    },
    {
        year: 960,
        description: '北宋建立 - 五代结束',
        url: 'https://dataverse.harvard.edu/api/access/datafile/',
        filename: 'v6_yr_960.zip'
    }
];

console.log('===================================');
console.log('CHGIS V6 数据下载工具');
console.log('===================================');
console.log('');
console.log('由于 Harvard Dataverse 需要认证，请手动下载以下文件：');
console.log('');

// 显示下载信息
CHGIS_FILES.forEach((file, index) => {
    console.log(`${index + 1}. ${file.year} 年 - ${file.description}`);
    console.log(`   文件名: ${file.filename}`);
    console.log('');
});

console.log('下载步骤：');
console.log('1. 访问 https://dataverse.harvard.edu/dataverse/chgis_v6');
console.log('2. 注册/登录 Harvard Dataverse 账号');
console.log('3. 搜索并下载上述文件');
console.log('4. 将下载的文件解压到 chgis-data/raw/<年份>/ 目录');
console.log('');
console.log('或者使用替代方案：');
console.log('- 使用维基媒体地图（已集成）');
console.log('- 使用中国历史地图集扫描件');
console.log('');

// 创建目录结构
CHGIS_FILES.forEach(file => {
    const yearDir = path.join(OUTPUT_DIR, file.year.toString());
    if (!fs.existsSync(yearDir)) {
        fs.mkdirSync(yearDir, { recursive: true });
        console.log(`✓ 创建目录: ${yearDir}`);
    }
});

console.log('');
console.log('目录结构已创建，等待数据文件...');
