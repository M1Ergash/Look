let targetUser = JSON.parse(window.localStorage.getItem("targetUser")) || {};

//     {
//       "userId": 1,
//       "username": "Sobir",
//       "telephone": "+998941049914"
//     }

////////////////////////////////////////////////////////////////////////////////
document.querySelector("#clientId").innerText =
  targetUser.userId || "tanlanmagan";
document.querySelector("#userHeader").innerText = targetUser.username || "";
////////////////////////////////////////////////////////////////////////////////
document.querySelector("#userAdd").addEventListener("submit", async (e) => {
  e.preventDefault();

  await registerUser();
  await renderCustomerList();
});

async function renderCustomerList() {
  document.querySelector(".customers-list").innerHTML = "";
  let customers = await getAllUsers();

  let dom = "";
  for (const user of customers.data) {
    dom += `
            <li id= ${user.userId} class="customer-item">
                <span class="customer-name">${user.username}</span>
                <a class="customer-phone" href="tel:${user.telephone}">${user.telephone}</a>
            </li>`;
  }

  document.querySelector(".customers-list").innerHTML += dom;
}

////////////////////////////////////////////////////////////////////////////////
async function setFoodsSelec() {
  document.querySelector("#foodsSelect").innerHTML = "";
  let response = await getFoods();

  let dom = "";
  for (const food of response.data) {
    dom += `<option value="${food.foodId}">${food.food_name}</option>`;
  }

  document.querySelector("#foodsSelect").innerHTML += dom;
}

////////////////////////////////////////////////////////////////////////////////
const customersList = document.querySelector(".customers-list");
customersList.addEventListener("click", async (e) => {
  const item = e.target.closest(".customer-item");

  console.log(item.id);
  await setTargetUser(item.id);
});

async function setTargetUser(userId) {
  let users = await getAllUsers();

  targetUser = users.data.find((item) => item.userId == userId);

  document.querySelector("#clientId").innerText = targetUser.userId;
  document.querySelector("#userHeader").innerText = targetUser.username;

  window.localStorage.setItem("targetUser", JSON.stringify(targetUser));

  renderUserOrder(userId);
}

////////////////////////////////////////////////////////////////////////////////

// {
//   "userId": 1,
//   "foodId": 1,
//   "count": 2
// }

//     {
//       "foodId": 1,
//       "food_name": "Cola"
//     }

document.querySelector("#foodsForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  let foodType = +document.querySelector("#foodsSelect").value;
  let count = +document.querySelector("#foodsCount").value;
  let userId = +targetUser.userId;

  if (foodType && count && userId) {
    await order({ userId, count, foodId: foodType });
    await renderUserOrder(userId);
  }
});

////////////////////////////////////////////////////////////////////////////////
// {
//       "orderId": 1,
//       "userId": 1,
//       "foods": [
//         {
//           "foodId": 1,
//           "food_name": "Cola",
//           "food_img": "/files/cola.jpeg"
//         }
//       ],
//       "count": 74
//     }

async function renderUserOrder(userId = undefined) {
  document.querySelector(".orders-list").innerHTML = "";
  let ordersList;
  if (userId) {
    ordersList = await getUserOrder(userId);

    let dom = "";
    for (const order of ordersList.data) {
      dom += `
        <li class="order-item">
            <img src="https://look-njzu.onrender.com${order.foods[0].food_img}">
            <div>
            <span class="order-name">${order.foods[0].food_name}</span>
            <span class="order-count">${order.count}</span>
            </div>
        </li>`;
    }

    document.querySelector(".orders-list").innerHTML += dom;
  }
}

////////////////////////////////////////////////////////////////////////////////

renderCustomerList();
setFoodsSelec();
renderUserOrder(targetUser.userId);
