// 当前语言
let currentLang = localStorage.getItem('blog_language') || 'zh-CN';

// 语言文本映射
const langText = {
  'zh-CN': '中文',
  'en': 'English'
};

// 页面映射关系
const pageMapping = {
  'zh-CN': {
    '/pages/about.html': '/pages/about.html',
    '/pages/links.html': '/pages/links.html',
    '/pages/search.html': '/pages/search.html',
    '/pages/en/about.html': '/pages/about.html',
    '/pages/en/links.html': '/pages/links.html',
    '/pages/en/search.html': '/pages/search.html'
  },
  'en': {
    '/pages/about.html': '/pages/en/about.html',
    '/pages/links.html': '/pages/en/links.html',
    '/pages/search.html': '/pages/en/search.html',
    '/pages/en/about.html': '/pages/en/about.html',
    '/pages/en/links.html': '/pages/en/links.html',
    '/pages/en/search.html': '/pages/en/search.html'
  }
};

// 检查当前页面是否需要重定向
function checkRedirect(newLang) {
  const currentPath = window.location.pathname;
  const mappedPath = pageMapping[newLang][currentPath];
  
  if (mappedPath && mappedPath !== currentPath) {
    window.location.href = mappedPath;
    return true;
  }
  return false;
}

// 初始化语言
function initLanguage() {
  document.documentElement.lang = currentLang;
  document.querySelector('meta[http-equiv="content-language"]').setAttribute('content', currentLang);
  updateLanguageButton();
  translatePage();
  
  // 触发自定义事件，通知语言变化
  const event = new CustomEvent('languageChanged', { detail: { language: currentLang } });
  window.dispatchEvent(event);
}

// 切换语言
function toggleLanguage() {
  const newLang = currentLang === 'zh-CN' ? 'en' : 'zh-CN';
  
  // 检查是否需要重定向
  if (checkRedirect(newLang)) {
    // 如果需要重定向，先保存新的语言设置
    localStorage.setItem('blog_language', newLang);
    return; // 重定向后会重新加载页面，不需要执行后续代码
  }
  
  // 如果不需要重定向，正常切换语言
  currentLang = newLang;
  localStorage.setItem('blog_language', currentLang);
  document.documentElement.lang = currentLang;
  document.querySelector('meta[http-equiv="content-language"]').setAttribute('content', currentLang);
  updateLanguageButton();
  translatePage();
  
  // 触发自定义事件，通知语言变化
  const event = new CustomEvent('languageChanged', { detail: { language: currentLang } });
  window.dispatchEvent(event);
}

// 更新语言切换按钮文本
function updateLanguageButton() {
  const langButton = document.querySelector('.language-switch .lang-text');
  if (langButton) {
    langButton.textContent = langText[currentLang === 'zh-CN' ? 'en' : 'zh-CN'];
  }
}

// 翻译页面内容
function translatePage() {
  console.log('Translating to:', currentLang);
  const elements = document.querySelectorAll('[data-i18n]');
  console.log('Found elements to translate:', elements.length);
  
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    console.log('Translating element with key:', key);
    
    if (!translations[currentLang]) {
      console.error('Translation not found for language:', currentLang);
      return;
    }
    
    const translation = translations[currentLang][key];
    if (translation) {
      if (element.tagName === 'INPUT' && element.type === 'placeholder') {
        element.placeholder = translation;
      } else {
        element.textContent = translation;
      }
      console.log('Translated:', key, '->', translation);
    } else {
      console.warn('No translation found for key:', key);
    }
  });

  // 更新页面标题
  const titleElement = document.querySelector('title');
  if (titleElement) {
    const pageTitleKey = `page.title.${window.location.pathname.split('/').pop().replace('.html', '')}`;
    const pageTitle = translations[currentLang][pageTitleKey];
    if (pageTitle) {
      titleElement.textContent = `${pageTitle} - ${translations[currentLang]['site.title'] || 'Blog'}`;
    }
  }
}

// 页面加载完成后初始化语言
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing language...');
  initLanguage();
  
  // 检查是否需要重定向到正确的语言版本
  if (checkRedirect(currentLang)) {
    return; // 如果需要重定向，不需要执行后续初始化
  }
}); 