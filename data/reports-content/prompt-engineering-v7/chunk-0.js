// 报告: Prompt Engineering 提示工程 - 第0块
// 页数: 1-30

window.REPORT_CHUNK_prompt_engineering_v7_0 = {
  reportId: "prompt-engineering-v7",
  chunkIndex: 0,
  pageRange: "1-30",
  sections: [
    {
      title: "目录与介绍",
      level: 1,
      content: `<h2>目录与介绍</h2>
<p><strong>Prompt Engineering - Google 提示工程完全指南（中英双语版）</strong></p>
<p>Author: Lee Boonstra</p>
<p>Version: 7.0</p>
<h3>目录</h3>
<ul>
<li>Introduction 介绍</li>
<li>Prompt engineering 提示工程</li>
<li>LLM output configuration 大语言模型输出配置</li>
<li>Prompting techniques 提示技术</li>
<li>Code prompting 代码提示</li>
<li>Multimodal prompting 多模态提示</li>
<li>Prompt engineering best practices 最佳实践</li>
<li>References 参考资料</li>
</ul>
<h3>致谢</h3>
<p>Content contributors: Michael Sherman, Yuan Cao, Erick Armbrust, Anant Nawalgaria, Antonio Gulli, Simone Cammel</p>
<p>Curators and Editors: Antonio Gulli, Anant Nawalgaria, Grace Mollison</p>
<p>Technical Writer: Joey Haymaker</p>
<p>Designer: Michael Lanning</p>`
    },
    {
      title: "提示工程基础",
      level: 1,
      content: `<h2>提示工程基础</h2>
<h3>什么是提示工程</h3>
<p>提示工程（Prompt Engineering）是设计和优化输入提示（prompts）以获得大语言模型（LLM）最佳输出的过程。随着LLM能力的不断提升，如何有效地与这些模型交互变得越来越重要。</p>
<p>记住LLM的工作原理：它是一个预测引擎。模型接收顺序文本作为输入，然后基于训练数据预测下一个token应该是什么。</p>
<h3>为什么提示工程很重要</h3>
<p>良好的提示可以：</p>
<ul>
<li>提高模型输出的准确性和相关性</li>
<li>减少幻觉（hallucinations）和不准确信息</li>
<li>获得更结构化、可用的输出格式</li>
<li>降低API调用成本（通过更高效的提示）</li>
</ul>
<h3>提示的组成部分</h3>
<p>一个完整的提示通常包含：</p>
<ul>
<li><strong>指令（Instruction）</strong>：告诉模型要做什么</li>
<li><strong>上下文（Context）</strong>：提供背景信息</li>
<li><strong>输入数据（Input Data）</strong>：需要处理的具体内容</li>
<li><strong>输出指示（Output Indicator）</strong>：指定输出格式</li>
</ul>`
    },
    {
      title: "LLM输出配置",
      level: 1,
      content: `<h2>LLM输出配置</h2>
<h3>输出长度控制</h3>
<p>可以通过max_tokens参数控制模型输出的最大长度。这对于限制响应长度、控制成本很有用。</p>
<h3>采样控制参数</h3>
<p><strong>Temperature（温度）</strong></p>
<p>控制输出的随机性：</p>
<ul>
<li>0.0-0.3：更确定、保守的输出</li>
<li>0.7-1.0：更有创意、多样的输出</li>
</ul>
<p><strong>Top-K和Top-P</strong></p>
<p>这些参数限制模型在每个步骤可以选择的token集合：</p>
<ul>
<li>Top-K：只考虑概率最高的K个token</li>
<li>Top-P（Nucleus sampling）：考虑累积概率达到P的最小token集合</li>
</ul>
<h3>综合应用</h3>
<p>不同的任务需要不同的参数组合：</p>
<ul>
<li><strong>代码生成</strong>：低temperature（0.1-0.3）以获得确定性输出</li>
<li><strong>创意写作</strong>：高temperature（0.7-0.9）以获得多样性</li>
<li><strong>事实问答</strong>：低temperature和适当的Top-P</li>
</ul>`
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { REPORT_CHUNK_prompt_engineering_v7_0: window.REPORT_CHUNK_prompt_engineering_v7_0 };
}
