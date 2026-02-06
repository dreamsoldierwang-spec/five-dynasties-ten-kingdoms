// 五代十国历史展示应用
class FiveDynastiesApp {
    constructor() {
        this.currentYear = 907;
        this.selectedKingdom = null;
        this.isDragging = false;
        this.startX = 0;
        this.startLeft = 0;
        
        this.init();
    }
    
    init() {
        this.cacheElements();
        this.bindEvents();
        this.initTimeline();
        this.updateDisplay();
    }
    
    cacheElements() {
        // 时间轴元素
        this.timelineTrack = document.getElementById('timelineTrack');
        this.timelineScale = document.getElementById('timelineScale');
        this.timelineSlider = document.getElementById('timelineSlider');
        this.sliderTooltip = document.getElementById('sliderTooltip');
        this.timelineEvents = document.getElementById('timelineEvents');
        
        // 地图元素
        this.historicalMap = document.getElementById('historicalMap');
        this.mapLoading = document.getElementById('mapLoading');
        this.mapOverlay = document.getElementById('mapOverlay');
        this.territoriesGroup = document.getElementById('territories');
        this.periodBadge = document.getElementById('periodBadge');
        this.yearDisplay = document.getElementById('yearDisplay');
        
        // 详情元素
        this.detailYear = document.getElementById('detailYear');
        this.eraName = document.getElementById('eraName');
        this.dynastyBadge = document.getElementById('dynastyBadge');
        this.rulerName = document.getElementById('rulerName');
        this.rulerTitle = document.getElementById('rulerTitle');
        this.capitalName = document.getElementById('capitalName');
        this.eventContent = document.getElementById('eventContent');
        this.historyContent = document.getElementById('historyContent');
        
        // 列表元素
        this.kingdomCount = document.getElementById('kingdomCount');
        this.eventHighlight = document.getElementById('eventHighlight');
        this.kingdomList = document.getElementById('kingdomList');
    }
    
    bindEvents() {
        // 时间轴拖动事件
        this.timelineSlider.addEventListener('mousedown', this.onSliderMouseDown.bind(this));
        document.addEventListener('mousemove', this.onSliderMouseMove.bind(this));
        document.addEventListener('mouseup', this.onSliderMouseUp.bind(this));
        
        // 触摸事件支持
        this.timelineSlider.addEventListener('touchstart', this.onSliderTouchStart.bind(this));
        document.addEventListener('touchmove', this.onSliderTouchMove.bind(this));
        document.addEventListener('touchend', this.onSliderTouchEnd.bind(this));
        
        // 点击时间轴跳转
        this.timelineTrack.addEventListener('click', this.onTimelineClick.bind(this));
        
        // 窗口大小改变
        window.addEventListener('resize', this.onWindowResize.bind(this));
    }
    
    initTimeline() {
        const { startYear, endYear } = window.historyData;
        const totalYears = endYear - startYear;
        
        // 生成年份刻度
        let scaleHTML = '';
        for (let year = startYear; year <= endYear; year += 2) {
            const position = ((year - startYear) / totalYears) * 100;
            const isMajor = year % 5 === 0;
            scaleHTML += `
                <div class="scale-mark ${isMajor ? 'major' : ''}" style="left: ${position}%">
                    <span class="scale-label">${year}</span>
                </div>
            `;
        }
        this.timelineScale.innerHTML = scaleHTML;
        
        // 生成事件标记
        let eventsHTML = '';
        for (const [year, event] of Object.entries(window.historyData.events)) {
            const yearNum = parseInt(year);
            if (yearNum >= startYear && yearNum <= endYear) {
                const position = ((yearNum - startYear) / totalYears) * 100;
                eventsHTML += `
                    <div class="timeline-event ${event.type}" style="left: ${position}%" data-year="${year}"></div>
                `;
            }
        }
        this.timelineEvents.innerHTML = eventsHTML;
        
        // 设置滑块初始位置
        this.updateSliderPosition();
    }
    
    updateSliderPosition() {
        const { startYear, endYear } = window.historyData;
        const totalYears = endYear - startYear;
        const position = ((this.currentYear - startYear) / totalYears) * 100;
        this.timelineSlider.style.left = `${position}%`;
        this.sliderTooltip.textContent = this.currentYear;
    }
    
    // 鼠标事件处理
    onSliderMouseDown(e) {
        this.isDragging = true;
        this.startX = e.clientX;
        this.startLeft = parseFloat(this.timelineSlider.style.left) || 0;
        this.timelineSlider.classList.add('dragging');
        e.preventDefault();
    }
    
    onSliderMouseMove(e) {
        if (!this.isDragging) return;
        
        const trackRect = this.timelineTrack.getBoundingClientRect();
        const deltaX = e.clientX - this.startX;
        const deltaPercent = (deltaX / trackRect.width) * 100;
        let newLeft = this.startLeft + deltaPercent;
        
        // 限制范围
        newLeft = Math.max(0, Math.min(100, newLeft));
        
        // 计算年份
        const { startYear, endYear } = window.historyData;
        const totalYears = endYear - startYear;
        this.currentYear = Math.round(startYear + (newLeft / 100) * totalYears);
        
        this.updateSliderPosition();
        this.updateDisplay();
    }
    
    onSliderMouseUp() {
        if (this.isDragging) {
            this.isDragging = false;
            this.timelineSlider.classList.remove('dragging');
        }
    }
    
    // 触摸事件处理
    onSliderTouchStart(e) {
        this.isDragging = true;
        this.startX = e.touches[0].clientX;
        this.startLeft = parseFloat(this.timelineSlider.style.left) || 0;
        this.timelineSlider.classList.add('dragging');
    }
    
    onSliderTouchMove(e) {
        if (!this.isDragging) return;
        e.preventDefault();
        
        const trackRect = this.timelineTrack.getBoundingClientRect();
        const deltaX = e.touches[0].clientX - this.startX;
        const deltaPercent = (deltaX / trackRect.width) * 100;
        let newLeft = this.startLeft + deltaPercent;
        
        newLeft = Math.max(0, Math.min(100, newLeft));
        
        const { startYear, endYear } = window.historyData;
        const totalYears = endYear - startYear;
        this.currentYear = Math.round(startYear + (newLeft / 100) * totalYears);
        
        this.updateSliderPosition();
        this.updateDisplay();
    }
    
    onSliderTouchEnd() {
        if (this.isDragging) {
            this.isDragging = false;
            this.timelineSlider.classList.remove('dragging');
        }
    }
    
    // 点击时间轴跳转
    onTimelineClick(e) {
        if (e.target.closest('.timeline-slider')) return;
        
        const trackRect = this.timelineTrack.getBoundingClientRect();
        const clickX = e.clientX - trackRect.left;
        const percent = (clickX / trackRect.width) * 100;
        
        const { startYear, endYear } = window.historyData;
        const totalYears = endYear - startYear;
        this.currentYear = Math.round(startYear + (percent / 100) * totalYears);
        
        this.updateSliderPosition();
        this.updateDisplay();
    }
    
    onWindowResize() {
        this.updateSliderPosition();
    }
    
    // 更新显示
    updateDisplay() {
        this.updateMap();
        this.updateDetail();
        this.updateKingdomList();
    }
    
    // 更新地图
    updateMap() {
        const kingdoms = window.getExistingKingdoms(this.currentYear);
        
        // 更新时期标签
        this.periodBadge.textContent = window.getPeriodName(this.currentYear);
        this.yearDisplay.textContent = `公元 ${this.currentYear} 年`;
        
        // 更新地图背景
        this.updateHistoricalMap();
        
        // 更新交互覆盖层
        this.updateMapOverlay(kingdoms);
    }
    
    // 更新历史地图图片
    updateHistoricalMap() {
        const mapConfig = window.historyData.getMapConfigForYear(this.currentYear);
        const mapUrl = mapConfig.url;
        
        // 显示加载状态
        this.mapLoading.classList.add('active');
        this.historicalMap.classList.add('loading');
        this.historicalMap.style.display = 'block';
        
        // 创建新图片对象来预加载
        const img = new Image();
        img.onload = () => {
            this.historicalMap.src = mapUrl;
            this.historicalMap.classList.remove('loading');
            this.mapLoading.classList.remove('active');
            this.historicalMap.style.display = 'block';
        };
        img.onerror = () => {
            console.warn('历史地图加载失败，使用简化地图');
            // 如果历史地图加载失败，隐藏图片并显示提示
            this.historicalMap.style.display = 'none';
            this.mapLoading.classList.remove('active');
            this.showMapFallback(mapConfig);
        };
        img.src = mapUrl;
    }
    
    // 显示地图加载失败的备用方案
    showMapFallback(mapConfig) {
        // 在地图区域显示提示信息
        const mapSection = document.querySelector('.map-section');
        let fallbackDiv = mapSection.querySelector('.map-fallback');
        
        if (!fallbackDiv) {
            fallbackDiv = document.createElement('div');
            fallbackDiv.className = 'map-fallback';
            fallbackDiv.innerHTML = `
                <div class="fallback-content">
                    <div class="fallback-icon">🗺️</div>
                    <div class="fallback-text">历史地图加载中...</div>
                    <div class="fallback-hint">请下载地图文件到 maps/ 文件夹</div>
                </div>
            `;
            mapSection.appendChild(fallbackDiv);
        }
        
        // 显示备用提示
        fallbackDiv.style.display = 'flex';
    }
    
    // 更新地图交互覆盖层
    updateMapOverlay(kingdoms) {
        // 清空现有覆盖层
        this.territoriesGroup.innerHTML = '';
        
        // 绘制每个国家的疆域
        kingdoms.forEach(kingdom => {
            const territory = window.historyData.territories[kingdom.id];
            if (territory) {
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d', territory.path);
                path.setAttribute('class', 'territory');
                path.setAttribute('data-kingdom', kingdom.id);
                // 加深填充颜色，降低透明度使颜色更明显
                path.setAttribute('fill', kingdom.color + '80'); 
                // 加粗边框，使用更深的颜色
                path.setAttribute('stroke', this.darkenColor(kingdom.color, 30));
                path.setAttribute('stroke-width', '3');
                
                // 如果是选中的政权，高亮显示
                if (this.selectedKingdom && this.selectedKingdom.id === kingdom.id) {
                    path.setAttribute('stroke', '#f4d03f');
                    path.setAttribute('stroke-width', '5');
                    path.setAttribute('fill', 'rgba(244, 208, 63, 0.5)');
                }
                
                // 点击事件
                path.addEventListener('click', () => {
                    this.selectedKingdom = kingdom;
                    this.updateDisplay();
                });
                
                // 悬停效果
                path.addEventListener('mouseenter', () => {
                    path.setAttribute('opacity', '0.8');
                });
                path.addEventListener('mouseleave', () => {
                    path.setAttribute('opacity', '1');
                });
                
                // 添加提示
                const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
                title.textContent = `${kingdom.name} - ${kingdom.capital}`;
                path.appendChild(title);
                
                this.territoriesGroup.appendChild(path);
                
                // 添加国家名称标签
                const labelPos = this.getLabelPosition(territory.path);
                if (labelPos) {
                    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    text.setAttribute('x', labelPos.x);
                    text.setAttribute('y', labelPos.y);
                    text.setAttribute('text-anchor', 'middle');
                    text.setAttribute('fill', '#ffffff');
                    text.setAttribute('font-size', '16');
                    text.setAttribute('font-weight', 'bold');
                    text.setAttribute('class', 'territory-label');
                    text.style.pointerEvents = 'none';
                    text.style.textShadow = '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 0 0 4px rgba(0,0,0,0.9)';
                    text.textContent = kingdom.name;
                    this.territoriesGroup.appendChild(text);
                }
            }
        });
    }
    
    // 计算标签位置（路径中心点）
    getLabelPosition(pathD) {
        // 简化的中心点计算
        const matches = pathD.match(/(\d+(?:\.\d+)?),(\d+(?:\.\d+)?)/g);
        if (!matches || matches.length === 0) return null;
        
        let sumX = 0, sumY = 0, count = 0;
        matches.forEach(match => {
            const [x, y] = match.split(',').map(Number);
            sumX += x;
            sumY += y;
            count++;
        });
        
        return { x: sumX / count, y: sumY / count };
    }
    
    // 加深颜色辅助函数
    darkenColor(color, percent) {
        // 移除#号
        color = color.replace('#', '');
        
        // 解析RGB
        let r = parseInt(color.substring(0, 2), 16);
        let g = parseInt(color.substring(2, 4), 16);
        let b = parseInt(color.substring(4, 6), 16);
        
        // 加深颜色
        r = Math.floor(r * (100 - percent) / 100);
        g = Math.floor(g * (100 - percent) / 100);
        b = Math.floor(b * (100 - percent) / 100);
        
        // 确保值在0-255范围内
        r = Math.max(0, Math.min(255, r));
        g = Math.max(0, Math.min(255, g));
        b = Math.max(0, Math.min(255, b));
        
        // 转换回16进制
        return '#' + 
            r.toString(16).padStart(2, '0') +
            g.toString(16).padStart(2, '0') +
            b.toString(16).padStart(2, '0');
    }
    
    // 更新详情面板
    updateDetail() {
        const yearDetails = window.getYearDetails(this.currentYear);
        const currentDynasty = window.getCurrentDynasty(this.currentYear);
        const kingdomToShow = this.selectedKingdom || currentDynasty;
        
        // 更新年份
        this.detailYear.textContent = this.currentYear;
        
        if (yearDetails) {
            this.eraName.textContent = yearDetails.eraName;
        } else if (currentDynasty) {
            const ruler = window.getCurrentRuler(this.currentYear, currentDynasty);
            if (ruler && ruler.eraNames) {
                this.eraName.textContent = ruler.eraNames[0] + '年间';
            } else {
                this.eraName.textContent = '';
            }
        } else {
            this.eraName.textContent = '';
        }
        
        if (kingdomToShow) {
            const ruler = window.getCurrentRuler(this.currentYear, kingdomToShow);
            
            this.dynastyBadge.textContent = kingdomToShow.name;
            this.dynastyBadge.style.background = kingdomToShow.color;
            
            if (ruler) {
                this.rulerName.textContent = ruler.name;
                this.rulerTitle.textContent = ruler.title ? `(${ruler.title})` : '';
                
                // 添加皇帝详细信息
                this.updateRulerDetails(ruler);
            } else {
                this.rulerName.textContent = '未知';
                this.rulerTitle.textContent = '';
                this.clearRulerDetails();
            }
            
            this.capitalName.textContent = kingdomToShow.capital;
            
            // 更新事件内容
            if (yearDetails) {
                this.eventContent.innerHTML = `
                    <div class="event-title">${yearDetails.eventTitle || '无重大事件'}</div>
                    ${yearDetails.eventRuler ? `<div class="event-ruler">关键人物: ${yearDetails.eventRuler}</div>` : ''}
                    ${yearDetails.eventDesc ? `<div class="event-desc">${yearDetails.eventDesc}</div>` : ''}
                `;
                
                this.historyContent.innerHTML = `
                    <div class="history-item">
                        <span class="history-tag">${yearDetails.historyTag || '历史记载'}</span>
                        <span class="history-ruler">${yearDetails.historyRuler || ''}</span>
                    </div>
                    ${yearDetails.historyDesc ? `<div class="history-desc">${yearDetails.historyDesc}</div>` : ''}
                `;
            } else {
                // 生成默认内容
                const event = window.getYearEvents(this.currentYear);
                if (event) {
                    this.eventContent.innerHTML = `
                        <div class="event-title">${event.type === 'establish' ? '建立' : event.type === 'fall' ? '灭亡' : '重大事件'}</div>
                        <div class="event-desc">${event.desc}</div>
                    `;
                } else {
                    this.eventContent.innerHTML = `
                        <div class="event-title">${this.currentYear}年</div>
                        <div class="event-desc">${kingdomToShow.name}处于稳定发展时期，国内政治相对平稳。</div>
                    `;
                }
                
                this.historyContent.innerHTML = `
                    <div class="history-item">
                        <span class="history-tag">政权概况</span>
                    </div>
                    <div class="history-desc">
                        ${kingdomToShow.name}存在于${kingdomToShow.startYear}年至${kingdomToShow.endYear}年，
                        都城位于${kingdomToShow.capital}，共历${kingdomToShow.rulers.length}位君主。
                    </div>
                `;
            }
        }
    }
    
    // 更新皇帝详细信息
    updateRulerDetails(ruler) {
        const detailContent = document.querySelector('.detail-content');
        let rulerDetailsDiv = detailContent.querySelector('.ruler-details');
        
        if (!rulerDetailsDiv) {
            rulerDetailsDiv = document.createElement('div');
            rulerDetailsDiv.className = 'ruler-details';
            detailContent.insertBefore(rulerDetailsDiv, detailContent.firstChild);
        }
        
        let html = '<div class="ruler-info-card">';
        
        // 生卒年份
        if (ruler.birthYear && ruler.deathYear) {
            html += `<div class="ruler-lifespan">${ruler.birthYear}年 - ${ruler.deathYear}年（享年${ruler.deathYear - ruler.birthYear}岁）</div>`;
        }
        
        // 性格特点
        if (ruler.personality) {
            html += `<div class="ruler-personality"><span class="label">性格：</span>${ruler.personality}</div>`;
        }
        
        // 生平简介
        if (ruler.biography) {
            html += `<div class="ruler-biography"><span class="label">生平：</span>${ruler.biography}</div>`;
        }
        
        // 主要成就
        if (ruler.achievements) {
            html += `<div class="ruler-achievements"><span class="label">成就：</span>${ruler.achievements}</div>`;
        }
        
        // 历史趣闻
        if (ruler.anecdotes) {
            html += `<div class="ruler-anecdotes"><span class="label">趣闻：</span>${ruler.anecdotes}</div>`;
        }
        
        html += '</div>';
        rulerDetailsDiv.innerHTML = html;
    }
    
    // 清除皇帝详细信息
    clearRulerDetails() {
        const detailContent = document.querySelector('.detail-content');
        const rulerDetailsDiv = detailContent.querySelector('.ruler-details');
        if (rulerDetailsDiv) {
            rulerDetailsDiv.innerHTML = '';
        }
    }
    
    // 更新国家列表
    updateKingdomList() {
        const kingdoms = window.getExistingKingdoms(this.currentYear);
        const currentDynasty = window.getCurrentDynasty(this.currentYear);
        
        // 更新计数
        this.kingdomCount.textContent = `(${kingdoms.length})`;
        
        // 更新事件高亮
        const event = window.getYearEvents(this.currentYear);
        if (event) {
            const kingdom = kingdoms.find(k => k.id === event.kingdom);
            const kingdomName = kingdom ? kingdom.name : '';
            this.eventHighlight.innerHTML = `
                <div class="event-label">本年政权变动</div>
                <div class="event-tag">${event.type === 'establish' ? '建立' : event.type === 'fall' ? '灭亡' : '事件'} ${kingdomName}</div>
            `;
            this.eventHighlight.style.display = 'block';
        } else {
            this.eventHighlight.style.display = 'none';
        }
        
        // 生成国家列表
        let listHTML = '';
        kingdoms.forEach(kingdom => {
            const ruler = window.getCurrentRuler(this.currentYear, kingdom);
            const isSelected = this.selectedKingdom && this.selectedKingdom.id === kingdom.id;
            const isMain = kingdom.isMain;
            
            listHTML += `
                <div class="kingdom-item ${isSelected ? 'selected' : ''} ${isMain ? 'main' : ''}" data-kingdom="${kingdom.id}">
                    <div class="kingdom-info">
                        <span class="kingdom-name">${kingdom.name}</span>
                        <span class="kingdom-capital">${kingdom.capital}</span>
                    </div>
                    <div class="ruler-info-small">
                        <span class="ruler-name-small">${ruler ? ruler.name : '未知'}</span>
                        ${ruler && ruler.title ? `<span class="ruler-title-small">${ruler.title}</span>` : ''}
                    </div>
                </div>
            `;
        });
        
        this.kingdomList.innerHTML = listHTML;
        
        // 绑定点击事件
        this.kingdomList.querySelectorAll('.kingdom-item').forEach(item => {
            item.addEventListener('click', () => {
                const kingdomId = item.getAttribute('data-kingdom');
                const kingdom = kingdoms.find(k => k.id === kingdomId);
                if (kingdom) {
                    this.selectedKingdom = kingdom;
                    this.updateDisplay();
                }
            });
        });
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new FiveDynastiesApp();
});
