async function getAllUsers() {
  let response = await axios.get("https://look-njzu.onrender.com/users");
  return response.data;

  //   {
  //   "status": 200,
  //   "data": [
  //     {
  //       "userId": 1,
  //       "username": "Sobir",
  //       "telephone": "+998941049914"
  //     },
  //     {
  //       "userId": 2,
  //       "username": "Alisher",
  //       "telephone": "+998901234567"
  //     }
  //   ]
  // }
}

async function getFoods() {
  let response = await axios.get("https://look-njzu.onrender.com/foods");
  return response.data;

  //   {
  //   "status": 200,
  //   "data": [
  //     {
  //       "foodId": 1,
  //       "food_name": "Cola"
  //     },
  //     {
  //       "foodId": 2,
  //       "food_name": "Fanta"
  //     },
  //   ]
  // }
}

async function registerUser() {
  //     {
  //       "userId": 1,
  //       "username": "Sobir",
  //       "telephone": "+998941049914"
  //     }
  let username = document.querySelector("#usernameInput").value;
  let telephone = document.querySelector("#telephoneInput").value;

  console.log(usernameInput, telephoneInput);

  let response = await axios.post("https://look-njzu.onrender.com/users", {
    username,
    telephone,
  });

  if (response.data.status == 201) {
    targetUser = {
      userId: response.data.data.userId,
      username: response.data.data.username,
      telephone: response.data.data.telephone,
    };

    document.querySelector("#clientId").innerText =
      targetUser.userId || "tanlanmagan";
    document.querySelector("#userHeader").innerText = targetUser.username || "";

    await renderUserOrder(targetUser.userId);
    return response.data;
  } else {
    alert(response.data.message);
  }

  //   {
  //     "status": 400,
  //     "message": "siz allaqachon ro'yhatdan o'tgansiz"
  //   }

  // {
  //   "status": 201,
  //   "data": {
  //     "userId": 4,
  //     "username": "Jasur",
  //     "telephone": "+998931112233"
  //   }
  // }
}

async function order(orderData) {
  console.log("orderData", orderData);
  let response = await axios.post(
    "https://look-njzu.onrender.com/orders",
    orderData,
  );

  return response.data;

  // {
  //   "status": 201,
  //   "data": {
  //     "orderId": 1,
  //     "userId": 1,
  //     "foods": [
  //       {
  //         "foodId": 1,
  //         "food_name": "Cola",
  //         "food_img": "/files/cola.jpeg"
  //       }
  //     ],
  //     "count": 10
  //   }
  // }
}

async function getUserOrder(userid) {
  let response = await axios.get(
    `https://look-njzu.onrender.com/orders/${userid}`,
  );
  return response.data;

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
}

// TODO
// input fields format check
//
