import { FC } from "react";
import styles from './OrderDetails.module.scss';
import orderComplite from '../../../images/orderComplite.svg'

interface Props {

}

const OrderDetails: FC<Props> = ({   }) => {
  return (
    <div className={styles.main}>
      <p className="text text_type_digits-large">034536</p>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <img src={orderComplite} />
      <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default">Дождитесь готовности на орбитальной станции</p>

    </div>
  )
}

export default OrderDetails;