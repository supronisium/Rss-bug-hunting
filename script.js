const products = [
  { id: 1, name: "Кофе", price: 300 },
  { id: 2, name: "Чай", price: 200 },
  { id: 3, name: "Круассан", price: 150 },
  { id: 4, name: "Маффин", price: 180 },
];

let cart = [];
let discount = 0;

const productsEl = document.getElementById("products");
const cartItemsEl = document.getElementById("cart-items");
const badgeEl = document.getElementById("badge");
const totalEl = document.getElementById("total");
const emptyMsg = document.getElementById("empty-msg");
const promoInput = document.getElementById("promo-input");
const promoBtn = document.getElementById("promo-btn");
const clearBtn = document.getElementById("clear-btn");

function renderProducts() {
  productsEl.innerHTML = "";

  products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product";

    const title = document.createElement("h3");
    title.textContent = p.name;

    const price = document.createElement("p");
    price.textContent = `${p.price} ₽`;

    const btn = document.createElement("button");
    btn.textContent = "В корзину";

    btn.addEventListener("click", () => addToCart(p.id));

    card.append(title, price, btn);
    productsEl.appendChild(card);
  });
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);

  if (!product) return;

  const item = cart.find((i) => i.id === id);

  if (item) {
    item.qty++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
    });
  }

  renderCart();
}

function increaseQty(id) {
  const item = cart.find((i) => i.id === id);

  if (item) {
    item.qty++;
  }

  renderCart();
}

function decreaseQty(id) {
  const item = cart.find((i) => i.id === id);

  if (item && item.qty > 1) {
    item.qty--;
  }

  renderCart();
}

function removeItem(id) {
  cart = cart.filter((i) => i.id !== id);
  renderCart();
}

function applyPromo() {
  const code = promoInput.value.trim().toUpperCase();

  discount = code === "SALE10" ? 0.1 : 0;

  renderCart();
}

function clearCart() {
  cart = [];
  discount = 0;
  promoInput.value = "";

  renderCart();
}

function renderCart() {
  cartItemsEl.innerHTML = "";

  let total = 0;
  let totalQty = 0;

  cart.forEach((item) => {
    const lineTotal = item.price * item.qty;

    const li = document.createElement("li");
    li.className = "cart-item";

    const name = document.createElement("span");
    name.textContent = item.name;

    const decBtn = document.createElement("button");
    decBtn.className = "qty-btn";
    decBtn.textContent = "−";
    decBtn.setAttribute("aria-label", `Уменьшить количество: ${item.name}`);
    decBtn.addEventListener("click", () => decreaseQty(item.id));

    const qty = document.createElement("span");
    qty.className = "qty";
    qty.textContent = item.qty;

    const incBtn = document.createElement("button");
    incBtn.className = "qty-btn";
    incBtn.textContent = "+";
    incBtn.setAttribute("aria-label", `Увеличить количество: ${item.name}`);
    incBtn.addEventListener("click", () => increaseQty(item.id));

    const line = document.createElement("span");
    line.className = "line";
    line.textContent = `${lineTotal} ₽`;

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove";
    removeBtn.textContent = "✕";
    removeBtn.setAttribute("aria-label", `Удалить: ${item.name}`);
    removeBtn.addEventListener("click", () => removeItem(item.id));

    li.append(name, decBtn, qty, incBtn, line, removeBtn);
    cartItemsEl.appendChild(li);

    total += lineTotal;
    totalQty += item.qty;
  });

  const finalTotal = total * (1 - discount);

  badgeEl.textContent = totalQty;
  totalEl.textContent = Number(finalTotal.toFixed(2));

  emptyMsg.hidden = cart.length !== 0;
}

promoBtn.addEventListener("click", applyPromo);
clearBtn.addEventListener("click", clearCart);

renderProducts();
renderCart();