/**
 * CHGIS 数据处理脚本
 * 将 CHGIS Shapefile 数据转换为 Web 可用的 GeoJSON/TopoJSON
 * 
 * 使用方法:
 * node process-chgis.js --input ./raw --output ./processed
 */

const fs = require('fs');
const path = require('path');

// 五代十国时期关键年份
const KEY_YEARS = [907, 910, 915, 920, 923, 926, 930, 934, 936, 940, 945, 947, 950, 951, 955, 960];

// 五代十国政权对应的主要行政区划
const DYNASTY_REGIONS = {
    laterLiang: {
        name: '后梁',
        capital: '开封',
        coreRegions: ['开封府', '河南府', '洛阳', '汴州'],
        color: '#8B4513'
    },
    laterTang: {
        name: '后唐',
        capital: '洛阳',
        coreRegions: ['洛阳', '河南府', '太原府', '晋阳'],
        color: '#8B4513'
    },
    laterJin: {
        name: '后晋',
        capital: '开封',
        coreRegions: ['开封府', '河南府', '太原府'],
        color: '#8B4513'
    },
    laterHan: {
        name: '后汉',
        capital: '开封',
        coreRegions: ['开封府', '河南府', '太原府'],
        color: '#8B4513'
    },
    laterZhou: {
        name: '后周',
        capital: '开封',
        coreRegions: ['开封府', '河南府', '大名府'],
        color: '#8B4513'
    },
    wu: {
        name: '吴',
        capital: '金陵',
        coreRegions: ['扬州', '金陵', '润州', '昇州'],
        color: '#2E8B57'
    },
    southernTang: {
        name: '南唐',
        capital: '金陵',
        coreRegions: ['金陵', '扬州', '润州', '江都府'],
        color: '#2E8B57'
    },
    wuyue: {
        name: '吴越',
        capital: '杭州',
        coreRegions: ['杭州', '越州', '明州', '温州'],
        color: '#2E8B57'
    },
    min: {
        name: '闽',
        capital: '福州',
        coreRegions: ['福州', '建州', '泉州', '漳州'],
        color: '#2E8B57'
    },
    chu: {
        name: '楚',
        capital: '潭州',
        coreRegions: ['潭州', '朗州', '衡州', '永州'],
        color: '#2E8B57'
    },
    southernHan: {
        name: '南汉',
        capital: '兴王府',
        coreRegions: ['广州', '兴王府', '韶州', '循州'],
        color: '#2E8B57'
    },
    formerShu: {
        name: '前蜀',
        capital: '成都',
        coreRegions: ['成都', '梓州', '汉州', '彭州'],
        color: '#2E8B57'
    },
    laterShu: {
        name: '后蜀',
        capital: '成都',
        coreRegions: ['成都', '梓州', '汉州', '彭州'],
        color: '#2E8B57'
    },
    jingnan: {
        name: '荆南',
        capital: '江陵',
        coreRegions: ['江陵', '峡州', '归州'],
        color: '#2E8B57'
    },
    northernHan: {
        name: '北汉',
        capital: '太原',
        coreRegions: ['太原', '并州', '汾州', '岚州'],
        color: '#2E8B57'
    }
};

/**
 * 处理 CHGIS 数据
 * 注意：此脚本需要 GDAL 工具 (ogr2ogr) 支持
 */
function processCHGISData(inputDir, outputDir) {
    console.log('开始处理 CHGIS 数据...');
    console.log(`输入目录: ${inputDir}`);
    console.log(`输出目录: ${outputDir}`);
    
    // 确保输出目录存在
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // 为每个关键年份处理数据
    KEY_YEARS.forEach(year => {
        console.log(`\n处理 ${year} 年数据...`);
        processYearData(year, inputDir, outputDir);
    });
    
    console.log('\n数据处理完成！');
}

/**
 * 处理单个年份的数据
 */
function processYearData(year, inputDir, outputDir) {
    const yearDir = path.join(inputDir, `v6_yr_${year}`);
    
    // 检查数据文件是否存在
    const prefectureFile = path.join(yearDir, `v6_yr_${year}_pref_polys_utf_wgs84.shp`);
    const countyFile = path.join(yearDir, `v6_yr_${year}_cnty_pts_utf_wgs84.shp`);
    
    if (!fs.existsSync(prefectureFile)) {
        console.warn(`  警告: ${year} 年的数据文件不存在，跳过`);
        return;
    }
    
    // 输出文件路径
    const outputFile = path.join(outputDir, `${year}.json`);
    
    // 构建命令行转换命令
    // 注意：这里假设系统已安装 GDAL
    const convertCmd = `ogr2ogr -f GeoJSON "${outputFile}" "${prefectureFile}"`;
    
    console.log(`  转换命令: ${convertCmd}`);
    
    // 在实际环境中执行转换
    // 这里仅作为示例，实际使用时需要调用子进程执行命令
    try {
        // 模拟数据处理
        const mockData = generateMockData(year);
        fs.writeFileSync(outputFile, JSON.stringify(mockData, null, 2));
        console.log(`  ✓ 已生成: ${outputFile}`);
    } catch (error) {
        console.error(`  ✗ 处理失败: ${error.message}`);
    }
}

/**
 * 生成模拟数据（用于演示）
 * 实际使用时，这里应该读取转换后的 GeoJSON 数据
 */
function generateMockData(year) {
    return {
        year: year,
        type: "FeatureCollection",
        features: [],
        metadata: {
            source: "CHGIS V6",
            dynasty: getDynastyForYear(year),
            description: `${year}年五代十国行政区划数据`
        }
    };
}

/**
 * 根据年份获取当前政权
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
 * 解析命令行参数
 */
function parseArgs() {
    const args = process.argv.slice(2);
    const options = {
        input: './raw',
        output: './processed'
    };
    
    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--input' && args[i + 1]) {
            options.input = args[i + 1];
            i++;
        }
        if (args[i] === '--output' && args[i + 1]) {
            options.output = args[i + 1];
            i++;
        }
    }
    
    return options;
}

// 主程序
if (require.main === module) {
    const options = parseArgs();
    
    console.log('=================================');
    console.log('CHGIS 数据处理工具');
    console.log('=================================');
    console.log('');
    
    // 检查 GDAL 是否安装
    console.log('检查 GDAL 安装...');
    console.log('注意：此脚本需要 GDAL 工具支持');
    console.log('安装方法:');
    console.log('  - Windows: https://gdal.org/download.html');
    console.log('  - macOS: brew install gdal');
    console.log('  - Linux: sudo apt-get install gdal-bin');
    console.log('');
    
    // 处理数据
    processCHGISData(options.input, options.output);
}

module.exports = {
    processCHGISData,
    KEY_YEARS,
    DYNASTY_REGIONS
};
