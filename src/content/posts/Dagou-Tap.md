---
title: 大狗 Tap · 把互动壁纸搬进网页
published: 2026-10-02
description: 把 MarkCup 的「大狗 Tap」互动壁纸搬进博客——图片、音效、Canvas 特效全都原样跑起来。
image: dagou-tap/preview.jpg
tags: [互动, 壁纸, 网页]
category: 玩具
draft: false
slug: Dagou-Tap
licenseName: MIT
author: 𝘚𝘩𝘪𝘮𝘮𝘦𝘳𝘧𝘭𝘺 · 星沫 & DeepSeek & MarkCup
---

把 MarkCup 的 **「大狗 Tap」** 互动壁纸原封不动搬进了博客喵～整个网页应用（含图片、音效、Canvas 特效）已经放在本站的 `public/dagou-tap/` 里，直接在下面这个框里就能玩喵！

> [!NOTE]
> 第一次点任意位置是必要的喵——浏览器不允许网页在用户操作之前自动播放声音，点一下之后音乐和音效才会解锁～

## 🐶 直接开玩

<iframe src="/dagou-tap/index.html" title="大狗 Tap 互动壁纸" width="100%" height="640" style="border:none;border-radius:16px;background:#fff2dc;" allow="autoplay" loading="lazy"></iframe>

如果上面没显示出来，点这里也一样喵 👉 **[全屏打开大狗 Tap](/dagou-tap/index.html)**

## 🎮 玩法

| 操作 | 效果 |
|---|---|
| 点击大狗 | 张嘴 + 随机叫一声（da / gou / jiao） |
| 按住 / 拖动 | 连续触发节奏音效，狗子会跟着晃 |
| 右上角 **音乐** 按钮 | 单独开关 128 BPM 的节拍背景音乐 |
| 右上角 **音效** 按钮 | 单独开关狗叫音效 |
| 右上角 **视频** 按钮 | 跳到作者的哔哩哔哩视频 |
| 右下角 `Created by MarkCup` | 打开作者 B 站主页 |

背景是跟着节拍律动的全屏 Canvas 几何特效，和弦走向是经典的 **C–G–Am–F** 循环喵～

## 📁 它是怎么跑起来的

全部是纯静态文件，没有构建步骤，所以直接丢进 `public/` 就能用喵：

| 文件 | 作用 |
|---|---|
| `index.html` | 页面骨架、配色变量与全部样式 |
| `main.js` | 节拍调度、Canvas 特效、互动与音效逻辑 |
| `audio-data.js` | 内嵌成 base64 的音效数据（免跨域 / 免额外请求） |
| `Image/dagou_open_mouth.png`<br>`Image/dagou_close_mouth.png` | 张嘴 / 闭嘴两帧大狗 |
| `audio/da.wav` `gou.wav` `jiao.wav` | 原始音效素材（`audio-data.js` 就是它们生成的） |
| `preview.jpg` | 封面图（也是创意工坊的预览图） |

> [!TIP]
> 想在自己的页面里嵌同样的东西，只要把整个文件夹放进 `public/`，然后用一个 `<iframe>` 指向 `index.html` 就行喵～

## © 版权

- 原项目： [MarkCup-Official/Dagou-Tap-New](https://github.com/MarkCup-Official/Dagou-Tap-New)
- 作者： **MarkCup**（Bilibili：[space.bilibili.com/357762853](https://space.bilibili.com/357762853)）
- 本页使用的是把它改造为 Wallpaper Engine 互动壁纸的版本，遵循原项目的 **MIT** 许可
- © 2026 MarkCup. Licensed under MIT.

如果你也把这套壁纸搬到了别的地方，记得保留上面的署名喵～
