const https = require('https');
const fs = require('fs');
const path = require('path');

// 五代十国历史地图URL
const maps = [
    {
        name: 'laterLiang.png',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/%E4%BA%94%E4%BB%A3%E5%90%8E%E6%A2%81%E5%89%8D%E6%9C%9F%E5%BD%A2%E5%8A%BF%E5%9B%BE%EF%BC%88%E7%AE%80%EF%BC%89.png/980px-%E4%BA%94%E4%BB%A3%E5%90%8E%E6%A2%81%E5%89%8D%E6%9C%9F%E5%BD%A2%E5%8A%BF%E5%9B%BE%EF%BC%88%E7%AE%80%EF%BC%89.png'
    },
    {
        name: 'laterTang.png',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/%E4%BA%94%E4%BB%A3%E5%90%8E%E5%94%90%E5%89%8D%E6%9C%9F%E5%BD%A2%E5%8A%BF%E5%9B%BE%EF%BC%88%E7%AE%80%EF%BC%89.png/980px-%E4%BA%94%E4%BB%A3%E5%90%8E%E5%94%90%E5%89%8D%E6%9C%9F%E5%BD%A2%E5%8A%BF%E5%9B%BE%EF%BC%88%E7%AE%80%EF%BC%89.png'
    },
    {
        name: 'laterJinHan.png',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/%E4%BA%94%E4%BB%A3%E5%90%8E%E6%99%8B%E5%90%8E%E6%B1%89%E5%89%8D%E6%9C%9F%E5%BD%A2%E5%8A%BF%E5%9B%BE%EF%BC%88%E7%AE%80%EF%BC%89.png/980px-%E4%BA%94%E4%BB%A3%E5%90%8E%E6%99%8B%E5%90%8E%E6%B1%89%E5%89%8D%E6%9C%9F%E5%BD%A2%E5%8A%BF%E5%9B%BE%EF%BC%88%E7%AE%80%EF%BC%89.png'
    },
    {
        name: 'laterZhou.png',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/%E4%BA%94%E4%BB%A3%E5%90%8E%E5%91%A8%E5%89%8D%E6%9C%9F%E5%BD%A2%E5%8A%BF%E5%9B%BE%EF%BC%88%E7%AE%80%EF%BC%89.png/980px-%E4%BA%94%E4%BB%A3%E5%90%8E%E5%91%A8%E5%89%8D%E6%9C%9F%E5%BD%A2%E5%8A%BF%E5%9B%BE%EF%BC%88%E7%AE%80%EF%BC%89.png'
    }
];

const mapsDir = path.join(__dirname, 'maps');

// 创建maps目录
if (!fs.existsSync(mapsDir)) {
    fs.mkdirSync(mapsDir, { recursive: true });
}

function downloadFile(url, filename) {
    return new Promise((resolve, reject) => {
        const filepath = path.join(mapsDir, filename);
        const file = fs.createWriteStream(filepath);
        
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    console.log(`✓ 下载完成: ${filename}`);
                    resolve();
                });
            } else if (response.statusCode === 301 || response.statusCode === 302) {
                // 处理重定向
                const redirectUrl = response.headers.location;
                console.log(`  重定向到: ${redirectUrl}`);
                downloadFile(redirectUrl, filename).then(resolve).catch(reject);
            } else {
                reject(new Error(`HTTP ${response.statusCode}`));
            }
        }).on('error', (err) => {
            fs.unlink(filepath, () => {});
            reject(err);
        });
    });
}

async function downloadAll() {
    console.log('========================================');
    console.log('下载五代十国历史地图');
    console.log('========================================\n');
    
    for (const map of maps) {
        try {
            console.log(`下载: ${map.name}`);
            await downloadFile(map.url, map.name);
        } catch (error) {
            console.error(`✗ 下载失败 ${map.name}: ${error.message}`);
        }
    }
    
    console.log('\n========================================');
    console.log('下载完成！');
    console.log(`地图保存位置: ${mapsDir}`);
    console.log('========================================');
}

downloadAll();
