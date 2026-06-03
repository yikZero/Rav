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
    name: 'Codex',
    description: {
      'zh-CN': '现在的主力编码 Agent，负责仓库里的实际改动、验证和交付',
      en: 'My primary coding agent now; handles real repo changes, verification, and delivery',
    },
    icon: 'https://cdn.yikzero.com/rav/stack/codex.png',
    link: 'https://openai.com/codex/',
    category: 'AI',
  },
  {
    name: 'Claude Pro',
    description: {
      'zh-CN': '退回 Pro 后，主要用于辅助推理、改写和交叉检查',
      en: 'Moved back to Pro; now used for auxiliary reasoning, rewriting, and cross-checks',
    },
    icon: 'https://cdn.yikzero.com/rav/stack/claude-code.png',
    link: 'https://claude.ai/',
    category: 'AI',
  },
  {
    name: 'Gemini Pro',
    description: {
      'zh-CN': '基本不用了，偶尔用于长上下文资料核对',
      en: 'Barely used now; occasionally kept for long-context reference checks',
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
      'zh-CN': '主力终端，轻快稳定，用来跑本地服务与日常命令',
      en: 'My primary terminal: fast, stable, and used for local services and daily commands',
    },
    icon: 'https://cdn.yikzero.com/rav/stack/ghostty.png',
    link: 'https://ghostty.org/',
    category: 'Development',
  },
  {
    name: 'Zed',
    description: {
      'zh-CN': '替代 VS Code 的主力编辑器，手写代码和快速改动更顺手',
      en: 'My VS Code replacement and primary editor for manual coding and quick edits',
    },
    icon: 'https://cdn.yikzero.com/rav/stack/zed.png',
    link: 'https://zed.dev',
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
    name: 'Dropover',
    description: {
      'zh-CN': '拖拽增强工具，文件收集、整理与分享一步到位',
      en: 'Drag-and-drop utility for effortless file collecting, organizing, and sharing',
    },
    icon: 'https://cdn.yikzero.com/rav/stack/dropover.png',
    link: 'https://dropoverapp.com/',
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
