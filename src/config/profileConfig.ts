import type { ProfileConfig } from "../types/profileConfig";

export const profileConfig: ProfileConfig = {
	// 头像
	// 图片路径支持三种格式：
	// 1. public 目录（以 "/" 开头，不优化）："/assets/images/avatar.webp"
	// 2. src 目录（不以 "/" 开头，自动优化但会增加构建时间，推荐）："assets/images/avatar.webp"
	// 3. 远程 URL："https://example.com/avatar.jpg"
	avatar: "assets/images/avatar.jpg",

	// 名字
	name: "𝘚𝘩𝘪𝘮𝘮𝘦𝘳𝘧𝘭𝘺 · 星沫",

	// 个人签名
	bio: "竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生",

	// 链接配置
	// 已经预装的图标集：fa7-brands，fa7-regular，fa7-solid，material-symbols，simple-icons
	// 访问https://icones.js.org/ 获取图标代码，
	// 如果想使用尚未包含相应的图标集，则需要安装它
	// `pnpm add @iconify-json/<icon-set-name>`
	// showName: true 时显示图标和名称，false 时只显示图标
	links: [
		{
			name: "Telegram",
			icon: "fa7-brands:telegram",
			url: "https://t.me/Jack_Huang_114514",
			showName: true,
		},
		{
			name: "WeChat",
			icon: "fa7-brands:weixin",
			url: "/assets/images/personal/wechat.png",
			showName: true,
		},
		{
			name: "QQ",
			icon: "fa7-brands:qq",
			url: "https://qm.qq.com/q/UOhNYtnOSe",
			showName: true,
		},
		{
			name: "Outlook",
			icon: "fa7-solid:envelope",
			url: "mailto:Jack-Huang-2020@outlook.com",
			showName: true,
		},
		{
			name: "Gmail",
			icon: "fa7-solid:envelope",
			url: "mailto:Jack.Huang.20100704@gmail.com",
			showName: true,
		},
		{
			name: "小破站",
			icon: "fa7-brands:bilibili",
			url: "https://space.bilibili.com/581938829",
			showName: true,
		},
		{
			name: "GitHub",
			icon: "fa7-brands:github",
			url: "https://github.com/Shimmerfly",
			showName: true,
		},
		{
			name: "𝕏",
			icon: "fa7-brands:x-twitter",
			url: "http://x.com/Jack_Huang_2020",
			showName: true,
		},
		{
			name: "Youtube",
			icon: "fa7-brands:youtube",
			url: "https://www.youtube.com/@Jack-Huang-2010",
			showName: true,
		},
		{
			name: "RSS",
			icon: "material-symbols:rss-feed-rounded",
			url: "/rss/",
			showName: true,
		},
	],
};
