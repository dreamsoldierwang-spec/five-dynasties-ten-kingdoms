/**
 * 创建 CHGIS 格式的示例数据
 * 用于测试和演示，基于真实历史地理信息
 */

const fs = require('fs');
const path = require('path');

// 输出目录
const OUTPUT_DIR = path.join(__dirname, 'processed');

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 五代十国时期关键年份
const KEY_YEARS = [907, 923, 936, 947, 951, 960];

// 主要城市坐标（基于历史地理位置）
const CITIES = {
    // 五代都城
    kaifeng: { name: '开封', lat: 34.8, lon: 114.3, type: 'capital' },
    luoyang: { name: '洛阳', lat: 34.6, lon: 112.4, type: 'capital' },
    taiyuan: { name: '太原', lat: 37.9, lon: 112.5, type: 'capital' },
    
    // 十国都城
    jinling: { name: '金陵', lat: 32.1, lon: 118.8, type: 'capital' },  // 南唐
    hangzhou: { name: '杭州', lat: 30.3, lon: 120.2, type: 'capital' }, // 吴越
    fuzhou: { name: '福州', lat: 26.1, lon: 119.3, type: 'capital' },   // 闽
    guangzhou: { name: '广州', lat: 23.1, lon: 113.3, type: 'capital' }, // 南汉
    chengdu: { name: '成都', lat: 30.7, lon: 104.1, type: 'capital' },   // 前后蜀
    jiangling: { name: '江陵', lat: 30.3, lon: 112.2, type: 'capital' }, // 荆南
    changsha: { name: '长沙', lat: 28.2, lon: 112.9, type: 'capital' },  // 楚
    
    // 其他重要城市
    yangzhou: { name: '扬州', lat: 32.4, lon: 119.4, type: 'city' },
    xian: { name: '长安', lat: 34.3, lon: 108.9, type: 'city' },
    beijing: { name: '幽州', lat: 39.9, lon: 116.4, type: 'city' },
    nanjing: { name: '江宁', lat: 32.1, lon: 118.8, type: 'city' }
};

// 政权疆域中心点和范围
const TERRITORIES = {
    laterLiang: {
        name: '后梁',
        center: { lat: 34.8, lon: 114.3 },
        radius: 2.5,
        color: '#8B4513',
        years: [907, 923]
    },
    laterTang: {
        name: '后唐',
        center: { lat: 36.0, lon: 113.0 },
        radius: 4.0,
        color: '#8B4513',
        years: [923, 936]
    },
    laterJin: {
        name: '后晋',
        center: { lat: 36.5, lon: 114.0 },
        radius: 3.5,
        color: '#8B4513',
        years: [936, 947]
    },
    laterHan: {
        name: '后汉',
        center: { lat: 36.5, lon: 114.0 },
        radius: 3.5,
        color: '#8B4513',
        years: [947, 951]
    },
    laterZhou: {
        name: '后周',
        center: { lat: 36.0, lon: 114.5 },
        radius: 4.0,
        color: '#8B4513',
        years: [951, 960]
    },
    wu: {
        name: '吴',
        center: { lat: 32.1, lon: 118.8 },
        radius: 2.0,
        color: '#2E8B57',
        years: [907, 937]
    },
    southernTang: {
        name: '南唐',
        center: { lat: 32.1, lon: 118.8 },
        radius: 2.5,
        color: '#2E8B57',
        years: [937, 975]
    },
    wuyue: {
        name: '吴越',
        center: { lat: 30.3, lon: 120.2 },
        radius: 1.5,
        color: '#2E8B57',
        years: [907, 978]
    },
    min: {
        name: '闽',
        center: { lat: 26.1, lon: 119.3 },
        radius: 1.5,
        color: '#2E8B57',
        years: [909, 945]
    },
    chu: {
        name: '楚',
        center: { lat: 28.2, lon: 112.9 },
        radius: 2.0,
        color: '#2E8B57',
        years: [907, 951]
    },
    southernHan: {
        name: '南汉',
        center: { lat: 23.1, lon: 113.3 },
        radius: 2.5,
        color: '#2E8B57',
        years: [917, 971]
    },
    formerShu: {
        name: '前蜀',
        center: { lat: 30.7, lon: 104.1 },
        radius: 2.5,
        color: '#2E8B57',
        years: [907, 925]
    },
    laterShu: {
        name: '后蜀',
        center: { lat: 30.7, lon: 104.1 },
        radius: 2.5,
        color: '#2E8B57',
        years: [934, 965]
    },
    jingnan: {
        name: '荆南',
        center: { lat: 30.3, lon: 112.2 },
        radius: 1.0,
        color: '#2E8B57',
        years: [924, 963]
    },
    northernHan: {
        name: '北汉',
        center: { lat: 37.9, lon: 112.5 },
        radius: 1.5,
        color: '#2E8B57',
        years: [951, 979]
    }
};

/**
 * 创建圆形多边形（模拟疆域）
 */
function createCirclePolygon(center, radius, numPoints = 32) {
    const coordinates = [];
    for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * 2 * Math.PI;
        const lat = center.lat + radius * Math.cos(angle) * 0.8; // 调整纬度比例
        const lon = center.lon + radius * Math.sin(angle);
        coordinates.push([lon, lat]);
    }
    coordinates.push(coordinates[0]); // 闭合多边形
    return [coordinates];
}

/**
 * 创建 GeoJSON Feature
 */
function createFeature(territory, year) {
    return {
        type: 'Feature',
        properties: {
            NAME: territory.name,
            TYPE: '政权',
            START_YR: territory.years[0],
            END_YR: territory.years[1],
            YEAR: year,
            COLOR: territory.color
        },
        geometry: {
            type: 'Polygon',
            coordinates: createCirclePolygon(territory.center, territory.radius)
        }
    };
}

/**
 * 创建城市点 Feature
 */
function createCityFeature(city, year) {
    return {
        type: 'Feature',
        properties: {
            NAME: city.name,
            TYPE: city.type === 'capital' ? '都城' : '城市',
            YEAR: year
        },
        geometry: {
            type: 'Point',
            coordinates: [city.lon, city.lat]
        }
    };
}

/**
 * 生成指定年份的 GeoJSON 数据
 */
function generateYearData(year) {
    const features = [];
    
    // 添加存在的政权疆域
    for (const [key, territory] of Object.entries(TERRITORIES)) {
        if (year >= territory.years[0] && year <= territory.years[1]) {
            features.push(createFeature(territory, year));
        }
    }
    
    // 添加城市点
    for (const [key, city] of Object.entries(CITIES)) {
        features.push(createCityFeature(city, year));
    }
    
    return {
        type: 'FeatureCollection',
        features: features,
        metadata: {
            year: year,
            source: 'CHGIS V6 Format Sample Data',
            description: `${year}年五代十国行政区划数据（示例）`,
            dynasty: getDynastyForYear(year),
            created: new Date().toISOString()
        }
    };
}

/**
 * 根据年份获取当前主要政权
 */
function getDynastyForYear(year) {
    if (year >= 907 && year <= 923) return 'laterLiang';
    if (year >= 923 && year <= 936) return 'laterTang';
    if (year >= 936 && year <= 947) return 'laterJin';
    if (year >= 947 && year <= 951) return 'laterHan';
    if (year >= 951 && year <= 960) return 'laterZhou';
    return 'unknown';
}

/**
 * 主函数
 */
function main() {
    console.log('===================================');
    console.log('创建 CHGIS 格式示例数据');
    console.log('===================================');
    console.log('');
    
    KEY_YEARS.forEach(year => {
        console.log(`生成 ${year} 年数据...`);
        
        const data = generateYearData(year);
        const outputPath = path.join(OUTPUT_DIR, `${year}.geojson`);
        
        fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
        
        console.log(`  ✓ 已创建: ${outputPath}`);
        console.log(`    包含 ${data.features.length} 个要素`);
        console.log('');
    });
    
    console.log('===================================');
    console.log('示例数据创建完成！');
    console.log('===================================');
    console.log('');
    console.log('数据位置:', OUTPUT_DIR);
    console.log('');
    console.log('说明:');
    console.log('- 这是基于历史地理信息的示例数据');
    console.log('- 格式符合 CHGIS 标准（GeoJSON）');
    console.log('- 可用于测试和演示');
    console.log('- 后续可替换为真实 CHGIS 数据');
    console.log('');
    console.log('要启用这些数据，请在 data.js 中设置:');
    console.log('  chgis: { enabled: true, ... }');
}

// 运行主程序
main();
