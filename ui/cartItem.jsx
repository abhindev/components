import Image from 'next/image'
import React,{useState} from 'react'
import {useDispatch, useSelector } from "react-redux";
import styles from "../../styles/CartItem.module.css"
import { addQuantity ,removeQuantity,removeItem} from "../../redux/cartSlice";

function CartItem({cart}) {
  const [qty, setQty] = useState('')
  const [total, setTotal] = useState(0) 
  const cartItem = useSelector((state) => state.cart.products);
  console.log(cartItem)
  const dispatch = useDispatch();

  var cartItems = []

  cart.products.map((product) =>{
      cartItems.push(product)})

  // console.log(cartItems)

  // const quan =  []
  const handleAddQty = (i,product)=> {
    // const price = product
      dispatch(addQuantity({i, product}));
  }
  const handleRemoveQty = (i,product)=> {
      dispatch(removeQuantity({i, product}));
  }
  const handleRemove = (i, product,cartItem) =>{
    dispatch(removeItem({i, product,cartItem}))
  }

  // console.log(qty)
  return (
    // <div>
    //   <h1>item</h1>
    //   {cart.products.map((product, i) =>(
    //     <div key={i}>
    //         {console.log(product.title)}
    //         <div><h1>{product.title}</h1></div>
    //         <div><h1>{product.quantity }</h1>
    //         <h2>{product.price}</h2></div>
    //         <h2>{product.variant}</h2>
    //     </div>
    //   )
    //   )}
    //   <p>porducts</p>
    // </div>
    <div>
      <div>
       {cartItems.map((product, i) => (
        <div key={i} className={styles.container} >
          <div key={product._id} className={styles.cartItem}>
        <div className={styles.image}>
          <Image src={product.img[0]} alt="" width="100" height="100" />
        </div>
        <div className={styles.textcont}>
          <span className={styles.name}>
            {product.title} <br /> {product.variant}
          </span>
          <span className={styles.price}>₹{product.price}</span>
        </div>
        <div>
            <button className={styles.icon_x} onClick={(e)=>{handleRemove(i,product,cartItem)}}>x</button>
            <div className={styles.quantity}>
            <button className={styles.icon_remove}onClick={(e)=>{product.quantity>1 ? handleRemoveQty(i, product) :null}} >-</button>
            <span className={styles.span}  >{product.quantity}</span>
            <button className={styles.icon_add} onClick={(e)=>{handleAddQty(i, product)}}>+</button>
            </div>
        </div>
        
      </div>
        </div>
      ))} 
      </div>
      </div>
  )
}

export default CartItem