/**
 * ObtStar API 客户端
 * 封装所有后端 API 调用
 */

const API_BASE = '';

/**
 * 基础请求函数
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const defaultOptions = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    
    // 检查 HTTP 状态码
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();

    // API 返回错误格式 (RFC 7807 Problem Details)
    if (data.type && data.type.includes('/errors/')) {
      throw new Error(data.detail || data.title);
    }

    return data;
  } catch (error) {
    console.error(`API 请求失败: ${endpoint}`, error);
    throw error;
  }
}

/**
 * 构建查询字符串
 */
function buildQueryString(params) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.append(key, value);
    }
  });
  const queryString = query.toString();
  return queryString ? `?${queryString}` : '';
}

// ==================== 分类 API ====================

/**
 * 获取所有分类
 * @returns {Promise<{data: Category[]}>}
 */
async function getCategories() {
  return apiRequest('/api/categories');
}

// ==================== 报告 API ====================

/**
 * 获取报告列表
 * @param {Object} params - 查询参数
 * @param {string} params.category - 分类ID
 * @param {string} params.search - 搜索关键词
 * @param {string} params.tag - 标签筛选
 * @param {string} params.sort - 排序方式 (date-desc, date-asc, pages-desc, pages-asc, title)
 * @param {number} params.page - 页码
 * @param {number} params.limit - 每页数量
 * @returns {Promise<{data: Report[], meta: PaginationMeta}>}
 */
async function getReports(params = {}) {
  const queryString = buildQueryString(params);
  return apiRequest(`/api/reports${queryString}`);
}

/**
 * 获取单个报告详情
 * @param {string} reportId - 报告ID
 * @returns {Promise<{data: Report}>}
 */
async function getReportById(reportId) {
  return apiRequest(`/api/reports/${reportId}`);
}

/**
 * 获取报告内容
 * @param {string} reportId - 报告ID
 * @param {Object} options - 选项
 * @param {number} options.chunk - 指定内容块索引（可选）
 * @returns {Promise<{data: ReportContent}>}
 */
async function getReportContent(reportId, options = {}) {
  const queryString = buildQueryString(options);
  return apiRequest(`/api/reports/${reportId}/content${queryString}`);
}

/**
 * 获取报告清单
 * @param {string} reportId - 报告ID
 * @returns {Promise<{data: Manifest}>}
 */
async function getReportManifest(reportId) {
  return apiRequest(`/api/reports/${reportId}/manifest`);
}

// ==================== 标签和来源 API ====================

/**
 * 获取热门标签
 * @returns {Promise<{data: {tag: string, count: number}[]}>}
 */
async function getHotTags() {
  return apiRequest('/api/tags');
}

/**
 * 获取报告来源统计
 * @returns {Promise<{data: {source: string, count: number}[]}>}
 */
async function getSources() {
  return apiRequest('/api/sources');
}

// ==================== 缓存工具 ====================

const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存

function getCached(key) {
  const item = cache.get(key);
  if (item && Date.now() - item.timestamp < CACHE_DURATION) {
    return item.data;
  }
  cache.delete(key);
  return null;
}

function setCached(key, data) {
  cache.set(key, { data, timestamp: Date.now() });
}

// 带缓存的 API 方法
async function getCategoriesCached() {
  const cached = getCached('categories');
  if (cached) return { data: cached };
  const result = await getCategories();
  setCached('categories', result);
  return { data: result };
}

async function getReportsCached(params = {}) {
  const cacheKey = `reports_${JSON.stringify(params)}`;
  const cached = getCached(cacheKey);
  if (cached) return { data: cached.data, meta: cached.meta };
  const result = await getReports(params);
  setCached(cacheKey, result);
  return result;
}

async function getReportByIdCached(reportId) {
  const cacheKey = `report_${reportId}`;
  const cached = getCached(cacheKey);
  if (cached) return { data: cached };
  const result = await getReportById(reportId);
  setCached(cacheKey, result.data);
  return result;
}

async function getHotTagsCached() {
  const cached = getCached('tags');
  if (cached) return { data: cached };
  const result = await getHotTags();
  setCached('tags', result);
  return { data: result };
}

async function getSourcesCached() {
  const cached = getCached('sources');
  if (cached) return { data: cached };
  const result = await getSources();
  setCached('sources', result);
  return { data: result };
}

// ==================== 导出 ====================

const ObtStarAPI = {
  // 基础方法
  getCategories,
  getReports,
  getReportById,
  getReportContent,
  getReportManifest,
  getHotTags,
  getSources,

  // 带缓存的方法
  getCategoriesCached,
  getReportsCached,
  getReportByIdCached,
  getHotTagsCached,
  getSourcesCached,

  // 工具
  clearCache: () => cache.clear(),
};

// 兼容 CommonJS 和浏览器环境
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ObtStarAPI;
} else {
  window.ObtStarAPI = ObtStarAPI;
}
