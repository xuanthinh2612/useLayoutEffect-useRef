import logo from './logo.svg';
import './App.css';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';


// useEffect
// 1. Cập nhật lại state
// 2. Cập nhật lại DOM
// 3. Render lại UI
// 4. Gọi cleanup nếu deps thay đổi
// 5. gọi useEffect callback
// 
// 
// 

// 
// useLayoutEffect (ưu tiên xử lý logic trước và render giao diện sau cùng)
// 
// 1. Cập nhật lại state
// 2. cập nhật DOM (mutated)
// 3. Gọi cleanup nếu deps thay đổi (sync)
// 4. Gọi useLayoutEffect callback (sync)
// 5. Render lại UI
// 


// useLayoutEffect hook

// function App() {

//   const [count, setCount] = useState(0)

//   useLayoutEffect(()=> {
//     if(count > 3) {
//       setCount(0)
//     }
//   }, [count])

//   const handleIncreaseCount = ()=> {
//     setCount(count + 1)
//   }

//   return (
//     <div className="App">
//       <h1>{count}</h1>
//       <button
//         onClick={handleIncreaseCount}
//       >Increase</button>
//     </div>
//   );
// }


// useRef hook 
// 
// Chú ý: Mỗi hàm khi chạy tạo ra một phạm vi mới không liên quan tới phạm vi lần chạy trước đó nữa
// => dùng useRef để lưu lại giá trị khởi tạo của biến lần đầu tiên tránh việc khởi tạo lại biến làm mất giá trị trong hàm
// 
// Bai 1: dùng useRef để lưu lại timerId tránh trường hợp re-load lại state làm mất giá trị biến
// Bài 2: lưu 1 element vào trong useRef và lấy ra như dùng document.getElementById...
// Bài 3: lấy ra giá trị trước và giá trị sau của 1 state


function App() {

  const [count, setCount] = useState(60)

  // Bài 1: khi update state hàm sẽ re-load lại và biến được khai báo trong hàm sẽ được khởi tạo lại
  const timerId = useRef();
  // Bài 3: lưu lại giá trị trước đó của count 
  const preState = useRef
  useEffect(()=> {
    preState.current = count
  }, [count])


  // Bài 2:  lưu element bằng cách khai báo với useRef và có thể lấy ra element tương tự document.getElementById... bằng cách dùng XXXRef.current
  const h1Ref = useRef()


  const handleStartCount = ()=> {
    timerId.current = setInterval(()=> {
      setCount(pre => pre - 1)
    }, 1000)
  }

  const handleStopCount = ()=> {
    clearInterval(timerId.current)
  }

  // Bài 2: in ra element DOM đã được lưu vào ref
  console.log(h1Ref.current);

  // Bài 3 in ra 2 giá trị trước và sau state
  // tới bước này count đã được update giá trị tuy nhiên preState vẫn chưa. 
  console.log(count, preState.current); // in ra màn hình giá trị
  // => sau bước này và render UI bên dưới -> useEffect check callback -> count changed -> gọi callback và update lại giá trị của preState.current 


  return (
    <div className="App">
      <h1 ref={h1Ref}>{count}</h1>
      <button
        onClick={handleStartCount}
      >Count down</button>
            <button
        onClick={handleStopCount}
      >Stop</button>
    </div>
  );
}


export default App;
