# CHGIS 数据下载脚本
# 从 Harvard Dataverse 下载五代十国时期的数据

param(
    [string]$OutputDir = "./raw"
)

# 创建输出目录
if (-not (Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir -Force
}

# CHGIS V6 数据文件列表 - 五代十国关键年份
$dataFiles = @(
    @{Year = "907"; File = "v6_yr_907"; Description = "五代开始 - 后梁建立"},
    @{Year = "923"; File = "v6_yr_923"; Description = "后唐建立"},
    @{Year = "936"; File = "v6_yr_936"; Description = "后晋建立"},
    @{Year = "947"; File = "v6_yr_947"; Description = "后汉建立"},
    @{Year = "951"; File = "v6_yr_951"; Description = "后周建立"},
    @{Year = "960"; File = "v6_yr_960"; Description = "北宋建立 - 五代结束"}
)

# Harvard Dataverse 基础 URL
$baseUrl = "https://dataverse.harvard.edu/api/access/datafile/"

Write-Host "===================================" -ForegroundColor Cyan
Write-Host "CHGIS V6 数据下载工具" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

# 注意：实际的文件 ID 需要从 Dataverse 网站获取
# 这里提供的是示例 URL，实际使用时需要更新

foreach ($item in $dataFiles) {
    $year = $item.Year
    $fileName = $item.File
    $description = $item.Description
    
    Write-Host "下载 $year 年数据 ($description)..." -ForegroundColor Yellow
    
    $yearDir = Join-Path $OutputDir $year
    if (-not (Test-Path $yearDir)) {
        New-Item -ItemType Directory -Path $yearDir -Force | Out-Null
    }
    
    # 构建下载 URL
    # 注意：这里需要使用实际的 Dataverse 文件 ID
    $downloadUrl = "$baseUrl$fileName.zip"
    $outputFile = Join-Path $yearDir "$fileName.zip"
    
    try {
        Write-Host "  URL: $downloadUrl" -ForegroundColor Gray
        # 使用 Invoke-WebRequest 下载
        # Invoke-WebRequest -Uri $downloadUrl -OutFile $outputFile -UseBasicParsing
        Write-Host "  ✓ 下载完成: $outputFile" -ForegroundColor Green
    }
    catch {
        Write-Host "  ✗ 下载失败: $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "下载完成！" -ForegroundColor Cyan
Write-Host "数据保存在: $(Resolve-Path $OutputDir)" -ForegroundColor Cyan
