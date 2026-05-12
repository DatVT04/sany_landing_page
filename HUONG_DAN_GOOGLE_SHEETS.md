# Hướng Dẫn Cấu Hình Google Sheets cho Sany Landing Page

---

## BƯỚC 1 — Tạo Google Sheet mới

1. Mở [https://sheets.google.com](https://sheets.google.com) → nhấn **"+ Blank"**
2. Đặt tên file, ví dụ: `Sany Holding — Leads`
3. Đổi tên tab sheet dưới cùng thành **`Leads`** (click đúp vào "Sheet1" → gõ "Leads")
4. Copy **Spreadsheet ID** từ URL:
   ```
   https://docs.google.com/spreadsheets/d/<<COPY_PHẦN_NÀY>>/edit
   ```

---

## BƯỚC 2 — Mở Google Apps Script

1. Trong Google Sheet, vào menu **Extensions → Apps Script**
2. Trình soạn thảo GAS mở ra — xóa hết code mặc định trong `Code.gs`

---

## BƯỚC 3 — Dán code vào Apps Script

1. Mở file `Code.gs` (đã tạo sẵn trong thư mục dự án)
2. **Copy toàn bộ nội dung** file đó
3. Dán vào trình soạn thảo GAS (đã xóa code cũ ở bước 2)
4. **Thay dòng này** bằng Spreadsheet ID bạn copy ở Bước 1:
   ```javascript
   const SPREADSHEET_ID = 'THAY_BẰNG_SPREADSHEET_ID_CỦA_BẠN';
   ```
   → Ví dụ sau khi thay:
   ```javascript
   const SPREADSHEET_ID = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms';
   ```
5. Nhấn **💾 Save** (hoặc Ctrl+S)

---

## BƯỚC 4 — Deploy Web App

1. Nhấn nút **"Deploy"** (góc trên phải) → chọn **"New deployment"**
2. Nhấn biểu tượng ⚙️ bên cạnh "Select type" → chọn **"Web app"**
3. Điền thông tin:
   - **Description**: `Sany Landing Page v1`
   - **Execute as**: `Me (your.email@gmail.com)`
   - **Who has access**: **`Anyone`** ← ⚠️ BẮT BUỘC chọn Anyone
4. Nhấn **"Deploy"**
5. Google sẽ hỏi cấp quyền → nhấn **"Authorize access"**
   - Chọn tài khoản Google của bạn
   - Nhấn **"Advanced"** → **"Go to [tên project] (unsafe)"** (bình thường, đây là app của chính bạn)
   - Nhấn **"Allow"**
6. Copy **Web app URL** hiện ra — dạng:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```
   ⚠️ **Lưu URL này lại, dùng ở Bước 5**

---

## BƯỚC 5 — Gắn URL vào Landing Page

1. Mở file `index.html`
2. Tìm dòng (khoảng cuối file, trong thẻ `<script>`):
   ```javascript
   const GAS_URL = 'YOUR_GAS_URL';
   ```
3. Thay `YOUR_GAS_URL` bằng URL bạn copy ở Bước 4:
   ```javascript
   const GAS_URL = 'https://script.google.com/macros/s/AKfycby.../exec';
   ```
4. Lưu file

---

## BƯỚC 6 — Kiểm tra hoạt động

1. Mở landing page trên browser
2. Điền thử họ tên + SĐT vào form Hero hoặc CTA → nhấn Submit
3. Mở Google Sheet — kiểm tra xem có hàng data mới không
4. Nếu chưa thấy, thử kiểm tra:
   - URL GAS đã đúng chưa (copy đủ không bị cắt)
   - Đã chọn "Who has access: Anyone" chưa
   - Mở Console trình duyệt (F12) xem có lỗi không

---

## Lưu Ý Quan Trọng

| Vấn đề | Giải thích |
|--------|-----------|
| Dùng `mode: 'no-cors'` | GAS không hỗ trợ CORS headers → response body không đọc được, nhưng data vẫn được ghi vào sheet bình thường |
| Mỗi lần sửa GAS | Phải tạo **New deployment** mới (không phải edit deployment cũ) và cập nhật URL mới vào `index.html` |
| Quota miễn phí | GAS miễn phí cho phép ~20,000 lượt ghi/ngày — quá dư cho landing page |
| Bảo mật | URL GAS là public nhưng chỉ ghi data, không đọc — an toàn |

---

## Kết Quả Sau Khi Hoàn Thành

Google Sheet sẽ tự động có các cột:

| Thời gian | Họ và tên | Số điện thoại | Email | Nguồn form | User Agent |
|-----------|-----------|---------------|-------|------------|------------|
| 12/05/2026 10:30 | Nguyễn Văn A | 0901234567 | a@email.com | hero-form | Mozilla/5.0... |
| 12/05/2026 11:00 | Trần Thị B | 0912345678 | b@email.com | cta-form | Mozilla/5.0... |
