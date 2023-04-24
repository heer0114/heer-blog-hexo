Global.initCategoryClick = () => {
  const categoryItemList = document.querySelectorAll('ul.sidebar-all-category-list li.sidebar-all-category-list-item');
  categoryItemList.forEach((item, i) => {
    const itemI = item.querySelector('i.fa-book-open');
    // 绑定点击事件
    itemI.addEventListener('click', e => {
      console.log("itemI: " + itemI);
      const ul = item.querySelector('li.sidebar-all-category-list-item > ul');
      // 这里为空说明是最后一级了
      if (!ul) return;
      // 获取css 属性
      const ulStyle = getComputedStyle(ul) || document.defaultView.getComputedStyle(ul);
      // 展开 / 隐藏
      if (ulStyle.display === 'none') {
        // 修改css属性
        itemI.style.setProperty('color', 'var(--primary-color)');
        ul.style.setProperty('display', 'block');
        // 提示改为隐藏
        itemI.querySelector('.tooltiptext').innerText = '收起';
      } else {
        itemI.style.setProperty('color', 'var(--first-text-color)');
        ul.style.setProperty('display', 'none');
        itemI.querySelector('.tooltiptext').innerText = '展开';
        // 父级关闭的同时关闭子级
        // 查询是否还有子级
        const sonUl = ul.querySelectorAll('li.sidebar-all-category-list-item ul');
        // 关闭子级
        sonUl.forEach(son => {
          son.style.setProperty('display', 'none');
        })
        const sonI = ul.querySelectorAll('li.sidebar-all-category-list-item i');
        sonI.forEach(son => {
          son.style.setProperty('color', 'var(--first-text-color)');
          // 提示改为隐藏
          son.querySelector('.tooltiptext').innerText = '展开';
        })
      }
      // 阻止冒泡事件
      e.stopPropagation();
    });
  });
}

