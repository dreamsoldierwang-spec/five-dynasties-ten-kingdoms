/**
 * CHGIS 数据下载脚本
 * 从 Harvard Dataverse 下载五代十国时期的 GIS 数据
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// CHGIS V6 Dataset DOI
const CHGIS_DOI = 'doi:10.7910/DVN/8OQMSJ';
const DATAVERSE_SERVER = 'dataverse.harvard.edu';

// 五代十国关键年份数据文件
const TARGET_FILES = [
    { year: 907, name: 'v6_yr_907', description: '五代开始 - 后梁建立' },
    { year: 923, name: 'v6_yr_923', description: '后唐建立' },
    { year: 936, name: 'v6_yr_936', description: '后晋建立' },
    { year: 947, name: 'v6_yr_947', description: '后汉建立' },
    { year: 951, name: 'v6_yr_951', description: '后周建立' },
    { year: 960, name: 'v6_yr_960', description: '北宋建立 - 五代结束' }
];

// 输出目录
const OUTPUT_DIR = path.join(__dirname, 'raw');

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * 获取数据集信息
 */
function getDatasetInfo() {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: DATAVERSE_SERVER,
            path: `/api/datasets/:persistentId/?persistentId=${encodeURIComponent(CHGIS_DOI)}`,
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve(json);
                } catch (e) {
                    reject(new Error('解析响应失败: ' + e.message));
                }
            });
        });

        req.on('error', reject);
        req.end();
    });
}

/**
 * 下载文件
 */
function downloadFile(fileId, filename, outputPath) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: DATAVERSE_SERVER,
            path: `/api/access/datafile/${fileId}`,
            method: 'GET'
        };

        const file = fs.createWriteStream(outputPath);
        
        const req = https.request(options, (res) => {
            if (res.statusCode === 302 || res.statusCode === 301) {
                // 重定向
                const redirectUrl = new URL(res.headers.location);
                const redirectReq = https.request(redirectUrl, (redirectRes) => {
                    redirectRes.pipe(file);
                    file.on('finish', () => {
                        file.close();
                        resolve(outputPath);
                    });
                });
                redirectReq.on('error', reject);
                redirectReq.end();
            } else {
                res.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve(outputPath);
                });
            }
        });

        req.on('error', (err) => {
            fs.unlink(outputPath, () => {});
            reject(err);
        });

        req.end();
    });
}

/**
 * 主函数
 */
async function main() {
    console.log('===================================');
    console.log('CHGIS V6 数据下载工具');
    console.log('===================================');
    console.log('');
    console.log('正在获取数据集信息...');

    try {
        // 获取数据集信息
        const datasetInfo = await getDatasetInfo();
        
        if (datasetInfo.status !== 'OK') {
            throw new Error('获取数据集信息失败: ' + datasetInfo.message);
        }

        const files = datasetInfo.data.latestVersion.files;
        console.log(`找到 ${files.length} 个文件`);
        console.log('');

        // 查找目标文件
        for (const target of TARGET_FILES) {
            const fileInfo = files.find(f => 
                f.dataFile.filename.startsWith(target.name)
            );

            if (fileInfo) {
                console.log(`下载 ${target.year} 年数据 (${target.description})...`);
                
                const yearDir = path.join(OUTPUT_DIR, target.year.toString());
                if (!fs.existsSync(yearDir)) {
                    fs.mkdirSync(yearDir, { recursive: true });
                }

                const outputPath = path.join(yearDir, fileInfo.dataFile.filename);
                
                try {
                    await downloadFile(fileInfo.dataFile.id, fileInfo.dataFile.filename, outputPath);
                    console.log(`  ✓ 已下载: ${fileInfo.dataFile.filename}`);
                } catch (err) {
                    console.error(`  ✗ 下载失败: ${err.message}`);
                }
            } else {
                console.warn(`  ⚠ 未找到 ${target.year} 年的数据文件`);
            }
        }

        console.log('');
        console.log('下载完成！');
        console.log(`数据保存在: ${OUTPUT_DIR}`);

    } catch (error) {
        console.error('错误:', error.message);
        console.log('');
        console.log('提示: CHGIS 数据下载可能需要注册 Harvard Dataverse 账号');
        console.log('请访问 https://dataverse.harvard.edu/dataverse/chgis_v6 手动下载');
    }
}

// 运行主函数
main();
