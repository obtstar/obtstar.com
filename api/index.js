/**
 * ObtStar API 模块
 * 将静态数据转换为 REST API 端点
 */

const fs = require('fs');
const path = require('path');

// 数据缓存
let categoriesCache = null;
let reportsCache = null;
const contentCache = new Map();
const manifestCache = new Map();

/**
 * 加载分类数据
 */
function loadCategories() {
  if (categoriesCache) return categoriesCache;

  // 从 reports.js 提取分类数据
  categoriesCache = [
    { id: 'all', name: '全部', icon: '🌐', color: '#4F46E5' },
    { id: 'ai-quality', name: 'AI 信息质量', icon: '🛡️', color: '#7C3AED' },
    { id: 'digital', name: '数字化转型', icon: '🚀', color: '#2563EB' },
    { id: 'architecture', name: '知识架构', icon: '🧠', color: '#0891B2' },
    { id: 'future', name: '未来情景', icon: '🌌', color: '#6D28D9' },
    { id: 'ai-tools', name: 'AI 工具策略', icon: '⚙️', color: '#059669' },
    { id: 'prompt', name: '提示工程', icon: '✨', color: '#D97706' },
  ];

  return categoriesCache;
}

/**
 * 加载报告数据
 */
function loadReports() {
  if (reportsCache) return reportsCache;

  const dataDir = path.join(__dirname, '..', 'data');
  const reportsFile = path.join(dataDir, 'reports.js');

  // 读取并解析 reports.js 文件
  const content = fs.readFileSync(reportsFile, 'utf-8');

  // 使用正则提取 REPORTS 数组内容
  const reportsMatch = content.match(/const\s+REPORTS\s*=\s*(\[[\s\S]*?\]);/);
  if (!reportsMatch) {
    throw new Error('无法解析 REPORTS 数据');
  }

  // 安全地解析 JavaScript 数组（使用 Function 构造器）
  try {
    reportsCache = new Function('return ' + reportsMatch[1])();
  } catch (e) {
    // 如果解析失败，使用硬编码数据作为后备
    reportsCache = getFallbackReports();
  }

  return reportsCache;
}

/**
 * 后备报告数据（当解析失败时使用）
 */
function getFallbackReports() {
  return [
    {
      id: 'ai-fact-check-2026',
      title: 'AI时代的信息质量保障',
      subtitle: '2026年系统性事实核查与风险管理体系研究',
      category: 'ai-quality',
      tags: ['事实核查', 'AI偏见', '风险管理', '可信AI', '幻觉检测'],
      pages: 56,
      date: '2026-03-31',
      summary: '深度研究AI时代信息质量挑战，构建面向2026年的系统性事实核查与风险管理体系。',
      highlights: ['AI幻觉检测的技术路径与评估标准', '多层次事实核查体系架构设计'],
      chapters: [
        { title: '第一章：AI信息质量现状', desc: '当前AI系统信息质量问题全景分析' },
      ],
      featured: true,
      source: '小艺 · 华为研究院',
      color: '#7C3AED',
    },
    {
      id: 'digital-transform-2024-2030',
      title: '个人与小微企业数字化转型',
      subtitle: '通用可行性报告（2024-2030）',
      category: 'digital',
      tags: ['数字化转型', '小微企业', '可行性分析'],
      pages: 34,
      date: '2026-03-01',
      summary: '系统梳理个人及小微企业在2024至2030年间数字化转型的通用可行性路径。',
      highlights: ['小微企业数字化转型五阶段模型', '零技术背景快速上手数字工具指南'],
      chapters: [
        { title: '第一章：数字化现状评估', desc: '个人与小微企业当前数字化水平分析' },
      ],
      featured: true,
      source: 'Kimi · Moonshot AI',
      color: '#2563EB',
    },
    {
      id: 'knowledge-memory-arch',
      title: '超大规模知识记忆存储架构',
      subtitle: '从个人到国家的可行性分析',
      category: 'architecture',
      tags: ['知识图谱', '记忆存储', '可扩展架构'],
      pages: 22,
      date: '2026-03-15',
      summary: '探索从个人知识管理到国家级知识记忆系统的架构设计可行性。',
      highlights: ['个人-团队-组织-国家四级存储架构', '知识压缩与语义索引技术路径'],
      chapters: [
        { title: '第一章：知识记忆挑战', desc: '信息爆炸时代的知识管理困境' },
      ],
      featured: false,
      source: 'Kimi · Moonshot AI',
      color: '#0891B2',
    },
    {
      id: 'data-stream-micro-light',
      title: '数据洪流与微光',
      subtitle: '弱小智能体的进化史诗（2050-2100未来情景推演）',
      category: 'future',
      tags: ['未来推演', '智能体进化', 'AI叙事'],
      pages: 45,
      date: '2026-02-20',
      summary: '以叙事性情景推演方式探索2050-2100年间弱小智能体的进化路径。',
      highlights: ['2050-2100年AI进化关键节点推演', '弱小智能体生存策略与协同机制'],
      chapters: [
        { title: '序章：洪流来临', desc: '2050年数据洪流的背景设定' },
      ],
      featured: true,
      source: 'Kimi · Moonshot AI',
      color: '#6D28D9',
    },
    {
      id: 'ai-coding-tools-growth',
      title: 'AI编程工具销量增长策略',
      subtitle: '深度研究报告',
      category: 'ai-tools',
      tags: ['AI编程', '市场策略', '增长黑客'],
      pages: 13,
      date: '2026-03-10',
      summary: '聚焦AI编程工具市场，深度分析增长瓶颈与机会窗口。',
      highlights: ['AI编程工具市场规模与竞争格局', '开发者决策链路与采购行为分析'],
      chapters: [
        { title: '第一章：市场现状', desc: 'AI编程工具赛道竞争全貌' },
      ],
      featured: false,
      source: 'Kimi · Moonshot AI',
      color: '#059669',
    },
    {
      id: 'prompt-engineering-v7',
      title: 'Prompt Engineering 提示工程',
      subtitle: 'Google 提示工程完全指南（中英双语版）v7',
      category: 'prompt',
      tags: ['Prompt Engineering', 'CoT', 'Few-shot'],
      pages: 68,
      date: '2025-12-01',
      summary: 'Google 官方出品的提示工程权威指南中英双语版本。',
      highlights: ['Zero-shot / Few-shot 提示技术对比', 'Chain-of-Thought (CoT) 深度解析'],
      chapters: [
        { title: '第一章：提示工程基础', desc: 'LLM工作原理与提示基本概念' },
      ],
      featured: false,
      source: 'Google · Cloud AI',
      color: '#D97706',
    },
  ];
}

/**
 * 加载报告 manifest
 */
function loadManifest(reportId) {
  if (manifestCache.has(reportId)) {
    return manifestCache.get(reportId);
  }

  const manifestPath = path.join(__dirname, '..', 'data', 'reports-content', reportId, 'manifest.json');

  if (!fs.existsSync(manifestPath)) {
    return null;
  }

  const content = fs.readFileSync(manifestPath, 'utf-8');
  const manifest = JSON.parse(content);
  manifestCache.set(reportId, manifest);
  return manifest;
}

/**
 * 加载报告内容块
 */
function loadContentChunk(reportId, chunkIndex) {
  const cacheKey = `${reportId}_${chunkIndex}`;
  if (contentCache.has(cacheKey)) {
    return contentCache.get(cacheKey);
  }

  const chunkPath = path.join(__dirname, '..', 'data', 'reports-content', reportId, `chunk-${chunkIndex}.js`);

  if (!fs.existsSync(chunkPath)) {
    return null;
  }

  const content = fs.readFileSync(chunkPath, 'utf-8');

  // 提取 window.REPORT_CHUNK_* 对象内容
  // 匹配 window.REPORT_CHUNK_xxx = { ... }; 格式，在第一个 }; 处停止
  const chunkMatch = content.match(/window\.REPORT_CHUNK_[\w_]+\s*=\s*({[\s\S]*?\n}\s*;)/m);
  if (!chunkMatch) {
    console.error(`无法匹配内容块: ${reportId}/${chunkIndex}`);
    return null;
  }

  try {
    // 移除末尾的分号
    const jsonStr = chunkMatch[1].replace(/;\s*$/, '');
    const chunk = new Function('return ' + jsonStr)();
    contentCache.set(cacheKey, chunk);
    return chunk;
  } catch (e) {
    console.error(`解析内容块失败: ${reportId}/${chunkIndex}`, e);
    return null;
  }
}

/**
 * 获取所有分类
 */
function getCategories(req, res) {
  const categories = loadCategories();
  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({ success: true, data: categories }));
}

/**
 * 获取报告列表（支持筛选和排序）
 */
function getReports(req, res, query) {
  let reports = loadReports();

  // 分类筛选
  if (query.category && query.category !== 'all') {
    reports = reports.filter(r => r.category === query.category);
  }

  // 搜索筛选
  if (query.search) {
    const searchLower = query.search.toLowerCase();
    reports = reports.filter(r =>
      r.title.toLowerCase().includes(searchLower) ||
      (r.subtitle && r.subtitle.toLowerCase().includes(searchLower)) ||
      r.summary.toLowerCase().includes(searchLower) ||
      r.tags.some(t => t.toLowerCase().includes(searchLower))
    );
  }

  // 标签筛选
  if (query.tag) {
    reports = reports.filter(r => r.tags.includes(query.tag));
  }

  // 排序
  const sort = query.sort || 'date-desc';
  switch (sort) {
    case 'date-desc':
      reports.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case 'date-asc':
      reports.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case 'pages-desc':
      reports.sort((a, b) => b.pages - a.pages);
      break;
    case 'pages-asc':
      reports.sort((a, b) => a.pages - b.pages);
      break;
    case 'title':
      reports.sort((a, b) => a.title.localeCompare(b.title, 'zh-CN'));
      break;
  }

  // 分页
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 20;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedReports = reports.slice(start, end);

  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({
    success: true,
    data: paginatedReports,
    meta: {
      total: reports.length,
      page,
      limit,
      totalPages: Math.ceil(reports.length / limit)
    }
  }));
}

/**
 * 获取单个报告详情
 */
function getReportById(req, res, reportId) {
  const reports = loadReports();
  const report = reports.find(r => r.id === reportId);

  if (!report) {
    res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ success: false, error: '报告不存在' }));
    return;
  }

  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({ success: true, data: report }));
}

/**
 * 获取报告内容
 */
function getReportContent(req, res, reportId, query) {
  const manifest = loadManifest(reportId);

  if (!manifest) {
    res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ success: false, error: '报告内容不存在' }));
    return;
  }

  const chunkIndex = parseInt(query.chunk) || 0;

  // 如果请求特定块
  if (query.chunk !== undefined) {
    const chunk = loadContentChunk(reportId, chunkIndex);
    if (!chunk) {
      res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ success: false, error: '内容块不存在' }));
      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ success: true, data: chunk }));
    return;
  }

  // 返回所有内容
  const allSections = [];
  for (let i = 0; i < manifest.totalChunks; i++) {
    const chunk = loadContentChunk(reportId, i);
    if (chunk && chunk.sections) {
      allSections.push(...chunk.sections);
    }
  }

  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({
    success: true,
    data: {
      reportId,
      title: manifest.title,
      totalPages: manifest.totalPages,
      totalChunks: manifest.totalChunks,
      sections: allSections
    }
  }));
}

/**
 * 获取报告 manifest
 */
function getReportManifest(req, res, reportId) {
  const manifest = loadManifest(reportId);

  if (!manifest) {
    res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ success: false, error: '报告清单不存在' }));
    return;
  }

  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({ success: true, data: manifest }));
}

/**
 * 获取热门标签
 */
function getHotTags(req, res) {
  const reports = loadReports();
  const tagCount = {};

  reports.forEach(r => {
    r.tags.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });

  const hotTags = Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([tag, count]) => ({ tag, count }));

  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({ success: true, data: hotTags }));
}

/**
 * 获取报告来源统计
 */
function getSources(req, res) {
  const reports = loadReports();
  const sourceCount = {};

  reports.forEach(r => {
    sourceCount[r.source] = (sourceCount[r.source] || 0) + 1;
  });

  const sources = Object.entries(sourceCount)
    .map(([source, count]) => ({ source, count }));

  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({ success: true, data: sources }));
}

/**
 * API 路由处理
 */
function handleAPIRequest(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;
  const query = Object.fromEntries(url.searchParams);

  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // 路由匹配
  if (pathname === '/api/categories') {
    return getCategories(req, res);
  }

  if (pathname === '/api/reports') {
    return getReports(req, res, query);
  }

  if (pathname === '/api/tags') {
    return getHotTags(req, res);
  }

  if (pathname === '/api/sources') {
    return getSources(req, res);
  }

  // 报告详情路由 /api/reports/:id
  const reportDetailMatch = pathname.match(/^\/api\/reports\/([^\/]+)$/);
  if (reportDetailMatch) {
    return getReportById(req, res, reportDetailMatch[1]);
  }

  // 报告内容路由 /api/reports/:id/content
  const reportContentMatch = pathname.match(/^\/api\/reports\/([^\/]+)\/content$/);
  if (reportContentMatch) {
    return getReportContent(req, res, reportContentMatch[1], query);
  }

  // 报告清单路由 /api/reports/:id/manifest
  const reportManifestMatch = pathname.match(/^\/api\/reports\/([^\/]+)\/manifest$/);
  if (reportManifestMatch) {
    return getReportManifest(req, res, reportManifestMatch[1]);
  }

  // 404 - API 端点不存在
  res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({ success: false, error: 'API 端点不存在' }));
}

module.exports = { handleAPIRequest };
