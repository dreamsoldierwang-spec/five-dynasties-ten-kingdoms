/**
 * CHGIS V6 数据下载脚本
 * 使用 Harvard Dataverse API 下载公开数据
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

// CHGIS V6 时间序列数据文件（公开可访问）
const CHGIS_FILES = [
    {
        name: 'v6_time_cnty_pts_utf_wgs84.zip',
        fileId: '3048165',
        description: '县级聚落点时间序列数据 (UTF-8, WGS84)',
        doi: '10.7910/DVN/Q9VOF5'
    },
    {
        name: 'v6_time_cnty_pts_gbk_wgs84.zip',
        fileId: '3048162',
        description: '县级聚落点时间序列数据 (GBK, WGS84)',
        doi: '10.7910/DVN/Q9VOF5'
    },
    {
        name: 'CHGIS_V6_README.txt',
        fileId: '3048161',
        description: '数据说明文档',
        doi: '10.7910/DVN/Q9VOF5'
    }
];

console.log('===================================');
console.log('CHGIS V6 数据下载工具');
console.log('===================================');
console.log('');
console.log('准备下载以下文件：');
console.log('');

CHGIS_FILES.forEach((file, index) => {
    console.log(`${index + 1}. ${file.name}`);
    console.log(`   ${file.description}`);
    console.log(`   DOI: ${file.doi}`);
    console.log('');
});

console.log('下载链接（可手动复制到浏览器）：');
console.log('');

CHGIS_FILES.forEach(file => {
    const downloadUrl = `https://dataverse.harvard.edu/api/access/datafile/${file.fileId}`;
    console.log(`${file.name}:`);
    console.log(`  ${downloadUrl}`);
    console.log('');
});

console.log('===================================');
console.log('下载说明：');
console.log('===================================');
console.log('');
console.log('方法 1：直接点击链接下载（可能需要登录）');
console.log('方法 2：访问数据集页面：');
console.log('  https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/Q9VOF5');
console.log('');
console.log('方法 3：使用 Dataverse 界面浏览所有 CHGIS V6 数据：');
console.log('  https://dataverse.harvard.edu/dataverse/chgis_v6');
console.log('');

// 创建子目录
const timeSeriesDir = path.join(OUTPUT_DIR, 'time_series');
if (!fs.existsSync(timeSeriesDir)) {
    fs.mkdirSync(timeSeriesDir, { recursive: true });
}

console.log('已创建目录结构：');
console.log(`  ${timeSeriesDir}`);
console.log('');

// 尝试下载文件（公开数据可能不需要认证）
async function downloadFile(fileInfo, outputDir) {
    const url = `https://dataverse.harvard.edu/api/access/datafile/${fileInfo.fileId}`;
    const outputPath = path.join(outputDir, fileInfo.name);
    
    return new Promise((resolve, reject) => {
        console.log(`尝试下载: ${fileInfo.name}`);
        
        const req = https.get(url, { 
            headers: {
                'User-Agent': 'CHGIS-Downloader/1.0'
            }
        }, (res) => {
            // 处理重定向
            if (res.statusCode === 302 || res.statusCode === 301) {
                const redirectUrl = res.headers.location;
                console.log(`  重定向到: ${redirectUrl}`);
                
                https.get(redirectUrl, (redirectRes) => {
                    if (redirectRes.statusCode === 200) {
                        const file = fs.createWriteStream(outputPath);
                        redirectRes.pipe(file);
                        file.on('finish', () => {
                            file.close();
                            console.log(`  ✓ 下载成功: ${fileInfo.name}`);
                            resolve(outputPath);
                        });
                    } else {
                        reject(new Error(`HTTP ${redirectRes.statusCode}`));
                    }
                }).on('error', reject);
            } else if (res.statusCode === 200) {
                const file = fs.createWriteStream(outputPath);
                res.pipe(file);
                file.on('finish', () => {
                    file.close();
                    console.log(`  ✓ 下载成功: ${fileInfo.name}`);
                    resolve(outputPath);
                });
            } else {
                reject(new Error(`HTTP ${res.statusCode}`));
            }
        });
        
        req.on('error', (err) => {
            console.error(`  ✗ 下载失败: ${err.message}`);
            reject(err);
        });
        
        req.setTimeout(30000, () => {
            req.destroy();
            reject(new Error('下载超时'));
        });
    });
}

// 主函数
async function main() {
    console.log('开始尝试下载...');
    console.log('');
    
    for (const file of CHGIS_FILES) {
        try {
            await downloadFile(file, timeSeriesDir);
        } catch (error) {
            console.error(`  错误: ${error.message}`);
            console.log('  提示: 可能需要手动登录 Dataverse 后下载');
        }
        console.log('');
    }
    
    console.log('===================================');
    console.log('下载尝试完成！');
    console.log('===================================');
    console.log('');
    console.log('如果自动下载失败，请：');
    console.log('1. 访问 https://dataverse.harvard.edu/');
    console.log('2. 注册并登录账号');
    console.log('3. 搜索 "CHGIS V6 Time Series"');
    console.log('4. 手动下载所需文件');
    console.log('5. 将文件保存到 chgis-data/raw/time_series/ 目录');
}

// 运行主程序
main();
