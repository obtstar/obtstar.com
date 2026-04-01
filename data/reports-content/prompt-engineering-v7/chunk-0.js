// 报告: Prompt Engineering 提示工程 - 第0块
// 页数: 1-30

window.REPORT_CHUNK_prompt_engineering_v7_0 = {
  reportId: "prompt-engineering-v7",
  chunkIndex: 0,
  pageRange: "1-30",
  sections: [
    {
      title: "目录与介绍",
      title_i18n: {
        "zh-CN": "目录与介绍",
        "en": "Table of Contents & Introduction",
        "ja": "目次と紹介"
      },
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
<p>Designer: Michael Lanning</p>`,
      content_i18n: {
        "zh-CN": `<h2>目录与介绍</h2>
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
<p>Designer: Michael Lanning</p>`,
        "en": `<h2>Table of Contents & Introduction</h2>
<p><strong>Prompt Engineering - Google Complete Guide to Prompt Engineering (Bilingual Edition)</strong></p>
<p>Author: Lee Boonstra</p>
<p>Version: 7.0</p>
<h3>Table of Contents</h3>
<ul>
<li>Introduction</li>
<li>Prompt engineering</li>
<li>LLM output configuration</li>
<li>Prompting techniques</li>
<li>Code prompting</li>
<li>Multimodal prompting</li>
<li>Prompt engineering best practices</li>
<li>References</li>
</ul>
<h3>Acknowledgments</h3>
<p>Content contributors: Michael Sherman, Yuan Cao, Erick Armbrust, Anant Nawalgaria, Antonio Gulli, Simone Cammel</p>
<p>Curators and Editors: Antonio Gulli, Anant Nawalgaria, Grace Mollison</p>
<p>Technical Writer: Joey Haymaker</p>
<p>Designer: Michael Lanning</p>`,
        "ja": `<h2>目次と紹介</h2>
<p><strong>Prompt Engineering - Google プロンプトエンジニアリング完全ガイド（中日バイリンガル版）</strong></p>
<p>著者: Lee Boonstra</p>
<p>バージョン: 7.0</p>
<h3>目次</h3>
<ul>
<li>Introduction 紹介</li>
<li>Prompt engineering プロンプトエンジニアリング</li>
<li>LLM output configuration 大規模言語モデルの出力設定</li>
<li>Prompting techniques プロンプト技術</li>
<li>Code prompting コードプロンプト</li>
<li>Multimodal prompting マルチモーダルプロンプト</li>
<li>Prompt engineering best practices ベストプラクティス</li>
<li>References 参考文献</li>
</ul>
<h3>謝辞</h3>
<p>コンテンツ寄稿者: Michael Sherman, Yuan Cao, Erick Armbrust, Anant Nawalgaria, Antonio Gulli, Simone Cammel</p>
<p>キュレーター兼エディター: Antonio Gulli, Anant Nawalgaria, Grace Mollison</p>
<p>テクニカルライター: Joey Haymaker</p>
<p>デザイナー: Michael Lanning</p>`
      }
    },
    {
      title: "提示工程基础",
      title_i18n: {
        "zh-CN": "提示工程基础",
        "en": "Prompt Engineering Basics",
        "ja": "プロンプトエンジニアリングの基礎"
      },
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
</ul>`,
      content_i18n: {
        "zh-CN": `<h2>提示工程基础</h2>
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
</ul>`,
        "en": `<h2>Prompt Engineering Basics</h2>
<h3>What is Prompt Engineering?</h3>
<p>Prompt Engineering is the process of designing and optimizing input prompts to achieve the best output from Large Language Models (LLMs). As LLM capabilities continue to improve, effectively interacting with these models becomes increasingly important.</p>
<p>Remember how LLMs work: they are prediction engines. The model receives sequential text as input, then predicts what the next token should be based on training data.</p>
<h3>Why is Prompt Engineering Important?</h3>
<p>Good prompts can:</p>
<ul>
<li>Improve accuracy and relevance of model outputs</li>
<li>Reduce hallucinations and inaccurate information</li>
<li>Produce more structured, usable output formats</li>
<li>Lower API call costs (through more efficient prompts)</li>
</ul>
<h3>Components of a Prompt</h3>
<p>A complete prompt typically contains:</p>
<ul>
<li><strong>Instruction</strong>: Tells the model what to do</li>
<li><strong>Context</strong>: Provides background information</li>
<li><strong>Input Data</strong>: The specific content to process</li>
<li><strong>Output Indicator</strong>: Specifies the output format</li>
</ul>`,
        "ja": `<h2>プロンプトエンジニアリングの基礎</h2>
<h3>プロンプトエンジニアリングとは？</h3>
<p>プロンプトエンジニアリングは、大規模言語モデル（LLM）から最良の出力を得るために入力プロンプトを設計・最適化するプロセスです。LLMの能力が向上するにつれて、これらのモデルと効果的にやり取りすることがますます重要になっています。</p>
<p>LLMの仕組みを覚えておいてください：それは予測エンジンです。モデルは順次テキストを入力として受け取り、トレーニングデータに基づいて次のトークンが何であるべきかを予測します。</p>
<h3>なぜプロンプトエンジニアリングは重要か？</h3>
<p>良いプロンプトは：</p>
<ul>
<li>モデル出力の正確性と関連性を向上させる</li>
<li>幻覚や不正確な情報を減らす</li>
<li>より構造的で有用的な出力形式を得る</li>
<li>より効率的なプロンプトでAPI呼び出しコストを削減する</li>
</ul>
<h3>プロンプトの構成要素</h3>
<p>完全なプロンプトには通常以下が含まれます：</p>
<ul>
<li><strong>命令（Instruction）</strong>：モデルに何をすべきかを伝える</li>
<li><strong>文脈（Context）</strong>：背景情報を提供する</li>
<li><strong>入力データ（Input Data）</strong>：処理する具体的なコンテンツ</li>
<li><strong>出力指示（Output Indicator）</strong>：出力形式を指定する</li>
</ul>`
      }
    },
    {
      title: "LLM输出配置",
      title_i18n: {
        "zh-CN": "LLM输出配置",
        "en": "LLM Output Configuration",
        "ja": "LLM出力設定"
      },
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
</ul>`,
      content_i18n: {
        "zh-CN": `<h2>LLM输出配置</h2>
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
</ul>`,
        "en": `<h2>LLM Output Configuration</h2>
<h3>Output Length Control</h3>
<p>The max_tokens parameter controls the maximum length of model output. This is useful for limiting response length and controlling costs.</p>
<h3>Sampling Control Parameters</h3>
<p><strong>Temperature</strong></p>
<p>Controls output randomness:</p>
<ul>
<li>0.0-0.3: More deterministic, conservative output</li>
<li>0.7-1.0: More creative, diverse output</li>
</ul>
<p><strong>Top-K and Top-P</strong></p>
<p>These parameters limit the set of tokens the model can choose at each step:</p>
<ul>
<li>Top-K: Only consider the K highest probability tokens</li>
<li>Top-P (Nucleus sampling): Consider the smallest set of tokens whose cumulative probability reaches P</li>
</ul>
<h3>Combined Applications</h3>
<p>Different tasks require different parameter combinations:</p>
<ul>
<li><strong>Code generation</strong>: Low temperature (0.1-0.3) for deterministic output</li>
<li><strong>Creative writing</strong>: High temperature (0.7-0.9) for diversity</li>
<li><strong>Fact-based Q&A</strong>: Low temperature with appropriate Top-P</li>
</ul>`,
        "ja": `<h2>LLM出力設定</h2>
<h3>出力長の制御</h3>
<p>max_tokensパラメータを使用して、モデル出力の最大長を制御できます。これは応答の長さを制限し、コストを制御するのに便利です。</p>
<h3>サンプリング制御パラメータ</h3>
<p><strong>Temperature（温度）</strong></p>
<p>出力のランダム性を制御します：</p>
<ul>
<li>0.0-0.3：より確実で保守的な出力</li>
<li>0.7-1.0：より創造的で多様な出力</li>
</ul>
<p><strong>Top-KとTop-P</strong></p>
<p>これらのパラメータは、各ステップでモデルが選択できるトークンのセットを制限します：</p>
<ul>
<li>Top-K：確率の高い上位K個のトークンのみを考慮</li>
<li>Top-P（Nucleus sampling）：累積確率がPに達する最小のトークンセットを考慮</li>
</ul>
<h3>複合応用</h3>
<p>異なるタスクには異なるパラメータの組み合わせが必要です：</p>
<ul>
<li><strong>コード生成</strong>：決定論的出力のために低temperature（0.1-0.3）</li>
<li><strong>クリエイティブライティング</strong>：多様性のために高temperature（0.7-0.9）</li>
<li><strong>ファクトベースQ&A</strong>：適切なTop-Pと低temperature</li>
</ul>`
      }
    },
    {
      title: "提示技术对比",
      title_i18n: {
        "zh-CN": "提示技术对比",
        "en": "Prompting Techniques Comparison",
        "ja": "プロンプト技術の比較"
      },
      level: 1,
      content: `<h2>提示技术对比</h2>
<h3>不同提示技术的效果对比</h3>
<div class="chart-container">
  <div class="chart-title">不同提示技术在各任务上的表现</div>
  <div class="risk-chart">
    <div class="risk-bar" style="--value: 95%; --color: #4F46E5;">
      <span class="risk-label">Zero-shot</span>
      <span class="risk-value">基础任务</span>
    </div>
    <div class="risk-bar" style="--value: 88%; --color: #7C3AED;">
      <span class="risk-label">Few-shot</span>
      <span class="risk-value">复杂任务</span>
    </div>
    <div class="risk-bar" style="--value: 92%; --color: #2563EB;">
      <span class="risk-label">CoT</span>
      <span class="risk-value">推理任务</span>
    </div>
  </div>
  <div class="chart-caption">图1: 各提示技术表现对比</div>
</div>`,
      content_i18n: {
        "zh-CN": `<h2>提示技术对比</h2>
<h3>不同提示技术的效果对比</h3>
<div class="chart-container">
  <div class="chart-title">不同提示技术在各任务上的表现</div>
  <div class="risk-chart">
    <div class="risk-bar" style="--value: 95%; --color: #4F46E5;">
      <span class="risk-label">Zero-shot</span>
      <span class="risk-value">基础任务</span>
    </div>
    <div class="risk-bar" style="--value: 88%; --color: #7C3AED;">
      <span class="risk-label">Few-shot</span>
      <span class="risk-value">复杂任务</span>
    </div>
    <div class="risk-bar" style="--value: 92%; --color: #2563EB;">
      <span class="risk-label">CoT</span>
      <span class="risk-value">推理任务</span>
    </div>
  </div>
  <div class="chart-caption">图1: 各提示技术表现对比</div>
</div>`,
        "en": `<h2>Prompting Techniques Comparison</h2>
<h3>Performance Comparison</h3>
<div class="chart-container">
  <div class="chart-title">Performance by Task Type</div>
  <div class="risk-chart">
    <div class="risk-bar" style="--value: 95%; --color: #4F46E5;">
      <span class="risk-label">Zero-shot</span>
      <span class="risk-value">Basic</span>
    </div>
    <div class="risk-bar" style="--value: 88%; --color: #7C3AED;">
      <span class="risk-label">Few-shot</span>
      <span class="risk-value">Complex</span>
    </div>
    <div class="risk-bar" style="--value: 92%; --color: #2563EB;">
      <span class="risk-label">CoT</span>
      <span class="risk-value">Reasoning</span>
    </div>
  </div>
  <div class="chart-caption">Figure 1: Performance Comparison</div>
</div>`,
        "ja": `<h2>プロンプト技術の比較</h2>
<h3>パフォーマンス比較</h3>
<div class="chart-container">
  <div class="chart-title">タスク別パフォーマンス</div>
  <div class="risk-chart">
    <div class="risk-bar" style="--value: 95%; --color: #4F46E5;">
      <span class="risk-label">Zero-shot</span>
      <span class="risk-value">基本</span>
    </div>
    <div class="risk-bar" style="--value: 88%; --color: #7C3AED;">
      <span class="risk-label">Few-shot</span>
      <span class="risk-value">複雑</span>
    </div>
    <div class="risk-bar" style="--value: 92%; --color: #2563EB;">
      <span class="risk-label">CoT</span>
      <span class="risk-value">推論</span>
    </div>
  </div>
  <div class="chart-caption">図1: パフォーマンス比較</div>
</div>`
      }
    },
    {
      title: "提示技术速查表",
      title_i18n: {
        "zh-CN": "提示技术速查表",
        "en": "Quick Reference Table",
        "ja": "早見表"
      },
      level: 1,
      content: `<h2>提示技术速查表</h2>
<div class="chart-container">
  <table class="data-table">
    <thead>
      <tr>
        <th>技术名称</th>
        <th>适用场景</th>
        <th>Temperature</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Zero-shot</strong></td>
        <td>简单分类、翻译</td>
        <td>0.3-0.5</td>
      </tr>
      <tr>
        <td><strong>Few-shot</strong></td>
        <td>模式匹配、格式转换</td>
        <td>0.3-0.5</td>
      </tr>
      <tr>
        <td><strong>Chain-of-Thought</strong></td>
        <td>数学推理、逻辑分析</td>
        <td>0.3-0.7</td>
      </tr>
    </tbody>
  </table>
  <div class="chart-caption">表1: 主流提示技术速查表</div>
</div>`,
      content_i18n: {
        "zh-CN": `<h2>提示技术速查表</h2>
<div class="chart-container">
  <table class="data-table">
    <thead>
      <tr>
        <th>技术名称</th>
        <th>适用场景</th>
        <th>Temperature</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Zero-shot</strong></td>
        <td>简单分类、翻译</td>
        <td>0.3-0.5</td>
      </tr>
      <tr>
        <td><strong>Few-shot</strong></td>
        <td>模式匹配、格式转换</td>
        <td>0.3-0.5</td>
      </tr>
      <tr>
        <td><strong>Chain-of-Thought</strong></td>
        <td>数学推理、逻辑分析</td>
        <td>0.3-0.7</td>
      </tr>
    </tbody>
  </table>
  <div class="chart-caption">表1: 主流提示技术速查表</div>
</div>`,
        "en": `<h2>Quick Reference Table</h2>
<div class="chart-container">
  <table class="data-table">
    <thead>
      <tr>
        <th>Technique</th>
        <th>Use Case</th>
        <th>Temperature</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Zero-shot</strong></td>
        <td>Classification, translation</td>
        <td>0.3-0.5</td>
      </tr>
      <tr>
        <td><strong>Few-shot</strong></td>
        <td>Pattern matching</td>
        <td>0.3-0.5</td>
      </tr>
      <tr>
        <td><strong>Chain-of-Thought</strong></td>
        <td>Math, logic analysis</td>
        <td>0.3-0.7</td>
      </tr>
    </tbody>
  </table>
  <div class="chart-caption">Table 1: Quick Reference</div>
</div>`,
        "ja": `<h2>早見表</h2>
<div class="chart-container">
  <table class="data-table">
    <thead>
      <tr>
        <th>技術名</th>
        <th>使用場面</th>
        <th>Temperature</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Zero-shot</strong></td>
        <td>分類、翻訳</td>
        <td>0.3-0.5</td>
      </tr>
      <tr>
        <td><strong>Few-shot</strong></td>
        <td>パターンマッチング</td>
        <td>0.3-0.5</td>
      </tr>
      <tr>
        <td><strong>Chain-of-Thought</strong></td>
        <td>数学的推論</td>
        <td>0.3-0.7</td>
      </tr>
    </tbody>
  </table>
  <div class="chart-caption">表1: 早見表</div>
</div>`
      }
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { REPORT_CHUNK_prompt_engineering_v7_0: window.REPORT_CHUNK_prompt_engineering_v7_0 };
}
