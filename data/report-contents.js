/**
 * 报告内容加载器
 * =====================================================
 * 【设计说明】
 * 
 * 为了支持数百个报告的可扩展性，每个报告的内容存储在独立的JS文件中：
 * data/reports-content/{report-id}.js
 * 
 * 每个报告文件导出格式：
 * const REPORT_CONTENT_{report_id} = {
 *   id: "report-id",
 *   title: "报告标题",
 *   totalPages: 56,
 *   sections: [...]
 * };
 * 
 * 【如何添加新报告】
 * 1. 在 data/reports-content/ 目录下创建 {report-id}.js 文件
 * 2. 按照上述格式定义 REPORT_CONTENT_{report_id} 对象
 * 3. 在 REPORT_CONTENT_MAP 中添加映射
 * =====================================================
 */

// 报告内容与文件的映射关系
// key: 报告ID, value: 对应的JS文件路径
const REPORT_CONTENT_MAP = {
  "ai-fact-check-2026": "data/reports-content/ai-fact-check-2026.js",
  "prompt-engineering-guide": "data/reports-content/prompt-engineering-guide.js",
  "digital-transform-2024-2030": "data/reports-content/digital-transform-2024-2030.js",
  "knowledge-memory-arch": "data/reports-content/knowledge-memory-arch.js",
  "data-stream-micro-light": "data/reports-content/data-stream-micro-light.js",
  "ai-coding-tools-growth": "data/reports-content/ai-coding-tools-growth.js",
  // 在此处添加更多报告映射
};

// 已加载的报告内容缓存
const REPORT_CONTENTS_CACHE = {};

/**
 * 加载报告内容
 * @param {string} reportId - 报告ID
 * @returns {Promise<Object|null>} - 报告内容对象或null
 */
async function loadReportContent(reportId) {
  // 检查缓存
  if (REPORT_CONTENTS_CACHE[reportId]) {
    return REPORT_CONTENTS_CACHE[reportId];
  }
  
  // 检查是否有对应的文件映射
  const contentPath = REPORT_CONTENT_MAP[reportId];
  if (!contentPath) {
    console.warn(`报告内容未找到: ${reportId}`);
    return null;
  }
  
  try {
    // 动态加载JS文件
    const module = await import(`./${contentPath}`);
    const contentKey = `REPORT_CONTENT_${reportId.replace(/-/g, '_')}`;
    const content = module[contentKey] || module.default;
    
    if (content) {
      REPORT_CONTENTS_CACHE[reportId] = content;
      return content;
    }
    
    return null;
  } catch (error) {
    console.error(`加载报告内容失败: ${reportId}`, error);
    return null;
  }
}

/**
 * 获取报告内容（同步，仅从缓存）
 * @param {string} reportId - 报告ID
 * @returns {Object|null} - 报告内容对象或null
 */
function getReportContent(reportId) {
  return REPORT_CONTENTS_CACHE[reportId] || null;
}

/**
 * 预加载多个报告内容
 * @param {string[]} reportIds - 报告ID数组
 * @returns {Promise<void>}
 */
async function preloadReportContents(reportIds) {
  const promises = reportIds.map(id => loadReportContent(id));
  await Promise.all(promises);
}

/**
 * 检查报告内容是否存在
 * @param {string} reportId - 报告ID
 * @returns {boolean}
 */
function hasReportContent(reportId) {
  return !!REPORT_CONTENT_MAP[reportId];
}

/**
 * 获取所有可用的报告ID列表
 * @returns {string[]}
 */
function getAvailableReportIds() {
  return Object.keys(REPORT_CONTENT_MAP);
}

// 为了保持向后兼容，提供一个同步的 REPORT_CONTENTS 对象
// 注意：这个对象在内容加载前是空的，需要通过 loadReportContent 加载
const REPORT_CONTENTS = new Proxy({}, {
  get(target, prop) {
    // 如果缓存中有，直接返回
    if (REPORT_CONTENTS_CACHE[prop]) {
      return REPORT_CONTENTS_CACHE[prop];
    }
    // 否则返回一个占位对象，避免代码报错
    return {
      id: prop,
      title: "内容加载中...",
      totalPages: 0,
      sections: [{
        title: "加载中",
        level: 1,
        content: "<p>报告内容正在加载中，请稍候...</p>"
      }]
    };
  }
});

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    REPORT_CONTENTS, 
    REPORT_CONTENT_MAP,
    loadReportContent,
    getReportContent,
    preloadReportContents,
    hasReportContent,
    getAvailableReportIds
  };
}
