import { FC } from "react";
import styles from './OrderDetails.module.scss';
import orderComplite from '../../../images/orderComplite.svg'
import { IOrderResponse } from "../../../services/baseApi";


interface Props {
  orderData: IOrderResponse;
}

const OrderDetails: FC<Props> = ({ orderData }) => {
  return (
    <div className={styles.main}>
      <p className="text text_type_digits-large mb-8">{orderData.order.number}</p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img src={orderComplite} alt="Успешный заказ" className="mb-15" />
      <p className="text text_type_main-default mb-2">{orderData.name}</p>
      <p className={`${styles.textColor} text text_type_main-default mb-15`}>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

export default OrderDetails;