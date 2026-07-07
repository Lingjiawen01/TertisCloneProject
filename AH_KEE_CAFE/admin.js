// admin.js

let menuData = JSON.parse(localStorage.getItem('cafeMenu')) || [
    { id: 1, name: 'Signature Laksa', price: '22.00', category: 'food', image: 'laksa.jpg', desc: 'Authentic, Spicy, Satisfying.' },
    { id: 2, name: 'Char Grilled Kolo Mee', price: '18.00', category: 'food', image: 'kolo-mee.jpg', desc: 'Crispy pork, savory balance.' },
    { id: 3, name: 'Kuching Coffee', price: '12.00', category: 'coffee', image: 'coffee.png', desc: 'Latte, cold brew ☕' },
    { id: 4, name: 'Sunset Spritz', price: '28.00', category: 'cocktails', image: 'spritz.png', desc: 'Gin, elderflower, orange 🍹' }
];

function saveToStorage() {
    localStorage.setItem('cafeMenu', JSON.stringify(menuData));
}

function renderAdminTable() {
    const tbody = document.getElementById('menu-table-body');
    const totalCount = document.getElementById('total-count');
    
    tbody.innerHTML = '';
    totalCount.innerText = `共 ${menuData.length} 项`;

    menuData.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-brandBg/20 transition";
        
        tr.innerHTML = `
            <td class="py-4 flex items-center space-x-3">
                <div class="w-10 h-10 bg-gray-100 rounded-lg bg-cover bg-center border border-gray-100" style="background-image: url('images/${item.image || 'placeholder.png'}')"></div>
                <div>
                    <div class="font-bold text-gray-800">${item.name}</div>
                    <div class="text-[11px] text-gray-400 line-clamp-1">${item.desc || '暂无描述'}</div>
                </div>
            </td>
            <td class="py-4">
                <span class="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-gray-100 text-gray-600">${item.category}</span>
            </td>
            <td class="py-4 text-right font-serif font-bold text-gray-700">
                RM ${parseFloat(item.price).toFixed(2)}
            </td>
            <td class="py-4 text-center">
                <button onclick="deleteItem(${item.id})" class="text-xs text-red-500 hover:text-red-700 hover:underline font-medium">删除</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

document.getElementById('add-item-form').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const name = document.getElementById('item-name').value;
    const price = document.getElementById('item-price').value;
    const category = document.getElementById('item-category').value;
    const fileInput = document.getElementById('item-image-file');
    const image = fileInput.files[0] ? fileInput.files[0].name : 'placeholder.png';
    const desc = document.getElementById('item-desc').value;

    const newItem = {
        id: Date.now(),
        name: name,
        price: parseFloat(price).toFixed(2),
        category: category,
        image: image,
        desc: desc
    };

    menuData.push(newItem);
    saveToStorage();
    renderAdminTable();

    this.reset();
});

document.getElementById('file-upload-text').innerText = "Click to choose a photo...";
document.getElementById('file-upload-text').classList.replace('text-gray-800', 'text-gray-400');

window.deleteItem = function(id) {
    if(confirm('Comfirm Delete？')) {
        menuData = menuData.filter(item => item.id !== id);
        saveToStorage();
        renderAdminTable();
    }
}

document.getElementById('item-image-file').addEventListener('change', function(e) {
    const fileName = e.target.files[0] ? e.target.files[0].name : "Click to choose a photo...";
    document.getElementById('file-upload-text').innerText = fileName;
    document.getElementById('file-upload-text').classList.remove('text-gray-400');
    document.getElementById('file-upload-text').classList.add('text-gray-800', 'font-medium');
});

document.addEventListener('DOMContentLoaded', renderAdminTable);