` 1. INITIALIZE NODEJS PROJECT`
- npm init -y: Lệnh này sẽ tạo cho mình 1 tệp `package.json` nơi chúng ta sẽ cài đặt các thư viện cần thiết.

`2. INSTALL EXPRESS`
- npm install express@4.18.2

`3. CREATE BACKEND FOLDER (index.js, app.js, server.js)`

```js
/server.js

import express from 'express'

//Tạo 1 ứng dụng express

const app = express()

//Cho ứng dụng lắng nghe trên 1 cổng, in ra console để chắc chắn server đã chạy

app.listen(5001, () =>{
    console.log('Server bắt đầu trên cổng 5001')
})
```
=> Chạy thử: Trong terminal gõ node server.js
- Giả sử muốn chạy bằng lệnh `npm run dev` thì cấu hình lại trong package.json

`4. CREATE API`

```js
app.get('/api/tasks', (req, res) =>{
    res.send('Bạn có 1 việc cần làm')
})
```
- Khi có yêu cầu get đến địa chỉ endpoint/route thì server sẽ trả về dữ liệu.

- Hiện tại, mỗi lần sửa code thì phải khởi động lại server để có thể thấy được kết quả update 

=> Cách để mỗi lần lưu code thì server tự khởi động lại luôn:
- B1: Dọn sạch màn hình bằng clear terminal
- B2: Cài nodemon: `npm install nodemon -D`: Chữ D là dành cho môi trường development.
- B3: Sửa lại script để chạy server trên nodemon thay vì node.

=> Trong package.json `scripts.dev` sẽ được dùng lúc còn đang viết mã (sữa code liên tục), còn `scripts.start` dành cho deploy lên server thật nên thêm vào `node server.js` vì deploy rồi thì không cần sửa code nữa.

`5. POST METHOD`

- Trả về `json()`: Khi dùng `send` thì có thể gửi đủ loại dữ liệu như là chuỗi, số, đối tượng. Còn khi dùng `json` thì nội dung bên trong phải viết dưới dạng `json`

=> Cách làm chuẩn nhất là dùng `json()` vì API chỉ làm việc với kiểu `json()` chứ không phải kiểu khác

`6. UPDATE METHOD`

Khi update nhiệm vụ thì cần phải biết nhiệm vụ đó là nhiệm vụ nào => cần id => chưa thể test được vì để test 1 lệnh put cần 1 công cụ chuyên test API như `Postman` hoặc `Thunder`.

`7. DELETE METHOD`

=> C-R-U-D = Create - Read - Update - Delete
=>            POST  - Get   - Put/Patch - Delete

`8. CODE HIỆN TẠI ĐANG ĐỂ HẾT MỌI THỨ VÀO SERVER.JS`

- Trên thực tế không thể làm như vậy vì khi logic API được triển khai ra thì sẽ thấy hàng trăm hàng code nên cách tốt nhất là nên tách những route này thành tệp và thư mục riêng

`9. TẠO THƯ MỤC SOURCE, DI CHUYỂN SERVER.JS VÀO`

- Khi di chuyển server.js vào thư mục `src` thì phải đổi lại đường dẫn trong `package.json`

`10. TẠO THƯ MỤC ROUTES TRONG SRC TRONG ROUTES TẠO 1 FILE ĐƯỜNG DẪN TASKROUTES.JS `

```js
import express from 'express'

const router = express.Router()

export default router
```

- Sau đó copy những endpoint bên `server.js` đã tạo trước đó dán vào đây và import ngược trở lại

- Sau đó để khai báo là mình muốn sử dụng API trong tệp mới  gõ `app.use(taskRoutes)` trong `server.js`

- Thêm tiền tố `/api/tasks` vào (giống như định nghĩa chung) vì tất cả API đều có tiền tố này.

- Và bên trong `taskRoutes` thay vì viết `app.get`... thì đổi thành `router.get`...

`11. VÌ BÊN TRONG API SẼ CHỮA LOGIC ĐỂ XỬ LÝ DỮ LIỆU => BEST PRACTICE LÀ TÁCH NÓ THÀNH TỆP RIÊNG GỌI LÀ CONTROLLER`

- Tạo 1 tệp `controller` bên trong `src`
- Tạo 1 hàm export để xử lý từng phương thức API, 

`12. Setup MongoDB sau đó CÀI mongoose`

- npm install mongoose

`13. TẠO THƯ MỤC CONFIG ĐỂ KẾT NỐI VỚI DB`

- Tạo file `db.js`
- Tạo hàm để connectDB, dùng hàm bất đồng bộ
- Truyền connect string vào, đằng sau `mongodb.net/` viết tên của collection vào (Không cần điền cũng được)
- In ra lỗi khi connect thành công và thất bại
- Import connectDB vào
- Trong khối catch, thoát ra khỏi hàm nếu có lỗi (`process.exit(1)`), 1 ở đây là thoát với trạng thái thất bại, và nếu là 0 là thoát với trạng thái thành công.
- Nhưng có vấn đề là nếu push code này lên github, người khác mở trang db.js thì sẽ thấy connection string, bao gồm cả tài khoản và mật khẩu nên là họ có thể hoàn toàn truy cập vào DB của bạn.
- Gỉai pháp là đặt connect string vào `.env`
- Làm sao để truy cập giá trị này trong code? => Cài `dotenv` (npm install dotenv) - package này cho phép mình truy cập vào các biến môi trường
- import vào `server.js`, cấu hình là `dotenv.config`
- Bỏ trang `.env` khỏi github => tạo file `gitignore` trong thư mục backend => sau đó ghi `.env` thì git sẽ tự động bỏ thư mục này ra. Và bỏ luôn `node_modules` vì tệp này rất nặng, có thể tải lại bất kỳ lúc nào bằng lệnh `npm install`.
- Đặt luôn port 5001 vào .env

`14. TẠO THƯ MỤC MODEL`
- Theo quy ước, tên model sẽ viết hoa chữ cái đầu và ở dạng số ít
- Khai báo task schema
- Sau khi có schema, tạo model dựa trên schema
`15. CONTROLLER CONNECT VS DATABASE ĐỂ LẤY DỮ LIỆU, TẠO MỚI, VÀ XOÁ`

- Import model task
- Thêm async vì là hàm bất đồng bộ
```js
const task = await Task.find()
```
=> Đoạn này để lấy toàn bộ dữ liệu từ collection
- Bắt lỗi nếu có lỗi  - trả về client thông báo lỗi 500
- Công cụ test API (Postman extension)
- In ra lỗi (Chỉ backend xem được - còn phía front-end báo lỗi API)


`16. TRONG CREATE TASK, ĐỂ ĐỌC ĐƯỢC req.body`

- Để đọc được thì phải qua server.js và thêm middleware là app.use(express.json())
- Tiếp theo, tạo 1 task mới với `const task = new Task({title})`
- `const newTask = await task.save()` Lệnh này sẽ lưu task vào database, nếu lưu thành công thì mình trả về response là response.status 
- Test API bằng method POST
- Tiếp theo là viết controller để updated nhiệm vụ, lấy những trường có thể update như title,status, completed at
- Tạo một biến để lấy nhiệm vụ sau khi update
- Để update nhiệm vụ trong database, dùng `findByIdAndUpdate`
- Sau đó truyền vào 3 tham số

1. `req.params.id` => cách lấy id từ URL
2. Chứa đối tượng muốn update (3 trường lấy trong body)
3. {new: true} => có nghĩa là khi update xong nó sẽ trả về giá trị sau khi update

- Tiếp theo kiểm tra updatedTask có tồn tại không (trong trường hợp client gửi id không hợp lệ) 

- Nếu updatedTask tồn tại thì trả về response thành công và gửi luôn về client updatedTask

- Thử test update API, thay đổi mỗi title và kiểm tra.

- Express cho phép updated bán phần

- Cuối cùng là deletedTask, tạo biến deletedTask => để xoá thì dùng `findByIdAndDeleted`id sẽ lấy từ `request.params.id`
- Kiểm tra xem nhiệm vụ có tồn tại hay không
- Bắt lỗi
- Thêm chi tiết là khi lấy nhiệm vụ, nhiệm vụ mới sẽ thêm vào nhất bằng cách trong biến `tasks` của `getAlltask` thêm  `.sort({createdAt: -1})` - 1 nghĩa là sort từ dưới lên (hoặc có thể viết 'desc' - descending, 'asc': anscending)
- Chỉnh lại 1 backend, thay vì server chạy trước rồi mới liên kết DB., thì mở cổng DB trước rồi chạy server 
```js
connectDB().then(() =>{
    app.listen(PORT, () =>{
        console.log(`Server bắt đầu trên cổng ${PORT}`)
    })
})
```

`17 LÀM FRONT-END`
- Đang ở thư mục backend, terminal gõ `cd..` để di chuyển ra thư mục gốc, sau đó `cd /frontend` để di chuyển vào frontend

`Tạo thư mục bằng vite`
- npx create-vite . (thêm dấu chấm để thêm vào ngay thư mục hiện tại)
- chạy npm install

- install các package cần thiết: `npm i react-router sonner axios lucide-react

- Tạo folder pages trong src, tạo 2 file homepage và notfound.jsx

- Setup react router trong file app.jsx

`18. CÀI TAILDWIND`
`19. CÀI SHADCN`
- Dùng javascript thì tạo file `jsconfig.json`
- Cài thêm 1 gói hỗ trợ
- Cài từng component
`20. Tạo UI componeent cho từng trang`

`21. TẠO VARIANT CHO BUTTON`
- cva: class-variant-authority
- cn:: Sự kết hợp của 2 thư viện con là clsx và twMerge
+ clsx: cú pháp gọn hơn
+ twMerge: xử lý xung đột khi gộp nhiều class tailwind lại(Vd: component card đã có style, mình có thể bổ sung style riêng hoặc ghi đè style)
- Tạo custom variant cho button

`22. TẠO THÊM FILE LƯU TRỮ CÁC LOẠI LỌC THAY VÌ VIẾT CỨNG TỪNG LOẠI`
- Tạo 1 file mới trong thư mục library

`23. STATS AND FILTER`
- Để hiển thị các thông tin cần thiết, truyền prop vào tham số hàm `completedTaskCount = 0, activeTaskCount = 0, pendingTaskCount = 0 fillter = 'all'`

- FILTER: vì FilterType là đối tượn nên dùng `Object.key`, dùng `map` lặp qua

`24. TẠO 2 COMPONENT RỖNG KHI CHƯA CÓ TASK NÀO ĐƯỢC ADD`
- 1 danh sách công việc sẽ có 2 trạng thái chính: 
    + Nếu không có công việc nào hết thì sẽ hiển thị UI trống với mấy dòng thông báo (Thay đổi dựa vào đang ở bộ lọc nào)
    + Nếu có nhiệm vụ sẽ hiển thị từng thẻ nhiệm vụ ra

`25. TEST GIAO DIỆN BẰNG DỮ LIỆU GIẢ TRONG TASKLIST.JSX`
- tạo biến filter có giá trị mặc định là all
- Tạo mảng `filteredTasks` chứa các thông tin task để test
- Trước khi hiển thị danh sách, cần kiểm tra mảng có trống không
    + Nếu không có nhiệm vụ nào sẽ trả về giao diện rỗng `EmptyTask` và truyền prop `filter` đã khai báo ở đầu vào
    + Còn nếu có nhiệm vụ thì sẽ return ra danh sách các thẻ
- `.map()` mảng `filterTasks` ra và truyền vào 2 tham số `task` và `index`. key là `task._id` và nếu cái task.id không tồn tại thì dùng `index`

- Sau đó truyền vào `TodoTask` 2 prop `task` và `index`

`26. Code UI cho EmptyTask`
- Text bên trong viết logic hiển thị dựa trên filter

`27 . Component TodoTask`
- Tạo biến isEditing = false
- Return card, dùng `cn` để gộp nhiều class tailwind (Hiểu đơn giản là `cn` là style cho phần tử có điều kiện)
- `style={{animationDelay: `${index * 50}ms`}}` mỗi item sẽ render chậm hơn 50ms để tạo hiệu ứng xuất hiện dần dần chứ không xuất hiện cùng lúc

- Trong card, đầu tiên là tạo button để đánh dấu task có hoàn thành hay chưa, vì nút sẽ hiển thị khác nhau dựa vào trạng thái đã hoàn thành hay chưa nên tiếp tục dùng `cn`

- Hiển thị title và edit title

- Ngày tạo và ngày hoàn thành Dùng `new Date(task.createdAt). toLocaleString()` vì trong database lưu theo giờ quốc tế nên muốn hiển thị theo giờ VN phải `.toLocaleString`.

- Kiểm trả xem nếu có `task.completedAt` thì mới hiện ngày hoàn thành

- Tạo nút edit và xoá
    + Ban đầu là ẩn `hidden` chỉ hiện lên khi hover vào card `group-hover:inline-flex`

` 28. LÀM PHẦN FOOTER`

- Để hiển thị dòng text, cần biết được số lượng công việc cần làm và số lượng công việc đã hoàn thành

`29. KẾT NỐI VỚI BACKEND`
- Đa số logic sẽ nằm trong homepage
- tạo 1 state để lưu dữ liệu từ backend
- taskBuffer (Chổ để gom dữ liệu lại để xử lý tiếp, 'buffer' sẽ hợp lý hơn 'list' bởi vì dữ liệu từ backend trả về chưa phải là dữ liệu mà người dùng thấy ngay vì nó còn phải qua các bước như lọc theo trạng thái, phân trang,... rồi mới hiển thị trên giao diện ) 
- Fetch API (bất đồng bô, dùng thêm `toast.error` hiển thị trong bắt lỗi)
- Để hàm fetch API chạy mỗi khi trang homepage load, Dùng `useEffect`. `useEffect` sẽ theo dõi 1 hoặc nhiều state, mỗi khi state trong dependencies thay đổi thì nó sẽ chạy lại logic bên trong, khi dependiciey là rỗng thì nó chỉ chạy 1 lần duy nhất khi component được render lầnd dầu tiên.

- Xuất hiện lỗi => bật server
- Lỗi CORS (vì frontend ở `:5173` còn backend ở `5001` => backend chưa cho phép domain ở frontend truy cập nên báo lỗi )
- Khai báo ở backend là nếu thấy yêu cầu từ `:5173` thì cho phép nó đi qua bằng cách thêm header `Access-control-allow-origin http://localhost:5173` trong API response `Access-control-allow-origin *` dấu * là cho phép tất cả.

- vậy phải viết đoạn này với tất cả API
```js
app.get("/api/tasks", (req, res) => {
  ...

  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  ...
  res.status(200).json('...');
});
```
- Mất thời gian nên trong expressJS có 1 cái thư viên giúp thêm những header này thông qua middleware.

- Quay lại tắt server và `npm i cors`

- import trong `server.js` và thêm middleware 
    + `app.use(cors())`  nếu viết cách này thì sẽ cho phép tất cả domain gọi API
    + `app.use(cors({origin: http://localhost:5173}))` chỉ cho phép ở domain `:5173` => sau đó chạy lại server

- Thay vì fetch thủ công => dùng axios
- Truyền prop `filteredTasks` vào task list
- Component cha thêm thuộc tính `filteredTasks`  vào `TaskList` và gán vào giá trị API trả về của state `taskBuffer`

- [10032025-21:30PM] Test lỗi: Khi tạo thêm 1 task trong POSTMAN để trạng thái là 'pending' thì kết quả trả về là trạng thái active. Nguyên nhân là do trong `taskController.js` phần xử lý POST chỉ lấy `title` chứ không lấy `status` từ `req.body`. Vì nếu không thêm `status` vào thì mặc định là `active`. Chỉ khi update task (PUT) lúc này hàm xử lý có lấy `status` từ `req.body` nên mới có thể hiện trạng thái là `pending` - Nhưng chỉ sau khi update task => thêm `status` vào `req.body` ngay từ đầu.

- Khi đã lấy ra được nhiệm vụ từ backend ta có thể tính toán được có bao nhiêu nhiệm vụ đang làm. bao nhiêu nhiệm vụ đang hoàn thành và bao nhiêu nhiệm vụ đang pending.

- Dùng `Countdocument` để đếm số lượng nhiệm vụ.
- Thêm biến `activeCount` trong controller
```js
const activeCount = await Task.countDocuments({status : 'active'}) // Dòng này sẽ đoán số lượng nhiệm vụ có status là active
const completedCount = await Task.countDocuments({status : 'completed'}) // Dòng này sẽ đoán số lượng nhiệm vụ có status là completed
const pendingCount = await Task.countDocuments({status : 'pending'}) // Dòng này sẽ đoán số lượng nhiệm vụ có status là pending
```

- Dùng cách này có nhược điểm là sẽ gửi đến tận 4 query riêng biệt đến database, ví dụ mỗi query mất 1s thì 4 query mất 4s => Tìm cách để chạy 3 query này cùng lúc.

- Nhược điểm thứ 2 là khi muốn thêm bộ lọc để lọc nhiệm vụ của ngày hôm nay hay của tuần này chẳng hạn thì bước đầu tiên, lấy nhiệm vụ thì đã lọc 1 lần => nhiệm vụ đang làm phải lọc lần nữa, => nhiệm vụ hoàn thành phải lọc thêm lần nữa, => tương tư vậy càng nhiều data càng mất thời gian

=> Tìm cách để lọc 1 lần thôi sau đó mới đếm số dựa trên những task đã lọc. => PHƯƠNG PHÁP BĂNG CHUYỀN TỔNG HỢP (AGGREGATION PIPELINES)

`AGGREGATION PIPELINES`
```js
// Đầu tiên, tạo 1 biến để lưu kết quả
const result = await Task.aggregate([])
```
- Aggregate nhận vào 1 mảng các bước xử lý dữ liệu, mỗi phần tử trong mảng là 1 đối tượng, mỗi đối tượng là 1 bước(1 stage)
- Bên trong mở 1 đối tượng như sau:

```js
{
    $facet:{
        task:[{$sort: {createdAt: -1}}] // sắp xếp nvu theo thời gian tạo
        activeCount: [{$match :{status: 'active'}}, {$count: 'count'}]
        pendingCount: [{$match :{status: 'pending'}}, {$count: 'count'}]
    }
}
```
-facet là 1 nhánh, 1 nhánh cho phép chúng ta chạy nhiều pipeline song song rồi gom kết quả về cùng 1 lúc.
- pipeline đầu tiên đặt tên là task, mỗi pipeline trong nhánh cũng cần nhiều bước nên cũng cần 1 mảng để chứa các bước đó.
- pipeline tiếp theo là activecount, sẽ có 2 bước:
    + Lọc ra những nhiệm vụ có status là active
    + đếm số lượng sau khi lọc (`count` đầu tiên la việc cần làm => đếm, `count` thứ 2 là nói với mongoDB trả về 1 mảng có đối tượng có key là `count`)
- Tương tự những data khác
- Sau khi đã thành công, tạo biến để lấy các nhiệm vụ sau khi đã sắp xếp

```js
const tasks = results[0].tasks // lấy phần tử đầu tiên
const activeCount = results[0].activeCount[0]?.count || 0 // activeCount cũng là 1 mảng nên cần lấy item đầu tiên, và mảng này có thể là mảng rổng nên mình cần kiểm tra item đầu tiên có phải là undefined không? nếu là mảng rổng thì giá trị mặc định là 0
// ... Rest of code//
```
- cuối cùng, gửi dữ liệu về front end

```js
res.status(200).json({tasks, activeCount, pendingCount, completedCount})
```

- Qua frontend để hiển thị kết quả này lên giao diện
- Tạo 3 state để lưu giá trị của mỗi count
- setter trong fetch
- truyền prop xuống <StatsAndFilter/>

`30. LOGIC CỦA BỘ LỌC`
- Để hiển thị những nhiệm vụ đang làm, đang chờ, hoàn thành

- Trong homepage, tạo state để lưu filter hiện tại..
- Thêm 2 props `filter` và `setFilter` vừa tạo cho component <StatsAndFilter/>
- Truyền vào `StatsAndFilter`

[10062025-15:26PM] TEST: 
2 nhu cầu khi click vào một option trong filter:
    + Thay đổi selectedOption để UI highlight option đã chọn.
    + Gọi setFilter(option) (hàm từ props) để báo cho component cha biết cần lọc tasks theo trạng thái nào.

Nhưng Button chỉ có một onClick, nên em mới lo không biết làm sao gộp được cả hai. 

👉 Cách giải quyết: gộp logic lại trong một handler

```js
const handleSelectedOption = (option) => {
  setSelectedOption(option)     // update UI local state
  setFilter(option)             // gọi hàm từ props để cha biết filter
}

```

- Giờ giá trị của filter đã được cập nhật nhưng mà danh sách nhiệm vụ không có gì thay đổi, tại vì taskList vẫn đang hiển thị tất cả nhiệm vụ từ `taskBuffer` HomePage.tsx

- Để nó hoạt động thì phải truyền vào danh sách nhiệm vụ đã lọc rồi

- Để lọc danh sách nhiệm vụ theo trạng thái => tạo 1 biến mới `filterdTasks`

- Dùng hàm .filter, bên trong dùng câu lệnh `switched` để kiểm tra giá trị của `filter`

- Thay vì truyền `<TaskList filteredTasks={taskBuffer} />` vào thì truyền `filteredTasks`

- bỏ harcode bằng all (TaskList ln 6), truyền filter như là 1 prop vào TaskList, và qua component cha thêm vào

`31. THÊM LOGIC ĐỂ TẠO NHIỆM VỤ MỚI TỪ FRONT-END`

- Tạo state lưu giá trị người dùng nhập
- gắn value vào input (kiểm soát nội dung hiển thị trong ô)
- gắn onChange (): là để cập nhật state theo đúng input nội dung mỗi lần gõ chữ
- Tạo hàm để gửi yêu cầu lên server => tạo task mới
    B1: Kiểm tra xem người dùng đã nhập gì chưa (dùng trim() - loại bỏ khoảng trắng thừa ở đầu và cuỗi chuỗi kiểm tra xem phòng trường hợp người dùng chỉ gõ dấu cách mà không có nội dung gì)

- Kết nối nút thêm với hàm `addTask`
- Gắn `onKeyPress` vào input để biết đang nhập gì
- Tạo hàm `handleKeyPress` với tham số `event` (Trong React mỗi khi một sự kiện xảy ra, React sẽ tự động truyền 1 đối tượng đại diện cho sự kiện đó vào hàm handler)
- Tiếp tục xử lý bên component cha, gán prop `handleNewTaskAdded` = {handleTaskChanged}
- định nghĩa handleTaskChanged, hàm này chỉ cần gọi lại fetchTask(), sau khi fetchTask thì nó sẽ gọi lại các task ở trong hompage và hiển thị lại số liệu cho đúng

- Không viết thủ công `http://localhost:5001/api` vì khi có nhiều URL sẽ khó quản lý

- Cách giải quyết: Trong thư mục `lib` tạo file để định nghĩa URL gốc `axios.js`

```js
import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5001/api'
})

export default api
```

`32. XOÁ NHIỆM VỤ`
- Tạo hàm xoá nhiệm vụ, truyền vào id làm tham số, vẫn gọi API
```js
await api.delete(`/tasks/${taskID}`) // truyền id vào trong dấu nháy ngược
```

- Kéo xuông button xoá, truyền hàm `deletedTask` vào và truyền vào `task._id`

- Ra `TaskList.jsx` truyền vào `handleTaskChanged`
- Ra `Homepage` để truyền `handleTaskChanged` cho `taskList`

`33. UPDATE NHIỆM VỤ`
- Tạo 1 state để quản lý trạng thái edit
- Tạo 1 state để update người dùng nhập
- onBlur() Sự kiện này xảy ra khi người dùng bấm ra ngoài ô nhập
- tạo hàm call api update task, vì hàm này chỉ chạy khi người dùng đã nhấn enter rồi, nên cần thoát khỏi chế độ edit

`34. LOGIC CHO OPTION TRẠNG THÁI`
```js
    const handleStatusUpdated = async (selectedStatus) => {
        try {
            switch (selectedStatus) {
                case 'completed':
                    return await api.put(`/tasks/${task._id}`, {
                        status: 'completed',
                        completedAt: new Date().toISOString(),
                    })
                case 'pending':
                    return await api.put(`tasks/${task._id}`, {
                        status: 'pending',
                        updatedAt: new Date().toISOString()
                    })
                default:
                    return true
            }
            toast.success(`Thay đổi trạng thái nhiệm vụ ${task.title} thành công`)
            handleTaskChanged()
        } catch (error) {
            console.error('Thay đổi trạng thái nhiệm vụ thất bại', error)
            toast.error('Có lỗi xảy ra khi thay đổi trạng thái nhiệm vụ')
        }
    }
```
- CÁC LỖI SAI:
    + `toast.success` và `handleTaskChanged()` nằm sau return trong `switch - case` → Khi switch gặp return, nó thoát khỏi hàm luôn. Nên `toast.success()` và `handleTaskChanged()` chưa bao giờ được thực thi.

    + State `selectedStatus` đang bị khởi tạo sai

    ```js
    const [selectedStatus, setSelectedStatus] = useState('active');
    ```

    + Nhưng task thực tế có thể là 'completed', 'pending', hoặc 'active'.
    + luôn để 'active', UI hiển thị lúc đầu sẽ sai màu và status chưa đồng bộ.

- SỬA LẠI

```js
const handleStatusUpdated = async (selectedStatus) => {
        try {
            let response;

            switch (selectedStatus) {
                case 'completed':
                    response = await api.put(`/tasks/${task._id}`, {
                        status: 'completed',
                        completedAt: new Date().toISOString(),
                    })
                    break
                
                case 'pending':
                    response = await api.put(`tasks/${task._id}`, {
                        status: 'pending',
                        updatedAt: new Date().toISOString()
                    })
                    break
                
                case 'active':
                    response = await api.put(`/tasks/${task._id}`, {
                        status: 'active',
                        updatedAt: new Date().toISOString()
                    })
                    break
                
                default:
                    return
            }
            toast.success(`Thay đổi trạng thái nhiệm vụ "${task.title}" thành công`)
            handleTaskChanged()
            return response

        } catch (error) {
            console.error('Thay đổi trạng thái nhiệm vụ thất bại', error)
            toast.error('Có lỗi xảy ra khi thay đổi trạng thái nhiệm vụ')
        }
    }
```
- GIẢI THÍCH
+ Dùng biến let response để lưu kết quả tạm thời,
+ Sau đó mới xử lý tiếp (show toast, update UI, v.v.):

Lý do cần break: Trong switch, nếu em không có break, thì code sẽ “rơi xuống” case tiếp theo
Ví dụ:
```js
switch (selectedStatus) {
  case 'completed':
    response = await api.put('/completed')
  case 'pending':
    response = await api.put('/pending')
}

```
→ Nếu selectedStatus là 'completed',
thì nó sẽ chạy luôn cả case 'pending' 😱

TÓM LẠI:
- Dùng let response để giữ kết quả tạm thời,

- Dùng break để ngăn rơi xuống case khác,

- Dùng toast.success và handleTaskChanged() sau switch để đảm bảo luồng chạy nhất quán và dễ đọc.

- `default: return` Đảm bảo hàm vẫn trả về giá trị hợp lệ, không lỗi

`35. LỌC THEO THỜI GIAN`
- Tạo 1 mảng để quản lý tuỳ chọn trong bộ lọc trong `data.js` có `value` là tiếng anh để code backend cho tiện, còn `label` bằng tiếng việt để hiển thị UI

- Copy combobox, import mảng vừa tạo
- Tính toán ngày
- Vào backend thêm logic vào controller `getAlltaks`
- Đầu tiên là lấy cái `filter` từ query trên URL
- Lấy ngày/giờ hiện tại
- Tạo biến `startDate` để gán giá trị
- Trường hợp `all` sẽ không lọc gì hết nên `default` sẽ là `null`
- Tạo query để đưa vào mongoDB
```js
const query = startDate ? {createdAt: {$gte: startDate}} : {}
```

- Query này có 1 điều kiện là nếu có `startDate` thì lọc theo `createdAt` lớn hơn hoặc bằng `startDate`

- Chữ `gte` là viết tắt của `greater than or equal to`

- nếu `startDate` bằng null thì trả về object rỗng `{}` tức là lấy tất cả

- Thêm 1 pipeline bên trong `aggregate`, pipeline này sẽ chạy trước `$facet`

```js
{$match: query}
```

`36 XỬ LÝ BÊN FRONT-END`
- Tạo state trong homepage lưu giá trị người dùng chọn trong combobox (giá trị mặc định là today)
- Truyền `dateQuery` và `setDateQuery` vào luôn
- Thêm 2 prop này vào component cha  `DateTimeFilter`
- Để hiển thị user đang chọn option nào trên label trên nút sẽ thay đổi dựa trên giá trị của`dateQuery` là: nếu có dateQuery thì sẽ tìm trong mảng options các object nào có value bằng với `dateQuery` rồi lấy lable của nó để hiển thị, còn nếu không có `dateQuery` thì mặc định label của object đầu tiên trong option
- Sửa commandItem lại thành `setDateQuery={currentValue}`

- Qua `Homepage` thêm `dateQuery` vào useEffect dependencies để fetch lại mỗi lần có query

- icon check là `dateQuery ===...`

- URL của `fetchTask` sẽ sửa lại thành `const res = await api.get(`/tasks/?filter=${taskQuery}`)`

`37. PAGINATION`
- Component này chịu trách nhiệm báo cho homepage biết khi nào người dùng bấm nút trước sau hoặc chọn 1 trang bất kỳ.

- Để làm được chuyện đó, component này cần nắm 2 thông tin cơ bản
    + Trang hiện tại là trang bao nhiêu
    + Tổng cộng có bao nhiêu trang
- Tạo state để nhớ trang ở trang số mấy  (mặc định là 1)

- trong `data.js`, tạo 1 biến lưu số lượng thẻ hiển thị trên 1 trang `visibleTasksDisplay`

- Viết hàm Lấy ra những nhiệm vụ hiển thị trên trang hiện tại dựa trên `filteredTasks` bằng phương thức `slice` 

```js
const visibleTasks = filteredTasks.slice(
    (page-1) * visibleTaskDisplay // Vị trí bắt đầu
    page * visibleTaskDisplay // Vị trí kết thúc
)
```
- <TaskList/> thay vì hiển thị `filterdTasks` thì hiển thị `visibleTask`

- Tính tổng số trang để xem có tổng cộng bao nhiêu trang

- Tạo 3 hàm handler để di chuyển trang  (trước, sau, và trang bất kỳ). Trang bất kỳ có tham số là trang mới `newPage`

- Thêm vào taskListPagination

- Thêm props vào taskListPagination

- thêm pagination

- Đặt lại bố cục pagination bằng wrap trong thẻ div

- Chỉnh nút di chuyển trang, bỏ href

- Bỏ Pagination link và elipse, tính toán trước để hiển thị

- Tạo hàm xác định phần phân trang sẽ trông như thế nào  `generatedPages`

- Gọi hàm này để lấy ra danh sách các trang cần hiển thị

- duyệt qua mảng `pagesToshow` bằng hàm `map()`

```js
    useEffect(() => {
        setPage(1)
    }, [filter, dateQuery]);
```

```js
    useEffect(() => {
        if (visibleTasks.length === 0 && page > 1) {
            setPage((prev) => prev - 1)
        }
    }, [visibleTasks.length, page])

    //  tự động quay về trang trước khi trang hiện tại không còn task
    // kiểm tra page > 1 để tránh quay về trang 0 hoặc âm
```

*TOGGLE BUTTON
```js
const toggleBtnStatus = async () => {
        try {
            if (task.status === 'active') {
                await api.put(`/tasks/${task._id}`, {
                    status: 'completed',
                    completedAt: new Date().toISOString()
                })
                toast.success(`Thay đổi trạng thái nhiệm vụ "${task.title}" thành công!`)
            } else if (task.status === 'pending') {
                await api.put(`/tasks/${task._id}`, {
                    status: 'completed',
                    completedAt: new Date().toISOString()
                })
                toast.success(`Thay đổi trạng thái nhiệm vụ "${task.title}" thành công!`)
            } else {
                if (task.status === 'completed') {
                    await api.put(`tasks/${task._id}`, {
                        status: 'active',
                        completedAt: null
                    })
                    toast.success(`Thay đổi trạng thái nhiệm vụ "${task.title}" thành công!`)
                }
            }
            handleTaskChanged()
        } catch (error) {
            console.error('Cập nhật nhiệm vụ không thành công', error)
            toast.error(`Lỗi xảy ra khi cập nhật nhiệm vụ`)
        }
    }
```

=> Đơn giản hoá thành

```js
const toggleBtnStatus = async () => {
    try {
        if (task.status === 'completed') {
            // Chuyển về active
            await api.put(`/tasks/${task._id}`, {
                status: 'active',
                completedAt: null
            })
        } else {
            // pending hoặc active đều chuyển thành completed
            await api.put(`/tasks/${task._id}`, {
                status: 'completed',
                completedAt: new Date().toISOString()
            })
        }
        toast.success(`Thay đổi trạng thái nhiệm vụ "${task.title}" thành công!`)
        handleTaskChanged()
    } catch (error) {
        console.error('Cập nhật nhiệm vụ không thành công', error)
        toast.error(`Lỗi xảy ra khi cập nhật nhiệm vụ`)
    }
}
```

[08102025] - State selectedStatus không đồng bộ

```js
const [selectedStatus, setSelectedStatus] = useState(task.status || 'active');
```

- State selectedStatus chỉ được khởi tạo 1 lần duy nhất khi component mount. Sau đó:
    ✅ Khi user click dropdown và chọn status mới → selectedStatus được cập nhật
    ❌ Khi task.status thay đổi từ bên ngoài (ví dụ: từ parent component, hoặc từ API) → selectedStatus KHÔNG tự động cập nhật theo (đây là lí do tại sao khi click vào button toggle thì state bên dropdown không highlight theo)

- Có 2 cách giải quyết

    + Giải pháp 1: Dùng useEffect để đồng bộ

    ```js
    const [selectedStatus, setSelectedStatus] = useState(task.status || 'active');

    useEffect(() => {
        setSelectedStatus(task.status || 'active');
    }, [task.status]); // Theo dõi task.status
    ```
    + Không cần state, dùng trực tiếp task.status

    ```js
    // Thay đổi:
    const handleSelectedStatus = (option) => {
        // setSelectedStatus(option.key) // ❌ Xóa
        handleStatusUpdated(option.key)
    }

    // Trong Button:
    className={clsx(
        'flex w-full items-center justify-center', 
        task.status === option.key && 'bg-gradient-primary text-white' // ✅ Dùng task.status
    )}
    ```

- Giải pháp 2 tốt hơn vì:

✅ Luôn đồng bộ với nguồn dữ liệu chính (task.status)
✅ Ít state hơn = ít bug hơn
✅ Không cần useEffect

- Sẽ có lỗi ESLINK WARNING vì khai báo state mà không sử dụng
    + Cách 1: Xóa hoàn toàn state selectedStatus
    + Trong dropdown sửa lại:
    ```js
        <Button
        onClick={() => handleStatusUpdated(option)} // ✅ Gọi trực tiếp
        size='sm'
        className={clsx(
            'flex w-full items-center justify-center', 
            task.status === option.key && 'bg-gradient-primary text-white' // ✅ Dùng task.status
        )}
    >
        {option.label}
    </Button>
    ```
`38. PUSH GITHUB`

- Ẩn trang .env
- Kéo thư mục .gitignore trong backend ra
- git add . (Thêm tất cả các file vào chuẩn bị cho commit)
- git commit -m "first commit"
- Copy 3 dòng này
    git remote add origin https://github.com/Stevele856/todo-miniapp.git
    git branch -M main
    git push -u origin main

- Sau khi up lên github thì có 1 vấn đề là trong repo không có node_module, nhưng Render cần node_modules để chạy ứng dụng => thêm câu lệnh để hướng dẫn Render tự cài dependencies

B1: Terminal gõ `npm init-y` lệnh này sẽ tạo ra một thự mục `package.json` đây là trang cho cả frontend và backend
B2: Trong `package.json` thêm câu lệnh  để cài dependencies cho cả frontend và backend

```js
  "scripts": {
    "build": "npm install --prefix backend && npm install --prefix frontend && npm run build --prefix frontend" 
  },
  /* thêm --prefix backend là để chạy npm install cho thư mục backend
   thêm --prefix frontend là để chạy npm install cho thư mục frontend
    => 2 câu lệnh này sẽ cài node_module cho frontend và backend (có thể test bằng cách xoá 2 thư mục node_modules trong fe và be rồi chạy npm run build để cài lại)
    - Ngoài ra những code viết trong front-end chưa phải là phiên bản tối ưu nhất, lí do dùng vite để build là nó giúp build dự án react 1 cách tối ưu cho deployment nên thêm lệnh `npm run build --prefix frontend`.
   */
```

- Chạy lại npm run build thì lúc này ngoài việc cài dependencies còn sẽ giúp build luôn react app => tự động taoh thư mục mới trong frontend là `dist`. Trong này chứa bản tối ưu của ứng dụng React của chúng ta

- Hiện tại ứng dụng đang có FE và BE chạy ở 2 PORT khác nhau, thay vì để user truy cập 2 domain riêng biệt => gộp lại 1 domain duy nhất

- Setup trong `server.js`

```js
// Thêm dựa trên thư mục hiện tại
import path from 'path'

const __dirname = path.resolve() // Lấy đường dẫn đến thư mục hiện tại bằng cách này là vì khi code đưa vào Render sẽ không biết nó nằm ở dâu trên server đó => đây là cách giúp nodeJS tự xác định vị trí mà nó đang chạy

// Viết thêm 1 middleware để nói với backend là lấy code trong thư mục dist trong FE
app.use(express.static(path.join(__dirname, "../frontend/dist")))

/* path.join(): là để nối đường dẫn đến thư mục hiện tại => là thư mục dist
express.static: yêu cầu Express lấy toàn bộ file tĩnh trong thư mục dist như HTML CSS JS và gửi cho người dùng khi họ truy cập
*/

```

- Tiếp theo là viết 1 logic để khi người dùng truy cập vào bất kì đường dẫn nào mà BE không định nghĩa trước thì sẽ trả về index.html trong FE

```js
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html")) // Với bất kỳ URL nào mà người dùng gõ vào trình duyệt, Backend sẽ luôn trả về index.html để React router ở FE lo phần điều hướng tiếp theo
})
```

=> Nhưng mà phần code này chỉ nên chạy ở 'production' nên ở 'development' không cần nên sẽ bọc toàn bộ logic bên trong điều kiện if
- Qua trang .env để thêm `NODE_ENV=production`

- Tương tự với CORS đã đạo trước đó, chỉ cần dòng này chạy trên môi trường development thôi

- Còn 1 việc nữa, khi Render chạy app họ cần biết lệnh để khởi động server, nên trong `package.json` ở thư mục gốc thêm vào script là:
```js
"start": "npm run start --prefix backend"
```

- Có thể test bằng gõ vào terminal npm run build (cày dependencies và build dự án react)
- sau đó gõ npm run start => kiểm tra nếu đường link `localhost/5001` chạy thì thành công

- Việc cuối cùng cần làm là vào `axios.js` hiện tại baseURL đang trỏ về localhost5001 nhưng khi deploy lên production sẽ có 1 URL khác, mình không biết chính xác render sẽ cho URL gì vì không trả phí nên cho cái nào thì dùng cái đó => không phải localhost nữa nên cần làm lich hoạt hơn

```js
//trong vite sẽ kiểm tra môi trường bằng cách
const BASE_URL = import.meta.env.MODE === 'development' ? 'http://localhost:5001/api' : '/api'
// nếu là môi trường development thì sẽ là 'http://localhost:5001/api' còn nếu là môi trường production thì sẽ là domain mà Render cung cấp kèm với '/api'
```

- Kiểm tra lần cuối trước khi commit
    + package.json chung
    + server.js

- COMMIT thay đổi
+ git add .
+ git commit -m 'chuẩn bị deploy'
+ git push
    
* Nhớ thuộc tính: `item-start`, `flex-1`


