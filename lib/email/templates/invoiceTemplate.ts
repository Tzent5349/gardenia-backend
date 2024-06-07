// lib/email/templates/invoiceTemplate.ts
export const generateInvoiceTemplate = (detailedOrderItems: any[], user: any) => {
  let itemsHtml = detailedOrderItems.map(item => `
    <tr>
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>${item.price}</td>
      <td>${item.size}</td>
      <td>${item.colorName}</td>
    </tr>
  `).join('');

  return `
    <h1>Invoice</h1>
    <p>User: ${user.firstName} ${user.lastName}</p>
    <p>Email: ${user.email}</p>
    <table border="1">
      <tr>
        <th>Product</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Size</th>
        <th>Color</th>
      </tr>
      ${itemsHtml}
    </table>
  `;
};