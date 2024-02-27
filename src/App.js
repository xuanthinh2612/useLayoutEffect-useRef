import logo from './logo.svg';
import './App.css';
import { useCallback, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from 'react';
import MemoContent from './MemoContent';
import TodoApp from './todo';

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
// 
// useLayoutEffect (ưu tiên xử lý logic trước và render giao diện sau cùng)
// 
// 1. Cập nhật lại state
// 2. cập nhật DOM (mutated)
// 3. Gọi cleanup nếu deps thay đổi (sync)
// 4. Gọi useLayoutEffect callback (sync)
// 5. Render lại UI
// 

// =============================useLayoutEffect=====================================================
// useLayoutEffect hook
//
// function App() {
//
//   const [count, setCount] = useState(0)
//
//   useLayoutEffect(()=> {
//     if(count > 3) {
//       setCount(0)
//     }
//   }, [count])
//
//   const handleIncreaseCount = ()=> {
//     setCount(count + 1)
//   }
//
//   return (
//     <div className="App">
//       <h1>{count}</h1>
//       <button
//         onClick={handleIncreaseCount}
//       >Increase</button>
//     </div>
//   );
// }


//=========================================useRef===========================================================
// useRef hook 
// 
// Chú ý: Mỗi hàm khi chạy tạo ra một phạm vi mới không liên quan tới phạm vi lần chạy trước đó nữa
// => dùng useRef để lưu lại giá trị khởi tạo của biến lần đầu tiên tránh việc khởi tạo lại biến làm mất giá trị trong hàm
// 
// Bai 1: dùng useRef để lưu lại timerId tránh trường hợp re-load lại state làm mất giá trị biến
// Bài 2: lưu 1 element vào trong useRef và lấy ra như dùng document.getElementById...
// Bài 3: lấy ra giá trị trước và giá trị sau của 1 state
// 
// 
// function App() {
//
//   const [count, setCount] = useState(60)
//
//   // Bài 1: khi update state hàm sẽ re-load lại và biến được khai báo trong hàm sẽ được khởi tạo lại
//   const timerId = useRef();
//   // Bài 3: lưu lại giá trị trước đó của count 
//   const preState = useRef
//   useEffect(()=> {
//     preState.current = count
//   }, [count])
//
//
//   // Bài 2:  lưu element bằng cách khai báo với useRef và có thể lấy ra element tương tự document.getElementById... bằng cách dùng XXXRef.current
//   const h1Ref = useRef()
//
//   const handleStartCount = ()=> {
//     timerId.current = setInterval(()=> {
//       setCount(pre => pre - 1)
//     }, 1000)
//   }
//   const handleStopCount = ()=> {
//     clearInterval(timerId.current)
//   }
//   // Bài 2: in ra element DOM đã được lưu vào ref
//   console.log(h1Ref.current);
//   // Bài 3 in ra 2 giá trị trước và sau state
//   // tới bước này count đã được update giá trị tuy nhiên preState vẫn chưa. 
//   console.log(count, preState.current); // in ra màn hình giá trị
//   // => sau bước này và render UI bên dưới -> useEffect check callback -> count changed -> gọi callback và update lại giá trị của preState.current 
//   return (
//     <div className="App">
//       <h1 ref={h1Ref}>{count}</h1>
//       <button
//         onClick={handleStartCount}
//       >Count down</button>
//             <button
//         onClick={handleStopCount}
//       >Stop</button>
//     </div>
//   );
// }




//=========================================memo Và useCallback===================================================================
// memo và useCallback(callback function, [depes])
//
// memo: dùng khi muốn component con không bị re-render khi thằng cha update state
// 
// useCallback: đi cặp với memo, dùng để nhận xử lý logic và trả cho hàm handle 1 kết quả tham chiếu, 
// => truyền hàm handle đó như 1 props vào component con => khi component cha re-render => memo check prop không thay đổi => ko re-render component con
// 
// 
// 
// 
// 
// 
// 
// function App() {
//   const [count, setCount] = useState(0)
//   // hàm handle nhận 1 kết quả tham chiếu
//   const handleIncreaseCount = useCallback(()=> {
//     setCount(preState => preState + 1)
//   }, [])
//   return (
//     <div className="App">
//       {/* Nếu truyền props vào component, props thay đổi thì memo cho phép component con re-render và ngược lại thì không re-render component con */}
//       <MemoContent handleIncreaseFromChild={handleIncreaseCount}/>
//       <h1>{count}</h1>
//     </div>
//   );
// }




//=============================================useMemo===========================================================================

// Dùng để hạn chế gọi hàm nào đó (thực hiện logic) quá nhiều lần không cần thiết khi component re-render 
// 
// useMemo return ra một kết quả còn useEfect return ra một cleanup function 
// 
// giống nhau: khi deps thay đổi thì sẽ gọi callback
// 
// 
// 
// 
// 
// 
//
//
//
// function App() {
//
//   const [name, setName] = useState("")
//   const [price, setPrice] = useState("")
//
//   const [productList, setProductList] = useState([])
//
//
//   const nameInputRef = useRef()
//
//   // // hàm handle nhận 1 kết quả tham chiếu
//   // const handleIncreaseCount = useCallback(()=> {
//   //   setCount(preState => preState + 1)
//   // }, [])
//
//   const handleAddProduct = ()=> {
//     const product = {
//       name,
//       price: + price
//     }
//     setProductList([...productList, product])
//     setName("")
//     setPrice("")
//     nameInputRef.current.focus()
//   }
//
//   let total = useMemo(() => {
//     const sum = productList.reduce((result, product) => {
//       console.log("calling callback in useMemo");
//       return result + product.price
//     }, 0)
//
//     return sum;
//   }, [productList])
//     
// 
// 
//   return (
//     <div className="App m-5">
//       <div className='row'>
//         <label className='col-3'>Product Name: </label>
//         <input className='col-6 m-2'
//           ref={nameInputRef}
//           value={name}
//           onChange={(e)=> setName(e.target.value)}
//         />
//       </div>      
//       <div className='row'>
//         <label className='col-3'>Product Price: </label>
//         <input className='col-6 m-2'
//           onChange={(e)=> setPrice(e.target.value)}
//           value={price}
//         />
//       </div>
//       <button 
//         className='btn btn-outline-secondary m-5'
//         onClick={handleAddProduct}
//       >Add</button>
//       <h2>Total: {total}
//         {/* {productList.reduce((result, product) => result + product.price)} */}
//       </h2>
//       <h2>Product List: </h2>
//       <div>
//         <ul>
//           {productList.map((product, index) => {
//             return(
//               <li key={index}>{product.name} - {product.price}</li>
//             )
//           })}
//         </ul>
//       </div>
//     </div>
//   );
// }





// ====================================================useReducer===================================================================
// 
//  1. Init state
//  2. Actions
//  3. Reducer
//  4. Dispatch
// 
// 
// ---------- Bài 1 : sử dụng useReducer đơn giản ---------------------
// 
// 
// 
// init 
// const initState = 0;
// 
// actions
// const UP_ACTION = "up"
// const DOWN_ACTION = "down"
// 
// 
// reducer
// 
// const reducer = (state, action)=> {
//     switch(action) {
//       case UP_ACTION:
//         return state + 1
//       case DOWN_ACTION: 
//         return state - 1
//       default:
//         throw new Error("Invalid action")    
//     }
// }
// 
// 
// example reducer in array
// [].reduce((preValue, current)=> {
//   return preValue + current
// },0)
// 
// 
// function App() {
//   const [count, dispatch] = useReducer(reducer, initState)
//   // hàm handle nhận 1 kết quả tham chiếu
//   return (
//     <>
//       <div className="App m-5">
//         <h1>Học useReducer đơn giản</h1>
//         <h1>{count}</h1>
//         <button className='m-2 btn btn-outline-success' onClick={()=> dispatch(UP_ACTION)}>UP</button>
//         <button className='m-2 btn btn-outline-danger' onClick={()=> dispatch(DOWN_ACTION)}>DOWN</button>
//       </div>
//     </>
//   );
// }
// 
// 
// ---------- Bài 1 : sử dụng useReducer Nâng cao - TODO APP ---------------------
// 
// 
// 
// 
// 
// 
// 

function App() {
  return(
    <TodoApp />
  )
}

export default App;
