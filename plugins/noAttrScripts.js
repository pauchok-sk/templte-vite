const noAttrScripts = () => {
  return {
    name: "no-attribute-scripts",
    transformIndexHtml(html) {
      // Находим все script теги с type="module" и их атрибуты
      const scriptRegex = /<script(\s+type="module"\s+[^>]*src="([^"]*)"[^>]*)><\/script>/g;
      let scripts = [];
      let match;

      // Собираем информацию о script тегах
      while ((match = scriptRegex.exec(html)) !== null) {
        scripts.push({
          fullTag: match[0],
          src: match[2]
        });
      }

      let newHtml = html;

      // Заменяем каждый script тег на упрощенную версию без атрибутов
      scripts.forEach(script => {
        const simplifiedTag = `<script src="${script.src}"></script>`;
        newHtml = newHtml.replace(script.fullTag, simplifiedTag);
      });

      return newHtml;
    },
  };
};

export default noAttrScripts;