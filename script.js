const inventory = {
    coffee: {
        title: "Micro-Lot Crop Extractions",
        desc: "Strictly seasonal single-origin coffees traceable down to precision processing washing stations, profiles roasted for transparency.",
        items: [
            { id: "c1", name: "Ethiopia Yirgacheffe", price: 24.00, details: "Light Roast / Heirloom Var. / Floral, Lavender & Meyer Lemon extraction notes.", img: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?q=80&w=600&auto=format&fit=crop" },
            { id: "c2", name: "Colombia Huila", price: 22.00, details: "Medium Roast / Caturra Var. / Deep molasses caramel with clean crisp red apple acid.", img: "https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=600&auto=format&fit=crop" },
            { id: "c3", name: "Brazil Cerrado", price: 20.00, details: "Dark Roast / Mundo Novo / Heavy-bodied texture overflowing with roasted almond and rich baker's cacao.", img: "https://images.unsplash.com/photo-1610632380989-680fe40816c6?auto=format&fit=crop&q=80&w=600" }
        ]
    },
    machines: {
        title: "Precision Extraction",
        desc: "Different ways to make coffee for the extraction that you morning is asking for. From espresso to pour-over, we have the right tools for you.",
        items: [
            { 
                id: "m1", 
                name: "LA MARZOCCO LINEA MINI", 
                price: 5900.00, 
                details: "Specialized appliance that brews a highly concentrated shot of coffee by forcing pressurized, hot water through a tightly packed bed of finely ground coffee, extracting rich flavors and aromas in a matter of seconds.",             
                 img: "https://cafebarista.ca/cdn/shop/products/stone-machines-espresso-rocket-stn-res-stoneminep-satwd-339596.jpg?v=1692723200&width=3398" 
            },
            { 
                id: "m2", 
                name: "CHEMEX", 
                price: 899.00, 
                details: "Chemex coffeemakers are made with high quality and durable borosilicate glass, the same type used for labware. They will not impart any chemicals or flavors into the coffee. ", 
                img: "https://www.arakucoffee.in/cdn/shop/files/Chemex6cupmoodshot.jpg?v=1687191644&width=4000"            }
        ]
    },
    courses: {
        title: "Barista Academy & Sensory Masterclasses",
        desc: "Transform your home espresso routines into flawless acts of chemistry. Ttaught by certified SCA calibration trainers.",
        items: [
            { id: "e1", name: "Foundation Extraction Methodology", price: 150.00, details: "Analyze the mathematical metrics of yield ratios, total dissolved solids (TDS), and uniform grind profiling mechanics.", img: "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=600&auto=format&fit=crop" },
            { id: "e2", name: "Micro-Foam & Aeration Pour Artistry", price: 180.00, details: "Master milk protein denaturing temperatures along with free-pour layout strategies for pristine rosettas and multi-tiered tulips.", img: "https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=600&auto=format&fit=crop" }
        ]
    }
};

let currentCart = [];

function switchView(targetSection) {
    const homeView = document.getElementById('home-view');
    const shopView = document.getElementById('shop-view');
    
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active-link'));

    if (targetSection === 'home') {
        shopView.style.opacity = '0';
        setTimeout(() => {
            shopView.classList.add('hidden');
            homeView.classList.remove('hidden');
            setTimeout(() => {
                homeView.style.opacity = '1';
                homeView.style.transform = 'translateY(0)';
            }, 50);
        }, 300);
    } else if (inventory[targetSection]) {
        const targetNav = document.getElementById(`nav-${targetSection}`);
        if (targetNav) targetNav.classList.add('active-link');

        homeView.style.opacity = '0';
        homeView.style.transform = 'translateY(1rem)';
        
        setTimeout(() => {
            homeView.classList.add('hidden');
            shopView.classList.remove('hidden');
            
            document.getElementById('shop-title').innerText = inventory[targetSection].title;
            document.getElementById('shop-description').innerText = inventory[targetSection].desc;
            
            const grid = document.getElementById('product-grid');
            grid.innerHTML = ''; 
            
            inventory[targetSection].items.forEach(item => {
                grid.innerHTML += `
                    <div class="product-card-wrapper bg-white border border-outline-variant/30 p-6 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_40px_rgba(145,106,74,0.06)] transition-all duration-500 relative">
                        <div>
                            <div class="product-card-img aspect-[4/5] bg-surface-container-low overflow-hidden mb-6 relative">
                                <img class="w-full h-full object-cover" src="${item.img}" alt="${item.name}"/>
                                <div class="absolute inset-0 bg-secondary/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                            <div class="flex justify-between items-baseline mb-3">
                                <h3 class="font-display-lg text-xl text-primary font-medium tracking-tight">${item.name}</h3>
                                <span class="font-bold text-accent tracking-wide">$${item.price.toFixed(2)}</span>
                            </div>
                            <p class="text-xs text-on-surface-variant font-light leading-relaxed mb-8 border-t border-dashed border-outline-variant/30 pt-3">${item.details}</p>
                        </div>
                        <button onclick="addToCart(this, '${item.id}', '${item.name}', ${item.price})" class="w-full app-btn-solid text-white py-4 font-label-caps text-xs tracking-widest uppercase hover:bg-accent transition-all duration-300 transform active:scale-95 shadow-md font-semibold">Add to Cart</button>
                    </div>
                `;
            });

            setTimeout(() => {
                shopView.style.opacity = '1';
                shopView.style.transform = 'translateY(0)';
            }, 50);
        }, 300);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleCart() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');
    drawer.classList.toggle('translate-x-0');
    drawer.classList.toggle('translate-x-full');
    overlay.classList.toggle('opacity-0');
    overlay.classList.toggle('pointer-events-none');
    document.body.classList.toggle('cart-open');
}

function addToCart(buttonElement, id, name, price) {
    const oldText = buttonElement.innerText;
    buttonElement.innerText = "Selection Logged ✓";
    buttonElement.style.backgroundColor = "var(--accent)";
    buttonElement.disabled = true;

    setTimeout(() => {
        buttonElement.innerText = oldText;
        buttonElement.style.backgroundColor = "var(--primary)";
        buttonElement.disabled = false;
    }, 1200);

    const existingIndex = currentCart.findIndex(item => item.id === id);
    if (existingIndex > -1) {
        currentCart[existingIndex].qty += 1;
    } else {
        currentCart.push({ id, name, price, qty: 1 });
    }

    triggerToastMessage(`${name} added to package selection.`);
    updateCartUI();
}

function adjustQty(id, delta) {
    const index = currentCart.findIndex(item => item.id === id);
    if (index > -1) {
        currentCart[index].qty += delta;
        if (currentCart[index].qty <= 0) {
            currentCart.splice(index, 1);
        }
        updateCartUI();
    }
}

// UI Rendering Execution Framework updating cart quantities totals and shopping badge values
function updateCartUI() {
    const itemsContainer = document.getElementById('cart-items');
    const badgeContainer = document.getElementById('cart-badge-container');
    const countLabel = document.getElementById('cart-count');
    const totalLabel = document.getElementById('cart-total');
    
    itemsContainer.innerHTML = '';
    let totalValue = 0;
    let unitsTotal = 0;

    currentCart.forEach(item => {
        totalValue += (item.price * item.qty);
        unitsTotal += item.qty;

        itemsContainer.innerHTML += `
            <div class="flex justify-between items-center border-b border-outline-variant/20 pb-4">
                <div class="space-y-0.5">
                    <h4 class="font-display-lg text-base text-primary tracking-tight font-medium">${item.name}</h4>
                    <span class="text-xs text-accent font-medium tracking-wide">$${(item.price * item.qty).toFixed(2)} ($${item.price.toFixed(2)} ea)</span>
                </div>
                <div class="flex items-center gap-2 border border-outline-variant/40 bg-background p-1">
                    <button onclick="adjustQty('${item.id}', -1)" class="w-7 h-7 bg-white hover:bg-surface-container-low transition-colors flex items-center justify-center text-xs font-bold text-primary shadow-sm">-</button>
                    <span class="text-xs font-semibold px-2 w-6 text-center text-primary">${item.qty}</span>
                    <button onclick="adjustQty('${item.id}', 1)" class="w-7 h-7 bg-white hover:bg-surface-container-low transition-colors flex items-center justify-center text-xs font-bold text-primary shadow-sm">+</button>
                </div>
            </div>
        `;
    });

    if (unitsTotal > 0) {
        countLabel.innerText = unitsTotal;
        badgeContainer.classList.remove('opacity-0', 'scale-50');
        badgeContainer.classList.add('badge-active');
    } else {
        badgeContainer.classList.remove('badge-active');
        badgeContainer.classList.add('opacity-0', 'scale-50');
        itemsContainer.innerHTML = `
            <div class="h-48 flex flex-col items-center justify-center text-center text-on-surface-variant opacity-60">
                <span class="material-symbols-outlined text-4xl mb-2 font-light">coffee</span>
                <p class="text-xs font-label-caps tracking-widest font-semibold">Your cart is completely vacant.</p>
            </div>
        `;
    }

    totalLabel.innerText = `$${totalValue.toFixed(2)}`;
}

function triggerToastMessage(msg) {
    const activeToast = document.querySelector('.floating-alert');
    if (activeToast) activeToast.remove(); 

    const toast = document.createElement('div');
    toast.className = 'floating-alert';
    toast.innerText = msg;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.4s ease';
        setTimeout(() => toast.remove(), 400);
    }, 2500);
}

function processCheckout(event) {
    event.preventDefault(); 
    
    if (currentCart.length === 0) {
        triggerToastMessage("Action denied: Cart is empty.");
        return;
    }

    const name = document.getElementById('cust-name').value;
    const email = document.getElementById('cust-email').value;
    const address = document.getElementById('cust-address').value;

    alert(`Purchase Complete, ${name}!\n\nA secure transaction signature and extraction tracking code have been dispatched directly to: ${email}.\n\nYour items will move into packing and dispatch to standard routing location:\n${address}`);
    
    currentCart = [];
    document.getElementById('checkout-form').reset();
    updateCartUI();
    toggleCart();
    switchView('home');
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartUI();
});