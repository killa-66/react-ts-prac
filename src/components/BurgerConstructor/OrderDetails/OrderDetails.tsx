import { FC } from "react";
import styles from './OrderDetails.module.scss';
import orderComplite from '../../../images/orderComplite.svg'
import { orderTestData } from "../../../testData/testData";


interface Props {

}

const OrderDetails: FC<Props> = ({   }) => {
  return (
    <div className={styles.main}>
      <p className="text text_type_digits-large mb-8">{orderTestData.orderNumber}</p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img src={orderComplite} alt="Успешный заказ" className="mb-15" />
      <p className="text text_type_main-default mb-2">{orderTestData.statusMessage}</p>
      <p className={`${styles.textColor} text text_type_main-default mb-15`}>{orderTestData.waitingMessage}</p>
    </div>
  )
}

export default OrderDetails;