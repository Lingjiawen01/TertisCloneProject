// script.js

let menuData = JSON.parse(localStorage.getItem('cafeMenu')) || [
    { id: 1, name: 'Signature Laksa', price: '22.00', category: 'food', image: 'laksa.jpg', desc: 'Authentic, Spicy, Satisfying.' },
    { id: 2, name: 'Char Grilled Kolo Mee', price: '18.00', category: 'food', image: 'kolo-mee.jpg', desc: 'Crispy pork, savory balance.' },
    { id: 3, name: 'Kuching Coffee', price: '12.00', category: 'coffee', image: 'coffee.png', desc: 'Latte, cold brew ☕' },
    { id: 4, name: 'Sunset Spritz', price: '28.00', category: 'cocktails', image: 'spritz.png', desc: 'Gin, elderflower, orange 🍹' }
];

function renderFrontendMenu() {
    const foodGrid = document.getElementById('food-grid');
    const drinksGrid = document.getElementById('drinks-grid');

    if (!foodGrid || !drinksGrid) return;

    foodGrid.innerHTML = '';
    drinksGrid.innerHTML = '';

    menuData.forEach(item => {
        if (item.category === 'food') {
            const foodCard = document.createElement('div');
            foodCard.className = "relative group overflow-hidden rounded-2xl shadow-sm bg-gray-200 h-[300px] md:h-[400px]";
            foodCard.innerHTML = `
                <div class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                     style="background-image: url('images/${item.image || 'placeholder.png'}');">
                </div>
                <div class="absolute bottom-4 left-4 right-4 bg-brandDark/40 backdrop-blur-md border border-white/10 p-6 rounded-xl text-white">
                    <h3 class="font-serif tracking-wider text-sm md:text-base uppercase">${item.name}</h3>
                    <div class="flex justify-between items-center mt-2 border-t border-white/20 pt-2">
                        <span class="text-xs text-gray-300 tracking-wide">${item.desc || ''}</span>
                        <span class="font-serif text-sm font-bold text-amber-200">RM ${parseFloat(item.price).toFixed(2)}</span>
                    </div>
                </div>
            `;
            foodGrid.appendChild(foodCard);
        } else {
            const drinkCard = document.createElement('div');
            let bgGradient = "from-amber-100/60 to-amber-200/20";
            if (item.category === 'cocktails') bgGradient = "from-orange-100/60 to-orange-200/20";
            if (item.category === 'refreshers') bgGradient = "from-emerald-100/50 to-emerald-200/10";

            drinkCard.className = `drink-card bg-gradient-to-b ${bgGradient} p-6 rounded-2xl text-center flex flex-col items-center justify-between shadow-sm min-h-[250px] transition-all duration-300`;
            drinkCard.setAttribute('data-category', item.category);
            
            drinkCard.innerHTML = `
                <div class="w-24 h-24 bg-contain bg-center bg-no-repeat mb-4 transition-transform duration-300 hover:scale-110" 
                     style="background-image: url('images/${item.image || 'placeholder.png'}');"></div>
                <div class="w-full text-left">
                    <h4 class="font-bold text-xs md:text-sm uppercase tracking-wide text-brandDark">${item.name}</h4>
                    <p class="text-[11px] text-gray-500 mt-1">${item.desc || ''}</p>
                    <div class="text-right font-serif font-bold text-xs text-brandGold mt-2">RM ${parseFloat(item.price).toFixed(2)}</div>
                </div>
            `;
            drinksGrid.appendChild(drinkCard);
        }
    });
}

function filterDrinks(category, activeBtn) {
    const cards = document.querySelectorAll('.drink-card');
    
    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'flex';
            setTimeout(() => { card.style.opacity = '1'; }, 10);
        } else {
            card.style.opacity = '0';
            card.style.display = 'none';
        }
    });

    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
        btn.classList.remove('bg-brandGold', 'text-white');
        btn.classList.add('bg-white', 'text-gray-600', 'border', 'border-gray-200');
    });
    activeBtn.classList.remove('bg-white', 'text-gray-600', 'border', 'border-gray-200');
    activeBtn.classList.add('bg-brandGold', 'text-white');
}

document.addEventListener('DOMContentLoaded', renderFrontendMenu);