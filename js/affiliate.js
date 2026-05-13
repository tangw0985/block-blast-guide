// ==========================================
// Affiliate 链接跟踪框架
// ==========================================

// Affiliate 配置
const affiliateConfig = {
    // App Store affiliate ID (需要替换为真实的)
    appStore: {
        partnerId: 'YOUR_APPLE_AFFILIATE_ID',
        campaignToken: 'YOUR_CAMPAIGN_TOKEN'
    },

    // Google Play affiliate (需要替换为真实的)
    googlePlay: {
        referrer: 'utm_source=website&utm_medium=download&utm_campaign=block_blast_guide'
    },

    // 加速器 affiliate 链接
    accelerators: {
        acceleratorA: {
            url: 'https://加速器A官网.com',
            affiliateParam: '?ref=YOUR_AFFILIATE_ID'
        },
        acceleratorB: {
            url: 'https://加速器B官网.com',
            affiliateParam: '?aff=YOUR_AFFILIATE_CODE'
        }
    }
};

// 生成 App Store affiliate 链接
function generateAppStoreLink(appId) {
    const baseUrl = `https://apps.apple.com/app/id${appId}`;
    const params = new URLSearchParams({
        pt: affiliateConfig.appStore.partnerId,
        ct: affiliateConfig.appStore.campaignToken,
        mt: '8'
    });
    return `${baseUrl}?${params.toString()}`;
}

// 生成 Google Play affiliate 链接
function generateGooglePlayLink(packageName) {
    const baseUrl = `https://play.google.com/store/apps/details`;
    const params = new URLSearchParams({
        id: packageName,
        referrer: affiliateConfig.googlePlay.referrer
    });
    return `${baseUrl}?${params.toString()}`;
}

// 生成加速器 affiliate 链接
function generateAcceleratorLink(acceleratorKey) {
    const config = affiliateConfig.accelerators[acceleratorKey];
    if (!config) return '#';
    return config.url + config.affiliateParam;
}

// 跟踪点击事件
function trackAffiliateClick(linkType, linkName) {
    // 发送到 Google Analytics（如果已配置）
    if (typeof gtag !== 'undefined') {
        gtag('event', 'affiliate_click', {
            'event_category': 'Affiliate',
            'event_label': `${linkType} - ${linkName}`,
            'value': 1
        });
    }

    // 也可以发送到自己的服务器
    console.log(`Affiliate click tracked: ${linkType} - ${linkName}`);

    // 可以在这里添加更多跟踪逻辑
    // 例如：发送到自己的 API
    // fetch('/api/track-affiliate', {
    //     method: 'POST',
    //     body: JSON.stringify({ linkType, linkName, timestamp: Date.now() })
    // });
}

// 初始化 affiliate 链接
function initAffiliateLinks() {
    // 为所有带有 data-affiliate 属性的链接添加跟踪
    const affiliateLinks = document.querySelectorAll('[data-affiliate]');

    affiliateLinks.forEach(link => {
        const affiliateType = link.getAttribute('data-affiliate');
        const affiliateName = link.getAttribute('data-affiliate-name') || 'Unknown';

        // 添加点击跟踪
        link.addEventListener('click', (e) => {
            trackAffiliateClick(affiliateType, affiliateName);
        });

        // 根据类型生成链接（如果 href 是占位符）
        if (link.href === '#' || link.href.endsWith('#')) {
            switch(affiliateType) {
                case 'app-store':
                    // 需要替换为真实的 App ID
                    link.href = generateAppStoreLink('YOUR_APP_ID');
                    break;
                case 'google-play':
                    // 需要替换为真实的包名
                    link.href = generateGooglePlayLink('com.example.blockblast');
                    break;
                case 'accelerator-a':
                    link.href = generateAcceleratorLink('acceleratorA');
                    break;
                case 'accelerator-b':
                    link.href = generateAcceleratorLink('acceleratorB');
                    break;
            }
        }
    });
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', initAffiliateLinks);

// ==========================================
// 使用说明
// ==========================================
/*
在 HTML 中使用方式：

1. App Store 下载链接：
<a href="#"
   data-affiliate="app-store"
   data-affiliate-name="Block Blast iOS"
   class="btn btn-primary">
   前往 App Store 下载
</a>

2. Google Play 下载链接：
<a href="#"
   data-affiliate="google-play"
   data-affiliate-name="Block Blast Android"
   class="btn btn-primary">
   前往 Google Play 下载
</a>

3. 加速器推荐链接：
<a href="#"
   data-affiliate="accelerator-a"
   data-affiliate-name="加速器 A"
   class="btn btn-secondary">
   了解更多
</a>

注意：
1. 需要替换 affiliateConfig 中的占位符为真实的 affiliate ID
2. 需要替换 App ID 和包名
3. 如果使用 Google Analytics，确保已正确配置 gtag
*/
