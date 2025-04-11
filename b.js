document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('editor');
    const addTextBtn = document.getElementById('add-text-btn');
    const groupBtn = document.getElementById('group-btn');
    const ungroupBtn = document.getElementById('ungroup-btn');
    const exportBtn = document.getElementById('export-btn');
    const textModal = document.getElementById('text-modal');
    const textInput = document.getElementById('text-input');
    const addTextToImageBtn = document.getElementById('add-text-to-image');
    const closeModal = document.querySelector('.close');
  
    let selectedElements = [];
    let currentElement = null;
    let isDragging = false;
    let startX, startY, initialX, initialY;
    let rotation = 0;
  
    // Carrega imagem
    window.loadImage = (src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        const container = createElementContainer(img);
        editor.appendChild(container);
        enableInteractions(container);
      };
    };
  
    // Cria container com controles
    function createElementContainer(content) {
      const container = document.createElement('div');
      container.classList.add('image-container');
      container.style.position = 'absolute';
      container.style.left = '60px';
      container.style.top = '60px';
      container.style.width = `${content.width || 150}px`;
      container.style.height = `${content.height || 150}px`;
  
      container.appendChild(content);
  
      const del = document.createElement('button');
      del.className = 'delete-button';
      del.innerHTML = '&times;';
      del.onclick = () => {
        if (confirm('Deseja excluir este item?')) container.remove();
        selectedElements = [];
        updateToolbar();
      };
      container.appendChild(del);
  
      const rot = document.createElement('div');
      rot.className = 'rotation-control';
      rot.onclick = (e) => e.stopPropagation();
      rot.onmousedown = initRotate;
      container.appendChild(rot);
  
      ['top-left', 'top-right', 'bottom-left', 'bottom-right'].forEach(pos => {
        const h = document.createElement('div');
        h.className = `handle ${pos}`;
        h.onmousedown = initResize;
        container.appendChild(h);
      });
  
      return container;
    }
  
    // Ativa interações com o container
    function enableInteractions(el) {
      el.onclick = (e) => {
        if (!e.ctrlKey) {
          selectedElements.forEach(el => el.classList.remove('selected'));
          selectedElements = [];
        }
  
        el.classList.add('selected');
        if (!selectedElements.includes(el)) selectedElements.push(el);
        updateToolbar();
      };
  
      el.onmousedown = (e) => {
        if (e.target !== el) return;
        currentElement = el;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        const rect = el.getBoundingClientRect();
        initialX = rect.left;
        initialY = rect.top;
        document.onmousemove = dragElement;
        document.onmouseup = () => {
          isDragging = false;
          document.onmousemove = null;
        };
      };
    }
  
    function dragElement(e) {
      if (!isDragging || !currentElement) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      currentElement.style.left = `${initialX + dx}px`;
      currentElement.style.top = `${initialY + dy}px`;
    }
  
    function initResize(e) {
      e.stopPropagation();
      const el = e.target.parentElement;
      const rect = el.getBoundingClientRect();
      const startW = rect.width, startH = rect.height;
      const startX = e.clientX, startY = e.clientY;
      const pos = e.target.classList[1];
  
      document.onmousemove = (ev) => {
        let dx = ev.clientX - startX;
        let dy = ev.clientY - startY;
  
        if (pos.includes('left')) {
          el.style.width = `${startW - dx}px`;
          el.style.left = `${rect.left + dx}px`;
        }
        if (pos.includes('right')) el.style.width = `${startW + dx}px`;
        if (pos.includes('top')) {
          el.style.height = `${startH - dy}px`;
          el.style.top = `${rect.top + dy}px`;
        }
        if (pos.includes('bottom')) el.style.height = `${startH + dy}px`;
      };
  
      document.onmouseup = () => (document.onmousemove = null);
    }
  
    function initRotate(e) {
      e.stopPropagation();
      const el = e.target.parentElement;
      const rect = el.getBoundingClientRect();
      const center = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  
      function getAngle(x, y) {
        const dx = x - center.x;
        const dy = y - center.y;
        return Math.atan2(dy, dx) * (180 / Math.PI);
      }
  
      const startAngle = getAngle(e.clientX, e.clientY);
      document.onmousemove = (ev) => {
        const angle = getAngle(ev.clientX, ev.clientY);
        const rotate = angle - startAngle;
        el.style.transform = `rotate(${rotate}deg)`;
      };
      document.onmouseup = () => (document.onmousemove = null);
    }
  
    // Modal de texto
    addTextBtn.onclick = () => {
      if (selectedElements.length === 1) {
        textModal.style.display = 'block';
        textInput.focus();
      }
    };
  
    closeModal.onclick = () => {
      textModal.style.display = 'none';
      textInput.value = '';
    };
  
    addTextToImageBtn.onclick = () => {
      const textarea = document.createElement('textarea');
      textarea.value = textInput.value;
      textarea.setAttribute('readonly', true);
      textarea.style.width = '100%';
      textarea.style.height = '100%';
  
      const wrapper = createElementContainer(textarea);
      wrapper.classList.add('text-overlay');
      wrapper.style.width = '150px';
      wrapper.style.height = '80px';
  
      editor.appendChild(wrapper);
      enableInteractions(wrapper);
  
      textModal.style.display = 'none';
      textInput.value = '';
    };
  
    // Agrupamento
    groupBtn.onclick = () => {
      if (selectedElements.length < 2) return;
      const group = document.createElement('div');
      group.classList.add('image-container');
      group.style.position = 'absolute';
      group.style.left = '100px';
      group.style.top = '100px';
  
      selectedElements.forEach(el => {
        group.appendChild(el);
      });
  
      editor.appendChild(group);
      enableInteractions(group);
      selectedElements = [group];
      updateToolbar();
    };
  
    ungroupBtn.onclick = () => {
      const group = selectedElements[0];
      if (!group) return;
  
      while (group.firstChild) {
        const child = group.firstChild;
        editor.appendChild(child);
      }
      group.remove();
      selectedElements = [];
      updateToolbar();
    };
  
    // Exportar
    exportBtn.onclick = () => {
      html2canvas(editor).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL();
        link.download = 'export.png';
        link.click();
      });
    };
  
    function updateToolbar() {
      addTextBtn.disabled = selectedElements.length !== 1;
      groupBtn.disabled = selectedElements.length < 2;
      ungroupBtn.disabled = !(selectedElements.length === 1 && selectedElements[0].children.length > 1);
    }
  
    // Seleção com Ctrl
    editor.addEventListener('click', e => {
      if (!e.ctrlKey) return;
      const el = e.target.closest('.image-container, .text-overlay');
      if (el) {
        el.classList.toggle('selected');
        if (el.classList.contains('selected')) selectedElements.push(el);
        else selectedElements = selectedElements.filter(sel => sel !== el);
        updateToolbar();
      }
    });
  });
  