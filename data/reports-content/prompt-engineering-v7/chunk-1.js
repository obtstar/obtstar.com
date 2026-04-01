// 报告: Prompt Engineering 提示工程 - 第1块
// 页数: 31-68

window.REPORT_CHUNK_prompt_engineering_v7_1 = {
  reportId: "prompt-engineering-v7",
  chunkIndex: 1,
  pageRange: "31-68",
  sections: [
    {
      title: "提示技术",
      level: 1,
      content: `<h2>提示技术</h2>
<h3>Zero-shot Prompting 零样本提示</h3>
<p>最简单的提示形式，直接要求模型执行任务而不提供示例。适用于模型已经训练过的常见任务。</p>
<p>示例：</p>
<pre><code>将以下中文翻译成英文：
"你好，世界"</code></pre>

<h3>Few-shot Prompting 少样本提示</h3>
<p>提供几个输入-输出示例，让模型学习任务模式。特别适用于特定格式或风格的任务。</p>
<p>示例：</p>
<pre><code>将中文翻译成英文：
中文：你好
英文：Hello

中文：谢谢
英文：Thank you

中文：再见
英文：</code></pre>

<h3>Chain-of-Thought (CoT) 思维链</h3>
<p>鼓励模型逐步推理，特别适用于数学问题、逻辑推理等需要多步思考的任务。</p>
<p>示例：</p>
<pre><code>问题：一个农场有鸡和兔，头共35个，脚共94只。鸡兔各几只？

让我们逐步思考：
1. 假设全是鸡，应该有 35 × 2 = 70 只脚
2. 实际多了 94 - 70 = 24 只脚
3. 每只兔比鸡多 2 只脚
4. 所以兔子有 24 ÷ 2 = 12 只
5. 鸡有 35 - 12 = 23 只

答案：鸡23只，兔12只</code></pre>

<h3>System, Contextual and Role Prompting</h3>
<p><strong>System Prompting 系统提示</strong>：设置模型的整体行为和角色</p>
<p><strong>Role Prompting 角色提示</strong>：让模型扮演特定角色</p>
<p><strong>Contextual Prompting 上下文提示</strong>：提供相关背景信息</p>`
    },
    {
      title: "代码提示",
      level: 1,
      content: `<h2>代码提示</h2>
<h3>代码生成</h3>
<p>有效的代码提示技巧：</p>
<ul>
<li>明确指定编程语言</li>
<li>提供清晰的函数签名</li>
<li>包含输入/输出示例</li>
<li>说明边界情况和错误处理</li>
</ul>

<h3>代码解释</h3>
<p>让模型解释代码的工作原理：</p>
<pre><code>请解释以下代码的功能和工作原理：
\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
\`\`\`</code></pre>

<h3>代码审查</h3>
<p>让模型帮助审查代码：</p>
<pre><code>请审查以下代码，找出潜在的问题和改进建议：
[代码]</code></pre>`
    },
    {
      title: "多模态提示",
      level: 1,
      content: `<h2>多模态提示</h2>
<h3>图像理解</h3>
<p>结合图像和文本进行提示：</p>
<pre><code>描述这张图片中的内容，并分析其可能的含义。
[图片]</code></pre>

<h3>图文生成</h3>
<p>根据文本生成图像描述或根据图像生成文本：</p>
<ul>
<li>图像描述生成</li>
<li>视觉问答</li>
<li>图像标注</li>
</ul>

<h3>多模态最佳实践</h3>
<ul>
<li>清晰描述图像中需要关注的区域</li>
<li>指定输出格式（详细描述、要点列表等）</li>
<li>对于复杂图像，分步骤提问</li>
</ul>`
    },
    {
      title: "最佳实践",
      level: 1,
      content: `<h2>最佳实践</h2>
<h3>1. 提供示例</h3>
<p>当可能时，提供输入-输出示例，特别是针对特定格式或风格的任务。</p>

<h3>2. 设计简洁明了</h3>
<p>保持提示简洁但完整。避免不必要的信息，但确保包含所有必要的上下文。</p>

<h3>3. 明确输出格式</h3>
<p>清楚指定期望的输出格式：JSON、Markdown、纯文本、表格等。</p>

<h3>4. 使用指令而非约束</h3>
<p>告诉模型要做什么，而不是不要做什么。正面指令通常比负面约束更有效。</p>

<h3>5. 控制Token长度</h3>
<p>根据任务需求设置合适的max_tokens，避免生成过长或过短的响应。</p>

<h3>6. 迭代优化</h3>
<p>提示工程是一个迭代过程。测试不同变体，记录效果，持续优化。</p>

<h3>7. 文档化</h3>
<p>记录有效的提示模板和参数设置，建立团队的提示库。</p>

<h3>总结</h3>
<p>提示工程是一门结合技术理解、创造力和实验精神的实践。随着LLM能力的不断发展，提示工程技术也在持续演进。掌握这些技术将帮助你更有效地利用大语言模型的强大能力。</p>`
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { REPORT_CHUNK_prompt_engineering_v7_1: window.REPORT_CHUNK_prompt_engineering_v7_1 };
}
