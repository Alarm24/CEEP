// // import { BACKEND_URL } from "./config.js";

// export async function getItems() {
//   const items = await fetch(`${BACKEND_URL}/items`).then((r) => r.json());

//   return items;
// }

// export async function createItem(item) {
//   await fetch(`${BACKEND_URL}/items`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(item),
//   });
// }

// export async function deleteItem(id, item) {
//   await fetch(`${BACKEND_URL}/items/${id}`, {
//     method: "DELETE",
//   });
// }

// export async function getMembers() {
//   return /* return all members */;
// }

// export async function createMember(member) {
// }

// export async function deleteMember(id, item) {
// }
