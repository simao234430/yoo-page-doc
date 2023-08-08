开发指南

# 颜色1

组件库内置了一套符合人眼视觉的色彩算法。

```js
import ACCard from '../../../widget/Card';

<ACCard
  title="Palette test 色彩工具"
  description="使用颜色实用工具，轻松配置色板，一键导出多格式色彩文件。"
  link="/palette"
  icon="Palette"
  buttonText="112221立即使用33"
/>
```

## 简介

组件库内置了一套基于动态梯度的色彩算法，并且在亮色的色彩算法基础上，经过反转和微调，得到了一套暗黑模式下的色彩算法。

色板中包含了 13 个常见的颜色，每个颜色分为 10 个梯度。通常，我们把 6 号色作为色板中的主色。