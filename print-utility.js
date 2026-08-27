window.generateDocumentPrint = function(order, type = "invoice") {
  const printWindow = window.open("", "_blank", "width=800,height=900");
  if (!printWindow) {
    alert("Please allow popups to print/view documents.");
    return;
  }

  // Format price helper
  const moneyFormat = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0
  });

  const formattedTotal = typeof order.total === "number" ? moneyFormat.format(order.total) : order.total;
  
  const pct = typeof order.paymentPercentage === "number" ? order.paymentPercentage : 100;
  const isInstallment = pct < 100;
  const paidVal = typeof order.total === "number" ? Math.round(order.total * (pct / 100)) : 0;
  const balanceVal = typeof order.total === "number" ? Math.round(order.total * (1 - pct / 100)) : 0;
  
  const formattedPaid = moneyFormat.format(paidVal);
  const formattedBalance = moneyFormat.format(balanceVal);

  // Determine document title and metadata
  const docTitle = type === "invoice" ? "INVOICE" : "RECEIPT";
  const docRef = order.ref;
  const docDate = order.date;
  
  let statusLabel = "";
  let badgeColor = "";
  if (type === "invoice") {
    statusLabel = isInstallment ? `AWAITING BALANCE (${100 - pct}%)` : "UNPAID";
    badgeColor = "#b03a2e";
  } else {
    statusLabel = isInstallment ? `PARTIALLY PAID (${pct}%)` : "PAID";
    badgeColor = isInstallment ? "#d35400" : "#27ae60";
  }
  
  // Clean styling, cream-sand aesthetic matching Oban Wears but optimized for printing
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${docTitle} - ${docRef}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Manrope:wght@500;600;700;800&display=swap');
        body {
          font-family: 'DM Sans', sans-serif;
          color: #151512;
          background: #fff;
          margin: 40px;
          line-height: 1.6;
        }
        .header-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 40px;
        }
        .brand-title {
          font-family: 'Manrope', sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: #5a392d;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .doc-type {
          font-family: 'Manrope', sans-serif;
          text-align: right;
          font-size: 24px;
          font-weight: 600;
          color: #151512;
          letter-spacing: 0.1em;
        }
        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border-radius: 2px;
          margin-top: 5px;
          border: 1px solid ${badgeColor};
          color: ${badgeColor};
        }
        .info-grid {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 40px;
        }
        .info-grid td {
          width: 50%;
          vertical-align: top;
          font-size: 13.5px;
        }
        .info-header {
          font-family: 'Manrope', sans-serif;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 10px;
          letter-spacing: 0.1em;
          color: #8c765f;
          margin-bottom: 5px;
        }
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 40px;
        }
        .items-table th {
          background: #f4f0e8;
          color: #5a392d;
          font-family: 'Manrope', sans-serif;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid rgba(21, 21, 18, 0.18);
        }
        .items-table td {
          padding: 14px 12px;
          border-bottom: 1px solid rgba(21, 21, 18, 0.18);
          font-size: 14px;
        }
        .totals-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        .totals-table td {
          text-align: right;
          padding: 6px 12px;
          font-size: 14px;
        }
        .totals-table .grand-total {
          font-family: 'Manrope', sans-serif;
          font-size: 18px;
          font-weight: 600;
          color: #151512;
          border-top: 2px solid rgba(21, 21, 18, 0.18);
          padding-top: 12px;
        }
        .payment-box {
          background: #f4f0e8;
          border: 1px dashed rgba(21, 21, 18, 0.18);
          padding: 20px;
          margin-top: 40px;
          font-size: 13px;
        }
        .payment-box h4 {
          margin: 0 0 10px;
          color: #5a392d;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-family: 'Manrope', sans-serif;
        }
        .footer-note {
          text-align: center;
          margin-top: 60px;
          font-size: 12px;
          color: #8c765f;
          border-top: 1px solid rgba(21, 21, 18, 0.18);
          padding-top: 20px;
        }
        @media print {
          body {
            margin: 20px;
          }
          .payment-box {
            background: #fff !important;
            border: 1px solid #ccc;
          }
          .items-table th {
            background: #eee !important;
          }
        }
      </style>
    </head>
    <body>
      <table class="header-table">
        <tr>
          <td>
            <div class="brand-title">Oban Wears</div>
            <div style="font-size:12px;color:#8c765f;max-width:450px;line-height:1.4;">Contemporary Nigerian menswear, defined by precise tailoring,<br>expressive cloth and unmistakable detail.<br>Lagos, Nigeria</div>
          </td>
          <td style="text-align:right; vertical-align:top;">
            <div class="doc-type">${docTitle}</div>
            <div class="status-badge">${statusLabel}</div>
          </td>
        </tr>
      </table>

      <table class="info-grid">
        <tr>
          <td>
            <div class="info-header">Billed To</div>
            <strong>${order.name}</strong><br>
            ${order.whatsapp ? `WhatsApp: ${order.whatsapp}<br>` : ""}
            ${order.email ? `Email: ${order.email}<br>` : ""}
            ${order.notes && order.notes.includes("Location:") ? order.notes.split('.')[0] : ""}
          </td>
          <td style="text-align:right;">
            <div class="info-header">Document Details</div>
            <strong>Sales Code:</strong> ${docRef}<br>
            <strong>Date Issued:</strong> ${docDate}<br>
            <strong>Status:</strong> ${type === "invoice" ? "Awaiting Bank Transfer" : "Paid & Confirmed"}
          </td>
        </tr>
      </table>

      <table class="items-table">
        <thead>
          <tr>
            <th style="width: 70%;">Item Description</th>
            <th style="width: 30%; text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              ${order.piece}
              ${order.fabricSource === "client" ? `<div style="font-size:11px;color:#b03a2e;font-weight:bold;margin-top:4px;text-transform:uppercase;letter-spacing:0.02em;">Fabric: Client Provided (Sewing Service Only)</div>` : ""}
            </td>
            <td style="text-align: right; font-weight: bold;">${formattedTotal}</td>
          </tr>
        </tbody>
      </table>

       <table class="totals-table">
        <tr>
          <td style="width:70%;">Total Order Value:</td>
          <td style="width:30%; font-weight:bold;">${formattedTotal}</td>
        </tr>
        ${isInstallment ? `
        <tr>
          <td>Amount Paid (${pct}%):</td>
          <td style="font-weight:bold; color:#27ae60;">${formattedPaid}</td>
        </tr>
        <tr>
          <td>Outstanding Balance (${100 - pct}%):</td>
          <td style="font-weight:bold; color:#b03a2e;">${formattedBalance}</td>
        </tr>
        ` : ""}
        <tr>
          <td>VAT (0%):</td>
          <td style="font-weight:bold;">\u20A60</td>
        </tr>
        <tr>
          <td class="grand-total">Total Amount:</td>
          <td class="grand-total" style="color:#5a392d;">${formattedTotal}</td>
        </tr>
      </table>

      ${type === "invoice" ? `
        <div class="payment-box">
          <h4>Bank Transfer Details</h4>
          <p>${isInstallment ? `Please transfer the outstanding balance of <strong>${formattedBalance}</strong> to confirm full payment:` : `Please transfer the total amount of <strong>${formattedTotal}</strong> (or minimum 50% installment of <strong>${moneyFormat.format(Math.round(order.total * 0.5))}</strong>) to proceed with tailoring:`}</p>
          <table style="width:100%; font-size:13px;">
            <tr><td style="width:120px; font-weight:bold;">Bank Name:</td><td>United Bank for Africa</td></tr>
            <tr><td style="font-weight:bold;">Account Name:</td><td>OBAN WEARS</td></tr>
            <tr><td style="font-weight:bold;">Account Number:</td><td>1025878782</td></tr>
            <tr><td style="font-weight:bold;">Reference:</td><td><strong>${docRef}</strong></td></tr>
          </table>
          <p style="font-size:11px; color:#c0392b; margin-top:10px; font-weight:bold;">* IMPORTANT: Please use the Reference Code "${docRef}" as the transfer description so we can verify and acknowledge your payment.</p>
        </div>
      ` : `
        <div class="payment-box" style="border-color:${isInstallment ? '#d35400' : '#27ae60'}; background:${isInstallment ? '#fffcf9' : '#f4fbf7'};">
          <h4 style="color:${isInstallment ? '#d35400' : '#27ae60'};">${isInstallment ? 'Installment Receipt' : 'Receipt Acknowledgment'}</h4>
          <p>${isInstallment ? `An installment payment of <strong>${formattedPaid}</strong> (${pct}%) has been confirmed and verified. Tailoring production is active in our workshop. An outstanding balance of <strong>${formattedBalance}</strong> is remaining.` : `Full payment of <strong>${formattedTotal}</strong> has been confirmed and verified. Tailoring production is active in our workshop. Thank you for shopping with Oban Wears!`}</p>
        </div>
      `}

      <div class="footer-note">
        <p>If you have any questions about this document, please contact us at hello@obanwears.com</p>
        <p>Oban Wears &copy; 2026. All rights reserved.</p>
      </div>

      <script>
        window.onload = function() {
          window.print();
        }
      </script>
    </body>
    </html>
  `;
  
  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
};

window.generatePOPrint = function(po, vendor) {
  const printWindow = window.open("", "_blank", "width=800,height=900");
  if (!printWindow) {
    alert("Please allow popups to print/view documents.");
    return;
  }
  const formattedTotal = "\u20A6" + Number(po.amount).toLocaleString();
  let itemsRows = po.items.map(item => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid rgba(21, 21, 18, 0.18);">${item.name}</td>
      <td style="padding: 12px; border-bottom: 1px solid rgba(21, 21, 18, 0.18); text-align: center;">${item.qty}</td>
      <td style="padding: 12px; border-bottom: 1px solid rgba(21, 21, 18, 0.18); text-align: right;">\u20A6${Number(item.price).toLocaleString()}</td>
      <td style="padding: 12px; border-bottom: 1px solid rgba(21, 21, 18, 0.18); text-align: right; font-weight: bold;">\u20A6${Number(item.total).toLocaleString()}</td>
    </tr>
  `).join("");

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Purchase Order - ${po.id}</title>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Manrope:wght@500;600;700&display=swap" rel="stylesheet">
      <style>
        body { font-family: 'DM Sans', sans-serif; color: #151512; margin: 40px; line-height: 1.6; }
        .header-table, .info-grid, .items-table, .totals-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        .brand-title { font-family: 'Manrope', sans-serif; font-size: 26px; font-weight: 700; color: #151512; text-transform: uppercase; letter-spacing: 0.05em; }
        .doc-type { font-family: 'Manrope', sans-serif; font-size: 20px; font-weight: 700; color: #5a392d; letter-spacing: 0.05em; }
        .info-header { font-family: 'Manrope', sans-serif; font-size: 11px; font-weight: 700; color: #8c765f; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.08em; }
        .items-table th { background: #f4f0e8; font-family: 'Manrope', sans-serif; font-size: 11px; font-weight: 600; color: #5a392d; text-transform: uppercase; letter-spacing: 0.1em; padding: 12px; text-align: left; border-bottom: 1px solid rgba(21, 21, 18, 0.18); }
        .totals-table td { text-align: right; padding: 6px 12px; font-size: 14px; }
        .totals-table .grand-total { font-family: 'Manrope', sans-serif; font-size: 18px; font-weight: 700; color: #151512; border-top: 2px solid rgba(21, 21, 18, 0.18); padding-top: 12px; }
        .footer-note { text-align: center; margin-top: 60px; font-size: 12px; color: #8c765f; border-top: 1px solid rgba(21, 21, 18, 0.18); padding-top: 20px; }
      </style>
    </head>
    <body>
      <table class="header-table">
        <tr>
          <td>
            <div class="brand-title">Oban Wears</div>
            <div style="font-size:12px;color:#8c765f;">Contemporary Menswear Studio<br>Lagos, Nigeria</div>
          </td>
          <td style="text-align:right; vertical-align:top;">
            <div class="doc-type">PURCHASE ORDER</div>
            <div style="background:#f39c12;color:white;padding:4px 8px;font-size:11px;font-weight:bold;display:inline-block;margin-top:5px;border-radius:2px;text-transform:uppercase;">${po.status}</div>
          </td>
        </tr>
      </table>

      <table class="info-grid">
        <tr>
          <td style="width:50%;">
            <div class="info-header">Supplier/Vendor</div>
            <strong>${vendor.name}</strong><br>
            ${vendor.contactPerson ? `Attn: ${vendor.contactPerson}<br>` : ""}
            ${vendor.phone ? `Phone: ${vendor.phone}<br>` : ""}
            ${vendor.email ? `Email: ${vendor.email}<br>` : ""}
            ${vendor.address ? `Address: ${vendor.address}` : ""}
          </td>
          <td style="text-align:right; width:50%; vertical-align:top;">
            <div class="info-header">Order Details</div>
            <strong>PO Number:</strong> ${po.id}<br>
            <strong>Date Issued:</strong> ${po.date}<br>
            <strong>Delivery Expected:</strong> ${po.deliveryDate}<br>
            <strong>Currency:</strong> ${vendor.currency || "NGN"}
          </td>
        </tr>
      </table>

      <table class="items-table">
        <thead>
          <tr>
            <th style="width: 50%;">Item / Description</th>
            <th style="width: 15%; text-align: center;">Qty</th>
            <th style="width: 15%; text-align: right;">Unit Price</th>
            <th style="width: 20%; text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsRows}
        </tbody>
      </table>

      <table class="totals-table">
        <tr>
          <td style="width:70%;">Subtotal:</td>
          <td style="width:30%; font-weight:bold;">${formattedTotal}</td>
        </tr>
        <tr>
          <td class="grand-total">Total PO Amount:</td>
          <td class="grand-total" style="color:#5a392d;">${formattedTotal}</td>
        </tr>
      </table>

      <div class="footer-note">
        <p>Please deliver the listed items by the expected delivery date. Send your official invoice to hello@obanwears.com</p>
        <p>Oban Wears &copy; 2026. All rights reserved.</p>
      </div>

      <script>
        window.onload = function() { window.print(); }
      </script>
    </body>
    </html>
  `;
  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
};

window.generateExpenseReceiptPrint = function(payment, po, vendor) {
  const printWindow = window.open("", "_blank", "width=800,height=900");
  if (!printWindow) {
    alert("Please allow popups to print/view documents.");
    return;
  }
  const formattedTotal = "\u20A6" + Number(payment.amount).toLocaleString();

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Payment Receipt - ${payment.id}</title>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Manrope:wght@500;600;700&display=swap" rel="stylesheet">
      <style>
        body { font-family: 'DM Sans', sans-serif; color: #151512; margin: 40px; line-height: 1.6; }
        .header-table, .info-grid, .items-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        .brand-title { font-family: 'Manrope', sans-serif; font-size: 26px; font-weight: 700; color: #151512; text-transform: uppercase; letter-spacing: 0.05em; }
        .doc-type { font-family: 'Manrope', sans-serif; font-size: 20px; font-weight: 700; color: #27ae60; letter-spacing: 0.05em; }
        .info-header { font-family: 'Manrope', sans-serif; font-size: 11px; font-weight: 700; color: #8c765f; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.08em; }
        .payment-box { background: #f4fbf7; border: 1px solid #27ae60; padding: 20px; margin-top: 40px; font-size: 13px; border-radius: 2px; }
        .footer-note { text-align: center; margin-top: 60px; font-size: 12px; color: #8c765f; border-top: 1px solid rgba(21, 21, 18, 0.18); padding-top: 20px; }
      </style>
    </head>
    <body>
      <table class="header-table">
        <tr>
          <td>
            <div class="brand-title">Oban Wears</div>
            <div style="font-size:12px;color:#8c765f;">Contemporary Menswear Studio<br>Lagos, Nigeria</div>
          </td>
          <td style="text-align:right; vertical-align:top;">
            <div class="doc-type">EXPENSE RECEIPT</div>
            <div style="background:#27ae60;color:white;padding:4px 8px;font-size:11px;font-weight:bold;display:inline-block;margin-top:5px;border-radius:2px;text-transform:uppercase;">PAID VENDOR</div>
          </td>
        </tr>
      </table>

      <table class="info-grid">
        <tr>
          <td style="width:50%;">
            <div class="info-header">Paid To Vendor</div>
            <strong>${vendor.name}</strong><br>
            ${vendor.phone ? `Phone: ${vendor.phone}<br>` : ""}
            ${vendor.email ? `Email: ${vendor.email}<br>` : ""}
            ${vendor.address ? `Address: ${vendor.address}` : ""}
          </td>
          <td style="text-align:right; width:50%; vertical-align:top;">
            <div class="info-header">Payment Reference Details</div>
            <strong>Receipt Number:</strong> ${payment.id}<br>
            <strong>Date Paid:</strong> ${payment.datePaid}<br>
            <strong>PO reference:</strong> ${po.id}<br>
            <strong>Bill reference:</strong> ${payment.billId}<br>
            <strong>Amount Paid:</strong> <strong>${formattedTotal}</strong>
          </td>
        </tr>
      </table>

      <div class="payment-box">
        <h4 style="color:#27ae60; margin:0 0 10px; font-family:'Manrope'; font-size:14px; text-transform:uppercase; letter-spacing:0.08em;">Transaction Acknowledgment</h4>
        <p>This document confirms that a payment of <strong>${formattedTotal}</strong> has been successfully made to <strong>${vendor.name}</strong> in settlement of Bill Reference <strong>${payment.billId}</strong> (Purchase Order <strong>${po.id}</strong>).</p>
      </div>

      <div class="footer-note">
        <p>Oban Wears &copy; 2026. All rights reserved.</p>
      </div>

      <script>
        window.onload = function() { window.print(); }
      </script>
    </body>
    </html>
  `;
  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
};
