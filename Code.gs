// ================================================================
//  SANY HOLDING — Google Apps Script
//  Nhận dữ liệu từ Landing Page và ghi vào Google Sheets
// ================================================================

// ⚠️ THAY bằng ID của Google Sheet của bạn
// (lấy từ URL: https://docs.google.com/spreadsheets/d/<<SPREADSHEET_ID>>/edit)
const SPREADSHEET_ID = 'THAY_BẰNG_SPREADSHEET_ID_CỦA_BẠN';

// Tên sheet tab sẽ ghi data (mặc định là "Sheet1", đổi nếu cần)
const SHEET_NAME = 'Leads';

// ================================================================
//  doPost — endpoint nhận POST request từ Landing Page
// ================================================================
function doPost(e) {
  try {
    // Parse JSON body
    const data = JSON.parse(e.postData.contents);

    const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet   = ss.getSheetByName(SHEET_NAME);

    // Tự tạo sheet nếu chưa có
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    // Tạo header row nếu sheet còn trống
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Thời gian',
        'Họ và tên',
        'Số điện thoại',
        'Email',
        'Nguồn form',
        'User Agent'
      ]);
      // Style header
      const headerRange = sheet.getRange(1, 1, 1, 6);
      headerRange.setBackground('#1C1A19');
      headerRange.setFontColor('#C9A84C');
      headerRange.setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    // Ghi data vào hàng mới
    sheet.appendRow([
      new Date(),                          // Thời gian
      data.name   || '',                   // Họ và tên
      data.phone  || '',                   // Số điện thoại
      data.email  || '',                   // Email
      data.source || 'unknown',            // Nguồn form (hero / cta)
      data.ua     || ''                    // User Agent
    ]);

    // Trả về thành công
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    // Trả về lỗi
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ================================================================
//  doGet — kiểm tra script còn sống không (optional)
// ================================================================
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'Sany Holding GAS is running ✅' }))
    .setMimeType(ContentService.MimeType.JSON);
}
