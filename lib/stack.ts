import type { locales } from '@/i18n/routing';

type Locale = (typeof locales)[number];

export interface StackItem {
  name: string;
  description: Record<Locale, string>;
  icon: string;
  link?: string;
  category: string;
}

export const stackCategories = [
  'AI',
  'Design',
  'Development',
  'Productivity',
] as const;

export type StackCategory = (typeof stackCategories)[number];

export const categoryLabels: Record<StackCategory, Record<Locale, string>> = {
Design: { 'zh-CN': '设计', en: 'Design' },
  AI: { 'zh-CN': 'AI', en: 'AI' },
  Development: { 'zh-CN': '开发', en: 'Development' },
  Productivity: { 'zh-CN': '效率', en: 'Productivity' },
};

export const stackItems: StackItem[] = [
  // Design
  {
    name: 'Figma',
    description: {
      'zh-CN': '使用频率降低，高需求设计或团队协作时依然不可或缺',
      en: 'Used less often now, but still indispensable for high-fidelity design or team collaboration',
    },
    icon: 'https://cdn.yikzero.com/rav/stack/figma.png',
    link: 'https://www.figma.com',
    category: 'Design',
  },
  {
    name: 'Stitch',
    description: {
      'zh-CN': '用于快速生成草稿，激发设计灵感',
      en: 'Great for generating quick drafts and sparking inspiration',
    },
    icon: 'https://cdn.yikzero.com/rav/stack/stitch.png',
    link: 'https://stitch.withgoogle.com/',
    category: 'Design',
  },
  // AI
  {
    name: 'Claude Max',
    description: {
      'zh-CN': '主力编码核心，省心省力，同时驱动 Conductor 与 Craft Agents',
      en: 'My core coding engine—effortless and reliable; powers both Conductor and Craft Agents',
    },
    icon: 'https://cdn.yikzero.com/rav/stack/claude-code.png',
    link: 'https://claude.ai/',
    category: 'AI',
  },
  {
    name: 'Gemini Pro',
    description: {
      'zh-CN': '主要用于文案撰写、长文本处理及日常学习',
      en: 'My go-to for creative writing, long-context processing, and daily learning',
    },
    icon: 'https://cdn.yikzero.com/rav/stack/gemini.png',
    link: 'https://gemini.google.com',
    category: 'AI',
  },
  {
    name: 'Conductor',
    description: {
      'zh-CN': '与 Git 深度集成，擅长并行处理多个开发任务',
      en: 'Seamless Git integration; handles multiple development tasks in parallel',
    },
    icon: 'https://cdn.yikzero.com/rav/stack/conductor.png',
    link: 'https://www.conductor.build/',
    category: 'AI',
  },
  {
    name: 'Craft Agents',
    description: {
      'zh-CN': '非代码类任务的首选，专用于处理本地文件与自动化工作流',
      en: 'My go-to for non-coding tasks, specialized in handling local files and automation workflows',
    },
    icon: 'https://cdn.yikzero.com/rav/stack/craft-agents.png',
    link: 'https://github.com/lukilabs/craft-agents-oss',
    category: 'AI',
  },
  {
    name: 'Typeless',
    description: {
      'zh-CN': '语音编程利器，识别精准且足够聪明',
      en: 'Enables coding by voice; features accurate recognition and impressive intelligence',
    },
    icon: 'https://cdn.yikzero.com/rav/stack/typeless.png',
    link: 'https://www.typeless.com/',
    category: 'AI',
  },
  // Development
  {
    name: 'Google Chrome',
    description: {
      'zh-CN': '账户切换顺滑，加载不卡顿，换来换去还是他',
      en: 'Smooth profile switching, fast loading—I always come back to it',
    },
    icon: 'https://cdn.yikzero.com/rav/stack/chrome.png',
    link: 'https://www.google.com/chrome/',
    category: 'Development',
  },
  {
    name: 'Ghostty',
    description: {
      'zh-CN': '微调 UI 后，堪称颜值最高的终端模拟器',
      en: 'With some UI tweaks, arguably the best-looking terminal available',
    },
    icon: 'https://cdn.yikzero.com/rav/stack/ghostty.png',
    link: 'https://ghostty.org',
    category: 'Development',
  },
  {
    name: 'VS Code',
    description: {
      'zh-CN': '偶尔手动编码时配合大模型使用，但使用频率已逐渐降低',
      en: 'Occasionally paired with LLMs for manual coding, though usage has gradually decreased',
    },
    icon: 'https://cdn.yikzero.com/rav/stack/vscode.png',
    link: 'https://code.visualstudio.com',
    category: 'Development',
  },
  // Productivity
  {
    name: 'Raycast',
    description: {
      'zh-CN': 'Spotlight 的完美替代，日常必用的启动器与剪贴板管理工具',
      en: 'The perfect Spotlight replacement; a daily essential for launching apps and managing clipboard history',
    },
    icon: 'https://cdn.yikzero.com/rav/stack/raycast.png',
    link: 'https://www.raycast.com',
    category: 'Productivity',
  },
  {
    name: 'Obsidian',
    description: {
      'zh-CN': '本地优先的 Markdown 笔记与知识库',
      en: 'A local-first Markdown note-taking app and knowledge base',
    },
    icon: 'https://cdn.yikzero.com/rav/stack/obsidian.png',
    link: 'https://obsidian.md',
    category: 'Productivity',
  },
  {
    name: 'CleanShot X',
    description: {
      'zh-CN': '截图与录屏神器，标注、GIF 制作一步到位',
      en: 'The ultimate tool for screenshots and screen recording, featuring seamless annotation and GIF export',
    },
    icon: 'https://cdn.yikzero.com/rav/stack/cleanshot.png',
    link: 'https://cleanshot.com',
    category: 'Productivity',
  },
  {
    name: 'Bob',
    description: {
      'zh-CN': '翻译与 OCR 工具，支持快捷键一键取词翻译',
      en: 'Translation and OCR tool with convenient one-key shortcuts',
    },
    icon: 'https://cdn.yikzero.com/rav/stack/bob.png',
    link: 'https://bobtranslate.com/',
    category: 'Productivity',
  },
  {
    name: 'HandBrake',
    description: {
      'zh-CN': '开源视频转码工具，搞定格式转换与压缩',
      en: 'Open-source video transcoder for format conversion and compression',
    },
    icon: 'https://cdn.yikzero.com/rav/stack/handbrake.png',
    link: 'https://handbrake.fr',
    category: 'Productivity',
  },
  {
    name: 'Tiny Image',
    description: {
      'zh-CN': '基于 TinyPNG 的 PNG/JPEG 图片压缩工具',
      en: 'PNG/JPEG image compression tool powered by TinyPNG',
    },
    icon: 'https://cdn.yikzero.com/rav/stack/tinypng.png',
    link: 'https://github.com/kyleduo/TinyPNG4Mac',
    category: 'Productivity',
  },
];
